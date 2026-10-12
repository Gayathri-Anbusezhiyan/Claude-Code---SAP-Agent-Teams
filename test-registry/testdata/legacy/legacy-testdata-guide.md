# Test Data Guide: Legacy Test Cases

**Generated:**    2026-05-11
**Source Files:** `testcases/*.txt`
**Data Files:**
- `testdata/legacy/SD-testdata.json` — Sales Order (Create / Change / Display)
- `testdata/legacy/MM-PR-testdata.json` — Purchase Requisition (Create / Change / Display)
- `testdata/legacy/MM-PO-testdata.json` — Purchase Order (Change / View)

---

## How to Use This Guide

1. Open the relevant `testdata/legacy/*.json` file
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP S/4HANA Cloud test system
4. Save the updated JSON — **do NOT commit real SAP credentials or IDs to version control**
5. Replace the hardcoded values in the source `.txt` test case files with the parameterized placeholders

> **Important:** The original `.txt` test case files contain hardcoded system values (PO numbers, sales order numbers, material IDs, credentials). These should be treated as test-system-specific and should be replaced with your environment's values before execution. Never use production document numbers in test cases.

---

## Environment Variables (store in `.env` — NOT in testdata JSON)

| Variable | Used As | Current Hardcoded Value (replace!) |
|----------|---------|-------------------------------------|
| `SAP_BASE_URL` | Base URL for all navigation steps | `https://my429998.s4hana.cloud.sap` |
| `SAP_FIORI_URL` | Full Fiori launch URL (including SSO trigger params) | `https://my429998.s4hana.cloud.sap/ui?sap-language=en&help-mixedLanguages=false&help-autoStartTour=11d1565738cd9067e10000000a4450e5#Shell-home` |
| `SAP_USERNAME` | Login email | `sunil.yogi@capgemini.com` |
| `SAP_PASSWORD` | Login password | _(stored in .env — do not commit)_ |

---

## SD — Sales Order Placeholders

### Organisational Data

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{SALES_DOCUMENT_TYPE}}` | Sales document type code | SAP: VA01 → Order Type field → select from dropdown (e.g., `OR` for Standard Order) |
| `{{SALES_ORG_CODE}}` | Sales organisation code | SAP Configuration → Enterprise Structure → Sales Organisation (e.g., `US00`) |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code | SAP Configuration → Distribution Channels (e.g., `10`) |
| `{{DIVISION_CODE}}` | Division code | SAP Configuration → Divisions (e.g., `00`) |
| `{{SALES_OFFICE_CODE}}` | Sales office code | SAP Configuration → Sales Offices (optional; leave blank if not required) |
| `{{SALES_GROUP_CODE}}` | Sales group code | SAP Configuration → Sales Groups (optional; leave blank if not required) |

### Customer Data

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{SOLD_TO_PARTY}}` | Customer account number (sold-to party) | SAP: Customer Master → Manage Business Partner app → search active customers with Sales role |
| `{{SHIP_TO_PARTY}}` | Ship-to party account number | Usually same as Sold-to Party or a partner function; check customer master |
| `{{CUSTOMER_REFERENCE}}` | Customer's own order reference / PO reference | Any alphanumeric reference string used in the test (e.g., `TEST-REF-001`) |
| `{{CUSTOMER_REFERENCE_DATE}}` | Date associated with the customer reference | A valid date in your test system format (e.g., `04/14/2026`) |

### Material and Pricing Data

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{MATERIAL_ID_SD}}` | Material number for the sales order line item | SAP: Manage Material app → search materials configured for the sales organisation |
| `{{SO_ORDER_QUANTITY}}` | Order quantity for the line item | A realistic quantity for the material (e.g., `10`) |
| `{{GROSS_WEIGHT}}` | Gross weight of the shipment | Matches the material's weight configuration; enter when prompted in incompletion log |
| `{{NET_WEIGHT}}` | Net weight of the shipment | Typically same as or less than gross weight |
| `{{PRICING_CONDITION_TYPE}}` | SAP pricing condition type code | From the pricing procedure assigned to the sales org (e.g., `PR00`, `PPRO`) |
| `{{PRICING_AMOUNT}}` | Price amount for the pricing condition | A realistic price per UoM (e.g., `100.00`) |

### Document Numbers (Change / Display scenarios)

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{EXISTING_SALES_ORDER_NUMBER}}` | An existing sales order number to change or display | Run VA03 (Display Sales Order) to find an existing order; or use a number created during Create SO execution |
| `{{SO_CHANGE_QUANTITY}}` | Updated quantity to apply when changing the sales order | A valid quantity > 0 (e.g., `5`) |

