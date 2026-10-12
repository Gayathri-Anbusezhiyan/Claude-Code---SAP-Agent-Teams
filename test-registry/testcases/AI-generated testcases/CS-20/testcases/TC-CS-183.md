---

## TC-CS-183: Attempt to Submit Purchase Requisition with Missing Plant Field

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created and released in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Plant | `{TD.emptyValue}` | Plant field is left blank (not entered) | Invalid (missing mandatory field) |
| Quantity | `{TD.quantity}` | Numeric quantity to requisition — entered by the user | Valid |
| Price per Unit | `{TD.pricePerUnit}` | Estimated price per unit — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Required delivery date — entered by the user | Valid |

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
| 11 | Leave the Plant field blank (do not enter any value) | `{TD.emptyValue}` | Plant field remains empty |
| 12 | In the Quantity field, enter the requisition quantity | `{TD.quantity}` | Quantity is populated |
| 13 | In the Price field, enter the price per unit | `{TD.pricePerUnit}` | Price is populated |
| 14 | Press Enter to confirm the price entry | — | Price is confirmed |
| 15 | In the Delivery Date field, enter the required delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 16 | Click the "Submit" or "Order" button to attempt PR submission | — | SAP validates all mandatory fields before submission |
| 17 | Observe the system response | — | System prevents submission and displays error message indicating the Plant field is mandatory (e.g., "Enter a plant" or "Plant is a required field") |
| 18 | Verify that the Plant field is highlighted as mandatory with error indicator | — | Plant field is highlighted with red border or error indicator |
| 19 | Verify that no PR number is generated | — | No success message is displayed; no PR is created |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the missing Plant field and prevents PR submission
- Error message is displayed indicating the Plant field is mandatory
- Plant field is highlighted as required with error indicator
- No Purchase Requisition is created
- No PR number is generated
- System enforces mandatory field validation before allowing PR creation

---

### ACs Validated

- AC-1: The user can access the "Create Purchase Requisition" Fiori app.

---

### Notes

- This test case validates that SAP enforces mandatory field validation for the Plant field
- Missing Plant field prevents PR creation and approval workflow initiation
- Error message text may vary depending on SAP release and configuration (e.g., "Enter a plant", "Plant is required", or similar)
- Automation viable with error message assertion or field error state detection
