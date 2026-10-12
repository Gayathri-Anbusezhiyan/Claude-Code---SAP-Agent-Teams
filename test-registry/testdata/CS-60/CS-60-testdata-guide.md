# Test Data Guide: [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm

**Generated:**    2026-08-24
**Module:**       PP (Production Planning)
**Feature:**      Work Center Master with Calibration/Qualification Tracking
**Data File:**    test-registry/testdata/CS-60/CS-60-testdata.json

---

## How to Use This Guide

1. Open `test-registry/testdata/CS-60/CS-60-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Work Center Master Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{WORK_CENTER_ID_VALID}}` | A unique Work Center identifier to be created in the test system | Use a new Work Center ID that does not exist yet (e.g., "WC-TEST-001" or "9000001") |
| `{{WORK_CENTER_ID_EXISTING}}` | An existing Work Center ID in the SAP test system | SAP Fiori: Manage Work Centers → search active Work Centers; or T-code CR02 |
| `{{WORK_CENTER_ID_EXPIRED_CALIBRATION}}` | A Work Center with calibration expiration date in the past | Use an existing Work Center with past calibration date, or create one for testing with past date |
| `{{WORK_CENTER_ID_OUT_OF_SERVICE}}` | A Work Center marked as "Out of Service" status | Use an existing Work Center with maintenance/out-of-service status, or mark one for testing |
| `{{WORK_CENTER_ID_VALID_CALIBRATION}}` | A Work Center with valid (future) calibration expiration date | Use an existing Work Center with future calibration date |
| `{{WORK_CENTER_ID_WITHIN_ALERT_THRESHOLD}}` | A Work Center with calibration expiration date within alert lead-time threshold (e.g., 25 days from today if alert lead-time = 30 days) | Create or find a Work Center with calibration date within alert threshold |
| `{{WORK_CENTER_ID_OUTSIDE_ALERT_THRESHOLD}}` | A Work Center with calibration expiration date outside alert lead-time threshold (e.g., 45 days from today if alert lead-time = 30 days) | Create or find a Work Center with calibration date outside alert threshold |
| `{{WORK_CENTER_CATEGORY_CODE}}` | Work Center Category code (e.g., 0001 for Machine, 0002 for Labor) | SAP configuration → Production Planning → Work Centers → Work Center Categories; or T-code OPEV |

### Equipment Master Data (PM Module)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{EQUIPMENT_NUMBER_VALID}}` | An active equipment number in the Equipment Master (PM module) | SAP Fiori: Manage Equipment → search active equipment; or T-code IE03 |
| `{{EQUIPMENT_DESCRIPTION_VALID}}` | Equipment description (auto-populated from Equipment Master) | Shown in Equipment Master for the equipment number above |
| `{{EQUIPMENT_CALIBRATION_DATE}}` | Calibration expiration date stored in Equipment Master (PM module) | Shown in Equipment Master → Calibration tab (e.g., "2027-12-31") |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code configured for production operations | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 (e.g., "1710") |

### Capacity Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{AVAILABLE_CAPACITY_STANDARD}}` | Standard available capacity for Work Center (e.g., 480 minutes/day, 8 hours) | Use realistic capacity values based on Work Center type (e.g., 480 MIN for 8-hour shift) |
| `{{AVAILABLE_CAPACITY_MIN}}` | Minimum valid capacity (lower boundary) | Use "1" (1 minute minimum capacity) |
| `{{CAPACITY_UNIT}}` | Unit of measure for capacity | Use "MIN" (minutes) or "HR" (hours) based on plant configuration |

### Calibration Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{CALIBRATION_EXPIRATION_DATE_FUTURE}}` | A calibration expiration date in the future (e.g., 90+ days from today) | Calculate as: today + 90 days; format YYYY-MM-DD (e.g., "2026-11-22") |
| `{{CALIBRATION_EXPIRATION_DATE_NEW}}` | A new future calibration date for updating existing Work Center | Calculate as: today + 180 days; format YYYY-MM-DD (e.g., "2027-02-20") |
| `{{CALIBRATION_EXPIRATION_DATE_NEAR_FUTURE}}` | A calibration date within alert lead-time threshold (e.g., 25 days from today if alert = 30 days) | Calculate as: today + (alert lead-time - 5) days; format YYYY-MM-DD (e.g., today + 25 days) |
| `{{CALIBRATION_DATE_OLD}}` | Current (old) calibration date on an existing Work Center that needs updating | Use the current calibration date from an existing Work Center (e.g., "2026-06-30") |
| `{{CALIBRATION_DATE_PAST}}` | A date in the past (invalid for new calibration date entry) | Use any past date (e.g., "2025-01-01" or "2026-01-01") |
| `{{CALIBRATION_DATE_TODAY}}` | Today's date (minimum valid boundary) | Calculate as: today's date; format YYYY-MM-DD |
| `{{CALIBRATION_DATE_BOUNDARY_TRIGGER}}` | Calibration date exactly at alert threshold (today + alert lead-time days) | Calculate as: today + alert lead-time days; format YYYY-MM-DD (e.g., today + 30 days) |

