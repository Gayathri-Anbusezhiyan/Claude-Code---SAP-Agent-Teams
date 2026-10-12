# Test Data Guide: CS-50 — Create A Process Order For A Validated Master Recipe To Manufacture A

**Generated:** 2026-08-24
**Module:** PP — Production Planning (Pharmaceutical Manufacturing)
**Feature:** Process Order Creation (Pharmaceutical Manufacturing)

---

## Purpose

This guide explains how to populate the `{{PLACEHOLDER}}` values in `CS-50-testdata.json` with actual SAP master data from your test environment.

All test data must be sourced from the **SAP test tenant** (currently: `my426318.s4hana.cloud.sap` as of 2026-08-24). Never use production data for testing.

---

## Data Resolution Status

| Placeholder | Status | Notes |
|------------|--------|-------|
| All placeholders below | NOT RESOLVED | Test data must be identified and validated in the new SAP tenant (my426318) before test execution |

**WARNING:** Test data from the previous tenant (my429998) is NOT valid for the current tenant (my426318). All master data identifiers must be re-validated.

---

## Master Data Requirements

### 1. Master Recipe (Approved/Released Status)

**Placeholder:** `{{MASTER_RECIPE_ID_APPROVED}}`

**Description:** A master recipe identifier with status "Approved" or "Released" in the SAP system.

**Requirements:**
- Recipe status must be "Approved" or "Released" (NOT "Draft", "In Review", or any other status)
- Recipe must have an active Bill of Material (BOM) linked with at least:
  - One active ingredient component (material type "HALB" or "ROH" with active flag)
  - One excipient component (material type "ROH" with excipient flag)
- Recipe must have routing/operations defined
- At least one operation must have an In-Process Control (IPC) step defined (inspection type)
- Recipe must be valid for the plant specified in `{{PLANT_CODE_PHARMA}}`

**How to find:**
1. Navigate to SAP transaction code: `C203` (Display Master Recipe) or use Fiori app "Manage Master Recipes"
2. Search for recipes with status "Approved" or "Released"
3. Verify the recipe has active BOM and routing operations
4. Verify at least one operation has IPC steps defined
5. Note the recipe identifier (alphanumeric, format varies per client config)

**Example value format:** `10000001` or `REC-PHARMA-001` (format varies per client)

---

### 2. Master Recipe (Draft Status)

**Placeholder:** `{{MASTER_RECIPE_ID_DRAFT}}`

**Description:** A master recipe identifier with status "Draft" (NOT Approved/Released) for negative testing.

**Requirements:**
- Recipe status must be "Draft" or any non-released status
- Recipe must exist in the SAP system but NOT be approved for production use

**How to find:**
1. Navigate to SAP transaction code: `C203` or Fiori app "Manage Master Recipes"
2. Search for recipes with status "Draft", "In Review", or any status OTHER than "Approved/Released"
3. Note the recipe identifier

**Example value format:** `90000001` or `REC-DRAFT-001`

---

### 3. Finished Product Material (with Batch Management)

**Placeholder:** `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}`

**Description:** A finished product material number configured for pharmaceutical manufacturing with batch management active.

**Requirements:**
- Material type: "FERT" (Finished Product)
- Batch management flag: Active (material master view "Classification")
- Material must be created and released for plant `{{PLANT_CODE_PHARMA}}`
- Material must have at least one active production version for plant `{{PLANT_CODE_PHARMA}}`
- Material must be linked to an approved master recipe

**How to find:**
1. Navigate to SAP transaction code: `MM03` (Display Material) or Fiori app "Manage Products"
2. Search for materials with material type "FERT"
3. Verify batch management is active in the "Classification" view
4. Verify the material is created for plant `{{PLANT_CODE_PHARMA}}`
5. Note the material number (alphanumeric, up to 18 characters, format varies per client)

**Example value format:** `FG-PHARMA-001` or `100000123456`

**Placeholder:** `{{MATERIAL_DESCRIPTION_FINISHED_PRODUCT}}`
- This is auto-populated by SAP from the material master when the material number is entered
- Do NOT substitute manually; reference in Expected Result column only

---

### 4. Plant (Pharmaceutical Manufacturing)

**Placeholder:** `{{PLANT_CODE_PHARMA}}`

