---

## TC-CS-188: Create Purchase Requisition with Delivery Date at Minimum Lead Time (Today + 1 Day)

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` |
| P4 | Master Data | Plant `{TD.plant}` is valid and active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to requisition — entered by the user | Valid |
| Price per Unit | `{TD.pricePerUnit}` | Estimated price per unit — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDateMinLeadTime}` | Minimum lead time delivery date (today + 1 day) — entered by the user | Valid (boundary lower limit) |
| Purchasing Organization | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |

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
| 14 | In the Price field, enter the price per unit | `{TD.pricePerUnit}` | Price is populated; total value is calculated |
| 15 | Press Enter to confirm the price entry | — | Price is confirmed; total value is updated |
| 16 | In the Delivery Date field, enter the minimum lead time date (today + 1 day) | `{TD.deliveryDateMinLeadTime}` | Delivery date is populated with tomorrow's date (minimum valid future date) |
| 17 | Click the "Submit" or "Order" button to submit the PR | — | SAP processes the PR submission |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed with the PR number (no error for minimum lead time date) |
| 19 | Note the PR number from the success message | — | PR number is displayed (10-digit format starting with "10") |
| 20 | Navigate to the PR list or display the PR details | — | PR is displayed with delivery date showing tomorrow's date |
| 21 | Verify the Delivery Date field shows tomorrow's date (today + 1 day) | — | Delivery date is correctly stored as tomorrow's date |
| 22 | Verify the Release Strategy is determined correctly based on the total value | — | Release strategy code is displayed (if total value triggers approval) or PR is "Released" (if below threshold) |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Purchase Requisition is successfully created with a unique PR number
- Delivery date at minimum lead time (today + 1 day) is accepted by SAP
- Release strategy is correctly determined based on the total value
- PR status reflects the appropriate approval workflow (if total value triggers approval) or "Released" (if below threshold)
- System correctly handles minimum lead time boundary condition

---

### ACs Validated

- AC-1: The user can access the "Create Purchase Requisition" Fiori app.

---

### Notes

- This test case validates that SAP accepts the minimum valid lead time for delivery date (today + 1 day)
- Lower boundary test for the Delivery Date parameter
- Delivery date = today or in the past is typically invalid and may be tested separately if needed
- Some SAP configurations may allow same-day delivery (today + 0 days) for specific scenarios
- Automation viable with relative date calculation (execution date + 1 day)
