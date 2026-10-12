# Test Data Guide: CS-59 — Rework Order Creation for Failed Batches

**Generated:**          2026-08-24
**User Story:**         [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I
**Module:**             PP + QM (Production Planning + Quality Management)
**Feature:**            Rework Order Creation for Failed Batches
**SAP Tenant:**         my426318.s4hana.cloud.sap

---

## Purpose

This guide explains how to substitute real SAP values for the `{{PLACEHOLDER}}` tokens in `CS-59-testdata.json` before executing test cases TC-CS-053 through TC-CS-061.

All placeholders use the format `{{PLACEHOLDER_NAME}}`. Replace each placeholder with an actual value from your SAP system.

---

## Placeholder Mapping Table

| Placeholder Token | Description | How to Find the Value in SAP | Example Value |
|------------------|-------------|------------------------------|---------------|
| `{{ORDER_TYPE_REWORK}}` | Order type code designated for rework orders (e.g., ZRW1) | Navigate to SPRO → Production → Shop Floor Control → Master Data → Order → Define Order Types → Look for order type with category "40" (Process Order) and usage "Rework" | `ZRW1` |
| `{{BATCH_NUMBER_APPROVED_REWORK}}` | Existing batch that failed final inspection and has QA disposition approving rework | Navigate to MSC3N (Display Batch) or QM03 (Display Inspection Lot) → Search for batches with restricted status and usage decision = "Rework Approved" or similar | `1000012345` |
| `{{BATCH_NUMBER_NO_QA_DISPOSITION}}` | Existing batch that has no QA disposition record (no usage decision exists) | Navigate to MSC3N (Display Batch) → Search for batches with no usage decision or inspection lot history | `1000067890` |
| `{{BATCH_NUMBER_QA_DISPOSITION_REJECTED}}` | Existing batch that has QA disposition explicitly rejecting rework (e.g., "Scrap" or "Blocked") | Navigate to MSC3N (Display Batch) or QM03 → Search for batches with usage decision = "Scrap" or "Blocked" or "Return to Vendor" | `1000098765` |
| `{{BATCH_NUMBER_NON_EXISTENT}}` | Batch number that does not exist in SAP batch master | Use a batch number format that matches your SAP tenant but is not assigned to any material (e.g., add "99999" suffix to valid format) | `9999999999` |
| `{{MATERIAL_ID_BATCH_MANAGED}}` | Material master number configured for batch management | Navigate to MM03 (Display Material) → Select a material with batch management view active (e.g., pharmaceutical or chemical material) | `RM-BATCH-001` |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description (auto-populated by SAP after material entry) | SAP retrieves this from material master — no manual entry required | `Raw Material for Rework` |
| `{{REWORK_QUANTITY_STANDARD}}` | Standard rework quantity in base UoM (positive, within batch available quantity) | Use a quantity greater than 0 and less than or equal to batch available quantity (check batch stock via MMBE or MSC3N) | `10` |
| `{{REWORK_QUANTITY_MINIMUM}}` | Minimum positive quantity for the unit of measure (lower boundary test) | Use the smallest positive decimal allowed by the UoM (e.g., 0.001 for KG, 1 for EA) | `0.001` or `1` |
| `{{UNIT_OF_MEASURE}}` | Unit of measure for the material (auto-populated by SAP) | SAP retrieves this from material master base UoM — no manual entry required | `KG` or `EA` |
| `{{PLANT_CODE}}` | Production plant code where rework order will be created | Navigate to OX10 (Display Plant) or use existing plant codes from your SAP organizational structure | `1710` |
| `{{COMPANY_CODE}}` | Company code assigned to the plant (auto-populated by SAP) | SAP retrieves this from plant-to-company code assignment — no manual entry required | `1710` |
| `{{REWORK_PROCEDURE_CODE}}` | Approved rework recipe or master recipe code maintained in recipe management | Navigate to C201 (Display Recipe) or C202 (Display Master Recipe) → Search for recipes designated for rework operations | `RCP-REWORK-01` |
| `{{REWORK_JUSTIFICATION_TEXT}}` | Free text documenting original failure and approved rework justification (regulatory requirement) | Enter descriptive text explaining: (1) why the batch failed final inspection, (2) QA disposition basis, (3) approved rework procedure summary | `"Batch failed final inspection due to pH out of specification (pH 5.8, spec 6.0-7.0). QA approved rework via pH adjustment procedure RCP-REWORK-01 per deviation DEV-2026-0123."` |
| `{{BATCH_STATUS_RESTRICTED}}` | Batch status for restricted or failed batches (auto-populated by SAP) | SAP retrieves this from batch master status field — typically "Restricted" or "Blocked" for failed batches | `Restricted` |
| `{{QA_DISPOSITION_REWORK_APPROVED}}` | QA disposition status approving rework (auto-populated by SAP) | SAP retrieves this from usage decision field in inspection lot or batch record — look for "Rework Approved" or similar code | `Rework Approved` or `A` (depending on configuration) |
| `{{QA_DISPOSITION_SCRAP_OR_BLOCKED}}` | QA disposition status rejecting rework (auto-populated by SAP) | SAP retrieves this from usage decision field — look for "Scrap", "Blocked", "Return to Vendor", or similar rejection codes | `Scrap` or `X` |
| `{{MRP_CONTROLLER}}` | MRP controller or production scheduler (auto-populated by SAP) | SAP retrieves this from material master MRP view for the plant — no manual entry required | `001` |
| `{{REWORK_ORDER_STATUS_CREATED_OR_RELEASED}}` | Rework order status after creation (system-generated) | SAP sets this based on order type configuration — typically "CRTD" (Created) or "REL" (Released) | `CRTD` or `REL` |
| `{{REWORKED_BATCH_NUMBER_SYSTEM_GENERATED}}` | Reworked batch number (system-generated or user-assigned during confirmation) | SAP generates this during rework order confirmation or goods receipt — format depends on batch number range configuration | `1000012346` |
| `{{INSPECTION_LOT_NUMBER_SYSTEM_GENERATED}}` | Inspection lot number auto-created for reworked batch (system-generated) | SAP auto-creates this when rework order is released or confirmed if QM integration is active — 12-digit numeric format | `000100012345` |

---

## Test Data Preparation Steps

### Step 1: Verify Master Data Exists

Before executing test cases, ensure the following master data exists in your SAP tenant:

1. **Order Type for Rework:**
   - Navigate to SPRO → Production → Shop Floor Control → Master Data → Order → Define Order Types
   - Verify that an order type designated for rework exists (e.g., ZRW1) with category "40" (Process Order)
   - If not available, create a custom order type or contact your SAP Basis/Config team

2. **Material with Batch Management:**
   - Navigate to MM03 (Display Material)
   - Verify that at least one material is configured for batch management (Batch Management indicator is active in Sales: General/Plant view)
   - Recommended: Use a material from pharmaceutical, chemical, or food/beverage industries where batch traceability is standard

3. **Batches with Different QA Disposition Statuses:**
   - Navigate to MSC3N (Display Batch) or QM03 (Display Inspection Lot)
   - Identify or create batches with the following QA disposition statuses:
     - **Approved for Rework:** Usage decision = "Rework Approved" or similar
     - **No QA Disposition:** Batch exists but has no usage decision record
     - **Rejected for Rework:** Usage decision = "Scrap", "Blocked", or "Return to Vendor"
   - If test batches are not available, coordinate with your QA team to create inspection lots and assign usage decisions

4. **Rework Recipe/Procedure:**
   - Navigate to C201 (Display Recipe) or C202 (Display Master Recipe)
   - Verify that at least one recipe designated for rework operations exists
   - If not available, create a test recipe or contact your Production Planning team

5. **Plant and Organizational Structure:**
   - Navigate to OX10 (Display Plant) and OX02 (Display Company Code)
   - Verify that the plant code you plan to use is active and assigned to a company code
   - Verify that the plant is assigned to a purchasing organization and sales organization (if applicable)

### Step 2: Substitute Placeholders in Test Data JSON

1. Open `testdata/CS-59/CS-59-testdata.json`
2. For each test dataset (TD-CS-059-HP-001, TD-CS-059-NEG-001, etc.), replace all `{{PLACEHOLDER}}` tokens with real values from the table above
3. Save the updated JSON file

### Step 3: Validate Test Data Before Test Execution

Before running test cases, manually verify each test dataset:

1. **HP-001 (Happy Path):**
   - Verify batch `{{BATCH_NUMBER_APPROVED_REWORK}}` exists, is restricted, and has QA disposition approving rework
   - Verify material `{{MATERIAL_ID_BATCH_MANAGED}}` is batch-managed and released for the plant
   - Verify rework recipe `{{REWORK_PROCEDURE_CODE}}` exists and is approved
   - Verify quantity `{{REWORK_QUANTITY_STANDARD}}` is within batch available quantity

2. **NEG-001, NEG-002, NEG-003 (Negative Scenarios):**
   - Verify batch numbers have the expected QA disposition status (no disposition, rejected disposition, non-existent)

3. **ERR-001, ERR-002, ERR-003 (Error Scenarios):**
   - No additional validation required — these test cases intentionally leave fields blank

4. **EDGE-001, EDGE-002 (Edge Cases):**
   - Verify minimum quantity `{{REWORK_QUANTITY_MINIMUM}}` matches the UoM decimal precision (e.g., 0.001 for KG, 1 for EA)

---

## Auto-Populated Fields (Not Test Data)

The following fields are auto-populated by SAP during rework order creation and should NOT be included in test data parameters:

| Field | Auto-Population Trigger | Source |
|-------|------------------------|--------|
| Material Description | Confirm Material entry | Material master description field |
| Unit of Measure | Confirm Material entry | Material master base UoM |
| Batch Status | Confirm Batch entry | Batch master status field |
| QA Disposition Status | Confirm Batch entry | Inspection lot usage decision or batch UD field |
| Company Code | Confirm Plant entry | Plant-to-company code assignment (T001K) |
| MRP Controller | Confirm Material + Plant entry | Material master MRP view for plant |
| Rework Order Status | Order creation/release | System-determined based on order type configuration |
| Reworked Batch Number | Order confirmation/goods receipt | System-generated per batch number range or user-assigned |
| Inspection Lot Number | Order release/confirmation | System-generated when QM integration auto-creates inspection lot |

---

## Special Considerations

### Regulatory Compliance

- **Batch Traceability:** HP-01 (TC-CS-053) verifies batch genealogy linkage — ensure your SAP system has batch where-used functionality active (check MCH_WHO_MAT and MCH_IBASE tables or use batch where-used reports)
- **QM Integration:** HP-01 verifies inspection lot auto-creation — ensure QM integration is active for the order type and material (check inspection type configuration in QM customizing)
- **Batch Record Documentation:** HP-01 and ERR-03 verify rework justification is stored in batch record — ensure batch text/notes functionality is active in your SAP tenant

### Test Data Isolation

- Use dedicated test plants, materials, and batches in non-production SAP environments
- Do NOT use production batch numbers, materials, or QA disposition records in test data
- Ensure test data can be purged or archived after test execution (use test-specific order types, plants, and material ranges)

### QA Disposition Setup

For NEG-001, NEG-002, and HP-001 test cases, you must have batches with different QA disposition statuses. If your SAP tenant does not have these pre-configured:
1. Create inspection lots for test batches using QA01 (Create Inspection Lot)
2. Record usage decisions using QA11 (Record Usage Decision) or QA33 (Usage Decision for Batch)
3. Assign usage decisions as follows:
   - **Rework Approved:** Use usage decision code configured for rework eligibility (e.g., "A" or "Rework")
   - **Scrap/Blocked:** Use usage decision code for rejection (e.g., "X" for Scrap or "S" for Blocked)
   - **No Disposition:** Leave batch without any usage decision record

---

## Placeholder Resolution Checklist

Before executing test cases, verify that ALL placeholders in `CS-59-testdata.json` have been replaced:

- [ ] `{{ORDER_TYPE_REWORK}}` → Replaced with actual rework order type code
- [ ] `{{BATCH_NUMBER_APPROVED_REWORK}}` → Replaced with batch number having QA disposition approving rework
- [ ] `{{BATCH_NUMBER_NO_QA_DISPOSITION}}` → Replaced with batch number having no QA disposition
- [ ] `{{BATCH_NUMBER_QA_DISPOSITION_REJECTED}}` → Replaced with batch number having rejected QA disposition
- [ ] `{{BATCH_NUMBER_NON_EXISTENT}}` → Replaced with non-existent batch number (verified not in system)
- [ ] `{{MATERIAL_ID_BATCH_MANAGED}}` → Replaced with batch-managed material ID
- [ ] `{{REWORK_QUANTITY_STANDARD}}` → Replaced with standard quantity (positive, within batch available qty)
- [ ] `{{REWORK_QUANTITY_MINIMUM}}` → Replaced with minimum positive quantity per UoM
- [ ] `{{PLANT_CODE}}` → Replaced with valid plant code
- [ ] `{{REWORK_PROCEDURE_CODE}}` → Replaced with approved rework recipe code
- [ ] `{{REWORK_JUSTIFICATION_TEXT}}` → Replaced with descriptive rework justification text

---

## Troubleshooting

### Issue: Batch does not appear during rework order creation
**Cause:** Batch may not be assigned to the correct material or plant  
**Resolution:** Verify batch assignment using MSC3N (Display Batch) — batch must be linked to material `{{MATERIAL_ID_BATCH_MANAGED}}` and plant `{{PLANT_CODE}}`

### Issue: QA disposition status is not visible during rework order creation
**Cause:** QA disposition may not be linked to the batch or inspection lot  
**Resolution:** Navigate to QM03 (Display Inspection Lot) and verify that the inspection lot for the batch has a recorded usage decision (UD)

### Issue: Rework recipe is not available during rework order creation
**Cause:** Recipe may not be assigned to the material or plant  
**Resolution:** Verify recipe assignment using C201/C202 — recipe must be linked to material `{{MATERIAL_ID_BATCH_MANAGED}}` and valid for plant `{{PLANT_CODE}}`

### Issue: Rework order creation fails with "No authorization" error
**Cause:** Test user does not have required authorization objects  
**Resolution:** Ensure test user has authorization objects PP_ORDER (order maintenance) and QM_INSP (inspection lot processing) — contact your SAP Security team

### Issue: Batch genealogy verification fails in TC-CS-053
**Cause:** Batch where-used functionality may not be active in your SAP tenant  
**Resolution:** Verify batch genealogy tables (MCH_WHO_MAT, MCH_IBASE) are populated — contact your SAP Basis/Config team to activate batch where-used functionality if not available

---

## Change Log

| Date | Version | Change Description | Author |
|------|---------|-------------------|--------|
| 2026-08-24 | 1.0 | Initial test data guide for CS-59 — 9 test datasets with placeholder mapping and preparation steps | testcase-agent/skills/generate-testcases |

---
