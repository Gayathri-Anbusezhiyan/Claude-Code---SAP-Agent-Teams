# TC-CS-044: Attempt to Create Cross-Border Sales Order with Customer on Denied-Party List

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Export Compliance Officer with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.deniedPartyCustomerId}` exists in SAP customer master but IS on the denied-party list (fails denied-party screening) |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and flagged as a controlled pharmaceutical product in the material master |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |
| P6 | Configuration | Denied-party screening API or SAP GTS is configured and accessible |
| P7 | Test Data | Customer `{TD.deniedPartyCustomerId}` is confirmed to be on the test denied-party list before test execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID (Denied Party) | `{TD.deniedPartyCustomerId}` | Sold-To Party account number on denied-party list — entered by the user | Invalid |
| Material ID | `{TD.materialId}` | Material master number for controlled pharmaceutical product — entered by the user | Valid |
| Destination Country | `{TD.destinationCountry}` | ISO country code for cross-border destination — derived from customer master | Valid |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity to order — entered by the user | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type code — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution Channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Future delivery date — entered by the user | Valid |

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
| 8 | Click the "Create Sales Order" application name from the search results | — | Create Sales Order application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Order Type" header field, enter the Sales Order Type | `{TD.salesOrderType}` | Order Type value is entered into the field |
| 11 | Press Enter to confirm the Order Type entry | — | SAP validates the order type; form structure is configured accordingly |
| 12 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrganization}` | Sales Organization code is entered |
| 13 | Press Enter to confirm the Sales Organization entry | — | Sales Organization is validated and confirmed |
| 14 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel code is entered |
| 15 | Press Enter to confirm the Distribution Channel entry | — | Distribution Channel is validated and confirmed |
| 16 | In the "Division" field, enter the Division code | `{TD.division}` | Division code is entered |
| 17 | Press Enter to confirm the Division entry | — | Division is validated and confirmed |
| 18 | In the "Sold-To Party" header field, enter the denied-party Customer ID | `{TD.deniedPartyCustomerId}` | Customer ID value is entered into the field |
| 19 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name and destination country are auto-populated in the header |
| 20 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 21 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 22 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 23 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 24 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item totals are updated |
| 25 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Requested delivery date is populated with a future date |
| 26 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 27 | Click the "Check" or "Validate" button to trigger compliance screening (if available as separate action) | — | SAP initiates denied-party screening |
| 28 | Observe the system processing the denied-party screening | — | System displays a progress indicator or status message indicating denied-party screening is in progress |
| 29 | Wait for the denied-party screening to complete | — | Denied-party screening completes with a FAILED result |
| 30 | Observe the error message or compliance check failure notification | — | SAP displays a clear error message: "Customer is on denied-party list" or "Compliance check failed: Customer flagged as denied party"; error message includes the customer ID and failure reason |
| 31 | Verify the Compliance Check Status field shows "FAILED" or "BLOCKED" | — | Compliance check status shows "FAILED_DENIED_PARTY" or equivalent blocking status |
| 32 | Attempt to click the "Save" or "Order" button (primary submit action) in the toolbar | — | SAP prevents submission; the "Order" button is either disabled or clicking it triggers the same compliance error message |
| 33 | Observe that the Sales Order is NOT created | — | No Sales Order number is generated; the form remains in draft/unsaved state with the compliance blocking error visible |
| 34 | Verify that the error message explicitly states the customer is on the denied-party list and the Sales Order cannot be confirmed | — | Error message text clearly communicates: "Sales Order cannot be confirmed. Customer `{TD.deniedPartyCustomerId}` is on the denied-party list. Please contact Export Compliance team." |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- NO Sales Order number is generated
- The Sales Order creation is BLOCKED by the denied-party screening failure
- SAP displays a clear, descriptive error message indicating the customer is on the denied-party list
- The error message includes the customer ID and the failure reason
- The compliance check status is "FAILED_DENIED_PARTY" or equivalent
- The user is prevented from submitting or confirming the Sales Order
- Compliance audit log entry is created recording the screening failure and blocking action

---

### Post-conditions

- NO SAP Sales Order document is created or persisted
- Compliance audit log entry records the denied-party screening failure, customer ID, timestamp, and blocking action
- No application-level errors or critical warnings remain outstanding beyond the expected compliance blocking error

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
