# TC-CS-027: Attempt to Capture Serialization Data with Missing or Invalid Expiry Date

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
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
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` |
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open and contains serialized material `{TD.materialId}` |
| P6 | Invalid Condition | Expiry Date field is intentionally left EMPTY or set to a PAST date to test mandatory field and date validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number | `{TD.serialNumber}` | GS1-compliant serial number | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date (Past) | `{TD.pastExpiryDate}` | Past expiry date for validation testing | Invalid (past date) |
| Expiry Date (Empty) | `{TD.emptyValue}` | Expiry date field left empty | Invalid (missing mandatory field) |

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
| 17 | Press Enter to confirm the batch entry | — | Batch number is validated |
| 18 | In the Expiry Date field, enter a PAST date OR leave the field empty | `{TD.pastExpiryDate}` OR `{TD.emptyValue}` | Past date is entered OR field remains blank |
| 19 | In the Serial Number field, enter the serial number | `{TD.serialNumber}` | Serial number is entered in the field |
| 20 | Press Enter to confirm the serial number entry | — | System validates the serial number format |
| 21 | Attempt to save the serialization data by clicking "Save" or "Confirm" | — | System begins validation for mandatory fields and date validity |
| 22 | Observe the validation response | — | SAP displays an error message indicating that the Expiry Date field is either missing or invalid (past date) |
| 23 | Verify that the error message highlights the Expiry Date field | — | Expiry Date field is visually highlighted (e.g., red border or asterisk); error message clearly indicates "Expiry Date is required" or "Expiry Date must be a future date" |
| 24 | Verify that the save operation is blocked | — | Serialization data is NOT saved; user remains on the serialization capture screen |
| 25 | Verify that the serialization status remains "Incomplete" or "Pending" | — | Serialization status indicator does NOT show "Complete" |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects that the Expiry Date field is either empty or contains a past (invalid) date
- A specific validation error message is displayed indicating that Expiry Date is a required field or must be a future date
- Expiry Date field is visually highlighted as mandatory or invalid
- Serialization data is NOT saved
- Serialization status remains "Incomplete" or "Pending"
- User is prompted to enter a valid future expiry date before proceeding

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
| (Inferred) | Expiry date is mandatory and must be a future date for pharmaceutical material | ✓ Steps 21-24 |
