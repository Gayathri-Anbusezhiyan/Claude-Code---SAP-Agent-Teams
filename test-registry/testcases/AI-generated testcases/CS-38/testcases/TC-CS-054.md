# TC-CS-054: Attempt to Create Rebate Agreement with Zero Rebate Rate

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to GPO `{TD.gpoId}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Rebate Rate (Zero) | `{TD.rebateRateZero}` | Zero rebate rate (0 or 0.00%) | Invalid (Boundary) |
| All other fields | Various `{TD.*}` | Standard valid values | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-22 | Execute standard login and rebate agreement creation steps | Various | All fields validated |
| 23 | Enter zero rebate rate (0 or 0.00) | `{TD.rebateRateZero}` | Value 0 entered |
| 24 | Press Enter | — | SAP displays error: rebate rate must be greater than zero |
| 25 | Attempt to save | — | Submission blocked; validation error displayed |
| 26 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP rejects zero rebate rate with validation error
- Agreement NOT created
- Error message indicates rate must be greater than zero

---

### Post-conditions

- No agreement created
- Validation successfully prevented zero rate

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
