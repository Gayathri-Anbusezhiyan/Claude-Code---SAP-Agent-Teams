# Test Data Substitution Guide: CS-48

**User Story:** [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based  
**Module:** SD — Sales & Distribution (Pricing & Conditions)  
**Generated:** 2026-08-24  
**Test Data JSON:** `testdata/CS-48/CS-48-testdata.json`

---

## Purpose

This guide explains what real SAP values to substitute for each `{{PLACEHOLDER}}` in the test data JSON file. Replace placeholders with actual values from your SAP S/4HANA Cloud test environment before executing test cases.

---

## Placeholder Definitions

### Material Master Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{MATERIAL_ID_PHARMA_VALID}}` | Valid pharmaceutical product material number | `MAT-PHARMA-001` | Must exist in material master (MARA/MARD); configured for sales; pharmaceutical product category |
| `{{MATERIAL_DESCRIPTION_PHARMA_VALID}}` | Material description for the pharmaceutical product | `Antibiotic Tablet 500mg` | Auto-populated from material master MAKT-MAKTX |
| `{{MATERIAL_ID_INVALID_NON_EXISTENT}}` | Non-existent material number (for negative test) | `INVALID999999` | Confirmed to NOT exist in material master |
| `{{BASE_UOM}}` | Base unit of measure for the material | `EA` (Each), `KG` (Kilogram), `L` (Liter) | Auto-populated from material master MARA-MEINS |

---

### Customer Master Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{CUSTOMER_ID_VALID}}` | Valid customer account number | `CUST-PHARMA-001` | Must exist in customer master (KNA1); has valid customer pricing group assigned |
| `{{CUSTOMER_ID_NO_PRICING_GROUP}}` | Valid customer account with no pricing group assigned | `CUST-NOPRICE-001` | Exists in customer master but has no KONDA (customer pricing group) assigned (for NEG-03) |
| `{{CUSTOMER_PRICING_GROUP_VALID}}` | Valid customer pricing group code (KONDA) | `A0`, `B0`, `C0` | 2-character code from customer master field KNVV-KONDA; must be configured in pricing procedure |
| `{{CUSTOMER_PRICING_GROUP_INVALID}}` | Invalid customer pricing group code | `ZZ`, `XX` | Confirmed to NOT exist in customer master or pricing procedure |

---

### Pricing Condition Configuration

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{CONDITION_TYPE_TIERED_PRICING}}` | Condition type for tiered pricing | `PR00` (List Price), `ZPR1` (Custom Tiered Price) | 4-character code; must exist in pricing procedure (V/08) and be configured for scale-based pricing |
| `{{CONDITION_RECORD_NUMBER_VALID}}` | Valid existing condition record number | `0000000123` | 10-character alphanumeric; used in HP-05 to verify display |
| `{{CONDITION_RECORD_NUMBER_NEAR_EXPIRY}}` | Condition record number with near-expiry validity | `0000000456` | Used in HP-06 for expiry alert test |
| `{{CONDITION_RECORD_NUMBER_EXPIRED}}` | Expired condition record number | `0000000789` | Used in NEG-04; Valid To date is in the past |
| `{{CONDITION_RECORD_NUMBER_ALERT_THRESHOLD}}` | Condition record at exact alert threshold | `0000000999` | Used in EDGE-10; expires exactly at alert window threshold |

---

### Price and Scale Quantity Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{SCALE_QUANTITY_SINGLE_TIER}}` | Single-tier scale quantity (minimum) | `1` | Standard minimum quantity for single-tier pricing |
| `{{SCALE_QUANTITY_TIER_1}}` | Tier 1 minimum quantity (lower tier) | `1` | Multi-tier scenario: tier 1 covers 1-99 units |
| `{{SCALE_QUANTITY_TIER_2}}` | Tier 2 minimum quantity (mid tier) | `100` | Multi-tier scenario: tier 2 covers 100-499 units |
| `{{SCALE_QUANTITY_TIER_3}}` | Tier 3 minimum quantity (upper tier) | `500` | Multi-tier scenario: tier 3 covers 500+ units |
| `{{SCALE_QUANTITY_MIN}}` | Minimum valid scale quantity (boundary) | `1` | Boundary value test: lower bound |
| `{{SCALE_QUANTITY_MAX}}` | Maximum valid scale quantity (boundary) | `999999` | Boundary value test: upper bound (SAP system limit) |
| `{{SCALE_QUANTITY_ZERO}}` | Zero scale quantity (invalid) | `0` | Negative/edge case test: zero is invalid |
| `{{PRICE_AMOUNT_STANDARD}}` | Standard price per unit | `50.00` | Valid price in configured currency |
| `{{PRICE_AMOUNT_TIER_1}}` | Price per unit for tier 1 (higher price, lower volume) | `60.00` | Multi-tier scenario: highest unit price for lowest volume |
| `{{PRICE_AMOUNT_TIER_2}}` | Price per unit for tier 2 (mid price, mid volume) | `50.00` | Multi-tier scenario: mid-tier pricing |
| `{{PRICE_AMOUNT_TIER_3}}` | Price per unit for tier 3 (lowest price, highest volume) | `40.00` | Multi-tier scenario: volume discount pricing |
| `{{PRICE_AMOUNT_LIST}}` | List price for manual override scenarios | `100.00` | Base list price before manual override |
| `{{PRICE_AMOUNT_ZERO}}` | Zero price amount (invalid) | `0.00` | Negative/edge case test: zero price is invalid |
| `{{CURRENCY_CODE}}` | Currency code for pricing | `USD`, `EUR`, `GBP` | ISO 3-character currency code |

