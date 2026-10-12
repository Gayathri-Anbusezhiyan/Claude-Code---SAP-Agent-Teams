---

## TC-CS-177: Multi-Step Approval Chain with First Approver Approved and Second Approver Pending

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
| P1 | User Role | First-level approver has the role of Manager with SAP authorization to approve purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for first-level approver are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberMultiLevel}` exists requiring multi-level approval; status is "In Approval" and assigned to first-level approver |
| P4 | Configuration | Multi-level release strategy is active; second-level approver `{TD.approverLevel2UserId}` is configured for the next approval step |
| P5 | Fiori My Inbox | First-level approver has access to Fiori My Inbox app with PR approval task visible |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberMultiLevel}` | Existing PR number requiring multi-level approval | Valid |
| First-Level Approver Comments | `{TD.approvalCommentsLevel1}` | Comments entered by first-level approver | Valid |
| Second-Level Approver | `{TD.approverLevel2UserId}` | Second-level approver user ID for workflow routing | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the first-level approver email address in the email field | `{ENV.SAP_APPROVER_L1_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the first-level approver password in the password field | `{ENV.SAP_APPROVER_L1_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "My Inbox" | — | Search results appear listing the "My Inbox" application |
| 8 | Click "My Inbox" from the search results | — | My Inbox application opens showing list of pending approval tasks |
| 9 | Locate the PR approval task for PR number `{TD.prNumberMultiLevel}` in the task list | `{TD.prNumberMultiLevel}` | PR approval task is displayed with PR number, requisitioner name, and total value |
| 10 | Click the PR approval task to open the task details | — | Task detail view opens showing PR header and line item information |
| 11 | Review the PR details (material, quantity, price, total value) | — | PR details are displayed for review |
| 12 | In the Comments field (if available), enter approval comments | `{TD.approvalCommentsLevel1}` | Comments are entered (optional) |
| 13 | Click the "Approve" button to approve the PR at first level | — | SAP processes the first-level approval action |
| 14 | Observe the on-screen confirmation response | — | A success message is displayed indicating the PR has been approved at the first level |
| 15 | Navigate back to the My Inbox task list | — | The PR approval task is removed from the first-level approver's pending task list |
| 16 | Navigate to the PR display or list to verify the PR status | `{TD.prNumberMultiLevel}` | PR status remains "In Approval" or "Partially Released" (not yet fully approved) |
| 17 | Verify the Approval History section shows the first-level approval action | — | Approval history displays first-level approver name, action "Approved", timestamp, and comments `{TD.approvalCommentsLevel1}` |
| 18 | Verify the Approval History section shows the second-level approval step as "Pending" | — | Approval history displays second-level approver name `{TD.approverLevel2Name}` with status "Pending" |
| 19 | Verify that the PR cannot be converted to PO yet | — | PO conversion action is not available or blocked with message indicating approval is incomplete |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- First-level approver successfully approves the PR
- PR status is updated to "Partially Released" or remains "In Approval" with first level completed
- Approval history records the first-level approval with approver name, timestamp, and comments
- Second-level approval step remains pending; PR is now in the second-level approver's My Inbox task list
- PR cannot be converted to PO until second-level approval is completed
- Second-level approver receives task notification in Fiori My Inbox (verified in INT-01)

---

### ACs Validated

- AC-4: Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision.
- AC-5: The system displays the current approval status and history on the requisition.

---

### Notes

- This test case covers the alternative path where a multi-level approval chain is partially completed (first level approved, second level pending)
- Second-level approver task notification is validated separately in TC-CS-189 (INT-01)
- Full multi-level approval completion is covered in TC-CS-175 (HP-02)
- Test requires first-level approver role credentials and multi-session orchestration
- Recommended for scriptless execution due to role-switching complexity
