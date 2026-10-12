# TC-CS-027: Create Outbound Delivery with Minimum Quantity Boundary for Cold-Chain Material

**User Story:**          [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T
**Epic:**                N/A — no epic assigned
**Module:**              Logistics Execution / Sales & Distribution (LE/SD)
**Feature:**             Cold-Chain Outbound Delivery Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

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
| P7 | Configuration | Minimum valid quantity for the material is 1 (lower boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Minimum Quantity | `{TD.minQuantity}` | Minimum valid quantity (boundary lower = 1) — entered by the user | Valid (boundary) |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Cold-Chain Carrier ID | `{TD.coldChainCarrierId}` | Qualified cold-chain carrier code — selected by the user | Valid |
| Temperature Logger Reference | `{TD.temperatureLoggerReference}` | Temperature logger/data recorder device reference number — entered by the user | Valid |

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
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; storage condition classification `{TD.storageConditionClassification}` is displayed; shipping condition is auto-proposed for cold-chain |
| 13 | In the "Quantity" field, enter the minimum valid quantity | `{TD.minQuantity}` | Minimum quantity (1) is populated in the delivery item; unit of measure `{TD.uom}` is displayed |
| 14 | Press Enter to confirm the Quantity entry | — | Quantity is accepted by the system; no validation error is displayed; system confirms minimum valid boundary |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed; inventory availability is checked for minimum quantity |
| 17 | In the "Carrier" field, enter the cold-chain carrier ID | `{TD.coldChainCarrierId}` | Cold-chain carrier ID is entered into the field |
| 18 | Press Enter to confirm the Carrier entry | — | SAP validates the carrier; carrier name `{TD.coldChainCarrierName}` is auto-populated; carrier is confirmed as qualified for cold-chain transport |
| 19 | Verify that packaging instructions are displayed | — | Packaging instructions field displays the required packaging type and handling instructions based on the shipping condition |
| 20 | In the "Temperature Logger/Data Recorder Reference" field, enter the temperature logger reference number | `{TD.temperatureLoggerReference}` | Temperature logger reference number is entered and displayed in the field |
| 21 | Press Enter to confirm the Temperature Logger Reference entry | — | Temperature logger reference is confirmed and stored against the delivery |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the outbound delivery creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated delivery number |
| 24 | Note the delivery number from the success message | — | Delivery number is displayed; minimum quantity delivery is successfully created |
| 25 | Navigate back to the outbound deliveries list | — | Outbound deliveries list is displayed |
| 26 | Search for the newly created delivery using the number noted in step 24 | — | The created delivery appears in the list with status "Open" or "In Process"; quantity displays minimum valid value (1) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Outbound delivery is created successfully with minimum quantity (lower boundary = 1)
- System accepts minimum valid quantity without validation errors
- All cold-chain requirements (shipping condition, carrier, packaging instructions, temperature logger) are correctly applied for minimum quantity delivery
- Delivery number is generated and displayed
- Delivery appears in the list with correct minimum quantity value
- Boundary test confirms that system correctly handles lower valid limit for delivery quantity

---

### Post-conditions

- SAP Outbound Delivery document exists with the generated delivery number
- Delivery status is "Open" or "In Process"
- Quantity field displays minimum valid value (1)
- All cold-chain requirements are recorded on the delivery
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