---

### Manual Price Override Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{TOLERANCE_PERCENT_CONFIGURED}}` | Configured price tolerance percentage | `5.00` | Tolerance threshold (e.g., 5% deviation allowed without approval) |
| `{{PRICE_OVERRIDE_WITHIN_TOLERANCE}}` | Override price within tolerance (e.g., 4% deviation) | `96.00` | If list price = 100.00, tolerance = 5%, then 96.00 is 4% deviation (within tolerance) |
| `{{PRICE_OVERRIDE_BEYOND_TOLERANCE}}` | Override price beyond tolerance (e.g., 7% deviation) | `93.00` | If list price = 100.00, tolerance = 5%, then 93.00 is 7% deviation (requires approval) |
| `{{PRICE_OVERRIDE_EXACT_TOLERANCE}}` | Override price exactly at tolerance threshold (e.g., 5.00% deviation) | `95.00` | If list price = 100.00, tolerance = 5%, then 95.00 is exactly 5% deviation (boundary test) |
| `{{PRICE_OVERRIDE_ABOVE_TOLERANCE}}` | Override price just above tolerance threshold (e.g., 5.01% deviation) | `94.99` | If list price = 100.00, tolerance = 5%, then 94.99 is 5.01% deviation (requires approval) |

---

### Order Quantity Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{ORDER_QUANTITY_STANDARD}}` | Standard order quantity | `10` | Typical order quantity for test scenarios |
| `{{ORDER_QUANTITY_TIER_2}}` | Order quantity in tier 2 range (100-499) | `150` | Used to verify tier 2 pricing is applied |
| `{{ORDER_QUANTITY_BREAKPOINT}}` | Order quantity exactly at tier breakpoint | `100` | Boundary test: quantity = 100 should trigger tier 2, not tier 1 |

---

### Validity Period Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{VALID_FROM_TODAY}}` | Valid From date = current date | `2026-08-24` | Use test execution date or a recent date |
| `{{VALID_TO_FUTURE_1_YEAR}}` | Valid To date = 1 year from Valid From | `2027-08-24` | Standard future validity period |
| `{{VALID_TO_INDEFINITE}}` | Indefinite validity (no expiry) | `9999-12-31` | SAP standard indefinite date |
| `{{VALID_TO_NEAR_EXPIRY}}` | Valid To date near expiry (within alert window) | `2026-09-23` | If alert window = 30 days, set date to 25 days from test execution date |
| `{{VALID_TO_EXPIRED}}` | Valid To date in the past (expired) | `2025-12-31` | Used for negative test (NEG-04) |
| `{{VALID_TO_EQUAL_VALID_FROM}}` | Valid To date equal to Valid From (invalid period) | Same as `{{VALID_FROM_TODAY}}` | Boundary test: period = 0 days (invalid) |
| `{{VALID_FROM_PAST}}` | Valid From date in the past | `2025-01-01` | Used for edge case test (EDGE-07): new records cannot have past Valid From dates |
| `{{VALID_TO_ALERT_THRESHOLD}}` | Valid To date exactly at alert window threshold | `2026-09-23` | If alert window = 30 days, set date to exactly 30 days from test execution date |
| `{{ALERT_WINDOW_DAYS}}` | Alert window threshold (days before expiry) | `30` | SAP configuration: number of days before expiry to trigger alert |

---

### Organizational Structure Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{SALES_ORG_CODE}}` | Sales organization code | `1000`, `2000` | 4-character code; must be assigned to user profile |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code | `10`, `20` | 2-character code; must be assigned to user profile |
| `{{DIVISION_CODE}}` | Division code | `00`, `01` | 2-character code; typically `00` for cross-divisional |

---

### Approval Workflow Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{REJECTION_REASON}}` | Supervisor rejection reason | `Price deviation not justified`, `Volume discount not applicable` | Free-text reason entered by supervisor when rejecting override request |

---

### Empty/Missing Field Data

| Placeholder | Description | Example Value | Notes |
|-------------|-------------|---------------|-------|
| `{{EMPTY_VALUE}}` | Empty field value (for ERR test cases) | `""` (empty string), or leave field blank | Used to test mandatory field validation |

---

## Data Substitution Workflow

### Step 1: Identify SAP Test Environment Values

Before test execution, retrieve the following from your SAP S/4HANA Cloud test system:

1. **Material Master (Transaction: MM03 or Fiori "Display Material")**
   - Find a valid pharmaceutical material ID
   - Note its description, base UoM, and sales org assignment

