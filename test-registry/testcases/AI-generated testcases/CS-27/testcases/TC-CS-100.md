# TC-CS-100: Attempt to create a contract with a material not in the source list for the vendor

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
| P4 | Master Data | Material `{TD.materialNotInSourceList}` exists in material master but does NOT have a source list entry for vendor `{TD.validVendorId}` and plant `{TD.plant}` |
| P5 | Configuration | Source list validation is active for purchasing organization `{TD.purchasingOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.materialNotInSourceList}` | Material master number that is NOT in the source list for this vendor — entered by the user | Invalid |
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
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated |
| 12 | In the "Material:*" item field, enter the Material ID that is not in the source list | `{TD.materialNotInSourceList}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material and source list; an error message is displayed indicating the material is not in the source list for this vendor |
| 14 | Observe the error message content | — | Error message states "Material `{TD.materialNotInSourceList}` is not in the source list for vendor `{TD.validVendorId}` and plant `{TD.plant}`" or similar SAP validation message |
| 15 | Verify that the Material Description field may be auto-populated but an error indicator is present | — | Material description may appear but the source list validation error is displayed |
| 16 | Attempt to proceed with contract creation by entering Plant and Target Quantity | `{TD.plant}`, `{TD.targetQuantity}` | Plant and target quantity are entered but the source list validation error remains |
| 17 | Attempt to click the "Save" button in the toolbar | — | SAP blocks the save action or displays the source list validation error again |
| 18 | Observe that the contract is NOT created | — | No success message is displayed; no contract number is generated; the error persists |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the vendor-material combination against the source list
- An error message is displayed indicating that material `{TD.materialNotInSourceList}` is not approved in the source list for vendor `{TD.validVendorId}` and plant `{TD.plant}`
- Contract creation is blocked and the "Save" button does not function or displays the error again
- No contract number is generated
- No contract document is persisted in SAP
- SAP source list validation is functioning correctly and enforces vendor-material approval consistency

---

### Post-conditions

- No SAP Purchasing Contract document is created
- Source list validation has been enforced successfully
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
