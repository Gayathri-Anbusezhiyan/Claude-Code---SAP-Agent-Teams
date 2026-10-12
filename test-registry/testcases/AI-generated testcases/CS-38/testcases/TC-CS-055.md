# TC-CS-055: Attempt to Create Rebate Agreement with Negative Rebate Rate

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to maintain rebate agreements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists and is assigned to GPO `{TD.gpoId}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Rebate Rate (Negative) | `{TD.rebateRateNegative}` | Negative rebate rate (e.g., -5.00%) | Invalid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-22 | Execute standard login and agreement creation flow | Various | All fields validated |
| 23 | Enter negative rebate rate | `{TD.rebateRateNegative}` | Negative value entered |
| 24 | Press Enter | — | SAP displays error: rate cannot be negative |
| 25 | Attempt to save | — | Submission blocked |
| 26 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP rejects negative rebate rate
- Agreement NOT created
- Error message displayed

---

### Post-conditions

- No agreement created
- Validation prevented negative rate

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
