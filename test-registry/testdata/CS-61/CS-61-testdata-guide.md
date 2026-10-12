# Test Data Guide: CS-61 — View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing

**Generated:**          2026-08-24
**User Story:**         CS-61
**Module:**             PP — Production Planning
**Feature:**            Work Center Capacity Planning for Cleanroom/Sterile Manufacturing

---

## Purpose

This guide explains how to resolve each `{{PLACEHOLDER}}` in `CS-61-testdata.json` to actual SAP S/4HANA Cloud system values. All placeholders must be substituted with valid SAP data before test execution.

---

## Environment Configuration Placeholders

These placeholders reference `.env` configuration values.

| Placeholder in Test Steps | `.env` Variable | Description | Example Value |
|--------------------------|----------------|-------------|---------------|
| `{ENV.SAP_FIORI_URL}` | `SAP_FIORI_URL` | Full SAP Fiori Launchpad URL including SSO parameters | `https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-autoStartTour=e8bc3755f84d8126e10000000a4450e5#Shell-home` |
| `{ENV.SAP_USERNAME}` | `SAP_USERNAME` | SAP user email address for authentication | `sunil.yogi@capgemini.com` |
| `{ENV.SAP_PASSWORD}` | `SAP_PASSWORD` | SAP user password for authentication | `SAP12345@1` |

---

## Master Data Placeholders — Work Centers

These placeholders reference SAP Work Center master data for cleanroom/sterile manufacturing environments.

| Placeholder | Description | How to Find | Constraints |
|------------|-------------|-------------|-------------|
| `{{WORK_CENTER_ID_STERILE}}` | Work center ID for cleanroom/sterile manufacturing | Transaction: CRHD table or Work Center master (via Fiori "Manage Work Centers" or backend t-code CR01) | Must be an active work center configured for cleanroom/sterile classification (e.g., Grade A/B cleanroom); must have capacity configured |
| `{{WORK_CENTER_DESCRIPTION_STERILE}}` | Work center description (auto-populated) | Auto-populated by SAP after entering work center ID | System-generated; should describe the cleanroom/sterile environment (e.g., "Cleanroom Grade A — Filling Line") |
| `{{WORK_CENTER_ID_INCOMPATIBLE}}` | Work center ID WITHOUT capability for the test material | Transaction: CRHD table or Work Center master | Must be an active work center that does NOT have capability for the test material (different cleanroom grade, different production line type) |
| `{{WORK_CENTER_ID_NON_EXISTENT}}` | Work center ID that does NOT exist in SAP | Manual entry — use a non-existent ID | Use a work center ID that is confirmed NOT to exist in the SAP system (e.g., "WC-INVALID-999") |

**Example Values:**
- `{{WORK_CENTER_ID_STERILE}}` = `STERILE-WC-001` or `CLEANROOM-A-01`
- `{{WORK_CENTER_DESCRIPTION_STERILE}}` = `Cleanroom Grade A — Filling Line`
- `{{WORK_CENTER_ID_INCOMPATIBLE}}` = `NON-STERILE-WC-01` (a work center without sterile capability)
- `{{WORK_CENTER_ID_NON_EXISTENT}}` = `WC-INVALID-999`

---

## Master Data Placeholders — Materials

These placeholders reference SAP Material master data for pharmaceutical or medical device products.

| Placeholder | Description | How to Find | Constraints |
|------------|-------------|-------------|-------------|
| `{{MATERIAL_ID_PRODUCT_A}}` | Material ID for product A (pharmaceutical/medical device) | Transaction: MARA table or Material Master (via Fiori "Manage Materials" or backend t-code MM03) | Must be an active material configured for the cleanroom/sterile work center; should represent a pharmaceutical or medical device product |
| `{{MATERIAL_ID_PRODUCT_B}}` | Material ID for product B (different from product A) | Same as above | Must be a DIFFERENT material from product A; used to test changeover time between different products |

**Example Values:**
- `{{MATERIAL_ID_PRODUCT_A}}` = `DRUG-VACCINE-001` or `PHARMA-TABLET-A`
- `{{MATERIAL_ID_PRODUCT_B}}` = `DRUG-VACCINE-002` or `PHARMA-TABLET-B`

