# Test Data Guide: [CS-45] Capture Serialization/Track-And-Trace Data At The Point Of Outbound De

**Generated:**    2026-08-24
**Module:**       SD — Sales and Distribution
**Feature:**      Serialization/Track-and-Trace Capture for Outbound Delivery
**Data File:**    testdata/CS-45/CS-45-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-45/CS-45-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Outbound Delivery Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{DELIVERY_NUMBER_VALID}}` | An existing outbound delivery number for a sales order with serialized pharmaceutical material (status Open, not yet goods issued) | SAP Fiori: Manage Outbound Deliveries → search for Open deliveries with serialized materials; or T-code VL02N/VL03N |
| `{{DELIVERY_NUMBER_NON_SERIALIZED}}` | An existing outbound delivery number for a sales order with NON-serialized material | SAP Fiori: Manage Outbound Deliveries → search for deliveries with standard materials (no SERNP flag) |
| `{{DELIVERY_NUMBER_MIN_QTY}}` | An existing outbound delivery with delivery quantity = 1 (minimum boundary) | SAP Fiori: Manage Outbound Deliveries → search for deliveries with line item quantity = 1 |
| `{{DELIVERY_NUMBER_MAX_QTY}}` | An existing outbound delivery with delivery quantity at system-configured maximum (e.g., 100 units) | SAP Fiori: Manage Outbound Deliveries → search for deliveries with maximum quantity; or create delivery with max quantity per order configuration |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_SERIALIZED}}` | A prescription pharmaceutical material with serialization profile (SERNP flag set in material master MARA) | SAP Fiori: Manage Material → search materials with Serial Number Profile; or T-code MM60/MARA → SERNP field populated |
| `{{MATERIAL_ID_NON_SERIALIZED}}` | A standard material WITHOUT serialization profile (SERNP flag NOT set) | SAP Fiori: Manage Material → search materials WITHOUT Serial Number Profile; or T-code MM60/MARA → SERNP field blank |

### Serial Number Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SERIAL_NUMBER_VALID}}` | A GS1-compliant serial number (format: 14-digit GTIN + up to 20-character alphanumeric serial component) | Generate synthetic test serial number: e.g., `12345678901234S001` (14-digit GTIN + 4-character serial) — must comply with GS1 AI 21 standard |
| `{{SERIAL_NUMBER_INVALID_FORMAT}}` | A serial number that does NOT comply with GS1 format (e.g., too short, invalid characters, missing GTIN) | Use non-GS1 format: e.g., `ABC123` or `1234` (too short) or `INVALID-SERIAL#` (invalid characters) |
| `{{SERIAL_NUMBER_DUPLICATE}}` | A valid GS1-compliant serial number to be entered twice (for duplicate detection testing) | Use same format as VALID serial number: e.g., `12345678901234D001` |
| `{{SERIAL_NUMBER_MIN_LENGTH}}` | A GS1-compliant serial number at minimum length (15 characters: 14-digit GTIN + 1-digit serial) | Example: `123456789012341` (14-digit GTIN + 1-digit serial) |
| `{{SERIAL_NUMBER_MAX_LENGTH}}` | A GS1-compliant serial number at maximum length (34 characters: 14-digit GTIN + 20-character serial) | Example: `12345678901234ABCDEFGHIJ1234567890` (14-digit GTIN + 20-character serial) |
| `{{SERIAL_NUMBER_SET_MULTIPLE}}` | A set of unique GS1-compliant serial numbers (count = maximum quantity) | Generate a set of unique serial numbers: e.g., `12345678901234S001`, `12345678901234S002`, ..., `12345678901234S100` |

### Batch and Expiry Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_VALID}}` | A batch number for the serialized pharmaceutical material (exists in CHARG batch master) | SAP Fiori: Manage Material → select material → Batches tab; or T-code MSC3N/CHARG |
| `{{EXPIRY_DATE_FUTURE}}` | A future expiry date for the batch (regulatory requirement: must be at least 1 day from test execution date, typically 1-5 years) | Calculate as: today + 1 year (or as per pharmaceutical product shelf life); format YYYY-MM-DD |
| `{{EXPIRY_DATE_PAST}}` | A past expiry date (for validation testing — should be rejected by system) | Use any past date: e.g., `2023-01-01` or today - 1 year |

