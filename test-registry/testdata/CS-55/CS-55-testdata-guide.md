# Test Data Guide: CS-55

**User Story:** CS-55 — Record A Deviation Directly Against An In-Process Control Result That
**Module:** PP — Production Planning & QM — Quality Management
**Feature:** Quality Deviation Recording from In-Process Control Results
**Generated:** 2026-08-24

---

## Purpose

This guide explains how to substitute the `{{PLACEHOLDER}}` values in the test data JSON file (`CS-55-testdata.json`) with actual SAP system values during test execution.

**Important:** This project uses parameterized test data to ensure test cases are reusable across different SAP environments (DEV, QA, PROD). Do NOT hardcode any values directly into test case markdown files. All SAP-specific values must be configured in this test data JSON file.

---

## Placeholder Definitions

### Process Order and Operation Data

| Placeholder | Description | Example Value | How to Obtain | Notes |
|-------------|-------------|---------------|---------------|-------|
| `{{PROCESS_ORDER_VALID}}` | Valid process order number in RELEASED or CONFIRMED status | 1000000123 | Create a test process order in SAP (T-code: COR1) or query existing process orders (T-code: COR3) | Must be a process order with active operations and linked to a batch |
| `{{OPERATION_NUMBER_VALID}}` | Valid operation number within the process order routing | 0010 | View the process order routing (T-code: CO02) | Typical operations: 0010, 0020, 0030, etc. |
| `{{NEXT_OPERATION_NUMBER}}` | Next operation in the process order sequence | 0020 | View the process order routing (T-code: CO02) | Used for NEG-002: testing operation advance blocking |
| `{{BATCH_NUMBER_VALID}}` | Valid batch number linked to the process order | BATCH001 | Query batch master (T-code: MSC2N) or create batch (T-code: MSC1N) | Batch must be linked to the process order and material |

### Material and Plant Data

| Placeholder | Description | Example Value | How to Obtain | Notes |
|-------------|-------------|---------------|---------------|-------|
| `{{MATERIAL_ID_VALID}}` | Valid material number with active inspection plan | RMPI001 | Query material master (T-code: MM03) | Material must have an in-process inspection plan assigned |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated by SAP) | Input 1 (WATER) | Displayed automatically when material ID is entered | This is NOT test data — SAP auto-fills this field |
| `{{PLANT_CODE}}` | Plant code | 1710 | Configuration: IMG → Enterprise Structure → Definition → Logistics → Plant | Plant must be assigned to the material and company code |
| `{{MATERIAL_ID_1}}` | First material for trend report | RMPI001 | Same as `{{MATERIAL_ID_VALID}}` | Used for integration test TC-CS-150 |
| `{{MATERIAL_ID_2}}` | Second material for trend report | RMPI002 | Query material master (T-code: MM03) | Used for integration test TC-CS-150 |

### Inspection Plan and Characteristic Data

| Placeholder | Description | Example Value | How to Obtain | Notes |
|-------------|-------------|---------------|---------------|-------|
| `{{CHARACTERISTIC_CODE_VALID}}` | Valid inspection characteristic code | PH_LEVEL | Query inspection plan (T-code: QP02) | Characteristic must be assigned to the in-process inspection plan for the material and operation |
| `{{SPEC_LOWER_LIMIT}}` | Lower specification limit for the characteristic | 5.0 | View characteristic master (T-code: CT04) | Defined in the characteristic's specification limits |
| `{{SPEC_UPPER_LIMIT}}` | Upper specification limit for the characteristic | 10.0 | View characteristic master (T-code: CT04) | Defined in the characteristic's specification limits |

### Inspection Result Values

| Placeholder | Description | Example Value | Calculation | Notes |
|-------------|-------------|---------------|-------------|-------|
| `{{INSPECTION_RESULT_OUT_OF_SPEC}}` | Inspection result value outside specification limits | 4.5 (below lower) OR 10.5 (above upper) | Any value < `{{SPEC_LOWER_LIMIT}}` OR > `{{SPEC_UPPER_LIMIT}}` | Used for HP, AP, NEG, and INT scenarios where deviation is required |
| `{{INSPECTION_RESULT_IN_SPEC}}` | Inspection result value within specification limits | 7.5 | Any value >= `{{SPEC_LOWER_LIMIT}}` AND <= `{{SPEC_UPPER_LIMIT}}` | Used for NEG-001: testing in-spec result rejection |
| `{{INSPECTION_RESULT_AT_LOWER_SPEC}}` | Inspection result exactly at lower spec limit | 5.0 | Exactly equal to `{{SPEC_LOWER_LIMIT}}` | Used for EDGE-005: boundary test (should be in-spec) |
| `{{INSPECTION_RESULT_AT_UPPER_SPEC}}` | Inspection result exactly at upper spec limit | 10.0 | Exactly equal to `{{SPEC_UPPER_LIMIT}}` | Used for EDGE-006: boundary test (should be in-spec) |
| `{{INSPECTION_RESULT_BELOW_LOWER_SPEC}}` | Inspection result 0.01 below lower spec limit | 4.99 | `{{SPEC_LOWER_LIMIT}}` - 0.01 | Used for EDGE-007: boundary test (should trigger deviation) |
| `{{INSPECTION_RESULT_ABOVE_UPPER_SPEC}}` | Inspection result 0.01 above upper spec limit | 10.01 | `{{SPEC_UPPER_LIMIT}}` + 0.01 | Used for EDGE-008: boundary test (should trigger deviation) |

