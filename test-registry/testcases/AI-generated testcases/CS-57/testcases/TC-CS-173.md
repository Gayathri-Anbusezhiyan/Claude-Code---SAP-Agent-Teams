# TC-CS-173: Attempt to release recipe without completing approval workflow

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Master Recipes (but NOT approval authorization) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and configured for plant `{TD.plant}` with Material Type FERT or HALB |
| P4 | Master Data | Work Center `{TD.workCenter}` is created, active, and assigned to plant `{TD.plant}` |
| P5 | Master Data | Inspection Characteristic `{TD.inProcessCheckpointId}` exists in QM master data and is active |
| P6 | Configuration | Approval workflow is configured and active for Master Recipe release process |
| P7 | Configuration | Plant `{TD.plant}` is assigned to company code `{TD.companyCode}` in enterprise structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished or semi-finished product material number — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Recipe Description | `{TD.recipeDescription}` | Recipe description text — entered by the user | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code — selected by the user | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity — entered by the user | Valid |
| Base UoM | `{TD.baseUoM}` | Unit of measure for base quantity — verified by the system | Valid |
| Operation Number | `{TD.operationNumber}` | Operation sequence number — entered by the user | Valid |
| Work Center | `{TD.workCenter}` | Work center code — entered by the user | Valid |
| Operation Description | `{TD.operationDescription}` | Operation short text — entered by the user | Valid |
| Control Key | `{TD.controlKey}` | Control key for operation — selected by the user | Valid |
| Standard Duration | `{TD.standardDuration}` | Standard time for operation — entered by the user | Valid |
| Time UoM | `{TD.timeUoM}` | Time unit of measure — selected by the user | Valid |
| Inspection Characteristic | `{TD.inProcessCheckpointId}` | QM inspection characteristic ID — entered by the user | Valid |
| Target Value | `{TD.targetValue}` | Target value for in-process control — entered by the user | Valid |
| Lower Limit | `{TD.lowerLimit}` | Lower specification limit — entered by the user | Valid |
| Upper Limit | `{TD.upperLimit}` | Upper specification limit — entered by the user | Valid |
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
| 20 | In the "Operation:*" field of the new row, enter the Operation Number | `{TD.operationNumber}` | Operation Number is entered |
| 21 | In the "Work Center:*" field, enter the Work Center code | `{TD.workCenter}` | Work Center code is entered |
| 22 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center Description `{TD.workCenterDescription}` is auto-populated |
| 23 | In the "Operation Short Text:*" field, enter the Operation Description | `{TD.operationDescription}` | Operation Description text is entered |
| 24 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected from dropdown |
| 25 | In the "Standard Time:*" field, enter the Standard Duration | `{TD.standardDuration}` | Standard Duration is entered |
| 26 | In the "Time Unit:*" field, select the Time UoM | `{TD.timeUoM}` | Time Unit is selected from dropdown |
| 27 | In the "In-Process Controls" sub-section of the operation, click the "Add" button | — | A new empty in-process control row appears |
| 28 | In the "Inspection Characteristic:*" field, enter the Inspection Characteristic ID | `{TD.inProcessCheckpointId}` | Inspection Characteristic ID is entered |
| 29 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the characteristic; characteristic details are retrieved from QM master |
| 30 | In the "Target Value:*" field, enter the Target Value | `{TD.targetValue}` | Target Value is entered |
| 31 | In the "Lower Limit:*" field, enter the Lower Limit | `{TD.lowerLimit}` | Lower Limit is entered |
| 32 | In the "Upper Limit:*" field, enter the Upper Limit | `{TD.upperLimit}` | Upper Limit is entered |
| 33 | Click the "Save" button in the toolbar | — | SAP saves the recipe; a Recipe ID is generated and displayed in the header |
| 34 | Note the Recipe ID from the header | — | Recipe ID is displayed (format is system-generated) |
| 35 | Verify that the Recipe Status field displays "Draft" | — | Recipe Status shows "Draft" |
| 36 | Check the toolbar for a "Release" or "Set to Released" button | — | If a "Release" button exists and is enabled, it should NOT be present or should be disabled; only "Submit for Approval" button should be available |
| 37 | Attempt to manually change the Recipe Status to "Released" if a status dropdown is editable | — | The status field is either read-only or does not allow direct change to "Released" without approval workflow completion |
| 38 | Verify that the Recipe Status remains "Draft" | — | Recipe Status continues to show "Draft"; no unauthorized status change occurs |
| 39 | Verify that the recipe cannot be used for Process Order creation while in "Draft" status | — | The business rule enforcement (tested in TC-CS-171) prevents Process Order creation against Draft recipes |
| 40 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 41 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 42 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Recipe is saved with status "Draft"
- System prevents the recipe from being directly released to "Released" status without approval workflow completion
- No "Release" action is available to users without approval authorization OR the "Release" action is disabled/unavailable until approval workflow is completed
- Recipe status remains "Draft" or changes to "In Approval" only after "Submit for Approval" action is executed
- The validation enforces the business rule defined in AC-2: recipe status must change to "Released" only through the approval workflow, not through direct user action

---

### Post-conditions

- SAP Master Recipe document exists with the generated Recipe ID
- Recipe status is "Draft"
- Recipe version is 1 (initial version)
- Material, plant, operations, and in-process control data are correctly recorded
- Recipe cannot be used for Process Order creation (status is not "Released")
- No application-level errors or critical warnings remain outstanding

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
