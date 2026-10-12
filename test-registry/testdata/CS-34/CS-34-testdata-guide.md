# Test Data Guide: [CS-34] User Story SD-002

**Generated:**    2026-08-23
**Module:**       SD — Sales & Distribution
**Feature:**      Sales Order License Verification for Controlled Substances
**Data File:**    testdata/CS-34/CS-34-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-34/CS-34-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID_LICENSE}}` | Customer account with VALID, NON-EXPIRING pharmacy/wholesaler license (>= 60 days from today) | SAP Fiori: Manage Customer Master → search customers with valid license custom fields; verify license expiration date > 60 days from today |
| `{{CUSTOMER_NAME_VALID}}` | Customer name (auto-populated from customer master) | Shown in customer master BP data |
| `{{CUSTOMER_ID_LICENSE_NEAR_EXPIRY}}` | Customer with valid license expiring WITHIN 30 days (15 days recommended for testing) | Find customer with license expiration date between today + 1 and today + 30 |
| `{{CUSTOMER_ID_EXPIRED_LICENSE}}` | Customer with EXPIRED license (expiration date < today) | Find customer with license expiration date in the past |
| `{{CUSTOMER_ID_NO_LICENSE}}` | Customer with NO license on file (license field null or not maintained) | Find customer with blank/null license classification or expiration fields |
| `{{CUSTOMER_ID_MISMATCH_LICENSE}}` | Customer with valid license but WRONG classification (e.g., pharmacy license when material requires wholesaler) | Find customer with license classification that does not match material regulatory requirement |
| `{{CUSTOMER_ID_LICENSE_EXPIRES_TODAY}}` | Customer with license expiring TODAY (boundary test) | Find or create customer with license expiration date = today's date |
| `{{CUSTOMER_ID_MISSING_LICENSE_FIELDS}}` | Customer master record missing license custom fields (not maintained) | Find customer with license fields not configured or null in custom tables |
| `{{CUSTOMER_ID_INVALID}}` | Non-existent customer ID | Use random 10-digit ID not in customer master (e.g., 9999999999) |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_CONTROLLED}}` | Active material flagged as CONTROLLED SUBSTANCE in material master | SAP Fiori: Manage Material → search materials with controlled substance flag = X or custom field indicating regulatory control |
| `{{MATERIAL_DESCRIPTION_CONTROLLED}}` | Material description (auto-populated) | Shown in material master MAKT table |
| `{{MATERIAL_ID_NOT_FLAGGED_CONTROLLED}}` | Material NOT flagged as controlled (for integration test) | Find standard material without controlled substance flag |
| `{{MATERIAL_ID_INVALID}}` | Non-existent material ID | Use random 18-char ID not in material master (e.g., ZZNOTEXIST999) |

### Quantity and Organizational Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SO_QUANTITY_STANDARD}}` | Standard order quantity for sales order | Use 1–100 depending on material UoM (e.g., 10 EA) |
| `{{SALES_ORG_CODE}}` | Sales Organization code assigned to user | SAP Fiori: Configuration → Sales → Sales Organizations; or user default (e.g., 1010) |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel for sales org | Use valid channel for sales org (e.g., 01, 02) |
| `{{DIVISION_CODE}}` | Division for sales org | Use valid division (e.g., 01, 02) |

### License Fields

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{LICENSE_STATUS_VALID}}` | Customer license status (custom field) | Use "ACTIVE" or "VALID" or custom status code indicating valid license |
| `{{LICENSE_EXPIRY_DATE_FUTURE_60D}}` | License expiration date >= 60 days from today | Calculate as: today + 60 days; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_FUTURE_30D}}` | License expiration date = 30 days from today (threshold boundary) | Calculate as: today + 30 days; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_FUTURE_15D}}` | License expiration date = 15 days from today (within warning threshold) | Calculate as: today + 15 days; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_FUTURE_2D}}` | License expiration date = 2 days from today (for 1-day threshold test) | Calculate as: today + 2 days; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_FUTURE_360D}}` | License expiration date = 360 days from today (for 365-day threshold test) | Calculate as: today + 360 days; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_TODAY}}` | License expiration date = TODAY (boundary test) | Use today's date; format YYYY-MM-DD |
| `{{LICENSE_EXPIRY_DATE_PAST}}` | License expiration date in the PAST (expired) | Use past date (e.g., 2025-01-01) |
| `{{WARNING_THRESHOLD_DAYS_DEFAULT}}` | System-configured warning threshold (default) | Use 30 days (standard regulatory warning threshold) |
| `{{WARNING_THRESHOLD_DAYS_MIN}}` | Minimum warning threshold | Use 1 day |
| `{{WARNING_THRESHOLD_DAYS_MAX}}` | Maximum warning threshold | Use 365 days |
| `{{DAYS_UNTIL_EXPIRY_15}}` | Calculated days until license expiry (for warning message) | Use 15 (matches LICENSE_EXPIRY_DATE_FUTURE_15D) |
| `{{LICENSE_CLASSIFICATION_MISMATCH}}` | License classification that does NOT match material requirement | Use "PHARMACY" when material requires "WHOLESALER", or vice versa (depends on custom config) |

