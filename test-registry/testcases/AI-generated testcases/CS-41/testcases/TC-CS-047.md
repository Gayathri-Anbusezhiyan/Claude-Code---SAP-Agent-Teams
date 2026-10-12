# TC-CS-047: Attempt to Submit Sales Order with Customer Field Empty

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Export Compliance Officer with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created and released |
| P4 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.emptyValue}` | Sold-To Party field intentionally left empty — not entered by the user | Invalid (empty) |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
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
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter the user password | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click "Continue" | — | Fiori Launchpad home page is displayed |
| 6 | If pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Click search icon and type "Create Sales Order" | — | Search results appear |
| 8 | Click "Create Sales Order" from results | — | Application opens |
| 9 | Click "Create" button | — | New SO form opens |
| 10 | Enter Sales Order Type | `{TD.salesOrderType}` | Order Type is entered |
| 11 | Press Enter | — | Order Type is validated |
| 12 | Enter Sales Organization | `{TD.salesOrganization}` | Sales Organization is entered |
| 13 | Press Enter | — | Sales Organization is validated |
| 14 | Enter Distribution Channel | `{TD.distributionChannel}` | Distribution Channel is entered |
| 15 | Press Enter | — | Distribution Channel is validated |
| 16 | Enter Division | `{TD.division}` | Division is entered |
| 17 | Press Enter | — | Division is validated |
| 18 | Leave the "Sold-To Party" field empty | `{TD.emptyValue}` | Sold-To Party field remains blank |
| 19 | Click "Create" button in Items section | — | New line item row appears |
| 20 | Enter Material ID in line item | `{TD.materialId}` | Material ID is entered |
| 21 | Press Enter | — | Material description is auto-populated |
| 22 | Enter Order Quantity | `{TD.orderQuantity}` | Quantity is entered |
| 23 | Press Enter | — | Quantity is confirmed |
| 24 | Enter Requested Delivery Date | `{TD.requestedDeliveryDate}` | Delivery date is entered |
| 25 | Press Enter | — | Delivery date is confirmed |
| 26 | Click "Save" or "Order" button to attempt submission | — | SAP validates mandatory fields and detects missing Sold-To Party |
| 27 | Observe validation error message | — | SAP displays error message: "Sold-To Party is a mandatory field" or "Enter Sold-To Party"; the Sold-To Party field is highlighted in red or with an error indicator |
| 28 | Verify submission is blocked | — | Sales Order is NOT created; the form remains in edit mode with the validation error visible |
| 29 | Verify error message clearly indicates Sold-To Party is required | — | Error message text clearly states: "Please enter Sold-To Party. This field is mandatory for Sales Order creation." |
| 30 | Click User Profile icon | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- NO Sales Order number is generated
- SAP highlights the Sold-To Party field as mandatory and prevents submission
- A clear error message is displayed indicating the Sold-To Party field is required
- The Sales Order remains unsaved in draft/edit mode
- User is prompted to fill the missing Sold-To Party field before the system will allow submission

---

### Post-conditions

- NO SAP Sales Order document is created or persisted
- Form remains in edit mode with validation error visible
- No application-level errors or critical warnings remain outstanding beyond the expected validation error

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