### CAPA (Corrective and Preventive Action) Data

| Placeholder | Description | Example Value | Length Constraints | Notes |
|-------------|-------------|---------------|-------------------|-------|
| `{{ROOT_CAUSE_CODE_VALID}}` | Valid root cause code from QM customizing | EQP_FAULT | Must exist in QMTT table | Query: T-code QS41 (Catalogs → Codes) |
| `{{ROOT_CAUSE_DESCRIPTION_VALID}}` | Root cause description text | Equipment temperature sensor malfunction | Min 10 chars, Max 255 chars | Standard length: 50-100 characters |
| `{{ROOT_CAUSE_MIN_LENGTH}}` | Root cause text exactly 10 characters (minimum) | EquipFault | Exactly 10 characters | Used for EDGE-001: minimum boundary test |
| `{{ROOT_CAUSE_MAX_LENGTH}}` | Root cause text exactly 255 characters (maximum) | [255-char string] | Exactly 255 characters | Used for EDGE-002: maximum boundary test. Generate a 255-character string for testing. |
| `{{IMPACT_ASSESSMENT_VALID}}` | Impact assessment text | Batch quality may be compromised. Investigation required to determine if product is safe for release. | Min 10 chars, Max 1000 chars | Standard length: 100-200 characters |
| `{{IMPACT_ASSESSMENT_MIN_LENGTH}}` | Impact assessment text exactly 10 characters | No impact. | Exactly 10 characters | Used for EDGE-003: minimum boundary test |
| `{{IMPACT_ASSESSMENT_MAX_LENGTH}}` | Impact assessment text exactly 1000 characters | [1000-char string] | Exactly 1000 characters | Used for EDGE-004: maximum boundary test. Generate a 1000-character string for testing. |
| `{{CORRECTIVE_ACTION_VALID}}` | Corrective action text | Replace temperature sensor. Recalibrate equipment. Re-test batch with new sensor readings. | Min 10 chars, Max 1000 chars | Standard length: 100-200 characters |
| `{{PREVENTIVE_ACTION_VALID}}` | Preventive action text | Implement weekly sensor calibration checks. Add sensor to preventive maintenance schedule. | Min 10 chars, Max 1000 chars | Standard length: 100-200 characters |

### Deviation and Disposition Data

| Placeholder | Description | Example Value | How to Obtain | Notes |
|-------------|-------------|---------------|---------------|-------|
| `{{DEVIATION_NUMBER_OUTSTANDING}}` | Existing Quality Notification (Deviation) with status OUTSTANDING | 100000001234 | Create a deviation and leave it open (T-code: QM02) | Used for NEG and ERR scenarios where an existing open deviation is required |
| `{{DISPOSITION_DECISION}}` | Disposition decision code | USE_AS_IS, REWORK, SCRAP | Valid disposition codes from SAP QM configuration | USE_AS_IS = batch proceeds without rework; REWORK = batch must be reworked; SCRAP = batch is scrapped |

### Trend Report Data

| Placeholder | Description | Example Value | How to Obtain | Notes |
|-------------|-------------|---------------|---------------|-------|
| `{{DATE_RANGE_FROM}}` | Start date for trend report period | 2026-05-01 | Set to 90 days prior to test execution date | Relative date: today - 90 days |
| `{{DATE_RANGE_TO}}` | End date for trend report period | 2026-08-01 | Set to current test execution date | Relative date: today |
| `{{MATERIAL_FILTER_OPTIONAL}}` | Optional material filter for trend report | RMPI001 | Leave empty for all materials, or specify a material ID | Optional filter — can be left blank |
| `{{OPERATION_FILTER_OPTIONAL}}` | Optional operation filter for trend report | 0010 | Leave empty for all operations, or specify an operation number | Optional filter — can be left blank |
| `{{ROOT_CAUSE_FILTER_OPTIONAL}}` | Optional root cause filter for trend report | EQP_FAULT | Leave empty for all root causes, or specify a root cause code | Optional filter — can be left blank |
| `{{OPERATION_NUMBER_1}}` | First operation for trend report integration test | 0010 | Same as `{{OPERATION_NUMBER_VALID}}` | Used for integration test TC-CS-150 |
| `{{OPERATION_NUMBER_2}}` | Second operation for trend report integration test | 0020 | Different operation from `{{OPERATION_NUMBER_1}}` | Used for integration test TC-CS-150 |
| `{{ROOT_CAUSE_CODE_1}}` | First root cause for trend report integration test | EQP_FAULT | Same as `{{ROOT_CAUSE_CODE_VALID}}` | Used for integration test TC-CS-150 |
| `{{ROOT_CAUSE_CODE_2}}` | Second root cause for trend report integration test | MAT_DEFECT | Different root cause from `{{ROOT_CAUSE_CODE_1}}` | Used for integration test TC-CS-150 |

