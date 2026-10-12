# TC-CS-169: Create Master Recipe with multiple operations in sequence

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
| P4 | Master Data | Work Center `{TD.workCenter1}` exists, is active, and assigned to plant `{TD.plant}` |
| P5 | Master Data | Work Center `{TD.workCenter2}` exists, is active, and assigned to plant `{TD.plant}` |
| P6 | Master Data | Work Center `{TD.workCenter3}` exists, is active, and assigned to plant `{TD.plant}` |
| P7 | Master Data | Inspection Characteristic `{TD.inProcessCheckpointId}` exists in QM master data |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Recipe Description | `{TD.recipeDescription}` | Recipe description text | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity | Valid |
| Operation 1 Number | `{TD.operation1Number}` | First operation sequence number | Valid |
| Work Center 1 | `{TD.workCenter1}` | Work center for operation 1 (e.g., Mixing) | Valid |
| Operation 1 Description | `{TD.operation1Description}` | Operation 1 short text (e.g., "Raw Material Mixing") | Valid |
| Standard Duration 1 | `{TD.standardDuration1}` | Standard time for operation 1 | Valid |
| Operation 2 Number | `{TD.operation2Number}` | Second operation sequence number | Valid |
| Work Center 2 | `{TD.workCenter2}` | Work center for operation 2 (e.g., Heating) | Valid |
| Operation 2 Description | `{TD.operation2Description}` | Operation 2 short text (e.g., "Heating and Dissolution") | Valid |
| Standard Duration 2 | `{TD.standardDuration2}` | Standard time for operation 2 | Valid |
| Operation 3 Number | `{TD.operation3Number}` | Third operation sequence number | Valid |
| Work Center 3 | `{TD.workCenter3}` | Work center for operation 3 (e.g., Cooling) | Valid |
| Operation 3 Description | `{TD.operation3Description}` | Operation 3 short text (e.g., "Cooling and Quality Check") | Valid |
| Standard Duration 3 | `{TD.standardDuration3}` | Standard time for operation 3 | Valid |
| Inspection Characteristic | `{TD.inProcessCheckpointId}` | QM inspection characteristic ID | Valid |
| Target Value | `{TD.targetValue}` | Target value for in-process control | Valid |
| Lower Limit | `{TD.lowerLimit}` | Lower specification limit | Valid |
| Upper Limit | `{TD.upperLimit}` | Upper specification limit | Valid |

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
| 17 | In the "Operations" section, click the "Add" button to add the first operation | — | A new empty operation row (Operation 1) appears |
| 18 | In the "Operation:*" field, enter the Operation 1 Number | `{TD.operation1Number}` | Operation 1 Number is entered |
| 19 | In the "Work Center:*" field, enter Work Center 1 | `{TD.workCenter1}` | Work Center 1 code is entered |
| 20 | Press Enter to confirm the Work Center entry | — | SAP validates work center; Work Center 1 Description is auto-populated |
| 21 | In the "Operation Short Text:*" field, enter Operation 1 Description | `{TD.operation1Description}` | Operation 1 Description is entered |
| 22 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected |
| 23 | In the "Standard Time:*" field, enter Standard Duration 1 | `{TD.standardDuration1}` | Standard Duration 1 is entered |
| 24 | In the "Time Unit:*" field, select the Time UoM | `{TD.timeUoM}` | Time Unit is selected |
| 25 | In the "In-Process Controls" sub-section, click "Add" to add a checkpoint | — | A new in-process control row appears for Operation 1 |
| 26 | In the "Inspection Characteristic:*" field, enter the Inspection Characteristic ID | `{TD.inProcessCheckpointId}` | Inspection Characteristic ID is entered |
| 27 | Press Enter to confirm the Inspection Characteristic entry | — | SAP validates the characteristic; details are retrieved |
| 28 | In the "Target Value:*" field, enter the Target Value | `{TD.targetValue}` | Target Value is entered |
| 29 | In the "Lower Limit:*" field, enter the Lower Limit | `{TD.lowerLimit}` | Lower Limit is entered |
| 30 | In the "Upper Limit:*" field, enter the Upper Limit | `{TD.upperLimit}` | Upper Limit is entered |
| 31 | Click the "Add" button in the Operations section to add the second operation | — | A new empty operation row (Operation 2) appears below Operation 1 |
| 32 | In the "Operation:*" field, enter the Operation 2 Number | `{TD.operation2Number}` | Operation 2 Number is entered |
| 33 | In the "Work Center:*" field, enter Work Center 2 | `{TD.workCenter2}` | Work Center 2 code is entered |
| 34 | Press Enter to confirm the Work Center entry | — | SAP validates work center; Work Center 2 Description is auto-populated |
| 35 | In the "Operation Short Text:*" field, enter Operation 2 Description | `{TD.operation2Description}` | Operation 2 Description is entered |
| 36 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected |
| 37 | In the "Standard Time:*" field, enter Standard Duration 2 | `{TD.standardDuration2}` | Standard Duration 2 is entered |
| 38 | In the "Time Unit:*" field, select the Time UoM | `{TD.timeUoM}` | Time Unit is selected |
| 39 | Click the "Add" button in the Operations section to add the third operation | — | A new empty operation row (Operation 3) appears below Operation 2 |
| 40 | In the "Operation:*" field, enter the Operation 3 Number | `{TD.operation3Number}` | Operation 3 Number is entered |
| 41 | In the "Work Center:*" field, enter Work Center 3 | `{TD.workCenter3}` | Work Center 3 code is entered |
| 42 | Press Enter to confirm the Work Center entry | — | SAP validates work center; Work Center 3 Description is auto-populated |
| 43 | In the "Operation Short Text:*" field, enter Operation 3 Description | `{TD.operation3Description}` | Operation 3 Description is entered |
| 44 | In the "Control Key:*" field, select the Control Key | `{TD.controlKey}` | Control Key is selected |
| 45 | In the "Standard Time:*" field, enter Standard Duration 3 | `{TD.standardDuration3}` | Standard Duration 3 is entered |
| 46 | In the "Time Unit:*" field, select the Time UoM | `{TD.timeUoM}` | Time Unit is selected |
| 47 | Click the "Save" button in the toolbar | — | SAP saves the recipe; Recipe ID is generated and displayed |
| 48 | Note the Recipe ID from the header | — | Recipe ID is displayed |
| 49 | Verify that all three operations are visible in the Operations section | — | Operations 1, 2, and 3 are listed in sequence order |
| 50 | Verify that Operation 1 contains the correct work center, description, and standard time | `{TD.workCenter1}`, `{TD.operation1Description}`, `{TD.standardDuration1}` | Operation 1 data is correctly saved |
| 51 | Verify that Operation 2 contains the correct work center, description, and standard time | `{TD.workCenter2}`, `{TD.operation2Description}`, `{TD.standardDuration2}` | Operation 2 data is correctly saved |
| 52 | Verify that Operation 3 contains the correct work center, description, and standard time | `{TD.workCenter3}`, `{TD.operation3Description}`, `{TD.standardDuration3}` | Operation 3 data is correctly saved |
| 53 | Verify that the Recipe Status displays "Draft" | — | Recipe Status shows "Draft" |
| 54 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 55 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 56 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Master Recipe ID is generated by SAP
- The recipe is persisted in SAP with status "Draft"
- All header data (Material, Plant, Description, Base Quantity) is correctly stored
- Three operations are successfully created and saved in sequence order
- Each operation contains the correct work center, operation description, control key, and standard time
- Operation 1 includes an in-process control checkpoint with target value and specification limits
- The recipe supports multi-step pharmaceutical manufacturing processes per AC-5
- The created recipe appears in the "Manage Master Recipes" list

---

### Post-conditions

- SAP Master Recipe exists with the generated Recipe ID
- Recipe status is "Draft"
- Recipe contains 3 operations in sequence
- All operation and in-process control data are correctly recorded
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
