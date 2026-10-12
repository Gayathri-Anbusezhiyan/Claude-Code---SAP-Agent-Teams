# TC-CS-021: Capture Serial Numbers for Outbound Delivery with Serialized Pharmaceutical Material

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and capture serialization data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` with expiry date `{TD.expiryDate}` (future date) |
| P5 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P6 | Transaction Data | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains serialized material `{TD.materialId}` |
| P7 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists for Sales Order `{TD.salesOrderNumber}` with status Open (not yet goods issued) |
| P8 | Configuration | EPCIS endpoint is configured for national traceability system integration |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number | `{TD.serialNumber}` | GS1-compliant serial number (GTIN + serial component) | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date | `{TD.expiryDate}` | Future expiry date for batch | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity (must match count of serial numbers) | Valid |
| Sales Order | `{TD.salesOrderNumber}` | Source sales order number | Valid |
| Customer ID | `{TD.customerId}` | Sold-to party | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Outbound Deliveries" | — | Search results appear listing the Manage Outbound Deliveries application |
| 8 | Click "Manage Outbound Deliveries" from the search results | — | Manage Outbound Deliveries application opens with delivery list |
| 9 | In the search/filter bar, enter the Delivery Number | `{TD.deliveryNumber}` | Delivery number filter is populated |
| 10 | Press Enter to apply the filter | — | Filter token is created; delivery list updates |
| 11 | Click the "Go" button | — | The specified outbound delivery appears in the results list |
| 12 | Click the delivery number link to open the delivery | `{TD.deliveryNumber}` | Outbound delivery document opens in display/edit mode |
| 13 | Navigate to the Items section and verify serialized material is listed | `{TD.materialId}` | Material ID and description are displayed; quantity `{TD.quantity}` is shown |
| 14 | Click the line item row for the serialized material | — | Line item row is selected; additional item details are visible |
| 15 | Click the "Serialization" or "Serial Numbers" button/link for the line item | — | Serialization data capture screen opens for the selected line item |
| 16 | Verify that serial number input fields are displayed for the serialized material | — | Serial number capture interface is visible with input fields for each unit |
| 17 | In the Batch field, enter or verify the batch number | `{TD.batchNumber}` | Batch number is populated in the field |
| 18 | Press Enter to confirm the batch entry | — | Batch number is validated; expiry date `{TD.expiryDate}` is auto-populated |
| 19 | In the Expiry Date field, verify the auto-populated expiry date | `{TD.expiryDate}` | Expiry date is displayed and is a future date |
| 20 | In the first Serial Number field, enter the GS1-compliant serial number | `{TD.serialNumber}` | Serial number is entered in the field (format: 14-digit GTIN + up to 20-character serial) |
| 21 | Press Enter to confirm the serial number entry | — | System validates the serial number format (GS1 compliance); no error is displayed |
| 22 | If quantity is greater than 1, repeat serial number entry for each remaining unit | — | All required serial numbers are captured (count equals `{TD.quantity}`) |
| 23 | Click the "Save" or "Confirm" button to save serialization data | — | Serialization data is saved; confirmation message is displayed |
| 24 | Verify the serialization status shows as "Complete" for the line item | — | Serialization status indicator shows "Complete" |
| 25 | Navigate back to the outbound delivery header | — | Delivery header screen is displayed |
| 26 | Click the "Post Goods Issue" button in the toolbar | — | Goods issue processing begins |
| 27 | Observe the goods issue confirmation response | — | A success message is displayed containing the generated Goods Issue (GI) document number |
| 28 | Note the GI document number from the success message | — | GI document number is displayed (10-digit format, typically begins with 49) |
| 29 | Verify that the EPCIS transmission status indicator shows "Transmitted" or "Sent" | — | EPCIS transmission status shows successful transmission to national traceability system |
| 30 | Note the EPCIS Event ID or Transaction ID if displayed | — | EPCIS Event ID is displayed (URI format per EPCIS standard) |
| 31 | Navigate back to the Manage Outbound Deliveries list | — | Delivery list is displayed |
| 32 | Search for the delivery using the number noted in step 12 | `{TD.deliveryNumber}` | The delivery appears in the list with updated status (Goods Issued) |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Serialization data (serial numbers, batch, expiry date) is successfully captured for all units in the outbound delivery line item
- Serialization status for the line item is marked as "Complete"
- Goods Issue (GI) is posted successfully with a unique GI document number
- EPCIS data is transmitted successfully to the national traceability system
- EPCIS Event ID or Transaction ID is generated and logged
- Outbound delivery status is updated to "Goods Issued" / "Completed"
- All serialization data is stored with the delivery document in SAP

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumber}` has status "Goods Issued" / "Completed"
- Goods Issue document exists with the generated GI document number
- Serialization data (serial numbers, batch, expiry) is recorded in SAP for each unit
- EPCIS transmission to national traceability system is confirmed successful
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

### Acceptance Criteria Traceability

| AC ID | AC Text | Covered |
|-------|---------|---------|
| AC-1 | User can access Outbound Delivery document for serialized materials | ✓ Steps 7-12 |
| AC-2 | System displays serial number capture fields for serialized materials only | ✓ Steps 13-16 |
| AC-3 | User can scan or manually enter serial numbers for each unit in the delivery line item | ✓ Steps 20-22 |
| AC-7 | System stores serialization data (serial numbers, batch, expiry) with outbound delivery document | ✓ Steps 23-24 |
| AC-8 | System transmits serialization data to national drug supply chain traceability system (EPCIS format) | ✓ Steps 29-30 |