**Notes:**
- Materials must be configured with changeover time in the work center changeover matrix (if testing changeover time scenarios)
- Materials should be assigned to a production version or routing that references the cleanroom/sterile work center

---

## Master Data Placeholders — Process Orders

These placeholders reference SAP Process Order master data.

| Placeholder | Description | How to Find | Constraints |
|------------|-------------|-------------|-------------|
| `{{PROCESS_ORDER_ID_SCHEDULED}}` | Process order already scheduled to the work center | Transaction: AFKO table or Manage Process Orders app | Must be an existing, released process order scheduled to the test work center with a future start date |
| `{{PROCESS_ORDER_ID_UNSCHEDULED}}` | Process order NOT currently scheduled (for rescheduling tests) | Same as above | Must be an existing, released process order that is either unscheduled or scheduled to a different time period/work center |
| `{{PROCESS_ORDER_ID_1}}` | First process order (for multi-order scenarios) | Same as above | Must be an existing, released process order scheduled to the test work center |
| `{{PROCESS_ORDER_ID_2}}` | Second process order (for multi-order scenarios) | Same as above | Must be an existing, released process order; can be scheduled or unscheduled depending on test scenario |
| `{{PROCESS_ORDER_ID_3}}` | Third process order (for resequencing scenarios) | Same as above | Must be an existing, released process order scheduled to the test work center |

**Example Values:**
- `{{PROCESS_ORDER_ID_SCHEDULED}}` = `1000123456` (10-digit process order number)
- `{{PROCESS_ORDER_ID_UNSCHEDULED}}` = `1000123457`
- `{{PROCESS_ORDER_ID_1}}` = `1000123458`
- `{{PROCESS_ORDER_ID_2}}` = `1000123459`
- `{{PROCESS_ORDER_ID_3}}` = `1000123460`

**Notes:**
- Process orders must be in "Released" status (STAT = REL)
- Process orders should reference materials `{{MATERIAL_ID_PRODUCT_A}}` or `{{MATERIAL_ID_PRODUCT_B}}`

---

## Master Data Placeholders — Operations

These placeholders reference SAP Process Order Operations data.

| Placeholder | Description | How to Find | Constraints |
|------------|-------------|-------------|-------------|
| `{{OPERATION_NUMBER}}` | Operation number within a process order | Transaction: AFVC table or Process Order Operations (via Fiori "Manage Process Orders" → Operations tab) | Must be an existing operation within the test process order; operation should be in "Planned" or "In Process" status (not yet confirmed) |

**Example Values:**
- `{{OPERATION_NUMBER}}` = `0010` or `0020` (4-digit operation number)

---

## Capacity Data Placeholders

These placeholders reference SAP capacity planning data values.

| Placeholder | Description | How to Find | Data Type | Constraints |
|------------|-------------|-------------|-----------|-------------|
| `{{AVAILABLE_CAPACITY_HOURS}}` | Total available capacity for the work center in the time period | Capacity Planning app → Available Capacity field | Numeric (hours) | Must be a positive number representing total capacity hours (e.g., 160 hours for one work center over one week) |
| `{{PLANNED_LOAD_NORMAL}}` | Planned load under normal utilization | Capacity Planning app → Planned Load field | Numeric (hours) | Must be less than available capacity (e.g., 120 hours when capacity is 160 hours = 75% utilization) |
| `{{PLANNED_LOAD_OVERLOAD}}` | Planned load exceeding available capacity | Capacity Planning app → Planned Load field | Numeric (hours) | Must be greater than available capacity (e.g., 192 hours when capacity is 160 hours = 120% utilization) |
| `{{PLANNED_LOAD_100_PERCENT}}` | Planned load exactly equal to available capacity | Capacity Planning app → Planned Load field | Numeric (hours) | Must be exactly equal to available capacity (e.g., 160 hours when capacity is 160 hours = 100% utilization) |
| `{{PLANNED_LOAD_ZERO}}` | Planned load at zero (idle work center) | Capacity Planning app → Planned Load field | Numeric (hours) | Must be 0 (no process orders scheduled) |
| `{{CONFIRMED_LOAD_NORMAL}}` | Confirmed load under normal conditions | Capacity Planning app → Confirmed Load field | Numeric (hours) | Must be less than or equal to planned load (e.g., 50 hours) |
| `{{CAPACITY_UTILIZATION_NORMAL}}` | Capacity utilization percentage under normal load | Capacity Planning app → Utilization field | Percentage | Must be less than 100% (e.g., 75%) |
| `{{CAPACITY_UTILIZATION_OVERLOAD}}` | Capacity utilization percentage in overload state | Capacity Planning app → Utilization field | Percentage | Must be greater than 100% (e.g., 120%) |
| `{{CAPACITY_UTILIZATION_100_PERCENT}}` | Capacity utilization at exactly 100% | Capacity Planning app → Utilization field | Percentage | Must be exactly 100% |
| `{{CAPACITY_UTILIZATION_ZERO}}` | Capacity utilization at 0% (idle) | Capacity Planning app → Utilization field | Percentage | Must be 0% |

