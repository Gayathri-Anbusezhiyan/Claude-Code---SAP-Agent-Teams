# TC-CS-037: Authorized Compliance User Overrides License Block with Valid Justification

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
| P1 | User Role | User has the role of Compliance user with SAP authorization to override license blocks (authorization object V_VBAK_OVR or custom auth object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists but has an expired or invalid license that would normally block Sales Order creation |
| P4 | Master Data | Material `{TD.materialId}` exists, is released, and flagged as a controlled substance in the material master |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and assigned to the user |
| P6 | Authorization | Compliance user is authorized to override license blocks and must provide documented justification |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with expired/invalid license — entered by the user | Valid (but license blocked) |
| Material ID | `{TD.materialId}` | Controlled substance material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Override Justification | `{TD.overrideJustification}` | Documented business justification for override — entered by the authorized user | Valid |
| License Expiry Date | `{TD.licenseExpiryExpired}` | Customer license expiration date (expired — past date) | Invalid |

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
| 12 | SAP performs automatic license verification | — | System checks customer master for valid license; license expiration date `{TD.licenseExpiryExpired}` is checked and found to be expired (< today) |
| 13 | Observe the license block error message | — | System displays an error message: "No valid license on file for customer `{TD.customerId}` / material `{TD.materialId}`" or "Customer license has expired" — Sales Order creation is blocked |
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
| 25 | Attempt to click the "Save" button | — | System prevents save action due to license block; error message remains visible |
| 26 | Click the "Override Block" button or "Compliance Override" button (available only to authorized users) | — | Override justification dialog appears prompting for documented justification |
| 27 | In the "Justification" text field, enter the override justification | `{TD.overrideJustification}` | Justification text is entered (e.g., "Emergency order approved by Compliance Manager — license renewal in progress ref CM-2026-123") |
| 28 | Click "Submit Override" or "Confirm" in the justification dialog | — | System validates the override authorization; justification is accepted; license block is overridden |
| 29 | Verify the license verification log entry with override flag | — | System logs the license verification check with result: OVERRIDE_APPROVED (timestamp, user, customer ID, material ID, justification text, override flag: YES) in the audit trail |
| 30 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order submission (block is now overridden) |
| 31 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 32 | Note the Sales Order number from the success message | — | Sales Order number is displayed (10-digit system-generated number) |
| 33 | Verify the Sales Order status | — | Sales Order status is "Open" or "Released" (override successful) |
| 34 | Navigate back to the Sales Order list | — | Sales Order list is displayed |
| 35 | Search for the newly created Sales Order using the number noted in step 32 | — | The created Sales Order appears in the list with status "Open" |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with status "Open" (license block successfully overridden)
- All header data (Customer, Sales Org, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity) is correctly stored
- License block was overridden by authorized Compliance user with documented justification
- Audit log entry is created recording the license verification check with result: OVERRIDE_APPROVED + justification text: `{TD.overrideJustification}` + override flag: YES + user ID
- The created Sales Order appears in the list and can be processed for delivery

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "Open" / "Released" (override successful)
- Audit log entry exists: timestamp + user + customer ID `{TD.customerId}` + material ID `{TD.materialId}` + result: OVERRIDE_APPROVED + justification: `{TD.overrideJustification}` + override flag: YES
- Override event is fully documented for regulatory audit purposes
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
