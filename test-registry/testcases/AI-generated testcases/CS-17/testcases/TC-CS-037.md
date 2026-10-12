# TC-CS-037: Configure source list with notification lead time equal to 365 days (maximum warning)

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Notification Configuration
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create and maintain source lists and configure notification settings |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Vendor `{TD.vendorId}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |
| P6 | Notification System | SAP notification/workflow system is configured and active; notification recipients are defined |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-EDGE-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP-critical raw material master number — entered by the user | Valid |
| Vendor ID | `{TD.vendorId}` | Approved vendor account number — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Approval validity start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDateLongTerm}` | Far future date (e.g., 2+ years from start date) — entered by the user | Valid |
| Notification Lead Time | `{TD.notificationLeadTimeMax}` | 365 days (maximum warning boundary) — entered by the user | Valid (boundary - upper) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Source Lists" | — | Search results appear listing the "Manage Source Lists" application |
| 8 | Click "Manage Source Lists" from the search results | — | "Manage Source Lists" application opens with the source list table view |
| 9 | Click the "Create" button in the application toolbar | — | New source list creation form opens in edit mode |
| 10 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 12 | In the "Vendor" field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered into the field |
| 13 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated |
| 14 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 15 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 16 | In the "Valid From" date field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is populated |
| 17 | In the "Valid To" date field, enter a far future date (long-term validity for testing) | `{TD.validityEndDateLongTerm}` | Validity end date is populated (long-term for notification testing) |
| 18 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected |
| 19 | Locate the notification configuration field or tab (e.g., "Days Before Expiry" or "Notification Lead Time") | — | Notification configuration field is visible in the form or settings |
| 20 | Enter "365" in the notification lead time field (maximum warning — 365 days before expiry) | `{TD.notificationLeadTimeMax}` | Notification lead time is set to 365 days |
| 21 | Click the "Save" button in the toolbar | — | SAP begins processing the source list creation with notification configuration |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed indicating the source list record was created |
| 23 | Note the source list record number or confirmation details from the message | — | Source list record number is displayed (format is system-generated) |
| 24 | Wait until the system date/time reaches 365 days before the validity end date (may require manual time advancement or waiting period) | — | System triggers the notification workflow when the notification trigger date is reached |
| 25 | Verify that a notification is sent to the configured recipients (check email, SAP inbox, or workflow log) | — | Notification is received by Procurement team 365 days before approval expiry (maximum lead time boundary) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique source list record is created by SAP with notification lead time configured to 365 days (maximum)
- The source list record is persisted in SAP with status "Active"
- Notification configuration is correctly stored with 365-day lead time
- When the system date reaches 365 days before the validity end date, a notification is sent to the Procurement team
- The notification contains details of the expiring vendor approval (material, vendor, plant, expiry date)

---

### Post-conditions

- SAP source list record exists with notification lead time of 365 days
- Source list status is "Active"
- Notification workflow is triggered at the correct time (365 days before expiry)
- Notification is received by the configured recipients
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

**Note:** This test case requires manual verification of the notification workflow and may require system date/time manipulation or a long waiting period to observe the notification trigger. Automation of this scenario is challenging due to dependency on time-based background jobs and the extended lead time period.