### Alert Configuration

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{ALERT_LEAD_TIME_DAYS}}` | Standard alert lead-time in days (e.g., 30 days before calibration expiration) | Use system default value (e.g., "30" days) |
| `{{ALERT_LEAD_TIME_CUSTOM}}` | Custom alert lead-time for alternative path testing (e.g., 45 days or 15 days) | Use non-default value (e.g., "45" or "15" days) |
| `{{ALERT_LEAD_TIME_MIN}}` | Minimum alert lead-time boundary (0 days = alert on expiration day only) | Use "0" (zero days) |
| `{{ALERT_LEAD_TIME_MAX}}` | Maximum alert lead-time boundary (e.g., 999 days) | Use "999" (maximum boundary test) |

### Process Order and Production Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PROCESS_ORDER_NUMBER_VALID}}` | An active Process Order number in the test system | SAP Fiori: Manage Process Orders → search active orders; or T-code COR3 (e.g., "1000000001") |
| `{{OPERATION_NUMBER_VALID}}` | Operation number within the Process Order | Shown in Process Order → Operations tab (e.g., "0010", "0020") |
| `{{BATCH_NUMBER_VALID}}` | Batch number for batch-managed material production | SAP Fiori: Manage Batches → search batches; or T-code MSC3N (e.g., "0000100001") |
| `{{MATERIAL_NUMBER_BATCH_MANAGED}}` | Material number configured for batch management (QM module) | SAP Fiori: Manage Material → search batch-managed materials (material type FERT with batch management flag) |
| `{{QUANTITY_CONFIRMED}}` | Production quantity to be confirmed | Use realistic production quantity (e.g., "100" or "1000" based on material UoM) |

### Status Codes

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{OUT_OF_SERVICE_STATUS_CODE}}` | Work Center status code for "Out of Service" or maintenance status | Use SAP system status code (e.g., "MAINT" or "BLOCK") based on system configuration |

### Background Job Configuration

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BACKGROUND_JOB_NAME}}` | Background job name for calibration alert scanning | SAP Fiori: Manage Background Jobs → search jobs (e.g., "ZCAL_ALERT_SCAN" or custom job name) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. **Work Center IDs** for testing:
   - Create new Work Center IDs for HP and AP scenarios (e.g., "WC-TEST-001", "WC-TEST-002")
   - Use existing Work Centers for update/modify scenarios (TC-CS-054, TC-CS-057, TC-CS-058)
   - Create or identify Work Centers with expired calibration for NEG scenarios (TC-CS-060, TC-CS-073)
   - Create or mark Work Centers as out-of-service for NEG/AP scenarios (TC-CS-057, TC-CS-061)
4. **Calibration dates**:
   - Use future dates (today + 90 days) for standard happy path scenarios
   - Use near-future dates (today + 25 days) for alert testing when alert lead-time = 30 days
   - Use past dates only for negative validation scenarios (TC-CS-062)
   - Use today's date for edge case boundary testing (TC-CS-067)
5. **Alert lead-time configuration**:
   - Default value is typically 30 days (configurable in system)
   - Use 0 days for minimum boundary testing (TC-CS-068)
   - Use 999 days for maximum boundary testing (TC-CS-069)
   - Ensure alert lead-time is configured before executing alert-related test cases
6. **Equipment Master integration**:
   - Ensure Equipment Master records exist in PM module with calibration dates
   - Link Equipment to Work Center to enable calibration date propagation (TC-CS-072)
7. **Process Order and Batch integration**:
   - Ensure Process Orders exist with operations ready for Work Center assignment
   - Ensure batch-managed materials are configured for batch traceability testing (TC-CS-075, TC-CS-076)
8. **Background job integration**:
   - Ensure calibration alert background job is scheduled and active
   - Manually trigger job execution if needed for testing (TC-CS-076)
9. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
10. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests

---

## Dataset-to-Test Case Mapping