---

## Data Relationships and Dependencies

### Process Order → Batch → Material Chain

```
Process Order ({{PROCESS_ORDER_VALID}})
    ├── Batch ({{BATCH_NUMBER_VALID}})
    ├── Material ({{MATERIAL_ID_VALID}})
    ├── Plant ({{PLANT_CODE}})
    └── Operations
        ├── Operation 0010 ({{OPERATION_NUMBER_VALID}})
        └── Operation 0020 ({{NEXT_OPERATION_NUMBER}})
```

**Critical:** The process order, batch, material, and plant must be linked in SAP. Verify this linkage using T-code CO03 (Display Process Order).

### Inspection Plan → Characteristic → Spec Limits Chain

```
Material ({{MATERIAL_ID_VALID}}) + Plant ({{PLANT_CODE}}) + Operation ({{OPERATION_NUMBER_VALID}})
    └── Inspection Plan
        └── Characteristic ({{CHARACTERISTIC_CODE_VALID}})
            ├── Lower Spec Limit ({{SPEC_LOWER_LIMIT}})
            └── Upper Spec Limit ({{SPEC_UPPER_LIMIT}})
```

**Critical:** The inspection plan must be assigned to the material-plant-operation combination. Verify using T-code QP02 (Change Inspection Plan).

### Inspection Result → Deviation Logic

```
IF Inspection Result < Lower Spec Limit OR Inspection Result > Upper Spec Limit
    THEN Out-of-Spec → Deviation Required → "Create Deviation" button ENABLED
ELSE
    THEN In-Spec → No Deviation Required → "Create Deviation" button DISABLED
```

---

## Environment-Specific Notes

### DEV Environment
- Process orders may be created with test batches — ensure test batches are NOT linked to production inventory
- Root cause codes may be limited — verify available codes using T-code QS41

### QA Environment
- Use dedicated test materials with "TEST" prefix in description
- Ensure inspection plans are configured for test materials

### PROD Environment
- **WARNING:** Do NOT execute test cases in PROD without explicit authorization
- If testing in PROD is required (e.g., UAT), use dedicated test process orders and batches that are isolated from production transactions

---

## Test Data Validation Checklist

Before executing test cases, verify the following:

- [ ] Process Order `{{PROCESS_ORDER_VALID}}` exists and is in RELEASED or CONFIRMED status
- [ ] Batch `{{BATCH_NUMBER_VALID}}` is linked to the process order
- [ ] Material `{{MATERIAL_ID_VALID}}` has an active inspection plan for plant `{{PLANT_CODE}}` and operation `{{OPERATION_NUMBER_VALID}}`
- [ ] Characteristic `{{CHARACTERISTIC_CODE_VALID}}` is assigned to the inspection plan
- [ ] Specification limits `{{SPEC_LOWER_LIMIT}}` and `{{SPEC_UPPER_LIMIT}}` are defined for the characteristic
- [ ] Root cause code `{{ROOT_CAUSE_CODE_VALID}}` exists in SAP QM customizing (QMTT table)
- [ ] An in-process control result has been recorded for the process order with a value outside specification limits (for HP, AP, NEG, INT scenarios)
- [ ] For NEG-002 and INT scenarios: A deviation with status OUTSTANDING exists (create one using T-code QM01 if needed)

---

## Example Completed Test Data Set

Here is an example of fully substituted test data for the DEV environment:

```json
{
  "TD-CS-055-001": {
    "processOrder": "1000000123",
    "operationNumber": "0010",
    "batchNumber": "BATCH001",
    "materialId": "RMPI001",
    "materialDescription": "Input 1 (WATER)",
    "plant": "1710",
    "characteristic": "PH_LEVEL",
    "inspectionResultOutOfSpec": "4.5",
    "specLowerLimit": "5.0",
    "specUpperLimit": "10.0",
    "notificationType": "QN",
    "rootCauseCode": "EQP_FAULT",
    "rootCauseDescription": "Equipment temperature sensor malfunction",
    "impactAssessment": "Batch quality may be compromised. Investigation required to determine if product is safe for release.",
    "correctiveAction": "Replace temperature sensor. Recalibrate equipment. Re-test batch with new sensor readings.",
    "preventiveAction": "Implement weekly sensor calibration checks. Add sensor to preventive maintenance schedule.",
    "dispositionDecision": "USE_AS_IS"
  }
}
```

---

## Contact

For questions about test data setup or SAP configuration, contact:
- **QA Lead:** [Name]
- **SAP Functional Lead:** [Name]
- **SAP Basis Team:** [Email]

---

**End of Test Data Guide**
