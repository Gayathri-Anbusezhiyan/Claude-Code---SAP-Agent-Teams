# TC-CS-125: Create Export Delivery with All Master Data Complete and Generate Export Documentation Package Successfully

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product (FERT), is batch-managed, and has HS code `{TD.hsCode}` and country of origin `{TD.countryOfOrigin}` maintained at plant level (MARC-STAWN, MARC-HERKL) |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient available stock, and has an associated Certificate of Analysis (CoA) document attached in QM or DMS (QAMB → DRAW → TOA01) |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Master Data | Export license `{TD.exportLicenseNumber}` exists in master data (EIPA) for the material-destination combination, with validity date `{TD.exportLicenseValidity}` (date is today or future) |
| P8 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country `{TD.destinationCountry}` in output control (NAST condition records) |
| P9 | Configuration | DMS ArchiveLink interface is configured and active for document archival (TOA01 content repository) |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order with delivery due — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished pharmaceutical product with batch management and export data — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
| Unit of Measure | `{TD.uom}` | Unit of measure — auto-populated from material master | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point — entered or auto-defaulted | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date (today or future) — entered by the user | Valid |
| Ship-To Party | `{TD.shipToParty}` | Customer receiving the goods — auto-populated from sales order | Valid |
| Destination Country | `{TD.destinationCountry}` | Country of destination — auto-populated from customer master | Valid |
| HS Code | `{TD.hsCode}` | Harmonized System Code — auto-populated from material master | Valid |
| Country of Origin | `{TD.countryOfOrigin}` | Country of origin — auto-populated from material master | Valid |
| Export License Number | `{TD.exportLicenseNumber}` | License number — auto-populated from export license master | Valid |
| Export License Validity | `{TD.exportLicenseValidity}` | License validity date (today or future) — auto-populated from export license master | Valid |
| CoA Document Number | `{TD.coaReference}` | Certificate of Analysis document reference — auto-populated from QM/DMS | Valid |

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
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; Ship-To Party `{TD.shipToParty}` and Destination Country `{TD.destinationCountry}` are auto-populated in the header |
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated and confirmed |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | In the line items section, in the "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS Code `{TD.hsCode}` and Country of Origin `{TD.countryOfOrigin}` are auto-populated; unit of measure `{TD.uom}` is displayed |
| 17 | In the "Batch" field for the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA document reference `{TD.coaReference}` is auto-populated or referenced in the batch details |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item details are complete |
| 21 | Verify that Export License Number and Validity Date are displayed or flagged in the header or export control section | `{TD.exportLicenseNumber}`, `{TD.exportLicenseValidity}` | Export license details are visible; validity date is today or future (valid status) |
| 22 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number |
| 23 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 24 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP initiates export documentation generation process |
| 25 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents (commercial invoice, packing list) have been generated; the message lists the generated document types |
| 26 | Verify that the Certificate of Analysis reference is included in the generated export documents | `{TD.coaReference}` | CoA document reference appears in the export documentation output or is listed as an attached/referenced document |
| 27 | Verify that all mandatory export document types are generated (commercial invoice, packing list) | — | Commercial Invoice Number `{TD.commercialInvoiceNumber}` and Packing List Number `{TD.packingListNumber}` are displayed or confirmed in output log |
| 28 | Verify that an archive link has been created for the generated export documents | — | Archive link reference or DMS archive confirmation is visible (TOA01 archive object ID) |
| 29 | Click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP initiates the goods issue posting process |
| 30 | Observe the PGI confirmation message | — | A success message is displayed confirming goods issue has been posted; a Material Document Number is generated |
| 31 | Note the Material Document Number (PGI document) from the success message | — | Material Document Number is displayed (10-digit number beginning with 49, format MKPF-MBLNR) |
| 32 | Navigate back to the delivery list or delivery document display | — | Delivery list or delivery document detail is displayed |
| 33 | Search for the created delivery using the Outbound Delivery Number noted in step 23 | — | The created delivery appears in the list with status updated to "Goods Issued" or equivalent |
| 34 | Click the Outbound Delivery Number to open the delivery document | — | Delivery document detail screen opens |
| 35 | Navigate to the "Output" or "Documents" tab to verify archived export documents are retrievable | — | Export documentation package (commercial invoice, packing list, CoA reference) is accessible via Archive Link; documents can be viewed or downloaded |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Outbound Delivery Number (10-digit, begins with 80) is generated and displayed
- All required export documentation types (commercial invoice, packing list) are successfully generated
- Certificate of Analysis reference `{TD.coaReference}` is included in or attached to the export documentation package
- HS Code `{TD.hsCode}` and Country of Origin `{TD.countryOfOrigin}` are correctly reflected in the generated export documents
- Export license `{TD.exportLicenseNumber}` with validity date `{TD.exportLicenseValidity}` is validated as valid; no blocking occurs
- Post Goods Issue (PGI) completes successfully; a Material Document Number (10-digit, begins with 49) is generated
- All generated export documents are archived and retrievable against the delivery document via Archive Link (DMS reference TOA01-ARC_DOC_ID)
- Delivery status is updated to "Goods Issued" or equivalent after PGI

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status is "Goods Issued" (LIKP-WBSTK)
- Material Document (PGI) exists with the generated material document number (MKPF-MBLNR)
- Export documentation package (commercial invoice, packing list, CoA reference) is generated and archived in DMS
- Archive Link object exists in TOA01 for the delivery document, linking to the archived export documents
- Batch stock is reduced by the delivered quantity; goods movement is recorded
- Sales Order line item delivery status is updated (fully or partially delivered)
- No application-level errors or critical warnings remain outstanding

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
