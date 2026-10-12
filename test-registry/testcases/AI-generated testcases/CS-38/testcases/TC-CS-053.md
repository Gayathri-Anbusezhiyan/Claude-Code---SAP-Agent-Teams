# TC-CS-053: Create Rebate Agreement with Maximum Rebate Rate Boundary (100.00%)

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
| P4 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Rebate Rate (Max) | `{TD.rebateRateMax}` | Maximum rebate rate (100.00%) | Valid (Boundary) |
| All other fields | Various `{TD.*}` | Standard valid values | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-22 | Execute standard login and rebate agreement creation steps | Various | All fields validated |
| 23 | Enter maximum rebate rate (100.00%) | `{TD.rebateRateMax}` | Value 100.00 entered |
| 24 | Press Enter | — | SAP accepts maximum rate |
| 25-29 | Complete agreement creation, save, activate | Various | Agreement created successfully |
| 30 | Verify rate displays as 100.00% | — | Rate shown correctly |
| 31-33 | Sign out | — | User signed out |

---

### Expected Final Result

- Rebate agreement created with maximum valid rate (100.00%)
- Agreement status "Active"
- System accepts upper boundary value

---

### Post-conditions

- Agreement exists with rate 100.00%, status "Active"

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
