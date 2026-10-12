// automation/utils/testcase-converter.js
// Universal test case converter — reads .xlsx, .csv, .docx, .txt and converts to standardized .md

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const { logger } = require('./logger');
const { readTestSteps } = require('./excel-reader');

const SUPPORTED_EXTENSIONS = ['.xlsx', '.csv', '.docx', '.txt'];
const CONVERTED_SUBFOLDER = 'converted';

// Metadata key patterns (case-insensitive)
const METADATA_PATTERNS = {
  testCaseId: /^test\s*case\s*id\s*[:=]\s*(.+)/i,
  feature: /^feature\s*[:=]\s*(.+)/i,
  requirement: /^requirement\s*[:=]\s*(.+)/i,
  priority: /^priority\s*[:=]\s*(.+)/i,
  testType: /^test\s*type\s*[:=]\s*(.+)/i,
  objective: /^objective\s*[:=]\s*(.+)/i,
};

// ---------------------------------------------------------------------------
// Shared heuristic text parser
// ---------------------------------------------------------------------------

/**
 * Extract metadata key-value pairs from text lines.
 * @param {string[]} lines
 * @returns {object} metadata object with matched keys
 */
function extractMetadata(lines) {
  const metadata = {
    testCaseId: null,
    feature: null,
    requirement: null,
    priority: null,
    testType: null,
    objective: null,
    preconditions: [],
    testData: [],
    expectedResults: [],
    notes: null,
  };

  let inPreconditions = false;
  let inExpectedResults = false;
  let inNotes = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      inPreconditions = false;
      inExpectedResults = false;
      inNotes = false;
      continue;
    }

    // Check metadata patterns
    for (const [key, pattern] of Object.entries(METADATA_PATTERNS)) {
      const match = trimmed.match(pattern);
      if (match) {
        metadata[key] = match[1].trim();
        break;
      }
    }

    // Section headers
    if (/^preconditions?\s*[:=]?\s*$/i.test(trimmed)) {
      inPreconditions = true;
      continue;
    }
    if (/^expected\s*results?\s*[:=]?\s*$/i.test(trimmed)) {
      inExpectedResults = true;
      continue;
    }
    if (/^notes?\s*[:=]?\s*$/i.test(trimmed)) {
      inNotes = true;
      continue;
    }

    // Collect section content
    if (inPreconditions && /^[-*]\s+/.test(trimmed)) {
      metadata.preconditions.push(trimmed.replace(/^[-*]\s+/, ''));
    }
    if (inExpectedResults && /^[-*]\s+/.test(trimmed)) {
      metadata.expectedResults.push(trimmed.replace(/^[-*]\s+/, ''));
    }
    if (inNotes) {
      metadata.notes = (metadata.notes || '') + trimmed + ' ';
    }
  }

  if (metadata.notes) metadata.notes = metadata.notes.trim();
  return metadata;
}

/**
 * Try to parse a markdown-style pipe table.
 * @param {string[]} lines
 * @returns {Array|null} steps array or null if no table found
 */
function parseMarkdownTable(lines) {
  // Find header row with Step | Action | Expected
  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/\|\s*step/i.test(line) && /\|\s*action/i.test(line)) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return null;

  // Skip separator row (|---|---|---|)
  let dataStart = headerIdx + 1;
  if (dataStart < lines.length && /^\s*\|[\s-:|]+\|\s*$/.test(lines[dataStart])) {
    dataStart++;
  }

  const steps = [];
  for (let i = dataStart; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break;

    const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
    if (cells.length >= 2) {
      steps.push({
        step: parseInt(cells[0], 10) || (steps.length + 1),
        action: cells[1] || '',
        expectedResult: cells[2] || '',
      });
    }
  }

  return steps.length > 0 ? steps : null;
}

/**
 * Try to parse tab-separated values.
 * @param {string[]} lines
 * @returns {Array|null} steps array or null if not TSV
 */
