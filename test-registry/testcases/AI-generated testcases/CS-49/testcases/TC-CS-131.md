# TC-CS-131: Attempt Export Delivery and PGI When Export License Is Required But Missing in Master Data

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer requiring export license |
| P4 | Master Data | Material `{TD.materialRequiresLicense}` exists as a finished pharmaceutical product, is batch-managed, has HS code and country of origin maintained, and has export control classification (MEAN-EXTWG) indicating that an export license is required for the destination country |
| P5 | Master Data (NEGATIVE) | Export license record in master data (EIPA) is MISSING for the material-destination combination — no license number exists |
| P6 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialRequiresLicense}`, has sufficient stock, and has CoA attached |
| P7 | Master Data | Shipping Point `{TD.shippingPoint}` exists and is export-enabled |
| P8 | Configuration | Export documentation types are configured for the destination country |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order requiring export license — entered by the user | Valid |
| Material Number (Requires License) | `{TD.materialRequiresLicense}` | Material requiring export license but license is MISSING — entered by the user | Invalid (missing license) |
| Batch Number | `{TD.batchNumber}` | Batch with CoA — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Shipping point — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Delivery date — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Delivery" | — | Search results appear listing the "Create Outbound Deliveries" application |
| 8 | Click the "Create Outbound Deliveries" application from the search results | — | "Create Outbound Deliveries" application opens |
| 9 | In the "Sales Order" field, enter the Sales Order Number | `{TD.salesOrderNumber}` | Sales Order Number is entered |
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; header fields are auto-populated |
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | In the line item "Material" field, enter the Material Number that requires an export license | `{TD.materialRequiresLicense}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code and country of origin are auto-populated; SAP may display a warning or flag indicating that an export license is required |
| 17 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA reference is auto-populated |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Observe any export control warnings or messages | — | SAP displays a warning or status message indicating that the shipment requires an export license and the license is missing; export control flag is set |
| 22 | Click the "Save" button to save the delivery | — | SAP saves the delivery; Outbound Delivery Number is generated (delivery creation may succeed but with export control blocking flag) |
| 23 | Note the Outbound Delivery Number from the success message | — | Delivery Number is noted |
| 24 | Click the "Generate Export Documentation" button or action | — | SAP may generate export documentation (if configured to allow partial generation) or may fail with a warning |
| 25 | Attempt to click the "Post Goods Issue" (PGI) button | — | SAP blocks the PGI action |
| 26 | Observe the PGI blocking message | — | SAP displays an error message stating that goods issue is blocked because an export license is required for material `{TD.materialRequiresLicense}` and destination country, but the license is missing; error message references export control requirements and states "Export license missing" or "License required" |
| 27 | Verify that no Material Document Number is generated | — | No PGI document is created; delivery status remains "Not Goods Issued" or "Blocked for Export Control" |
| 28 | Verify that the delivery document shows an export control blocking status | — | Delivery header or status indicator shows "Export Block" or "License Missing" (LIKP-LIFSP export block flag) |
| 29 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation may succeed (Outbound Delivery Number is generated) but delivery is flagged for export control blocking
- SAP displays a warning or status message indicating that an export license is required but missing
- Post Goods Issue (PGI) is BLOCKED by SAP
- SAP displays a blocking error message stating that PGI cannot be performed because the required export license is missing for material `{TD.materialRequiresLicense}`
- Error message references export control requirements and export license master data (EIPA)
- No Material Document Number is generated
- Delivery status shows "Blocked for Export Control" or "Export License Missing" (LIKP-LIFSP export block flag is set)

---

### Post-conditions

- Outbound Delivery document exists in SAP but is blocked for export control
- Delivery status is NOT "Goods Issued"
- Export control blocking flag is set (LIKP-LIFSP)
- No Material Document (PGI) exists
- Batch stock is NOT reduced
- Sales Order line item delivery status is NOT updated to delivered

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
