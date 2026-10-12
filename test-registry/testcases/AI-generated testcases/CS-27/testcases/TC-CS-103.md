# TC-CS-103: Attempt to create a contract with Validity End Date before Validity Start Date

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, and approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (e.g., today or future) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDateInvalid}` | Contract end date set BEFORE the start date — entered by the user | Invalid |
| Net Price | `{TD.netPrice}` | Negotiated price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 8 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens |
| 9 | Click the "Create" button in the application toolbar | — | New contract creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated |
| 12 | In the "Material:*" item field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-filled |
| 14 | In the "Plant:*" item field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 15 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 16 | In the "Target Quantity" header field, enter the target quantity | `{TD.targetQuantity}` | Target quantity is populated |
| 17 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered (e.g., today or a future date) |
| 18 | In the "Valid To:*" header field, enter the validity end date BEFORE the start date | `{TD.validityEndDateInvalid}` | Validity end date is entered (date is earlier than Valid From date) |
| 19 | Press Tab or click outside the "Valid To" field to trigger validation | — | SAP validates the date range and displays an error message |
| 20 | Observe the error message content | — | Error message states "Valid To date must be after Valid From date" or "End date cannot be before start date" or similar SAP validation message |
| 21 | Verify that the "Valid To" field is highlighted with an error indicator | — | Field displays error icon or red border indicating invalid value |
| 22 | In the "Scale Quantity" pricing condition field, enter the starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered |
| 23 | In the "Net Price:*" pricing condition field, enter the negotiated price | `{TD.netPrice}` | Net price is entered |
| 24 | Press Enter to confirm the Net Price entry | — | Pricing condition may be saved but the date validation error persists |
| 25 | Attempt to click the "Save" button in the toolbar | — | SAP blocks the save action due to the date validation error |
| 26 | Observe that the save operation fails or displays the date validation error again | — | Error message is displayed; no success message appears; no contract number is generated |
| 27 | Verify that the contract is NOT created | — | No contract document is persisted in SAP |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the validity date range and detects that the end date is before the start date
- An error message is displayed indicating the date order is invalid
- The "Valid To" field is highlighted with an error indicator
- Contract creation is blocked and the "Save" button does not function
- No contract number is generated
- No contract document is persisted in SAP
- SAP date validation is functioning correctly and enforces logical date ordering

---

### Post-conditions

- No SAP Purchasing Contract document is created
- Date validation has been enforced successfully
- No data corruption or invalid contracts remain in the system
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
