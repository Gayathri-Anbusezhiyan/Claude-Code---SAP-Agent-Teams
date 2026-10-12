# Test Data Guide: [CS-41] User Story SD-009

**Generated:**    2026-08-24
**Module:**       SD — Sales & Distribution
**Feature:**      Cross-Border Sales Order Creation with Export Compliance Screening
**Data File:**    testdata/CS-41/CS-41-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-41/CS-41-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_CROSS_BORDER_VALID}}` | An active customer account with a destination country DIFFERENT from the company code country (cross-border flag); NOT on denied-party list | SAP Fiori: Manage Business Partner → search customers; verify Ship-To address country differs from company code country; or T-code VD03 |
| `{{CUSTOMER_NAME_CROSS_BORDER}}` | Full name of the cross-border customer (auto-populated) | Shown in customer master for the customer ID above |
| `{{CUSTOMER_ID_DOMESTIC}}` | An active customer account with a destination country SAME as the company code country (domestic flag) | SAP Fiori: Manage Business Partner → search customers; verify Ship-To address country matches company code country |
| `{{CUSTOMER_NAME_DOMESTIC}}` | Full name of the domestic customer (auto-populated) | Shown in customer master for the domestic customer ID |
| `{{CUSTOMER_ID_DENIED_PARTY}}` | A customer account that IS on the denied-party list or test denied-party screening list | Use a test customer ID configured in SAP GTS or external denied-party screening system as a test blocked customer; coordinate with SAP GTS admin to set up test denied-party record |
| `{{CUSTOMER_ID_NO_COUNTRY}}` | A customer account with MISSING destination country data in the customer master address record (KNA1/ADRC) | Use a test customer ID with incomplete address data; or create a test customer and intentionally leave the country field blank in the Ship-To address |
| `{{DOMESTIC_COUNTRY_CODE}}` | ISO country code matching the company code country (e.g., USA, DEU, GBR) | Verify company code country in SAP config (T-code OX02); use the same country code for domestic customer |
| `{{DESTINATION_COUNTRY_CROSS_BORDER}}` | ISO country code different from the company code country (e.g., if company is in USA, use GBR or DEU) | Use any valid ISO 3166-1 alpha-3 country code different from company code country |
| `{{DESTINATION_COUNTRY_NO_LICENSE}}` | ISO country code for which NO valid export license exists for the controlled product | Use a destination country for which no export license record has been created in SAP GTS or export license management system |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_CONTROLLED_PHARMA}}` | An active material number flagged as a controlled pharmaceutical product in the material master (MARA-EXPRF export control classification is set) | SAP Fiori: Manage Material → search materials with export control classification; or T-code MM03 → Foreign Trade: Export Data tab → Export Control Class |
| `{{MATERIAL_DESCRIPTION_CONTROLLED}}` | Material description (auto-populated) | Shown in material master for the controlled material ID above |
| `{{MATERIAL_ID_NON_CONTROLLED}}` | An active material number NOT flagged as controlled (export control classification is blank or non-controlled) | SAP Fiori: Manage Material → search materials; verify Export Control Class is blank or set to non-controlled value |
| `{{MATERIAL_DESCRIPTION_NON_CONTROLLED}}` | Material description for non-controlled material (auto-populated) | Shown in material master for the non-controlled material ID |
| `{{MATERIAL_ID_NO_CLASSIFICATION}}` | A material number with MISSING export control classification data in the material master | Use a test material with incomplete export control data; or create a test material and intentionally leave the Export Control Class field blank |

### Quantity and Pricing

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SO_QUANTITY_STANDARD}}` | A standard, realistic order quantity for the Sales Order | Use 10–100 depending on the UoM (e.g., 10 for EA, 1 for large items) |
| `{{SO_QUANTITY_MIN}}` | Minimum valid order quantity (lower boundary) | Typically 1; confirm with system configuration or material minimum order quantity settings |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORDER_TYPE}}` | Sales Order type code (e.g., OR for standard order, TA for credit memo) | SAP Fiori: Configuration → Sales → Sales Order Types; or T-code VOV8; use a standard order type like OR |
| `{{SALES_ORG_CODE}}` | Sales organization code assigned to the test company | SAP Fiori: Configuration → Enterprise Structure → Sales Organizations; or T-code OVX5 |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code (e.g., 01, 10) | SAP Fiori: Configuration → Enterprise Structure → Distribution Channels; or T-code OVXC |
| `{{DIVISION_CODE}}` | Division code (e.g., 00, 01) | SAP Fiori: Configuration → Enterprise Structure → Divisions; or T-code OVXD |

