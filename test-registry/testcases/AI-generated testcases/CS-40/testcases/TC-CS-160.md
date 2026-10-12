# TC-CS-160: Attempt ATP Check When All Batches Are Nearing Expiration

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
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
| P5 | Master Data | All available batches for material `{TD.materialId}` in plant `{TD.plant}` have SLEDs (`{TD.expiringSLED}`) that fall before or on the delivery date + minimum shelf life buffer — all batches are nearing expiration or expired |
| P6 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and configured for ATP checks with batch expiration logic enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-NEG-001`

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
| Expiring SLED | `{TD.expiringSLED}` | Batch SLED that is before or on delivery date + buffer (nearing expiration) | Invalid (expired relative to ATP business rule) |

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
| 20 | Observe the ATP status indicator on the line item | — | ATP status indicator turns red (not confirmed) or displays a warning icon |
| 21 | Expand or click the ATP details section for the line item | — | ATP details section displays a warning or error message indicating no ATP-confirmable batches are available |
| 22 | Verify the error or warning message content | — | Message states that no batches with sufficient shelf life are available, or all batches are nearing expiration and cannot be allocated |
| 23 | Verify that no batches are assigned to the line item | — | Batch field is empty or shows "No batch assigned"; no expired or near-expiration batches are allocated |
| 24 | Verify the "Confirmed Quantity" field | — | Confirmed quantity is 0 or shows "Not confirmed" |
| 25 | Attempt to save the Sales Order by clicking the "Save" button | — | SAP may display a blocking error preventing save, or allows save with ATP status "Not Confirmed" (red indicator) |
| 26 | Observe the final system response | — | Sales Order is either blocked from saving or saved with ATP status "Not Confirmed"; no delivery commitment is made to the customer |
| 27 | If save succeeded, note the Sales Order number from the header | — | Sales Order number is displayed (if save was allowed) |
| 28 | Navigate back to the Manage Sales Orders list | — | Sales Order list is displayed |
| 29 | If an SO was created, search for the SO using the number noted in step 27 | — | The Sales Order appears in the list with ATP status "Not Confirmed" (red indicator) |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- ATP check rejects delivery confirmation because all available batches are nearing expiration (SLED falls before or on delivery date + minimum shelf life buffer)
- ATP status indicator is red (not confirmed) or displays a warning icon
- No batches are assigned to the Sales Order line item
- Confirmed quantity is 0 or shows "Not confirmed"
- Error or warning message clearly states that no batches with sufficient shelf life are available
- System prevents customer delivery date commitment on expired or near-expired stock
- Sales Order is either blocked from saving or saved with ATP status "Not Confirmed"
- No batch with SLED <= delivery date + buffer is allocated to the order

---

### Post-conditions

- Sales Order may exist with the generated SO number (if save was allowed) with ATP status "Not Confirmed"
- No batch allocation is recorded on the Sales Order line item
- ATP status is "Not Confirmed" (red indicator) or blocked
- No delivery commitment is made to the customer
- No application-level critical errors remain outstanding (warning messages are expected)

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
