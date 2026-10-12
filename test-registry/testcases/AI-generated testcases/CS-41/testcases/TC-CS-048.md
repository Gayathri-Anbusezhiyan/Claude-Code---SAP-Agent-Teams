# TC-CS-048: Attempt to Submit Sales Order with Material Field Empty

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
| P3 | Master Data | Customer `{TD.customerId}` exists and is active |
| P4 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number — entered by the user | Valid |
| Material ID | `{TD.emptyValue}` | Material field intentionally left empty — not entered by the user | Invalid (empty) |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity — entered by the user | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type code — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution Channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-9 | Complete login and open Create Sales Order form | — | Sales Order creation form opens |
| 10-19 | Enter Order Type, Sales Org, Dist Channel, Division, and Sold-To Party | `{TD.salesOrderType}`, `{TD.salesOrganization}`, `{TD.distributionChannel}`, `{TD.division}`, `{TD.customerId}` | All organizational fields and customer are validated and populated |
| 20 | Click "Create" button in Items section | — | New line item row appears |
| 21 | Leave the "Material" field empty in the line item | `{TD.emptyValue}` | Material field remains blank |
| 22 | Enter Order Quantity | `{TD.orderQuantity}` | Quantity is entered (but material is still empty) |
| 23 | Press Enter | — | System may flag missing material immediately or wait for submission |
| 24 | Click "Save" or "Order" button to attempt submission | — | SAP validates mandatory fields and detects missing Material |
| 25 | Observe validation error message | — | SAP displays error message: "Material is a mandatory field" or "Enter Material"; the Material field is highlighted in red or with an error indicator |
| 26 | Verify submission is blocked | — | Sales Order is NOT created; the form remains in edit mode with the validation error visible |
| 27 | Verify error message clearly indicates Material is required | — | Error message text clearly states: "Please enter Material. This field is mandatory for line item creation." |
| 28-30 | Sign out | — | User is signed out successfully |

---

### Expected Final Result

- NO Sales Order number is generated
- SAP highlights the Material field as mandatory and prevents submission
- A clear error message is displayed indicating the Material field is required
- The Sales Order remains unsaved in draft/edit mode
- User is prompted to fill the missing Material field before submission

---

### Post-conditions

- NO SAP Sales Order document is created
- Form remains in edit mode with validation error visible

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
