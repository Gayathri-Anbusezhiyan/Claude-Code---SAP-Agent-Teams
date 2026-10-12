# TC-CS-142: Create Export Delivery with Maximum Number of Line Items (Boundary Upper)

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and contains maximum number of line items (999 or system-configured maximum) referencing an international customer |
| P4 | Master Data | All materials referenced in the sales order line items exist as finished pharmaceutical products, are batch-managed, and have HS code and country of origin maintained at plant level |
| P5 | Master Data | All batches referenced exist for their respective materials, have sufficient available stock, and have associated Certificate of Analysis (CoA) documents attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Master Data | Export licenses exist in master data (EIPA) for all material-destination combinations, with valid future validity dates |
| P8 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P9 | Configuration | DMS ArchiveLink interface is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-EDGE-04`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order with maximum line items (999) — entered by the user | Valid |
| Number of Line Items | `{TD.maxLineItems}` | Maximum number of line items (999 or system-configured maximum) | Valid (boundary upper) |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point | Valid |
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
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; header details are auto-populated; maximum number of line items (999) are loaded into the delivery |
| 11 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is validated and confirmed |
| 13 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 14 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is confirmed |
| 15 | Verify that all line items (maximum number = 999) are displayed in the line items section | `{TD.maxLineItems}` | All 999 line items are visible; each line item displays Material Number, Batch Number, Delivery Quantity, HS Code, and Country of Origin |
| 16 | Verify that each line item has a valid Batch Number associated with a Certificate of Analysis (CoA) document | — | All batches are validated; CoA document references are auto-populated for all line items |
| 17 | Verify that Export License details are displayed or validated for all line items requiring export licenses | — | Export license details are visible or flagged for all applicable line items; validity dates are future (valid status) |
| 18 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number; all 999 line items are saved without truncation or data loss |
| 19 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 20 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP initiates export documentation generation process for all line items |
| 21 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents (commercial invoice, packing list) have been generated; the message lists the generated document types |
| 22 | Verify that all Certificate of Analysis references (for all 999 line items) are included in the generated export documents | — | All CoA document references appear in the export documentation output without truncation or omission |
| 23 | Verify that the consolidated export documents (commercial invoice, packing list) include all 999 line items without truncation | `{TD.maxLineItems}` | Export documents display all 999 line items with Material Number, Batch Number, Quantity, HS Code, Country of Origin, and CoA reference; no data is truncated or missing |
| 24 | Click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP initiates the goods issue posting process for all line items |
| 25 | Observe the PGI confirmation message | — | A success message is displayed confirming goods issue has been posted for all line items; a Material Document Number is generated |
| 26 | Note the Material Document Number (PGI document) from the success message | — | Material Document Number is displayed (10-digit number beginning with 49) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Maximum number of line items (999 or system-configured maximum) is accepted and processed by SAP without error (boundary upper)
- Outbound Delivery is created successfully with all 999 line items; Outbound Delivery Number is generated
- Export documentation (commercial invoice, packing list) is generated successfully with all 999 line items included without truncation
- All Certificate of Analysis references (for all 999 line items) are included in the export documentation output
- Post Goods Issue (PGI) completes successfully for all line items; Material Document Number is generated
- Consolidated export documents display all line item details correctly without data loss

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number and all 999 line items
- Delivery status is "Goods Issued"
- Material Document (PGI) exists with the generated material document number
- Export documentation package is generated and archived in DMS with all 999 line items included
- Batch stock is reduced for all 999 line items; goods movements are recorded correctly
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
