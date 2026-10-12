# Generate Test Execution Reports

Generate comprehensive Excel and PDF reports from Playwright test execution results.

## Command

`/generate-reports [results-path]`

## Parameters

- **`results-path`** (optional): Path to `results.json` file from Playwright test execution
  - If not provided, automatically uses the latest results from `test-registry/automation/test-results/reports/`

## What It Does

Generates two comprehensive reports:

1. **Excel Report** (`.xlsx`)
   - Test case summary with pass/fail status
   - Detailed test steps for each test case
   - Execution metadata (duration, timestamps)
   - Sortable and filterable data

2. **PDF Report** (`.pdf`)
   - Executive summary with metrics
   - Test case details with color-coded status badges
   - Test steps in tabular format
   - Professional, print-ready layout

## Execution Steps

Follow these steps in order:

### Step 1: Locate Results File

```javascript
// If results-path not provided, find the latest
const resultsPath = args || await findLatestResults();

async function findLatestResults() {
  const reportsDir = 'test-registry/automation/test-results/reports';
  
  // Get all timestamp folders
  const folders = await fs.readdir(reportsDir);
  
  // Sort by timestamp (folder name)
  folders.sort().reverse();
  
  // Return path to results.json in latest folder
  return path.join(reportsDir, folders[0], 'results.json');
}
```

Verify the file exists:
```bash
test -f "<results-path>" && echo "Found results.json" || echo "ERROR: results.json not found"
```

### Step 2: Generate PDF Report

```bash
node ai-engine/utils/enhanced-pdf-report.js "<results-path>" "test-registry/pdf-reports/test-execution-report-<timestamp>.pdf"
```

**What this does:**
- Reads test execution results from `results.json`
- Parses test case markdown files for test steps
- Generates professional PDF with:
  - Summary metrics (total, passed, failed, pass rate)
  - Individual test case details
  - Test steps in tabular format
  - Failure error messages
- Outputs: `test-registry/pdf-reports/test-execution-report-<timestamp>.pdf`

### Step 3: Generate Excel Report

```bash
node ai-engine/utils/export-testcases.js
```

**What this does:**
- Reads all test cases from `test-registry/testcases/AI-generated testcases/`
- Exports to Excel format with:
  - Test case ID, title, type, priority
  - Preconditions, test steps, expected results
  - All metadata fields
- Outputs: `ai-engine/SAP_Test_Cases_Export.xlsx`

Then move to reports folder:
```bash
cp ai-engine/SAP_Test_Cases_Export.xlsx "test-registry/pdf-reports/test-cases-export-<timestamp>.xlsx"
```

### Step 4: Read Both Reports

Read the generated files to confirm they exist:

```javascript
const fs = require('fs').promises;

// Check PDF
const pdfPath = 'test-registry/pdf-reports/test-execution-report-<timestamp>.pdf';
const pdfStats = await fs.stat(pdfPath);
console.log(`PDF: ${(pdfStats.size / 1024).toFixed(2)} KB`);

// Check Excel
const excelPath = 'test-registry/pdf-reports/test-cases-export-<timestamp>.xlsx';
const excelStats = await fs.stat(excelPath);
console.log(`Excel: ${(excelStats.size / 1024).toFixed(2)} KB`);
```

### Step 5: Report Results

Provide a summary to the user:

```markdown
## ✅ Test Reports Generated Successfully!

### PDF Report
📄 **Location:** `test-registry/pdf-reports/test-execution-report-<timestamp>.pdf`
- Executive summary with pass/fail metrics
- Test case details with status badges
- Test steps in tabular format
- Failure error messages
- **Size:** X.XX KB

### Excel Report  
📊 **Location:** `test-registry/pdf-reports/test-cases-export-<timestamp>.xlsx`
- All test cases with complete details
- Sortable columns (Status, Priority, Type)
- Test steps and expected results
- Metadata fields
- **Size:** X.XX KB

### Next Steps
- Open PDF report for executive review
- Open Excel report for detailed analysis
- Share reports with stakeholders
```

## Error Handling

### Results File Not Found
```markdown
❌ **Error:** Test results file not found.

**Possible causes:**
1. No tests have been executed yet
2. Invalid results path provided
3. Results folder was deleted

**Solution:**
Run tests first: `npm test`

Then generate reports: `/generate-reports`
```

### PDF Generation Failed
```markdown
❌ **Error:** PDF report generation failed.

**Possible causes:**
1. Test case markdown files not found
2. Chromium not installed
3. Insufficient disk space

**Solution:**
1. Verify test cases exist in `test-registry/testcases/AI-generated testcases/`
2. Reinstall Playwright: `npx playwright install chromium`
3. Check disk space
```

### Excel Export Failed
```markdown
❌ **Error:** Excel report generation failed.

**Possible causes:**
1. No test cases found
2. Invalid test case format
3. ExcelJS module missing

**Solution:**
1. Verify test cases exist in `test-registry/testcases/AI-generated testcases/`
2. Run: `npm install exceljs`
```

## Usage Examples

### Example 1: Auto-detect Latest Results
```
User: /generate-reports

Agent: [Finds latest results.json automatically]
       [Generates PDF report]
       [Generates Excel report]
       [Reports both file locations]
```

### Example 2: Specific Results File
```
User: /generate-reports test-registry/automation/test-results/reports/2026-08-22T14-30-15/results.json

Agent: [Uses specified results.json]
       [Generates PDF report]
       [Generates Excel report]
       [Reports both file locations]
```

### Example 3: After Test Execution
```
User: /run-tests CS-2

Agent: [Executes tests]
       [Test execution complete]
       
User: /generate-reports

Agent: [Uses results from /run-tests]
       [Generates both reports]
       [Reports locations]
```

## Output Directory Structure

```
test-registry/pdf-reports/
├── test-execution-report-2026-08-22T14-30-15.pdf   ← PDF report
├── test-execution-report-2026-08-22T14-30-15.html  ← HTML preview
├── test-cases-export-2026-08-22T14-30-15.xlsx      ← Excel report
└── ...
```

## Integration with Pipeline

This command can be called automatically after test execution in the E2E pipeline:

```
Phase 5 — Run Tests → test-registry/automation/test-results/
Phase 6 — Generate Reports → test-registry/pdf-reports/ (PDF + Excel)
Phase 7 — Self-Healing (if needed)
Phase 8 — Defect Logging (if needed)
```

## Dependencies

- **Node.js packages:** (already installed)
  - `@playwright/test` (for PDF generation via Chromium)
  - `exceljs` (for Excel generation)
  - `xlsx` (alternative Excel library)

## Related Commands

- `/run-tests {KEY}` — Execute Playwright tests
- `/run-scriptless {KEY}` — Execute tests via MCP (no Playwright)
- `/self-heal {TC-ID}` — Analyze and fix test failures

## Notes

- PDF report includes test steps parsed from markdown files in `test-registry/testcases/`
- Excel report includes all test cases, not just executed ones
- Both reports are timestamped to avoid overwriting previous reports
- HTML preview file is also generated alongside PDF for quick browser preview
- Reports are saved to `test-registry/pdf-reports/` for easy access

## Autonomous Mode

This command operates fully autonomously:
- No user confirmations required
- Auto-detects latest results if path not provided
- Creates output directory if it doesn't exist
- Handles errors gracefully with clear messages