**Example Values:**
- `{{AVAILABLE_CAPACITY_HOURS}}` = `160` (160 hours = 1 work center × 40 hours/week × 4 days)
- `{{PLANNED_LOAD_NORMAL}}` = `120` (75% utilization)
- `{{PLANNED_LOAD_OVERLOAD}}` = `192` (120% utilization)
- `{{PLANNED_LOAD_100_PERCENT}}` = `160` (100% utilization)
- `{{PLANNED_LOAD_ZERO}}` = `0`
- `{{CONFIRMED_LOAD_NORMAL}}` = `50`
- `{{CAPACITY_UTILIZATION_NORMAL}}` = `75%`
- `{{CAPACITY_UTILIZATION_OVERLOAD}}` = `120%`
- `{{CAPACITY_UTILIZATION_100_PERCENT}}` = `100%`
- `{{CAPACITY_UTILIZATION_ZERO}}` = `0%`

---

## Capacity Boundary Placeholders

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{REMAINING_CAPACITY_INSUFFICIENT}}` | Remaining capacity insufficient for scheduling a new process order | Numeric (hours) | Must be less than the duration of the process order to be scheduled (e.g., 8 hours remaining when process order duration is 20 hours) |
| `{{AVAILABLE_CAPACITY_ORIGINAL_SLOT}}` | Available capacity at the original time slot before rescheduling | Numeric (hours) | Represents capacity availability before a process order is moved (will increase after rescheduling) |
| `{{AVAILABLE_CAPACITY_NEW_SLOT}}` | Available capacity at the new time slot after rescheduling | Numeric (hours) | Represents capacity availability after a process order is moved (will decrease after rescheduling) |

**Example Values:**
- `{{REMAINING_CAPACITY_INSUFFICIENT}}` = `8` (when process order duration is 20 hours)
- `{{AVAILABLE_CAPACITY_ORIGINAL_SLOT}}` = `40` (before rescheduling)
- `{{AVAILABLE_CAPACITY_NEW_SLOT}}` = `60` (after rescheduling)

---

## Date and Time Placeholders

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{TIME_PERIOD_CURRENT_WEEK}}` | Current week planning horizon | Date range or period | Must be a future or current date range (e.g., "Current Week", "2026-08-24 to 2026-08-30") |
| `{{PROCESS_ORDER_START_DATE_CURRENT}}` | Current start date of a process order before rescheduling | Date/Time | Must be a future date/time (e.g., "2026-08-26 08:00") |
| `{{PROCESS_ORDER_START_DATE_NEW}}` | New start date of a process order after rescheduling | Date/Time | Must be a future date/time different from current start date (e.g., "2026-08-28 10:00") |
| `{{PROCESS_ORDER_START_DATE_PAST}}` | Past date (for error validation) | Date/Time | Must be a date/time in the past relative to the current date (e.g., "2026-08-20 08:00" when current date is "2026-08-24") |
| `{{PROCESS_ORDER_1_END_TIME}}` | End date/time of process order 1 | Date/Time | Must be a future date/time representing when process order 1 completes (e.g., "2026-08-26 16:00") |
| `{{PROCESS_ORDER_2_START_TIME_INVALID}}` | Invalid start time for process order 2 (immediately after process order 1 without changeover time) | Date/Time | Must be the same as process order 1 end time (e.g., "2026-08-26 16:00") — invalid because no changeover time gap |
| `{{PROCESS_ORDER_2_START_TIME_IMMEDIATE}}` | Valid start time for process order 2 immediately after process order 1 (same product, zero changeover time) | Date/Time | Must be the same as process order 1 end time (e.g., "2026-08-26 16:00") — valid for same product continuation |
| `{{CONFIRMATION_DATE_TIME}}` | Date and time of operation confirmation | Date/Time | Must be current date/time or a past date/time when the operation was completed (e.g., "2026-08-24 14:30") |

