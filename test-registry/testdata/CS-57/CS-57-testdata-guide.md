# Test Data Guide: [CS-57] Master Recipe Creation and Versioning

**Generated:**    2026-08-24
**Module:**       PP (Production Planning & Manufacturing)
**Feature:**      Master Recipe Creation and Versioning
**Data File:**    testdata/CS-57/CS-57-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-57/CS-57-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_NUMBER_VALID}}` | An active material number configured for recipe creation (Material Type FERT or HALB) | SAP Fiori: Manage Material → search for finished goods (FERT) or semi-finished products (HALB); or T-code MM60/MARA. Ensure "Recipe Creation Allowed" indicator is set in Material Master. |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated from Material Master) | Shown in Material Master for the material ID above (e.g., "Pharmaceutical Tablet 500mg") |
| `{{MATERIAL_NUMBER_INVALID}}` | A material number that does NOT exist in SAP | Use a non-existent number like "ZZNOTEXIST999" — verify it returns "not found" in Material Master search |

### Plant and Organizational Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Production plant code configured for the material | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10. Use a plant configured for production (e.g., "1710") |
| `{{COMPANY_CODE}}` | Company code assigned to the plant | SAP configuration → Enterprise Structure; or T-code OX02. Company code is automatically determined from the plant (e.g., "1710" for plant "1710") |

### Recipe Header Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{RECIPE_DESCRIPTION}}` | Descriptive text for the recipe | Use a meaningful description, e.g., "Standard Manufacturing Process for Product XYZ" |
| `{{RECIPE_DESCRIPTION_MODIFIED}}` | Modified recipe description (for versioning tests) | Original description with " - Modified" appended, e.g., "Standard Manufacturing Process for Product XYZ - Modified" |
| `{{RECIPE_TYPE_CODE}}` | Recipe type code configured in the system | SAP Fiori: Configuration → Recipe Types; or T-code C223. Use a configured recipe type (e.g., "1" for standard recipe, or custom codes like "PHARM") |
| `{{BASE_QUANTITY_STANDARD}}` | Standard recipe base quantity | Use a typical batch size for the material (e.g., 100, 500, 1000 depending on UoM and material type) |
| `{{BASE_QUANTITY_MIN}}` | Minimum valid base quantity (lower boundary) | Typically 0.001 (verify with SAP field validation rules) |
| `{{BASE_QUANTITY_MAX}}` | Maximum valid base quantity (upper boundary) | Typically 999999999.999 (verify with SAP field validation rules) |
| `{{BASE_QUANTITY_MODIFIED}}` | Modified base quantity (for versioning tests) | Use a different value from the standard quantity (e.g., if standard is 100, use 150) |
| `{{BASE_UOM}}` | Unit of measure for base quantity (auto-populated from Material Master) | Shown in Material Master for the material (e.g., KG, EA, PC, L, M) |
| `{{EFFECTIVE_DATE}}` | Recipe effective date (Valid From) | Use a date in the future or today's date (format: YYYY-MM-DD, e.g., 2026-09-01) |

