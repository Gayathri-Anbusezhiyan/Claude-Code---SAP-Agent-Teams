# TC-CS-099: Attempt to create a contract with a vendor not approved for the purchasing organization

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
| P3 | Master Data | Supplier `{TD.vendorNotApproved}` exists in vendor master but is NOT approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.vendorNotApproved}` | Vendor account number that is NOT approved for the purchasing organization — entered by the user | Invalid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (today) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date (future) — entered by the user | Valid |
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
| 10 | In the "Supplier:*" header field, enter the unapproved Supplier ID | `{TD.vendorNotApproved}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier and displays an error message indicating the vendor is not approved for the purchasing organization |
| 12 | Observe the error message content | — | Error message states "Vendor `{TD.vendorNotApproved}` is not approved for purchasing organization `{TD.purchasingOrg}`" or similar SAP validation message |
| 13 | Verify that the Supplier Name field is NOT auto-populated | — | Supplier Name field remains empty or shows error indicator |
| 14 | Attempt to proceed with contract creation by entering Material ID | `{TD.validMaterialId}` | Material ID is entered but contract creation cannot proceed due to invalid supplier |
| 15 | Press Enter to confirm Material entry | — | SAP may validate material but the supplier validation error remains active |
| 16 | Attempt to click the "Save" button in the toolbar | — | SAP either blocks the save action or displays the vendor approval error again |
| 17 | Observe that the contract is NOT created | — | No success message is displayed; no contract number is generated; the error persists |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the supplier and detects that vendor `{TD.vendorNotApproved}` is not approved for purchasing organization `{TD.purchasingOrg}`
- An error message is displayed indicating the vendor approval status issue
- Supplier Name field is NOT auto-populated (validation fails)
- Contract creation is blocked and the "Save" button either does not function or displays the error again
- No contract number is generated
- No contract document is persisted in SAP
- SAP vendor approval validation is functioning correctly and prevents invalid vendor usage

---

### Post-conditions

- No SAP Purchasing Contract document is created
- Vendor approval validation has been enforced successfully
- No data corruption or incomplete contracts remain in the system
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
