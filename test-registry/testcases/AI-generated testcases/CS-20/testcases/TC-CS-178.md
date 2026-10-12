---

## TC-CS-178: Attempt to Create Purchase Requisition with Invalid Material Type Not Existing in Plant

**User Story:**          [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Requisition Creation with Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.invalidMaterialId}` does NOT exist in SAP or is not configured for plant `{TD.plant}` |
| P4 | Master Data | Plant `{TD.plant}` is valid and active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-20/CS-20-testdata.json` — Dataset ID: `TD-CS-20-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.invalidMaterialId}` | Non-existent or invalid material number — entered by the user | Invalid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
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
| 9 | In the PR creation form, enter the invalid Material ID in the Material field | `{TD.invalidMaterialId}` | Material ID value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP attempts to validate the material |
| 11 | Observe the system response for Material validation | — | An error message is displayed indicating the material does not exist or is not valid for the plant (e.g., "Material does not exist" or "Material not maintained for plant") |
| 12 | Verify that the Material field is highlighted as invalid | — | Material field is highlighted with red border or error indicator |
| 13 | Verify that material description and unit of measure fields remain empty or show error state | — | Auto-populated fields do not fill; fields remain empty or show error state |
| 14 | Attempt to proceed by entering other required fields (Plant, Quantity, Price, Delivery Date) | `{TD.plant}`, `{TD.quantity}`, `{TD.pricePerUnit}`, `{TD.deliveryDate}` | Fields are populated (Plant, Quantity, Price, Delivery Date) |
| 15 | Click the "Submit" or "Order" button to attempt PR submission | — | SAP validates all fields before submission |
| 16 | Observe the system response | — | System prevents submission and displays error message indicating the Material field contains an invalid value |
| 17 | Verify that no PR number is generated | — | No success message is displayed; no PR number is created |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the invalid material and prevents PR creation
- Error message is displayed indicating the material does not exist or is not valid for the specified plant
- Material field is highlighted as invalid with error indicator
- No Purchase Requisition is created
- No PR number is generated
- System enforces material validation as part of the release strategy determination process

---

### ACs Validated

- AC-2: The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type.

---

### Notes

- This test case validates that SAP enforces material master data validation before allowing PR creation
- Invalid material detection prevents incorrect requisitions from entering the approval workflow
- Error message text may vary depending on SAP release and configuration (e.g., "Material does not exist", "Material not maintained for plant", or similar)
- Automation viable with exact error message assertion or error state detection
