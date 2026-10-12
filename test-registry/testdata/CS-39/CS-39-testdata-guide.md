# Test Data Guide: [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider

**Generated:**    2026-08-24  
**Module:**       SD — Sales & Distribution  
**Feature:**      Free Goods (Sample) Order Creation for Healthcare Providers  
**Data File:**    testdata/CS-39/CS-39-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-39/CS-39-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data (Healthcare Provider)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_HEALTHCARE_VALID}}` | An active customer account number classified as healthcare provider | SAP Fiori: Manage Business Partner → search for customers with account group for healthcare providers (e.g., physician, hospital, clinic); verify account group indicates healthcare classification |
| `{{CUSTOMER_NAME_HEALTHCARE_VALID}}` | The full name of the healthcare provider customer (auto-populated) | Shown in BP master data for the customer ID above |
| `{{CUSTOMER_ADDRESS_HEALTHCARE}}` | Customer address (auto-populated) | Shown in BP master data for the customer ID above |
| `{{CUSTOMER_ID_INVALID}}` | A customer number that does NOT exist in SAP | Use a random number like "9999999999" — verify it returns "not found" in BP search |
| `{{CUSTOMER_ID_NON_HEALTHCARE}}` | An existing customer NOT classified as healthcare provider | SAP Fiori: Manage Business Partner → search for customers with standard account group (NOT healthcare); verify account group does not indicate healthcare classification |
| `{{CUSTOMER_NAME_NON_HEALTHCARE}}` | Name of the non-healthcare customer (auto-populated) | Shown in BP master data for the non-healthcare customer ID above |

### Material Data (Pharmaceutical Samples)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_FREE_GOODS_VALID}}` | An active pharmaceutical sample material configured for free goods distribution | SAP Fiori: Manage Material → search materials configured with item category TANN (Free Goods); verify material is released and active for sales |
| `{{MATERIAL_DESCRIPTION_FREE_GOODS}}` | Material description (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_FREE_GOODS_VALID_2}}` | A second pharmaceutical sample material configured for free goods (for multi-item tests) | Same as above; select a different material number |
| `{{MATERIAL_DESCRIPTION_FREE_GOODS_2}}` | Second material description (auto-populated) | Shown in material master for the second material ID |
| `{{MATERIAL_ID_BATCH_MANAGED_VALID}}` | A batch-managed pharmaceutical sample material configured for free goods distribution | SAP Fiori: Manage Material → search materials with batch management flag active AND item category TANN; verify batch management is enabled |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Batch-managed material description (auto-populated) | Shown in material master for the batch-managed material ID above |
| `{{MATERIAL_ID_NON_FREE_GOODS}}` | A material NOT configured for free goods distribution | SAP Fiori: Manage Material → search standard materials with item category TAN (NOT TANN); verify material does not have free goods configuration |
| `{{MATERIAL_DESCRIPTION_NON_FREE_GOODS}}` | Non-free goods material description (auto-populated) | Shown in material master for the non-free goods material ID |

### Quantity and Price

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{ORDER_QUANTITY_STANDARD}}` | A standard, realistic order quantity for free goods | Use 5–50 depending on the UoM (e.g., 10 for EA - Each, 5 for BX - Box) |
| `{{ORDER_QUANTITY_STANDARD_2}}` | Quantity for second line item (multi-item tests) | Use a different value from standard quantity (e.g., 15 for EA) |
| `{{ORDER_QUANTITY_MIN}}` | Minimum valid quantity (lower boundary) | Use 1 (minimum accepted order quantity per UoM) |
| `{{ORDER_QUANTITY_MAX_REGULATORY}}` | Maximum regulatory quantity limit (upper boundary) | Use the configured regulatory limit per SAP system (e.g., 100 units per healthcare provider per order); verify limit with system configuration or business rules |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material | Shown in material master (e.g., EA - Each, PC - Piece, BX - Box) |
| `{{UNIT_OF_MEASURE_2}}` | Unit of measure for second material | Shown in material master for the second material |
| `{{NET_VALUE_NON_ZERO}}` | Non-zero net value (pricing procedure error simulation) | Use any non-zero value (e.g., 50.00) — this simulates a pricing procedure error for negative test TC-CS-046 |

