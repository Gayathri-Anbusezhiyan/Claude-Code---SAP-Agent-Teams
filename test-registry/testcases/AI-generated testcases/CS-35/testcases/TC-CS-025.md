# TC-CS-025: Attempt to Save Outbound Delivery Without Temperature Logger Reference

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
| P5 | Master Data | Qualified cold-chain carrier `{TD.coldChainCarrierId}` is configured and active in the carrier master |
| P6 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |
| P7 | Configuration | Temperature logger reference is mandatory for cold-chain deliveries |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Cold-Chain Carrier ID | `{TD.coldChainCarrierId}` | Qualified cold-chain carrier code — selected by the user | Valid |
| Temperature Logger Reference | `{TD.emptyValue}` | Temperature logger field left empty — NOT entered by the user | Empty/Missing |

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
| 16 | In the "Carrier" field, enter the cold-chain carrier ID | `{TD.coldChainCarrierId}` | Cold-chain carrier ID is entered into the field |
| 17 | Press Enter to confirm the Carrier entry | — | SAP validates the carrier; carrier name is auto-populated; carrier is confirmed as qualified for cold-chain transport |
| 18 | Leave the "Temperature Logger/Data Recorder Reference" field empty (do NOT enter any reference number) | `{TD.emptyValue}` | Temperature logger reference field remains blank/empty |
| 19 | Click the "Save" button in the toolbar | — | SAP attempts to validate the delivery data before saving |
| 20 | Observe the validation response | — | System highlights the "Temperature Logger Reference" field as mandatory; an error message is displayed indicating that temperature logger reference is required for cold-chain deliveries; error message states "Temperature logger/data recorder reference is mandatory for post-shipment verification" or similar |
| 21 | Verify that the Temperature Logger Reference field is visually highlighted | — | Temperature Logger Reference field is highlighted with a red border or error icon; field label may show asterisk or mandatory indicator |
| 22 | Verify that the save action is blocked | — | Save operation is not completed; user remains on the delivery creation form; no delivery number is generated |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System validates that temperature logger reference is a mandatory field for cold-chain deliveries
- Temperature Logger Reference field is highlighted as mandatory with visual indicators (red border, asterisk, error icon)
- Error message is displayed clearly indicating that temperature logger reference is required for post-shipment verification
- Save action is blocked; outbound delivery is NOT created
- User is prompted to fill the missing Temperature Logger Reference field before the system allows save operation
- Validation enforces regulatory compliance requirement for temperature monitoring device traceability

---

### Post-conditions

- No outbound delivery document is created
- Temperature logger reference field validation error is logged in the SAP message log
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
