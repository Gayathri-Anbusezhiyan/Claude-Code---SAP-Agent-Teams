# Export Test Cases to Excel

Export test cases from markdown format to Excel workbook with full traceability (User Story ID, declared test data values, execution status, and defects).

## Command

`/export-testcases [story-key]`

## Parameters

- **`story-key`** (optional): Specific story to export (e.g., CS-2, CS-3). If not provided, exports all stories.

## What It Does

Uses the enhanced Excel exporter (`ai-engine/utils/excel-export.js`) to generate a comprehensive Excel workbook with:

1. **Test Case Summary** - Overview of all test cases with metadata
2. **Test Steps** - All test steps with User Story ID column
3. **Pre-conditions** - Test case prerequisites
4. **Test Data** - Declared values from testdata.json files
5. **Error Scenarios** - Expected error conditions (if any)
6. **Traceability** - Execution status and defect tracking

## Features

✅ **User Story ID** in Test Steps sheet  
✅ **Declared test data values** from testdata.json  
✅ **Execution status** from Playwright/scriptless/exploration results  
✅ **Defect tracking** from defect records  
✅ **Color-coded status** (Green = PASS, Red = FAIL, Gray = NOT_EXECUTED)

## Execution Steps

Follow these steps in order:

### Step 1: Parse Command Arguments

```javascript
const storyKey = args ? args.trim() : null;
```

If `storyKey` is provided, export single story. Otherwise, export all stories.

### Step 2: Execute Export

**Single Story Export:**
```bash
node -e "const { TestCaseExcelExporter } = require('./ai-engine/utils/excel-export.js'); const exporter = new TestCaseExcelExporter(); exporter.exportStory('${storyKey}').then(path => console.log('Exported:', path)).catch(err => console.error('Error:', err.message));"
```

**All Stories Export:**
```bash
node -e "const { TestCaseExcelExporter } = require('./ai-engine/utils/excel-export.js'); const exporter = new TestCaseExcelExporter(); exporter.exportAllStories().then(path => console.log('Exported:', path)).catch(err => console.error('Error:', err.message));"
```

### Step 3: Report Results

Parse the output to extract the file path and report to the user:

**Success:**
```markdown
## ✅ Test Cases Exported Successfully!

### Excel Workbook
📊 **Location:** `{output-path}`

### Sheets Included
1. **Test Case Summary** - Overview with metadata
2. **Test Steps** - All steps with User Story ID
3. **Pre-conditions** - Prerequisites
4. **Test Data** - Declared values from testdata.json
5. **Error Scenarios** - Expected errors (if any)
6. **Traceability** - Execution status + defects

### Enhancements
✅ User Story ID column in Test Steps
✅ Declared test data values (not placeholders)
✅ Execution status from test results
✅ Defect tracking from defect records

### File Size
**{file-size} KB**

You can open the Excel file to view all test cases and their details.
```

**Error:**
```markdown
❌ **Error:** Test case export failed.

**Cause:** {error-message}

**Possible reasons:**
1. Story key not found in test-registry/testcases/AI-generated testcases/
2. No test case markdown files in the story folder
3. Invalid story key format

**Solution:**
Check available stories:
`ls test-registry/testcases/AI-generated\ testcases/`

Then retry with a valid story key:
`/export-testcases CS-2`
```

## Error Handling

### Story Not Found
```markdown
❌ **Error:** Story {story-key} not found.

**Available stories:**
Run: `ls test-registry/testcases/AI-generated\ testcases/`

**Example:**
`/export-testcases CS-2`
```

### No Test Cases Found
```markdown
❌ **Error:** No test case files found for {story-key}.

**Check:**
`ls test-registry/testcases/AI-generated\ testcases/{story-key}/testcases/`

**Note:** Test cases must be generated first using:
`/testcase-pipeline {story-key}`
```

## Usage Examples

### Example 1: Export Single Story
```
User: /export-testcases CS-2

Agent: [Executes export for CS-2]
       [Reports Excel file location]
       
✅ Test Cases Exported Successfully!
📊 Location: test-registry/testcases/AI-generated testcases/CS-2/testcases/CS-2-testcases.xlsx
```

### Example 2: Export All Stories
```
User: /export-testcases

Agent: [Exports all stories to single workbook]
       [Reports Excel file location]

✅ Test Cases Exported Successfully!
📊 Location: test-registry/test-results/excel-exports/all-testcases.xlsx
```

