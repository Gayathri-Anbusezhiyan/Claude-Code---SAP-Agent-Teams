# TC-CS-060: Create rework order with minimum quantity boundary

**User Story:**          [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning + Quality Management (PP + QM)
**Feature:**             Rework Order Creation for Failed Batches
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create rework process orders (authorization object PP_ORDER) and access quality management data (authorization object QM_INSP) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` with batch management active |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` at plant `{TD.plant}` with available quantity greater than or equal to the minimum positive quantity for the unit of measure |
| P5 | Configuration | Order Type `{TD.orderType}` is configured in SAP as a rework order type (e.g., ZRW1) with appropriate control parameters |
| P6 | Configuration | Rework Procedure/Recipe `{TD.reworkProcedure}` is maintained in recipe management and approved for use |
| P7 | Quality Management | Batch `{TD.batchNumber}` has a documented QA disposition with status approving rework (Usage Decision = "Rework Approved") |
| P8 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-59/CS-59-testdata.json` — Dataset ID: `TD-CS-059-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Order Type | `{TD.orderType}` | Order type code designated for rework orders — selected by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Original batch that failed final inspection and has QA disposition approving rework — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number for the batch — entered by the user | Valid |
| Quantity | `{TD.minQuantity}` | Minimum positive quantity value for the unit of measure (e.g., 0.001 for KG, 1 for EA) — entered by the user | Valid — Lower Boundary |
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
| 15 | In the "Batch" field (header or operations section), enter the Batch Number | `{TD.batchNumber}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch status `{TD.originalBatchStatus}` and QA disposition status `{TD.qaDispositionStatus}` are retrieved and displayed or verified in the background |
| 17 | In the "Quantity" field, enter the minimum positive quantity value | `{TD.minQuantity}` | Minimum quantity is populated (e.g., 0.001 KG or 1 EA depending on UoM) |
| 18 | Press Enter to confirm the Quantity entry | — | Quantity is confirmed; system validates quantity is positive and within available batch quantity |
| 19 | In the "Recipe" or "Master Recipe" field, enter or select the approved rework procedure | `{TD.reworkProcedure}` | Rework procedure code is entered or selected |
| 20 | Press Enter to confirm the Recipe entry | — | SAP validates the recipe; recipe description and operations are loaded into the order |
| 21 | In the "Rework Justification" or "Long Text" field, enter the rework justification text | `{TD.reworkJustification}` | Rework justification text is entered |
| 22 | Click the "Save" or "Create" button (primary action) in the toolbar | — | SAP begins processing the rework order creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated rework order number |
| 24 | Note the rework order number from the success message or the header area | — | Rework order number is displayed (12-digit format, e.g., 000001234567) |
| 25 | Verify that the rework order status is displayed | `{TD.reworkOrderStatus}` | Rework order status shows "CRTD" (Created) or "REL" (Released) depending on configuration |
| 26 | Verify that the quantity field in the rework order displays the minimum quantity value | `{TD.minQuantity}` | Order quantity shows the minimum value entered (e.g., 0.001 KG or 1 EA) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Rework Order number is generated by SAP and displayed in the confirmation message (12-digit format)
- The rework order is persisted in SAP with order type `{TD.orderType}` and status "CRTD" or "REL"
- All header data (Material, Plant, Batch, Quantity, Recipe, Rework Justification) is correctly stored in the rework order
- The quantity field correctly reflects the minimum positive quantity value entered (lower boundary validation passes)
- SAP accepts the minimum quantity without displaying errors or warnings related to quantity validation
- The rework order can be further processed following the standard production order workflow

---

### Post-conditions

- SAP Rework Order document exists with the generated rework order number
- Rework order status is "CRTD" (Created) or "REL" (Released)
- Material, batch, quantity (minimum value), plant, recipe, and rework justification data are correctly recorded on the rework order
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
