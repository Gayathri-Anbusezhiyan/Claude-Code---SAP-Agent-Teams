# TC-CS-021: Create Outbound Delivery with Cold-Chain Shipping Condition and Temperature Monitoring

**User Story:**          [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T
**Epic:**                N/A — no epic assigned
**Module:**              Logistics Execution / Sales & Distribution (LE/SD)
**Feature:**             Cold-Chain Outbound Delivery Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
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
| P5 | Master Data | Qualified cold-chain carrier `{TD.coldChainCarrierId}` is configured and active in the carrier master with cold-chain qualification flag |
| P6 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |
| P7 | Configuration | Shipping condition determination is configured to auto-propose shipping condition based on material storage condition classification |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
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
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; storage condition classification `{TD.storageConditionClassification}` is displayed |
| 13 | Verify that the "Shipping Condition" field is auto-populated | — | Shipping condition field displays the cold-chain shipping condition code auto-proposed based on the material's storage condition classification (e.g., 2–8°C) |
| 14 | In the "Quantity" field, enter the delivery quantity | `{TD.quantity}` | Quantity is populated in the delivery item; unit of measure `{TD.uom}` is displayed |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed; inventory availability is checked |
| 17 | In the "Carrier" field, enter the cold-chain carrier ID | `{TD.coldChainCarrierId}` | Cold-chain carrier ID is entered into the field |
| 18 | Press Enter to confirm the Carrier entry | — | SAP validates the carrier; carrier name `{TD.coldChainCarrierName}` is auto-populated; carrier is confirmed as qualified for cold-chain transport |
| 19 | Verify that packaging instructions are displayed | — | Packaging instructions field displays the required packaging type and handling instructions based on the shipping condition (e.g., "Use insulated container with gel packs") |
| 20 | In the "Temperature Logger/Data Recorder Reference" field, enter the temperature logger reference number | `{TD.temperatureLoggerReference}` | Temperature logger reference number is entered and displayed in the field |
| 21 | Press Enter to confirm the Temperature Logger Reference entry | — | Temperature logger reference is confirmed and stored against the delivery |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the outbound delivery creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated delivery number |
| 24 | Note the delivery number from the success message or the top-left header area | — | Delivery number is displayed (format is system-generated, typically 10-digit numeric) |
| 25 | Navigate back to the outbound deliveries list | — | Outbound deliveries list is displayed |
| 26 | Search for the newly created delivery using the number noted in step 24 | — | The created delivery appears in the list with status "Open" or "In Process" |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Outbound Delivery number is generated by SAP and displayed in the confirmation message
- The delivery is persisted in SAP with status "Open" or "In Process"
- Shipping condition is correctly auto-populated based on material's storage condition classification (2–8°C)
- Cold-chain carrier is validated and confirmed as qualified for temperature-sensitive biologics
- Packaging instructions are displayed based on the shipping condition
- Temperature logger reference number is captured and stored against the delivery document
- The created delivery appears in the "Manage Outbound Deliveries" list and can be viewed

---

### Post-conditions

- SAP Outbound Delivery document exists with the generated delivery number
- Delivery status is "Open" or "In Process"
- Sales order, material, quantity, storage location, carrier, and temperature logger reference are correctly recorded on the delivery
- Shipping condition reflects cold-chain requirements
- Packaging instructions are documented
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
