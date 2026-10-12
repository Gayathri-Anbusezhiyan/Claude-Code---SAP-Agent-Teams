# TC-CS-180: Missing Operation Number

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Master Recipes |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and configured for plant `{TD.plant}` with Material Type FERT or HALB |
| P4 | Master Data | Work Center `{TD.workCenter}` is created, active, and assigned to plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is assigned to company code `{TD.companyCode}` in enterprise structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished or semi-finished product material number — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Recipe Description | `{TD.recipeDescription}` | Recipe description text — entered by the user | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code — selected by the user | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity — entered by the user | Valid |
| Base UoM | `{TD.baseUoM}` | Unit of measure for base quantity — verified by the system | Valid |
| Operation Number | `{TD.emptyValue}` | Operation Number field left blank — NOT entered by the user | Missing (mandatory field) |
| Work Center | `{TD.workCenter}` | Work center code — entered by the user | Valid |
| Operation Description | `{TD.operationDescription}` | Operation short text — entered by the user | Valid |
| Control Key | `{TD.controlKey}` | Control key for operation — selected by the user | Valid |
| Effective Date | `{TD.effectiveDate}` | Valid from date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Master Recipes" | — | Search results appear listing the "Manage Master Recipes" application |
| 8 | Click the "Manage Master Recipes" application from the search results | — | Manage Master Recipes application opens displaying the recipe list |
| 9 | Click the "Create" button in the application toolbar | — | New Master Recipe creation form opens in edit mode |
| 10 | In the "Material:*" header field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material description `{TD.materialDescription}` is auto-populated in the header |
| 12 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; Plant name is auto-populated |
| 14 | In the "Description:*" field, enter the Recipe Description | `{TD.recipeDescription}` | Recipe Description text is entered |
| 15 | In the "Recipe Type:*" field, select the Recipe Type | `{TD.recipeType}` | Recipe Type is selected from dropdown |
| 16 | In the "Base Quantity:*" field, enter the Base Quantity | `{TD.baseQuantity}` | Base Quantity is entered |
| 17 | Verify that the Unit of Measure field is populated | `{TD.baseUoM}` | UoM field shows the expected unit (auto-populated from material master) |
| 18 | In the "Valid From:*" field, enter the Effective Date | `{TD.effectiveDate}` | Effective Date is entered |
| 19 | In the "Operations" section, click the "Add" button to add a new operation | — | A new empty operation row appears in the Operations table |
| 20 | Leave the "Operation:*" field blank (do not enter any value) | `{TD.emptyValue}` | Operation Number field remains empty |
| 21 | In the "Work Center:*" field, enter the Work Center code | `{TD.workCenter}` | Work Center code is entered |
| 22 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center Description `{TD.workCenterDescription}` is auto-populated |
| 23 | In the "Operation Short Text:*" field, enter the Operation Description | `{TD.operationDescription}` | Operation Description text is entered |
| 24 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected from dropdown |
| 25 | Attempt to click the "Save" button | — | System prevents save operation; Operation Number field is highlighted as mandatory with error indicator |
| 26 | Observe the validation error message | — | System displays an error message indicating that Operation Number is a mandatory field; error pattern: "Enter an Operation Number" or "Operation is a required field" |
| 27 | Verify that no Recipe ID is generated | — | No Recipe ID appears in the header; recipe is not created or saved |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System enforces mandatory field validation for Operation Number
- An error message is displayed indicating that Operation Number is required and must be entered
- Operation Number field is highlighted with an error indicator (red border or icon)
- Recipe is NOT created or saved
- No Recipe ID is generated
- The validation enforces the mandatory field rule defined in AC-5

---

### Post-conditions

- No Master Recipe is created in the SAP system
- No database changes are persisted
- No application-level errors or critical warnings remain outstanding beyond the expected mandatory field validation error

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
