# TC-CS-024: Attempt to Capture Serial Numbers for Non-Serialized Material

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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.nonSerializedMaterialId}` exists, is active, but does NOT have serialization profile (SERNP flag NOT set) |
| P4 | Transaction Data | Outbound Delivery `{TD.deliveryNumberNonSerialized}` exists with status Open and contains non-serialized material `{TD.nonSerializedMaterialId}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberNonSerialized}` | Existing outbound delivery number with non-serialized material | Valid |
| Non-Serialized Material ID | `{TD.nonSerializedMaterialId}` | Material number WITHOUT serialization profile (SERNP flag NOT set) | Valid material, Invalid for serialization |

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
| 9 | In the search/filter bar, enter the Delivery Number | `{TD.deliveryNumberNonSerialized}` | Delivery number filter is populated |
| 10 | Press Enter to apply the filter | — | Filter token is created; delivery list updates |
| 11 | Click the "Go" button | — | The specified outbound delivery appears in the results list |
| 12 | Click the delivery number link to open the delivery | `{TD.deliveryNumberNonSerialized}` | Outbound delivery document opens in display/edit mode |
| 13 | Navigate to the Items section and locate the non-serialized material line item | `{TD.nonSerializedMaterialId}` | Material ID and description are displayed |
| 14 | Click the line item row for the non-serialized material | — | Line item row is selected |
| 15 | Verify that the "Serialization" or "Serial Numbers" button/link is NOT available or is disabled for this line item | — | Serialization button/link is either not displayed or is greyed out/disabled |
| 16 | If the serialization button/link is visible but disabled, attempt to click it | — | System does not allow access; no action occurs OR a message indicates serialization is not applicable for this material |
| 17 | Verify that no serial number capture fields are displayed for the non-serialized material | — | Serial number input fields are NOT present in the item details |
| 18 | Attempt to navigate to any serialization-related screens or tabs | — | System does not provide serialization functionality for non-serialized materials |
| 19 | Verify that Goods Issue can be posted without serialization data for this material | — | Post Goods Issue button is active and not blocked by serialization requirements |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System correctly identifies that the material does NOT have serialization profile (SERNP flag NOT set)
- Serial number capture functionality is NOT available or is disabled for non-serialized materials
- No serial number input fields are displayed
- User is NOT required to capture serialization data for non-serialized materials
- Goods Issue posting is not blocked for non-serialized materials

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumberNonSerialized}` remains accessible and can proceed to Goods Issue without serialization data
- No serialization data is captured or stored for the non-serialized material
- No application-level errors occur

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
| AC-2 | System displays serial number capture fields for serialized materials only | ✓ Steps 15-18 |
