# TC-CS-172: Attempt to create Process Order against Obsolete recipe version

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create Master Recipes and Process Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and configured for plant `{TD.plant}` with Material Type FERT or HALB |
| P4 | Master Data | Work Center `{TD.workCenter}` is created, active, and assigned to plant `{TD.plant}` |
| P5 | Master Data | Inspection Characteristic `{TD.inProcessCheckpointId}` exists in QM master data and is active |
| P6 | Configuration | Plant `{TD.plant}` is assigned to company code `{TD.companyCode}` in enterprise structure |
| P7 | Test Setup | A Master Recipe exists with status "Obsolete" (prior version that has been superseded) — Recipe ID: `{TD.obsoleteRecipeId}`, Version: `{TD.obsoleteRecipeVersion}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Obsolete Recipe ID | `{TD.obsoleteRecipeId}` | Recipe ID with status "Obsolete" — entered by the user | Invalid (for Process Order creation) |
| Obsolete Recipe Version | `{TD.obsoleteRecipeVersion}` | Version number of the obsolete recipe | Invalid (for Process Order creation) |
| Material Number | `{TD.materialNumber}` | Material number linked to the obsolete recipe | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Process Order Quantity | `{TD.processOrderQuantity}` | Quantity to produce — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 8 | Click the "Manage Process Orders" application from the search results | — | Manage Process Orders application opens displaying the process order list |
| 9 | Click the "Create" button in the application toolbar | — | New Process Order creation form opens in edit mode |
| 10 | In the "Material:*" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material description is auto-populated |
| 12 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; Plant name is auto-populated |
| 14 | In the "Production Quantity:*" field, enter the Process Order Quantity | `{TD.processOrderQuantity}` | Process Order Quantity is entered |
| 15 | In the "Recipe:*" field, enter the Obsolete Recipe ID | `{TD.obsoleteRecipeId}` | Obsolete Recipe ID is entered |
| 16 | If a version field is present, enter the Obsolete Recipe Version | `{TD.obsoleteRecipeVersion}` | Obsolete Recipe Version is entered |
| 17 | Press Enter to confirm the Recipe entry | — | SAP validates the recipe; system detects that the recipe status is "Obsolete" |
| 18 | Attempt to save or submit the Process Order by clicking the "Save" or "Create" button | — | System displays an error message indicating that the recipe is not in "Released" status and prevents Process Order creation; error pattern: "Recipe [Recipe ID] version [Version] has status Obsolete and cannot be used for production" OR Process Order creation is blocked with appropriate validation error |
| 19 | Verify that the Process Order is NOT created | — | No Process Order number is generated; the form remains in edit mode with the error displayed |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents Process Order creation when the selected recipe has status "Obsolete"
- An error message is displayed indicating that only "Released" recipes can be used for production
- No Process Order number is generated
- The validation enforces the business rule defined in AC-4: recipes must be in "Released" status before a Process Order can be created against them
- Obsolete recipe versions are preserved for audit history but cannot be used for new production orders

---

### Post-conditions

- No Process Order is created in the SAP system
- The obsolete recipe status remains "Obsolete" (unchanged)
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

**Automation Note:** This test case is flagged as PARTIAL automation candidate due to dependency on "Manage Process Orders" application. Full automation requires Process Order app exploration or OData API integration for programmatic Process Order creation attempt.

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
