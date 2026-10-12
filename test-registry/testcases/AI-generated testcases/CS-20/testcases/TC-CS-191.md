---

## TC-CS-191: Verify Requisitioner Receives Notification When Purchase Requisition is Rejected

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer (requisitioner) with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for requisitioner are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberRejected}` was created by the requisitioner and has been rejected by the approver |
| P4 | Integration | Fiori notification system is configured and active for PR rejection notifications |
| P5 | Configuration | Workflow is configured to send notifications to requisitioners upon PR rejection |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberRejected}` | Existing PR number that has been rejected — requisitioner should receive notification | Valid |
| Requisitioner User ID | `{TD.requisitionerUserId}` | Requisitioner user ID who created the PR | Valid |
| Rejection Comments | `{TD.rejectionComments}` | Comments entered by approver explaining rejection reason | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the requisitioner email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the requisitioner password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Check the Fiori notification icon (bell icon) in the top-right shell bar for notification badge | — | Notification icon displays a badge (e.g., "1" or more) indicating unread notifications |
| 8 | Click the notification icon (bell icon) to open the notification panel | — | Notification panel opens showing list of notifications |
| 9 | Verify that a notification for PR rejection is present in the list | `{TD.prNumberRejected}` | Notification is displayed indicating PR `{TD.prNumberRejected}` has been rejected |
| 10 | Verify the notification message content includes PR number and rejection status | — | Notification message includes: PR number `{TD.prNumberRejected}` and status "Rejected" |
| 11 | Verify the notification message includes or provides access to the rejection comments from the approver | — | Notification message displays or provides link to rejection comments `{TD.rejectionComments}` |
| 12 | Click the notification to view details or navigate to the PR | — | System navigates to the PR display or shows notification details with rejection comments |
| 13 | Verify the PR status is "Rejected" | — | PR status reflects rejection |
| 14 | Verify the Approval History section shows the rejection action with approver name and comments | — | Approval history displays approver name, action "Rejected", timestamp, and comments `{TD.rejectionComments}` |
| 15 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 16 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 17 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Requisitioner receives a notification in Fiori Launchpad upon PR rejection
- Notification is visible in the notification panel (bell icon) with unread badge
- Notification message includes PR number and rejection status
- Notification provides access to rejection comments from the approver
- Requisitioner can navigate to the PR from the notification to view full rejection details and comments
- Integration between PR approval workflow and Fiori notification system is functioning correctly

---

### ACs Validated

- AC-6: The requisitioner receives a notification when the requisition is fully approved or rejected.

---

### Notes

- This test case validates the integration between PR approval workflow and Fiori notification system for rejection
- Test requires a PR to be created, submitted for approval, and rejected by approver first (dependency on HP-01 or HP-02 + approver rejection action from TC-CS-180)
- Test requires multi-session orchestration: requisitioner creates PR → approver rejects → requisitioner logs in to verify notification
- Notification delivery mechanism may vary: Fiori notification panel, email notification, or both (tenant-specific configuration)
- Notification delivery timing may vary based on workflow configuration (immediate vs. batch processing)
- Recommended for scriptless execution due to external notification checking complexity
- Automation may require email notification checking or Fiori notification panel inspection (if accessible via API)
