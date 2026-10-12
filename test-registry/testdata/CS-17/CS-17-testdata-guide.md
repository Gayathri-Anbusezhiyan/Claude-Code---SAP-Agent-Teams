# Test Data Guide: CS-17 — Source List Management

**User Story:**     CS-17 — Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Module:**         MM — Materials Management
**Generated:**      2026-08-21
**Test Data File:** `testdata/CS-17/CS-17-testdata.json`

---

## Purpose

This guide explains how to replace the `{{PLACEHOLDER}}` values in `CS-17-testdata.json` with actual SAP master data from your test environment.

**IMPORTANT:** Use only test environment data. Never use production master data for testing.

---

## Master Data Requirements

### Material Master (MARA / MARC)

| Placeholder | Description | How to Find | Example Value |
|-------------|-------------|-------------|---------------|
| `{{MATERIAL_ID_GMP_CRITICAL}}` | GMP-critical raw material that can be restricted by source list | Navigate to "Manage Materials" app → search for materials with material type "ROH" (raw material) or "HALB" (semi-finished) → verify material is GMP-relevant and configured for source list restriction | `RMGMP001` |
| `{{MATERIAL_DESCRIPTION}}` | Material description (auto-populated by SAP after entering Material ID) | Auto-populated when Material ID is entered and confirmed in SAP | `GMP Critical Raw Material A` |
| `{{MATERIAL_ID_SOURCE_LIST_RESTRICTED}}` | Material already restricted by an active source list (for NEG test cases) | Same as above; ensure an active source list record already exists for this material-plant with at least one approved vendor | `RMGMP001` |
| `{{MATERIAL_ID_INVALID}}` | Non-existent Material ID (for ERR-05 test case) | Use a material ID that does NOT exist in your SAP material master (e.g., `INVALID999` or `ZZTEST999`) | `INVALID999` |

**Material Configuration Requirements:**
- Material type: ROH (raw material) or HALB (semi-finished)
- Material must be extended to the test plant (MARC table entry exists)
- Material must be flagged for GMP compliance (if your SAP system uses GMP flags)
- Material should have source list restriction enabled (optional for HP/AP; mandatory for NEG)

---

### Vendor Master (LFA1 / LFM1)

| Placeholder | Description | How to Find | Example Value |
|-------------|-------------|-------------|---------------|
| `{{VENDOR_ID_APPROVED}}` | Vendor that will be designated as approved in the source list | Navigate to "Manage Suppliers" app → search for active vendors assigned to your test purchasing organization | `17300001` |
| `{{VENDOR_NAME_APPROVED}}` | Vendor name (auto-populated by SAP after entering Vendor ID) | Auto-populated when Vendor ID is entered and confirmed in SAP | `Test Supplier A Inc.` |
| `{{VENDOR_ID_APPROVED_1}}` | First approved vendor (for multiple-vendor scenario TC-CS-022) | Same as above; select a different vendor from `VENDOR_ID_APPROVED` | `17300001` |
| `{{VENDOR_NAME_APPROVED_1}}` | First vendor name (auto-populated) | Auto-populated when Vendor ID 1 is entered | `Test Supplier A Inc.` |
| `{{VENDOR_ID_APPROVED_2}}` | Second approved vendor (for multiple-vendor scenario TC-CS-022) | Same as above; select a different vendor from `VENDOR_ID_APPROVED_1` | `17300002` |
| `{{VENDOR_NAME_APPROVED_2}}` | Second vendor name (auto-populated) | Auto-populated when Vendor ID 2 is entered | `Test Supplier B Corp.` |
| `{{VENDOR_ID_NON_APPROVED}}` | Vendor that is NOT on the approved source list (for NEG test cases) | Use a valid vendor ID that exists in SAP but is NOT present in the source list for the test material-plant | `17300099` |
| `{{VENDOR_NAME_NON_APPROVED}}` | Non-approved vendor name (auto-populated) | Auto-populated when non-approved Vendor ID is entered | `Non-Qualified Supplier Z` |
| `{{VENDOR_ID_INVALID}}` | Non-existent Vendor ID (for ERR-06 test case) | Use a vendor ID that does NOT exist in your SAP vendor master (e.g., `99999999` or `ZZTEST999`) | `99999999` |