### Export License Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{EXPORT_LICENSE_NUMBER_VALID}}` | A valid export license number for the customer/destination/material combination with a future expiration date | SAP GTS: License Management → search export licenses; or coordinate with SAP GTS admin to create a test export license record valid for the cross-border customer, destination country, and controlled material |
| `{{EXPORT_LICENSE_VALID_TO_FUTURE}}` | Export license expiration date (must be AFTER the requested delivery date) | Set a date at least 60 days from test execution date; format YYYY-MM-DD |
| `{{EXPORT_LICENSE_NUMBER_EXPIRED}}` | An export license number that has EXPIRED (validity date is in the past) | Use a test export license with a past expiration date; or create a test license record with an expired validity date |
| `{{EXPORT_LICENSE_VALID_TO_PAST}}` | Export license expiration date (in the past) | Use any past date, e.g., 2024-01-01; format YYYY-MM-DD |
| `{{EXPORT_LICENSE_NUMBER_EXPIRING}}` | An export license number that will expire DURING the test execution (temporal boundary test) | Use a test export license with a validity date set to expire within minutes or hours of test execution; requires precise timing control or ability to manually advance system time |
| `{{EXPORT_LICENSE_VALID_TO_NEAR_FUTURE}}` | Export license expiration timestamp (near-future, e.g., within 5-10 minutes) | Set to current time + 5-10 minutes; format YYYY-MM-DD HH:MM:SS |

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DATE_FUTURE_30D}}` | A requested delivery date at least 30 calendar days from the test execution date | Calculate as: today + 30 days; format YYYY-MM-DD |

### Compliance and Audit

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{COMPLIANCE_CHECK_TIMESTAMP}}` | Timestamp when compliance screening was performed (system-generated) | This is typically auto-generated by SAP or SAP GTS during compliance screening; verify it appears in the SO compliance section after screening completes; format ISO8601 timestamp |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Must include SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4. Set in `.env` file. |

---

## Important Notes

### Test Data Setup Prerequisites

1. **Denied-Party List Configuration:**
   - Coordinate with SAP GTS or external denied-party screening system administrator to create a TEST denied-party customer record
   - Clearly mark the test customer as "TEST" to avoid confusion with real compliance data
   - Use `{{CUSTOMER_ID_DENIED_PARTY}}` for this test customer

2. **Export License Configuration:**
   - Coordinate with SAP GTS or export license management system administrator to create:
     - A valid export license record for `{{CUSTOMER_ID_CROSS_BORDER_VALID}}`, `{{DESTINATION_COUNTRY_CROSS_BORDER}}`, and `{{MATERIAL_ID_CONTROLLED_PHARMA}}`
     - An expired export license record for the expired license test case
     - An expiring export license record for the temporal boundary test case
   - All test export licenses must be clearly marked as "TEST" data

3. **Customer and Material Master Data:**
   - Verify all customer and material IDs exist in the SAP test system before test execution
   - Verify export control classification flags are set correctly on controlled materials
   - Verify customer address data includes destination country for cross-border customers
   - Create test customers with missing data (no country, no classification) for data quality test cases

4. **Integration Test Cases:**
   - INT-01 (Denied-Party API unavailable): Requires SAP GTS or external API to be temporarily unavailable during test execution — coordinate with system admin
   - INT-02 (Export License API unavailable): Requires export license system to be temporarily unavailable during test execution
   - INT-03 and INT-04 (Data quality issues): Require test customers/materials with intentionally missing master data fields

### Security and Compliance

1. **Never commit real SAP IDs, customer data, or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `{{CUSTOMER_ID_DENIED_PARTY}}` and all test export license records must be verified to NOT affect real production compliance screening
4. Test denied-party list and export license records must be clearly marked as "TEST" to prevent confusion with real compliance data
5. All compliance screening test attempts and results must be logged for regulatory audit purposes (minimum 5-7 years retention)
6. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
7. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests

### Regulatory Compliance Notes

- Sales Orders involving controlled pharmaceutical products and cross-border destinations are subject to international trade regulations (ITAR, EAR, or local export control laws)
- Denied-party screening is a legal requirement — failure to screen can result in civil/criminal penalties, license revocation, and reputational damage
- Export license validation is mandatory before shipment — unauthorized export of controlled items is a criminal offense
- Test data must NOT use real production customer IDs, material IDs, or actual denied-party list entries
- All test execution must use dedicated SAP S/4HANA Cloud test tenant (not production)

---

**Generated By:** testcase-agent/skills/extract-testdata
**Total Placeholders:** 28
**Datasets:** 16 (1 HP, 2 AP, 3 NEG, 3 ERR, 3 EDGE, 4 INT)
