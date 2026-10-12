# Test Data Guide: [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con

**Generated:**    2026-08-24
**Module:**       SD — Sales and Distribution
**Feature:**      Rebate Agreement Maintenance for GPO Contracts
**Data File:**    testdata/CS-38/CS-38-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-38/CS-38-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Organizational Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORGANIZATION_VALID}}` | An active sales organization code in the SAP test system | SAP Fiori: Configuration → Sales → Sales Organizations; or use 1710 if available in test system |
| `{{SALES_ORGANIZATION_INVALID}}` | A sales organization code that does NOT exist in SAP | Use a random code like "9999" — verify it returns "not found" |
| `{{DISTRIBUTION_CHANNEL_VALID}}` | An active distribution channel code | SAP Configuration → Distribution Channels; or use 10 if available |
| `{{DIVISION_VALID}}` | An active division code | SAP Configuration → Divisions; or use 00 if available |

### Customer and GPO Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID_GPO_ASSIGNED}}` | A customer account number that is assigned to a valid GPO | SAP Fiori: Manage Customers → search for customers with GPO assignment; or create test customer with GPO link |
| `{{CUSTOMER_NAME_VALID}}` | The full name of the customer above (auto-populated) | Shown in customer master data for the customer ID above |
| `{{CUSTOMER_ID_NO_GPO_ASSIGNMENT}}` | A customer account number that is NOT assigned to any GPO | Use a customer without GPO assignment in test system; or create one without GPO link |
| `{{GPO_ID_VALID}}` | A valid Group Purchasing Organization ID | SAP Fiori: Manage GPO → search for active GPOs; or create test GPO in configuration |
| `{{GPO_NAME_VALID}}` | The full name of the GPO above (auto-populated) | Shown in GPO master data for the GPO ID above |

### Rebate Condition Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{CONDITION_TYPE_REBATE_VALID}}` | A rebate condition type code configured in SAP | Use standard rebate condition types: BONU (Bonus), BOPE (Bonus per unit), or custom rebate type from pricing procedure |
| `{{CONDITION_TYPE_INVALID}}` | A condition type code that does NOT exist or is not configured for rebates | Use a non-existent code like "ZZZZ" or a non-rebate condition type |
| `{{REBATE_BASIS_VALUE}}` | Calculation basis set to "Value" | Use "Value" or equivalent code from rebate basis dropdown (typically standard option) |
| `{{REBATE_BASIS_VOLUME}}` | Calculation basis set to "Volume" | Use "Volume" or equivalent code from rebate basis dropdown |
| `{{REBATE_RATE_STANDARD}}` | A standard rebate rate or percentage | Use a typical rebate rate like 5.00 (for 5%) or 50.00 (for fixed amount per transaction) |
| `{{REBATE_RATE_PERCENTAGE}}` | A percentage-based rebate rate | Use a percentage value like 5.0 or 10.0 (interpreted as 5% or 10%) |
| `{{REBATE_RATE_MIN}}` | Minimum valid rebate rate (lower boundary) | Use 0.01 (lowest positive value accepted by SAP) |
| `{{REBATE_RATE_MAX}}` | Maximum valid rebate rate (upper boundary) | Use 100.00 (typically maximum percentage accepted by SAP) |
| `{{REBATE_RATE_NEGATIVE}}` | Negative rebate rate (invalid) | Use -5.00 (to test validation rejection) |

### Validity Period Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{VALIDITY_START_DATE_FUTURE}}` | A validity start date at least 1 day from test execution date | Calculate as: today + 1 day or more; format YYYY-MM-DD or DD.MM.YYYY (SAP format) |
| `{{VALIDITY_START_DATE_TODAY}}` | Validity start date = current date (boundary test) | Use today's date; format YYYY-MM-DD or DD.MM.YYYY |
| `{{VALIDITY_END_DATE_FUTURE}}` | A validity end date at least 30 days after start date | Calculate as: start date + 30 days (or more); must be after start date |
| `{{VALIDITY_END_DATE_SAME_AS_START}}` | Validity end date = start date (invalid) | Use the same date as start date (to test validation rejection) |
| `{{VALIDITY_END_DATE_BEFORE_START}}` | Validity end date < start date (invalid) | Use a date before the start date (e.g., start - 1 day; to test validation rejection) |
| `{{VERIFICATION_PERIOD_MONTHLY}}` | Accrual period set to Monthly | Use "Monthly" or equivalent code from verification period dropdown |
| `{{SETTLEMENT_PERIOD}}` | Period end settlement period | Use current fiscal period or test period code (e.g., "202608" for Aug 2026) |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_VALID}}` | An active material number in the SAP test system | SAP Fiori: Manage Material → search active materials; or use RMPI001 if available |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_INVALID}}` | A material number that does NOT exist in SAP | Use a non-existent code like "ZZNOTEXIST" |
| `{{MATERIAL_ID_VALID_1}}` | First material for multi-material test | Use a different active material (e.g., RMPI002) |
| `{{MATERIAL_DESCRIPTION_VALID_1}}` | Description of first material (auto-populated) | Shown in material master |
| `{{MATERIAL_ID_VALID_2}}` | Second material for multi-material test | Use another different active material (e.g., RMPI003) |
| `{{MATERIAL_DESCRIPTION_VALID_2}}` | Description of second material (auto-populated) | Shown in material master |
| `{{MATERIAL_GROUP_VALID}}` | An active material group code | SAP Configuration → Material Groups; or use L002 (Raw Materials) if available |

### Integration Test Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{REBATE_AGREEMENT_NUMBER_ACTIVE}}` | An existing active rebate agreement number (prerequisite for INT tests) | Create a rebate agreement using TC-CS-038 (HP-01) before executing INT tests; note the generated agreement number |
| `{{SALES_ORDER_QUANTITY}}` | Quantity for sales order in INT-01 | Use a standard sales quantity like 10 |
| `{{SALES_ORDER_PRICE}}` | Price per unit for sales order in INT-01 | Use a standard price like 100.00 |
| `{{ACCRUED_REBATE_AMOUNT}}` | Expected accrued rebate amount (INT-02) | Calculate based on rebate rate and sales order value; or query from SAP after INT-01 execution |

### System Configuration Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{CURRENCY_CODE}}` | Currency configured for the sales organization | Shown in sales organization configuration (e.g., USD, EUR, GBP) |

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
3. The invalid placeholders (`INVALID`, `NO_GPO_ASSIGNMENT`) must be verified to NOT exist in the test system before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **SD Rebate Processing Specific:** Customer-GPO assignment is critical — verify the customer is correctly assigned to the GPO in customer master data before test execution
7. **Integration Test Prerequisites:** TC-CS-059 and TC-CS-060 require an active rebate agreement to exist as a prerequisite — execute TC-CS-038 first and note the agreement number

---

## Test Data Resolution Checklist

Before executing test cases, verify the following test data is resolved and available:

- [ ] Valid Sales Organization, Distribution Channel, Division configured and active
- [ ] Valid Customer ID assigned to valid GPO ID (customer-GPO link verified)
- [ ] Valid Rebate Condition Type configured in pricing procedure
- [ ] Valid Material ID(s) and Material Group exist in material master
- [ ] Customer with NO GPO assignment exists (for NEG-01)
- [ ] Invalid placeholders verified as non-existent (invalid sales org, condition type, material)
- [ ] Date placeholders calculated based on test execution date
- [ ] Integration test prerequisite: Active rebate agreement created and agreement number noted
- [ ] All environment variables (`SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`) set in `.env` file

**Status:** Test data resolution required before automation script generation (Phase 4).
