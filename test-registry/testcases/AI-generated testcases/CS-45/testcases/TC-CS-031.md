# TC-CS-031: Capture Serial Number at Maximum Length (34 Characters)

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and capture serialization data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` with expiry date `{TD.expiryDate}` (future date) |
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open and contains serialized material `{TD.materialId}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number (Max Length) | `{TD.serialNumberMaxLength}` | GS1-compliant serial number at maximum length (34 characters: 14-digit GTIN + 20-character serial) | Valid (upper boundary) |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date | `{TD.expiryDate}` | Future expiry date for batch | Valid |

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
| 13 | Navigate to the Items section and locate the serialized material line item | `{TD.materialId}` | Material ID and description are displayed |
| 14 | Click the line item row for the serialized material | — | Line item row is selected |
| 15 | Click the "Serialization" or "Serial Numbers" button/link for the line item | — | Serialization data capture screen opens for the selected line item |
| 16 | In the Batch field, enter the batch number | `{TD.batchNumber}` | Batch number is populated in the field |
| 17 | Press Enter to confirm the batch entry | — | Batch number is validated; expiry date `{TD.expiryDate}` is auto-populated |
| 18 | In the Expiry Date field, verify the auto-populated expiry date | `{TD.expiryDate}` | Expiry date is displayed and is a future date |
| 19 | In the Serial Number field, enter a serial number at maximum length (34 characters) | `{TD.serialNumberMaxLength}` | 34-character serial number is entered (format: 14-digit GTIN + 20-character alphanumeric serial component) |
| 20 | Press Enter or tab out of the serial number field to trigger validation | — | System validates the serial number format against GS1 standards |
| 21 | Verify that the system accepts the maximum-length serial number without error | — | No validation error is displayed; serial number is accepted as valid |
| 22 | Verify that the field does not truncate or reject the 34-character serial number | — | Full 34-character serial number is displayed and stored in the field |
| 23 | Click the "Save" or "Confirm" button to save serialization data | — | Serialization data is saved; confirmation message is displayed |
| 24 | Verify the serialization status shows as "Complete" for the line item | — | Serialization status indicator shows "Complete" |
| 25 | Navigate back to the outbound delivery header | — | Delivery header screen is displayed |
| 26 | Click the "Post Goods Issue" button in the toolbar | — | Goods issue processing begins |
| 27 | Observe the goods issue confirmation response | — | A success message is displayed containing the generated Goods Issue (GI) document number |
| 28 | Note the GI document number from the success message | — | GI document number is displayed |
| 29 | Verify that the EPCIS transmission status indicator shows "Transmitted" or "Sent" | — | EPCIS transmission status shows successful transmission with maximum-length serial number |
| 30 | Navigate back to the Manage Outbound Deliveries list | — | Delivery list is displayed |
| 31 | Search for the delivery using the number noted in step 12 | `{TD.deliveryNumber}` | The delivery appears in the list with updated status (Goods Issued) |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System successfully accepts serial number at maximum length (34 characters: 14-digit GTIN + 20-character serial)
- Serial number format validation passes for the maximum-length GS1-compliant serial number
- Serial number field does not truncate the 34-character value
- Serialization data is captured and saved with full serial number intact
- Serialization status is marked as "Complete"
- Goods Issue is posted successfully
- EPCIS data with maximum-length serial number is transmitted successfully to the national traceability system
- Outbound delivery status is updated to "Goods Issued"

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumber}` has status "Goods Issued" / "Completed"
- Goods Issue document exists with the generated GI document number
- Maximum-length serial number (34 characters) is recorded in SAP without truncation
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
| AC-4 | System validates serial number uniqueness and format compliance with GS1 standards | ✓ Steps 19-22 (maximum length boundary) |
