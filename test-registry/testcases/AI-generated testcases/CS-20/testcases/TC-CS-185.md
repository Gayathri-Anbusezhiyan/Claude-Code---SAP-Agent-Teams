---

## TC-CS-185: Create Purchase Requisition with Total Value Exactly at Approval Threshold Boundary

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` |
| P4 | Configuration | Release strategy threshold is configured at specific value `{TD.approvalThresholdValue}` (e.g., $10,000.00) |
| P5 | Configuration | Approver user `{TD.approverUserId}` has authorization for PR approval at threshold boundary |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quantity | `{TD.quantityAtThreshold}` | Quantity calculated to produce total value exactly at approval threshold | Valid (boundary value) |
| Price per Unit | `{TD.pricePerUnitAtThreshold}` | Price per unit calculated to produce total value exactly at approval threshold | Valid (boundary value) |
| Delivery Date | `{TD.deliveryDate}` | Required delivery date — entered by the user | Valid |
| Purchasing Organization | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |
| Approval Threshold Value | `{TD.approvalThresholdValue}` | Configured threshold value for approval determination (e.g., $10,000.00) | Valid (boundary value) |

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
| 13 | In the Quantity field, enter the quantity calculated to reach threshold boundary | `{TD.quantityAtThreshold}` | Quantity is populated |
| 14 | In the Price field, enter the price per unit calculated to reach threshold boundary | `{TD.pricePerUnitAtThreshold}` | Price is populated; total value is calculated and displayed (should equal `{TD.approvalThresholdValue}` exactly) |
| 15 | Press Enter to confirm the price entry | — | Price is confirmed; total value is updated to exactly `{TD.approvalThresholdValue}` |
| 16 | Verify the calculated total value displayed on the form | — | Total value is exactly `{TD.approvalThresholdValue}` (e.g., $10,000.00) |
| 17 | In the Delivery Date field, enter the required delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 18 | Click the "Submit" or "Order" button to submit the PR | — | SAP processes the PR submission |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed with the PR number |
| 20 | Note the PR number from the success message | — | PR number is displayed (10-digit format starting with "10") |
| 21 | Navigate to the PR list or display the PR details | — | PR is displayed |
| 22 | Verify that Release Strategy field shows a strategy code assigned (approval workflow triggered at threshold boundary) | — | Release strategy code is displayed, indicating approval workflow is triggered (threshold boundary inclusive) |
| 23 | Verify the Approval Status shows "In Approval" or "Awaiting Approval" | — | Status indicates PR is routed for approval at the threshold boundary |
| 24 | Verify the total PR value displayed matches the threshold value exactly | — | Total value equals `{TD.approvalThresholdValue}` exactly |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Purchase Requisition is successfully created with a unique PR number
- PR total value is exactly at the approval threshold boundary (e.g., $10,000.00)
- Release strategy is correctly determined at the threshold boundary (approval workflow is triggered)
- PR status is "In Approval" or "Not Released"
- System correctly handles boundary condition and applies approval workflow consistently

---

### ACs Validated

- AC-2: The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type.

---

### Notes

- This test case validates the boundary value handling for approval threshold determination
- Approval threshold configuration is tenant-specific and must be known before test execution
- Test requires precise calculation: Quantity × Price = Threshold Value exactly
- Recommended for scriptless execution due to dependency on tenant-specific threshold configuration visibility
- Automation may require pre-execution configuration inspection to determine the exact threshold value