**Example Values:**
- `{{TIME_PERIOD_CURRENT_WEEK}}` = `Current Week` or `2026-08-24 to 2026-08-30`
- `{{PROCESS_ORDER_START_DATE_CURRENT}}` = `2026-08-26 08:00`
- `{{PROCESS_ORDER_START_DATE_NEW}}` = `2026-08-28 10:00`
- `{{PROCESS_ORDER_START_DATE_PAST}}` = `2026-08-20 08:00` (when current date is `2026-08-24`)
- `{{PROCESS_ORDER_1_END_TIME}}` = `2026-08-26 16:00`
- `{{PROCESS_ORDER_2_START_TIME_INVALID}}` = `2026-08-26 16:00` (same as end time of PO1, no changeover gap)
- `{{PROCESS_ORDER_2_START_TIME_IMMEDIATE}}` = `2026-08-26 16:00` (valid for same product)
- `{{CONFIRMATION_DATE_TIME}}` = `2026-08-24 14:30`

---

## Changeover Time Placeholders

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{CHANGEOVER_TIME_HOURS}}` | Required changeover/cleaning time between different products | Numeric (hours) | Must be a positive number greater than zero representing required cleaning time (e.g., 2 hours); configured in work center changeover matrix |
| `{{CHANGEOVER_TIME_ZERO}}` | Zero changeover time for same product continuation | Numeric (hours) | Must be 0 (no changeover required for same product) |
| `{{TOTAL_LOAD_WITH_CHANGEOVER}}` | Total load including process order durations and changeover time | Numeric (hours) | Must equal: PO1 duration + changeover time + PO2 duration (e.g., 10 + 2 + 8 = 20 hours) |

**Example Values:**
- `{{CHANGEOVER_TIME_HOURS}}` = `2` (2 hours changeover time)
- `{{CHANGEOVER_TIME_ZERO}}` = `0`
- `{{TOTAL_LOAD_WITH_CHANGEOVER}}` = `20` (10 hours PO1 + 2 hours changeover + 8 hours PO2)

---

## Process Order Duration and Quantity Placeholders

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{PROCESS_ORDER_DURATION_HOURS}}` | Duration (hours) of a process order | Numeric (hours) | Must be a positive number representing the planned duration of the process order (e.g., 20 hours) |
| `{{CONFIRMATION_QUANTITY}}` | Quantity confirmed for an operation | Numeric | Must be a positive number representing the confirmed quantity (should match planned quantity for successful confirmation) |

**Example Values:**
- `{{PROCESS_ORDER_DURATION_HOURS}}` = `20`
- `{{CONFIRMATION_QUANTITY}}` = `100` (100 units)

---

## Sequence Placeholders

| Placeholder | Description | Data Type | Example Value |
|------------|-------------|-----------|---------------|
| `{{PROCESS_ORDER_SEQUENCE_ORIGINAL}}` | Original execution sequence of process orders | Text | `PO1 → PO2 → PO3` |
| `{{PROCESS_ORDER_SEQUENCE_NEW}}` | New execution sequence after resequencing | Text | `PO2 → PO1 → PO3` |

---

## Visual Indicator Placeholders

| Placeholder | Description | Data Type | Example Value |
|------------|-------------|-----------|---------------|
| `{{OVERLOAD_INDICATOR_RED}}` | Visual indicator for overload situation | Text | `Red color, warning icon, or "Overload" label` |

---

