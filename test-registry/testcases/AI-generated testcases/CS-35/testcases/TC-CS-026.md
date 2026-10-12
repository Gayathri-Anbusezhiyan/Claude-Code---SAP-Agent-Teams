# TC-CS-026: Attempt to Post Goods Issue Without Temperature Monitoring Device Reference

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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and post goods issues for temperature-sensitive materials |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and ready for delivery creation |
| P4 | Master Data | Material `{TD.materialId}` exists, is flagged as temperature-sensitive in the material master, and has storage condition classification `{TD.storageConditionClassification}` (e.g., 2–8°C) |
| P5 | Master Data | Qualified cold-chain carrier `{TD.coldChainCarrierId}` is configured and active in the carrier master |
| P6 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |
| P7 | Configuration | Temperature monitoring device reference is mandatory for goods issue posting on cold-chain deliveries |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Cold-Chain Carrier ID | `{TD.coldChainCarrierId}` | Qualified cold-chain carrier code — selected by the user | Valid |
| Temperature Logger Reference | `{TD.temperatureLoggerReference}` | Temperature logger/data recorder device reference number — entered by the user | Valid |
| Temperature Monitoring Device Reference | `{TD.emptyValue}` | Temperature monitoring device field left empty — NOT entered by the user | Empty/Missing |

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
| 18 | In the "Temperature Logger/Data Recorder Reference" field, enter the temperature logger reference number | `{TD.temperatureLoggerReference}` | Temperature logger reference number is entered and displayed in the field |
| 19 | Press Enter to confirm the Temperature Logger Reference entry | — | Temperature logger reference is confirmed |
| 20 | Leave the "Temperature Monitoring Device Reference" field empty (do NOT enter any device reference) | `{TD.emptyValue}` | Temperature monitoring device reference field remains blank/empty |
| 21 | Click the "Save" button in the toolbar | — | SAP saves the outbound delivery with all mandatory header and item fields completed |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated delivery number |
| 23 | Note the delivery number from the success message | — | Delivery number is displayed (format is system-generated, typically 10-digit numeric) |
| 24 | Navigate to the "Post Goods Issue" function or click the "Post Goods Issue" button in the delivery | — | Post Goods Issue dialog or screen appears |
| 25 | Attempt to post the goods issue by clicking the "Post Goods Issue" or "Execute" button | — | SAP attempts to validate the goods issue posting |
| 26 | Observe the validation response | — | System displays an error message indicating that temperature monitoring device reference is missing; error message states "Goods issue cannot be posted without temperature monitoring device reference" or "Temperature monitoring device reference is required for cold-chain delivery goods issue" |
| 27 | Verify that the goods issue posting is blocked | — | Goods issue posting is NOT completed; delivery status remains "Open" or "In Process"; goods issue status is NOT set to "Posted" |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Outbound delivery is created successfully with delivery number generated
- System validates that temperature monitoring device reference is mandatory for goods issue posting on cold-chain deliveries
- Error message is displayed clearly indicating that goods issue cannot be posted without temperature monitoring device reference
- Goods issue posting is blocked; delivery status remains "Open" or "In Process"; goods issue status is NOT set to "Posted"
- User is required to enter temperature monitoring device reference before goods issue can be posted
- Validation enforces critical control point for regulatory compliance (AC-6)
- The delivery document exists but cannot complete the goods issue step until temperature monitoring device reference is provided

---

### Post-conditions

- Outbound delivery document exists with the generated delivery number
- Delivery status is "Open" or "In Process" (NOT goods-issued)
- Goods issue posting is blocked due to missing temperature monitoring device reference
- Temperature monitoring device reference field validation error is logged in the SAP message log
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
