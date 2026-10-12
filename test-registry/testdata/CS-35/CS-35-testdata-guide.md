# Test Data Guide: [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T

**Generated:**    2026-08-23
**Module:**       LE/SD (Logistics Execution / Sales & Distribution)
**Feature:**      Cold-Chain Outbound Delivery Creation
**Data File:**    testdata/CS-35/CS-35-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-35/CS-35-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Sales Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORDER_NUMBER_VALID}}` | An existing, open sales order number ready for delivery creation | SAP Fiori: Manage Sales Orders → search for open sales orders with items not yet delivered; or T-code VA03 |

### Material Data (Cold-Chain)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_COLD_CHAIN_VALID}}` | Temperature-sensitive biologics material number flagged for cold-chain transport | SAP Fiori: Manage Material → search materials with storage condition classification 2–8°C or similar temperature-sensitive flag; or T-code MM03 → Sales: General/Plant tab → Storage Condition field |
| `{{MATERIAL_DESCRIPTION_COLD_CHAIN}}` | Material description (auto-populated) | Shown in material master for the cold-chain material ID above |
| `{{STORAGE_CONDITION_2_8C}}` | Storage condition classification code (e.g., 2–8°C for biologics) | Material master → Storage Condition field value (e.g., "02" = 2–8°C); auto-populated when material is entered |
| `{{MATERIAL_ID_NO_STORAGE_CONDITION}}` | Material without storage condition classification (for NEG-01 test) | SAP Fiori: Manage Material → search materials with blank Storage Condition field; or T-code MM03 → confirm Storage Condition is not set |

### Quantity and UoM

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DELIVERY_QUANTITY_STANDARD}}` | Standard delivery quantity | Use 5–50 depending on the UoM (e.g., 10 for EA, 5 for large biologics units) |
| `{{DELIVERY_QUANTITY_MIN}}` | Minimum valid delivery quantity (lower boundary) | Typically 1; confirm with system configuration |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material | Shown in material master (e.g., EA, PC, KG, L for biologics) |

### Carrier Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{COLD_CHAIN_CARRIER_ID_VALID}}` | Carrier ID with cold-chain qualification flag set | SAP Fiori: Manage Carrier Master → search carriers with cold-chain qualification flag enabled; or customizing table for carrier qualification |
| `{{COLD_CHAIN_CARRIER_NAME}}` | Carrier name (auto-populated) | Shown in carrier master for the qualified carrier ID above |
| `{{CARRIER_ID_NON_QUALIFIED}}` | Carrier ID without cold-chain qualification flag (for NEG-02 test) | SAP Fiori: Manage Carrier Master → search carriers with cold-chain qualification flag NOT enabled; verify carrier exists but is not qualified |

### Storage Location

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{STORAGE_LOCATION_CODE}}` | Storage location code configured for the delivery plant | SAP Fiori: Configuration → Logistics → Storage Locations; or T-code OX09/MM03 → Storage Location view |

### Temperature Monitoring Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{TEMPERATURE_LOGGER_REFERENCE}}` | Temperature logger/data recorder device reference number | Use a unique alphanumeric identifier (e.g., "TL-20260823-001" or "LOGGER123456"); typically 10-20 characters; must be traceable for audit |
| `{{TEMPERATURE_LOGGER_REFERENCE_MAX_LENGTH}}` | Maximum-length temperature logger reference string (for EDGE-02 test) | Generate a string at the field's maximum allowed length (typically 35-50 characters); example: "TEMP-LOGGER-REF-MAX-LENGTH-TEST-12345678" (adjust length to match SAP field configuration) |

### Shipping Condition

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SHIPPING_CONDITION_COLD_CHAIN}}` | Cold-chain shipping condition code (auto-populated by SAP) | Shown in delivery header after material entry; determined from material's storage condition via customizing table (e.g., "CC" = Cold Chain); auto-populated, not entered by user |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 (email entry). Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 (password entry). Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `CARRIER_ID_NON_QUALIFIED` and `MATERIAL_ID_NO_STORAGE_CONDITION` values must be verified to exist in the test system but NOT meet cold-chain requirements before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **Cold-chain compliance:** Temperature logger and monitoring device references must be unique and traceable per regulatory requirements (FDA/EMA)
7. **Material storage condition:** Use materials with 2–8°C classification for biologics cold-chain scenarios; verify material master configuration includes storage condition field
8. **Carrier qualification:** Verify carrier master includes cold-chain qualification flag field; coordinate with test data team to set up qualified and non-qualified carriers
9. **Goods issue test (TC-CS-026):** Temperature monitoring device reference is a separate field from temperature logger reference; both are mandatory but captured at different stages (logger at delivery creation, monitoring device before goods issue)

---

## Test Data Setup Checklist

Before executing test cases, verify the following master data and configuration exist in your SAP test system:

- [ ] Sales order with open items exists (`{{SALES_ORDER_NUMBER_VALID}}`)
- [ ] Temperature-sensitive material with storage condition 2–8°C exists (`{{MATERIAL_ID_COLD_CHAIN_VALID}}`)
- [ ] Material without storage condition classification exists (`{{MATERIAL_ID_NO_STORAGE_CONDITION}}`)
- [ ] Cold-chain qualified carrier exists with qualification flag set (`{{COLD_CHAIN_CARRIER_ID_VALID}}`)
- [ ] Non-qualified carrier exists without cold-chain qualification flag (`{{CARRIER_ID_NON_QUALIFIED}}`)
- [ ] Storage location is configured and active (`{{STORAGE_LOCATION_CODE}}`)
- [ ] Shipping condition determination is configured to auto-propose cold-chain condition based on material storage condition
- [ ] Temperature logger reference field is available in outbound delivery creation form
- [ ] Temperature monitoring device reference field is available before goods issue posting
- [ ] Goods issue posting validation is configured to block when temperature monitoring device reference is missing

---

## Regulatory Compliance Notes

**SAP LE/SD Cold-Chain Processes for Biologics:**
- Outbound deliveries for temperature-sensitive biologics are subject to FDA/EMA cold-chain regulations (21 CFR Part 11, EU GDP Annex 1)
- Temperature monitoring device references are mandatory audit trail items; test cases must verify hard stops are enforced (AC-6)
- Carrier qualification for cold-chain transport is regulatory requirement; validation failure = non-compliance risk (AC-3)
- All test execution must use dedicated test system instances with non-production material master data
- Test data for biologics materials must NOT use real product codes or patient-identifiable information
- Storage condition classifications (2–8°C) must match SAP customizing in test tenant
- Temperature logger and monitoring device references must be unique and traceable for audit purposes