**Vendor Configuration Requirements:**
- Vendor must be active (not blocked for purchasing)
- Vendor must be extended to the test purchasing organization (LFM1 table entry exists)
- Vendor should have valid payment terms and currency configured

---

### Organizational Master Data

| Placeholder | Description | How to Find | Example Value |
|-------------|-------------|-------------|---------------|
| `{{PLANT_CODE}}` | Test plant code | Navigate to "Manage Plants" or check your user defaults in "Manage Purchase Orders" → note the plant assigned to your user profile | `1710` |
| `{{PURCHASING_ORG_CODE}}` | Purchasing organization (auto-populated by SAP based on plant or user defaults) | Auto-populated when Plant is entered and confirmed in SAP; or check user profile defaults | `1710` |
| `{{COMPANY_CODE}}` | Company code (auto-populated by SAP based on plant assignment) | Auto-populated based on plant; or check plant assignment in "Manage Plants" app | `1710` |

**Organizational Configuration Requirements:**
- Plant must be assigned to a valid purchasing organization
- Purchasing organization must be assigned to a valid company code
- User executing the tests must have purchasing authorization for the purchasing organization

---

### Date Placeholders

| Placeholder | Description | How to Calculate | Example Value |
|-------------|-------------|-----------------|---------------|
| `{{DATE_TODAY}}` | Today's date | Use the current system date at the time of test execution (format: YYYY-MM-DD or MM/DD/YYYY depending on SAP locale) | `2026-08-21` |
| `{{DATE_TODAY_PLUS_1}}` | Today + 1 day | Add 1 day to today's date | `2026-08-22` |
| `{{DATE_FUTURE_5_DAYS}}` | Today + 5 days | Add 5 days to today's date | `2026-08-26` |
| `{{DATE_FUTURE_30_DAYS}}` | Today + 30 days | Add 30 days to today's date | `2026-09-20` |
| `{{DATE_FUTURE_35_DAYS}}` | Today + 35 days | Add 35 days to today's date | `2026-09-25` |
| `{{DATE_FUTURE_2_YEARS}}` | Today + 2 years | Add 2 years (730 days) to today's date | `2028-08-21` |
| `{{DATE_FUTURE_10_YEARS}}` | Today + 10 years | Add 10 years (3650 days) to today's date | `2036-08-21` |
| `{{DATE_PAST_30_DAYS}}` | Today - 30 days | Subtract 30 days from today's date | `2026-07-22` |
| `{{DATE_PAST_60_DAYS}}` | Today - 60 days | Subtract 60 days from today's date | `2026-06-22` |

**Date Format Notes:**
- SAP date format depends on your user locale settings
- Common formats: `YYYY-MM-DD` (ISO), `MM/DD/YYYY` (US), `DD.MM.YYYY` (DE)
- Use dynamic date calculation at test execution time (do NOT hardcode specific calendar dates)

---

### Numeric and Quantity Placeholders

| Placeholder | Description | Recommended Value | Example |
|-------------|-------------|-------------------|---------|
| `{{PO_QUANTITY_STANDARD}}` | Standard order quantity (for NEG test case PO creation attempt) | Any positive integer (e.g., 10, 100) | `10` |
| `{{NET_PRICE_VALID}}` | Valid net order price (for NEG test case PO creation attempt) | Any positive decimal (e.g., 10.00, 100.50) | `10.00` |

---

## Data Set Mapping

### Happy Path / Alternative Path Test Cases

| Test Case | Data Set ID | Key Placeholders |
|-----------|-------------|------------------|
| TC-CS-021 | TD-CS-017-001 | `MATERIAL_ID_GMP_CRITICAL`, `VENDOR_ID_APPROVED`, `PLANT_CODE`, `DATE_TODAY`, `DATE_FUTURE_30_DAYS` |
| TC-CS-022 | TD-CS-017-002 | `MATERIAL_ID_GMP_CRITICAL`, `VENDOR_ID_APPROVED_1`, `VENDOR_ID_APPROVED_2`, `PLANT_CODE`, `DATE_TODAY`, `DATE_FUTURE_30_DAYS` |
| TC-CS-023 | TD-CS-017-003 | `MATERIAL_ID_GMP_CRITICAL`, `VENDOR_ID_APPROVED`, `PLANT_CODE`, `DATE_TODAY` (no end date) |

