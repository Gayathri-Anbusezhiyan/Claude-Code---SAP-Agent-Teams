# Test Data Guide: CS-46 — Maintain Customer Scheduling Agreement for Hospital Recurring Supply

**User Story:** CS-46  
**Module:** SD — Sales & Distribution  
**Feature:** Customer Scheduling Agreement for Hospital Recurring Supply  
**Generated:** 2026-08-24  

---

## Purpose

This guide explains how to substitute the placeholder values in `CS-46-testdata.json` with actual SAP master data values from the SAP S/4HANA Cloud test tenant (my426318.s4hana.cloud.sap).

**Important:** All placeholder values follow the format `{{PLACEHOLDER_NAME}}`. Before test execution, replace each placeholder with a valid value from your SAP test system.

---

## Master Data Placeholders

### Customer (Hospital) Master Data

| Placeholder | Description | How to Find | Example Value | Notes |
|------------|-------------|-------------|---------------|-------|
| `{{CUSTOMER_ID_VALID}}` | Valid hospital customer account number assigned to sales organization | Transaction VD03 or Manage Customers Fiori app; filter by customer type = "Hospital" or "Healthcare" | `17300001` | Must be active and assigned to `{{SALES_ORG_CODE}}` |
| `{{CUSTOMER_NAME_VALID}}` | Customer name (auto-populated by SAP) | Auto-filled when Customer ID is validated | `City General Hospital` | **Do NOT enter manually** — SAP auto-populates this field |
| `{{CUSTOMER_ID_INVALID}}` | Non-existent customer account number | Use a number that does NOT exist in customer master KNA1 | `99999999` | For NEG-01 test case |
| `{{CUSTOMER_ID_NOT_ASSIGNED_TO_SALES_ORG}}` | Valid customer but not assigned to sales organization | Find a customer in VD03 that exists but is NOT assigned to the target sales org | `17300099` | For NEG-04 test case |

---

### Material (Pharmaceutical) Master Data

| Placeholder | Description | How to Find | Example Value | Notes |
|------------|-------------|-------------|---------------|-------|
| `{{MATERIAL_ID_VALID}}` | Valid pharmaceutical product material number | Transaction MM03 or Manage Materials Fiori app; filter by material type = "Pharmaceutical" or "Finished Goods" | `PHARMA-001` | Must be enabled for scheduling agreements in material master |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated by SAP) | Auto-filled when Material ID is validated | `Aspirin Tablets 500mg` | **Do NOT enter manually** — SAP auto-populates this field |
| `{{MATERIAL_ID_INVALID}}` | Non-existent material number | Use a number that does NOT exist in material master MARA | `INVALID-999` | For NEG-02 test case |
| `{{MATERIAL_ID_NOT_ENABLED_FOR_SA}}` | Valid material but not enabled for scheduling agreements | Find a material in MM03 that exists but is NOT configured for scheduling agreements in the Sales view | `PHARMA-099` | For NEG-03 test case |
| `{{UNIT_OF_MEASURE}}` | Unit of measure (auto-populated by SAP) | Auto-filled from material master when Material ID is validated | `EA` (Each), `KG` (Kilogram), `L` (Liter) | **Do NOT enter manually** — SAP auto-populates this field |

---

### Organizational Structure

| Placeholder | Description | How to Find | Example Value | Notes |
|------------|-------------|-------------|---------------|-------|
| `{{SALES_ORG_CODE}}` | Sales Organization code (auto-populated by SAP) | Auto-filled from customer sales area data KNVV when Customer ID is validated | `1710` | **Do NOT enter manually** — SAP auto-populates based on customer assignment |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution Channel code (auto-populated by SAP) | Auto-filled from customer sales area data KNVV when Customer ID is validated | `10` | **Do NOT enter manually** — SAP auto-populates based on customer assignment |
| `{{DIVISION_CODE}}` | Division code (auto-populated by SAP) | Auto-filled from customer sales area data KNVV when Customer ID is validated | `00` | **Do NOT enter manually** — SAP auto-populates based on customer assignment |

---

## Scheduling Agreement Quantities

