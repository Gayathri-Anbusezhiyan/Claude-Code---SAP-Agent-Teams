---

## TC-CS-187: Attempt to Create Purchase Requisition with Zero Price per Unit

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

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to requisition — entered by the user | Valid |
| Price per Unit | `{TD.zeroPrice}` | Zero price (0 or 0.00) — entered by the user | Invalid (boundary zero value) |
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
| 11 | In the Plant field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is confirmed; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 13 | In the Quantity field, enter the requisition quantity | `{TD.quantity}` | Quantity is populated |
| 14 | In the Price field, enter zero price | `{TD.zeroPrice}` | Price "0" or "0.00" is entered; total value is calculated as zero |
| 15 | Press Enter to confirm the price entry | — | SAP validates the price value |
| 16 | Observe the system response for Price validation | — | One of the following occurs: (a) System displays a warning or error message indicating zero price is not allowed or requires justification, (b) System accepts zero price with warning, or (c) System accepts zero price without warning (tenant-specific behavior) |
| 17 | In the Delivery Date field, enter the required delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 18 | Click the "Submit" or "Order" button to attempt PR submission | — | SAP validates all fields before submission |
| 19 | Observe the system response for PR submission | — | One of the following occurs: (a) System prevents submission and displays error message (e.g., "Price must be greater than 0"), (b) System allows submission with zero price (if zero-price PRs are permitted by configuration), or (c) System displays warning but allows submission |
| 20 | If PR is created, note the PR number and verify the price is stored as zero | — | If submission succeeds: PR number is displayed; total value is zero; release strategy determination may be affected by zero total value |
| 21 | If PR is NOT created, verify the error message highlights the Price field | — | If submission fails: Price field is highlighted as invalid; no PR number is generated |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System behavior for zero price depends on tenant configuration:
  - **Most likely outcome:** SAP displays an error or warning message and prevents PR submission with zero price
  - **Alternative outcome:** SAP allows PR creation with zero price if configuration permits (e.g., for certain material types or PR types)
- If zero price is rejected: Price field is highlighted as invalid; no PR is created
- If zero price is accepted: PR is created with total value zero; release strategy determination is based on zero value (typically no approval required for zero-value PRs)

---

### ACs Validated

- AC-2: The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type.

---

### Notes

- This test case validates the zero boundary value handling for the Price parameter
- Zero price behavior is tenant-specific and may vary based on SAP configuration
- Most SAP systems reject zero price for PRs requiring approval, but some configurations allow it for specific scenarios
- Test outcome should be documented based on actual tenant behavior during test execution
- Automation viable with conditional assertions based on tenant configuration
