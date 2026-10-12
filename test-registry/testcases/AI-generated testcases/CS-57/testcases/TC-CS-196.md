# TC-CS-196: INT-03: Validate QM Inspection Characteristic integration

**User Story:**          [CS-57] Create a Recipe (Master Recipe) With Operations and In-Process Controls
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Master Recipe Creation
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION_TEST
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create master recipes (C_RECIPE_MNT) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.material}` exists in Material Master (MM module), is active, and is enabled for recipe creation (Recipe Creation Allowed indicator is set) |
| P4 | Master Data | Plant `{TD.plant}` is active, is configured for production, and is assigned to company code |
| P5 | Master Data | Work Center `{TD.workCenter}` exists in Work Center Master (PP module), is active, and is assigned to plant `{TD.plant}` |
| P6 | Master Data | Inspection Characteristic `{TD.inspectionCharacteristic}` exists in QM Master Data (QM module), is active, and is enabled for in-process inspection |
| P7 | Configuration | Recipe Type `{TD.recipeType}` is configured and active in the system |
| P8 | Configuration | Control Key `{TD.controlKey}` is configured and active for operations |
| P9 | Integration | QM Inspection Characteristic Master (QM module) integration is active and accessible from Recipe Management |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.material}` | Material number from MM module — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Recipe Description | `{TD.recipeDescription}` | Descriptive text for the recipe — entered by the user | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code — entered by the user | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity — entered by the user | Valid |
| Effective Date | `{TD.effectiveDate}` | Recipe effective date — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation sequence number — entered by the user | Valid |
| Work Center | `{TD.workCenter}` | Work center ID from PP module — entered by the user | Valid |
| Operation Short Text | `{TD.operationShortText}` | Operation description — entered by the user | Valid |
| Control Key | `{TD.controlKey}` | Operation control key — entered by the user | Valid |
| Standard Time | `{TD.standardTime}` | Operation standard time — entered by the user | Valid |
| Time Unit | `{TD.timeUnit}` | Time unit of measure — entered by the user | Valid |
| Inspection Characteristic | `{TD.inspectionCharacteristic}` | Inspection characteristic ID from QM module — entered by the user | Valid |
| Target Value | `{TD.targetValue}` | Target value for inspection characteristic — entered by the user | Valid |
| Lower Limit | `{TD.lowerLimit}` | Lower specification limit — entered by the user | Valid |
| Upper Limit | `{TD.upperLimit}` | Upper specification limit — entered by the user | Valid |

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
| 8 | Click "Manage Master Recipes" from the search results | — | "Manage Master Recipes" application opens displaying the recipe list view |
| 9 | Click the "Create" button in the application toolbar | — | New recipe creation form opens in edit mode with header section visible |
| 10 | In the "Material:*" header field, enter the Material ID | `{TD.material}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; field is accepted |
| 12 | In the "Plant:*" header field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | Plant value is accepted |
| 14 | In the "Recipe Description:*" header field, enter the recipe description text | `{TD.recipeDescription}` | Recipe description is entered |
| 15 | In the "Recipe Type:*" header field, enter the recipe type code | `{TD.recipeType}` | Recipe type code is entered |
| 16 | Press Enter to confirm the Recipe Type entry | — | Recipe type value is accepted; recipe type description may be displayed |
| 17 | In the "Base Quantity:*" header field, enter the base quantity | `{TD.baseQuantity}` | Base quantity is entered with unit of measure displayed |
| 18 | In the "Effective Date:*" header field, enter the effective date | `{TD.effectiveDate}` | Effective date is entered in the field (format: YYYY-MM-DD or system date format) |
| 19 | Scroll down to the Operations section or click the "Operations" tab | — | Operations section is displayed with "Add Operation" button visible |
| 20 | Click the "Add Operation" button or equivalent control to add a new operation row | — | A new operation row is added with editable fields (Operation Number, Work Center, Operation Short Text, Control Key, Standard Time, Time Unit) |
| 21 | In the "Operation Number:*" field, enter the operation sequence number | `{TD.operationNumber}` | Operation number is entered |
| 22 | In the "Work Center:*" field, enter the Work Center ID | `{TD.workCenter}` | Work Center ID is entered into the field |
| 23 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; field is accepted |
| 24 | In the "Operation Short Text:*" field, enter the operation description | `{TD.operationShortText}` | Operation short text is entered |
| 25 | In the "Control Key:*" field, enter the control key code | `{TD.controlKey}` | Control key is entered |
| 26 | Press Enter to confirm the Control Key entry | — | Control key value is accepted |
| 27 | In the "Standard Time:*" field, enter the standard time value | `{TD.standardTime}` | Standard time is entered (numeric value) |
| 28 | In the "Time Unit:*" field, enter the time unit of measure | `{TD.timeUnit}` | Time unit is entered (e.g., MIN, HR) |
| 29 | Press Enter to confirm the Time Unit entry | — | Time unit value is accepted; operation row is completed |
| 30 | Scroll down to the In-Process Controls section or click the "In-Process Controls" tab within the operation | — | In-Process Controls section is displayed with "Add In-Process Control" button visible |
| 31 | Click the "Add In-Process Control" button or equivalent control to add a new inspection row | — | A new in-process control row is added with editable fields (Inspection Characteristic, Target Value, Lower Limit, Upper Limit) |
| 32 | In the "Inspection Characteristic:*" field, enter the Inspection Characteristic ID | `{TD.inspectionCharacteristic}` | Inspection Characteristic ID is entered into the field |
| 33 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the inspection characteristic via QM Master Data (QM module) integration; field is accepted |
| 34 | Verify that characteristic details are retrieved from QM master | — | Characteristic name/description is displayed OR characteristic is validated successfully (depending on UI design); QM master data integration is successful |
| 35 | In the "Target Value:*" field, enter the target value | `{TD.targetValue}` | Target value is entered (numeric value) |
| 36 | In the "Lower Limit:*" field, enter the lower specification limit | `{TD.lowerLimit}` | Lower limit is entered (numeric value) |
| 37 | In the "Upper Limit:*" field, enter the upper specification limit | `{TD.upperLimit}` | Upper limit is entered (numeric value) |
| 38 | Press Enter to confirm the Upper Limit entry | — | Upper limit value is accepted; in-process control row is completed |
| 39 | Click the "Save" button in the toolbar | — | SAP begins processing the recipe save operation |
| 40 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Recipe ID |
| 41 | Note the Recipe ID from the success message or the top-left header area | — | Recipe ID is displayed (format is system-generated) |
| 42 | Verify the recipe status in the header | — | Recipe status shows "Draft" (initial status for newly created recipes) |
| 43 | Verify that Inspection Characteristic data is correctly stored in the saved recipe | `{TD.inspectionCharacteristic}`, `{TD.targetValue}`, `{TD.lowerLimit}`, `{TD.upperLimit}` | In-process control row displays the correct Inspection Characteristic, Target Value, Lower Limit, and Upper Limit values; QM master data integration is validated |
| 44 | Navigate back to the "Manage Master Recipes" application list | — | Recipe list is displayed |
| 45 | Search for the newly created recipe using the Recipe ID noted in step 41 | — | The created recipe appears in the list with the expected Material, Plant, and Recipe Description |
| 46 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 47 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 48 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Recipe ID is generated by SAP and displayed in the confirmation message
- The recipe is persisted in SAP with status "Draft"
- All header data (Material, Plant, Recipe Description, Recipe Type, Base Quantity, Effective Date) is correctly stored
- All operation data (Operation Number, Work Center, Operation Short Text, Control Key, Standard Time, Time Unit) is correctly stored
- All in-process control data (Inspection Characteristic, Target Value, Lower Limit, Upper Limit) is correctly stored
- **Inspection Characteristic details are retrieved from QM Master Data (QM module)** — QM module integration is successful
- The Inspection Characteristic is validated successfully by the QM master data system
- The created recipe appears in the "Manage Master Recipes" list and can be viewed

---

### Post-conditions

- SAP Master Recipe document exists with the generated Recipe ID
- Recipe status is "Draft"
- Material, Plant, Recipe Description, Recipe Type, Base Quantity, and Effective Date are correctly recorded
- Operation is correctly recorded with Operation Number, Work Center, Operation Short Text, Control Key, Standard Time, and Time Unit
- In-process control is correctly recorded with Inspection Characteristic, Target Value, Lower Limit, and Upper Limit
- Inspection Characteristic is correctly validated against QM Master Data (QM module)
- QM Inspection Characteristic Master (QM module) integration is validated — data validation is successful
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
