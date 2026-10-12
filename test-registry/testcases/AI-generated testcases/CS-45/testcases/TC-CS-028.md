# TC-CS-028: Capture Serialization for Single Unit (Minimum Quantity Boundary)

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
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumberMinQty}` exists with status Open and delivery quantity is 1 (minimum boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberMinQty}` | Existing outbound delivery number with quantity = 1 | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number | `{TD.serialNumber}` | GS1-compliant serial number | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date | `{TD.expiryDate}` | Future expiry date for batch | Valid |
| Quantity (Min) | `{TD.minQuantity}` | Minimum quantity = 1 | Valid (lower boundary) |

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
| 9 | In the search/filter bar, enter the Delivery Number | `{TD.deliveryNumberMinQty}` | Delivery number filter is populated |
| 10 | Press Enter to apply the filter | — | Filter token is created; delivery list updates |
| 11 | Click the "Go" button | — | The specified outbound delivery appears in the results list |
| 12 | Click the delivery number link to open the delivery | `{TD.deliveryNumberMinQty}` | Outbound delivery document opens in display/edit mode |
| 13 | Navigate to the Items section and verify serialized material is listed | `{TD.materialId}` | Material ID and description are displayed; quantity is `{TD.minQuantity}` (1 unit) |
| 14 | Click the line item row for the serialized material | — | Line item row is selected |
| 15 | Click the "Serialization" or "Serial Numbers" button/link for the line item | — | Serialization data capture screen opens with input fields for 1 serial number |
| 16 | In the Batch field, enter the batch number | `{TD.batchNumber}` | Batch number is populated in the field |
| 17 | Press Enter to confirm the batch entry | — | Batch number is validated; expiry date `{TD.expiryDate}` is auto-populated |
| 18 | In the Expiry Date field, verify the auto-populated expiry date | `{TD.expiryDate}` | Expiry date is displayed and is a future date |
| 19 | In the Serial Number field, enter the GS1-compliant serial number | `{TD.serialNumber}` | Serial number is entered in the field |
| 20 | Press Enter to confirm the serial number entry | — | System validates the serial number format (GS1 compliance); no error is displayed |
| 21 | Verify that only one serial number field is required (matching quantity = 1) | — | Only one serial number input field is present; no additional fields are displayed |
| 22 | Click the "Save" or "Confirm" button to save serialization data | — | Serialization data is saved; confirmation message is displayed |
| 23 | Verify the serialization status shows as "Complete" for the line item | — | Serialization status indicator shows "Complete" |
| 24 | Navigate back to the outbound delivery header | — | Delivery header screen is displayed |
| 25 | Click the "Post Goods Issue" button in the toolbar | — | Goods issue processing begins |
| 26 | Observe the goods issue confirmation response | — | A success message is displayed containing the generated Goods Issue (GI) document number |
| 27 | Note the GI document number from the success message | — | GI document number is displayed |
| 28 | Verify that the EPCIS transmission status indicator shows "Transmitted" or "Sent" | — | EPCIS transmission status shows successful transmission to national traceability system |
| 29 | Navigate back to the Manage Outbound Deliveries list | — | Delivery list is displayed |
| 30 | Search for the delivery using the number noted in step 12 | `{TD.deliveryNumberMinQty}` | The delivery appears in the list with updated status (Goods Issued) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System successfully accepts serialization data for minimum quantity (1 unit)
- Only one serial number input field is displayed and required (matching the quantity)
- Serialization data (serial number, batch, expiry date) is captured and saved
- Serialization status is marked as "Complete"
- Goods Issue is posted successfully
- EPCIS data is transmitted successfully to the national traceability system
- Outbound delivery status is updated to "Goods Issued"

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumberMinQty}` has status "Goods Issued" / "Completed"
- Goods Issue document exists with the generated GI document number
- Serialization data for 1 unit is recorded in SAP
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
| AC-3 | User can scan or manually enter serial numbers for each unit in the delivery line item | ✓ Steps 19-21 (minimum boundary) |
