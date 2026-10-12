---

## TC-CS-179: Attempt to Convert Purchase Requisition to Purchase Order Before All Approvals Completed

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions and convert PRs to POs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | PR Exists | A Purchase Requisition `{TD.prNumberInApproval}` exists with status "In Approval" or "Partially Released"; not all required approval steps are completed |
| P4 | Configuration | Release strategy is active for the PR; approval is not yet complete |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PR Number | `{TD.prNumberInApproval}` | Existing PR number with incomplete approval status | Valid (PR exists but not fully approved) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Requisitions" or "Display Purchase Requisition" | — | Search results appear listing the PR management application |
| 8 | Click the application name from the search results | — | PR management application opens showing list of PRs or PR display screen |
| 9 | Locate and display the PR `{TD.prNumberInApproval}` | `{TD.prNumberInApproval}` | PR details are displayed with status "In Approval" or "Partially Released" |
| 10 | Verify the PR status shows "In Approval" or "Not Released" (not fully approved) | — | Status indicates approval is incomplete |
| 11 | Verify the Approval History section shows pending approval steps | — | Approval history displays one or more approvers with status "Pending" |
| 12 | Attempt to locate and click the "Convert to PO" or "Create PO" button or action | — | System searches for PO conversion action |
| 13 | Observe the system response | — | One of the following occurs: (a) "Convert to PO" button is disabled/grayed out, or (b) button is not visible, or (c) button is visible but triggers an error |
| 14 | If the "Convert to PO" button is clickable, click it | — | SAP attempts to process the PO conversion request |
| 15 | Observe the system error response | — | An error message is displayed indicating the PR cannot be converted to PO because approval is not complete (e.g., "Purchase Requisition is not released" or "Approval is incomplete") |
| 16 | Verify that no PO number is generated | — | No success message is displayed; no PO is created |
| 17 | Verify the PR status remains "In Approval" or "Not Released" | — | PR status is unchanged; PR remains in approval workflow |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP enforces the approval gate and prevents PO conversion before all required approvals are completed
- Error message is displayed indicating the PR cannot be converted to PO because approval is incomplete
- No Purchase Order is created
- PR status remains "In Approval" or "Not Released"
- Approval workflow integrity is maintained; unauthorized spend is prevented

---

### ACs Validated

- AC-3: The requisition cannot be converted into a Purchase Order until all required approval steps are completed.

---

### Notes

- This test case validates the critical financial control mechanism that prevents premature PO conversion
- Failure of this control would result in compliance violation and unauthorized spend
- PO conversion action may be disabled (UI-level control) or trigger an error (backend validation) — both are acceptable outcomes
- Error message text may vary depending on SAP release and configuration
- Test requires a PR to be created and submitted for approval first (dependency on HP-01 or HP-02)
- Automation viable with error message assertion or button state detection
