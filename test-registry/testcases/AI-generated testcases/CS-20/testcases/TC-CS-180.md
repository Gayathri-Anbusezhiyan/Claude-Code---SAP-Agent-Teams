---

## TC-CS-180: Approver Rejects Purchase Requisition with Rejection Comments

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Approver with SAP authorization to approve/reject purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for approver are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberForRejection}` exists with status "In Approval" and is assigned to the approver for action |
| P4 | Fiori My Inbox | Approver has access to Fiori My Inbox app with PR approval task visible |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberForRejection}` | Existing PR number in approval status — to be rejected | Valid |
| Rejection Comments | `{TD.rejectionComments}` | Comments entered by approver explaining rejection reason | Valid |

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
| 9 | Locate the PR approval task for PR number `{TD.prNumberForRejection}` in the task list | `{TD.prNumberForRejection}` | PR approval task is displayed with PR number, requisitioner name, and total value |
| 10 | Click the PR approval task to open the task details | — | Task detail view opens showing PR header and line item information |
| 11 | Review the PR details (material, quantity, price, total value) | — | PR details are displayed for review |
| 12 | Click the "Reject" button | — | A comment dialog or text field appears for entering rejection comments |
| 13 | In the Comments field, enter the rejection reason | `{TD.rejectionComments}` | Comments are entered explaining why the PR is being rejected |
| 14 | Click the "Confirm" or "Submit" button to finalize the rejection action | — | SAP processes the rejection action |
| 15 | Observe the on-screen confirmation response | — | A success message is displayed indicating the PR has been rejected |
| 16 | Navigate back to the My Inbox task list | — | The PR approval task is removed from the pending task list |
| 17 | Navigate to the PR display or list to verify the PR status | `{TD.prNumberForRejection}` | PR status is updated to "Rejected" |
| 18 | Verify the Approval History section shows the rejection action with approver name and comments | — | Approval history displays approver name, action "Rejected", timestamp, and comments `{TD.rejectionComments}` |
| 19 | Verify that the PR cannot be converted to PO | — | PO conversion action is not available; PR is blocked from further processing |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Approver successfully rejects the PR with comments
- PR status is updated to "Rejected"
- Approval workflow is terminated; PR is no longer in the approver's pending task list
- Approval history records the rejection action with approver name, timestamp, and comments
- Requisitioner receives notification that PR was rejected (verified in INT-03)
- PR cannot be converted to PO; PR is blocked from further processing
- Rejected PR may need to be recreated or revised by the requisitioner

---

### ACs Validated

- AC-4: Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision.
- AC-5: The system displays the current approval status and history on the requisition.
- AC-6: The requisitioner receives a notification when the requisition is fully approved or rejected.

---

### Notes

- This test case covers the negative outcome where an approver rejects a PR instead of approving
- Requisitioner notification upon rejection is validated separately in TC-CS-191 (INT-03)
- Test requires approver role credentials and multi-session orchestration (requisitioner creates PR, then approver logs in to reject)
- Automation viable with approver login fixtures and error state assertions