### Quantity and Sales Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DELIVERY_QUANTITY_STANDARD}}` | A standard, realistic delivery quantity (not boundary value) | Use 5-10 units for standard testing |
| `{{DELIVERY_QUANTITY_MULTIPLE}}` | A delivery quantity of 2 or more units (for duplicate serial number testing) | Use 2 or more units (e.g., 2, 3, 5) |
| `{{DELIVERY_QUANTITY_MIN}}` | Minimum delivery quantity (lower boundary) | Typically 1 unit |
| `{{DELIVERY_QUANTITY_MAX}}` | Maximum delivery quantity (upper boundary per system configuration) | System-dependent; typically 100 units (verify with SAP configuration) |
| `{{SALES_ORDER_NUMBER_VALID}}` | An existing sales order number (source of the outbound delivery) | SAP Fiori: Manage Sales Orders → search for Open sales orders with serialized materials; or T-code VA02/VA03 |
| `{{CUSTOMER_ID_VALID}}` | A customer account number (Sold-to Party) assigned to the sales order | SAP Fiori: Manage Customer Master → search active customers; or T-code VD03/KNA1 |
| `{{SALES_ORG_CODE}}` | Sales organization code configured for the customer and material | SAP Fiori: Configuration → Enterprise Structure → Sales Organizations; or T-code VOV2 |

### Integration and Environment Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{EPCIS_ENDPOINT_UNAVAILABLE}}` | Simulated EPCIS endpoint unavailability (for integration failure testing) | Configure mock EPCIS endpoint to return timeout/network error; or disable EPCIS endpoint configuration; or disconnect network during test execution |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Example: `https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-autoStartTour=e8bc3755f84d8126e10000000a4450e5#Shell-home` |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. **Test serial numbers must be synthetic** — do NOT use real production pharmaceutical serial numbers; generate GS1-compliant test serials that are flagged as test data
4. The `SERIAL_NUMBER_INVALID_FORMAT` value must be verified to NOT comply with GS1 standards before executing negative test cases
5. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
6. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
7. **EPCIS endpoint testing:** Integration test TC-CS-032 requires mock EPCIS endpoint or network simulation capability — coordinate with IT/integration team
8. **Regulatory compliance:** Test deliveries must be flagged as test transactions and excluded from regulatory reporting to national traceability systems
9. **Serialization profile:** Material `{{MATERIAL_ID_SERIALIZED}}` must have SERNP flag set in MARA material master — verify using T-code MM60 or Manage Material app
10. **Batch with expiry:** Batch `{{BATCH_NUMBER_VALID}}` must have a future expiry date recorded in the batch master — verify using T-code MSC3N or Manage Material → Batches tab

---

## Test Data Isolation and Cleanup

- Create dedicated test sales orders and outbound deliveries for serialization testing
- Use test customer and material master data specific to this test scenario
- After test execution, mark test deliveries for archival or deletion (do not leave test serialization data in active production-like tables)
- Document all test serial numbers used and ensure they are flagged as test data in EPCIS transmission logs

---

## GS1 Serial Number Standards Reference

**GS1 Application Identifier (AI) 21 — Serial Number:**
- Format: 14-digit GTIN (Global Trade Item Number) + up to 20 alphanumeric characters (serial component)
- Minimum length: 15 characters (GTIN + 1 serial digit)
- Maximum length: 34 characters (GTIN + 20 serial characters)
- Valid characters: 0-9, A-Z, a-z, and select special characters per GS1 standard
- Example: `12345678901234` (GTIN) + `SN123456789012345678` (serial) = 34 characters total

**US FDA DSCSA / EU FMD Requirements:**
- Serial numbers must be unique per GTIN
- Serial numbers must be transmitted to national traceability systems via EPCIS events
- Batch and expiry date are mandatory for prescription pharmaceuticals

---

**Generated:** 2026-08-24
**Generated By:** testcase-agent/skills/extract-testdata
**Data File:** testdata/CS-45/CS-45-testdata.json
