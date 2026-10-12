# TC-CS-029: Capture Serialization for Maximum Quantity (Upper Boundary)

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and capture serialization data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` with expiry date `{TD.expiryDate}` (future date) |
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumberMaxQty}` exists with status Open and delivery quantity is at system-configured maximum (e.g., 100 units) |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberMaxQty}` | Existing outbound delivery number with maximum quantity | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Numbers (Multiple) | `{TD.serialNumberSet}` | Set of GS1-compliant serial numbers (count = max quantity) | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date | `{TD.expiryDate}` | Future expiry date for batch | Valid |
| Quantity (Max) | `{TD.maxQuantity}` | Maximum quantity per system configuration (e.g., 100) | Valid (upper boundary) |

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
| 9 | In the search/filter bar, enter the Delivery Number | `{TD.deliveryNumberMaxQty}` | Delivery number filter is populated |
| 10 | Press Enter to apply the filter | — | Filter token is created; delivery list updates |
| 11 | Click the "Go" button | — | The specified outbound delivery appears in the results list |
| 12 | Click the delivery number link to open the delivery | `{TD.deliveryNumberMaxQty}` | Outbound delivery document opens in display/edit mode |
| 13 | Navigate to the Items section and verify serialized material is listed | `{TD.materialId}` | Material ID and description are displayed; quantity is `{TD.maxQuantity}` (maximum units) |
| 14 | Click the line item row for the serialized material | — | Line item row is selected |
| 15 | Click the "Serialization" or "Serial Numbers" button/link for the line item | — | Serialization data capture screen opens with input fields for maximum quantity serial numbers |
| 16 | In the Batch field, enter the batch number | `{TD.batchNumber}` | Batch number is populated in the field |
| 17 | Press Enter to confirm the batch entry | — | Batch number is validated; expiry date `{TD.expiryDate}` is auto-populated |
| 18 | In the Expiry Date field, verify the auto-populated expiry date | `{TD.expiryDate}` | Expiry date is displayed and is a future date |
| 19 | Verify that the number of serial number input fields matches the maximum quantity | `{TD.maxQuantity}` | Serial number input fields equal to maximum quantity are displayed (e.g., 100 fields) |
| 20 | For each unit, enter a unique GS1-compliant serial number (scan or manual entry) | `{TD.serialNumberSet}` | All serial numbers are entered; each is unique within the delivery |
| 21 | Press Enter after each serial number entry to trigger validation | — | System validates each serial number format and uniqueness; no errors are displayed |
| 22 | Verify that the system handles the maximum quantity without performance degradation or timeout | — | UI remains responsive; all serial number entries are accepted without errors or delays |
| 23 | Click the "Save" or "Confirm" button to save serialization data | — | Serialization data is saved; confirmation message is displayed |
| 24 | Verify the serialization status shows as "Complete" for the line item | — | Serialization status indicator shows "Complete" |
| 25 | Navigate back to the outbound delivery header | — | Delivery header screen is displayed |
| 26 | Click the "Post Goods Issue" button in the toolbar | — | Goods issue processing begins |
| 27 | Observe the goods issue confirmation response | — | A success message is displayed containing the generated Goods Issue (GI) document number |
| 28 | Note the GI document number from the success message | — | GI document number is displayed |
| 29 | Verify that the EPCIS transmission status indicator shows "Transmitted" or "Sent" | — | EPCIS transmission status shows successful transmission for all maximum quantity units |
| 30 | Navigate back to the Manage Outbound Deliveries list | — | Delivery list is displayed |
| 31 | Search for the delivery using the number noted in step 12 | `{TD.deliveryNumberMaxQty}` | The delivery appears in the list with updated status (Goods Issued) |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System successfully accepts serialization data for maximum quantity (upper boundary)
- All required serial number input fields are displayed (matching the maximum quantity)
- Each unique serial number is validated and accepted without errors
- System handles maximum quantity without performance degradation or timeouts
- Serialization data for all units is captured and saved
- Serialization status is marked as "Complete"
- Goods Issue is posted successfully
- EPCIS data for all units is transmitted successfully to the national traceability system
- Outbound delivery status is updated to "Goods Issued"

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumberMaxQty}` has status "Goods Issued" / "Completed"
- Goods Issue document exists with the generated GI document number
- Serialization data for maximum quantity units is recorded in SAP
- EPCIS transmission to national traceability system is confirmed successful for all units
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
| AC-3 | User can scan or manually enter serial numbers for each unit in the delivery line item | ✓ Steps 20-22 (maximum boundary) |
