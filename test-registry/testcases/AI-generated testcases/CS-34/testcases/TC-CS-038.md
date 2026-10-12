# TC-CS-038: Attempt to Create Sales Order When Customer Has No License on File

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
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
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerIdNoLicense}` exists and is active BUT does NOT have any pharmacy/wholesaler license on file (license field is null or not maintained) |
| P4 | Master Data | Material `{TD.materialId}` exists, is released, and flagged as a controlled substance in the material master |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and assigned to the user |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerIdNoLicense}` | Sold-To Party account number with NO license on file — entered by the user | Invalid (no license) |
| Material ID | `{TD.materialId}` | Controlled substance material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |

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
| 10 | In the "Sold-To Party:*" header field, enter the Customer ID | `{TD.customerIdNoLicense}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name is auto-populated in the header |
| 12 | SAP performs automatic license verification | — | System checks customer master for valid license classification; license field is found to be null or not maintained |
| 13 | Observe the license block error message | — | System displays an error message: "No valid license on file for customer `{TD.customerIdNoLicense}` for controlled substance material" — Sales Order creation is blocked |
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
| 25 | Verify the license verification log entry is created | — | System logs the license verification check (timestamp, user, customer ID, material ID, result: FAIL_NO_LICENSE) in the audit trail |
| 26 | Attempt to click the "Save" button (primary submit action) in the toolbar | — | System prevents save action due to license block; error message remains visible; "Save" button may be disabled or clicking it re-displays the error |
| 27 | Verify that no Sales Order number is generated | — | No success message is displayed; no Sales Order document is created |
| 28 | Click "Cancel" or navigate back to the Sales Order list | — | Sales Order list is displayed; no new Sales Order exists |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- NO Sales Order is created
- System displays a clear error message indicating that no valid license is on file for the customer
- Sales Order creation is blocked — user cannot proceed without a valid license or authorized override
- Audit log entry is created recording the license verification failure: timestamp + user + customer ID `{TD.customerIdNoLicense}` + material ID `{TD.materialId}` + result: FAIL_NO_LICENSE + override flag: NO
- No Sales Order document exists in the system

---

### Post-conditions

- NO SAP Sales Order document exists
- Customer `{TD.customerIdNoLicense}` remains blocked from ordering controlled substances until a valid license is added to the customer master
- Audit log entry exists: timestamp + user + customer ID + material ID + result: FAIL_NO_LICENSE + override flag: NO
- No application-level errors or critical warnings remain outstanding (error is expected and handled)

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
