# TC-CS-037: Supervisor rejects manual price override request

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Manual Price Override Rejection
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders; manual price overrides beyond tolerance require supervisor approval |
| P2 | Supervisor Role | A supervisor user account exists with authorization to approve or reject price override requests |
| P3 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P4 | Master Data | Material `{TD.materialId}` exists and is configured for sales |
| P5 | Master Data | Customer `{TD.customerId}` exists, is active, and has Customer Pricing Group assigned |
| P6 | Pricing Condition | A valid pricing condition record exists for Material `{TD.materialId}` with list price `{TD.listPrice}` |
| P7 | Configuration | Price tolerance is configured (e.g., 5% allowed deviation) — manual overrides beyond this tolerance require supervisor approval |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-009`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Order quantity — entered by the user | Valid |
| List Price | `{TD.listPrice}` | List price from pricing condition — auto-applied by SAP | Valid |
| Manual Override Price Beyond Tolerance | `{TD.manualOverridePriceBeyondTolerance}` | Manual override price beyond tolerance (e.g., 7% deviation) — entered by the user | Valid |
| Tolerance Percent | `{TD.tolerancePercent}` | Configured tolerance percentage (e.g., 5%) | Valid |
| Supervisor Username | `{ENV.SAP_SUPERVISOR_USERNAME}` | Supervisor user account email | Valid |
| Supervisor Password | `{ENV.SAP_SUPERVISOR_PASSWORD}` | Supervisor user account password | Valid |
| Rejection Reason | `{TD.rejectionReason}` | Reason for rejection entered by supervisor | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing the "Create Sales Order" application |
| 8 | Click the "Create Sales Order" application from the search results | — | Create Sales Order application opens |
| 9 | In the "Sold-to Party" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer Name is auto-populated |
| 11 | In the line items section, click the "Add Item" button | — | A new line item row appears |
| 12 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description is auto-populated |
| 14 | In the "Order Quantity" field, enter the order quantity | `{TD.orderQuantity}` | Order quantity is entered |
| 15 | Press Enter to confirm the quantity entry | — | SAP triggers pricing determination; list price `{TD.listPrice}` is applied to the line item |
| 16 | Navigate to the "Pricing" view or click "Show Pricing Details" for the line item | — | Pricing details screen is displayed |
| 17 | Click the "Manual Price Entry" or "Override Price" button/field | — | Manual price entry field becomes editable |
| 18 | In the manual price field, enter the override price beyond tolerance | `{TD.manualOverridePriceBeyondTolerance}` | Override price is entered (e.g., 7% deviation from list price) |
| 19 | Press Enter to confirm the manual price override | — | SAP validates the override price against the tolerance threshold |
| 20 | Verify the system detects the override exceeds tolerance and displays an approval requirement message | — | Message is displayed: "Price override exceeds tolerance. Supervisor approval required." or similar |
| 21 | Verify the sales order line item is flagged as "Pending Approval" | — | Line item status indicates approval is required |
| 22 | Click the "Request Approval" button or proceed to submit the approval request | — | Approval request is created and sent to the supervisor |
| 23 | Note the sales order number or approval request ID | — | Request ID is displayed |
| 24 | Sign out from the Sales Order Processor account | — | User is signed out |
| 25 | Sign in to SAP with the supervisor account credentials | `{ENV.SAP_SUPERVISOR_USERNAME}`, `{ENV.SAP_SUPERVISOR_PASSWORD}` | Supervisor account is logged in |
| 26 | Navigate to the "Approve Requests" or "Workflow Inbox" application | — | Approval inbox is displayed |
| 27 | Locate the price override approval request created in step 22 | — | Approval request is listed in the inbox |
| 28 | Open the approval request detail view | — | Approval request details are displayed showing the override price and deviation percentage |
| 29 | Verify the request shows the override price, tolerance deviation, and sales order details | `{TD.manualOverridePriceBeyondTolerance}` | All details are correctly displayed |
| 30 | Enter a rejection reason in the comments/reason field | `{TD.rejectionReason}` | Rejection reason is entered (e.g., "Price deviation not justified") |
| 31 | Click the "Reject" button | — | Rejection is confirmed |
| 32 | Verify a success message confirms the rejection | — | Message is displayed: "Price override rejected" or similar |
| 33 | Sign out from the supervisor account | — | Supervisor is signed out |
| 34 | Sign back in with the Sales Order Processor account | `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | Sales Order Processor account is logged in |
| 35 | Navigate to the sales order created earlier | — | Sales order is opened |
| 36 | Verify the line item price reverts to the original list price (not the override price) | `{TD.listPrice}` | Unit price field shows the list price (override is rejected) |
| 37 | Verify the line item approval status is "Rejected" | — | Approval status is updated to "Rejected" |
| 38 | Verify the rejection reason is visible in the sales order or approval history | `{TD.rejectionReason}` | Rejection reason is displayed |
| 39 | Verify the sales order cannot be finalized until the pricing issue is resolved (either accept list price or request new override) | — | System blocks finalization with message indicating unresolved pricing approval |
| 40 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 41 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 42 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Supervisor rejects the price override request with a rejection reason
- Sales order line item price reverts to the original list price (override is not applied)
- Line item approval status is updated to "Rejected"
- Rejection reason is visible in the approval history
- Sales order cannot be finalized until pricing is resolved

---

### Post-conditions

- SAP Sales Order exists but is not finalized (pending pricing resolution)
- Line item pricing reflects the original list price (override rejected)
- Approval request is closed with "Rejected" status
- Rejection reason is logged in the approval history

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

**Automation Note:** This test case requires multi-user session orchestration (Sales Order Processor and Supervisor accounts). Mark as PARTIAL automation candidate — requires setup of supervisor user account and approval workflow automation.

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
