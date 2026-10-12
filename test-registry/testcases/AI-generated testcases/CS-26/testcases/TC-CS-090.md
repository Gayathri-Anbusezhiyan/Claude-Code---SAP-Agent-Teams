# TC-CS-090: Verify Batch Traceability Report with Multi-Plant Complexity

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.multiPlantBatchNumber}` exists in SAP batch master (MCHA) and is associated with material `{TD.multiPlantMaterial}` |
| P4 | Transactional Data | Batch `{TD.multiPlantBatchNumber}` has goods movements recorded across multiple plants (e.g., Plant `{TD.plant1}`, Plant `{TD.plant2}`, Plant `{TD.plant3}`) |
| P5 | Transactional Data | Movements include inter-plant transfers (movement type 311) and plant-specific consumption/issues |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.multiPlantBatchNumber}` | Batch master number with movements across multiple plants — entered by the user | Valid |
| Material Number | `{TD.multiPlantMaterial}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.multiPlantMaterialDesc}` | Material description — verified in results | Auto-populated |
| Plant 1 | `{TD.plant1}` | First plant code — verified in results | Valid |
| Plant 2 | `{TD.plant2}` | Second plant code — verified in results | Valid |
| Plant 3 | `{TD.plant3}` | Third plant code — verified in results | Valid |
| Transfer Movement Type | `{TD.movementTypeTransfer311}` | Movement type code for inter-plant transfer (311) | Valid |
| Consumption Movement Type | `{TD.movementTypeConsumption261}` | Movement type code for consumption (261) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Where-Used List" | — | Search results appear listing the "Batch Where-Used List" application |
| 8 | Click the "Batch Where-Used List" application name from the search results | — | Batch Where-Used List application opens with search criteria fields displayed |
| 9 | In the "Batch" search field, enter the batch number with multi-plant movements | `{TD.multiPlantBatchNumber}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Verify that the results screen displays the batch number and material details | `{TD.multiPlantBatchNumber}`, `{TD.multiPlantMaterial}`, `{TD.multiPlantMaterialDesc}` | Batch number, material number, and description are visible in the results |
| 13 | Verify that goods movements from Plant 1 are displayed in the results table | `{TD.plant1}` | Movement entries with plant code `{TD.plant1}` are visible |
| 14 | Verify that goods movements from Plant 2 are displayed in the results table | `{TD.plant2}` | Movement entries with plant code `{TD.plant2}` are visible |
| 15 | Verify that goods movements from Plant 3 are displayed in the results table | `{TD.plant3}` | Movement entries with plant code `{TD.plant3}` are visible |
| 16 | Locate inter-plant transfer movements in the results table | `{TD.movementTypeTransfer311}` | Transfer movement entries with movement type 311 are visible, showing source and destination plants |
| 17 | Verify that inter-plant transfer entries display both source plant and destination plant | `{TD.plant1}`, `{TD.plant2}` | Transfer rows show movement from one plant to another (e.g., Plant 1 → Plant 2) |
| 18 | Locate plant-specific consumption movements in the results table | `{TD.movementTypeConsumption261}` | Consumption movement entries with movement type 261 are visible for specific plants |
| 19 | Verify that all movement entries include dates, quantities, plants, and material document numbers | — | Each movement row displays date, quantity, plant, movement type, and material document number |
| 20 | Verify that the batch traceability accurately reflects the complete movement chain across all plants | — | All movements across all plants are present and correctly sequenced |
| 21 | Verify that storage locations are correctly displayed for each plant-specific movement | — | Storage location codes are visible and correspond to the correct plants |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully for a batch with movements across multiple plants
- All goods movements from all plants are accurately retrieved and displayed in the results
- Inter-plant transfer movements are correctly displayed with source and destination plant information
- Plant-specific consumption and issue movements are correctly attributed to their respective plants
- Storage location information is correctly displayed for each plant
- The complete batch movement chain across all plants is visible and verifiable
- All verification steps pass with no missing data or errors

---

### Post-conditions

- Batch traceability report data for multi-plant scenarios is retrieved and displayed accurately from SAP
- No application-level errors or critical warnings remain outstanding
- User session is terminated cleanly

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