### Operation Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{OPERATION_NUMBER}}` | Operation sequence number for a single-operation recipe | Use a standard sequence number like "0010" (SAP increments by 10: 0010, 0020, 0030, etc.) |
| `{{OPERATION_1_NUMBER}}` | First operation sequence number for multi-operation recipes | Use "0010" |
| `{{OPERATION_2_NUMBER}}` | Second operation sequence number for multi-operation recipes | Use "0020" |
| `{{OPERATION_3_NUMBER}}` | Third operation sequence number for multi-operation recipes | Use "0030" |
| `{{OPERATION_DESCRIPTION}}` | Operation short text describing the operation | Use a meaningful description, e.g., "Raw Material Mixing", "Heating and Dissolution", "Cooling and Quality Check" |
| `{{OPERATION_1_DESCRIPTION}}` | First operation description for multi-operation recipes | E.g., "Raw Material Mixing" |
| `{{OPERATION_2_DESCRIPTION}}` | Second operation description for multi-operation recipes | E.g., "Heating and Dissolution" |
| `{{OPERATION_3_DESCRIPTION}}` | Third operation description for multi-operation recipes | E.g., "Cooling and Quality Check" |
| `{{WORK_CENTER_CODE}}` | Work center code assigned to the plant | SAP Fiori: Manage Work Centers → search active work centers for the plant; or T-code CR01/CR02. Use a work center configured for the plant (e.g., "WC_MIX_01") |
| `{{WORK_CENTER_1_CODE}}` | First work center for multi-operation recipes | Use a work center for mixing operations (e.g., "WC_MIX_01") |
| `{{WORK_CENTER_2_CODE}}` | Second work center for multi-operation recipes | Use a work center for heating operations (e.g., "WC_HEAT_01") |
| `{{WORK_CENTER_3_CODE}}` | Third work center for multi-operation recipes | Use a work center for cooling/QC operations (e.g., "WC_COOL_01") |
| `{{WORK_CENTER_DESCRIPTION}}` | Work center description (auto-populated from Work Center Master) | Shown in Work Center Master for the work center code above (e.g., "Mixing Work Center 01") |
| `{{WORK_CENTER_INVALID}}` | A work center code that does NOT exist in SAP or is not assigned to the plant | Use a non-existent code like "ZZINVALID" — verify it returns "not found" or "not valid for plant" in Work Center search |
| `{{CONTROL_KEY}}` | Operation control key code | SAP Fiori: Configuration → Control Keys; or T-code OP63. Use a configured control key (e.g., "PP01" for production operations, or "ZZ01" for custom) |
| `{{STANDARD_DURATION}}` | Standard operation time (standard value) | Use a realistic duration for the operation (e.g., 60, 120, 180 for minutes; or 1.0, 2.5 for hours) |
| `{{STANDARD_DURATION_1}}` | Standard duration for first operation in multi-operation recipes | E.g., 30 (minutes) |
| `{{STANDARD_DURATION_2}}` | Standard duration for second operation in multi-operation recipes | E.g., 60 (minutes) |
| `{{STANDARD_DURATION_3}}` | Standard duration for third operation in multi-operation recipes | E.g., 45 (minutes) |
| `{{STANDARD_DURATION_MIN}}` | Minimum valid standard duration (lower boundary) | Typically 0.01 (verify with SAP field validation rules) |
| `{{STANDARD_DURATION_MAX}}` | Maximum valid standard duration (upper boundary) | Typically 999999.99 (verify with SAP field validation rules) |
| `{{STANDARD_DURATION_MODIFIED}}` | Modified standard duration (for versioning tests) | Use a different value from the standard duration (e.g., if standard is 60, use 90) |
| `{{TIME_UOM}}` | Time unit of measure for standard duration | Use a configured time unit (e.g., "MIN" for minutes, "HR" for hours, "SEC" for seconds) |

