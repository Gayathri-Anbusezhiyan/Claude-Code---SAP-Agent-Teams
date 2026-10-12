# TC-CS-127: Retrieve Archived Export Documents After Goods Issue for Customs Audit Purposes

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to access outbound delivery documents and archived documents (V_LIKP_DSP, ArchiveLink read authorization) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing Delivery | Outbound Delivery `{TD.existingDeliveryNumber}` exists in SAP, has been goods-issued (status "Goods Issued"), and has associated export documentation generated |
| P4 | Archived Documents | Export documentation package (commercial invoice, packing list, CoA reference) for delivery `{TD.existingDeliveryNumber}` has been archived in DMS via ArchiveLink (TOA01 archive object exists) |
| P5 | Configuration | DMS ArchiveLink interface is configured and active; archived documents are accessible via SAP Fiori or transaction code |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Existing Delivery Number | `{TD.existingDeliveryNumber}` | Previously created outbound delivery with archived export docs — entered by the user for search | Valid |
| Archived CoA Reference | `{TD.coaReference}` | Certificate of Analysis document archived with the delivery — displayed in archived docs | Valid |
| Archived Commercial Invoice | `{TD.commercialInvoiceNumber}` | Commercial invoice number — displayed in archived docs | Valid |
| Archived Packing List | `{TD.packingListNumber}` | Packing list number — displayed in archived docs | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Outbound Deliveries" or "Display Outbound Delivery" | — | Search results appear listing the relevant application |
| 8 | Click the "Manage Outbound Deliveries" or "Display Outbound Delivery" application from the search results | — | Application opens; delivery list or delivery search screen is displayed |
| 9 | In the delivery search or filter field, enter the Existing Delivery Number | `{TD.existingDeliveryNumber}` | Delivery Number is entered in the search field |
| 10 | Press Enter or click the "Search" or "Go" button | — | SAP searches for the delivery; the delivery document appears in the results list with status "Goods Issued" or equivalent |
| 11 | Click the Delivery Number link to open the delivery document detail | — | Delivery document detail screen opens; header and line item data are displayed |
| 12 | Navigate to the "Output" or "Documents" or "Attachments" tab | — | The Output/Documents tab is displayed; a list of generated and archived documents is visible |
| 13 | Verify that the export documentation package is listed in the archived documents section | — | Export documentation types (commercial invoice, packing list) appear in the document list with archive status or links |
| 14 | Click the commercial invoice document link or icon to open or download the archived document | `{TD.commercialInvoiceNumber}` | Commercial invoice document opens in a viewer or downloads; document is readable and displays delivery details, HS codes, and origin data |
| 15 | Verify that the commercial invoice contains the Certificate of Analysis reference | `{TD.coaReference}` | CoA document reference `{TD.coaReference}` is visible in the commercial invoice content or as an attached reference |
| 16 | Click the packing list document link or icon to open or download the archived document | `{TD.packingListNumber}` | Packing list document opens or downloads; document is readable and displays line item details, quantities, batch numbers, and HS codes |
| 17 | Verify that the packing list contains the Certificate of Analysis reference | `{TD.coaReference}` | CoA document reference `{TD.coaReference}` is visible in the packing list content or as an attached reference |
| 18 | Verify that all archived export documents are accessible without errors | — | All documents open successfully; no DMS archival errors or "document not found" messages are displayed |
| 19 | Verify that the archive link object is correctly associated with the delivery document | — | Archive link metadata (TOA01 archive object ID or equivalent) is displayed or logged; no broken links exist |
| 20 | Close the document viewer or return to the delivery document detail screen | — | Document viewer closes; user returns to delivery detail screen |
| 21 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Existing Outbound Delivery `{TD.existingDeliveryNumber}` with status "Goods Issued" is successfully retrieved from SAP
- Export documentation package (commercial invoice `{TD.commercialInvoiceNumber}`, packing list `{TD.packingListNumber}`) is accessible via the delivery document's Output/Documents tab
- Commercial invoice and packing list documents are successfully opened or downloaded from the DMS archive
- Certificate of Analysis reference `{TD.coaReference}` is visible in both the commercial invoice and packing list
- All archived export documents are readable, complete, and contain correct delivery, HS code, country of origin, and batch data
- No DMS archival errors or broken archive links are encountered
- Archive link object (TOA01 reference) is correctly associated with the delivery document

---

### Post-conditions

- No changes to the delivery document or archived documents (read-only retrieval)
- Audit trail confirms user accessed the archived export documents (if audit logging is enabled)
- All archived documents remain intact and accessible for future customs audits

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