| Dataset ID | Scenario Type | Test Case(s) | Key Placeholders |
|------------|---------------|--------------|------------------|
| TD-CS-060-001 | HAPPY_PATH | TC-CS-053 | workCenterId, plant, equipmentNumber, calibrationExpirationDate, availableCapacity |
| TD-CS-060-002 | HAPPY_PATH | TC-CS-054 | existingWorkCenterId, oldCalibrationDate, newCalibrationExpirationDate |
| TD-CS-060-003 | HAPPY_PATH | TC-CS-055 | workCenterId, calibrationExpirationDate (near future), alertLeadTime |
| TD-CS-060-004 | HAPPY_PATH | TC-CS-056 | workCenterId, equipmentNumber, processOrderNumber, batchNumber, operationNumber |
| TD-CS-060-AP-001 | ALTERNATIVE_PATH | TC-CS-057 | existingWorkCenterId, outOfServiceStatus |
| TD-CS-060-AP-002 | ALTERNATIVE_PATH | TC-CS-058 | existingWorkCenterId, newCalibrationExpirationDate |
| TD-CS-060-AP-003 | ALTERNATIVE_PATH | TC-CS-059 | workCenterId, customAlertLeadTime |
| TD-CS-060-NEG-001 | NEGATIVE | TC-CS-060 | expiredWorkCenterId, processOrderNumber, operationNumber |
| TD-CS-060-NEG-002 | NEGATIVE | TC-CS-061 | outOfServiceWorkCenterId, processOrderNumber, operationNumber |
| TD-CS-060-NEG-003 | NEGATIVE | TC-CS-062 | workCenterId, pastCalibrationDate |
| TD-CS-060-ERR-001 | ERROR | TC-CS-063 | workCenterId (empty), plant, workCenterCategory |
| TD-CS-060-ERR-002 | ERROR | TC-CS-064 | workCenterId, plant (empty), workCenterCategory |
| TD-CS-060-ERR-003 | ERROR | TC-CS-065 | workCenterId, plant, workCenterCategory (empty) |
| TD-CS-060-ERR-004 | ERROR | TC-CS-066 | workCenterId, plant, workCenterCategory, equipmentNumber (empty), calibrationExpirationDate |
| TD-CS-060-EDGE-001 | EDGE_CASE | TC-CS-067 | workCenterId, equipmentNumber, calibrationExpirationDate (today) |
| TD-CS-060-EDGE-002 | EDGE_CASE | TC-CS-068 | workCenterId, alertLeadTime (0 days) |
| TD-CS-060-EDGE-003 | EDGE_CASE | TC-CS-069 | workCenterId, alertLeadTime (999 days) |
| TD-CS-060-EDGE-004 | EDGE_CASE | TC-CS-070 | workCenterId, equipmentNumber, availableCapacity (1 MIN) |
| TD-CS-060-EDGE-005 | EDGE_CASE | TC-CS-071 | workCenterId, equipmentNumber, alertLeadTime, calibrationExpirationDate (boundary trigger) |
| TD-CS-060-INT-001 | INTEGRATION | TC-CS-072 | equipmentNumber, equipmentCalibrationDate, workCenterId (PM-PP integration) |
| TD-CS-060-INT-002 | INTEGRATION | TC-CS-073 | validWorkCenterId, expiredWorkCenterId, processOrderNumber (scheduling validation) |
| TD-CS-060-INT-003 | INTEGRATION | TC-CS-074 | workCenterId, calibrationExpirationDate (near future), alertLeadTime (PP-PM notification) |
| TD-CS-060-INT-004 | INTEGRATION | TC-CS-075 | processOrderNumber, workCenterId, equipmentNumber, batchNumber, materialNumber (PP-QM batch traceability) |
| TD-CS-060-INT-005 | INTEGRATION | TC-CS-076 | workCenterId1 (within threshold), workCenterId2 (outside threshold), backgroundJobName |

---

## Data Validation Checklist

Before executing test cases, validate that the following test data is prepared:

- [ ] At least 3-5 unique Work Center IDs available for creation (HP, AP, EDGE scenarios)
- [ ] At least 1 existing Work Center with valid calibration for update scenarios
- [ ] At least 1 existing Work Center with expired calibration for NEG scenarios
- [ ] At least 1 existing Work Center marked as out-of-service for NEG/AP scenarios
- [ ] At least 1-2 active Equipment Master records with calibration dates (PM module)
- [ ] Plant code is valid and active in the test system
- [ ] Work Center Category codes are configured and available
- [ ] Alert lead-time is configured (default 30 days or custom value)
- [ ] At least 1-2 active Process Orders with unassigned operations
- [ ] At least 1 batch-managed material for QM integration testing
- [ ] At least 1 active batch number for QM integration testing
- [ ] Background job for calibration alert scanning is scheduled and active
- [ ] All `.env` variables are set (SAP_FIORI_URL, SAP_USERNAME, SAP_PASSWORD)

---

## Troubleshooting

**Issue:** Calibration date validation error when entering future date
- **Solution:** Check system date validation rules; ensure future dates are allowed for calibration expiration

**Issue:** Work Center not appearing in capacity planning
- **Solution:** Verify calibration status is "Valid" (future date) and Work Center status is "Active" (not out-of-service)

**Issue:** Alert notification not generated for Work Center with calibration expiring soon
- **Solution:** Check alert lead-time configuration; verify calibration expiration date is within alert threshold; manually trigger background job if needed

**Issue:** Equipment calibration date not propagating to Work Center Master
- **Solution:** Verify PM-PP integration is enabled; check Equipment Master has calibration date populated; re-enter Equipment Number in Work Center to trigger propagation

**Issue:** Batch Record does not capture Work Center or calibration status
- **Solution:** Verify PP-QM integration is enabled; check batch management is active for the material; ensure Work Center is assigned to Process Order operation before confirmation

---

## Contact

For questions about test data preparation or SAP system access, contact the Test Data Management team or SAP Basis Administrator.
