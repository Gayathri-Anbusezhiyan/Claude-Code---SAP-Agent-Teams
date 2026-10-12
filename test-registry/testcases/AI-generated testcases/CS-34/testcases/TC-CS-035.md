# TC-CS-035: Create Sales Order for Controlled Substance with Valid Non-Expiring License

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
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
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and has a valid pharmacy/wholesaler license on file with expiration date `{TD.licenseExpiryValid}` (>= 60 days from today) |
| P4 | Master Data | Material `{TD.materialId}` exists, is released, and flagged as a controlled substance in the material master |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and assigned to the user |
| P6 | Configuration | License warning threshold is configured to `{TD.warningThresholdDays}` days (default: 30 days) |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with valid license — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Controlled substance material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| License Expiry Date | `{TD.licenseExpiryValid}` | Customer license expiration date (>= 60 days from today) | Valid |
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
| 12 | SAP performs automatic license verification | — | System checks customer master for valid license classification relevant to controlled substances; license status `{TD.licenseStatus}` is verified; license expiration date `{TD.licenseExpiryValid}` is checked (>= 60 days from today) |
| 13 | Verify no license warning or error message is displayed | — | No warning or error is shown; license is valid and not nearing expiration threshold |
| 14 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrg}` | Sales Organization code is entered |
| 15 | Press Enter to confirm the Sales Organization entry | — | Sales Organization is confirmed |
| 16 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel code is entered |
| 17 | Press Enter to confirm the Distribution Channel entry | — | Distribution Channel is confirmed |
| 18 | In the "Division" field, enter the Division code | `{TD.division}` | Division code is entered |
| 19 | Press Enter to confirm the Division entry | — | Division is confirmed; organizational data is validated |
| 20 | In the "Items" section, click the "Add" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 21 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 22 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; controlled substance flag is verified |
| 23 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 24 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item pricing is calculated |
| 25 | Verify the license verification log entry is created | — | System logs the license verification check (timestamp, user, customer ID, material ID, result: PASS) in the audit trail |
| 26 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order submission |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 28 | Note the Sales Order number from the success message | — | Sales Order number is displayed (10-digit system-generated number) |
| 29 | Verify the Sales Order status | — | Sales Order status is "Open" or "Released" (not blocked) |
| 30 | Navigate back to the Sales Order list | — | Sales Order list is displayed |
| 31 | Search for the newly created Sales Order using the number noted in step 28 | — | The created Sales Order appears in the list with status "Open" |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with status "Open" (not blocked)
- All header data (Customer, Sales Org, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity) is correctly stored
- License verification check PASSED — no block or warning displayed
- Audit log entry is created recording the license verification check with result: PASS
- The created Sales Order appears in the list and can be processed for delivery

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "Open" / "Released" — not blocked
- Customer license verification passed; no license-related blocks exist
- Audit log entry exists: timestamp + user + customer ID `{TD.customerId}` + material ID `{TD.materialId}` + result: PASS + override flag: NO
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
