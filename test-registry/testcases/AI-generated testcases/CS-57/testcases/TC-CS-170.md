# TC-CS-170: Create Master Recipe with multiple in-process control checkpoints per operation

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create Master Recipes |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and configured for plant `{TD.plant}` |
| P4 | Master Data | Work Center `{TD.workCenter}` exists, is active, and assigned to plant `{TD.plant}` |
| P5 | Master Data | Inspection Characteristic `{TD.checkpoint1Id}` exists in QM master data |
| P6 | Master Data | Inspection Characteristic `{TD.checkpoint2Id}` exists in QM master data |
| P7 | Master Data | Inspection Characteristic `{TD.checkpoint3Id}` exists in QM master data |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Recipe Description | `{TD.recipeDescription}` | Recipe description text | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity | Valid |
| Operation Number | `{TD.operationNumber}` | Operation sequence number | Valid |
| Work Center | `{TD.workCenter}` | Work center code | Valid |
| Operation Description | `{TD.operationDescription}` | Operation short text | Valid |
| Standard Duration | `{TD.standardDuration}` | Standard time for operation | Valid |
| Checkpoint 1 ID | `{TD.checkpoint1Id}` | First inspection characteristic (e.g., Temperature) | Valid |
| Checkpoint 1 Target | `{TD.checkpoint1Target}` | Target value for checkpoint 1 | Valid |
| Checkpoint 1 Lower | `{TD.checkpoint1Lower}` | Lower limit for checkpoint 1 | Valid |
| Checkpoint 1 Upper | `{TD.checkpoint1Upper}` | Upper limit for checkpoint 1 | Valid |
| Checkpoint 2 ID | `{TD.checkpoint2Id}` | Second inspection characteristic (e.g., pH Level) | Valid |
| Checkpoint 2 Target | `{TD.checkpoint2Target}` | Target value for checkpoint 2 | Valid |
| Checkpoint 2 Lower | `{TD.checkpoint2Lower}` | Lower limit for checkpoint 2 | Valid |
| Checkpoint 2 Upper | `{TD.checkpoint2Upper}` | Upper limit for checkpoint 2 | Valid |
| Checkpoint 3 ID | `{TD.checkpoint3Id}` | Third inspection characteristic (e.g., Viscosity) | Valid |
| Checkpoint 3 Target | `{TD.checkpoint3Target}` | Target value for checkpoint 3 | Valid |
| Checkpoint 3 Lower | `{TD.checkpoint3Lower}` | Lower limit for checkpoint 3 | Valid |
| Checkpoint 3 Upper | `{TD.checkpoint3Upper}` | Upper limit for checkpoint 3 | Valid |

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
| 10 | In the "Material:*" header field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material description is auto-populated |
| 12 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; Plant name is auto-populated |
| 14 | In the "Description:*" field, enter the Recipe Description | `{TD.recipeDescription}` | Recipe Description text is entered |
| 15 | In the "Recipe Type:*" field, select the Recipe Type | `{TD.recipeType}` | Recipe Type is selected |
| 16 | In the "Base Quantity:*" field, enter the Base Quantity | `{TD.baseQuantity}` | Base Quantity is entered |
| 17 | In the "Operations" section, click the "Add" button to add a new operation | — | A new empty operation row appears |
| 18 | In the "Operation:*" field, enter the Operation Number | `{TD.operationNumber}` | Operation Number is entered |
| 19 | In the "Work Center:*" field, enter the Work Center code | `{TD.workCenter}` | Work Center code is entered |
| 20 | Press Enter to confirm the Work Center entry | — | SAP validates work center; Work Center Description is auto-populated |
| 21 | In the "Operation Short Text:*" field, enter the Operation Description | `{TD.operationDescription}` | Operation Description is entered |
| 22 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected |
| 23 | In the "Standard Time:*" field, enter the Standard Duration | `{TD.standardDuration}` | Standard Duration is entered |
| 24 | In the "Time Unit:*" field, select the Time UoM | `{TD.timeUoM}` | Time Unit is selected |
| 25 | In the "In-Process Controls" sub-section, click "Add" to add the first checkpoint | — | A new in-process control row (Checkpoint 1) appears |
| 26 | In the "Inspection Characteristic:*" field, enter Checkpoint 1 ID | `{TD.checkpoint1Id}` | Checkpoint 1 ID is entered |
| 27 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the characteristic; details are retrieved |
| 28 | In the "Target Value:*" field, enter Checkpoint 1 Target | `{TD.checkpoint1Target}` | Checkpoint 1 Target Value is entered |
| 29 | In the "Lower Limit:*" field, enter Checkpoint 1 Lower | `{TD.checkpoint1Lower}` | Checkpoint 1 Lower Limit is entered |
| 30 | In the "Upper Limit:*" field, enter Checkpoint 1 Upper | `{TD.checkpoint1Upper}` | Checkpoint 1 Upper Limit is entered |
| 31 | In the "In-Process Controls" sub-section, click "Add" again to add the second checkpoint | — | A new in-process control row (Checkpoint 2) appears below Checkpoint 1 |
| 32 | In the "Inspection Characteristic:*" field, enter Checkpoint 2 ID | `{TD.checkpoint2Id}` | Checkpoint 2 ID is entered |
| 33 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the characteristic; details are retrieved |
| 34 | In the "Target Value:*" field, enter Checkpoint 2 Target | `{TD.checkpoint2Target}` | Checkpoint 2 Target Value is entered |
| 35 | In the "Lower Limit:*" field, enter Checkpoint 2 Lower | `{TD.checkpoint2Lower}` | Checkpoint 2 Lower Limit is entered |
| 36 | In the "Upper Limit:*" field, enter Checkpoint 2 Upper | `{TD.checkpoint2Upper}` | Checkpoint 2 Upper Limit is entered |
| 37 | In the "In-Process Controls" sub-section, click "Add" again to add the third checkpoint | — | A new in-process control row (Checkpoint 3) appears below Checkpoint 2 |
| 38 | In the "Inspection Characteristic:*" field, enter Checkpoint 3 ID | `{TD.checkpoint3Id}` | Checkpoint 3 ID is entered |
| 39 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the characteristic; details are retrieved |
| 40 | In the "Target Value:*" field, enter Checkpoint 3 Target | `{TD.checkpoint3Target}` | Checkpoint 3 Target Value is entered |
| 41 | In the "Lower Limit:*" field, enter Checkpoint 3 Lower | `{TD.checkpoint3Lower}` | Checkpoint 3 Lower Limit is entered |
| 42 | In the "Upper Limit:*" field, enter Checkpoint 3 Upper | `{TD.checkpoint3Upper}` | Checkpoint 3 Upper Limit is entered |
| 43 | Click the "Save" button in the toolbar | — | SAP saves the recipe; Recipe ID is generated and displayed |
| 44 | Note the Recipe ID from the header | — | Recipe ID is displayed |
| 45 | Verify that all three in-process control checkpoints are visible in the In-Process Controls section | — | Checkpoints 1, 2, and 3 are listed under the operation |
| 46 | Verify that Checkpoint 1 contains the correct characteristic, target, and limits | `{TD.checkpoint1Id}`, `{TD.checkpoint1Target}`, `{TD.checkpoint1Lower}`, `{TD.checkpoint1Upper}` | Checkpoint 1 data is correctly saved |
| 47 | Verify that Checkpoint 2 contains the correct characteristic, target, and limits | `{TD.checkpoint2Id}`, `{TD.checkpoint2Target}`, `{TD.checkpoint2Lower}`, `{TD.checkpoint2Upper}` | Checkpoint 2 data is correctly saved |
| 48 | Verify that Checkpoint 3 contains the correct characteristic, target, and limits | `{TD.checkpoint3Id}`, `{TD.checkpoint3Target}`, `{TD.checkpoint3Lower}`, `{TD.checkpoint3Upper}` | Checkpoint 3 data is correctly saved |
| 49 | Verify that the Recipe Status displays "Draft" | — | Recipe Status shows "Draft" |
| 50 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 51 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 52 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Master Recipe ID is generated by SAP
- The recipe is persisted in SAP with status "Draft"
- All header data (Material, Plant, Description, Base Quantity) is correctly stored
- One operation is created with three in-process control checkpoints
- Each checkpoint captures a different inspection characteristic (e.g., Temperature, pH, Viscosity)
- Each checkpoint includes target value, lower limit, and upper limit per AC-5
- The recipe supports quality-critical operations requiring multiple inspection points for GMP compliance
- The created recipe appears in the "Manage Master Recipes" list

---

### Post-conditions

- SAP Master Recipe exists with the generated Recipe ID
- Recipe status is "Draft"
- Recipe contains 1 operation with 3 in-process control checkpoints
- All checkpoint data (characteristic, target, limits) are correctly recorded
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
