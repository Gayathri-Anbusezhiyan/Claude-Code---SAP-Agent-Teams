# TC-CS-143: Attempt Export Documentation Generation when QM Certificate of Analysis Generation is Pending

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product (FERT), is batch-managed, and has HS code and country of origin maintained at plant level |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and has sufficient available stock |
| P6 | Master Data | QM inspection lot exists for batch `{TD.batchNumber}` but Certificate of Analysis (CoA) document generation is pending in QM module (QAMB inspection lot exists but DRAW/TOA01 CoA document is not yet generated or released) — this is the integration failure condition being tested |
| P7 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P8 | Master Data | Export license `{TD.exportLicenseNumber}` exists in master data (EIPA) for the material-destination combination, with valid future validity date |
| P9 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P10 | Configuration | DMS ArchiveLink interface is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-INT-01`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Batch-managed pharma material — entered by the user | Valid |
| Batch Number | `{TD.batchNoPendingCoA}` | Batch with QM inspection lot but CoA document generation pending — entered by the user | Valid (CoA pending) |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date | Valid |
| Export License Number | `{TD.exportLicenseNumber}` | License number — auto-populated from export license master | Valid |

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
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated and confirmed |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | In the line items section, in the "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code, country of origin, and unit of measure are auto-populated |
| 17 | In the "Batch" field for the line item, enter the Batch Number (with pending CoA generation) | `{TD.batchNoPendingCoA}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; system detects that QM inspection lot exists but CoA document is not yet generated or released |
| 19 | Observe if a warning or informational message is displayed regarding the pending CoA | — | A warning message may be displayed: "Certificate of Analysis is pending for batch [batch number]" or "CoA document not yet released"; delivery creation may still be allowed |
| 20 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 21 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 22 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number; delivery creation is allowed despite pending CoA (system behavior depends on configuration) |
| 23 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 24 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP attempts to initiate export documentation generation process |
| 25 | Observe the error or warning message displayed by the system | — | An error or warning message is displayed: "Certificate of Analysis is missing or not yet released for batch [batch number]" or "Export documentation cannot be generated: CoA document not available" |
| 26 | Verify that export documentation generation fails or is incomplete | — | Export documentation generation fails or is marked as incomplete; commercial invoice or packing list may not be generated, or they are generated without the CoA reference included |
| 27 | Attempt to click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP attempts to initiate the goods issue posting process |
| 28 | Observe the error message displayed by the system | — | An error message is displayed: "Post Goods Issue cannot be completed: mandatory export documents are missing" or "Certificate of Analysis is required for PGI"; PGI is blocked |
| 29 | Verify that Post Goods Issue is blocked and no Material Document Number is generated | — | PGI is blocked; no Material Document Number is generated; delivery status remains as "In Process" or equivalent (not "Goods Issued") |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation is allowed despite pending CoA (system behavior depends on configuration; warning may be displayed)
- Export documentation generation fails or is incomplete due to missing or pending Certificate of Analysis document in QM module
- An error or warning message is displayed: "Certificate of Analysis is missing or not yet released for batch [batch number]"
- Export documents (commercial invoice, packing list) are either not generated or are generated without the CoA reference included
- Post Goods Issue (PGI) is blocked with error message: "Post Goods Issue cannot be completed: mandatory export documents are missing" or "Certificate of Analysis is required for PGI"
- No Material Document Number is generated; delivery status remains as "In Process" (not "Goods Issued")
- Integration dependency on QM module CoA generation is confirmed as a blocking condition for export documentation and PGI

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status remains as "In Process" or "Created" (not "Goods Issued")
- Export documentation generation fails or is incomplete; no complete export documentation package is available
- Post Goods Issue (PGI) is blocked; no Material Document is created
- Batch stock is not reduced; no goods movement is recorded
- Sales Order line item delivery status remains as "Open" or "In Process"
- Warning or error messages regarding missing CoA are logged in the system

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
