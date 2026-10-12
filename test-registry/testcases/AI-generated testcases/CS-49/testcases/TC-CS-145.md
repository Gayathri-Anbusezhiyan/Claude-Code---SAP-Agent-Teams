# TC-CS-145: Attempt Export Documentation Generation when Material Master Plant Export Data is Missing

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product (FERT) at the general material master level (MARA) but plant-specific export data is missing: MARC-STAWN (HS code) and MARC-HERKL (country of origin) are blank at plant level `{TD.plant}` — this is the integration data gap condition being tested |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient available stock, and has an associated Certificate of Analysis (CoA) document attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P8 | Configuration | DMS ArchiveLink interface is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-INT-03`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNoPlantExportData}` | Material exists in MARA but plant-level export data (MARC-STAWN, MARC-HERKL) is missing — entered by the user | Valid (missing export data) |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date | Valid |
| Plant | `{TD.plant}` | Plant code where material master export data is missing | Valid |

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
| 15 | In the line items section, in the "Material" field, enter the Material Number (with missing plant export data) | `{TD.materialNoPlantExportData}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated; HS Code and Country of Origin fields remain blank or show "N/A" (missing data) |
| 17 | Verify that HS Code and Country of Origin fields are blank or missing in the line item | — | HS Code field is blank or shows "N/A"; Country of Origin field is blank or shows "N/A"; system detects missing plant-level export data |
| 18 | In the "Batch" field for the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 19 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA document reference is auto-populated |
| 20 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 21 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 22 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number; delivery creation is allowed despite missing export data (warning may be displayed) |
| 23 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 24 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP attempts to initiate export documentation generation process |
| 25 | Observe the error message displayed by the system | — | An error message is displayed: "HS code is missing for material [material number] at plant [plant code]" or "Country of origin is missing for material [material number] at plant [plant code]"; export documentation generation fails |
| 26 | Verify that export documentation generation fails due to missing plant-level export data | — | Export documentation generation fails; commercial invoice or packing list is not generated, or generation is incomplete |
| 27 | Attempt to click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP attempts to initiate the goods issue posting process |
| 28 | Observe the error message displayed by the system | — | An error message is displayed: "Post Goods Issue cannot be completed: mandatory export documents are missing" or "HS code and country of origin are required for PGI"; PGI is blocked |
| 29 | Verify that Post Goods Issue is blocked and no Material Document Number is generated | — | PGI is blocked; no Material Document Number is generated; delivery status remains as "In Process" or equivalent (not "Goods Issued") |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation is allowed despite missing plant-level export data (warning may be displayed)
- Export documentation generation fails due to missing HS code (MARC-STAWN) and country of origin (MARC-HERKL) at plant level
- An error message is displayed: "HS code is missing for material [material number] at plant [plant code]" or "Country of origin is missing for material [material number] at plant [plant code]"
- Export documents (commercial invoice, packing list) are not generated or are incomplete
- Post Goods Issue (PGI) is blocked with error message: "Post Goods Issue cannot be completed: mandatory export documents are missing" or "HS code and country of origin are required for PGI"
- No Material Document Number is generated; delivery status remains as "In Process" (not "Goods Issued")
- Integration dependency on MM material master plant-level export data (MARC) is confirmed as a blocking condition for export documentation and PGI

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status remains as "In Process" or "Created" (not "Goods Issued")
- Export documentation generation fails; no complete export documentation package is available
- Post Goods Issue (PGI) is blocked; no Material Document is created
- Batch stock is not reduced; no goods movement is recorded
- Sales Order line item delivery status remains as "Open" or "In Process"
- Error messages regarding missing plant-level export data (HS code, country of origin) are logged in the system

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
