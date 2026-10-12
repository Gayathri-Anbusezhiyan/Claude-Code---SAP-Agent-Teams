# TC-CS-177: Missing Material Number

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
| P3 | Master Data | Plant `{TD.plant}` exists and is active |
| P4 | Configuration | Plant `{TD.plant}` is assigned to company code `{TD.companyCode}` in enterprise structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.emptyValue}` | Material Number field left blank — NOT entered by the user | Missing (mandatory field) |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Recipe Description | `{TD.recipeDescription}` | Recipe description text — entered by the user | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code — selected by the user | Valid |

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
| 10 | Leave the "Material:*" header field blank (do not enter any value) | `{TD.emptyValue}` | Material Number field remains empty |
| 11 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; Plant name is auto-populated |
| 13 | In the "Description:*" field, enter the Recipe Description | `{TD.recipeDescription}` | Recipe Description text is entered |
| 14 | In the "Recipe Type:*" field, select the Recipe Type | `{TD.recipeType}` | Recipe Type is selected from dropdown |
| 15 | Attempt to click the "Save" button | — | System prevents save operation; Material Number field is highlighted as mandatory with error indicator |
| 16 | Observe the validation error message | — | System displays an error message indicating that Material Number is a mandatory field; error pattern: "Enter a Material Number" or "Material is a required field" |
| 17 | Verify that no Recipe ID is generated | — | No Recipe ID appears in the header; recipe is not created or saved |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System enforces mandatory field validation for Material Number
- An error message is displayed indicating that Material Number is required and must be entered
- Material Number field is highlighted with an error indicator (red border or icon)
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