| Placeholder | Description | Valid Values | Example Value | Notes |
|------------|-------------|--------------|---------------|-------|
| `{{SA_TOTAL_QUANTITY_STANDARD}}` | Standard total target quantity for scheduling agreement | Any positive integer | `1000` | Represents total quantity to be delivered over the validity period |
| `{{SA_TOTAL_QUANTITY_MIN}}` | Minimum valid total quantity (boundary test) | `1` | `1` | For EDGE-01 test case — tests lower boundary |
| `{{SA_TOTAL_QUANTITY_ZERO}}` | Zero total quantity (invalid) | `0` | `0` | For EDGE-02 test case — expected to be rejected by SAP |
| `{{SA_TOTAL_QUANTITY_MAX}}` | Maximum allowed total quantity (boundary test) | System-configured maximum (check material master UoM limits) | `99999` | For EDGE-03 test case — tests upper boundary |

---

## Validity Period (Dates)

| Placeholder | Description | Format | Example Value | Notes |
|------------|-------------|--------|---------------|-------|
| `{{VALIDITY_START_DATE_FUTURE}}` | Validity start date (future date) | YYYY-MM-DD | `2026-09-01` | Must be >= today's date |
| `{{VALIDITY_START_DATE_TODAY}}` | Validity start date = today (boundary test) | YYYY-MM-DD | `2026-08-24` | For EDGE-13 test case — earliest possible start date |
| `{{VALIDITY_START_DATE_PAST}}` | Validity start date in the past (invalid) | YYYY-MM-DD | `2026-07-01` | For NEG-06 test case — expected to be rejected by SAP |
| `{{VALIDITY_END_DATE_FUTURE}}` | Validity end date (future date) | YYYY-MM-DD | `2026-12-31` | Must be > validity start date |
| `{{VALIDITY_END_DATE_FUTURE_LONG}}` | Validity end date for long-term SA (e.g., 2 years) | YYYY-MM-DD | `2028-12-31` | For EDGE-05 test case (365-day interval requires long validity period) |
| `{{VALIDITY_END_DATE_ONE_DAY_AFTER}}` | Validity end date exactly 1 day after start date (boundary test) | YYYY-MM-DD | `2026-09-02` | For EDGE-12 test case — minimum validity period of 1 day |
| `{{VALIDITY_END_DATE_BEFORE_START}}` | Validity end date before start date (invalid) | YYYY-MM-DD | `2026-08-15` | For NEG-05 test case — expected to be rejected by SAP |
| `{{VALIDITY_END_DATE_APPROACHING}}` | End date within notification threshold period | YYYY-MM-DD | `2026-08-30` | For HP-05 test case — end date within 7 days of today |

---

## Delivery Schedule Configuration

### Fixed Dates

| Placeholder | Description | Format | Example Value | Notes |
|------------|-------------|--------|---------------|-------|
| `{{FIXED_DELIVERY_DATE_1}}` | First fixed delivery date | YYYY-MM-DD | `2026-09-10` | Must fall within validity period (between start and end dates) |
| `{{FIXED_DELIVERY_DATE_2}}` | Second fixed delivery date | YYYY-MM-DD | `2026-10-10` | Must fall within validity period |
| `{{FIXED_DELIVERY_DATE_3}}` | Third fixed delivery date | YYYY-MM-DD | `2026-11-10` | Must fall within validity period |
| `{{FIXED_DELIVERY_DATE_4}}` | Fourth fixed delivery date (for AP-01) | YYYY-MM-DD | `2026-12-10` | Must fall within validity period |

### Interval (Days Between Deliveries)

| Placeholder | Description | Valid Values | Example Value | Notes |
|------------|-------------|--------------|---------------|-------|
| `{{INTERVAL_STANDARD}}` | Standard interval (e.g., every 14 days) | 1–365 | `14` | Represents number of days between each delivery |
| `{{INTERVAL_MIN}}` | Minimum interval (boundary test) | `1` | `1` | For EDGE-04 test case — daily deliveries |
| `{{INTERVAL_MAX}}` | Maximum reasonable interval (boundary test) | `365` | `365` | For EDGE-05 test case — annual deliveries |
| `{{INTERVAL_ZERO}}` | Zero interval (invalid) | `0` | `0` | For EDGE-06 test case — expected to be rejected by SAP |

---

## Call-Off Data

