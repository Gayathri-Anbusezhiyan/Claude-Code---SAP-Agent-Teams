---

## TC-CS-189: Verify Fiori My Inbox Task Creation and Delivery to Approver for Purchase Requisition

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Approver with SAP authorization to approve purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for approver are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberForApproval}` exists with status "In Approval" and requires the approver's action |
| P4 | Integration | Fiori My Inbox app is configured and active for PR approval workflow |
| P5 | Configuration | Workflow is configured to route PR approval tasks to Fiori My Inbox |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberForApproval}` | Existing PR number in approval status — task should be in approver's inbox | Valid |
| Approver User ID | `{TD.approverUserId}` | Approver user ID for task assignment | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the approver email address in the email field | `{ENV.SAP_APPROVER_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the approver password in the password field | `{ENV.SAP_APPROVER_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Verify that the "My Inbox" tile shows a task count badge (e.g., "1" or more) | — | My Inbox tile displays a badge indicating pending approval tasks |
| 8 | Click the search icon (top-right shell bar) and type "My Inbox" | — | Search results appear listing the "My Inbox" application |
| 9 | Click "My Inbox" from the search results | — | My Inbox application opens showing list of pending approval tasks |
| 10 | Verify the PR approval task for PR number `{TD.prNumberForApproval}` is present in the task list | `{TD.prNumberForApproval}` | PR approval task is displayed in the task list with PR number, requisitioner name, and total value |
| 11 | Verify the task displays relevant PR details in the task list view (PR number, requisitioner, total value, priority) | — | Task list entry shows: PR number `{TD.prNumberForApproval}`, requisitioner name, total PR value, and priority indicator |
| 12 | Verify the task status is "Ready" or "New" (pending approver action) | — | Task status indicates it is ready for approval action |
| 13 | Click the PR approval task to open the task details | — | Task detail view opens showing full PR header and line item information |
| 14 | Verify the task detail view displays the PR header information (Material, Quantity, Price, Plant, Total Value) | — | Task detail view shows all PR header and line item details for review |
| 15 | Verify the task detail view provides action buttons (Approve, Reject, Send Back) | — | Action buttons are displayed: "Approve", "Reject", and "Send Back" (or equivalent) |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Fiori My Inbox app is accessible to the approver
- PR approval task is successfully created and delivered to the approver's My Inbox
- Task displays relevant PR details (PR number, requisitioner name, total value, priority)
- Task status is "Ready" or "New" (pending approver action)
- Task detail view provides full PR information for review
- Action buttons (Approve, Reject, Send Back) are available for approver to take action
- Integration between PR approval workflow and Fiori My Inbox is functioning correctly

---

### ACs Validated

- AC-4: Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision.

---

### Notes

- This test case validates the integration between PR approval workflow and Fiori My Inbox
- Test requires a PR to be created and submitted for approval first (dependency on HP-01 or HP-02)
- Test requires approver role credentials and multi-session orchestration (requisitioner creates PR, then approver logs in to verify task)
- Automation viable with approver login fixtures and My Inbox task list assertions
- Task notification delivery timing may vary based on workflow configuration (immediate vs. batch processing)
