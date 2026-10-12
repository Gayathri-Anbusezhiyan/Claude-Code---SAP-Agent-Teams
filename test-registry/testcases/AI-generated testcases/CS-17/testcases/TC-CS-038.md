# TC-CS-038: Verify notification sent when approval validity approaching expiry (configurable lead time)

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Notification Workflow Integration
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
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
| P6 | Notification System | SAP notification/workflow system is configured and active; notification recipients are defined and accessible |
| P7 | Background Jobs | SAP background jobs for notification processing are scheduled and active |
| P8 | Source List Exists | A source list record with approaching validity end date already exists (or will be created in this test) |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP-critical raw material master number — entered by the user | Valid |
| Vendor ID | `{TD.vendorId}` | Approved vendor account number — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Approval validity start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDateShortTerm}` | Near future date (e.g., 35 days from start date for 30-day lead time testing) — entered by the user | Valid |
| Notification Lead Time | `{TD.notificationLeadTime}` | 30 days (typical warning period) — entered by the user | Valid |

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
| 17 | In the "Valid To" date field, enter a near future date (short-term validity for notification testing) | `{TD.validityEndDateShortTerm}` | Validity end date is populated (e.g., 35 days from start for 30-day lead time) |
| 18 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected |
| 19 | Locate the notification configuration field or tab (e.g., "Days Before Expiry" or "Notification Lead Time") | — | Notification configuration field is visible in the form or settings |
| 20 | Enter the notification lead time (e.g., 30 days before expiry) | `{TD.notificationLeadTime}` | Notification lead time is set to 30 days |
| 21 | Click the "Save" button in the toolbar | — | SAP begins processing the source list creation with notification configuration |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed indicating the source list record was created |
| 23 | Note the source list record number or confirmation details from the message | — | Source list record number is displayed (format is system-generated) |
| 24 | Calculate the notification trigger date (validity end date minus notification lead time) | — | Notification trigger date is calculated (e.g., 5 days from start if end date is 35 days and lead time is 30 days) |
| 25 | Wait until the system date/time reaches the notification trigger date (may require manual time advancement or waiting period) | — | System triggers the notification workflow when the notification trigger date is reached |
| 26 | Check the configured notification channels (email, SAP inbox, or workflow log) | — | A notification is received by the Procurement team at the configured lead time before approval expiry |
| 27 | Verify the notification content includes all required details | — | Notification displays: material ID `{TD.materialId}`, vendor ID `{TD.vendorId}`, plant `{TD.plant}`, validity end date `{TD.validityEndDateShortTerm}`, days until expiry |
| 28 | Verify the notification is sent to the correct recipients (Procurement team members) | — | Notification is delivered to the configured recipient list (Procurement team distribution list or individual users) |
| 29 | Verify the notification includes actionable information (e.g., link to source list record, instructions for renewal) | — | Notification provides clear guidance on how to respond (renew approval, audit vendor, update source list) |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique source list record is created by SAP with notification lead time configured
- When the system date reaches the notification trigger date (validity end date minus lead time), a notification is sent to the Procurement team
- The notification contains complete details: material, vendor, plant, validity end date, and days until expiry
- The notification is delivered to the correct recipients via the configured channels (email, SAP inbox)
- The notification includes actionable information to guide the Procurement team on next steps
- The notification workflow operates correctly and reliably without manual intervention

---

### Post-conditions

- SAP source list record exists with notification configuration
- Notification workflow was triggered at the correct time
- Notification was successfully delivered to the configured recipients
- Procurement team is aware of the approaching vendor approval expiry
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

**Note:** This integration test case requires:
1. Access to the notification system (email, SAP inbox, or workflow log)
2. System date/time manipulation or a waiting period to trigger the notification
3. Coordination with system administrators to verify background job execution
4. Manual verification of notification delivery and content

Automation of this scenario is challenging due to dependency on external notification systems, time-based background jobs, and manual verification of notification content and delivery.
