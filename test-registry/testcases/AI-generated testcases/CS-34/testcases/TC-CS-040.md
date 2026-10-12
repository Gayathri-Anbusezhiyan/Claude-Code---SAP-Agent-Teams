# TC-CS-040: Attempt to Create Sales Order When License Classification Does Not Match Material

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerIdMismatchLicense}` exists and is active with a valid license BUT license classification does NOT match the regulatory requirement for the ordered material (e.g., pharmacy license when material requires wholesaler license) |
| P4 | Master Data | Material `{TD.materialId}` exists, is released, and flagged as a controlled substance requiring specific license classification |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and assigned to the user |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerIdMismatchLicense}` | Sold-To Party with mismatched license classification — entered by the user | Invalid (classification mismatch) |
| Material ID | `{TD.materialId}` | Controlled substance requiring specific license — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| License Classification | `{TD.licenseClassification}` | Customer license classification (does not match material requirement) | Invalid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter the password | `{ENV.SAP_PASSWORD}` | Password is entered |
| 5 | Click "Continue" | — | Fiori Launchpad loads |
| 6 | Close any Welcome pop-up | — | Launchpad is fully visible |
| 7 | Click search icon and type "Create Sales Order" | — | Search results appear |
| 8 | Click "Create Sales Order" | — | Application opens |
| 9 | Click "Create" button | — | New SO form opens |
| 10 | Enter Customer ID | `{TD.customerIdMismatchLicense}` | Customer ID entered |
| 11 | Press Enter | — | Customer name auto-populated |
| 12 | SAP performs license verification | — | System checks license classification; finds mismatch with material requirement |
| 13 | Observe license block error | — | Error: "License classification for customer does not match material regulatory requirement" — SO creation blocked |
| 14 | Enter Sales Organization | `{TD.salesOrg}` | Sales Org entered |
| 15 | Press Enter | — | Confirmed |
| 16 | Enter Distribution Channel | `{TD.distributionChannel}` | Channel entered |
| 17 | Press Enter | — | Confirmed |
| 18 | Enter Division | `{TD.division}` | Division entered |
| 19 | Press Enter | — | Confirmed |
| 20 | Click "Add" in Items section | — | New item row appears |
| 21 | Enter Material ID | `{TD.materialId}` | Material ID entered |
| 22 | Press Enter | — | Material description auto-populated |
| 23 | Enter Order Quantity | `{TD.orderQuantity}` | Quantity entered |
| 24 | Press Enter | — | Quantity confirmed |
| 25 | Verify audit log entry | — | Log: FAIL_LICENSE_CLASSIFICATION_MISMATCH |
| 26 | Attempt to click "Save" | — | Save blocked; error persists |
| 27 | Verify no SO created | — | No success message |
| 28 | Click "Cancel" | — | SO list displayed |
| 29 | Click User Profile icon | — | Menu appears |
| 30 | Click "Sign Out" | — | Confirmation dialog |
| 31 | Click "OK" | — | Logged out |

---

### Expected Final Result

- NO Sales Order created
- Error: License classification mismatch detected
- Audit log: timestamp + user + customer + material + result: FAIL_LICENSE_CLASSIFICATION_MISMATCH + override: NO

---

### Post-conditions

- NO SO document exists
- Customer blocked until correct license classification added
- Audit log entry recorded

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

_[To be recorded during execution]_

---
