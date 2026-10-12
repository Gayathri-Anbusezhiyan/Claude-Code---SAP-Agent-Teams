# TC-CS-045: Attempt to Create Free Goods Order with Material Not Configured for Free Goods

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
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
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.nonFreeGoodsMaterialId}` exists in SAP but is NOT configured for free goods distribution (item category TANN is not auto-determined for this material) |
| P5 | Configuration | Order type ZFOC is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Non-Free Goods Material ID | `{TD.nonFreeGoodsMaterialId}` | Material NOT configured for free goods — entered by the user | Invalid (wrong configuration) |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the Manage Sales Orders application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New sales order creation form opens in edit mode |
| 10 | In the "Order Type" field, select the Free Goods order type | `{TD.orderType}` | Free Goods order type (ZFOC or equivalent) is selected |
| 11 | In the "Sold-To Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID is entered |
| 12 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated |
| 13 | In the "Items" section, click the "Create" button | — | A new empty line item row appears |
| 14 | In the "Material" field, enter the non-free goods Material ID | `{TD.nonFreeGoodsMaterialId}` | Material ID is entered |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.nonFreeGoodsMaterialDesc}` is auto-populated; unit of measure is auto-filled |
| 16 | Verify that the Item Category field does NOT show TANN (Free Goods) | — | Item Category is auto-determined as a standard item category (e.g., TAN or other), NOT TANN; material is not configured for free goods |
| 17 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is entered |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | Click the "Save" button (primary submit action) in the toolbar | — | SAP displays an error message indicating the material is not authorized for free goods distribution or item category mismatch; submission is blocked or rejected |
| 20 | Verify that the error message clearly states the material configuration issue | — | Error message indicates material is not configured for free goods (e.g., "Material not authorized for item category TANN" or "Item category mismatch for free goods order") |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the material is not configured for free goods distribution (item category TANN is not auto-determined)
- A descriptive error message is displayed indicating the material configuration issue
- The Free Goods sales order is NOT created
- User is informed that the material is not authorized for free goods

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