2. **Customer Master (Transaction: XD03 or Fiori "Display Customer")**
   - Find a valid customer with a pricing group assigned (KNVV-KONDA)
   - Find or create a customer with no pricing group (for NEG-03)

3. **Pricing Condition Configuration (Transaction: V/08 or Fiori "Manage Pricing Conditions")**
   - Identify the condition type used for tiered pricing (e.g., PR00, ZPR1)
   - Verify condition records exist or can be created

4. **Authorization Configuration**
   - Confirm tolerance percentage setting for manual price overrides
   - Verify supervisor user account exists with approval authorization

5. **Organizational Structure**
   - Note sales org, distribution channel, and division codes assigned to test user

---

### Step 2: Replace Placeholders in Test Data JSON

Open `testdata/CS-48/CS-48-testdata.json` and perform a global find-and-replace:

**Example:**
```json
// Before:
"materialId": "{{MATERIAL_ID_PHARMA_VALID}}"

// After:
"materialId": "MAT-PHARMA-001"
```

Repeat for all placeholders listed in this guide.

---

### Step 3: Validate Substituted Values

Before test execution:
- Verify all replaced values exist in SAP (materials, customers, condition types, org structure)
- Confirm validity dates are relative to test execution date
- Ensure invalid/negative test values are confirmed non-existent (e.g., `{{MATERIAL_ID_INVALID_NON_EXISTENT}}`)

---

## Special Data Considerations

### Pharmaceutical Industry Context

- **Regulatory Compliance:** Test data must NOT use real production material IDs, customer IDs, or pricing from live systems
- **Test-Specific Material IDs:** Use dedicated test material numbers prefixed with `TEST-`, `ZZ`, or similar convention
- **Audit Trail:** All pricing condition changes are logged with user ID and timestamp — ensure test user accounts are clearly identified as test accounts

### Tiered Pricing Logic

- **Tier Breakpoints:** Ensure tier quantity breakpoints are sequential and non-overlapping:
  - Tier 1: 1-99 units → `scaleQuantityTier1 = 1`
  - Tier 2: 100-499 units → `scaleQuantityTier2 = 100`
  - Tier 3: 500+ units → `scaleQuantityTier3 = 500`
- **Price Descending:** Higher volume tiers typically have lower unit prices (volume discount):
  - `priceAmountTier1 > priceAmountTier2 > priceAmountTier3`

### Manual Override Tolerance Calculation

**Example:**
- List Price: `$100.00`
- Configured Tolerance: `5%`
- **Within Tolerance:** `$95.00` to `$105.00` (5% deviation) — no approval required
- **Beyond Tolerance:** `< $95.00` or `> $105.00` — supervisor approval required
- **Exact Threshold:** `$95.00` or `$105.00` — boundary test (should be accepted without approval)

---

## Date Calculation Reference

### Relative Dates

Use these formulas to calculate date placeholders relative to test execution date:

| Placeholder | Formula | Example (if execution date = 2026-08-24) |
|-------------|---------|------------------------------------------|
| `{{VALID_FROM_TODAY}}` | Execution Date | `2026-08-24` |
| `{{VALID_TO_FUTURE_1_YEAR}}` | Execution Date + 365 days | `2027-08-24` |
| `{{VALID_TO_NEAR_EXPIRY}}` | Execution Date + (Alert Window Days - 5) | If alert window = 30, then `2026-09-18` (25 days from now) |
| `{{VALID_TO_ALERT_THRESHOLD}}` | Execution Date + Alert Window Days | If alert window = 30, then `2026-09-23` (exactly 30 days from now) |
| `{{VALID_TO_EXPIRED}}` | Execution Date - 1 day (or any past date) | `2026-08-23` |
| `{{VALID_FROM_PAST}}` | Execution Date - 180 days (or any past date) | `2026-02-25` |

---

## Test Data Cleanup

After test execution:
- Delete or mark for deletion all condition records created during testing
- Use condition record validity dates to auto-expire test records (set `Valid To` to near-future date)
- Ensure test data does not persist in production or production-like environments

---

## Validation Checklist

Before executing any test case, confirm:

- [ ] All `{{PLACEHOLDER}}` values have been replaced with real SAP values
- [ ] Valid values (HP, AP scenarios) exist in SAP master data
- [ ] Invalid values (NEG, ERR scenarios) are confirmed non-existent
- [ ] Boundary values (EDGE scenarios) are within SAP system limits
- [ ] Validity dates are relative to test execution date
- [ ] Organizational structure codes (sales org, distribution channel) are assigned to test user
- [ ] Supervisor user account exists and has approval authorization
- [ ] Tolerance percentage is configured in SAP pricing settings
- [ ] All test data uses test-specific prefixes or identifiers (not production data)

---

## Contact for Test Data Issues

If you encounter issues with test data substitution or SAP master data availability:
- **Test Data Owner:** Pricing Analyst (test environment)
- **SAP Basis Support:** For user authorization and organizational structure configuration
- **Test Manager:** For test data provisioning and environment setup

---

**End of Test Data Substitution Guide**