function parseTSV(lines) {
  const tsvLines = lines.filter(l => l.includes('\t') && l.trim());
  if (tsvLines.length < 2) return null; // need header + at least 1 data row

  // Check if first TSV line looks like a header
  const headerCells = tsvLines[0].split('\t').map(c => c.trim().toLowerCase());
  const hasStepHeader = headerCells.some(c => /^(step|s\.?no|sl|#)/.test(c));
  const hasActionHeader = headerCells.some(c => /^(action|test\s*step|description|steps)/.test(c));

  if (!hasActionHeader && !hasStepHeader) return null;

  // Find column indices
  let stepIdx = headerCells.findIndex(c => /^(step|s\.?no|sl|#)/.test(c));
  let actionIdx = headerCells.findIndex(c => /^(action|test\s*step|description|steps)/.test(c));
  let expectedIdx = headerCells.findIndex(c => /^(expected|result|verification)/.test(c));

  if (actionIdx === -1) actionIdx = stepIdx === 0 ? 1 : 0;

  const steps = [];
  for (let i = 1; i < tsvLines.length; i++) {
    const cells = tsvLines[i].split('\t').map(c => c.trim());
    const action = cells[actionIdx] || '';
    if (!action) continue;

    steps.push({
      step: stepIdx >= 0 ? (parseInt(cells[stepIdx], 10) || (steps.length + 1)) : (steps.length + 1),
      action,
      expectedResult: expectedIdx >= 0 ? (cells[expectedIdx] || '') : '',
    });
  }

  return steps.length > 0 ? steps : null;
}

/**
 * Try to parse numbered steps (1. / Step 1: / Step 1 - / 1) etc.)
 * @param {string[]} lines
 * @returns {Array|null} steps array or null
 */
function parseNumberedSteps(lines) {
  const stepPattern = /^(?:step\s*)?(\d+)\s*[.):\-]\s*(.+)/i;
  const expectedSeparators = ['->', '=>', '|', ' -- '];

  const steps = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(stepPattern);
    if (!match) continue;

    let action = match[2].trim();
    let expectedResult = '';

    // Check for inline expected result separator
    for (const sep of expectedSeparators) {
      const sepIdx = action.indexOf(sep);
      if (sepIdx > 0) {
        expectedResult = action.substring(sepIdx + sep.length).trim();
        action = action.substring(0, sepIdx).trim();
        break;
      }
    }

    // Check if next line starts with "Expected:"
    // (handled at a higher level — skip for now)

    steps.push({
      step: parseInt(match[1], 10),
      action,
      expectedResult,
    });
  }

  return steps.length > 0 ? steps : null;
}

/**
 * Fallback: treat each non-empty line as a step action.
 * @param {string[]} lines
 * @returns {Array} steps array
 */
function parseFallbackLines(lines) {
  const steps = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip lines that look like metadata or section headers
    if (!trimmed) continue;
    if (/^(test\s*case|feature|requirement|priority|test\s*type|objective|precondition|expected\s*result|notes?|status)\s*[:=]/i.test(trimmed)) continue;
    if (/^#+\s/.test(trimmed)) continue; // markdown headers
    if (/^[-*]\s/.test(trimmed)) continue; // bullet points (likely preconditions/notes)

    steps.push({
      step: steps.length + 1,
      action: trimmed,
      expectedResult: '',
    });
  }
  return steps;
}

/**
 * Parse structured text using multiple heuristic strategies.
 * @param {string} text - Raw text content
 * @returns {{ metadata: object, steps: Array }}
 */
function parseStructuredText(text) {
  const lines = text.split(/\r?\n/);
  const metadata = extractMetadata(lines);

  // Strategy 1: Markdown table
  let steps = parseMarkdownTable(lines);
  if (steps && steps.length > 0) {
    return { metadata, steps };
  }

  // Strategy 2: TSV
  steps = parseTSV(lines);
  if (steps && steps.length > 0) {
    return { metadata, steps };
  }

  // Strategy 3: Numbered steps
  steps = parseNumberedSteps(lines);
  if (steps && steps.length > 0) {
    return { metadata, steps };
  }

  // Strategy 4: Fallback — each line is a step
  steps = parseFallbackLines(lines);
  return { metadata, steps };
}

// ---------------------------------------------------------------------------
// Format-specific parsers
// ---------------------------------------------------------------------------

/**
 * Parse .xlsx file.
 * @param {string} filePath
 * @returns {{ metadata: object, steps: Array }}
 */
function parseXlsx(filePath) {
  const steps = readTestSteps(filePath);

  // Try to extract metadata from the workbook
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  const metadata = {
    testCaseId: null, feature: null, requirement: null,
    priority: null, testType: null, objective: null,
    preconditions: [], testData: [], expectedResults: [], notes: null,
  };

  // Scan first 15 rows for metadata key-value pairs
  const metadataLines = rawRows.slice(0, 15).map(row =>
    Array.isArray(row) ? row.filter(c => c !== '').join(': ') : ''
  );

  const extracted = extractMetadata(metadataLines);
  Object.assign(metadata, extracted);

  return { metadata, steps };
}

/**
 * Parse .csv file using xlsx library.
 * @param {string} filePath
 * @returns {{ metadata: object, steps: Array }}
 */
function parseCsv(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (rawData.length === 0) {
    return { metadata: emptyMetadata(), steps: [] };
  }

  // Reuse excel-reader column matching logic
  const STEP_COLUMNS = ['step', 'step #', 'step no', 's.no', 'sl no', 'sno', 'step number'];
  const ACTION_COLUMNS = ['action', 'test step', 'description', 'steps', 'test action', 'action description'];
  const EXPECTED_COLUMNS = ['expected result', 'expected', 'expected output', 'verification', 'expected results', 'result'];

  const headers = Object.keys(rawData[0]);
  const findCol = (candidates) => {
    for (const h of headers) {
      if (candidates.includes(h.trim().toLowerCase())) return h;
    }
    return null;
  };

  const stepCol = findCol(STEP_COLUMNS);
  const actionCol = findCol(ACTION_COLUMNS);
  const expectedCol = findCol(EXPECTED_COLUMNS);

  if (!actionCol) {
    // Fall back to text parsing
    const text = fs.readFileSync(filePath, 'utf-8');
    return parseStructuredText(text);
  }

  const steps = [];
  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    const action = String(row[actionCol] || '').trim();
    if (!action) continue;
    steps.push({
      step: stepCol ? (Number(row[stepCol]) || (i + 1)) : (i + 1),
      action,
      expectedResult: expectedCol ? String(row[expectedCol] || '').trim() : '',
    });
  }

  return { metadata: emptyMetadata(), steps };
}

/**
 * Parse .docx file using mammoth.
 * @param {string} filePath
 * @returns {Promise<{ metadata: object, steps: Array }>}
 */
async function parseDocx(filePath) {
  const mammoth = require('mammoth');
  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value;

  if (!text || text.trim().length === 0) {
    logger.warn(`Docx file appears empty or contains only images/charts: ${filePath}`, 'Converter');
    return { metadata: emptyMetadata(), steps: [] };
  }

  return parseStructuredText(text);
}

/**
 * Parse .txt file.
 * @param {string} filePath
 * @returns {{ metadata: object, steps: Array }}
 */
function parseTxt(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  return parseStructuredText(text);
}

function emptyMetadata() {
  return {
    testCaseId: null, feature: null, requirement: null,
    priority: null, testType: null, objective: null,
    preconditions: [], testData: [], expectedResults: [], notes: null,
  };
}

// ---------------------------------------------------------------------------
// Markdown generator
// ---------------------------------------------------------------------------

/**
 * Derive a human-readable feature name from a filename.
 * @param {string} filename
 * @returns {string}
 */
function featureFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[-_]/g, ' ')
    .replace(/testcase(s)?/gi, '')
    .replace(/\b(SAP|TC)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ') || 'Test Cases';
}

