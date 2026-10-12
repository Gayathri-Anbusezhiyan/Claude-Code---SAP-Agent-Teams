---

## TC-CS-174: Create Purchase Requisition with Single-Level Approval Requirement

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` |
| P4 | Configuration | Release strategy is configured for PR total value range that triggers single-level approval |
| P5 | Configuration | Approver user `{TD.approverUserId}` has authorization for PR approval and active Fiori My Inbox app |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to requisition — entered by the user | Valid |
| Price per Unit | `{TD.pricePerUnit}` | Estimated price per unit — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Required delivery date — entered by the user | Valid |
| Purchasing Organization | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |
| Approver User ID | `{TD.approverUserId}` | User ID of the approver for workflow routing | Valid |

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
| 9 | In the PR creation form, enter Material ID in the Material field | `{TD.materialId}` | Material ID value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 11 | In the Plant field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is confirmed; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 13 | In the Quantity field, enter the requisition quantity | `{TD.quantity}` | Quantity is populated |
| 14 | In the Price field, enter the price per unit | `{TD.pricePerUnit}` | Price is populated; total value is calculated and displayed |
| 15 | Press Enter to confirm the price entry | — | Price is confirmed; total value is updated |
| 16 | In the Delivery Date field, enter the required delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 17 | Click the "Submit" or "Order" button to submit the PR | — | SAP processes the PR submission |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed with the PR number |
| 19 | Note the PR number from the success message | — | PR number is displayed (10-digit format starting with "10") |
| 20 | Navigate to the PR list or display the PR details | — | PR is displayed with status "Not Released" or "In Approval" |
| 21 | Verify that Release Strategy field shows a strategy code assigned | — | Release strategy code (e.g., "01") is displayed, indicating approval workflow triggered |
| 22 | Verify the Approval Status shows "In Approval" or "Awaiting Approval" | — | Status indicates PR is routed for approval |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Purchase Requisition is successfully created with a unique PR number
- Release strategy is automatically determined and assigned based on PR total value and material type
- PR status is "In Approval" or "Not Released" (not yet fully approved)
- PR cannot be converted to PO until approval is completed
- Approver receives task notification in Fiori My Inbox (verified in INT-01)

---

### ACs Validated

- AC-1: The user can access the "Create Purchase Requisition" Fiori app.
- AC-2: The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type.
- AC-3: The requisition cannot be converted into a Purchase Order until all required approval steps are completed.
- AC-5: The system displays the current approval status and history on the requisition.

---

### Notes

- This test case covers the primary happy path for PR creation with single-level approval workflow
- Approver task notification is validated separately in TC-CS-189 (INT-01)
- Requisitioner notification is validated in TC-CS-190 (INT-02) after approval is completed
