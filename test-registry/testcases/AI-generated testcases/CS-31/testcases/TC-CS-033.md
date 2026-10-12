# TC-CS-033: Attempt to Create Purchase Order Against Vendor with Pending Change Request

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
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
| P1 | User Role | User has the role of Procurement Officer or equivalent with SAP authorization to create purchase orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorIdPending}` exists in SAP master data and has an APPROVED status currently |
| P4 | Change Request | A pending change request `{TD.pendingChangeRequestId}` exists for vendor `{TD.vendorIdPending}`, requesting a manufacturing site change, and is awaiting QA approval (not yet approved) |
| P5 | System Configuration | The system is configured to block PO creation against vendors with pending manufacturing site change requests |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdPending}` | Vendor account number with pending change request — to be entered in PO creation | Valid (but with pending change) |
| Material ID | `{TD.materialId}` | Material number to use in PO line item — entered by user | Valid |
| Order Quantity | `{TD.quantity}` | Quantity to order — entered by user | Valid |
| Net Order Price | `{TD.price}` | Price per unit — entered by user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — verified on line item | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing the Manage Purchase Orders application |
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens |
| 9 | Click the "Create PO" button in the application toolbar | — | New purchase order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Vendor ID with pending change request | `{TD.vendorIdPending}` | Vendor ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP attempts to validate the supplier |
| 12 | Observe the system response after supplier validation | — | SAP displays a blocking error message indicating that the vendor has a pending change request affecting the manufacturing site; PO creation is not allowed until the change request is approved |
| 13 | Verify that the supplier name is NOT auto-populated or the PO header is blocked | — | Supplier name field remains empty OR an error indicator is displayed on the Supplier field; organizational fields (Purchasing Org, Purchasing Group) are not populated |
| 14 | Verify that the PO cannot proceed to line item entry | — | The Items section is disabled or not accessible; the Create button for line items is not clickable |
| 15 | Attempt to click the "Order" button (if visible and enabled) | — | Either the Order button is disabled/greyed out, OR if clicked, SAP displays an error message preventing submission due to the pending vendor change request |
| 16 | Note the error message text or error code | — | Error message clearly states that PO creation is blocked due to a pending vendor change request requiring QA approval |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully blocks PO creation against vendor `{TD.vendorIdPending}` because a pending manufacturing site change request exists
- SAP displays a clear, descriptive error message indicating the vendor has a pending change request and PO creation is not permitted until QA approval is granted
- No purchase order is created
- The user is informed of the business rule enforcement preventing procurement from an unapproved or unverified manufacturing location

---

### Post-conditions

- No purchase order is created for vendor `{TD.vendorIdPending}`
- Vendor `{TD.vendorIdPending}` remains in its current state with the pending change request unaffected
- No data corruption or inconsistent state results from the blocked PO creation attempt

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