/**
 * Generate standardized markdown from parsed data.
 * @param {{ metadata: object, steps: Array }} parsed
 * @param {string} sourceFile - Original source filename
 * @returns {string}
 */
function generateMarkdown(parsed, sourceFile) {
  const { metadata, steps } = parsed;
  const feature = metadata.feature || featureFromFilename(sourceFile);
  const tcId = metadata.testCaseId || 'TC_XX_XX_001 <!-- TODO: Assign proper TC ID -->';
  const priority = metadata.priority || 'High <!-- TODO: Assign priority -->';
  const testType = metadata.testType || 'Functional';
  const requirement = metadata.requirement || `${feature} <!-- TODO: Add requirement -->`;
  const objective = metadata.objective || `Validate ${feature} workflow end-to-end <!-- TODO: Refine objective -->`;

  let md = '';
  md += `# ${feature} — Test Cases\n\n`;
  md += `Source: \`${path.basename(sourceFile)}\` (auto-converted)\n\n`;
  md += `---\n\n`;

  md += `## Test Case ID: ${tcId}\n`;
  md += `**Feature:** ${feature}\n`;
  md += `**Requirement:** ${requirement}\n`;
  md += `**Priority:** ${priority}\n`;
  md += `**Test Type:** ${testType}\n\n`;

  md += `### Objective\n`;
  md += `${objective}\n\n`;

  md += `### Preconditions\n`;
  if (metadata.preconditions && metadata.preconditions.length > 0) {
    for (const pre of metadata.preconditions) {
      md += `- ${pre}\n`;
    }
  } else {
    md += `- SAP S/4HANA Cloud system is accessible\n`;
    md += `- Valid user credentials are available\n`;
    md += `<!-- TODO: Add specific preconditions -->\n`;
  }
  md += '\n';

  md += `### Test Data\n`;
  if (metadata.testData && metadata.testData.length > 0) {
    md += `| Field | Value |\n`;
    md += `|-------|-------|\n`;
    for (const td of metadata.testData) {
      md += `| ${td.field} | ${td.value} |\n`;
    }
  } else {
    md += `| Field | Value |\n`;
    md += `|-------|-------|\n`;
    md += `| <!-- TODO: Add test data --> | |\n`;
  }
  md += '\n';

  md += `### Test Steps\n`;
  md += `| Step | Action | Expected Result |\n`;
  md += `|------|--------|-----------------|\n`;
  for (const step of steps) {
    const escapedAction = String(step.action).replace(/\|/g, '\\|');
    const escapedExpected = String(step.expectedResult).replace(/\|/g, '\\|');
    md += `| ${step.step} | ${escapedAction} | ${escapedExpected} |\n`;
  }
  md += '\n';

  md += `### Expected Result\n`;
  if (metadata.expectedResults && metadata.expectedResults.length > 0) {
    for (const er of metadata.expectedResults) {
      md += `- ${er}\n`;
    }
  } else {
    md += `- Test steps complete successfully\n`;
    md += `<!-- TODO: Add specific expected results -->\n`;
  }
  md += '\n';

  md += `### Status\n`;
  md += `To be filled during execution\n\n`;

  md += `### Notes\n`;
  if (metadata.notes) {
    md += `${metadata.notes}\n`;
  } else {
    md += `- Auto-converted from \`${path.basename(sourceFile)}\`\n`;
    md += `<!-- TODO: Add edge cases, dependencies, or additional context -->\n`;
  }

  return md;
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

/**
 * Convert a single file to .md format.
 * @param {string} filePath - Absolute path to the source file
 * @param {object} [options] - { force: boolean }
 * @returns {Promise<{ outputPath: string, stepsCount: number }>}
 */
async function convertFile(filePath, options = {}) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const convertedDir = path.join(dir, CONVERTED_SUBFOLDER);

  // Ensure converted/ subfolder exists
  if (!fs.existsSync(convertedDir)) {
    fs.mkdirSync(convertedDir, { recursive: true });
  }

  const outputPath = path.join(convertedDir, `${baseName}-converted.md`);

  // Idempotency check
  if (!options.force && fs.existsSync(outputPath)) {
    const srcStat = fs.statSync(filePath);
    const outStat = fs.statSync(outputPath);
    if (srcStat.mtimeMs <= outStat.mtimeMs) {
      logger.info(`Skipping "${path.basename(filePath)}" — already converted and up to date`, 'Converter');
      return { outputPath, stepsCount: 0, skipped: true };
    }
  }

  let parsed;
  switch (ext) {
    case '.xlsx':
      parsed = parseXlsx(filePath);
      break;
    case '.csv':
      parsed = parseCsv(filePath);
      break;
    case '.docx':
      parsed = await parseDocx(filePath);
      break;
    case '.txt':
      parsed = parseTxt(filePath);
      break;
    case '.doc':
      throw new Error('.doc (legacy Word) is not supported. Please save as .docx and retry.');
    default:
      throw new Error(`Unsupported format: ${ext}`);
  }

  if (!parsed.steps || parsed.steps.length === 0) {
    logger.warn(`No test steps found in "${path.basename(filePath)}"`, 'Converter');
  }

  const markdown = generateMarkdown(parsed, filePath);

  if (!options.dryRun) {
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    logger.info(
      `Converted "${path.basename(filePath)}" → "${path.basename(outputPath)}" (${parsed.steps.length} steps)`,
      'Converter'
    );
  }

  return { outputPath, stepsCount: parsed.steps.length, skipped: false };
}

