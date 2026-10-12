# TC-CS-126: Create Multi-Line Export Delivery with Multiple Materials and Batches and Verify Consolidated Export Documentation with All CoA References

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, contains multiple line items, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber1}` exists as a finished pharmaceutical product, is batch-managed, and has HS code `{TD.hsCode1}` and country of origin `{TD.countryOfOrigin1}` maintained at plant level |
| P5 | Master Data | Material `{TD.materialNumber2}` exists as a finished pharmaceutical product, is batch-managed, and has HS code `{TD.hsCode2}` and country of origin `{TD.countryOfOrigin2}` maintained at plant level |
| P6 | Master Data | Batch `{TD.batchNumber1}` exists for material `{TD.materialNumber1}`, has sufficient stock, and has an associated CoA document `{TD.coaReference1}` attached in QM or DMS |
| P7 | Master Data | Batch `{TD.batchNumber2}` exists for material `{TD.materialNumber2}`, has sufficient stock, and has an associated CoA document `{TD.coaReference2}` attached in QM or DMS |
| P8 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P9 | Master Data | Export license (if required) exists and is valid for both materials and destination country |
| P10 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control |
| P11 | Configuration | DMS ArchiveLink interface is configured and active for document archival |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order with multiple line items — entered by the user | Valid |
| Material Number (Line 1) | `{TD.materialNumber1}` | First finished pharmaceutical product — entered by the user | Valid |
| Material Number (Line 2) | `{TD.materialNumber2}` | Second finished pharmaceutical product — entered by the user | Valid |
| Batch Number (Line 1) | `{TD.batchNumber1}` | Batch for first material with CoA — entered by the user | Valid |
| Batch Number (Line 2) | `{TD.batchNumber2}` | Batch for second material with CoA — entered by the user | Valid |
| Delivery Quantity (Line 1) | `{TD.quantity1}` | Quantity for first line item — entered by the user | Valid |
| Delivery Quantity (Line 2) | `{TD.quantity2}` | Quantity for second line item — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date — entered by the user | Valid |
| HS Code (Line 1) | `{TD.hsCode1}` | HS code for first material — auto-populated | Valid |
| HS Code (Line 2) | `{TD.hsCode2}` | HS code for second material — auto-populated | Valid |
| Country of Origin (Line 1) | `{TD.countryOfOrigin1}` | Origin for first material — auto-populated | Valid |
| Country of Origin (Line 2) | `{TD.countryOfOrigin2}` | Origin for second material — auto-populated | Valid |
| CoA Reference (Line 1) | `{TD.coaReference1}` | CoA document for first batch — auto-populated | Valid |
| CoA Reference (Line 2) | `{TD.coaReference2}` | CoA document for second batch — auto-populated | Valid |

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
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; header fields are auto-populated; multiple line items are displayed for delivery creation |
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | In the first line item, in the "Material" field, enter the first Material Number | `{TD.materialNumber1}` | First Material Number is entered |
| 16 | Press Enter to confirm the first Material entry | — | SAP validates the material; HS Code `{TD.hsCode1}` and Country of Origin `{TD.countryOfOrigin1}` are auto-populated |
| 17 | In the "Batch" field for the first line item, enter the first Batch Number | `{TD.batchNumber1}` | First Batch Number is entered |
| 18 | Press Enter to confirm the first Batch entry | — | SAP validates the batch; CoA reference `{TD.coaReference1}` is auto-populated or linked |
| 19 | In the "Delivery Quantity" field for the first line item, enter the first quantity | `{TD.quantity1}` | First Delivery Quantity is entered |
| 20 | Press Enter to confirm the first quantity entry | — | First line item details are complete |
| 21 | In the second line item, in the "Material" field, enter the second Material Number | `{TD.materialNumber2}` | Second Material Number is entered |
| 22 | Press Enter to confirm the second Material entry | — | SAP validates the material; HS Code `{TD.hsCode2}` and Country of Origin `{TD.countryOfOrigin2}` are auto-populated |
| 23 | In the "Batch" field for the second line item, enter the second Batch Number | `{TD.batchNumber2}` | Second Batch Number is entered |
| 24 | Press Enter to confirm the second Batch entry | — | SAP validates the batch; CoA reference `{TD.coaReference2}` is auto-populated or linked |
| 25 | In the "Delivery Quantity" field for the second line item, enter the second quantity | `{TD.quantity2}` | Second Delivery Quantity is entered |
| 26 | Press Enter to confirm the second quantity entry | — | Second line item details are complete |
| 27 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number |
| 28 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed |
| 29 | Click the "Generate Export Documentation" button or action | — | SAP initiates export documentation generation for the multi-line delivery |
| 30 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents have been generated; all document types (commercial invoice, packing list) are listed |
| 31 | Verify that both Certificate of Analysis references are included in the generated export documents | `{TD.coaReference1}`, `{TD.coaReference2}` | Both CoA document references appear in the export documentation output; consolidated export documents reference all batches |
| 32 | Verify that HS codes and countries of origin for both materials are reflected in the export documents | `{TD.hsCode1}`, `{TD.hsCode2}`, `{TD.countryOfOrigin1}`, `{TD.countryOfOrigin2}` | Export documents (commercial invoice, packing list) display correct HS codes and origin data for each line item |
| 33 | Verify that an archive link has been created for the consolidated export documents | — | Archive link reference or DMS archive confirmation is visible |
| 34 | Click the "Post Goods Issue" (PGI) button | — | SAP initiates PGI process |
| 35 | Observe the PGI confirmation message | — | A success message confirms goods issue has been posted; Material Document Number is generated |
| 36 | Note the Material Document Number from the success message | — | Material Document Number is displayed |
| 37 | Navigate to the delivery document display | — | Delivery document detail screen opens |
| 38 | Navigate to the "Output" or "Documents" tab | — | Export documentation package is accessible; documents can be viewed |
| 39 | Verify that all CoA references for all line items are retrievable from the archived export documents | `{TD.coaReference1}`, `{TD.coaReference2}` | All CoA references are present in the archived export documentation; no CoA is missing or truncated |
| 40 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 41 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 42 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Outbound Delivery Number is generated for the multi-line delivery
- Export documentation (commercial invoice, packing list) is generated successfully as a consolidated package for all line items
- Both Certificate of Analysis references (`{TD.coaReference1}` and `{TD.coaReference2}`) are included in the export documentation
- HS codes (`{TD.hsCode1}`, `{TD.hsCode2}`) and countries of origin (`{TD.countryOfOrigin1}`, `{TD.countryOfOrigin2}`) for both materials are correctly reflected in the export documents
- Post Goods Issue completes successfully; Material Document Number is generated
- All generated export documents are archived and retrievable against the delivery
- No CoA references are missing or truncated in the consolidated export documentation

---

### Post-conditions

- Outbound Delivery document exists with multiple line items
- Delivery status is "Goods Issued"
- Material Document (PGI) exists with goods movements recorded for both line items
- Export documentation package is archived in DMS with all CoA references included
- Archive Link object exists for the delivery, linking to the consolidated export documents
- Batch stock is reduced for both batches by the delivered quantities
- Sales Order line items are updated to delivered status

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