## Integration Scenario Placeholders — MRP

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{MATERIAL_AVAILABILITY_DATE_ORIGINAL}}` | Original material availability date before rescheduling | Date | Must be a future date representing when the material is expected to be available from the process order (e.g., "2026-08-26") |
| `{{MATERIAL_AVAILABILITY_DATE_UPDATED}}` | Updated material availability date after rescheduling | Date | Must be a future date different from the original date, reflecting the new process order schedule (e.g., "2026-08-30") |

**Example Values:**
- `{{MATERIAL_AVAILABILITY_DATE_ORIGINAL}}` = `2026-08-26`
- `{{MATERIAL_AVAILABILITY_DATE_UPDATED}}` = `2026-08-30`

---

## Integration Scenario Placeholders — Shop Floor Execution

| Placeholder | Description | Data Type | Constraints |
|------------|-------------|-----------|-------------|
| `{{PLANNED_LOAD_BEFORE_CONFIRMATION}}` | Planned load before operation confirmation | Numeric (hours) | Must represent the total planned load before the operation is confirmed (e.g., 80 hours) |
| `{{CONFIRMED_LOAD_AFTER_CONFIRMATION}}` | Confirmed load after operation confirmation | Numeric (hours) | Must represent the total confirmed load after the operation is confirmed (e.g., 48 hours = original 40 hours + newly confirmed 8 hours) |

**Example Values:**
- `{{PLANNED_LOAD_BEFORE_CONFIRMATION}}` = `80`
- `{{CONFIRMED_LOAD_AFTER_CONFIRMATION}}` = `48` (original 40 + newly confirmed 8)

---

## Resolution Process

### Step 1: Identify Available Master Data
1. Log into SAP S/4HANA Cloud (tenant: `my426318.s4hana.cloud.sap`)
2. Navigate to "Manage Work Centers" Fiori app and identify cleanroom/sterile work centers
3. Navigate to "Manage Materials" Fiori app and identify pharmaceutical/medical device materials
4. Navigate to "Manage Process Orders" Fiori app and identify released process orders scheduled to the test work centers

### Step 2: Populate Test Data JSON
1. Open `CS-61-testdata.json`
2. Replace each `{{PLACEHOLDER}}` with the actual SAP value identified in Step 1
3. Verify that all placeholders are resolved (no `{{...}}` syntax remains)

### Step 3: Validate Test Data Consistency
1. Verify that work center IDs exist and are active in SAP
2. Verify that material IDs exist and are configured for the test work centers
3. Verify that process order IDs exist, are released, and reference the test materials and work centers
4. Verify that changeover time values match the configured changeover matrix in SAP
5. Verify that all dates are future dates relative to the test execution date

### Step 4: Execute Test Cases
1. Use the populated test data JSON as the test dataset source
2. Reference placeholders in test steps using `{TD.parameterName}` syntax (e.g., `{TD.workCenterId}`)
3. SAP system values should match the test data values during test execution

---

## Important Notes

### GMP and Cleanroom Manufacturing Considerations
- **Cleanroom Classification:** Work centers must be validated for specific cleanroom grades (Grade A/B/C/D per EU GMP Annex 1 or FDA equivalents)
- **Changeover Time is Mandatory:** Changeover/cleaning time between different products is a GMP requirement to prevent cross-contamination — test data must reflect this requirement
- **Fictitious Test Data:** Use fictitious product codes and work centers for testing — do NOT use real production identifiers that could interfere with validated manufacturing schedules
- **Test System Only:** Execute all tests in dedicated test system instances (not production)

### Test Data Best Practices
1. **Do NOT hardcode SAP values in test cases** — all values must use `{TD.*}` placeholders
2. **Use relative dates** — dates should be relative to test execution date (e.g., "current week", "next week")
3. **Verify data freshness** — ensure master data exists and is active before test execution
4. **Document actual values** — maintain a separate Excel sheet or document with the actual SAP values used for each test execution cycle

---

## Contact and Support

For questions about test data resolution or SAP system access, contact:
- **SAP System Administrator:** [SAP Admin Contact]
- **Test Data Manager:** [Test Data Manager Contact]
- **Production Planning SME:** [PP SME Contact]

---

**Last Updated:** 2026-08-24
