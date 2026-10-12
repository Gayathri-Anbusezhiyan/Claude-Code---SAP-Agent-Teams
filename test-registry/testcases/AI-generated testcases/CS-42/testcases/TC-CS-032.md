# TC-CS-032: Create Billing Document with Minimum Billing Quantity (Partial Billing Allowed)

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Sales Order | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains batch-managed material `{TD.materialId}` |
| P4 | Delivery | Delivery document `{TD.deliveryNumberPartial}` exists with goods issue posted for quantity `{TD.deliveryQuantity}` |
| P5 | Batch Assignment | Batch `{TD.batchNumber}` is assigned to delivery line item; batch status is Unrestricted |
| P6 | Quality Inspection | Inspection lot `{TD.inspectionLotNumber}` exists for batch `{TD.batchNumber}` with usage decision status 'Accepted' |
| P7 | Configuration | Partial billing is allowed in system configuration; minimum billing quantity is `{TD.minBillingQuantity}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberPartial}` | Delivery with partial billing scenario | Valid |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |
| Min Billing Quantity | `{TD.minBillingQuantity}` | Minimum valid billing quantity (lower boundary, e.g., 0.001) | Valid (boundary) |
| Delivery Quantity | `{TD.deliveryQuantity}` | Total delivery quantity (higher than min billing quantity) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Billing Document" | — | Search results appear listing the Create Billing Document application |
| 8 | Click "Create Billing Document" from the search results | — | Create Billing Document application opens (VF01) |
| 9 | In the "Billing Type" field, enter the billing type | `{TD.billingType}` | Billing type is entered (F2) |
| 10 | Press Enter to confirm the billing type | — | Billing type is confirmed; additional fields become available |
| 11 | In the "Billing Date" field, enter the billing date | `{TD.billingDate}` | Billing date is entered |
| 12 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumberPartial}` | Delivery number is entered |
| 13 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is loaded; sold-to party is auto-populated; billing quantity defaults to full delivery quantity `{TD.deliveryQuantity}` |
| 14 | In the line items section, locate the billing quantity field | — | Billing quantity field displays the default full delivery quantity |
| 15 | Manually change the billing quantity to the minimum billing quantity | `{TD.minBillingQuantity}` | Minimum billing quantity is entered (e.g., 0.001 or 1 depending on UoM) |
| 16 | Press Enter to confirm the quantity change | — | SAP recalculates net value based on minimum billing quantity |
| 17 | Verify that batch status validation occurs (background check) | — | SAP verifies batch `{TD.batchNumber}` status is Unrestricted; no batch restriction error is displayed |
| 18 | Verify that quality release status validation occurs (background check) | — | SAP verifies inspection lot `{TD.inspectionLotNumber}` usage decision is 'Accepted'; no quality release error is displayed |
| 19 | Verify that net value is calculated and displayed based on minimum quantity | — | Net value is calculated for minimum billing quantity and displayed in the header |
| 20 | Click the "Save" button in the toolbar | — | SAP processes the billing document creation with partial billing quantity |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated billing document number |
| 22 | Note the billing document number from the success message | — | Billing document number is displayed (format: 10-digit numeric beginning with 9) |
| 23 | Navigate to "Display Billing Documents" application via the search bar | — | Display Billing Documents application opens |
| 24 | Search for the newly created billing document using the number noted in step 22 | — | The created billing document appears in the list with status "Posted" |
| 25 | Open the billing document to verify details | — | Billing document displays with partial billing quantity `{TD.minBillingQuantity}` and reference to delivery `{TD.deliveryNumberPartial}` |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique billing document number is generated by SAP and displayed in the confirmation message
- The billing document is persisted in SAP with document type F2 (Invoice) and status "Posted"
- Billing document references the source delivery document `{TD.deliveryNumberPartial}` and billing quantity is `{TD.minBillingQuantity}` (partial billing)
- All batch and quality validation checks passed successfully despite partial billing
- Net value reflects the minimum billing quantity
- Delivery remains partially billed with remaining quantity available for future billing

---

### Post-conditions

- SAP Billing Document exists with the generated billing document number
- Billing document status is "Posted"
- Billing document is linked to delivery `{TD.deliveryNumberPartial}` with partial quantity
- Delivery billing status indicates partial billing completion
- Remaining delivery quantity is still available for subsequent billing documents
- No application-level errors or critical warnings remain outstanding

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
