# TC-CS-021: Create Billing Document for Delivery with Approved Batch and Released Quality Status

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       HAPPY_PATH  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Sales Order | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains batch-managed material `{TD.materialId}` |
| P4 | Delivery | Delivery document `{TD.deliveryNumber}` exists with goods issue posted; delivery is linked to sales order `{TD.salesOrderNumber}` |
| P5 | Batch Assignment | Batch `{TD.batchNumber}` is assigned to delivery line item; batch status is Unrestricted (not blocked) |
| P6 | Quality Inspection | Inspection lot `{TD.inspectionLotNumber}` exists for batch `{TD.batchNumber}` with usage decision status 'Accepted' / 'Released' |
| P7 | Billing Block | No billing block is set on delivery (LIKP-FAKSK and LIPS-FAKSP are blank) |
| P8 | Configuration | Quality Management (QM) module is active; batch management is enabled for material `{TD.materialId}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Delivery document number — entered by the user | Valid |
| Billing Type | `{TD.billingType}` | Billing document type (F2 = Invoice) — entered by the user | Valid |
| Billing Date | `{TD.billingDate}` | Billing date — entered by the user | Valid |

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
| 12 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumber}` | Delivery number is entered |
| 13 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is loaded; sold-to party `{TD.soldToParty}` is auto-populated in the header |
| 14 | Verify that batch status validation occurs (background check) | — | SAP verifies batch `{TD.batchNumber}` status is Unrestricted; no batch restriction error is displayed |
| 15 | Verify that quality release status validation occurs (background check) | — | SAP verifies inspection lot `{TD.inspectionLotNumber}` usage decision is 'Accepted'; no quality release error is displayed |
| 16 | Verify that the line items section shows the material, batch, and billing quantity | `{TD.materialId}`, `{TD.batchNumber}`, `{TD.billingQuantity}` | Line items table displays material number, batch number, and billing quantity populated from delivery |
| 17 | Verify that net value is calculated and displayed | `{TD.netValue}` | Net value is calculated based on pricing from the source sales order and displayed in the header |
| 18 | Click the "Save" button in the toolbar | — | SAP processes the billing document creation |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated billing document number |
| 20 | Note the billing document number from the success message | — | Billing document number is displayed (format: 10-digit numeric beginning with 9, e.g., 90xxxxxxxx) |
| 21 | Navigate to "Display Billing Documents" application via the search bar | — | Display Billing Documents application opens |
| 22 | Search for the newly created billing document using the number noted in step 20 | — | The created billing document appears in the list with status "Posted" |
| 23 | Open the billing document to verify details | — | Billing document displays with reference to delivery `{TD.deliveryNumber}`, batch `{TD.batchNumber}`, and inspection lot `{TD.inspectionLotNumber}` in the item details |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique billing document number is generated by SAP and displayed in the confirmation message
- The billing document is persisted in SAP with document type F2 (Invoice) and status "Posted"
- Billing document references the source delivery document `{TD.deliveryNumber}`, batch number `{TD.batchNumber}`, and inspection lot `{TD.inspectionLotNumber}`
- All header data (Sold-To Party, Billing Type, Billing Date) is correctly stored
- All line item data (Material, Batch, Billing Quantity, Net Value) is correctly stored
- No batch restriction or quality release validation errors are displayed

---

### Post-conditions

- SAP Billing Document exists with the generated billing document number
- Billing document status is "Posted"
- Billing document is linked to delivery `{TD.deliveryNumber}`
- Batch and quality validation checks passed successfully
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
