# TC-CS-102: Attempt to create a release order that exceeds the remaining contract value

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) — Release Order Value Limit Enforcement
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase orders and contracts (M_EINK_EKO, M_BANF_BSA) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Purchasing Contract | A valid purchasing contract exists with contract number `{TD.contractNumber}`, target value `{TD.contractTargetValue}`, and remaining value `{TD.contractRemainingValue}` |
| P4 | Master Data | Supplier `{TD.validVendorId}` and material `{TD.validMaterialId}` are configured in the contract |
| P5 | Configuration | Contract is in active status and available for release order creation |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Contract Number | `{TD.contractNumber}` | Existing contract number with target value limit — entered by the user | Valid |
| Release Order Quantity | `{TD.releaseQuantityValueExceed}` | Quantity that when multiplied by price exceeds the remaining contract value — entered by the user | Invalid |
| Contract Remaining Value | `{TD.contractRemainingValue}` | Current remaining value on the contract — verified in the contract header | Valid |
| Supplier ID | `{TD.validVendorId}` | Vendor from contract — verified in release order | Valid |
| Material ID | `{TD.validMaterialId}` | Material from contract — verified in release order | Valid |
| Net Price | `{TD.netPrice}` | Price from contract pricing tier — auto-populated in release order | Valid |
| Plant | `{TD.plant}` | Plant from contract — entered by the user | Valid |

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
| 9 | In the contract search filter, enter the contract number | `{TD.contractNumber}` | Contract number is entered in the filter field |
| 10 | Press Enter to search or click "Go" | — | The contract is displayed in the list |
| 11 | Click on the contract number to open the contract detail view | — | Contract detail view opens displaying remaining target value |
| 12 | Note the "Remaining Target Value" value | — | Remaining target value is displayed (e.g., `{TD.contractRemainingValue}`) |
| 13 | Navigate to the search icon and type "Manage Purchase Orders" | — | Search results appear listing the "Manage Purchase Orders" application |
| 14 | Click "Manage Purchase Orders" from the search results | — | "Manage Purchase Orders" application opens |
| 15 | Click the "Create PO" button in the application toolbar | — | New purchase order creation form opens |
| 16 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID is entered |
| 17 | Press Enter to confirm the Supplier entry | — | Supplier name `{TD.supplierName}` is auto-populated |
| 18 | In the "Contract" header field, enter the contract number | `{TD.contractNumber}` | Contract number is entered and linked to the purchase order |
| 19 | Press Enter to confirm the Contract entry | — | Contract is validated and linked |
| 20 | In the "Items" section "Material" field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered |
| 21 | Press Enter to confirm the Material entry | — | Material description and unit of measure are auto-populated |
| 22 | In the "Order Quantity" field, enter a quantity that when multiplied by the contract price exceeds the remaining value | `{TD.releaseQuantityValueExceed}` | Quantity is entered (calculated to exceed remaining value when multiplied by price) |
| 23 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 24 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 25 | Verify that the "Net Order Price" is auto-populated from the contract | `{TD.netPrice}` | Net order price is auto-filled; total value is calculated (Quantity × Price) |
| 26 | Observe that the total order value exceeds the remaining contract value | — | Total order value (Quantity × Price) is greater than `{TD.contractRemainingValue}` |
| 27 | Attempt to click the "Order" button in the toolbar | — | SAP validates the release value against the contract remaining balance |
| 28 | Observe the warning or error message | — | SAP displays a warning message indicating that the order value exceeds the remaining contract value |
| 29 | Verify the message content | — | Message states "Order value exceeds contract remaining value" or "Release order would exceed contract value limit" or similar SAP validation message |
| 30 | Verify that the purchase order is NOT created (or requires override approval) | — | No success message is displayed; no PO number is generated; or an override workflow is triggered |
| 31 | If a confirmation dialog appears asking to proceed despite the warning, click "Cancel" or "No" | — | Dialog is dismissed; purchase order is not submitted |
| 32 | Navigate back to "Manage Purchase Contracts" application | — | "Manage Purchase Contracts" application opens |
| 33 | Verify that the contract "Remaining Target Value" has NOT changed | `{TD.contractRemainingValue}` | Remaining value is unchanged (release order was not created) |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the release order value (quantity × price) against the contract remaining value balance
- A warning or error message is displayed indicating that the order value exceeds the remaining contract value `{TD.contractRemainingValue}`
- The purchase order is NOT created (or is blocked pending override approval)
- No PO number is generated
- Contract cumulative released value remains unchanged
- SAP contract value limit enforcement is functioning correctly and prevents over-spending

---

### Post-conditions

- No SAP Purchase Order document is created (or PO is in pending approval status)
- Contract remaining value is unchanged
- Contract value limit validation has been enforced successfully
- No data corruption or over-committed contracts remain in the system
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