### In-Process Control (QM Inspection) Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{INSPECTION_CHARACTERISTIC_ID}}` | QM inspection characteristic ID for a single-checkpoint operation | SAP Fiori: Manage Inspection Characteristics → search active characteristics; or T-code QS21/QS22. Use a characteristic configured for in-process inspection (e.g., "TEMP_001" for Temperature, "PH_001" for pH Level) |
| `{{CHECKPOINT_1_ID}}` | First inspection characteristic for multi-checkpoint operations | E.g., "TEMP_001" (Temperature) |
| `{{CHECKPOINT_2_ID}}` | Second inspection characteristic for multi-checkpoint operations | E.g., "PH_001" (pH Level) |
| `{{CHECKPOINT_3_ID}}` | Third inspection characteristic for multi-checkpoint operations | E.g., "VISC_001" (Viscosity) |
| `{{INSPECTION_CHARACTERISTIC_INVALID}}` | An inspection characteristic ID that does NOT exist in QM master data | Use a non-existent code like "ZZINVALID" — verify it returns "not found" in QM Inspection Characteristic search |
| `{{TARGET_VALUE}}` | Target value for the inspection characteristic | Use a realistic target value based on the characteristic (e.g., 75.0 for temperature in Celsius, 7.0 for pH) |
| `{{TARGET_VALUE_AT_LOWER}}` | Target value equal to lower limit (for boundary testing) | Use the same value as `{{LOWER_LIMIT}}` to test valid boundary case where Target = Lower (e.g., 70.0) |
| `{{TARGET_VALUE_AT_UPPER}}` | Target value equal to upper limit (for boundary testing) | Use the same value as `{{UPPER_LIMIT}}` to test valid boundary case where Target = Upper (e.g., 80.0) |
| `{{LOWER_LIMIT}}` | Lower specification limit for the inspection characteristic | Use a realistic lower limit below the target value (e.g., 70.0 for temperature if target is 75.0) |
| `{{LOWER_LIMIT_INVALID}}` | Lower limit greater than target value (for invalid boundary testing) | Use a value greater than `{{TARGET_VALUE}}` to test invalid condition (e.g., 80.0 if target is 75.0) — SAP should reject this |
| `{{UPPER_LIMIT}}` | Upper specification limit for the inspection characteristic | Use a realistic upper limit above the target value (e.g., 80.0 for temperature if target is 75.0) |
| `{{UPPER_LIMIT_INVALID}}` | Upper limit less than target value (for invalid boundary testing) | Use a value less than `{{TARGET_VALUE}}` to test invalid condition (e.g., 70.0 if target is 75.0) — SAP should reject this |
| `{{CHECKPOINT_1_TARGET}}` | Target value for first checkpoint in multi-checkpoint operations | E.g., 75.0 (Temperature target) |
| `{{CHECKPOINT_1_LOWER}}` | Lower limit for first checkpoint | E.g., 70.0 |
| `{{CHECKPOINT_1_UPPER}}` | Upper limit for first checkpoint | E.g., 80.0 |
| `{{CHECKPOINT_2_TARGET}}` | Target value for second checkpoint in multi-checkpoint operations | E.g., 7.0 (pH target) |
| `{{CHECKPOINT_2_LOWER}}` | Lower limit for second checkpoint | E.g., 6.5 |
| `{{CHECKPOINT_2_UPPER}}` | Upper limit for second checkpoint | E.g., 7.5 |
| `{{CHECKPOINT_3_TARGET}}` | Target value for third checkpoint in multi-checkpoint operations | E.g., 50.0 (Viscosity target) |
| `{{CHECKPOINT_3_LOWER}}` | Lower limit for third checkpoint | E.g., 45.0 |
| `{{CHECKPOINT_3_UPPER}}` | Upper limit for third checkpoint | E.g., 55.0 |

### Recipe Versioning and Status Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{EXISTING_RECIPE_ID_RELEASED}}` | Existing recipe ID with status "Released" (for versioning tests) | Create a recipe and complete the approval workflow to get a Released recipe; note the Recipe ID (e.g., "10000001") |
| `{{RECIPE_ID_DRAFT}}` | Recipe ID with status "Draft" (for negative tests) | Create a recipe but do NOT submit for approval; note the Recipe ID (e.g., "10000002") |
| `{{RECIPE_ID_OBSOLETE}}` | Recipe ID with status "Obsolete" (for negative tests) | Edit a Released recipe to create a new version; the old version becomes "Obsolete"; note the old Recipe ID and version (e.g., "10000001" version 1) |
| `{{RECIPE_VERSION_OBSOLETE}}` | Version number of an obsolete recipe | Use the version number of a superseded recipe (e.g., "1" if version 2 is now active) |

### Process Order Data (for Negative Tests)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PROCESS_ORDER_QUANTITY}}` | Quantity to produce in a process order | Use a realistic production quantity (e.g., 100, 500, 1000 based on the material and recipe base quantity) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Example: `https://my426318.s4hana.cloud.sap/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?help-autoStartTour=e8bc3755f84d8126e10000000a4450e5` |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. Example: your SAP email address |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. Example: your SAP password (never commit to version control) |

---

## Important Notes

