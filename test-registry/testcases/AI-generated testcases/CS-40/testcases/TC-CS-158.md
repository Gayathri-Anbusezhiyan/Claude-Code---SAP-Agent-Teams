# TC-CS-158: Perform ATP Check Confirming Delivery from Valid Batches with Sufficient Shelf Life

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to perform ATP checks and create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, batch-managed, and configured for plant `{TD.plant}` |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P5 | Master Data | Batch `{TD.batchNumber}` for material `{TD.materialId}` exists in plant `{TD.plant}` with available stock quantity `{TD.availableQuantity}` units and SLED (Shelf Life Expiration Date) `{TD.batchSLED}` that exceeds delivery date + minimum shelf life buffer |
| P6 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and configured for ATP checks with batch expiration logic enabled |
| P7 | Configuration | Minimum shelf life buffer for material `{TD.materialId}` is configured in the system (e.g., 30 days) |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Batch-managed material master number | Valid |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.requestedQuantity}` | Order quantity requested by customer | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Customer requested delivery date (future) | Valid |
| Plant | `{TD.plant}` | Supplying plant code | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code | Valid |
| Division | `{TD.division}` | Division code | Valid |
| Batch Number | `{TD.batchNumber}` | Expected batch to be assigned (auto-selected by ATP) | Valid |
| Batch SLED | `{TD.batchSLED}` | Shelf life expiration date of the batch | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the "Manage Sales Orders" application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-to Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header |
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values |
| 13 | In the "Items" section, click the "Add" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 16 | In the "Order Quantity" field, enter the requested quantity | `{TD.requestedQuantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed in the line item |
| 18 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is populated in the line item |
| 19 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed; SAP triggers ATP check automatically |
| 20 | Observe the ATP status indicator on the line item | — | ATP status indicator turns green (confirmed) |
| 21 | Expand or click the ATP details section for the line item | — | ATP details section displays confirmed quantity, confirmed delivery date, and assigned batch number |
| 22 | Verify the "Confirmed Quantity" field | `{TD.requestedQuantity}` | Confirmed quantity equals the requested quantity |
| 23 | Verify the "Confirmed Delivery Date" field | `{TD.requestedDeliveryDate}` | Confirmed delivery date matches or is earlier than the requested delivery date |
| 24 | Verify the "Batch" field | `{TD.batchNumber}` | Batch number `{TD.batchNumber}` is assigned to the line item; batch SLED `{TD.batchSLED}` is displayed and exceeds the delivery date + buffer |
| 25 | Verify that no expired or near-expiration batches are assigned | — | Only batches with SLED > delivery date + minimum shelf life buffer are shown; expired batches are excluded from ATP allocation |
| 26 | Click the "Save" button in the toolbar | — | Sales Order is saved as a draft; a success message is displayed with the Sales Order number |
| 27 | Note the Sales Order number from the success message or header | — | Sales Order number is displayed (format is system-generated, e.g., 10-digit) |
| 28 | Navigate back to the Manage Sales Orders list | — | Sales Order list is displayed |
| 29 | Search for the newly created Sales Order using the number noted in step 27 | — | The created Sales Order appears in the list with ATP status confirmed (green) |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- ATP check confirms delivery of the requested quantity from valid batches with sufficient shelf life
- Confirmed quantity equals the requested quantity `{TD.requestedQuantity}`
- Confirmed delivery date matches or is earlier than the requested delivery date `{TD.requestedDeliveryDate}`
- Batch `{TD.batchNumber}` with SLED `{TD.batchSLED}` is assigned to the Sales Order line item
- ATP status indicator is green (confirmed)
- Only batches with SLED exceeding delivery date + minimum shelf life buffer are allocated; expired or near-expiration batches are excluded
- Sales Order is persisted in SAP with the ATP-confirmed batch allocation
- The Sales Order appears in the list with ATP confirmation status visible

---

### Post-conditions

- Sales Order document exists with the generated SO number
- ATP confirmation is recorded on the Sales Order line item
- Batch `{TD.batchNumber}` is allocated to the order
- ATP status is "Confirmed" (green indicator)
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
