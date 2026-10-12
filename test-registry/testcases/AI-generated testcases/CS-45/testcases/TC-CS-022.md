# TC-CS-022: Attempt to Capture Serial Number with Invalid GS1 Format

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and capture serialization data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` with expiry date `{TD.expiryDate}` (future date) |
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open (not yet goods issued) |
| P6 | Invalid Data | Serial number `{TD.invalidSerialNumber}` does NOT comply with GS1 format standards |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Invalid Serial Number | `{TD.invalidSerialNumber}` | Serial number with non-GS1 compliant format (e.g., too short, invalid characters) | Invalid |
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
| 18 | In the Serial Number field, enter the invalid serial number | `{TD.invalidSerialNumber}` | Invalid serial number value is entered in the field |
| 19 | Press Enter or tab out of the serial number field to trigger validation | — | System validates the serial number format against GS1 standards |
| 20 | Observe the validation response | — | SAP displays an error message indicating the serial number format is invalid or non-GS1 compliant |
| 21 | Verify that the error message clearly identifies the serial number field and the validation issue | — | Error message highlights the Serial Number field; message text indicates format violation (e.g., "Serial number must comply with GS1 format") |
| 22 | Attempt to save the serialization data by clicking "Save" or "Confirm" | — | System prevents saving; error message persists |
| 23 | Verify that the serialization status remains "Incomplete" or "Pending" | — | Serialization status indicator does NOT show "Complete" |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects the invalid serial number format and displays a specific validation error message
- Error message clearly indicates that the serial number does not comply with GS1 format standards
- Serialization data is NOT saved for the line item
- Serialization status remains "Incomplete" or "Pending"
- User is prevented from proceeding with Goods Issue posting until valid serial numbers are provided

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumber}` remains with status "Open" (not goods issued)
- Serialization data is NOT recorded for the line item
- No EPCIS transmission occurs
- No application-level critical errors remain (only the expected validation error)

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
| AC-4 | System validates serial number uniqueness and format compliance with GS1 standards | ✓ Steps 19-21 |