/**
 * Convert all non-.md files in testcases/ to .md.
 * @param {string} [testcasesDir]
 * @param {object} [options] - { force: boolean, dryRun: boolean }
 * @returns {Promise<{ converted: Array, skipped: Array, errors: Array }>}
 */
async function convertAll(testcasesDir, options = {}) {
  const dir = testcasesDir || path.resolve(__dirname, '..', '..', 'testcases');
  const results = { converted: [], skipped: [], errors: [] };

  if (!fs.existsSync(dir)) {
    logger.warn(`Testcases directory not found: ${dir}`, 'Converter');
    return results;
  }

  const files = fs.readdirSync(dir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext) && !f.startsWith('~$');
  });

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const result = await convertFile(filePath, options);
      if (result.skipped) {
        results.skipped.push({ file, reason: 'Already converted and up to date' });
      } else {
        results.converted.push({ file, outputPath: result.outputPath, steps: result.stepsCount });
      }
    } catch (err) {
      results.errors.push({ file, error: err.message });
      logger.error(`Failed to convert ${file}: ${err.message}`, 'Converter');
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const dryRun = args.includes('--dry-run');

  let fileArg = null;
  let dirArg = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) fileArg = args[++i];
    if (args[i] === '--dir' && args[i + 1]) dirArg = args[++i];
  }

  console.log('=== Test Case Converter ===\n');
  if (dryRun) console.log('[DRY RUN] No files will be written.\n');

  if (fileArg) {
    const filePath = path.resolve(fileArg);
    try {
      const result = await convertFile(filePath, { force, dryRun });
      if (result.skipped) {
        console.log(`Skipped: ${path.basename(filePath)} (already up to date)`);
      } else {
        console.log(`Converted: ${path.basename(filePath)} → ${CONVERTED_SUBFOLDER}/${path.basename(result.outputPath)} (${result.stepsCount} steps)`);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  } else {
    const results = await convertAll(dirArg, { force, dryRun });

    if (results.converted.length > 0) {
      console.log(`Converted: ${results.converted.length} file(s) → testcases/${CONVERTED_SUBFOLDER}/`);
      for (const c of results.converted) {
        console.log(`  - ${c.file} → ${path.basename(c.outputPath)} (${c.steps} steps)`);
      }
    }
    if (results.skipped.length > 0) {
      console.log(`\nSkipped: ${results.skipped.length} file(s) (already up to date)`);
      for (const s of results.skipped) {
        console.log(`  - ${s.file}`);
      }
    }
    if (results.errors.length > 0) {
      console.log(`\nErrors: ${results.errors.length} file(s)`);
      for (const e of results.errors) {
        console.log(`  - ${e.file}: ${e.error}`);
      }
    }
    if (results.converted.length === 0 && results.skipped.length === 0 && results.errors.length === 0) {
      console.log('No convertible files found in testcases/ folder.');
    }
  }
}

// Run CLI if executed directly
if (require.main === module) {
  main().catch(err => {
    console.error(`Fatal error: ${err.message}`);
    process.exit(1);
  });
}

/**
 * Get the path to the converted/ subfolder for a given testcases directory.
 * @param {string} [testcasesDir]
 * @returns {string}
 */
function getConvertedDir(testcasesDir) {
  const dir = testcasesDir || path.resolve(__dirname, '..', '..', 'testcases');
  return path.join(dir, CONVERTED_SUBFOLDER);
}

module.exports = {
  convertFile,
  convertAll,
  getConvertedDir,
  parseStructuredText,
  SUPPORTED_EXTENSIONS,
  CONVERTED_SUBFOLDER,
};
