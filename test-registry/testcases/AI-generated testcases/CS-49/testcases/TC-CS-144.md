# TC-CS-144: Attempt Export Documentation Archival when DMS Archive Link Interface is Unavailable

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
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product, is batch-managed, and has HS code and country of origin maintained at plant level |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient available stock, and has an associated Certificate of Analysis (CoA) document attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists, is export-enabled, and is assigned to the plant |
| P7 | Master Data | Export license `{TD.exportLicenseNumber}` exists in master data (EIPA) for the material-destination combination, with valid future validity date |
| P8 | Configuration | Export documentation types (commercial invoice, packing list) are configured for the destination country in output control (NAST) |
| P9 | Configuration | DMS ArchiveLink interface (TOA01 content repository) is configured but is currently unavailable or down — this is the integration failure condition being tested |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-INT-02`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Batch-managed pharma material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA attached — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Numeric quantity to deliver — entered by the user | Valid |
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
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Click the "Save" button to save the delivery | — | SAP saves the delivery; a success message is displayed with the generated Outbound Delivery Number |
| 22 | Note the Outbound Delivery Number from the success message | — | Outbound Delivery Number is displayed (10-digit number beginning with 80) |
| 23 | Click the "Generate Export Documentation" button or action in the toolbar | — | SAP initiates export documentation generation process |
| 24 | Observe the on-screen confirmation or output notification | — | A success message confirms that export documents (commercial invoice, packing list) have been generated; the message lists the generated document types; CoA reference is included |
| 25 | Click the "Post Goods Issue" (PGI) button to complete the shipment | — | SAP initiates the goods issue posting process |
| 26 | Observe the PGI confirmation message | — | PGI may succeed (depending on configuration) or may fail with a warning about archival failure; a success message is displayed or a warning is shown: "Goods issue posted but document archival failed" |
| 27 | Note the Material Document Number (PGI document) from the success message (if PGI succeeded) | — | Material Document Number is displayed (10-digit number beginning with 49) if PGI succeeded; if PGI failed, no Material Document Number is generated |
| 28 | Navigate to the "Output" or "Documents" tab to attempt to retrieve archived export documents | — | Navigate to the delivery document detail screen and access the Output or Documents section |
| 29 | Attempt to access the archived export documents via Archive Link | — | An error message is displayed: "Archive link unavailable" or "Document archival failed: DMS interface connection error"; archived documents are not accessible or retrievable |
| 30 | Verify that the audit trail is incomplete due to missing archive link | — | Archive link reference (TOA01-ARC_DOC_ID) is missing or shows an error status; document archival has failed; audit compliance requirement is not met |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Outbound Delivery is created successfully; Outbound Delivery Number is generated
- Export documentation (commercial invoice, packing list, CoA reference) is generated successfully
- Post Goods Issue (PGI) may succeed or fail depending on system configuration regarding mandatory archival; if PGI succeeds, a warning message is displayed: "Goods issue posted but document archival failed"
- Document archival to DMS via ArchiveLink interface fails due to DMS interface unavailability
- An error message is displayed when attempting to retrieve archived documents: "Archive link unavailable" or "Document archival failed: DMS interface connection error"
- Archived export documents are not accessible or retrievable via Archive Link
- Audit trail is incomplete; archive link reference (TOA01-ARC_DOC_ID) is missing or shows error status
- Integration dependency on DMS ArchiveLink interface is confirmed as a critical risk for audit compliance

---

### Post-conditions

- Outbound Delivery document exists in SAP with the generated delivery number
- Delivery status is "Goods Issued" if PGI succeeded, or "In Process" if PGI was blocked by archival failure
- Material Document (PGI) may exist if PGI was allowed to proceed despite archival failure (configuration-dependent)
- Export documentation package is generated but NOT archived in DMS; documents are available in the SAP output log but not in the DMS archive repository
- Archive link reference (TOA01-ARC_DOC_ID) is missing or shows error status
- Audit compliance requirement is NOT met; documents cannot be retrieved for customs audit purposes
- Warning or error messages regarding DMS archival failure are logged in the system

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
