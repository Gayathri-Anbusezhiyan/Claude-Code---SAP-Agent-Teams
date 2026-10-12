# TC-CS-036: Create Sales Order for Controlled Substance with Valid License Nearing Expiration

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and has a valid pharmacy/wholesaler license on file with expiration date `{TD.licenseExpiryNearExpiration}` (between 1 and 30 days from today — within warning threshold) |
| P4 | Master Data | Material `{TD.materialId}` exists, is released, and flagged as a controlled substance in the material master |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and assigned to the user |
| P6 | Configuration | License warning threshold is configured to `{TD.warningThresholdDays}` days (default: 30 days) |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with license nearing expiration — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Controlled substance material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| License Expiry Date | `{TD.licenseExpiryNearExpiration}` | Customer license expiration date (15 days from today — within 30-day threshold) | Valid |
| Warning Threshold Days | `{TD.warningThresholdDays}` | System-configured warning threshold (30 days) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing the Create Sales Order application |
| 8 | Click "Create Sales Order" from the search results | — | Create Sales Order application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-To Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated in the header |
| 12 | SAP performs automatic license verification | — | System checks customer master for valid license classification relevant to controlled substances; license status `{TD.licenseStatus}` is verified; license expiration date `{TD.licenseExpiryNearExpiration}` is checked (15 days from today — within 30-day warning threshold) |
| 13 | Observe the license expiration warning message | — | System displays a warning message: "License for customer `{TD.customerId}` expires in `{TD.daysUntilExpiry}` days" or similar notification |
| 14 | Acknowledge the warning by clicking "OK" or "Continue" | — | Warning is acknowledged; Sales Order creation proceeds (not blocked) |
| 15 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrg}` | Sales Organization code is entered |
| 16 | Press Enter to confirm the Sales Organization entry | — | Sales Organization is confirmed |
| 17 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel code is entered |
| 18 | Press Enter to confirm the Distribution Channel entry | — | Distribution Channel is confirmed |
| 19 | In the "Division" field, enter the Division code | `{TD.division}` | Division code is entered |
| 20 | Press Enter to confirm the Division entry | — | Division is confirmed; organizational data is validated |
| 21 | In the "Items" section, click the "Add" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 22 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 23 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; controlled substance flag is verified |
| 24 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 25 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item pricing is calculated |
| 26 | Verify the license verification log entry is created | — | System logs the license verification check (timestamp, user, customer ID, material ID, result: PASS_WITH_WARNING) in the audit trail |
| 27 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order submission |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 29 | Note the Sales Order number from the success message | — | Sales Order number is displayed (10-digit system-generated number) |
| 30 | Verify the Sales Order status | — | Sales Order status is "Open" or "Released" (not blocked — warning does not prevent creation) |
| 31 | Navigate back to the Sales Order list | — | Sales Order list is displayed |
| 32 | Search for the newly created Sales Order using the number noted in step 29 | — | The created Sales Order appears in the list with status "Open" |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with status "Open" (not blocked — warning displayed but order creation allowed)
- All header data (Customer, Sales Org, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity) is correctly stored
- License verification check PASSED WITH WARNING — warning message displayed indicating license expiration approaching
- Audit log entry is created recording the license verification check with result: PASS_WITH_WARNING + days until expiry
- The created Sales Order appears in the list and can be processed for delivery

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "Open" / "Released" — not blocked (warning does not block)
- Customer license verification passed with warning; no license-related blocks exist
- Audit log entry exists: timestamp + user + customer ID `{TD.customerId}` + material ID `{TD.materialId}` + result: PASS_WITH_WARNING + days until expiry: `{TD.daysUntilExpiry}` + override flag: NO
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