### Batch Data (for Batch-Managed Materials)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BATCH_NUMBER_VALID}}` | A valid batch number for the batch-managed material with future expiry date | SAP Fiori: Manage Batches → search batches for the batch-managed material; select a batch with expiry date at least 60 days in the future |
| `{{BATCH_EXPIRY_FUTURE}}` | Batch expiry date (future date) | Expiry date of the selected batch (format: YYYY-MM-DD); must be in the future |
| `{{BATCH_NUMBER_MIN_SHELF_LIFE}}` | A batch number with minimum shelf life remaining (expiry = today + 30 days) | SAP Fiori: Manage Batches → search batches with expiry date close to minimum shelf life (e.g., today + 30 days) |
| `{{BATCH_EXPIRY_MIN_SHELF_LIFE}}` | Batch expiry date at minimum shelf life boundary | Expiry date = today + 30 days (format: YYYY-MM-DD) |
| `{{BATCH_NUMBER_EXPIRED}}` | A batch number with past expiry date (expired) | SAP Fiori: Manage Batches → search for expired batches OR use a batch ID with past expiry date configured for testing |
| `{{BATCH_EXPIRY_PAST}}` | Expired batch expiry date (past date) | Any past date (e.g., 2024-01-01); format: YYYY-MM-DD |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORG_CODE}}` | Sales organization code for pharmaceutical sample distribution | SAP Fiori: Configuration → Sales & Distribution → Organizational Structure → Sales Organizations; or T-code VOR2 |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code (e.g., 10 - Pharmaceutical Samples) | SAP configuration → Distribution Channels; or T-code VOR4 (typically 10 for samples) |
| `{{DIVISION_CODE}}` | Division code (e.g., 10 - Pharmaceuticals) | SAP configuration → Divisions; or T-code VOR5 (typically 10 for pharmaceuticals) |
| `{{SHIPPING_POINT_CODE}}` | Shipping point for sample distribution | SAP Fiori: Configuration → Shipping Points; or T-code OVL2 |
| `{{ORDER_TYPE_FREE_GOODS}}` | Free Goods order type code | Use ZFOC or equivalent configured free goods order type in your SAP system (verify with SAP configuration or T-code VOV8) |

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DATE_FUTURE_7D}}` | A delivery date at least 7 calendar days from the test execution date | Calculate as: today + 7 days; format: YYYY-MM-DD |
| `{{DATE_TODAY}}` | Current date (for same-day delivery edge case) | Use test execution date; format: YYYY-MM-DD |
| `{{DATE_PAST}}` | A date in the past (for negative/validation tests) | Use any past date (e.g., 2024-01-01); format: YYYY-MM-DD |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4. Set in `.env` file. |

---

## Important Notes

### Regulatory and Compliance Requirements

1. **Healthcare Provider Classification:** All customer accounts used for free goods orders MUST be classified as healthcare providers (physicians, hospitals, clinics) per pharmaceutical sample distribution regulations (e.g., FDA PDMA in US, EU Directive 2001/83/EC in Europe).

2. **Batch Traceability:** All batch-managed pharmaceutical materials MUST have batch numbers and expiry dates captured for recall capability and audit trail.

3. **Zero Pricing:** Free goods orders MUST have zero net value (100% discount or zero pricing procedure applied) per regulatory requirements.

4. **Quantity Limits:** Regulatory limits may apply (e.g., maximum samples per healthcare provider per period); verify configured limits in your SAP system.

5. **Compliance Tracking:** All free goods distributions MUST be logged in compliance tracking systems for regulatory audit (AC-15 / TC-CS-059).

### SAP Test Data Best Practices

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic.

2. All test data preparation should be done in a **dedicated SAP test system** — never use production data.

3. The `CUSTOMER_ID_INVALID`, `MATERIAL_ID_NON_FREE_GOODS`, and `BATCH_NUMBER_EXPIRED` values must be verified to NOT be accepted by the system for negative test cases.

4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured.

5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests.

6. **Do not use real healthcare provider data:** Use anonymized test data for customer names, addresses, and license numbers to comply with data privacy regulations (HIPAA, GDPR).

### Data Dependencies

- **Customer-Sales Area Assignment:** Ensure test customer is assigned to the Sales Organization, Distribution Channel, and Division configured for free goods orders (e.g., Sales Org 1000, Dist Channel 10 - Samples, Division 10 - Pharmaceuticals).

- **Material-Item Category Determination:** Ensure free goods materials are configured with item category TANN auto-determination in the order type ZFOC.

- **Pricing Procedure:** Ensure order type ZFOC is assigned to a pricing procedure that applies 100% discount or zero pricing for all line items.

- **Batch Management:** Ensure batch-managed materials have active batches created with valid expiry dates before executing batch-related test cases.

- **Compliance Tracking Configuration:** Ensure compliance tracking system is configured and active for integration test TC-CS-059.

---

## Placeholder Count

**Total unique placeholders:** 34

- Customer-related: 6
- Material-related: 8
- Quantity/Price-related: 7
- Batch-related: 6
- Organizational: 5
- Date-related: 3

---

## Test Data Maintenance

| Activity | Frequency | Notes |
|----------|-----------|-------|
| Validate customer healthcare classification | Before each test cycle | Verify account group indicates healthcare provider |
| Verify material free goods configuration | Before each test cycle | Verify item category TANN is auto-determined |
| Create new batches with future expiry dates | Monthly | Ensure batch expiry dates remain in the future for positive tests |
| Verify regulatory quantity limits | Quarterly | Regulatory limits may change per business rules or compliance updates |
| Refresh compliance tracking configuration | After system refresh | Ensure compliance log integration is active |

---

## Contact for Test Data Issues

- **SAP Configuration Queries:** SAP Basis / SD Configuration Team
- **Master Data Creation:** Master Data Management Team
- **Regulatory Compliance Queries:** Compliance / Regulatory Affairs Team
