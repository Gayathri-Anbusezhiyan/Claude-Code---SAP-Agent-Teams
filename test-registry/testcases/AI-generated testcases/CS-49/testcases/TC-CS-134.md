# TC-CS-134: Attempt PGI When Mandatory Export Document Type Is Configured But Generation Failed

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
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and references an international customer |
| P4 | Master Data | Material `{TD.materialNumber}` exists as a finished pharmaceutical product, is batch-managed, and has HS code and country of origin maintained |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}`, has sufficient stock, and has CoA attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists and is export-enabled |
| P7 | Configuration (TEST SCENARIO) | Multiple mandatory export document types are configured for the destination country (e.g., commercial invoice, packing list, certificate of origin); export documentation generation is attempted but ONE or MORE mandatory document types FAIL to generate (due to missing data, configuration issue, or system error) |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-NEG-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished pharmaceutical product — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with CoA — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Shipping point — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Delivery date — entered by the user | Valid |
| Failed Document Type | `{TD.failedDocType}` | Document type that failed generation (e.g., "Certificate of Origin") — referenced in error message | Invalid (generation failed) |

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
| 15 | In the line item "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code and country of origin are auto-populated |
| 17 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA reference is auto-populated |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Click the "Save" button to save the delivery | — | SAP saves the delivery; Outbound Delivery Number is generated |
| 22 | Note the Outbound Delivery Number from the success message | — | Delivery Number is noted |
| 23 | Click the "Generate Export Documentation" button or action | — | SAP attempts to generate all mandatory export document types |
| 24 | Observe the export documentation generation response | — | SAP displays a warning or error message indicating that one or more mandatory document types failed to generate; the message lists the failed document type(s), e.g., "Certificate of Origin generation failed" or "Output condition ZEXP failed" |
| 25 | Verify that some documents may be generated (e.g., commercial invoice, packing list) but at least one mandatory document type is missing | `{TD.failedDocType}` | Document output log shows partial success (some documents generated) but indicates failure for document type `{TD.failedDocType}` |
| 26 | Attempt to click the "Post Goods Issue" (PGI) button | — | SAP blocks the PGI action |
| 27 | Observe the PGI blocking message | — | SAP displays an error message stating that goods issue is blocked because not all mandatory export document types have been successfully generated; error message lists the missing or failed document type(s) (e.g., `{TD.failedDocType}`) and states "Export documentation incomplete — document generation failed" or "Mandatory document type missing" |
| 28 | Verify that no Material Document Number is generated | — | No PGI document is created; delivery status remains "Not Goods Issued" or "Blocked for PGI" |
| 29 | Verify that the delivery document shows a blocking status for export documentation | — | Delivery status indicator shows "Export Documentation Incomplete" or "Document Generation Error" |
| 30 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation succeeds (Outbound Delivery Number is generated)
- Export documentation generation is attempted but FAILS for one or more mandatory document types
- SAP displays an error or warning message listing the failed document type(s) (e.g., `{TD.failedDocType}`)
- Post Goods Issue (PGI) is BLOCKED by SAP
- SAP displays a blocking error message stating that PGI cannot be performed because not all mandatory export document types were successfully generated
- Error message specifically identifies which document type(s) failed
- No Material Document Number is generated
- Delivery status remains "Not Goods Issued" or "Blocked for Export Documentation"

---

### Post-conditions

- Outbound Delivery document exists in SAP but is blocked for PGI
- Delivery status is NOT "Goods Issued"
- No Material Document (PGI) exists
- Some export documents may be generated, but at least one mandatory document type is missing
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
