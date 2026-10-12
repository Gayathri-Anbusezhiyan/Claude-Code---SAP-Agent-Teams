# TC-CS-096: Verify expiration alert is triggered the configured number of days before contract end date

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) — Expiration Alert
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, and approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created and extended to plant `{TD.plant}` |
| P5 | Configuration | Contract expiration alert background job is configured and active in SAP (transaction SM37) |
| P6 | Configuration | Alert lead time is set to `{TD.alertLeadTime}` days before expiration |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-HP-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDateAlert}` | Contract start date (today or recent past) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDateAlert}` | Contract end date set to trigger alert (today + alert lead time days) — entered by the user | Valid |
| Alert Lead Time | `{TD.alertLeadTime}` | Number of days before expiration to trigger alert (e.g., 30) — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Negotiated price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 8 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens |
| 9 | Click the "Create" button in the application toolbar | — | New contract creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated |
| 12 | In the "Material:*" item field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-filled |
| 14 | In the "Plant:*" item field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 15 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 16 | In the "Target Quantity" header field, enter the target quantity | `{TD.targetQuantity}` | Target quantity is populated |
| 17 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDateAlert}` | Validity start date is entered (today or recent past) |
| 18 | In the "Valid To:*" header field, enter the validity end date calculated to trigger the alert soon | `{TD.validityEndDateAlert}` | Validity end date is entered (set to today + alert lead time days to trigger alert on or near test execution date) |
| 19 | In the "Scale Quantity" pricing condition field, enter the starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered |
| 20 | In the "Net Price:*" pricing condition field, enter the negotiated price | `{TD.netPrice}` | Net price is entered |
| 21 | Press Enter to confirm the Net Price entry | — | Pricing condition is saved |
| 22 | In the "Reminder Days" field (alert configuration), enter the alert lead time | `{TD.alertLeadTime}` | Alert lead time is entered (e.g., 30 days before expiration) |
| 23 | Click the "Save" button in the toolbar | — | SAP processes the contract save operation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated contract number |
| 25 | Note the contract number from the success message | — | Contract number is displayed |
| 26 | Verify that the "Alert Trigger Date" is calculated correctly | — | Alert trigger date should equal Validity End Date minus Alert Lead Time days (visible in contract header or log) |
| 27 | Wait for the SAP background job to run (or manually trigger the contract expiration alert job if permitted) | — | Background job processes contracts approaching expiration and generates alerts |
| 28 | Check the SAP Fiori Notification Center (bell icon, top-right shell bar) for contract expiration alert | — | A notification appears indicating that contract `{TD.contractNumber}` is approaching expiration in `{TD.alertLeadTime}` days |
| 29 | Alternatively, check the SAP Workflow Inbox or email system for contract expiration alert | — | An alert message is delivered to the Procurement team via workflow or email stating contract expiration date and contract number |
| 30 | Verify that the alert contains the contract number, expiration date, and remaining days | — | Alert message includes contract number, validity end date, and number of days until expiration |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A purchasing contract is successfully created with validity end date set to trigger the expiration alert
- Alert lead time is configured to `{TD.alertLeadTime}` days before expiration
- SAP background job runs and detects the contract approaching expiration
- An alert notification is generated and delivered to the Procurement team via SAP Fiori Notification Center, Workflow Inbox, or email
- The alert contains the contract number, validity end date, and number of days remaining until expiration
- Contract expiration alerting functionality is validated and functioning correctly

---

### Post-conditions

- SAP Purchasing Contract document exists with the generated contract number
- Contract validity end date and alert lead time are correctly configured
- Alert trigger date is calculated as Validity End Date minus Alert Lead Time days
- Alert notification is delivered to the Procurement team as expected
- No application-level errors or critical warnings remain outstanding

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

### Notes

**Manual Verification Required:**
- This test case requires verification of a time-based alert trigger which may not be immediately observable during test execution
- The SAP background job for contract expiration alerts may run on a scheduled basis (e.g., daily)
- Manual verification of the alert in the Notification Center, Workflow Inbox, or email system is required
- Automation of this test case is classified as "NO" due to the time-based nature and manual verification requirement
- Alternative approach: Verify alert configuration is saved correctly and alert trigger date is calculated correctly (automation-feasible), then manually verify alert delivery separately

---
