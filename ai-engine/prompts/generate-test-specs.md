# Generate Test Specs from Test Cases + Page Objects

## Purpose
Generate Playwright test specification files (.spec.js) for SAP Fiori automation, mapping test cases to executable tests using page objects.

## Input
- Test cases: `testcases/<module>-<app>-testcases.md` (Markdown) or `testcases/<name>.xlsx` (Excel)
  - **For Excel files**: Use the reader utility to extract steps: `node -e "const r = require('./automation/utils/excel-reader.js'); console.log(JSON.stringify(r.readTestSteps('testcases/<file>.xlsx'), null, 2))"`
  - Each Excel row has: Step number, Action (what the user does), Expected Result (what to verify)
  - Map each Action to a page object method call in the spec
  - Map each Expected Result to an assertion
- Page object: `automation/pages/<module>/<app>/<app>.page.js`
- Fixtures: `automation/pages/<module>/<app>/<app>.fixtures.js`
- Test data: `automation/test-data/<module>-<app>.data.json`
- Blueprint: `blueprints/POM-JavaScript-Blueprint.md`

## Output
- Test spec: `automation/tests/<module>-<app>.spec.js`

## Generation Rules

### 1. File Structure

```javascript
// automation/tests/<module>-<app>.spec.js

const { test, expect } = require('../pages/<module>/<app>/<app>.fixtures');
const { getTestCase } = require('../fixtures/test-data');
const { logger } = require('../utils/logger');

test.describe('<Module Name> - <App Name>', () => {

  test('TC_<MODULE>_<APP>_001: <Test Case Title>', async ({ <appName>Page }) => {
    const tc = getTestCase('<module>-<app>', 'TC_<MODULE>_<APP>_001');
    logger.testStart('TC_<MODULE>_<APP>_001', '<Test Case Title>');

    // Step 1: <Action description>
    await <appName>Page.<method>(tc.input.<field>);

    // Step 2: <Action description>
    await <appName>Page.<method>(tc.input.<field>);

    // Expected: <Assertion>
    const result = await <appName>Page.<assertionMethod>();
    expect(result).toBeTruthy();

    logger.testEnd('TC_<MODULE>_<APP>_001', 'passed');
  });

});
```

### 2. Test Case to Spec Mapping Rules

**Test title format:**
```
'TC_<ID>: <Test Case Title from testcase file>'
```
The TC ID MUST appear in the test title for grep-based execution.

**Test data loading:**
```javascript
const tc = getTestCase('<module>-<app>', '<TC_ID>');
```
Use test data from JSON files — never hardcode values in specs.

**Step mapping:**
- Each numbered test step maps to a page object method call
- Add a comment with the step number and description
- Group related steps logically

**Assertions:**
- Map "Expected Result" from test cases to Playwright `expect()` calls
- Use page object assertion helpers (e.g., `hasSuccessMessage()`)
- Common assertion patterns:
  ```javascript
  // Success message
  expect(await page.hasSuccessMessage(tc.expected.messagePattern)).toBeTruthy();

  // Table has results
  const table = await page.getResultsTable();
  await table.waitForLoad();
  expect(await table.getRowCount()).toBeGreaterThan(0);

  // Page navigation
  expect(page.page.url()).toContain(tc.expected.urlFragment);

  // Field value
  const field = await page.loc('fieldName');
  await expect(field).toHaveValue(tc.expected.fieldValue);
  ```

### 3. Test Organization

**Grouping:** One `test.describe` block per SAP app, containing all test cases for that app.

**Ordering:** Tests should follow the natural workflow order:
1. View/List tests (read operations)
2. Search/Filter tests
3. Create tests (write operations)
4. Edit/Update tests
5. Delete tests
6. Error/Negative path tests

**Independence:** Each test must be independent — don't rely on data created by previous tests. Use test data JSON files for all input values.

### 4. SAP-Specific Patterns

**Authentication:** Handled by fixtures — tests receive an already-authenticated page object.

**Navigation:** Handled by fixtures — page object is already on the target app.

**Waiting:** Page object methods include waits internally. No explicit waits needed in specs.

**Error handling tests:**
```javascript
test('TC_XX_001: Validate required field error', async ({ appPage }) => {
  // Leave required fields empty
  await appPage.clickSave();

  // Expect error message
  const messages = await appPage.messageHelper.getPopoverMessages();
  expect(messages.length).toBeGreaterThan(0);
  expect(messages[0].title).toContain('required');
});
```

### 5. Test Data JSON Format

Generate corresponding test data file at `automation/test-data/<module>-<app>.data.json`:

```json
{
  "feature": "<module>-<app>",
  "testData": {
    "TC_<MODULE>_<APP>_001": {
      "description": "<Test case title>",
      "input": {
        "<field1>": "<value1>",
        "<field2>": "<value2>"
      },
      "expected": {
        "messagePattern": "<expected message text>",
        "statusAfterAction": "<expected status>"
      }
    }
  }
}
```

## Quality Checks
- Every test case from testcases/ has a corresponding `test()` block
- Every `test()` block title includes the TC ID
- All input values come from test data JSON (no hardcoded values in specs)
- Assertions match the "Expected Result" from test cases
- Tests are independent and repeatable
- Logger calls bracket each test (testStart/testEnd)
- No direct locator usage in specs — everything goes through page object methods
