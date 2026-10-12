---

## TC-CS-176: Approver Sends Purchase Requisition Back for Revision

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Approver with SAP authorization to approve/reject/send back purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for approver are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberForRevision}` exists with status "In Approval" and is assigned to the approver for action |
| P4 | Fiori My Inbox | Approver has access to Fiori My Inbox app with PR approval task visible |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberForRevision}` | Existing PR number in approval status — to be sent back | Valid |
| Approver Comments | `{TD.revisionComments}` | Comments entered by approver explaining revision request | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "My Inbox" | — | Search results appear listing the "My Inbox" application |
| 8 | Click "My Inbox" from the search results | — | My Inbox application opens showing list of pending approval tasks |
| 9 | Locate the PR approval task for PR number `{TD.prNumberForRevision}` in the task list | `{TD.prNumberForRevision}` | PR approval task is displayed with PR number, requisitioner name, and total value |
| 10 | Click the PR approval task to open the task details | — | Task detail view opens showing PR header and line item information |
| 11 | Review the PR details (material, quantity, price, total value) | — | PR details are displayed for review |
| 12 | Click the "Send Back" or "Return for Revision" button | — | A comment dialog or text field appears for entering revision comments |
| 13 | In the Comments field, enter the revision request reason | `{TD.revisionComments}` | Comments are entered explaining why the PR is being sent back |
| 14 | Click the "Confirm" or "Submit" button to finalize the send-back action | — | SAP processes the send-back action |
| 15 | Observe the on-screen confirmation response | — | A success message is displayed indicating the PR has been sent back for revision |
| 16 | Navigate back to the My Inbox task list | — | The PR approval task is removed from the pending task list |
| 17 | Navigate to the PR display or list to verify the PR status | `{TD.prNumberForRevision}` | PR status is updated to "Sent Back" or "Revision Required" |
| 18 | Verify the Approval History section shows the send-back action with approver name and comments | — | Approval history displays approver name, action "Sent Back", timestamp, and comments `{TD.revisionComments}` |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Approver successfully sends the PR back for revision with comments
- PR status is updated to "Sent Back" or "Revision Required"
- Approval workflow is paused; PR is no longer in the approver's pending task list
- Approval history records the send-back action with approver name, timestamp, and comments
- Requisitioner receives notification that PR was sent back for revision (verified in INT-03)
- PR cannot be converted to PO until revisions are made and resubmitted for approval

---

### ACs Validated

- AC-4: Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision.
- AC-5: The system displays the current approval status and history on the requisition.
- AC-6: The requisitioner receives a notification when the requisition is fully approved or rejected.

---

### Notes

- This test case covers the alternative path where an approver sends a PR back for revision instead of approving or rejecting
- Requisitioner notification upon send-back is validated separately in TC-CS-191 (INT-03)
- Test requires approver role credentials and multi-session orchestration (requisitioner creates PR, then approver logs in to send back)
- Recommended for scriptless execution due to role-switching complexity
