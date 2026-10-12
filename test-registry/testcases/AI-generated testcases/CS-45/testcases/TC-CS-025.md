# TC-CS-025: Attempt Goods Issue Posting Without Complete Serialization Data

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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and post goods issue |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open and contains serialized material `{TD.materialId}` |
| P5 | Invalid Condition | Serialization data for the line item is intentionally left INCOMPLETE (not all serial numbers captured) |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serialization Data | `{TD.emptyValue}` | Serialization data field left incomplete/empty | Invalid (missing mandatory data) |

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
| 13 | Navigate to the Items section and verify serialized material is listed | `{TD.materialId}` | Material ID and description are displayed |
| 14 | Verify that the serialization status for the line item shows as "Incomplete" or "Pending" | — | Serialization status indicator does NOT show "Complete"; no serial numbers have been captured |
| 15 | Without capturing any serialization data, navigate to the delivery header | — | Delivery header screen is displayed |
| 16 | Click the "Post Goods Issue" button in the toolbar | — | System begins validation for goods issue posting |
| 17 | Observe the validation response | — | SAP displays an error message indicating that goods issue cannot be posted without complete serialization data |
| 18 | Verify that the error message clearly identifies the missing serialization data requirement | — | Error message indicates "Serialization data incomplete" or "Complete serialization required for all serialized items" |
| 19 | Verify that the error message identifies the specific line item with incomplete serialization | `{TD.materialId}` | Error message references the material ID or line item number that lacks serialization data |
| 20 | Verify that Goods Issue posting is blocked and no GI document is created | — | Goods Issue is NOT posted; no GI document number is generated |
| 21 | Verify that the outbound delivery status remains "Open" (not Goods Issued) | — | Delivery status is unchanged; status remains "Open" |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects that serialization data is incomplete for the serialized material line item
- A specific error message is displayed indicating that goods issue cannot be posted without complete serialization
- Goods Issue posting is blocked; no GI document is created
- Outbound delivery status remains "Open"
- User is clearly notified that serialization must be completed before goods issue can proceed

---

### Post-conditions

- Outbound Delivery `{TD.deliveryNumber}` remains with status "Open" (not goods issued)
- No Goods Issue document is created
- Serialization data remains incomplete for the line item
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
| AC-6 | System prevents goods issue (GI) posting without complete serialization data for all serialized items | ✓ Steps 16-21 |