**Description:** A plant code configured for pharmaceutical manufacturing operations.

**Requirements:**
- Plant must be configured for pharmaceutical production (manufacturing capabilities)
- Plant must be assigned to a company code
- Plant must have an active posting period open
- Plant must have quality management active
- Plant must be linked to a purchasing organization

**How to find:**
1. Navigate to SAP transaction code: `OX10` (Display Plant) or Fiori app "Manage Plants"
2. Search for plants configured for pharmaceutical manufacturing
3. Verify the plant is assigned to a company code
4. Verify the current posting period is open for the plant
5. Note the plant code (4-character alphanumeric)

**Example value format:** `1710` or `PH01`

---

### 5. Company Code

**Placeholder:** `{{COMPANY_CODE}}`

**Description:** Company code assigned to the pharmaceutical manufacturing plant.

**Requirements:**
- Company code must be active
- Company code must be assigned to plant `{{PLANT_CODE_PHARMA}}`
- Current fiscal period must be open for the company code

**How to find:**
1. Navigate to SAP transaction code: `OX02` (Display Company Code) or use SPRO configuration
2. Search for the company code assigned to plant `{{PLANT_CODE_PHARMA}}`
3. Verify the company code is active
4. Note the company code (4-character alphanumeric)

**Example value format:** `1710` or `CC01`

**Note:** This value is auto-populated by SAP from the plant master data when the plant is entered. Do NOT enter manually; reference in Expected Result column only.

---

### 6. Purchasing Organization

**Placeholder:** `{{PURCHASING_ORG_CODE}}`

**Description:** Purchasing organization assigned to the plant.

**Requirements:**
- Purchasing organization must be active
- Purchasing organization must be assigned to plant `{{PLANT_CODE_PHARMA}}`

**How to find:**
1. Navigate to SAP transaction code: `XK03` (Display Vendor) or SPRO configuration
2. Search for purchasing organizations assigned to plant `{{PLANT_CODE_PHARMA}}`
3. Note the purchasing organization code (4-character alphanumeric)

**Example value format:** `1710` or `PO01`

**Note:** This value is auto-populated by SAP from the plant/organizational structure when the plant is entered. Do NOT enter manually.

---

### 7. Production Version

**Placeholder:** `{{PRODUCTION_VERSION}}`

**Description:** Production version for the finished product material at the specified plant.

**Requirements:**
- Production version must be active
- Production version must be defined for material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` and plant `{{PLANT_CODE_PHARMA}}`
- Production version must link to the master recipe `{{MASTER_RECIPE_ID_APPROVED}}`

**How to find:**
1. Navigate to SAP transaction code: `C223` (Display Production Version) or Fiori app "Manage Production Versions"
2. Enter material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` and plant `{{PLANT_CODE_PHARMA}}`
3. Verify at least one active production version exists
4. Note the production version identifier (usually a 2-4 character code)

**Example value format:** `0001` or `PV01`

**Note:** This value is auto-populated by SAP from the material master when the material and plant are entered. Do NOT enter manually.

---

### 8. Unit of Measure

**Placeholder:** `{{UNIT_OF_MEASURE}}`

**Description:** Base unit of measure for the finished product material.

**Requirements:**
- Unit of measure must be configured in the material master for `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}`

