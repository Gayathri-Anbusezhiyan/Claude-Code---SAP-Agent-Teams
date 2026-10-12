# TC-CS-138: Attempt Export Delivery Creation with Missing or Invalid Shipping Point

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product with batch management and export data maintained |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for the material with sufficient stock and CoA attached |
| P6 | Test Condition | Shipping Point field will be left empty or entered with an invalid code — this is the error condition being tested |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-ERR-04`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Batch-managed pharma material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
| Shipping Point | `{TD.emptyShippingPoint}` | Shipping Point field left empty (mandatory field) | Invalid (missing) |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Delivery" | — | Search results appear listing the "Create Outbound Deliveries" application |
| 8 | Click the "Create Outbound Deliveries" application from the search results | — | "Create Outbound Deliveries" application opens |
| 9 | In the "Sales Order" field, enter the Sales Order Number | `{TD.salesOrderNumber}` | Sales Order Number is entered |
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; header details are auto-populated |
| 11 | Leave the "Shipping Point" field empty (do not enter any value) | `{TD.emptyShippingPoint}` | Shipping Point field remains empty |
| 12 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 13 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 14 | In the line items section, in the "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description, HS code, country of origin, and unit of measure are auto-populated |
| 16 | In the "Batch" field for the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 17 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA document reference is auto-populated |
| 18 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 20 | Click the "Save" button to attempt to save the delivery | — | SAP validates mandatory fields; system detects that Shipping Point field is missing |
| 21 | Observe the error message displayed by the system | — | An error message is displayed: "Shipping Point is missing" or "Enter a shipping point"; the Shipping Point field is highlighted or flagged as mandatory |
| 22 | Verify that the delivery is not saved and no Outbound Delivery Number is generated | — | Delivery creation is blocked; no Outbound Delivery Number is displayed; the form remains in edit mode |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Shipping Point field is missing (mandatory field)
- An error message is displayed: "Shipping Point is missing" or "Enter a shipping point"
- The Shipping Point field is highlighted or flagged as mandatory
- Delivery creation is blocked; no Outbound Delivery Number is generated
- The user remains on the delivery creation screen with the error message visible

---

### Post-conditions

- No Outbound Delivery document is created in SAP
- No data is persisted in the delivery tables (LIKP, LIPS)
- Sales Order status remains unchanged
- No application-level errors or critical warnings remain outstanding after canceling the transaction

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
