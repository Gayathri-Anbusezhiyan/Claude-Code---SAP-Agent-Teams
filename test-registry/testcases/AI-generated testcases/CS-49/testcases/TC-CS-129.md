# TC-CS-129: Attempt Export Documentation Generation When Material Master Is Missing HS Code

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
| P4 | Master Data (NEGATIVE) | Material `{TD.materialNoHSCode}` exists as a finished pharmaceutical product, is batch-managed, and has country of origin maintained, but HS code (MARC-STAWN) is BLANK at plant level |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNoHSCode}`, has sufficient stock, and has CoA attached |
| P6 | Master Data | Shipping Point `{TD.shippingPoint}` exists and is export-enabled |
| P7 | Configuration | Export documentation types are configured for the destination country |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | International sales order — entered by the user | Valid |
| Material Number (No HS Code) | `{TD.materialNoHSCode}` | Material WITHOUT HS code maintained — entered by the user | Invalid (missing HS code) |
| Batch Number | `{TD.batchNumber}` | Batch with CoA — entered by the user | Valid |
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
| 15 | In the line item "Material" field, enter the Material Number that has no HS code | `{TD.materialNoHSCode}` | Material Number is entered |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; HS code field is BLANK or shows no value; country of origin may be populated |
| 17 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered |
| 18 | Press Enter to confirm the Batch entry | — | SAP validates the batch; CoA reference is auto-populated |
| 19 | In the "Delivery Quantity" field, enter the quantity | `{TD.quantity}` | Delivery Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Click the "Save" button to save the delivery | — | SAP saves the delivery; Outbound Delivery Number is generated (delivery creation may succeed) |
| 22 | Note the Outbound Delivery Number from the success message | — | Delivery Number is noted |
| 23 | Click the "Generate Export Documentation" button or action | — | SAP attempts to generate export documentation |
| 24 | Observe the system response | — | SAP displays an error message indicating that the HS code is missing for material `{TD.materialNoHSCode}` and export documentation cannot be generated; error message references the material number and states "HS code missing" or "Harmonized System Code required" |
| 25 | Verify that export documentation generation has failed | — | No commercial invoice or packing list is generated; document output log shows error status |
| 26 | Attempt to click the "Post Goods Issue" (PGI) button | — | SAP blocks the PGI action |
| 27 | Observe the PGI blocking message | — | SAP displays an error message stating that goods issue is blocked because mandatory export data (HS code) is incomplete; PGI is not allowed |
| 28 | Verify that no Material Document Number is generated | — | No PGI document is created; delivery status remains "Not Goods Issued" or "Blocked for PGI" |
| 29 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation may succeed initially (Outbound Delivery Number is generated)
- Export documentation generation FAILS with an error message indicating that the HS code is missing for material `{TD.materialNoHSCode}`
- Error message is specific and references the material number and HS code requirement
- Post Goods Issue (PGI) is BLOCKED by SAP
- SAP displays a blocking error message stating that PGI cannot be performed until mandatory export data (HS code) is maintained in the material master
- No Material Document Number is generated
- Delivery status remains "Not Goods Issued" or "Blocked for Export Documentation"

---

### Post-conditions

- Outbound Delivery document exists in SAP but is in a blocked or incomplete state
- Delivery status is NOT "Goods Issued"
- No Material Document (PGI) exists
- No export documentation is generated or archived
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
