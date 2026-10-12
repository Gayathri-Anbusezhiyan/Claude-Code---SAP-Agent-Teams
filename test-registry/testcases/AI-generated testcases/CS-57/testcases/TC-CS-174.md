# TC-CS-174: Attempt to create recipe with invalid Material Number

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Master Recipes |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.invalidMaterialNumber}` does NOT exist in the SAP Material Master |
| P4 | Master Data | Plant `{TD.plant}` exists and is active |
| P5 | Configuration | Plant `{TD.plant}` is assigned to company code `{TD.companyCode}` in enterprise structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Material Number | `{TD.invalidMaterialNumber}` | Non-existent material number — entered by the user | Invalid |
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
| 10 | In the "Material:*" header field, enter the Invalid Material Number | `{TD.invalidMaterialNumber}` | Invalid Material Number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP attempts validation; system detects that the material does not exist in Material Master |
| 12 | Observe the validation response | — | System displays an error message indicating that the material does not exist; error pattern: "Material [Material Number] does not exist" or "Material [Material Number] is not valid" |
| 13 | Verify that the Material Description field remains empty | — | Material Description field is NOT auto-populated (validation failed) |
| 14 | Verify that the form cannot proceed to save or submit | — | The recipe creation form highlights the Material field as invalid; "Save" button may be disabled or clicking "Save" triggers the same validation error |
| 15 | Attempt to continue with Plant entry | `{TD.plant}` | Plant may be entered, but the Material validation error persists |
| 16 | Attempt to click the "Save" button | — | System prevents save operation; error message regarding invalid Material is displayed or persists |
| 17 | Verify that no Recipe ID is generated | — | No Recipe ID appears in the header; recipe is not created |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System validates the Material Number against Material Master during recipe creation
- An error message is displayed indicating that the entered material does not exist or is invalid
- Material Description field is not auto-populated (validation failed)
- Recipe is NOT created or saved
- No Recipe ID is generated
- The validation enforces the mandatory field and entity validation rules defined in AC-1 and AC-5

---

### Post-conditions

- No Master Recipe is created in the SAP system
- No database changes are persisted
- No application-level errors or critical warnings remain outstanding beyond the expected validation error

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
