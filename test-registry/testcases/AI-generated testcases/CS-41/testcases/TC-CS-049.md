# TC-CS-049: Attempt to Submit Sales Order with Destination Country Missing

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
| P3 | Master Data | Customer `{TD.customerIdNoCountry}` exists in SAP BUT has missing destination country data in the customer master address record |
| P4 | Master Data | Material `{TD.materialId}` is created and released |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID (No Country) | `{TD.customerIdNoCountry}` | Sold-To Party with missing destination country in master data — entered by the user | Invalid (missing country) |
| Material ID | `{TD.materialId}` | Material master number for controlled product — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity — entered by the user | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type code — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution Channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Future delivery date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-9 | Complete login and open Create Sales Order form | — | Sales Order creation form opens |
| 10-17 | Enter Order Type, Sales Org, Dist Channel, and Division | `{TD.salesOrderType}`, `{TD.salesOrganization}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields are validated |
| 18 | Enter Customer ID with missing destination country | `{TD.customerIdNoCountry}` | Customer ID is entered |
| 19 | Press Enter | — | Customer name is auto-populated BUT destination country field remains blank or shows error |
| 20 | Verify Destination Country field is empty or flagged | — | Destination Country field is empty; system may display warning: "Destination country data missing in customer master" |
| 21-27 | Enter line item (Material, Quantity, Delivery Date) | `{TD.materialId}`, `{TD.orderQuantity}`, `{TD.requestedDeliveryDate}` | Line item data is entered |
| 28 | Click "Save" or "Order" button to attempt submission | — | SAP validates and detects missing Destination Country data |
| 29 | Observe validation error message | — | SAP displays error: "Destination Country is required for cross-border compliance screening" or "Cannot determine cross-border status: Customer address missing country code"; error indicates compliance screening cannot proceed |
| 30 | Verify submission is blocked | — | Sales Order is NOT created; form remains in edit mode with validation error visible |
| 31 | Verify error message clearly states destination country is required for compliance determination | — | Error message: "Sales Order cannot be confirmed. Destination country is missing in customer `{TD.customerIdNoCountry}` master data. Please update customer address with country code to enable compliance screening." |
| 32-34 | Sign out | — | User is signed out successfully |

---

### Expected Final Result

- NO Sales Order number is generated
- SAP highlights the missing Destination Country data and prevents submission
- A clear error message is displayed indicating Destination Country is required for compliance screening
- The Sales Order remains unsaved in draft/edit mode
- User is prompted to correct the customer master data before submission

---

### Post-conditions

- NO SAP Sales Order document is created
- Form remains in edit mode with validation error visible
- Customer master data quality issue is flagged for correction

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