**How to find:**
1. Navigate to SAP transaction code: `MM03` (Display Material)
2. Enter material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}`
3. View "Basic Data 1" tab
4. Note the "Base Unit of Measure" field value

**Example value format:** `KG`, `L`, `EA`, `PC`

**Note:** This value is auto-populated by SAP from the material master when the material is entered. Do NOT enter manually.

---

### 9. Order Quantity (Standard)

**Placeholder:** `{{ORDER_QUANTITY_STANDARD}}`

**Description:** A standard production quantity within the valid range for the master recipe (between minimum and maximum lot size).

**Requirements:**
- Quantity must be greater than 0
- Quantity must be within the minimum and maximum lot size constraints defined in the master recipe
- Quantity must be a valid numeric value for the unit of measure

**How to find:**
1. Navigate to SAP transaction code: `C203` (Display Master Recipe)
2. Enter recipe `{{MASTER_RECIPE_ID_APPROVED}}`
3. View the "Header" tab
4. Note the "Minimum Lot Size" and "Maximum Lot Size" values
5. Choose a quantity value between the minimum and maximum (e.g., midpoint value)

**Example value format:** `100`, `500.5`, `1000`

---

### 10. Order Quantity (Minimum Lot Size)

**Placeholder:** `{{ORDER_QUANTITY_MIN_LOT_SIZE}}`

**Description:** The minimum lot size defined in the master recipe (lower boundary value).

**Requirements:**
- Quantity must equal the "Minimum Lot Size" value from the master recipe header

**How to find:**
1. Navigate to SAP transaction code: `C203` (Display Master Recipe)
2. Enter recipe `{{MASTER_RECIPE_ID_APPROVED}}`
3. View the "Header" tab
4. Note the "Minimum Lot Size" value exactly as displayed

**Example value format:** `10`, `50`, `100`

---

### 11. Order Quantity (Maximum Lot Size)

**Placeholder:** `{{ORDER_QUANTITY_MAX_LOT_SIZE}}`

**Description:** The maximum lot size defined in the master recipe (upper boundary value).

**Requirements:**
- Quantity must equal the "Maximum Lot Size" value from the master recipe header

**How to find:**
1. Navigate to SAP transaction code: `C203` (Display Master Recipe)
2. Enter recipe `{{MASTER_RECIPE_ID_APPROVED}}`
3. View the "Header" tab
4. Note the "Maximum Lot Size" value exactly as displayed

**Example value format:** `1000`, `5000`, `10000`

---

### 12. Production Start Date (Future)

**Placeholder:** `{{PRODUCTION_START_DATE_FUTURE}}`

**Description:** A future date (at least 7 days from the test execution date) for production start.

**Requirements:**
- Date must be in the future (current date + at least 7 days)
- Date must fall within an open posting period for plant `{{PLANT_CODE_PHARMA}}`
- Date format: `DD.MM.YYYY` (or SAP system default format)

**How to calculate:**
- If test execution date is 2026-08-24, set this to 2026-08-31 or later

**Example value format:** `31.08.2026`, `15.09.2026`

**Note:** For automation, use a dynamic date calculation: `TODAY + 7 days`

---

### 13. Production Start Date (Current Date)

**Placeholder:** `{{CURRENT_DATE}}`

**Description:** The current system date (earliest valid date boundary for production start).

**Requirements:**
- Date must equal the current SAP system date
- Current posting period must be open for plant `{{PLANT_CODE_PHARMA}}`
- Date format: `DD.MM.YYYY` (or SAP system default format)

**How to find:**
- Use the SAP system date displayed on the Fiori Launchpad or SAP GUI
- For automation, use a dynamic date function: `TODAY`

**Example value format:** `24.08.2026`

---

### 14. Component Material on Quality Hold

**Placeholder:** `{{COMPONENT_MATERIAL_ID_ON_HOLD}}`

**Description:** A component material (from the master recipe BOM) that is set to quality status "Blocked" or "On Hold" for negative testing (AC-5).

**Requirements:**
- Material must be a component material listed in the BOM of master recipe `{{MASTER_RECIPE_ID_APPROVED}}`
- Material quality status must be set to "Blocked" or "On Hold" in the SAP system (QM module)
- Material must exist and be created for plant `{{PLANT_CODE_PHARMA}}`

**How to find:**
1. Navigate to SAP transaction code: `CS03` (Display BOM)
2. Enter material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` and plant `{{PLANT_CODE_PHARMA}}`
3. View the list of component materials in the BOM
4. Choose one component material from the list
5. Navigate to SAP transaction code: `QP02` (Change Inspection Lot) or QM module to set the material's quality status to "Blocked" or "On Hold"
6. Note the component material number

**Alternative:** If no suitable component material exists, create a test material with quality status "Blocked" and add it to the test BOM.

**Example value format:** `RM-PHARMA-001`, `200000123456`

---

### 15. Supplier Name (Auto-populated)

**Placeholder:** `{{SUPPLIER_NAME}}`

**Description:** Supplier name (auto-populated from supplier master data).

**Note:** This value is auto-populated by SAP when a supplier ID is entered in PP-related transactions (if applicable). Do NOT substitute manually; reference in Expected Result column only if applicable to the test scenario.

