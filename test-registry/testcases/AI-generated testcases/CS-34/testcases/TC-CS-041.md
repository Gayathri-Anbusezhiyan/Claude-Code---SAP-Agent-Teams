# TC-CS-041: Unauthorized User Attempts License Block Override

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
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
| P1 | User Role | User has standard Customer Service Representative role WITHOUT override authorization (no V_VBAK_OVR or custom auth object) |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Customer `{TD.customerIdExpiredLicense}` has expired license blocking SO creation |
| P4 | Master Data | Material `{TD.materialId}` is controlled substance |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerIdExpiredLicense}` | Customer with expired license | Invalid (expired) |
| Material ID | `{TD.materialId}` | Controlled substance | Valid |
| Order Quantity | `{TD.orderQuantity}` | Standard quantity | Valid |
| Override Justification | `{TD.overrideJustification}` | Justification text | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2-6 | Complete login sequence | `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | Fiori Launchpad loaded |
| 7-9 | Navigate to Create Sales Order | — | SO creation form opens |
| 10-11 | Enter Customer ID and confirm | `{TD.customerIdExpiredLicense}` | License block error displayed |
| 12-24 | Complete SO header and line item | `{TD.salesOrg}`, `{TD.materialId}`, `{TD.orderQuantity}` | All fields populated; error persists |
| 25 | Look for "Override Block" button | — | Override button NOT visible (user not authorized) |
| 26 | Attempt to save SO | — | Save blocked; authorization error may display |
| 27 | Verify audit log | — | Log: FAIL_LICENSE_EXPIRED + OVERRIDE_DENIED (authorization check failed) |
| 28 | Verify no SO created | — | No success message |
| 29-31 | Sign out | — | Logged out |

---

### Expected Final Result

- NO SO created
- Override blocked due to missing authorization
- Audit log: FAIL_LICENSE_EXPIRED + OVERRIDE_DENIED + user ID

---

### Post-conditions

- NO SO exists
- Unauthorized override attempt logged for security review

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed

---

### Defects / Observations

_[To be recorded]_

---
