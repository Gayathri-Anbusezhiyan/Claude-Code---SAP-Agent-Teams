# TC-CS-044: Attempt to Create Free Goods Order with Customer Not Classified as Healthcare Provider

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
| P3 | Master Data | Customer `{TD.nonHealthcareCustomerId}` exists in SAP but is NOT classified as healthcare provider (account group does not indicate healthcare classification) |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |
| P5 | Configuration | Order type ZFOC requires healthcare provider classification for customer |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-Healthcare Customer ID | `{TD.nonHealthcareCustomerId}` | Existing customer NOT classified as healthcare provider — entered by the user | Invalid (wrong classification) |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material number — entered by the user | Valid |
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
| 11 | In the "Sold-To Party:*" header field, enter the non-healthcare Customer ID | `{TD.nonHealthcareCustomerId}` | Non-healthcare customer ID is entered |
| 12 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.nonHealthcareCustomerName}` is auto-populated; however, system detects the customer is not classified as healthcare provider |
| 13 | Attempt to add a line item by clicking the "Create" button in the Items section | — | System may display a validation warning or error indicating the customer account group is not authorized for free goods distribution to healthcare providers |
| 14 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 15 | Press Enter to confirm the Material entry | — | Material is validated and populated |
| 16 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is entered |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 18 | Click the "Save" button (primary submit action) in the toolbar | — | SAP displays an error message indicating the customer is not classified as healthcare provider; submission is blocked or rejected |
| 19 | Verify that the error message clearly states the customer account group issue | — | Error message indicates customer account group does not permit free goods distribution for healthcare samples (e.g., "Customer not authorized for healthcare sample distribution" or similar) |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the customer account group is not classified as healthcare provider
- A descriptive error message is displayed indicating the customer is not authorized for free goods distribution
- The Free Goods sales order is NOT created
- User is informed of the customer classification issue

---

### Post-conditions

- No sales order document is created in SAP
- No data is persisted for the non-healthcare customer
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
