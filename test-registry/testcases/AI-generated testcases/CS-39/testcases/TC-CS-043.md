# TC-CS-043: Attempt to Create Free Goods Order with Invalid Customer ID

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
| P3 | Master Data | Customer `{TD.invalidCustomerId}` does NOT exist in SAP |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |
| P5 | Configuration | Order type ZFOC (Free of Charge Order) or equivalent free goods order type is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Customer ID | `{TD.invalidCustomerId}` | Non-existent customer account number — entered by the user | Invalid |
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
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the Manage Sales Orders application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New sales order creation form opens in edit mode |
| 10 | In the "Order Type" field, select the Free Goods order type | `{TD.orderType}` | Free Goods order type (ZFOC or equivalent) is selected |
| 11 | In the "Sold-To Party:*" header field, enter the invalid Customer ID | `{TD.invalidCustomerId}` | Invalid customer ID value is entered into the field |
| 12 | Press Enter to confirm the Customer entry | — | SAP displays an error message indicating the customer does not exist; customer name and address fields are NOT auto-populated |
| 13 | Verify that the error message is displayed and describes the invalid customer | — | Error message is displayed (e.g., "Customer does not exist" or "Invalid sold-to party"); user is informed that the customer ID is not valid |
| 14 | Attempt to proceed by clicking in the "Items" section | — | System prevents further data entry or displays validation warnings; user cannot proceed without a valid customer |
| 15 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 16 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 17 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the invalid customer ID and displays a descriptive error message
- Customer name and address fields are NOT auto-populated
- The Free Goods sales order is NOT created
- User is prevented from completing the transaction with an invalid customer
- Error is clearly communicated to the user

---

### Post-conditions

- No sales order document is created in SAP
- No data is persisted for the invalid customer
- System state is unchanged (no partial or draft order created)

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