### Example 3: Export CS-3 with Test Data
```
User: /export-testcases CS-3

Agent: [Executes export for CS-3]
       [Reads testdata.json]
       [Includes declared values]
       
✅ Test Cases Exported Successfully!
📊 Location: test-registry/testcases/AI-generated testcases/CS-3/testcases/CS-3-testcases.xlsx

Note: Test Data sheet includes declared values from testdata.json:
- TD-CS-003-001: poNumber = 4500065467
- TD-CS-003-002: modifiedQuantity = 15
```

## Output Location

### Single Story Export
```
test-registry/testcases/AI-generated testcases/{STORY-KEY}/testcases/{STORY-KEY}-testcases.xlsx
```

**Examples:**
- CS-2: `test-registry/testcases/AI-generated testcases/CS-2/testcases/CS-2-testcases.xlsx`
- CS-3: `test-registry/testcases/AI-generated testcases/CS-3/testcases/CS-3-testcases.xlsx`

### All Stories Export
```
test-registry/test-results/excel-exports/all-testcases.xlsx
```

## Sheet Structure

### 1. Test Case Summary
- TC ID, Title, Story, Module, Feature
- Test Type, Scenario, Priority, Severity
- Automation candidate, Effort, Steps count

### 2. Test Steps ✨ ENHANCED
- **User Story ID** (NEW)
- TC ID
- Step #
- Action
- Test Data
- Expected Result

### 3. Pre-conditions
- TC ID
- PC #
- Pre-condition
- Detail

### 4. Test Data ✨ ENHANCED
- **User Story ID** (NEW)
- **TC ID** (NEW)
- **Test Data ID** (NEW - from testdata.json)
- **Data Set Name** (NEW - from testdata.json)
- **Parameter** (NEW)
- **Value** (NEW - declared values)
- **Scenario Type** (NEW - HAPPY_PATH, ERROR_PATH, etc.)
- **Expected Outcome** (NEW)

### 5. Error Scenarios
- TC ID
- Error ID
- Trigger
- Expected Behavior
- Error Message

### 6. Traceability ✨ ENHANCED
- **User Story ID** (NEW)
- **Testcase ID** (NEW)
- **Execution Status** (NEW - PASS/FAIL/NOT_EXECUTED)
- **Defect ID** (NEW - linked defects)

## Data Sources

1. **Test Case Markdown Files**
   - `test-registry/testcases/AI-generated testcases/{STORY}/testcases/{TC-ID}.md`

2. **Test Data JSON**
   - `test-registry/testdata/{STORY}/{STORY}-testdata.json`

3. **Execution Results**
   - Playwright: `test-registry/automation/test-results/reports/{timestamp}/results.json`
   - Scriptless: `test-registry/scriptless-results/{STORY}/{TC-ID}-result.json`
   - Exploration: `test-registry/exploration-data/execution/{STORY}/{TC-ID}/{TC-ID}-execution.json`

4. **Defect Records**
   - `test-registry/defects/{STORY}/{TC-ID}-{timestamp}-defect.json`

## Integration with Pipeline

This command can be used after test case generation:

```
Phase 1 — Fetch User Story (Jira)
Phase 2 — Define Test Strategy
Phase 3 — Generate Test Cases
Phase 4 — Export Test Cases ← This command
Phase 5 — Generate Automation Scripts
Phase 6 — Run Tests
Phase 7 — Generate Reports
```

## Dependencies

- **Node.js packages:** (already installed)
  - `exceljs` (for Excel generation)

## Related Commands

- `/testcase-pipeline {KEY}` — Generate test cases before exporting
- `/generate-reports` — Generate execution reports (PDF + Excel)
- `/run-tests {KEY}` — Execute tests before exporting with execution status

## Notes

- Excel files use `.xlsx` format (modern Excel)
- All sheets have professional formatting with color-coding
- User Story ID is extracted from story key (not TC ID pattern)
- Test Data sheet shows declared values from testdata.json (not placeholders)
- Execution status checks multiple sources in priority order
- Defect IDs are comma-separated if multiple defects exist
- If testdata.json is missing, Test Data sheet shows "No test data found"
- If no execution data exists, status shows "NOT_EXECUTED"

## Warnings

⚠️ **File Locking:** If the Excel file is already open, the export will fail with "resource busy or locked" error. Close the file before re-exporting.

⚠️ **Missing Test Data:** CS-2 does not have a testdata.json file, so Test Data sheet will show "No test data found" (this is expected).

⚠️ **Story Key Format:** Use the exact story key from the testcases folder (e.g., "CS-2", not "cs-2" or "CS2").

## Autonomous Mode

This command operates fully autonomously:
- No user confirmations required
- Auto-detects all stories if no story key provided
- Creates output directory if it doesn't exist
- Handles missing data sources gracefully
- Reports clear success/error messages
