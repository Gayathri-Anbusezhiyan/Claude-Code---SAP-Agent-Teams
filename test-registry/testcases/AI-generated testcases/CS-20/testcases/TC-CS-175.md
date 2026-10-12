---

## TC-CS-175: Create Purchase Requisition Requiring Multi-Level Approval for High-Value GMP-Critical Material

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialIdHighValue}` is created, released, configured for plant `{TD.plant}`, and flagged as GMP-critical |
| P4 | Configuration | Release strategy is configured for high-value PR requiring multi-level approval (e.g., manager + director) |
| P5 | Configuration | First-level approver `{TD.approverLevel1UserId}` and second-level approver `{TD.approverLevel2UserId}` have authorization for PR approval and active Fiori My Inbox app |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-HP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdHighValue}` | High-value GMP-critical material number — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quantity | `{TD.quantityHighValue}` | Numeric quantity to requisition (results in high total value) — entered by the user | Valid |
| Price per Unit | `{TD.pricePerUnitHighValue}` | Estimated price per unit (high price) — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Required delivery date — entered by the user | Valid |
| Purchasing Organization | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |
| First-Level Approver | `{TD.approverLevel1UserId}` | First approver user ID for workflow routing | Valid |
| Second-Level Approver | `{TD.approverLevel2UserId}` | Second approver user ID for workflow routing | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Purchase Requisition" | — | Search results appear listing the "Create Purchase Requisition" application |
| 8 | Click "Create Purchase Requisition" from the search results | — | Create Purchase Requisition application opens |
| 9 | In the PR creation form, enter Material ID in the Material field | `{TD.materialIdHighValue}` | Material ID value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescHighValue}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 11 | In the Plant field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is confirmed; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 13 | In the Quantity field, enter the requisition quantity | `{TD.quantityHighValue}` | Quantity is populated |
| 14 | In the Price field, enter the price per unit | `{TD.pricePerUnitHighValue}` | Price is populated; total value is calculated and displayed (high value) |
| 15 | Press Enter to confirm the price entry | — | Price is confirmed; total value is updated to reflect high-value requisition |
| 16 | In the Delivery Date field, enter the required delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 17 | Click the "Submit" or "Order" button to submit the PR | — | SAP processes the PR submission |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed with the PR number |
| 19 | Note the PR number from the success message | — | PR number is displayed (10-digit format starting with "10") |
| 20 | Navigate to the PR list or display the PR details | — | PR is displayed with status "Not Released" or "In Approval" |
| 21 | Verify that Release Strategy field shows a multi-level strategy code assigned | — | Release strategy code (e.g., "02" for multi-level) is displayed, indicating multi-level approval workflow triggered |
| 22 | Verify the Approval Status shows "In Approval" or "Awaiting Multi-Level Approval" | — | Status indicates PR is routed for multi-level approval chain |
| 23 | Verify the Approval History section shows pending approval steps for both approval levels | — | Approval history displays first-level and second-level approver names with status "Pending" |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Purchase Requisition is successfully created with a unique PR number
- Release strategy for multi-level approval is automatically determined based on high PR total value and GMP-critical material type
- PR status is "In Approval" with multi-level approval workflow active
- Approval history shows both first-level and second-level approvers as pending
- PR cannot be converted to PO until all approval levels are completed
- Both approvers receive task notifications in Fiori My Inbox (verified in INT-01)

---

### ACs Validated

- AC-1: The user can access the "Create Purchase Requisition" Fiori app.
- AC-2: The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type.
- AC-3: The requisition cannot be converted into a Purchase Order until all required approval steps are completed.
- AC-4: Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision.
- AC-5: The system displays the current approval status and history on the requisition.
- AC-6: The requisitioner receives a notification when the requisition is fully approved or rejected.

---

### Notes

- This test case covers the critical happy path for high-value GMP-critical material PR creation requiring multi-level approval
- Multi-level approval chain execution is validated separately in TC-CS-177 (AP-02)
- Requisitioner notification is validated in TC-CS-190 (INT-02) after all approvals are completed
