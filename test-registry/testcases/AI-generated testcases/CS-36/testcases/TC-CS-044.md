# TC-CS-044: Verify Existing Open Sales Orders Against Blocked Batch Are Flagged or Reported

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist or Sales Analyst with SAP authorization to view sales orders and batch status information |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` |
| P5 | Pre-existing Sales Order | Sales order `{TD.existingSalesOrderNumber}` exists with status "Open" and contains line item for material `{TD.materialNumber}` referencing batch `{TD.batchNumber}` |
| P6 | Configuration | Plant `{TD.plant}` is configured and active; sales organization `{TD.salesOrg}` is configured |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material master number — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch that will be blocked — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Existing Sales Order | `{TD.existingSalesOrderNumber}` | Pre-existing open sales order referencing the batch — used for search | Valid |
| Sales Org | `{TD.salesOrg}` | Sales organization code — used for filtering | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up or Guided Tour dialog appears, dismiss it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing sales order management applications |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | In the Sales Order filter field, enter the existing Sales Order number | `{TD.existingSalesOrderNumber}` | Sales Order number is entered into the filter |
| 10 | Press Enter to search for the sales order | — | SAP searches for the sales order; sales order record is displayed in the list |
| 11 | Verify that the sales order contains a line item for material and batch | `{TD.materialNumber}`, `{TD.batchNumber}` | Sales order line item shows material `{TD.materialNumber}` with batch assignment `{TD.batchNumber}`; status is "Open" |
| 12 | Note the sales order status and delivery status before SD block placement | — | Sales order status is "Open"; delivery status may be "Not yet delivered" or "Partially delivered" |
| 13 | Navigate to batch management or recall function to place SD block on the batch | — | Batch management application opens |
| 14 | Place an SD block on batch `{TD.batchNumber}` for material `{TD.materialNumber}` (repeat TC-CS-036 steps if needed) | `{TD.batchNumber}`, `{TD.materialNumber}` | SD block is successfully placed on the batch; confirmation message is displayed |
| 15 | Navigate back to the Manage Sales Orders application | — | Sales order list is displayed |
| 16 | Refresh or re-search for the existing sales order | `{TD.existingSalesOrderNumber}` | Sales order record is displayed again |
| 17 | Click on the sales order to view details | — | Sales order detail screen opens showing all line items |
| 18 | Check for any warning indicators, flags, or messages on the line item with the blocked batch | — | System displays a warning indicator or flag on the line item: "Batch `{TD.batchNumber}` is blocked for sales and distribution" or similar message |
| 19 | Verify that the sales order status or delivery status reflects the batch block | — | Sales order may show status "Processing blocked" or delivery status shows "Blocked due to batch restriction" |
| 20 | Navigate to a batch block report or impact analysis tool (if available in SAP system) | — | Batch block impact report or analysis screen opens |
| 21 | Run a report to identify all open sales orders referencing the blocked batch | `{TD.batchNumber}`, `{TD.materialNumber}` | Report lists all open sales orders (including `{TD.existingSalesOrderNumber}`) that reference the blocked batch |
| 22 | Verify that the report clearly identifies affected sales orders and recommended actions | — | Report shows sales order number, customer, quantity, delivery status, and recommended action (e.g., "Cancel", "Change batch", "Hold delivery") |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SD block is successfully placed on batch `{TD.batchNumber}` for material `{TD.materialNumber}`
- Existing open sales order `{TD.existingSalesOrderNumber}` that references the blocked batch is automatically flagged or marked with a warning indicator
- System displays clear warnings on sales order line items that reference the blocked batch
- Sales order or delivery status reflects the batch block (e.g., "Processing blocked", "Delivery hold")
- SAP provides a report or analysis tool to identify all open sales orders impacted by the batch block
- Report clearly lists affected sales orders with recommended remediation actions
- Integration between batch master data and SD order management is functioning correctly

---

### Post-conditions

- Batch `{TD.batchNumber}` for material `{TD.materialNumber}` has an active Sales & Distribution block
- Existing sales order `{TD.existingSalesOrderNumber}` is flagged with batch block warning
- Sales order processing or delivery may be blocked or held pending resolution
- Impact analysis report is available showing all affected sales orders
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

### Notes for Automation

This integration test case is marked as PARTIAL automation candidate due to:
- Requires pre-existing sales order data setup referencing the specific batch
- Depends on SD module configuration for batch block impact handling
- May require access to batch block impact reports or custom analysis tools
- Warning indicators and status flags may vary based on SAP system configuration
- Report availability and format may differ across SAP S/4HANA Cloud versions
- Test data setup complexity: creating a sales order, then blocking the batch, then verifying the impact

---
