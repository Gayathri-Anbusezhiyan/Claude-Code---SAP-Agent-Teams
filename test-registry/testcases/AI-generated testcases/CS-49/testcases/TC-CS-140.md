# TC-CS-140: Create Export Delivery with Export License Expiring Tomorrow (Valid with Warning)

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries and generate export documentation (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer with destination country different from plant country |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product, is batch-managed, requires export license (MEAN-EXTWG is set), and has HS code and country of origin maintained |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient available stock, and has an associated Certificate of Analysis (CoA) document attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Master Data | Export license `{TD.exportLicenseNumber}` exists in master data (EIPA) for the material-destination combination, with validity date `{TD.exportLicenseExpiresTomorrow}` equal to tomorrow's date (boundary: still valid but expiring soon — system may issue a warning) |
| P8 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P9 | Configuration | DMS ArchiveLink interface is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-EDGE-02`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Pharma material requiring export license — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Export-enabled shipping point | Valid |
| Delivery Date | `{TD.deliveryDate}` | Planned delivery date | Valid |
| Export License Number | `{TD.exportLicenseNumber}` | License number — auto-populated from export license master | Valid |
| Export License Validity | `{TD.exportLicenseExpiresTomorrow}` | License validity date = tomorrow's date (boundary: valid but expiring soon) — auto-populated | Valid (boundary) |

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
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code, country of origin, and unit of measure are auto-populated; system detects that export license is required |
| 17 | In the "Batch" field for the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA document reference is auto-populated |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item details are complete |
| 21 | Verify that Export License Number and Validity Date are displayed in the header or export control section | `{TD.exportLicenseNumber}`, `{TD.exportLicenseExpiresTomorrow}` | Export license details are visible; validity date equals tomorrow's date (boundary: license expires tomorrow but is still valid today) |
| 22 | Observe if a warning message related to export license expiry is displayed | — | A warning message may be displayed: "Export license expires soon (tomorrow)" or "License validity is approaching expiry"; this is an informational warning, not a blocking error |
| 23 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number; the delivery is created despite the warning |
| 24 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 25 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP initiates export documentation generation process |
| 26 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents have been generated; the message lists the generated document types |
| 27 | Verify that the Certificate of Analysis reference is included in the generated export documents | — | CoA document reference appears in the export documentation output |
| 28 | Click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP initiates the goods issue posting process |
| 29 | Observe the PGI confirmation message | — | A success message is displayed confirming goods issue has been posted; a Material Document Number is generated; PGI is allowed despite the warning about expiring license |
| 30 | Note the Material Document Number (PGI document) from the success message | — | Material Document Number is displayed (10-digit number beginning with 49) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Export license with validity date equal to tomorrow's date is accepted as valid by SAP (boundary: license expires tomorrow = still valid today)
- A warning message may be displayed informing the user that the license is expiring soon, but this is informational only and does not block the transaction
- Outbound Delivery is created successfully; Outbound Delivery Number is generated
- Export documentation (commercial invoice, packing list, CoA reference) is generated successfully
- Post Goods Issue (PGI) completes successfully; Material Document Number is generated
- All export control validations pass; license expiry warning does not block the shipment

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status is "Goods Issued"
- Material Document (PGI) exists with the generated material document number
- Export documentation package is generated and archived in DMS
- Export license with validity date = tomorrow is treated as valid; shipment is not blocked
- A warning message about license expiry may be logged in the system (informational only)
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