---

## MM — Purchase Requisition Placeholders

### Material and Org Data

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{MATERIAL_ID_PR}}` | Material number for the purchase requisition | SAP: Manage Material app → search active materials configured for purchasing |
| `{{PLANT_CODE}}` | Plant code for the requisition | SAP Configuration → Enterprise Structure → Plants (e.g., `1010`) |
| `{{PR_CREATE_QUANTITY}}` | Quantity to requisition when creating a new PR | A realistic quantity for the material (e.g., `5`) |

### Document Numbers (Change / Display scenarios)

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{EXISTING_PR_NUMBER}}` | An existing purchase requisition number to change or display | SAP: Display Purchase Requisitions app → run a search to find existing PRs (format: `001xxxxxxx`) |
| `{{PR_CHANGE_QUANTITY}}` | Updated quantity to apply when changing the PR | A valid quantity > 0 (e.g., `10`) |

---

## MM — Purchase Order Placeholders

### Document Numbers (Change / View scenarios)

| Placeholder | Description | How to Find in SAP |
|-------------|-------------|-------------------|
| `{{EXISTING_PO_NUMBER}}` | An existing purchase order number to change or view | SAP: Manage Purchase Orders app → search for POs with status Open/Active (format: `45xxxxxxxxxx`) |
| `{{PO_CHANGE_QUANTITY}}` | Updated quantity to apply when changing the PO line item | A valid quantity > 0 (e.g., `5`) |

---

## Hardcoded Values Extracted from Source Files

The following values were hardcoded in the original test case files. Replace them with placeholders when parameterizing the test cases.

| Source File | Hardcoded Value | Placeholder to Use |
|-------------|----------------|-------------------|
| Create Sales Order.txt | `USCU_L01` (sold-to/ship-to) | `{{SOLD_TO_PARTY}}` / `{{SHIP_TO_PARTY}}` |
| Create Sales Order.txt | `RMPI001` (material) | `{{MATERIAL_ID_SD}}` |
| Create Sales Order.txt | Qty `10` | `{{SO_ORDER_QUANTITY}}` |
| Create Sales Order.txt | Ref `ABC` | `{{CUSTOMER_REFERENCE}}` |
| Create Sales Order.txt | Date `04/14/2026` | `{{CUSTOMER_REFERENCE_DATE}}` |
| Create Sales Order.txt | Weight `10` | `{{GROSS_WEIGHT}}` / `{{NET_WEIGHT}}` |
| Create Sales Order.txt | `PPRO`, amount `100` | `{{PRICING_CONDITION_TYPE}}` / `{{PRICING_AMOUNT}}` |
| Change Sales order.txt | SO number `319776` | `{{EXISTING_SALES_ORDER_NUMBER}}` |
| Change Sales order.txt | Qty `5` | `{{SO_CHANGE_QUANTITY}}` |
| Display Sales order.txt | SO number `319776` | `{{EXISTING_SALES_ORDER_NUMBER}}` |
| Create Purchase Requestion.txt | `RMPI001` (material) | `{{MATERIAL_ID_PR}}` |
| Create Purchase Requestion.txt | Qty `5` | `{{PR_CREATE_QUANTITY}}` |
| Change Purchase Requestion.txt | PR number `0010006092` | `{{EXISTING_PR_NUMBER}}` |
| Change Purchase Requestion.txt | Qty `10` | `{{PR_CHANGE_QUANTITY}}` |
| Display Purchase Requestion.txt | PR number `0010006092` | `{{EXISTING_PR_NUMBER}}` |
| Change Purchase order flow.txt | PO number `4500063731` | `{{EXISTING_PO_NUMBER}}` |
| Change Purchase order flow.txt | Qty `5` | `{{PO_CHANGE_QUANTITY}}` |
| View Purchase order.txt | PO number `4500063731` | `{{EXISTING_PO_NUMBER}}` |

---

## Important Notes

1. **Never commit real SAP credentials** — `SAP_USERNAME` and `SAP_PASSWORD` must remain in `.env` only
2. **Document numbers are environment-specific** — PO numbers (`45xxxxxxxxxx`), PR numbers (`001xxxxxxx`), and Sales Order numbers will differ between SAP tenants; verify them fresh in each test environment
3. **Change/Display tests depend on prior data** — the `{{EXISTING_*_NUMBER}}` values must point to documents that actually exist and are in an editable/viewable state before test execution
4. **Material `RMPI001`** appears in both SD and MM-PR test cases — confirm it is configured correctly for both SD (sales org) and MM (purchasing, plant) views in your test system
5. Refresh all document numbers whenever the SAP test system is refreshed from a production copy
