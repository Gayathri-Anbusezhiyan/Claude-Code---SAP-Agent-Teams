# TC-CS-141: Create Export Delivery with Minimum Quantity Delivery (Boundary Lower)

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product, is batch-managed, and has HS code and country of origin maintained at plant level |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient available stock (at least minimum quantity), and has an associated Certificate of Analysis (CoA) document attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Master Data | Export license `{TD.exportLicenseNumber}` exists in master data (EIPA) for the material-destination combination, with valid future validity date |
| P8 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P9 | Configuration | DMS ArchiveLink interface is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-EDGE-03`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Batch-managed pharma material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.minQuantity}` | Minimum valid delivery quantity (e.g., 0.001 or 1 depending on UoM precision) — entered by the user | Valid (boundary lower) |
| Unit of Measure | `{TD.uom}` | Unit of measure — auto-populated from material master | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date | Valid |
| Export License Number | `{TD.exportLicenseNumber}` | License number — auto-populated from export license master | Valid |
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
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; header details are auto-populated |
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated and confirmed |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | In the line items section, in the "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code, country of origin, and unit of measure are auto-populated |
| 17 | In the "Batch" field for the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA document reference is auto-populated |
| 19 | In the "Delivery Quantity" field, enter the minimum valid quantity | `{TD.minQuantity}` | Minimum delivery quantity is entered (e.g., 0.001 or 1 depending on UoM precision) |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; SAP accepts the minimum valid quantity without error |
| 21 | Verify that Export License Number and Validity Date are displayed in the header or export control section | `{TD.exportLicenseNumber}`, `{TD.exportLicenseValidity}` | Export license details are visible; validity date is future (valid status) |
| 22 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number |
| 23 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 24 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP initiates export documentation generation process |
| 25 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents have been generated; the message lists the generated document types |
| 26 | Verify that the Certificate of Analysis reference is included in the generated export documents | `{TD.coaReference}` | CoA document reference appears in the export documentation output |
| 27 | Verify that the minimum delivery quantity is correctly reflected in the generated export documents with decimal precision (if applicable) | `{TD.minQuantity}` | Export documents display the minimum quantity with correct decimal precision (e.g., 0.001 KG) |
| 28 | Click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP initiates the goods issue posting process |
| 29 | Observe the PGI confirmation message | — | A success message is displayed confirming goods issue has been posted; a Material Document Number is generated |
| 30 | Note the Material Document Number (PGI document) from the success message | — | Material Document Number is displayed (10-digit number beginning with 49) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Minimum valid delivery quantity is accepted by SAP without error (boundary lower: 0.001 or 1 depending on UoM precision)
- Outbound Delivery is created successfully; Outbound Delivery Number is generated
- Export documentation (commercial invoice, packing list, CoA reference) is generated successfully
- Minimum quantity is correctly displayed in the export documents with decimal precision if applicable
- Post Goods Issue (PGI) completes successfully; Material Document Number is generated
- Batch stock is reduced by the minimum delivered quantity; goods movement is recorded correctly

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status is "Goods Issued"
- Material Document (PGI) exists with the generated material document number
- Export documentation package is generated and archived in DMS with minimum quantity displayed correctly
- Batch stock is reduced by the minimum delivered quantity
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