| Placeholder | Description | Valid Values | Example Value | Notes |
|------------|-------------|--------------|---------------|-------|
| `{{SCHEDULING_AGREEMENT_NUMBER_VALID}}` | Existing scheduling agreement number | 10-digit numeric | `5500000123` | Create this SA in a pre-requisite setup step; must have open schedule lines |
| `{{SCHEDULING_AGREEMENT_NUMBER_NEARING_END}}` | SA with validity end date approaching | 10-digit numeric | `5500000124` | For HP-05 test case; create SA with end date within 7 days |
| `{{SCHEDULING_AGREEMENT_NUMBER_FULLY_CALLED_OFF}}` | SA with all quantity already called off | 10-digit numeric | `5500000125` | For EDGE-09 test case; cumulative = total quantity |
| `{{SCHEDULE_LINE_NUMBER_VALID}}` | Valid delivery schedule line number | Sequential (10, 20, 30...) | `10` | First schedule line |
| `{{SCHEDULE_LINE_NUMBER_1}}` | First schedule line (for multiple call-offs) | Sequential | `10` | For AP-03 test case |
| `{{SCHEDULE_LINE_NUMBER_2}}` | Second schedule line (for multiple call-offs) | Sequential | `20` | For AP-03 test case |
| `{{SCHEDULE_LINE_NUMBER_3}}` | Third schedule line (for multiple call-offs) | Sequential | `30` | For AP-03 test case |
| `{{SCHEDULE_LINE_NUMBER_INVALID}}` | Non-existent schedule line number | Sequential | `9999` | For NEG-08 test case |
| `{{CALL_OFF_QUANTITY_STANDARD}}` | Standard call-off quantity | Any positive integer <= remaining quantity | `100` | Must not exceed remaining quantity on the schedule line |
| `{{CALL_OFF_QUANTITY_1}}` | First call-off quantity (for multiple call-offs) | Positive integer | `50` | For AP-03 test case |
| `{{CALL_OFF_QUANTITY_2}}` | Second call-off quantity (for multiple call-offs) | Positive integer | `75` | For AP-03 test case |
| `{{CALL_OFF_QUANTITY_3}}` | Third call-off quantity (for multiple call-offs) | Positive integer | `100` | For AP-03 test case |
| `{{CALL_OFF_QUANTITY_TRIGGER_THRESHOLD}}` | Call-off quantity that brings remaining below threshold | Calculated value | `850` | For HP-04; if total = 1000, threshold = 20%, this brings remaining to 150 (15%) |
| `{{CALL_OFF_QUANTITY_EXACT_REMAINING}}` | Exact remaining quantity (boundary test) | Equals current remaining quantity | `150` | For EDGE-08 test case |
| `{{CALL_OFF_QUANTITY_EXCEEDS_REMAINING}}` | Quantity exceeding remaining (invalid) | Greater than remaining quantity | `999999` | For NEG-07 test case — expected to be rejected by SAP |

---

## Notification Thresholds

| Placeholder | Description | Valid Values | Example Value | Notes |
|------------|-------------|--------------|---------------|-------|
| `{{NOTIFICATION_THRESHOLD_PERCENTAGE}}` | Standard threshold percentage | 1–100 (%) | `20` | Notification triggers when remaining quantity < 20% of total |
| `{{NOTIFICATION_THRESHOLD_ZERO}}` | Threshold at 0% (no notification) | `0` | `0` | For EDGE-10 test case — no notification should trigger |
| `{{NOTIFICATION_THRESHOLD_MAX}}` | Threshold at 100% (immediate notification) | `100` | `100` | For EDGE-11 test case — notification triggers on any call-off |
| `{{END_DATE_THRESHOLD_DAYS}}` | Number of days before end date to trigger notification | 1–30 | `7` | Notification triggers 7 days before validity end date |

---

## Data Substitution Instructions

### Step 1: Identify Valid Master Data

Before executing test cases, identify and document valid master data from the SAP test tenant:

1. **Customer (Hospital):**
   - Navigate to "Manage Customers" Fiori app
   - Search for customers of type "Hospital" or "Healthcare"
   - Note Customer ID, Customer Name, Sales Org, Distribution Channel, Division
   - Verify customer is active and assigned to a sales organization

2. **Material (Pharmaceutical):**
   - Navigate to "Manage Materials" Fiori app
   - Search for materials of type "Pharmaceutical" or "Finished Goods"
   - Note Material ID, Material Description, UoM
   - Verify material is enabled for scheduling agreements in the Sales view

