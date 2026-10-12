# TC-CS-159: Perform ATP Check Confirming Delivery from Multiple Valid Batches

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
| P5 | Master Data | Multiple batches for material `{TD.materialId}` exist in plant `{TD.plant}`: Batch `{TD.batchNumber1}` with available stock `{TD.availableQuantity1}` units and SLED `{TD.batchSLED1}`; Batch `{TD.batchNumber2}` with available stock `{TD.availableQuantity2}` units and SLED `{TD.batchSLED2}`; both SLEDs exceed delivery date + minimum shelf life buffer |
| P6 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and configured for ATP checks with batch expiration logic enabled |
| P7 | Configuration | Requested quantity `{TD.requestedQuantityMultiple}` exceeds the available quantity of any single batch, requiring ATP to allocate from multiple batches |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Batch-managed material master number | Valid |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.requestedQuantityMultiple}` | Order quantity exceeding single batch stock (requires multi-batch allocation) | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Customer requested delivery date (future) | Valid |
| Plant | `{TD.plant}` | Supplying plant code | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code | Valid |
| Division | `{TD.division}` | Division code | Valid |
| Batch 1 Number | `{TD.batchNumber1}` | First batch to be assigned (auto-selected by ATP) | Valid |
| Batch 1 SLED | `{TD.batchSLED1}` | Shelf life expiration date of the first batch | Valid |
| Batch 2 Number | `{TD.batchNumber2}` | Second batch to be assigned (auto-selected by ATP) | Valid |
| Batch 2 SLED | `{TD.batchSLED2}` | Shelf life expiration date of the second batch | Valid |

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
| 16 | In the "Order Quantity" field, enter the requested quantity that exceeds single batch stock | `{TD.requestedQuantityMultiple}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed in the line item |
| 18 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is populated in the line item |
| 19 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed; SAP triggers ATP check automatically |
| 20 | Observe the ATP status indicator on the line item | — | ATP status indicator turns green (confirmed) or yellow (partial confirmation if total stock insufficient) |
| 21 | Expand or click the ATP details section for the line item | — | ATP details section displays confirmed quantity, confirmed delivery date, and multiple assigned batch numbers |
| 22 | Verify the "Confirmed Quantity" field | `{TD.requestedQuantityMultiple}` | Confirmed quantity equals the requested quantity (sum of quantities from multiple batches) |
| 23 | Verify the "Confirmed Delivery Date" field | `{TD.requestedDeliveryDate}` | Confirmed delivery date matches or is earlier than the requested delivery date |
| 24 | Verify that multiple batches are assigned | `{TD.batchNumber1}`, `{TD.batchNumber2}` | Batch numbers `{TD.batchNumber1}` and `{TD.batchNumber2}` are both assigned to the line item; ATP allocates quantity across both batches |
| 25 | Verify the SLED of each assigned batch | `{TD.batchSLED1}`, `{TD.batchSLED2}` | Both batch SLEDs are displayed and both exceed the delivery date + minimum shelf life buffer |
| 26 | Verify that no expired or near-expiration batches are assigned | — | Only batches with SLED > delivery date + minimum shelf life buffer are shown; expired batches are excluded from ATP allocation |
| 27 | Click the "Save" button in the toolbar | — | Sales Order is saved as a draft; a success message is displayed with the Sales Order number |
| 28 | Note the Sales Order number from the success message or header | — | Sales Order number is displayed (format is system-generated, e.g., 10-digit) |
| 29 | Navigate back to the Manage Sales Orders list | — | Sales Order list is displayed |
| 30 | Search for the newly created Sales Order using the number noted in step 28 | — | The created Sales Order appears in the list with ATP status confirmed (green) or partial (yellow) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- ATP check confirms delivery of the requested quantity by allocating from multiple valid batches with sufficient shelf life
- Confirmed quantity equals the requested quantity `{TD.requestedQuantityMultiple}` (sum of quantities from multiple batches)
- Confirmed delivery date matches or is earlier than the requested delivery date `{TD.requestedDeliveryDate}`
- Multiple batches (`{TD.batchNumber1}` and `{TD.batchNumber2}`) are assigned to the Sales Order line item
- All assigned batches have SLEDs (`{TD.batchSLED1}`, `{TD.batchSLED2}`) exceeding delivery date + minimum shelf life buffer
- ATP status indicator is green (confirmed) or yellow (partial) depending on total available stock
- Only batches with valid shelf life are allocated; expired or near-expiration batches are excluded
- Sales Order is persisted in SAP with ATP-confirmed multi-batch allocation
- The Sales Order appears in the list with ATP confirmation status visible

---

### Post-conditions

- Sales Order document exists with the generated SO number
- ATP confirmation is recorded on the Sales Order line item with multi-batch allocation
- Batches `{TD.batchNumber1}` and `{TD.batchNumber2}` are allocated to the order
- ATP status is "Confirmed" (green indicator) or "Partial" (yellow indicator)
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
