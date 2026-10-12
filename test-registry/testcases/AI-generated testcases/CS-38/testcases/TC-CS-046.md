# TC-CS-046: Attempt to Create Rebate Agreement with Invalid Sales Organization

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P3 | Master Data | Sales Organization `{TD.invalidSalesOrganization}` does NOT exist in SAP |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to GPO `{TD.gpoId}` |
| P5 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Sales Organization | `{TD.invalidSalesOrganization}` | Sales org code that does NOT exist in SAP — entered by the user | Invalid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.customerId}` | Customer number — entered by the user | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Maintain Rebate Agreements" | — | Search results appear listing the "Maintain Rebate Agreements" application |
| 8 | Click "Maintain Rebate Agreements" from the search results | — | "Maintain Rebate Agreements" application opens |
| 9 | Click the "Create" button in the application toolbar | — | New rebate agreement creation form opens in edit mode |
| 10 | In the "Sales Organization" field, enter the invalid Sales Organization code | `{TD.invalidSalesOrganization}` | Invalid Sales Organization value is entered into the field |
| 11 | Press Enter to confirm the Sales Organization entry | — | SAP displays an error message indicating that the sales organization does not exist or is invalid; organizational details are NOT auto-populated |
| 12 | Observe the error message details | — | Error message is displayed clearly stating that sales organization `{TD.invalidSalesOrganization}` does not exist or is not valid in SAP |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message at the Sales Organization field validation step (step 11)
- The error message indicates that the Sales Organization does not exist or is invalid
- The rebate agreement creation process is blocked at the organizational data entry stage
- No Rebate Agreement Number is generated
- The validation error is clearly communicated to the user

---

### Post-conditions

- No SAP Rebate Agreement document is created
- Sales Organization validation successfully prevented the creation of a rebate agreement with invalid organizational data
- No application-level errors or critical warnings remain outstanding after signing out

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
