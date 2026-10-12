# TC-CS-052: Create Rebate Agreement with Minimum Rebate Rate Boundary (0.01%)

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
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are configured and active |
| P6 | Configuration | Condition Type `{TD.conditionType}` is configured for rebate processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code | Valid |
| Division | `{TD.division}` | Division code | Valid |
| Customer ID | `{TD.customerId}` | Customer number | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID | Valid |
| Condition Type | `{TD.conditionType}` | Rebate condition type code | Valid |
| Rebate Rate (Min) | `{TD.rebateRateMin}` | Minimum rebate rate (0.01%) | Valid (Boundary) |
| Validity Start Date | `{TD.validityStartDate}` | Agreement start date | Valid |
| Validity End Date | `{TD.validityEndDate}` | Agreement end date | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-22 | Execute standard login and rebate agreement creation steps (Sales Org, Dist Channel, Division, Customer, GPO, Condition Type) | Various | All fields validated |
| 23 | Enter minimum rebate rate (0.01%) | `{TD.rebateRateMin}` | Value 0.01 entered |
| 24 | Press Enter | — | SAP accepts minimum rate; no validation error |
| 25-29 | Enter validity dates, save, activate | Various | Agreement created and activated successfully |
| 30 | Verify rebate rate displays as 0.01% | — | Rate shown as 0.01% |
| 31-33 | Sign out | — | User signed out |

---

### Expected Final Result

- Rebate agreement created successfully with minimum valid rebate rate (0.01%)
- Agreement status "Active"
- System accepts boundary value without error

---

### Post-conditions

- SAP Rebate Agreement exists with rate 0.01%
- Agreement status "Active"

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
