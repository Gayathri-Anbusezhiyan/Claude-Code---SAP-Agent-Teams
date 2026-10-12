# TC-CS-028: Create Outbound Delivery with Maximum Length Temperature Logger Reference

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
| P7 | Configuration | Temperature Logger Reference field has a maximum length constraint (typically 35-50 characters per SAP field length) |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Cold-Chain Carrier ID | `{TD.coldChainCarrierId}` | Qualified cold-chain carrier code — selected by the user | Valid |
| Temperature Logger Reference (Max Length) | `{TD.temperatureLoggerReferenceMaxLength}` | Temperature logger reference at maximum allowed field length (boundary upper) — entered by the user | Valid (boundary) |

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
| 13 | In the "Quantity" field, enter the delivery quantity | `{TD.quantity}` | Quantity is populated in the delivery item; unit of measure `{TD.uom}` is displayed |
| 14 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 15 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed; inventory availability is checked |
| 16 | In the "Carrier" field, enter the cold-chain carrier ID | `{TD.coldChainCarrierId}` | Cold-chain carrier ID is entered into the field |
| 17 | Press Enter to confirm the Carrier entry | — | SAP validates the carrier; carrier name `{TD.coldChainCarrierName}` is auto-populated; carrier is confirmed as qualified for cold-chain transport |
| 18 | Verify that packaging instructions are displayed | — | Packaging instructions field displays the required packaging type and handling instructions based on the shipping condition |
| 19 | In the "Temperature Logger/Data Recorder Reference" field, enter the maximum length temperature logger reference string | `{TD.temperatureLoggerReferenceMaxLength}` | Temperature logger reference string at maximum field length (35-50 characters) is entered into the field |
| 20 | Press Enter to confirm the Temperature Logger Reference entry | — | Temperature logger reference is accepted by the system; full string is displayed in the field; no truncation or validation error occurs |
| 21 | Verify that the full temperature logger reference is displayed correctly | — | Temperature logger reference field displays the complete maximum-length string without truncation; all characters are visible and stored |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the outbound delivery creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated delivery number |
| 24 | Note the delivery number from the success message | — | Delivery number is displayed; delivery with maximum-length temperature logger reference is successfully created |
| 25 | Navigate back to the outbound deliveries list | — | Outbound deliveries list is displayed |
| 26 | Search for the newly created delivery using the number noted in step 24 | — | The created delivery appears in the list with status "Open" or "In Process" |
| 27 | Open the delivery document to verify the temperature logger reference | — | Delivery document opens; temperature logger reference field displays the complete maximum-length string without truncation or data loss |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Outbound delivery is created successfully with maximum-length temperature logger reference string
- System accepts maximum valid field length without validation errors or truncation
- All cold-chain requirements (shipping condition, carrier, packaging instructions) are correctly applied
- Temperature logger reference field stores and displays the complete maximum-length string (35-50 characters)
- Delivery number is generated and displayed
- Delivery appears in the list and can be opened to verify complete temperature logger reference
- Boundary test confirms that system correctly handles upper valid limit for temperature logger reference field length

---

### Post-conditions

- SAP Outbound Delivery document exists with the generated delivery number
- Delivery status is "Open" or "In Process"
- Temperature logger reference field contains the complete maximum-length string without truncation
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