### Negative Test Cases

| Test Case | Data Set ID | Key Placeholders |
|-----------|-------------|------------------|
| TC-CS-024 | TD-CS-017-NEG-001 | `MATERIAL_ID_SOURCE_LIST_RESTRICTED`, `VENDOR_ID_NON_APPROVED`, `VENDOR_ID_APPROVED`, `PO_QUANTITY_STANDARD`, `NET_PRICE_VALID` |
| TC-CS-025 | TD-CS-017-NEG-002 | `MATERIAL_ID_SOURCE_LIST_RESTRICTED`, `VENDOR_ID_NON_APPROVED` |

### Error Test Cases

| Test Case | Data Set ID | Missing Field | Key Placeholders |
|-----------|-------------|--------------|------------------|
| TC-CS-026 | TD-CS-017-ERR-001 | Material | All fields EXCEPT `materialId` |
| TC-CS-027 | TD-CS-017-ERR-002 | Vendor | All fields EXCEPT `vendorId` |
| TC-CS-028 | TD-CS-017-ERR-003 | Plant | All fields EXCEPT `plant` |
| TC-CS-029 | TD-CS-017-ERR-004 | Validity Start Date | All fields EXCEPT `validityStartDate` |
| TC-CS-030 | TD-CS-017-ERR-005 | Invalid Material | `MATERIAL_ID_INVALID` (non-existent) |
| TC-CS-031 | TD-CS-017-ERR-006 | Invalid Vendor | `VENDOR_ID_INVALID` (non-existent) |

### Edge Case Test Cases

| Test Case | Data Set ID | Boundary Tested | Key Placeholders |
|-----------|-------------|-----------------|------------------|
| TC-CS-032 | TD-CS-017-EDGE-001 | Start Date = Today (lower) | `DATE_TODAY` |
| TC-CS-033 | TD-CS-017-EDGE-002 | End Date = Start + 1 Day (duration lower) | `DATE_TODAY`, `DATE_TODAY_PLUS_1` |
| TC-CS-034 | TD-CS-017-EDGE-003 | End Date in Past (expired) | `DATE_PAST_60_DAYS`, `DATE_PAST_30_DAYS` |
| TC-CS-035 | TD-CS-017-EDGE-004 | End Date Far Future (upper) | `DATE_FUTURE_10_YEARS` |
| TC-CS-036 | TD-CS-017-EDGE-005 | Notification Lead Time = 1 Day (lower) | `notificationLeadTimeMin: 1` |
| TC-CS-037 | TD-CS-017-EDGE-006 | Notification Lead Time = 365 Days (upper) | `notificationLeadTimeMax: 365` |

### Integration Test Case

| Test Case | Data Set ID | Integration Point | Key Placeholders |
|-----------|-------------|-------------------|------------------|
| TC-CS-038 | TD-CS-017-INT-001 | Notification Workflow | `notificationLeadTime: 30`, `DATE_FUTURE_35_DAYS` |

---

## How to Use This Guide

### Step 1: Identify Your SAP Test Environment Master Data

1. Log in to your SAP S/4HANA Cloud test environment
2. Navigate to the "Manage Materials" app → identify 1-2 GMP-critical raw materials
3. Navigate to the "Manage Suppliers" app → identify 3-4 active vendors assigned to your purchasing org
4. Note your test plant code, purchasing organization, and company code

### Step 2: Create a Local Test Data Mapping File (Optional)

Create a simple mapping file (e.g., `CS-17-testdata-resolved.txt`) with your environment-specific values:

```
# CS-17 Test Data — My Test Environment
MATERIAL_ID_GMP_CRITICAL=RMGMP001
VENDOR_ID_APPROVED=17300001
VENDOR_ID_APPROVED_1=17300001
VENDOR_ID_APPROVED_2=17300002
VENDOR_ID_NON_APPROVED=17300099
VENDOR_ID_INVALID=99999999
MATERIAL_ID_INVALID=INVALID999
PLANT_CODE=1710
PURCHASING_ORG_CODE=1710
COMPANY_CODE=1710
```

### Step 3: Replace Placeholders During Test Execution

When executing test cases:
- For **manual execution**: Refer to this guide and substitute the placeholder values with your test environment data at each step
- For **automation**: The Automation Agent will read `CS-17-testdata.json`, replace all `{{PLACEHOLDER}}` values with real SAP data, and write the resolved data to `automation/test-data/mm-source-list.data.json`

---

## Prerequisites for Test Execution

### Material-Vendor-Plant Setup

Before executing the test cases, ensure the following setup is complete in your SAP test environment:

1. **Material `{{MATERIAL_ID_GMP_CRITICAL}}` is configured:**
   - Material type: ROH or HALB
   - Extended to plant `{{PLANT_CODE}}` (MARC table entry exists)
   - Procurement type: External procurement (F)
   - MRP type: Any valid value (e.g., PD)
   - GMP-relevant flag: Active (if applicable)

2. **Vendor `{{VENDOR_ID_APPROVED}}` is configured:**
   - Vendor is active (not blocked)
   - Extended to purchasing org `{{PURCHASING_ORG_CODE}}` (LFM1 table entry exists)
   - Payment terms, currency, and incoterms are defined

3. **Source List Configuration (for NEG test cases):**
   - For NEG test cases TC-CS-024 and TC-CS-025, a source list record must already exist for material `{{MATERIAL_ID_SOURCE_LIST_RESTRICTED}}` and plant `{{PLANT_CODE}}` with at least one approved vendor (`{{VENDOR_ID_APPROVED}}`)
   - The source list must have the "Fixed Vendor" / "Block" indicator enabled to enforce PO blocking
   - Vendor `{{VENDOR_ID_NON_APPROVED}}` must NOT be present in the source list

### Notification System Configuration (for EDGE and INT test cases)

For test cases TC-CS-036, TC-CS-037, and TC-CS-038:
- SAP notification/workflow system must be configured and active
- Notification recipients (Procurement team distribution list) must be defined
- Background jobs for notification processing must be scheduled and running
- Email or SAP inbox access is required to verify notification delivery

---

## Troubleshooting

### Issue: Material ID not found

**Solution:** Verify the material exists in "Manage Materials" app and is extended to the test plant.

### Issue: Vendor ID not found

**Solution:** Verify the vendor exists in "Manage Suppliers" app and is extended to the test purchasing organization.

### Issue: Plant field validation error

**Solution:** Verify the plant is active and assigned to a purchasing organization and company code. Check user authorizations for the plant.

### Issue: Source list blocking not working (NEG test cases)

**Solution:** Verify that:
1. A source list record exists for the material-plant with the "Fixed Vendor" indicator enabled
2. The source list has at least one approved vendor
3. The vendor you're testing with is NOT present in the source list
4. The source list validity dates are active (current date falls within the validity period)

### Issue: Notification not received (EDGE/INT test cases)

**Solution:** Verify that:
1. SAP notification system is configured and active
2. Background jobs for notification processing are scheduled and running (check transaction SM37 or "Monitor Background Jobs" app)
3. Notification lead time calculation is correct (validity end date minus lead time = trigger date)
4. System date has reached the notification trigger date

---

## Data Refresh Notes

- **Before each test cycle:** Verify that all master data (materials, vendors, plants) still exists and is active in your test environment
- **After destructive tests:** Some NEG/ERR test cases may leave the system in an intermediate state (e.g., draft PO records). Clean up any incomplete transactions before re-running tests
- **Source list records created during testing:** May need to be deleted or marked inactive before re-running HP/AP/EDGE test cases to avoid duplicate records

---

**For questions or issues with test data setup, contact the Test Lead or SAP Basis team.**
