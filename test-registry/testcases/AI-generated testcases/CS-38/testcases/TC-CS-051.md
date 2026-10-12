# TC-CS-051: Attempt to Submit Rebate Agreement with Validity Start Date Field Empty

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
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

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.customerId}` | Customer number — entered by the user | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Rebate condition type code — entered by the user | Valid |
| Rebate Rate | `{TD.rebateRate}` | Rate or percentage value — entered by the user | Valid |
| Validity Start Date | `{TD.emptyValue}` | Agreement start date — intentionally left empty | Empty (Invalid) |
| Validity End Date | `{TD.validityEndDate}` | Agreement end date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen displayed |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Launchpad loads |
| 6 | Close Welcome pop-up | — | Dismissed |
| 7 | Search "Maintain Rebate Agreements" | — | Results appear |
| 8 | Click application | — | Opens |
| 9 | Click "Create" | — | Form opens |
| 10-19 | Enter all organizational and rebate condition fields as valid per test data | Various | All fields validated and populated |
| 20 | Leave "Valid From" (Validity Start Date) field empty | `{TD.emptyValue}` | Field remains empty |
| 21 | Enter "Valid To" (Validity End Date) | `{TD.validityEndDate}` | Value entered |
| 22 | Click "Save" | — | SAP highlights "Validity Start Date" field as mandatory; submission blocked |
| 23 | Observe error | — | Error states "Validity Start Date" / "Valid From" is mandatory |
| 24 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP highlights "Validity Start Date" field as mandatory and prevents submission
- Validation error message displayed
- Rebate agreement NOT created

---

### Post-conditions

- No SAP Rebate Agreement document created
- Mandatory field enforcement prevented creation with missing Validity Start Date

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