1. **Never commit real SAP IDs, credentials, or production data** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The following values must be verified to NOT exist in the test system before executing negative test cases:
   - `{{MATERIAL_NUMBER_INVALID}}`
   - `{{WORK_CENTER_INVALID}}`
   - `{{INSPECTION_CHARACTERISTIC_INVALID}}`
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests:
   - **Material Master**: Use "Manage Material" app or T-code MM01
   - **Work Center Master**: Use "Manage Work Centers" app or T-code CR01
   - **QM Inspection Characteristics**: Use "Manage Inspection Characteristics" app or T-code QS21
   - **Recipe Types**: Use T-code C223
   - **Control Keys**: Use T-code OP63
6. **Pharmaceutical Industry Context**: This test data guide is designed for SAP S/4HANA Cloud pharmaceutical manufacturing scenarios. Master Recipes are critical for GMP (Good Manufacturing Practice) compliance and require:
   - Approval workflows before release
   - Version control for audit trails
   - In-process control specifications for quality compliance
   - Change document tracking for regulatory requirements
7. **Test Data Conventions for CS-57**:
   - **Auto-populated fields** (materialDescription, workCenterDescription) are NOT included as test data — they are verified as Expected Results after SAP auto-populates them from master data
   - **User-entered fields only** appear in the test data JSON
   - **Empty string `""`** in ERR datasets represents a blank mandatory field — do NOT replace with a value
   - **Boundary values** (MIN/MAX) should be verified against SAP field validation rules in your specific SAP system version
   - **Invalid boundary values** (LOWER_LIMIT_INVALID, UPPER_LIMIT_INVALID) must violate business rules (Lower > Target or Upper < Target) to trigger validation errors

---

## SAP Tenant Context (from MEMORY.md)

**Current SAP Tenant**: my426318.s4hana.cloud.sap (updated 2026-07-15)

**Warning**: Test data below was originally resolved for old tenant (my429998). All master data references (Material IDs, Work Center IDs, Plant codes, etc.) must be **re-validated and updated** for the new tenant (my426318) before test execution.

**Login Process**: Two-step IDP via `*.accounts.ondemand.com`:
1. Enter email → Click "Continue"
2. Enter password → Click "Continue"
3. After login: Introduction/Welcome pop-up may appear — dismiss it before proceeding

**Navigation**: Use the search bar (top-right shell icon) to find applications — do NOT rely on tiles.

**Sign Out**: User Profile icon → Sign Out → OK

---

## Example Placeholder Substitution

**Before substitution** (in JSON):
```json
"materialNumber": "{{MATERIAL_NUMBER_VALID}}",
"plant": "{{PLANT_CODE}}",
"baseQuantity": "{{BASE_QUANTITY_STANDARD}}"
```

**After substitution** (with actual SAP values):
```json
"materialNumber": "FG_TABLET_500MG",
"plant": "1710",
"baseQuantity": "1000"
```

**In test steps**, `{TD.materialNumber}` will then resolve to `"FG_TABLET_500MG"` at execution time.

---

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| Material validation fails | Verify the material exists, is active, has Material Type FERT or HALB, and "Recipe Creation Allowed" indicator is set in Material Master |
| Work Center validation fails | Verify the work center exists, is active, and is assigned to the correct plant in Work Center Master |
| Inspection Characteristic validation fails | Verify the characteristic exists in QM master data (T-code QS21/QS22) and is enabled for in-process inspection |
| Recipe Type not found | Verify the recipe type is configured in the system (T-code C223) |
| Approval workflow does not trigger | Verify workflow configuration is active for Master Recipe approval; check workflow customization (T-code SWDD or Fiori Workflow Configuration apps) |
| Change Document not generated | Verify Change Document System is configured and active for Recipe Management (T-code SCDO or Fiori Configuration apps) |

---

## Additional Resources

- **SAP Help Portal**: [Master Recipe Management in SAP S/4HANA Cloud](https://help.sap.com/docs/SAP_S4HANA_CLOUD)
- **Fiori Apps Reference**: Search for "Manage Master Recipes" in SAP Fiori Apps Reference Library
- **GMP Compliance**: Refer to your organization's Quality Management documentation for pharmaceutical manufacturing requirements