---

## Empty/Missing Field Values

**Placeholder:** `{TD.emptyValue}` or empty string `""`

**Description:** Used in ERROR test cases to represent a mandatory field left blank.

**Requirements:**
- Do NOT enter any value
- Leave the field empty during test execution

**Example value:** *(no value — field remains blank)*

---

## Test Data Validation Checklist

Before executing test cases, verify the following:

- [ ] Master recipe `{{MASTER_RECIPE_ID_APPROVED}}` exists with status "Approved/Released"
- [ ] Master recipe has active BOM with at least one active ingredient and one excipient
- [ ] Master recipe has routing operations defined
- [ ] At least one routing operation has IPC steps defined
- [ ] Master recipe `{{MASTER_RECIPE_ID_DRAFT}}` exists with status "Draft" (NOT Approved/Released)
- [ ] Finished product material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` exists with batch management active
- [ ] Plant `{{PLANT_CODE_PHARMA}}` is configured for pharmaceutical manufacturing
- [ ] Company code `{{COMPANY_CODE}}` is assigned to plant `{{PLANT_CODE_PHARMA}}`
- [ ] Current posting period is open for plant `{{PLANT_CODE_PHARMA}}` and company code `{{COMPANY_CODE}}`
- [ ] Production version exists for material `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` and plant `{{PLANT_CODE_PHARMA}}`
- [ ] Component material `{{COMPONENT_MATERIAL_ID_ON_HOLD}}` is set to quality status "Blocked" or "On Hold"
- [ ] Minimum and maximum lot sizes are defined in master recipe `{{MASTER_RECIPE_ID_APPROVED}}`
- [ ] All date values use the correct SAP system date format (DD.MM.YYYY or configured format)

---

## Notes for Test Execution

1. **Test Data Isolation:** Use clearly labeled "TEST" materials and recipes in the SAP system to avoid confusion with production data.
2. **Quality Hold Setup:** For NEG-02 test case (TC-CS-127), ensure component material quality status is set to "Blocked" or "On Hold" BEFORE test execution. This may require coordination with the QM module or test data setup scripts.
3. **Date Calculations:** For automation, use dynamic date functions to calculate `{{PRODUCTION_START_DATE_FUTURE}}` (TODAY + 7 days) and `{{CURRENT_DATE}}` (TODAY) to ensure tests remain valid over time.
4. **Lot Size Constraints:** Verify that `{{ORDER_QUANTITY_MIN_LOT_SIZE}}` and `{{ORDER_QUANTITY_MAX_LOT_SIZE}}` are correctly documented from the master recipe header to ensure EDGE test cases validate boundary conditions accurately.
5. **Regulatory Compliance:** All test materials, recipes, and batches must be flagged as "TEST" and disposed of appropriately (do not release to inventory or production).

---

## Data Resolution Log

| Placeholder | Resolved Value | Resolved By | Resolved Date | Validation Status |
|------------|---------------|-------------|---------------|------------------|
| `{{MASTER_RECIPE_ID_APPROVED}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{MASTER_RECIPE_ID_DRAFT}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{MATERIAL_NUMBER_FINISHED_PRODUCT}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{PLANT_CODE_PHARMA}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{COMPANY_CODE}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{ORDER_QUANTITY_STANDARD}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{ORDER_QUANTITY_MIN_LOT_SIZE}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{ORDER_QUANTITY_MAX_LOT_SIZE}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{COMPONENT_MATERIAL_ID_ON_HOLD}}` | TBD | TBD | TBD | NOT VALIDATED |
| `{{PRODUCTION_START_DATE_FUTURE}}` | Dynamic (TODAY + 7) | Auto-calculated | N/A | N/A |
| `{{CURRENT_DATE}}` | Dynamic (TODAY) | Auto-calculated | N/A | N/A |

**Instructions:** Update this log as test data is identified and validated in the SAP tenant my426318.

---

## Contact for Test Data Support

For assistance with test data setup or SAP master data configuration, contact:

- **SAP Basis Team:** [Contact details TBD]
- **Test Data Management Team:** [Contact details TBD]
- **QA Lead / Test Manager:** [Contact details TBD]
