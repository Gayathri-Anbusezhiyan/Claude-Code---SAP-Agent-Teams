# TC-CS-035: Verify SD-MM Integration — Batch Status Validation from MCH1 (Batch Master)

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Sales Order | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains batch-managed material `{TD.materialId}` |
| P4 | Delivery | Delivery document `{TD.deliveryNumber}` exists with goods issue posted |
| P5 | Batch Master | Batch `{TD.batchNumber}` exists in MM module (MCH1 table) with batch status Unrestricted (VFZST blank, VFDAT not expired) |
| P6 | Quality Inspection | Inspection lot `{TD.inspectionLotNumber}` exists with usage decision status 'Accepted' |
| P7 | SD-MM Integration | SD billing process is configured to read batch status from MM batch master data (MCH1) via standard SAP SD-MM integration |
| P8 | Configuration | Batch management is enabled for material `{TD.materialId}`; batch status validation is enforced for billing |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumber}` | Valid delivery document | Valid |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |
| Batch Number | `{TD.batchNumber}` | MM batch master with Unrestricted status | Valid |

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
| 7 | PREREQUISITE VERIFICATION: Navigate to "Display Batch" application (MSC3N equivalent) via search | — | Display Batch application opens |
| 8 | Search for batch number and material | `{TD.batchNumber}`, `{TD.materialId}` | Batch is displayed with status Unrestricted; restriction indicator (VFZST) is blank; shelf-life expiration date (VFDAT) is not expired |
| 9 | Note the batch status and restriction indicators | — | Batch status is confirmed as Unrestricted (available for billing) |
| 10 | Navigate back to Fiori home | — | Fiori home page is displayed |
| 11 | Click the search icon (top-right shell bar) and type "Create Billing Document" | — | Search results appear listing the Create Billing Document application |
| 12 | Click "Create Billing Document" from the search results | — | Create Billing Document application opens (VF01) |
| 13 | In the "Billing Type" field, enter the billing type | `{TD.billingType}` | Billing type is entered (F2) |
| 14 | Press Enter to confirm the billing type | — | Billing type is confirmed; additional fields become available |
| 15 | In the "Billing Date" field, enter the billing date | `{TD.billingDate}` | Billing date is entered |
| 16 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumber}` | Delivery number is entered |
| 17 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is loaded |
| 18 | Observe SD-MM integration: SAP performs batch status lookup from MCH1 table for batch `{TD.batchNumber}` | — | SAP SD module reads batch restriction indicator (VFZST) and shelf-life expiration date (VFDAT) from MM module (MCH1); integration query is successful |
| 19 | Verify that batch status validation passes | — | SAP confirms batch `{TD.batchNumber}` has Unrestricted status (VFZST blank, VFDAT not expired); no batch restriction error is displayed |
| 20 | Verify that the line items section shows the material, batch, and billing quantity | — | Line items table displays material number, batch number, and billing quantity; batch data is correctly integrated from MM module |
| 21 | Verify that net value is calculated and displayed | — | Net value is calculated and displayed in the header |
| 22 | Click the "Save" button in the toolbar | — | SAP processes the billing document creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated billing document number |
| 24 | Note the billing document number from the success message | — | Billing document number is displayed (format: 10-digit numeric beginning with 9) |
| 25 | Navigate to "Display Billing Documents" application via the search bar | — | Display Billing Documents application opens |
| 26 | Search for the newly created billing document using the number noted in step 24 | — | The created billing document appears in the list with status "Posted" |
| 27 | Open the billing document to verify integration details | — | Billing document displays with reference to batch `{TD.batchNumber}` in the item details |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique billing document number is generated by SAP and displayed in the confirmation message
- The billing document is persisted in SAP with document type F2 (Invoice) and status "Posted"
- SD-MM integration successfully reads batch master data from MCH1 table
- Batch status validation passes based on Unrestricted status from MM module
- Billing document references batch `{TD.batchNumber}` demonstrating successful cross-module integration
- No SD-MM integration errors or data retrieval failures occur

---

### Post-conditions

- SAP Billing Document exists with the generated billing document number
- Billing document status is "Posted"
- Billing document is linked to delivery `{TD.deliveryNumber}` and batch `{TD.batchNumber}`
- SD-MM integration demonstrated successful data flow from MM module to SD module
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