3. **Invalid Data:**
   - For invalid customer/material IDs, use non-existent numbers (e.g., `99999999` for customer, `INVALID-999` for material)
   - For "not enabled" scenarios, find materials that exist but are NOT configured for scheduling agreements

### Step 2: Replace Placeholders in JSON

Open `CS-46-testdata.json` and perform a global find-and-replace:

```
Find:    {{CUSTOMER_ID_VALID}}
Replace: 17300001

Find:    {{MATERIAL_ID_VALID}}
Replace: PHARMA-001

... (repeat for all placeholders)
```

### Step 3: Validate Substituted Data

After substitution:
- Verify all placeholder values are replaced (no `{{...}}` should remain)
- Verify dates are logical (end date > start date; delivery dates within validity period)
- Verify quantities are reasonable (call-off <= remaining; total > 0)
- Verify all references to the same entity use the same value consistently

---

## Notes

### Auto-Populated Fields

The following fields are **auto-populated by SAP** and should **NOT** be included in the test data JSON or manually entered during test execution:

- `{{CUSTOMER_NAME_VALID}}` — Auto-filled when Customer ID is validated
- `{{MATERIAL_DESCRIPTION_VALID}}` — Auto-filled when Material ID is validated
- `{{UNIT_OF_MEASURE}}` — Auto-filled from material master
- `{{SALES_ORG_CODE}}` — Auto-filled from customer sales area data
- `{{DISTRIBUTION_CHANNEL_CODE}}` — Auto-filled from customer sales area data
- `{{DIVISION_CODE}}` — Auto-filled from customer sales area data

These values are referenced in the "Expected Result" column of test steps to verify that SAP auto-populated them correctly.

### Pre-Requisite Data Creation

Some test cases (HP-03, HP-04, HP-05, NEG-07, NEG-08, EDGE-08, EDGE-09, AP-03) require a pre-existing Scheduling Agreement:

1. Execute TC-CS-125 or TC-CS-126 first to create a valid SA
2. Note the generated SA number
3. Use this SA number for call-off test cases
4. For EDGE-09 and HP-05, create additional SAs with specific conditions (fully called off, nearing end date)

### Date Calculation Examples

**Validity Period:**
- Start Date: `2026-09-01` (1 week from today)
- End Date: `2026-12-31` (4 months validity)

**Fixed Delivery Dates:**
- Date 1: `2026-09-10` (within validity period)
- Date 2: `2026-10-10` (within validity period)
- Date 3: `2026-11-10` (within validity period)

**Interval Calculation:**
- Interval: `14` days
- Start: `2026-09-01`
- End: `2026-12-31`
- Expected Schedule Lines: ~8 lines (every 14 days from Sept 1 to Dec 31)

### Notification Threshold Calculation

**Example:**
- Total Quantity: `1000` KG
- Notification Threshold: `20%`
- Threshold Quantity: `200` KG
- Notification triggers when remaining quantity < `200` KG

**Call-Off to Trigger Notification (HP-04):**
- Initial Remaining: `1000` KG
- Call-Off: `850` KG
- New Remaining: `150` KG (< 200 KG threshold)
- Notification: ✅ Triggered

---

## Validation Checklist

Before test execution, verify:

- [ ] All `{{PLACEHOLDER}}` values have been replaced with actual SAP data
- [ ] Customer ID exists in SAP customer master and is assigned to sales org
- [ ] Material ID exists in SAP material master and is enabled for scheduling agreements
- [ ] All dates are in YYYY-MM-DD format
- [ ] Validity end date > validity start date
- [ ] All fixed delivery dates fall within the validity period
- [ ] Call-off quantities do not exceed remaining quantities (except for NEG-07)
- [ ] Invalid placeholders (for NEG/ERR tests) use non-existent values
- [ ] Pre-requisite Scheduling Agreements exist for call-off test cases
- [ ] Notification thresholds are configured in SAP (if applicable)

---

## Contact

For questions about test data or SAP master data configuration, contact:
- **Test Data Manager:** [Name]
- **SAP Basis/Config Team:** [Name]
- **Project:** CS (Jira project key)
- **Tenant:** my426318.s4hana.cloud.sap
