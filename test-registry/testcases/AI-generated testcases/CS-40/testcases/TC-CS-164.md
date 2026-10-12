# TC-CS-164: Attempt ATP Check with Non-Batch-Managed Material

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to perform ATP checks and create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.nonBatchManagedMaterialId}` exists and is active but batch management is NOT enabled for this material |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and configured for ATP checks with batch expiration logic enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (Non-Batch-Managed) | `{TD.nonBatchManagedMaterialId}` | Material without batch management enabled | Invalid (for batch expiration logic) |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.requestedQuantity}` | Order quantity requested by customer | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Customer requested delivery date (future) | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code | Valid |
| Division | `{TD.division}` | Division code | Valid |
| Plant | `{TD.plant}` | Supplying plant code | Valid |

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
| 14 | In the "Material" field of the new line item, enter the non-batch-managed Material ID | `{TD.nonBatchManagedMaterialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.nonBatchManagedMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 16 | In the "Order Quantity" field, enter the requested quantity | `{TD.requestedQuantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed in the line item |
| 18 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is populated in the line item |
| 19 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed; SAP triggers ATP check automatically |
| 20 | Observe the ATP status indicator on the line item | — | ATP status indicator may turn green (standard ATP without batch logic) or displays a warning indicating batch expiration logic cannot be applied |
| 21 | Expand or click the ATP details section for the line item | — | ATP details section shows standard ATP result without batch allocation or displays a warning that batch expiration logic is not applicable to this material |
| 22 | Verify that no batch assignment field is present or populated | — | Batch field is absent or empty; ATP confirmation is based on standard available stock, not batch-specific SLED logic |
| 23 | Verify the warning or informational message content (if present) | — | Message states that batch management is not active for this material, or batch expiration logic is not applicable |
| 24 | Attempt to save the Sales Order by clicking the "Save" button | — | Sales Order may be saved with standard ATP confirmation (without batch expiration logic), or system displays a warning that batch expiration requirements cannot be validated |
| 25 | Observe the final system response | — | Sales Order is saved with ATP confirmation based on standard available stock (not batch SLED); batch expiration logic is NOT applied |
| 26 | Note the Sales Order number from the success message or header (if save succeeded) | — | Sales Order number is displayed (format is system-generated, e.g., 10-digit) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- ATP check is performed using standard available stock logic (not batch expiration logic) because the material is not batch-managed
- No batch assignment is made to the Sales Order line item
- ATP confirmation is based on total available stock, ignoring batch SLED requirements
- Warning or informational message indicates that batch expiration logic is not applicable to this material
- Sales Order is saved with standard ATP confirmation (without batch SLED validation)
- System does NOT prevent order creation but does NOT apply batch expiration business rules to non-batch-managed materials

---

### Post-conditions

- Sales Order document exists with the generated SO number (if save succeeded)
- ATP confirmation is recorded based on standard available stock (not batch SLED)
- No batch allocation is recorded on the Sales Order line item
- ATP status is "Confirmed" (green indicator) or "Partial" based on standard stock availability
- No application-level critical errors remain outstanding (warning messages may be present)

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
