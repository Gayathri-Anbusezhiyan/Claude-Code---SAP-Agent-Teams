# TC-CS-024: Attempt to Save Outbound Delivery Without Selecting Cold-Chain Carrier

**User Story:**          [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T
**Epic:**                N/A — no epic assigned
**Module:**              Logistics Execution / Sales & Distribution (LE/SD)
**Feature:**             Cold-Chain Outbound Delivery Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries for temperature-sensitive materials |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and ready for delivery creation |
| P4 | Master Data | Material `{TD.materialId}` exists, is flagged as temperature-sensitive in the material master, and has storage condition classification `{TD.storageConditionClassification}` (e.g., 2–8°C) |
| P5 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |
| P6 | Configuration | Cold-chain carrier selection is mandatory for materials flagged as temperature-sensitive |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Cold-Chain Carrier ID | `{TD.emptyValue}` | Carrier field left empty — NOT entered by the user | Empty/Missing |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Deliveries" | — | Search results appear listing the "Create Outbound Deliveries" application |
| 8 | Click the "Create Outbound Deliveries" application from the search results | — | Application opens with outbound delivery creation form |
| 9 | In the "Sales Order" field, enter the Sales Order Number | `{TD.salesOrderNumber}` | Sales Order Number is entered into the field |
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; order details are retrieved and displayed |
| 11 | In the "Material" field of the delivery item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated; storage condition classification is displayed; shipping condition is auto-proposed for cold-chain |
| 13 | In the "Quantity" field, enter the delivery quantity | `{TD.quantity}` | Quantity is populated in the delivery item |
| 14 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 15 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 16 | Leave the "Carrier" field empty (do NOT enter any carrier ID) | `{TD.emptyValue}` | Carrier field remains blank/empty |
| 17 | Click the "Save" button in the toolbar | — | SAP attempts to validate the delivery data before saving |
| 18 | Observe the validation response | — | System highlights the "Carrier" field as mandatory; an error message is displayed indicating that a cold-chain carrier must be selected for temperature-sensitive materials; error message states "Cold-chain carrier is required for materials flagged as temperature-sensitive" or similar |
| 19 | Verify that the Carrier field is visually highlighted | — | Carrier field is highlighted with a red border or error icon; field label may show asterisk or mandatory indicator |
| 20 | Verify that the save action is blocked | — | Save operation is not completed; user remains on the delivery creation form; no delivery number is generated |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System validates that cold-chain carrier is a mandatory field for temperature-sensitive materials
- Carrier field is highlighted as mandatory with visual indicators (red border, asterisk, error icon)
- Error message is displayed clearly indicating that cold-chain carrier selection is required
- Save action is blocked; outbound delivery is NOT created
- User is prompted to fill the missing Carrier field before the system allows save operation
- Validation enforces regulatory compliance requirement for cold-chain carrier selection

---

### Post-conditions

- No outbound delivery document is created
- Carrier field validation error is logged in the SAP message log
- User remains on the delivery creation form with error feedback
- No application-level errors or critical warnings remain outstanding after sign-out

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
