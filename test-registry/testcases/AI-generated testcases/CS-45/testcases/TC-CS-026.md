# TC-CS-026: Attempt to Capture Serialization Data with Missing Batch Number

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
| P4 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open and contains serialized material `{TD.materialId}` |
| P5 | Invalid Condition | Batch Number field is intentionally left EMPTY to test mandatory field validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number | `{TD.serialNumber}` | GS1-compliant serial number | Valid |
| Batch Number | `{TD.emptyValue}` | Batch number field left empty | Invalid (missing mandatory field) |

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
| 16 | Leave the Batch field empty (do not enter any value) | `{TD.emptyValue}` | Batch field remains blank |
| 17 | In the Serial Number field, enter the serial number | `{TD.serialNumber}` | Serial number is entered in the field |
| 18 | Press Enter to confirm the serial number entry | — | System validates the serial number format |
| 19 | Attempt to save the serialization data by clicking "Save" or "Confirm" | — | System begins validation for mandatory fields |
| 20 | Observe the validation response | — | SAP displays an error message indicating that the Batch field is mandatory and cannot be empty |
| 21 | Verify that the error message highlights the Batch field | — | Batch field is visually highlighted (e.g., red border or asterisk); error message clearly indicates "Batch is a required field" |
| 22 | Verify that the save operation is blocked | — | Serialization data is NOT saved; user remains on the serialization capture screen |
| 23 | Verify that the serialization status remains "Incomplete" or "Pending" | — | Serialization status indicator does NOT show "Complete" |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects that the mandatory Batch field is empty
- A specific validation error message is displayed indicating that Batch is a required field
- Batch field is visually highlighted as mandatory
- Serialization data is NOT saved
- Serialization status remains "Incomplete" or "Pending"
- User is prompted to enter the missing batch number before proceeding

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
| (Inferred) | Batch number is mandatory for serialized pharmaceutical material | ✓ Steps 19-22 |