### Override and Justification

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{OVERRIDE_JUSTIFICATION_VALID}}` | Documented business justification for Compliance override | Use realistic text: "Emergency order approved by Compliance Manager Jane Doe — license renewal in progress ref CM-2026-123" (min 20 chars) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Full URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2. User email address for SAP IDP login. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4. Password for SAP authentication. |

---

## Important Notes

### Regulatory and Compliance

1. **Never commit real SAP IDs, license data, or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation must be done in a **dedicated SAP test system (sandbox or quality)** — never use production data or production system for controlled substance testing
3. **Test customer license data must be anonymized and non-production** — do NOT use real customer license numbers or regulatory IDs
4. All test execution must comply with pharmaceutical/chemical industry data privacy and security regulations
5. **Audit log access** in test system must be role-restricted — only authorized test users should access audit trail tables

### Master Data Setup

1. **Customer Master License Fields:** CS-34 test cases require custom fields in the customer master to store:
   - License classification (e.g., "PHARMACY", "WHOLESALER", "DISTRIBUTOR")
   - License number (alphanumeric, encrypted if required)
   - License expiration date (DATE field)
   - License status (e.g., "ACTIVE", "EXPIRED", "SUSPENDED")

   If these fields do NOT exist in your SAP test system, work with your SAP Basis/Security team to create custom fields in customer master (KNVV or custom Z-table).

2. **Material Master Controlled Substance Flag:** Materials used in testing must have a flag (checkbox or classification) indicating "Controlled Substance = X". If this flag does not exist, create a custom field in material master (MARA or custom table).

3. **Authorization Objects:** Compliance user override functionality requires:
   - Custom authorization object (e.g., V_VBAK_OVR or Z_SO_OVR) granting override permission
   - Role assignment: Create "Compliance User" role with override authorization; create "Standard CSR" role WITHOUT override authorization
   - Test user accounts: Provision at least 3 test users:
     - `TEST_CSR_01`: Standard Customer Service Representative (no override)
     - `TEST_COMPLIANCE_01`: Compliance user (with override authorization)
     - `TEST_CSR_UNAUTH`: Standard CSR for unauthorized override test (NEG-04)

4. **Warning Threshold Configuration:** License expiration warning threshold (30 days default) should be configurable via SAP customizing table. If not present, work with SAP functional consultant to create configuration parameter.

### Test Data Refresh

- **License expiration dates are relative to test execution date** — refresh calculated dates whenever tests are re-executed after a gap
- Example: If `{{LICENSE_EXPIRY_DATE_FUTURE_15D}}` was set to 2026-09-07 on 2026-08-23, but tests are re-run on 2026-09-01, recalculate as 2026-09-16
- **Expired license dates** can remain static (any past date is valid for expired license tests)

### Data Volume Requirements

For comprehensive test coverage across all 21 test cases, you need:
- **Minimum 8 unique customer master records** (one per license scenario: valid non-expiring, valid near-expiry, expired, no license, mismatch, expires today, missing fields, invalid)
- **Minimum 2 unique material master records** (one controlled, one non-controlled)
- **Minimum 3 test user accounts** (standard CSR, compliance user, unauthorized user)

### Audit Log Verification

Test cases TC-CS-035 through TC-CS-055 include explicit audit log verification steps. To execute these steps:
- Access SAP audit trail table (e.g., custom Z-table or standard change log table)
- Verify log entries contain: timestamp, user ID, customer ID, material ID, result (PASS/FAIL/OVERRIDE_APPROVED), override flag, justification text
- If audit log table does not exist, work with SAP developer to create custom audit table for license verification events

---

## Example: Filling in Placeholders

**Before (in testdata JSON):**
```json
{
  "customerId": "{{CUSTOMER_ID_VALID_LICENSE}}",
  "materialId": "{{MATERIAL_ID_CONTROLLED}}",
  "orderQuantity": "{{SO_QUANTITY_STANDARD}}",
  "licenseExpiryValid": "{{LICENSE_EXPIRY_DATE_FUTURE_60D}}"
}
```

**After (with real SAP test system values):**
```json
{
  "customerId": "1000012345",
  "materialId": "CTRL-SUB-001",
  "orderQuantity": "10",
  "licenseExpiryValid": "2026-10-23"
}
```

**DO NOT commit the "After" version to Git.** Keep placeholder values in version control; maintain actual values in a separate local file or test data management tool.

---

## Contact for Master Data Issues

If required master data (customer license fields, material controlled substance flag, authorization objects) does NOT exist in your SAP test system:
- Contact: SAP Functional Consultant (SD module owner)
- Also contact: SAP Basis/Security team (for authorization object setup)
- Also contact: SAP ABAP Developer (if custom tables/fields need to be created)

---
