# TC-CS-046: Attempt to Create Free Goods Order with Non-Zero Pricing

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |
| P5 | Configuration | Pricing procedure for order type ZFOC is configured to apply 100% discount or zero pricing; test scenario simulates pricing procedure error where non-zero pricing is applied |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
| Non-Zero Net Value | `{TD.nonZeroNetValue}` | Net value incorrectly calculated as non-zero — system error condition | Invalid (pricing procedure error) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to password entry |
| 4 | Enter the user password | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates; Fiori Launchpad home page is displayed |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Click the search icon and type "Manage Sales Orders" | — | Search results appear |
| 8 | Click "Manage Sales Orders" from the search results | — | Application opens |
| 9 | Click the "Create" button | — | New sales order form opens |
| 10 | Select the Free Goods order type | `{TD.orderType}` | ZFOC is selected |
| 11 | Enter the Customer ID | `{TD.customerId}` | Customer ID is entered |
| 12 | Press Enter to confirm | — | Customer name is auto-populated |
| 13 | Click "Create" in the Items section | — | New line item row appears |
| 14 | Enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 15 | Press Enter to confirm | — | Material description is auto-populated |
| 16 | Enter the quantity | `{TD.quantity}` | Quantity is populated |
| 17 | Press Enter to confirm | — | Quantity is confirmed |
| 18 | Verify the Net Value field after pricing procedure runs | — | If Net Value shows a non-zero amount `{TD.nonZeroNetValue}`, this indicates a pricing procedure error |
| 19 | Click the "Save" button | — | SAP should detect the pricing procedure error and display a validation error message indicating free goods orders must have zero pricing; submission is blocked |
| 20 | Verify the error message | — | Error message indicates pricing procedure violation (e.g., "Free goods orders must have zero net value" or "Pricing error for free goods order") |
| 21 | Click the User Profile icon | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP detects the pricing procedure error (non-zero net value for free goods order)
- A descriptive error message is displayed indicating the pricing violation
- The Free Goods sales order is NOT created
- User is informed of the pricing procedure error

---

### Post-conditions

- No sales order document is created in SAP
- System state is unchanged

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
