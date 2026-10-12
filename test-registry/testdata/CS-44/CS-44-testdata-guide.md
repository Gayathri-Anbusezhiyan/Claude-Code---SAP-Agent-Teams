# Test Data Guide: [CS-44] User Story SD-012

**Generated:**    2026-08-24
**Module:**       SD — Sales & Distribution
**Feature:**      Sales Order Creation with Credit Limit Check
**Data File:**    testdata/CS-44/CS-44-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-44/CS-44-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID_WITHIN_LIMIT}}` | Active customer with outstanding balance less than credit limit | SAP Fiori: Manage Business Partner → search customers with active credit management; verify outstanding < limit via FD32 or credit management reports |
| `{{CUSTOMER_NAME_VALID}}` | Full name of the valid customer above (auto-populated) | Shown in customer master data for the customer ID above |
| `{{CUSTOMER_ID_AT_LIMIT_BOUNDARY}}` | Customer with outstanding balance such that new order pushes exposure to exact limit | Configure test customer with specific credit limit and outstanding balance via FD32 and FI-AR posting |
| `{{CUSTOMER_NAME_AT_BOUNDARY}}` | Full name of the boundary customer (auto-populated) | Shown in customer master data |
| `{{CUSTOMER_ID_EXCEEDS_LIMIT}}` | Customer with outstanding balance exceeding credit limit | Configure test customer via FD32; ensure outstanding balance > credit limit (post AR invoices to exceed limit) |
| `{{CUSTOMER_NAME_EXCEEDS_LIMIT}}` | Full name of the customer exceeding limit (auto-populated) | Shown in customer master data |
| `{{CUSTOMER_ID_NO_CREDIT_LIMIT}}` | Customer with no credit limit defined in KNKK | Create test customer without credit limit entry in FD32 credit master data view |
| `{{CUSTOMER_NAME_NO_LIMIT}}` | Full name of the customer with no limit (auto-populated) | Shown in customer master data |
| `{{CUSTOMER_ID_INVALID}}` | Non-existent customer ID | Use a random number like "9999999999" — verify it returns "not found" in customer search |
| `{{CUSTOMER_ID_ZERO_CREDIT_LIMIT}}` | Customer with credit limit = 0.00 | Configure test customer via FD32; set credit limit to exactly 0.00 |
| `{{CUSTOMER_NAME_ZERO_LIMIT}}` | Full name of the zero-limit customer (auto-populated) | Shown in customer master data |
| `{{CUSTOMER_ID_NEGATIVE_BALANCE}}` | Customer with negative outstanding balance (overpayment) | Configure test customer with overpayment (post incoming payment exceeding invoices in FI-AR) |
| `{{CUSTOMER_NAME_NEGATIVE_BALANCE}}` | Full name of the negative balance customer (auto-populated) | Shown in customer master data |
| `{{CUSTOMER_ID_AT_REMAINING_CREDIT}}` | Customer with outstanding balance such that order value = remaining credit exactly | Configure test customer with precise outstanding balance via FI-AR postings; calculate order value = limit - outstanding |
| `{{CUSTOMER_NAME_AT_REMAINING}}` | Full name of the remaining credit customer (auto-populated) | Shown in customer master data |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_VALID}}` | Active material number configured for the sales organization | SAP Fiori: Manage Material → search materials; or T-code MM60/MARA; ensure sales org view is maintained |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated) | Shown in material master for the material ID above |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORG_CODE}}` | Sales organization code assigned to the test company | SAP Fiori: Configuration → Sales → Sales Organizations; or T-code OVX1 |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code within the sales org | SAP configuration → Distribution Channels; or T-code OVX2 |
| `{{DIVISION_CODE}}` | Division code for product line | SAP configuration → Divisions; or T-code OVX3 |

### Quantity, Price, and Currency

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SO_QUANTITY_STANDARD}}` | Standard realistic order quantity | Use 1–100 depending on the UoM (e.g., 10 for EA, 1 for large items) |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material | Shown in material master (e.g., EA, PC, KG, L) |
| `{{NET_PRICE_VALID}}` | Realistic net price per UoM | Use a typical market price for the material type (e.g., 100.00 for finished goods) |
| `{{NET_PRICE_AT_EXACT_LIMIT}}` | Price calculated such that outstanding + order value = credit limit exactly | Calculate as: (credit limit - outstanding balance) / order quantity |
| `{{NET_PRICE_EXACT_REMAINING}}` | Price calculated such that order value = remaining credit exactly | Calculate as: (credit limit - outstanding balance) / order quantity |
| `{{CURRENCY_CODE}}` | Currency configured for the sales organization | Shown in sales org configuration (e.g., USD, EUR, GBP, INR) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Credit Management Configuration Requirements

For CS-44 test execution, the following SAP configuration must be in place:

1. **Credit Management Active:**
   - Credit management must be activated for the sales organization
   - Credit control area must be assigned to the sales organization
   - Automatic credit check must be enabled

2. **Customer Credit Master Data:**
   - Test customers must have credit master data maintained in FD32
   - Credit limit must be defined in KNKK for positive scenarios
   - Outstanding balance must be visible via FI-AR open items (BSID)

3. **FI-AR Integration:**
   - FI-AR module must be operational
   - Open items must be reflected in real-time for credit exposure calculation
   - Invoice and payment postings must update outstanding balance

4. **Test Data Setup:**
   - Create dedicated test customers with varying credit profiles
   - Post AR invoices and payments to simulate different outstanding balance scenarios
   - Configure credit limits using FD32 transaction or Manage Credit Management app

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `CUSTOMER_ID_INVALID` value must be verified to NOT exist in the test system before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **Credit management configuration** must be verified as active in the SAP tenant before test execution
7. **FI-AR integration** must be operational — outstanding balance calculation depends on real-time FI data
8. Test data must use **anonymized** customer information — do NOT reference real customer financial data

---

## Test Data Validation Checklist

Before executing test cases, verify:

- [ ] All customer IDs exist in KNA1 (except CUSTOMER_ID_INVALID)
- [ ] Credit limit values are configured in KNKK for all valid customers
- [ ] Outstanding balance values are correctly reflected via FI-AR open items
- [ ] Material ID is configured for sales view (sales org, distribution channel, division)
- [ ] Sales organization, distribution channel, and division are active and properly configured
- [ ] Credit management is active for the sales organization
- [ ] Test customers have varying credit profiles as documented in placeholder descriptions
- [ ] Currency codes match sales organization configuration
- [ ] All auto-populated fields (customer name, material description, UoM) are verified in master data
