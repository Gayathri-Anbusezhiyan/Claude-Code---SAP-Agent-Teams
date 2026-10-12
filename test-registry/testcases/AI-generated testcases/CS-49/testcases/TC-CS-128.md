# TC-CS-128: Attempt Export Delivery Creation and Documentation Generation When Batch Has No Certificate of Analysis Attached

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
| P5 | Master Data | Batch `{TD.batchNumberNoCoA}` exists for material `{TD.materialNumber}` and has sufficient stock |
| P6 | Master Data (NEGATIVE) | Batch `{TD.batchNumberNoCoA}` does NOT have a Certificate of Analysis (CoA) document attached in QM or DMS — CoA is missing or not generated |
| P7 | Master Data | Shipping Point `{TD.shippingPoint}` exists and is export-enabled |
| P8 | Configuration | Export documentation types are configured for the destination country |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished pharmaceutical product — entered by the user | Valid |
| Batch Number (No CoA) | `{TD.batchNumberNoCoA}` | Batch WITHOUT CoA attached — entered by the user | Invalid (missing CoA) |
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
| 15 | In the line item "Material" field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code and country of origin are auto-populated |
| 17 | In the "Batch" field, enter the Batch Number that has no CoA attached | `{TD.batchNumberNoCoA}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch is confirmed but NO CoA reference is auto-populated (field is blank or indicates CoA is missing) |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Click the "Save" button to save the delivery | — | SAP saves the delivery; Outbound Delivery Number is generated (delivery creation may succeed) |
| 22 | Note the Outbound Delivery Number from the success message (if displayed) | — | Delivery Number is noted (or delivery save may fail with error) |
| 23 | Click the "Generate Export Documentation" button or action | — | SAP attempts to generate export documentation |
| 24 | Observe the system response | — | SAP displays an error message indicating that the Certificate of Analysis is missing for batch `{TD.batchNumberNoCoA}` and export documentation cannot be generated; error message references the batch number and states "CoA missing" or equivalent |
| 25 | Verify that export documentation generation has failed | — | No commercial invoice or packing list is generated; document output log shows error status |
| 26 | Attempt to click the "Post Goods Issue" (PGI) button | — | SAP blocks the PGI action |
| 27 | Observe the PGI blocking message | — | SAP displays an error message stating that goods issue is blocked because mandatory export documentation is incomplete or missing CoA; PGI is not allowed; error message references the CoA requirement |
| 28 | Verify that no Material Document Number is generated | — | No PGI document is created; delivery status remains "Not Goods Issued" or "Blocked for PGI" |
| 29 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation may succeed initially (Outbound Delivery Number is generated)
- Export documentation generation FAILS with an error message indicating that the Certificate of Analysis is missing for batch `{TD.batchNumberNoCoA}`
- Error message is specific and references the batch number and CoA requirement
- Post Goods Issue (PGI) is BLOCKED by SAP
- SAP displays a blocking error message stating that PGI cannot be performed until all mandatory export documents (including CoA reference) are complete
- No Material Document Number is generated
- Delivery status remains "Not Goods Issued" or "Blocked for Export Documentation"

---

### Post-conditions

- Outbound Delivery document may exist in SAP but is in a blocked or incomplete state
- Delivery status is NOT "Goods Issued"
- No Material Document (PGI) exists
- No export documentation is generated or archived
- Batch stock is NOT reduced (no goods movement recorded)
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
