# TC-CS-053: Create rework order for approved batch with full traceability and QM inspection

**User Story:**          [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning + Quality Management (PP + QM)
**Feature:**             Rework Order Creation for Failed Batches
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create rework process orders (authorization object PP_ORDER) and access quality management data (authorization object QM_INSP) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` with batch management active |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` at plant `{TD.plant}` with available quantity greater than zero |
| P5 | Configuration | Order Type `{TD.orderType}` is configured in SAP as a rework order type (e.g., ZRW1) with appropriate control parameters |
| P6 | Configuration | Rework Procedure/Recipe `{TD.reworkProcedure}` is maintained in recipe management and approved for use |
| P7 | Quality Management | Batch `{TD.batchNumber}` has a documented QA disposition with status approving rework (Usage Decision = "Rework Approved") |
| P8 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-59/CS-59-testdata.json` — Dataset ID: `TD-CS-059-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Order Type | `{TD.orderType}` | Order type code designated for rework orders — selected by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Original batch that failed final inspection and has QA disposition approving rework — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number for the batch — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Rework quantity in base UoM — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Rework Procedure | `{TD.reworkProcedure}` | Approved rework recipe/master recipe code — selected by the user | Valid |
| Rework Justification | `{TD.reworkJustification}` | Free text documenting the approved rework reason and original failure — entered by the user | Valid |

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
| 15 | In the "Batch" field (header or operations section), enter the original Batch Number | `{TD.batchNumber}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch status `{TD.originalBatchStatus}` and QA disposition status `{TD.qaDispositionStatus}` are retrieved and displayed or verified in the background |
| 17 | Verify that the QA Disposition status indicates rework is approved | `{TD.qaDispositionStatus}` | System displays QA disposition approving rework (e.g., "Rework Approved" or usage decision code indicating rework eligibility) |
| 18 | In the "Quantity" field, enter the rework quantity | `{TD.quantity}` | Quantity is populated in the order header or operations line |
| 19 | Press Enter to confirm the Quantity entry | — | Quantity is confirmed; system validates quantity is within available batch quantity |
| 20 | In the "Recipe" or "Master Recipe" field, enter or select the approved rework procedure | `{TD.reworkProcedure}` | Rework procedure code is entered or selected |
| 21 | Press Enter to confirm the Recipe entry | — | SAP validates the recipe; recipe description and operations are loaded into the order |
| 22 | In the "Rework Justification" or "Long Text" field, enter the rework justification text | `{TD.reworkJustification}` | Rework justification text is entered, documenting the original failure and approved rework basis |
| 23 | Click the "Save" or "Create" button (primary action) in the toolbar | — | SAP begins processing the rework order creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated rework order number |
| 25 | Note the rework order number from the success message or the header area | — | Rework order number is displayed (12-digit format, e.g., 000001234567) |
| 26 | Verify that the rework order status is displayed | `{TD.reworkOrderStatus}` | Rework order status shows "CRTD" (Created) or "REL" (Released) depending on configuration |
| 27 | Navigate to the batch details or batch genealogy transaction (e.g., "Display Batch" or batch where-used report) | — | Batch genealogy screen or batch details are displayed |
| 28 | Search for the original batch number and verify batch genealogy linkage | `{TD.batchNumber}` | Batch genealogy record shows linkage between original batch `{TD.batchNumber}` and reworked batch `{TD.reworkedBatchNumber}` (system-generated or assigned during rework order confirmation) |
| 29 | Verify that the batch genealogy record documents the rework relationship | — | Batch where-used list or genealogy report shows the original failed batch as the predecessor/source and the reworked batch as the successor/result |
| 30 | Navigate to the quality inspection lot creation screen or QM worklist (e.g., "Display Inspection Lot" or QM03) | — | Quality inspection lot screen or worklist is displayed |
| 31 | Search for inspection lots related to material `{TD.materialId}` and batch `{TD.reworkedBatchNumber}` | `{TD.materialId}`, `{TD.reworkedBatchNumber}` | Inspection lot list is displayed showing inspection lots for the material and batch |
| 32 | Verify that a QM inspection lot has been auto-created for the reworked batch | `{TD.inspectionLotNumber}` | A new inspection lot with number `{TD.inspectionLotNumber}` is displayed, linked to the reworked batch and rework order |
| 33 | Verify that the inspection lot has the same inspection plan or quality control requirements as standard production batches | — | Inspection lot details show inspection plan, inspection characteristics, and sampling procedures consistent with standard production requirements for the material |
| 34 | Navigate to the batch record or batch master data display (e.g., MSC3N or "Display Batch Master") | — | Batch master display screen is shown |
| 35 | Open the batch record for the reworked batch | `{TD.reworkedBatchNumber}` | Batch master details and batch classification/characteristics are displayed |
| 36 | Verify that the batch record documents the original failure | — | Batch record contains reference to original batch `{TD.batchNumber}` and documents the original failure reason (from QA disposition or batch history) |
| 37 | Verify that the batch record documents the approved rework justification | `{TD.reworkJustification}` | Batch record or batch text/notes field shows the rework justification text entered in step 22 |
| 38 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 39 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 40 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Rework Order number is generated by SAP and displayed in the confirmation message (12-digit format)
- The rework order is persisted in SAP with order type `{TD.orderType}` and status "CRTD" or "REL"
- All header data (Material, Plant, Batch, Quantity, Recipe, Rework Justification) is correctly stored in the rework order
- Batch genealogy record is created in SAP system tables (MCH_WHO_MAT, MCH_IBASE) linking the original batch `{TD.batchNumber}` to the reworked batch `{TD.reworkedBatchNumber}`
- A QM inspection lot is auto-created for the reworked batch with inspection plan and quality control requirements matching standard production
- The batch record for the reworked batch documents both the original failure reason and the approved rework justification text
- The rework order can be released and executed following the standard production order workflow

---

### Post-conditions

- SAP Rework Order document exists with the generated rework order number
- Rework order status is "CRTD" (Created) or "REL" (Released)
- Material, batch, quantity, plant, recipe, and rework justification data are correctly recorded on the rework order
- Batch genealogy linkage exists between original batch and reworked batch
- QM inspection lot exists for the reworked batch with appropriate inspection plan
- Batch record contains documentation of original failure and approved rework justification
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
