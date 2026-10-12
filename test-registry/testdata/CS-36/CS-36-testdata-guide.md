# Test Data Guide: [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch

**Generated:**    2026-08-24
**Module:**       QM-SD
**Feature:**      Batch Recall with Sales & Distribution Block Placement
**Data File:**    testdata/CS-36/CS-36-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-36/CS-36-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Material Data (Batch-Managed)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_NUMBER_BATCH_MANAGED}}` | An active material number configured as batch-managed (MARC-XCHPF = 'X') | SAP Fiori: Manage Material → search materials with batch management active; or T-code MM60/MARA; verify MARC-XCHPF = 'X' |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description (auto-populated by SAP) | Shown in material master MAKT for the material number above |
| `{{MATERIAL_NUMBER_NON_BATCH_MANAGED}}` | An active material number NOT configured as batch-managed (MARC-XCHPF is blank) | SAP Fiori: Manage Material → search materials WITHOUT batch management; or T-code MM60/MARA; verify MARC-XCHPF is blank |
| `{{MATERIAL_DESCRIPTION_NON_BATCH_MANAGED}}` | Material description for non-batch-managed material (auto-populated) | Shown in material master MAKT for the non-batch-managed material number above |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_VALID}}` | An existing batch number for the batch-managed material with unrestricted status | SAP Fiori: Manage Batch → search by material number; or T-code MSC3N/MCHA; select a batch with status "Unrestricted Use" or "Released" |
| `{{BATCH_NUMBER_UNRESTRICTED}}` | An existing batch with unrestricted quality status (for integration test TC-CS-043) | SAP Fiori: Manage Batch → filter by material and unrestricted status; or T-code MSC3N; select batch with MCHA-ZUSTAT = unrestricted |
| `{{BATCH_NUMBER_BLOCKED}}` | An existing batch with ACTIVE SD block (for NEG tests TC-CS-037, TC-CS-038) | Use the batch from TC-CS-036 after SD block is placed; or manually create a batch with SD block via T-code MSC3N; verify sales status fields indicate block |
| `{{BATCH_NUMBER_INVALID}}` | A batch number that does NOT exist in SAP | Use a random alphanumeric value like "ZZNOTEXIST99" — verify it returns "not found" in batch search |
| `{{BATCH_NUMBER_ANY}}` | Any batch number (for NEG-004 test; not applicable as material is non-batch-managed) | Use any alphanumeric value, e.g., "TESTBATCH01" |
| `{{BATCH_STATUS_UNRESTRICTED}}` | Batch status description for unrestricted batches | Typical values: "Unrestricted Use", "Released", or system-specific status text from MCHA-ZUSTAT |

### Plant and Organizational Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code where batch management and quality operations are performed | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10; use a plant configured for batch management |
| `{{SALES_ORG_CODE}}` | Sales organization code for SD transactions | SAP Fiori: Configuration → Sales → Sales Organizations; or T-code OVXI; select an active sales organization |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code for SD transactions | SAP configuration → Distribution Channels; or T-code OVXK; select an active distribution channel assigned to the sales org |
| `{{SHIPPING_POINT_CODE}}` | Shipping point code for delivery processing | SAP configuration → Shipping Points; or T-code OVXM; select an active shipping point assigned to the plant |

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID}}` | An active customer account number in the SAP test system | SAP Fiori: Manage Business Partner → search active customers; or T-code VD03/KNA1; select a customer assigned to the sales organization |
| `{{CUSTOMER_NAME_VALID}}` | The full name of the customer above (auto-populated by SAP) | Shown in customer master data for the customer ID above |

### Quantity Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{ORDER_QUANTITY_STANDARD}}` | A standard, realistic order quantity for sales orders | Use 1–100 depending on the material UoM (e.g., 10 for EA, 1 for large items) |
| `{{DELIVERY_QUANTITY_STANDARD}}` | A standard, realistic delivery quantity for outbound deliveries | Use the same value as ORDER_QUANTITY_STANDARD or slightly less for partial delivery scenarios |

### Quality Management Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{QUALITY_STATUS_RESTRICTED}}` | A restricted quality status code that triggers SD block (for integration test TC-CS-043) | SAP Fiori: Configuration → QM → Quality Status; or T-code BS02; select a status like "Quality Hold", "Blocked", "Recalled" — verify it is configured to propagate SD block |

### Integration Test Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORDER_NUMBER_EXISTING}}` | An existing open sales order that references the batch (for integration test TC-CS-044) | Create a sales order via TC-CS-037 (before blocking the batch) or use an existing open sales order from T-code VA03; ensure it contains the material-batch combination |

### System-Generated Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{TIMESTAMP_CURRENT}}` | Current timestamp at the time of SD block placement | System-generated at execution time; format ISO 8601 YYYY-MM-DDTHH:MM:SSZ |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. Email address for SAP IDP login. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. Password for SAP IDP login. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. **Batch-managed material configuration:** Verify MARC-XCHPF = 'X' in material master plant view before using a material for batch operations
4. **Batch uniqueness:** Batch numbers are unique per material-plant combination, not globally unique
5. **Pre-existing sales order for TC-CS-044:** This test requires a sales order created BEFORE the batch is blocked; consider creating it as part of the test setup or using a known open sales order from the test system
6. **QM-SD integration configuration:** Verify that quality status changes in QM module are configured to automatically propagate SD blocks in your SAP system (required for TC-CS-043)
7. **SD block verification:** After placing an SD block, verify it in multiple locations:
   - Batch master data (MCHA sales status fields)
   - Sales order creation (VA01 — batch selection should be blocked)
   - Delivery creation (VL01N — batch selection should be blocked)
8. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
9. If required master data does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests

---

## Regulatory and Compliance Notes

**SAP QM-SD Batch Recall Compliance:**
- Batch recall is a regulated process in industries such as pharmaceutical, food & beverage, and medical devices (e.g., FDA 21 CFR Part 11, EU GMP guidelines)
- Ensure all test execution uses dedicated QA/test client in SAP S/4HANA Cloud (not production client)
- All test batches should be clearly flagged as TEST or DEMO data in batch master records
- Verify audit trail logging is active for all SD block placement actions (timestamp, user ID, batch identifier)

**SAP Authorization Requirements:**
- Quality Assurance Specialist role must have authorization objects:
  - `Q_LQUA`: Quality Management authorization for batch operations
  - `M_CHAO_BUK`: Batch master data change authorization
  - `V_VBAK_VKO`: Sales document authorization (for NEG testing in sales order creation)
  - `V_LIKP_VST`: Delivery authorization (for NEG testing in delivery creation)

---

**Generated By:** testcase-agent/skills/extract-testdata
**Version:** 1.0
