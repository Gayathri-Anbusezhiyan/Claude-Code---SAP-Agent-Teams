# Test Data Guide: [CS-43] Create A New Customer Master Record With A Designated Credit Limit And

**Generated:**    2026-08-24
**Module:**       SD — Sales and Distribution
**Feature:**      Customer Master Data Management
**Data File:**    testdata/CS-43/CS-43-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-43/CS-43-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system (my426318.s4hana.cloud.sap)
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_NAME_VALID}}` | A test customer business name (synthetic, not real company name) | Use a test value like "Test Customer Alpha" or "ABC Test Corp" — do NOT use real production customer names |

### Credit Management Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{CREDIT_LIMIT_STANDARD}}` | A standard, realistic credit limit for testing | Use a typical value like 10000.00 or 50000.00 depending on business context |
| `{{CREDIT_LIMIT_MIN}}` | Minimum valid credit limit (lower boundary) | Typically 0.01 (smallest non-zero value per currency decimal places) |
| `{{CREDIT_LIMIT_MAX}}` | Maximum allowed credit limit (upper boundary) | Typically 999999999.99 or per SAP system max value; verify with SAP configuration |
| `{{CURRENCY_CODE}}` | Currency code for credit limit | Use 3-character ISO code from SAP tenant configuration (e.g., USD, EUR, GBP, INR) |

### Regulatory Compliance Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{REGULATORY_LICENSE_VALID}}` | A valid regulatory license classification code from predefined SAP configuration | SAP Fiori: Configuration → Customer Master → License Classifications; or via SPRO customizing; select a test-safe value (not a real license number) |
| `{{REGULATORY_LICENSE_INVALID}}` | A non-existent or invalid license classification value | Use a random value like "INVALID_LICENSE_9999" — verify it does NOT exist in SAP configuration |

### Sales Area Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORGANIZATION_CODE}}` | Sales organization code assigned to the test company | SAP Fiori: Configuration → Enterprise Structure → Sales Organizations; or T-code OVX5 in classic SAP GUI; typically 4-digit code (e.g., 1010) |
| `{{SALES_ORGANIZATION_INVALID}}` | A non-existent sales organization code | Use a random code like "9999" — verify it returns "not found" in sales org validation |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code within the sales organization | SAP Fiori: Configuration → Sales → Distribution Channels; or T-code OVX1; typically 2-digit code (e.g., 10) |
| `{{DIVISION_CODE}}` | Division code for product/business line | SAP Fiori: Configuration → Sales → Divisions; or T-code OVX2; typically 2-digit code (e.g., 00 or 01) |

### Financial and Organizational Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{COMPANY_CODE}}` | Company code assigned to the customer's sales area | SAP Fiori: Configuration → Enterprise Structure → Company Codes; or T-code OX02; typically 4-digit code (e.g., 1010) |
| `{{COMPANY_CODE_INVALID}}` | A non-existent company code OR a company code not linked to any credit control area | Use a random code like "9999" — verify it does NOT exist in SAP configuration, OR use a valid company code that has no credit control area assignment |
| `{{CREDIT_CONTROL_AREA}}` | Credit control area code (auto-populated from company code assignment) | SAP Fiori: Configuration → Finance → Credit Management → Credit Control Areas; or T-code OB45; verify which credit control area is assigned to your test company code |

### General Configuration Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{COUNTRY_CODE}}` | Country key for customer location | Use 2-character ISO country code (e.g., US, GB, DE, IN); verify country is configured in SAP via T-code OY17 |
| `{{CUSTOMER_ACCOUNT_GROUP}}` | Customer account group (determines number range and field configuration) | SAP Fiori: Configuration → Customer Master → Account Groups; or T-code OVT0; use a test-appropriate account group (e.g., "KUNA" for sold-to party or equivalent) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Full launch URL with SSO parameters. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login email step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login password step 4 of every test case. Set in `.env` file. |

---

## Data Resolution Instructions for CS-43

### Step 1: Verify Sales Area Configuration

Before executing test cases, verify that the Sales Organization, Distribution Channel, and Division combination is configured in your SAP tenant:

1. Navigate to SAP Fiori Configuration apps or T-code OVXF
2. Verify Sales Area assignment (Sales Org + Dist Channel + Division)
3. Record the valid combination in the test data JSON

### Step 2: Verify Company Code and Credit Control Area Assignment

1. Navigate to T-code OB38 or Fiori Configuration → Finance → Credit Management
2. Identify a Company Code that is properly assigned to a Credit Control Area
3. Record both values in the test data JSON
4. Verify Credit Control Area is active and functional

### Step 3: Identify Valid Regulatory License Classification

