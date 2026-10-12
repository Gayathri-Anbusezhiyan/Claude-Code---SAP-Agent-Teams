# TC-CS-032: EPCIS Transmission Failure to National Traceability System

**User Story:**          [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Serialization/Track-and-Trace Capture for Outbound Delivery
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to manage outbound deliveries and post goods issue |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and has serialization profile (SERNP flag) set for prescription pharmaceutical |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` with expiry date `{TD.expiryDate}` (future date) |
| P5 | Transaction Data | Outbound Delivery `{TD.deliveryNumber}` exists with status Open; serialization data has been captured and is complete |
| P6 | Integration Setup | EPCIS endpoint for national traceability system is configured but intentionally unavailable (simulated timeout, network error, or system unavailable) |

---

### Test Data

**Dataset Reference:** `testdata/CS-45/CS-45-testdata.json` — Dataset ID: `TD-CS-045-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Existing outbound delivery number with complete serialization | Valid |
| Material ID | `{TD.materialId}` | Serialized pharmaceutical material number | Valid |
| Serial Number | `{TD.serialNumber}` | GS1-compliant serial number (already captured) | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for pharmaceutical material | Valid |
| Expiry Date | `{TD.expiryDate}` | Future expiry date for batch | Valid |
| EPCIS Endpoint Status | `{TD.epcisEndpointUnavailable}` | Simulated EPCIS endpoint failure (timeout/network error) | Invalid (integration failure) |

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
| 7 | **Pre-test setup:** Simulate EPCIS endpoint unavailability (disconnect network, disable endpoint, or configure mock endpoint to return timeout/error) | `{TD.epcisEndpointUnavailable}` | EPCIS endpoint is unavailable for testing integration failure |
| 8 | Click the search icon (top-right shell bar) and type "Manage Outbound Deliveries" | — | Search results appear listing the Manage Outbound Deliveries application |
| 9 | Click "Manage Outbound Deliveries" from the search results | — | Manage Outbound Deliveries application opens with delivery list |
| 10 | In the search/filter bar, enter the Delivery Number | `{TD.deliveryNumber}` | Delivery number filter is populated |
| 11 | Press Enter to apply the filter | — | Filter token is created; delivery list updates |
| 12 | Click the "Go" button | — | The specified outbound delivery appears in the results list |
| 13 | Click the delivery number link to open the delivery | `{TD.deliveryNumber}` | Outbound delivery document opens in display/edit mode |
| 14 | Verify that serialization data is complete for the serialized material line item | `{TD.materialId}` | Serialization status indicator shows "Complete"; all serial numbers are captured |
| 15 | Navigate to the delivery header | — | Delivery header screen is displayed |
| 16 | Click the "Post Goods Issue" button in the toolbar | — | System begins goods issue processing and attempts EPCIS transmission |
| 17 | Observe the EPCIS transmission attempt and response | — | System attempts to transmit serialization data to the national traceability system EPCIS endpoint |
| 18 | Verify that the system detects the EPCIS transmission failure (timeout, network error, or system unavailable) | — | System recognizes that EPCIS endpoint is not reachable or returns an error |
| 19 | Observe the error message or warning displayed by SAP | — | SAP displays an error or warning message indicating EPCIS transmission failed; message includes failure reason (e.g., "Traceability system unavailable", "EPCIS transmission timeout") |
| 20 | Verify that the error message provides actionable information for the user | — | Error message clearly identifies the EPCIS transmission failure and advises user to retry or contact system administrator |
| 21 | Determine whether Goods Issue posting is blocked or allowed to proceed despite EPCIS failure | — | System behavior is observed: (a) GI posting is blocked until EPCIS transmission succeeds, OR (b) GI posting proceeds with EPCIS marked as failed/pending retry |
| 22 | If GI posting is blocked, verify that the delivery status remains "Open" (not Goods Issued) | — | Delivery status is unchanged; no GI document is created; EPCIS transmission failure blocks the transaction |
| 23 | If GI posting is allowed, verify that GI document is created but EPCIS status is flagged as "Failed" or "Pending" | — | GI document number is generated; EPCIS transmission status shows "Failed" or "Pending Retry"; user is notified of the integration issue |
| 24 | Verify that serialization data is retained in SAP regardless of EPCIS transmission failure | — | Serialization data (serial numbers, batch, expiry) remains stored in SAP; no data loss occurs |
| 25 | Verify that an alert, log entry, or notification is generated for IT/integration support | — | System logs EPCIS transmission failure for monitoring and troubleshooting; integration failure is traceable |
| 26 | **Post-test action:** Restore EPCIS endpoint availability and retry transmission if applicable | — | EPCIS endpoint is restored; retry mechanism is tested (if supported by SAP configuration) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects EPCIS transmission failure (timeout, network error, or system unavailable)
- A specific error or warning message is displayed indicating EPCIS transmission failure with failure reason
- System behavior is clearly defined: either (a) Goods Issue posting is blocked until EPCIS transmission succeeds, OR (b) Goods Issue posting proceeds with EPCIS status flagged as failed/pending retry
- Serialization data is retained in SAP regardless of EPCIS transmission failure (no data loss)
- EPCIS transmission failure is logged for monitoring and troubleshooting by IT/integration support
- User is provided with actionable information to address the integration failure
- If retry mechanism is supported, EPCIS transmission can be retried after endpoint is restored

---

### Post-conditions

- Outbound Delivery status depends on SAP configuration: either remains "Open" (if GI blocked) or "Goods Issued" (if GI allowed despite EPCIS failure)
- Serialization data is stored in SAP and not lost
- EPCIS transmission failure is logged in SAP system logs or integration monitoring tools
- If GI proceeded, EPCIS status is flagged as "Failed" or "Pending Retry"
- No application-level critical errors remain (only the expected integration failure message)

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

### Test Notes

**Automation Candidate: PARTIAL**
- Automated test execution requires mock EPCIS endpoint or network simulation to reliably trigger transmission failure
- Manual test execution may require coordination with IT/network team to simulate endpoint unavailability
- Verify SAP configuration for EPCIS failure handling: blocking vs. non-blocking Goods Issue posting

---

### Acceptance Criteria Traceability

| AC ID | AC Text | Covered |
|-------|---------|---------|
| AC-8 | System transmits serialization data to national drug supply chain traceability system (EPCIS format) | ✓ Steps 16-25 (integration failure scenario) |
