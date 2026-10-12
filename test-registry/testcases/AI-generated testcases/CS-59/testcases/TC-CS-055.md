# TC-CS-055: Attempt rework order creation for batch with QA disposition rejecting rework

**User Story:**          [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning + Quality Management (PP + QM)
**Feature:**             Rework Order Creation for Failed Batches
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create rework process orders (authorization object PP_ORDER) and access quality management data (authorization object QM_INSP) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` with batch management active |
| P4 | Master Data | Batch `{TD.batchNumberRejectedDisposition}` exists for material `{TD.materialId}` at plant `{TD.plant}` with available quantity greater than zero |
| P5 | Configuration | Order Type `{TD.orderType}` is configured in SAP as a rework order type (e.g., ZRW1) with appropriate control parameters |
| P6 | Configuration | Rework Procedure/Recipe `{TD.reworkProcedure}` is maintained in recipe management and approved for use |
| P7 | Quality Management | Batch `{TD.batchNumberRejectedDisposition}` has a documented QA disposition with status rejecting rework (Usage Decision = "Scrap" or "Return to Vendor" or "Blocked" — any disposition that does NOT approve rework) |
| P8 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-59/CS-59-testdata.json` — Dataset ID: `TD-CS-059-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Order Type | `{TD.orderType}` | Order type code designated for rework orders — selected by the user | Valid |
| Batch Number | `{TD.batchNumberRejectedDisposition}` | Batch that has QA disposition explicitly rejecting rework (e.g., "Scrap") — entered by the user | Invalid — QA Disposition Rejects Rework |
| Material ID | `{TD.materialId}` | Material master number for the batch — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Rework quantity in base UoM — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Rework Procedure | `{TD.reworkProcedure}` | Approved rework recipe/master recipe code — selected by the user | Valid |
| Rework Justification | `{TD.reworkJustification}` | Free text documenting the approved rework reason — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Process Order" | — | Search results appear listing the "Create Process Order" application |
| 8 | Click "Create Process Order" from the search results | — | Create Process Order application opens in creation mode |
| 9 | In the "Order Type" field, enter or select the rework order type | `{TD.orderType}` | Order type value is entered into the field |
| 10 | Press Enter to confirm the Order Type entry | — | SAP validates the order type; order type-specific fields and controls are displayed |
| 11 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` and unit of measure `{TD.uom}` are auto-populated |
| 13 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 14 | Press Enter to confirm the Plant entry | — | SAP validates the plant; company code `{TD.companyCode}` and MRP controller `{TD.productionScheduler}` are auto-populated |
| 15 | In the "Batch" field (header or operations section), enter the batch number with rejected QA disposition | `{TD.batchNumberRejectedDisposition}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch and retrieves QA disposition status |
| 17 | Observe the system response after batch validation | — | System displays an error message indicating that the QA disposition for this batch does not approve rework or that the batch is not eligible for rework order creation |
| 18 | Verify that the error message is specific and identifies the QA disposition rejection | `{TD.qaDispositionRejectedStatus}` | Error message reads similar to: "QA disposition does not approve rework for batch {TD.batchNumberRejectedDisposition}" or "Usage decision is Scrap; rework order not allowed" or "Batch is not eligible for rework" |
| 19 | Attempt to proceed by entering remaining fields (Quantity, Recipe, Justification) | `{TD.quantity}`, `{TD.reworkProcedure}`, `{TD.reworkJustification}` | Fields are populated but error remains active |
| 20 | Attempt to click the "Save" or "Create" button | — | System prevents order creation; the "Save" or "Create" button may be disabled, or clicking it triggers the same error message |
| 21 | Verify that no rework order is created in the system | — | No success message is displayed; no rework order number is generated |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents rework order creation for batch `{TD.batchNumberRejectedDisposition}` due to QA disposition rejecting rework
- System displays a specific error message indicating that the QA disposition status (e.g., "Scrap", "Return to Vendor", "Blocked") does not approve rework and that a rework order cannot be created
- No rework order number is generated
- The batch validation check enforces the regulatory control that rework orders can only be initiated for batches with QA disposition explicitly approving rework
- User is informed of the validation failure and no data is persisted

---

### Post-conditions

- No SAP Rework Order document is created
- Batch `{TD.batchNumberRejectedDisposition}` remains unchanged in the system with its original QA disposition status
- No batch genealogy records are created
- No QM inspection lots are created
- No application-level errors or system inconsistencies remain

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