1. Navigate to Customer Master configuration in SPRO or via Fiori Configuration apps
2. Locate the "License Classifications" or "Trade License" customizing table
3. Select a test-safe predefined value (not a real regulatory license number)
4. Record the value in the test data JSON

### Step 4: Verify Customer Account Group Configuration

1. Navigate to T-code OVT0 or Fiori Configuration → Customer Master → Account Groups
2. Select a customer account group suitable for testing (e.g., sold-to party account group)
3. Verify the account group has an external or internal number range configured
4. Record the account group key in the test data JSON

### Step 5: Define Boundary Values for Credit Limit

1. Verify currency configuration for decimal places (T-code OY04 or Fiori Configuration → Currencies)
2. Define minimum valid credit limit as 0.01 (or per currency decimal places)
3. Define maximum credit limit as 999999999.99 or per SAP data type limits
4. Record boundary values in the test data JSON

---

## Important Notes

1. **Never commit real SAP IDs, customer names, or regulatory license numbers** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** (my426318.s4hana.cloud.sap) — never use production data
3. The `SALES_ORGANIZATION_INVALID`, `REGULATORY_LICENSE_INVALID`, and `COMPANY_CODE_INVALID` values must be verified to NOT exist in the test system before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object or configuration does not exist in your test system, create it using the relevant SAP Fiori configuration apps or SPRO customizing before executing tests
6. **Regulatory compliance:** Use test-safe license classification values only — never use real regulatory license numbers in test data
7. **Credit limit boundaries:** Zero credit limit (EDGE-01) may be accepted or rejected depending on SAP tenant business configuration — document actual behaviour during test execution
8. **Empty string values:** In ERR datasets, empty strings (`""`) represent intentionally blank mandatory fields — do NOT replace them with values

---

## Test Data Dependencies

| Test Case | Dataset ID | Critical Data Elements |
|-----------|-----------|------------------------|
| TC-CS-021 (HP) | TD-CS-043-001 | All valid data — full customer master with credit limit and license |
| TC-CS-022 (NEG) | TD-CS-043-NEG-001 | INVALID regulatory license classification |
| TC-CS-023 (NEG) | TD-CS-043-NEG-002 | INVALID (non-existent) sales organization |
| TC-CS-024 (NEG) | TD-CS-043-NEG-003 | INVALID company code (not linked to credit control area) |
| TC-CS-025 (ERR) | TD-CS-043-ERR-001 | EMPTY customer name field |
| TC-CS-026 (ERR) | TD-CS-043-ERR-002 | EMPTY credit limit field |
| TC-CS-027 (ERR) | TD-CS-043-ERR-003 | EMPTY regulatory license field |
| TC-CS-028 (EDGE) | TD-CS-043-EDGE-001 | ZERO credit limit (boundary test) |
| TC-CS-029 (EDGE) | TD-CS-043-EDGE-002 | MAXIMUM credit limit (upper boundary) |
| TC-CS-030 (EDGE) | TD-CS-043-EDGE-003 | MINIMUM valid credit limit (0.01 — lower boundary) |

---

## Data Validation Checklist

Before executing test cases, verify:

- [ ] Sales Organization `{{SALES_ORGANIZATION_CODE}}` exists and is active in SAP tenant my426318
- [ ] Distribution Channel `{{DISTRIBUTION_CHANNEL_CODE}}` is assigned to the sales organization
- [ ] Division `{{DIVISION_CODE}}` is assigned to the sales organization
- [ ] Company Code `{{COMPANY_CODE}}` is active and linked to Credit Control Area `{{CREDIT_CONTROL_AREA}}`
- [ ] Regulatory License Classification `{{REGULATORY_LICENSE_VALID}}` exists in SAP customizing
- [ ] Customer Account Group `{{CUSTOMER_ACCOUNT_GROUP}}` is configured with number range
- [ ] Invalid values (`{{SALES_ORGANIZATION_INVALID}}`, `{{REGULATORY_LICENSE_INVALID}}`, `{{COMPANY_CODE_INVALID}}`) do NOT exist in SAP
- [ ] Currency `{{CURRENCY_CODE}}` is configured and active in SAP
- [ ] Country Code `{{COUNTRY_CODE}}` is configured in SAP

---

## Summary

- **Total Placeholders:** 16
- **Datasets:** 10 (1 HP + 3 NEG + 3 ERR + 3 EDGE)
- **Test Cases Covered:** TC-CS-021 through TC-CS-030
- **Environment Variables:** 3 (SAP_FIORI_URL, SAP_USERNAME, SAP_PASSWORD)
- **SAP Tenant:** my426318.s4hana.cloud.sap

**Next Step:** Replace all `{{PLACEHOLDER}}` values in `testdata/CS-43/CS-43-testdata.json` with actual values from the SAP test tenant, then execute test cases TC-CS-021 through TC-CS-030.
