# TC-CS-050: Attempt to Submit Rebate Agreement with Condition Type Field Empty

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

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.customerId}` | Customer number — entered by the user | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |
| Condition Type | `{TD.emptyValue}` | Condition type code — intentionally left empty | Empty (Invalid) |
| Rebate Rate | `{TD.rebateRate}` | Rate or percentage value — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Agreement start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Agreement end date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen is displayed |
| 4 | Enter the user password | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click "Continue" | — | Fiori Launchpad loads |
| 6 | Close Welcome pop-up if appears | — | Pop-up dismissed |
| 7 | Search for "Maintain Rebate Agreements" | — | Search results appear |
| 8 | Click "Maintain Rebate Agreements" | — | Application opens |
| 9 | Click "Create" | — | Creation form opens |
| 10 | Enter Sales Organization | `{TD.salesOrganization}` | Value entered |
| 11 | Press Enter | — | Validated |
| 12 | Enter Distribution Channel | `{TD.distributionChannel}` | Value entered |
| 13 | Press Enter | — | Validated |
| 14 | Enter Division | `{TD.division}` | Value entered |
| 15 | Press Enter | — | Validated |
| 16 | Enter Customer ID | `{TD.customerId}` | Value entered |
| 17 | Press Enter | — | Customer name `{TD.customerName}` auto-populated |
| 18 | Enter GPO ID | `{TD.gpoId}` | Value entered |
| 19 | Press Enter | — | GPO name `{TD.gpoName}` auto-populated |
| 20 | Leave "Condition Type" field empty | `{TD.emptyValue}` | Field remains empty |
| 21 | Enter Rebate Rate | `{TD.rebateRate}` | Value entered |
| 22 | Press Enter | — | Confirmed |
| 23 | Enter Validity Start Date | `{TD.validityStartDate}` | Value entered |
| 24 | Enter Validity End Date | `{TD.validityEndDate}` | Value entered |
| 25 | Click "Save" | — | SAP highlights "Condition Type" field as mandatory; submission blocked |
| 26 | Observe error message | — | Error states "Condition Type" is mandatory |
| 27 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP highlights "Condition Type" field as mandatory and prevents submission
- Validation error message displayed
- Rebate agreement NOT created
- No Rebate Agreement Number generated

---

### Post-conditions

- No SAP Rebate Agreement document created
- Mandatory field enforcement prevented creation with missing Condition Type field

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
