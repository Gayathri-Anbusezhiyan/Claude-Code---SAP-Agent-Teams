# Test Data Guide: [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed

**Generated:**    2026-08-24  
**Module:**       SD (Sales & Distribution)  
**Feature:**      Billing Document Creation with Batch and Quality Management Validation  
**Data File:**    testdata/CS-42/CS-42-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-42/CS-42-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Sales Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORDER_NUMBER_VALID}}` | An active sales order containing batch-managed material | SAP Fiori: Display Sales Order (VA03 equivalent) → search for open sales orders with batch-managed items |

### Delivery Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{DELIVERY_NUMBER_VALID}}` | A delivery document with goods issue posted, batch assigned, and quality released | SAP Fiori: Display Delivery (VL03N) → search for deliveries with status "Goods Issue Posted" |
| `{{DELIVERY_NUMBER_RESTRICTED_BATCH}}` | A delivery with a batch that has restricted status (VFZST set or VFDAT expired) | Create or identify a delivery where the assigned batch has restriction indicator set in MCH1 |
| `{{DELIVERY_NUMBER_NOT_RELEASED}}` | A delivery with a batch whose quality inspection lot has NOT been released (usage decision ≠ 'A') | Create or identify a delivery where QALS-VERWENDG is blank or 'R' (Rejected) |
| `{{DELIVERY_NUMBER_INVALID}}` | A delivery document number that does NOT exist in SAP | Use a non-existent number like "9999999999" — verify it returns "not found" in delivery search |
| `{{DELIVERY_NUMBER_FULLY_BILLED}}` | A delivery that has already been 100% billed | Identify a delivery where all quantities have been billed (check billing status in VL03N) |
| `{{DELIVERY_NUMBER_NO_INSPECTION_LOT}}` | A delivery with batch-managed material but NO inspection lot created in QALS | Create or identify a delivery where goods issue was posted but inspection lot creation was skipped |
| `{{DELIVERY_NUMBER_INVALID_FORMAT}}` | A delivery reference with invalid format (alphabetic or special characters) | Use "INVALID123" or "ABC@#$" — any non-numeric string |
| `{{DELIVERY_NUMBER_MULTI_BATCH}}` | A delivery with multiple batches assigned to the same line item | Create or identify a delivery where batch split occurred (multiple batches for one material line) |
| `{{DELIVERY_NUMBER_CONCURRENT}}` | A delivery used for concurrent update testing (quality status changes during billing) | Any valid delivery with approved batch/quality; will be used for testing timing scenarios |
| `{{DELIVERY_NUMBER_PARTIAL}}` | A delivery eligible for partial billing (quantity not yet fully billed) | Identify a delivery where partial billing is allowed in configuration |

### Billing Document Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BILLING_DOCUMENT_NUMBER_EXISTING}}` | An existing billing document number that fully billed a delivery | SAP Fiori: Display Billing Document (VF03 equivalent) → search for billing documents with status "Posted" |

### Date Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BILLING_DATE_CURRENT}}` | Current date or a valid date within the open fiscal period | Use today's date or a date within the current open posting period; format YYYY-MM-DD |
| `{{BILLING_DATE_PERIOD_BOUNDARY}}` | Billing date on the last day of the fiscal posting period | Use the last day of the current fiscal period (e.g., 2026-12-31 for period 012.2026) |

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SOLD_TO_PARTY_VALID}}` | Customer account number (sold-to party) from the sales order | Auto-populated from delivery; check LIKP-KUNAG or sales order VBAK-KUNNR |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED}}` | A material configured for batch management (MARA-XCHPF = 'X') | SAP Fiori: Display Material Master (MM03 equivalent) → check "Batch Management" checkbox is active |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_UNRESTRICTED}}` | A batch with Unrestricted status (VFZST blank, VFDAT not expired) | SAP Fiori: Display Batch (MSC3N) → search batches; verify restriction indicator is blank |
| `{{BATCH_NUMBER_RESTRICTED}}` | A batch with Restricted or Blocked status (VFZST set or VFDAT expired) | Create or identify a batch with restriction indicator set in MCH1 table |
| `{{BATCH_NUMBER_NOT_RELEASED}}` | A batch with an associated inspection lot that has NOT been released | Identify a batch where QALS-VERWENDG ≠ 'A' (not Accepted) |
| `{{BATCH_NUMBER_NO_INSPECTION_LOT}}` | A batch with no associated quality inspection lot in QALS | Create or identify a batch where inspection lot creation was skipped |
| `{{BATCH_NUMBER_1_UNRESTRICTED}}` | First batch in multi-batch scenario with Unrestricted status | Any valid batch with Unrestricted status; used for multi-batch delivery |
| `{{BATCH_NUMBER_2_UNRESTRICTED}}` | Second batch in multi-batch scenario with Unrestricted status | Any valid batch with Unrestricted status; used for multi-batch delivery |
| `{{BATCH_NUMBER_CONCURRENT}}` | Batch used for concurrent update testing | Any valid batch; quality status will be changed during billing test |

### Quality Inspection Lot Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{INSPECTION_LOT_NUMBER_ACCEPTED}}` | An inspection lot with usage decision 'Accepted' (QALS-VERWENDG = 'A') | SAP Fiori: Display Inspection Lot (QA03) → search for lots; verify usage decision = 'A' (Accepted) |
| `{{INSPECTION_LOT_NUMBER_NOT_RELEASED}}` | An inspection lot with usage decision NOT 'Accepted' (blank or 'R' = Rejected) | Identify an inspection lot where QALS-VERWENDG is blank or 'R' |
| `{{INSPECTION_LOT_NUMBER_1_ACCEPTED}}` | First inspection lot in multi-batch scenario with Accepted status | Any inspection lot with usage decision = 'A'; for batch 1 in multi-batch delivery |
| `{{INSPECTION_LOT_NUMBER_2_ACCEPTED}}` | Second inspection lot in multi-batch scenario with Accepted status | Any inspection lot with usage decision = 'A'; for batch 2 in multi-batch delivery |
| `{{INSPECTION_LOT_NUMBER_CONCURRENT}}` | Inspection lot used for concurrent update testing | Any inspection lot with initial status 'A'; will be changed to 'R' or blank during test |

### Quantity and Value Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BILLING_QUANTITY_STANDARD}}` | Standard billing quantity from delivery | Use the full delivery quantity; shown in LIPS-LFIMG |
| `{{BILLING_QUANTITY_MIN}}` | Minimum valid billing quantity (lower boundary) | Use minimum allowed value (e.g., 0.001 or 1 depending on UoM and system configuration) |
| `{{DELIVERY_QUANTITY_FULL}}` | Full delivery quantity available for billing | Use the total quantity from delivery line item (LIPS-LFIMG) |
| `{{NET_VALUE_CALCULATED}}` | Net value calculated from pricing conditions | Auto-calculated by SAP based on pricing; reference only — not user-entered |
| `{{NET_VALUE_MULTI_BATCH}}` | Net value for multi-batch scenario | Auto-calculated by SAP for combined batch quantities; reference only |

### Organizational Structure Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{FISCAL_PERIOD_OPEN}}` | Current open fiscal posting period | SAP configuration → Fiscal Year Variants; or check current period in VBRK table (format: NNN.YYYY, e.g., 012.2026 for December 2026) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `DELIVERY_NUMBER_INVALID` and `DELIVERY_NUMBER_INVALID_FORMAT` values must be verified to NOT exist in the test system before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. **FDA/GMP Compliance Note**: Batch and quality inspection lot data must be carefully managed to ensure test data does not violate regulatory requirements
6. **Batch Restriction Setup**: To create `BATCH_NUMBER_RESTRICTED`, use transaction MMBE or Fiori "Manage Batch" to set VFZST restriction indicator or set VFDAT (shelf-life expiration) to a past date
7. **Quality Inspection Lot Setup**: To create `INSPECTION_LOT_NUMBER_NOT_RELEASED`, use transaction QA02 or Fiori "Change Inspection Lot" to set VERWENDG (usage decision) to blank or 'R' (Rejected)
8. **Multi-Batch Setup**: To create `DELIVERY_NUMBER_MULTI_BATCH`, use VL02N or Fiori "Change Delivery" to perform batch split on a line item (multiple batches for one material quantity)
9. **Concurrent Update Testing**: For TC-CS-031, prepare two SAP sessions — one for billing (VF01) and one for QM (QA02) to change usage decision during billing process
10. If required master data objects do not exist in your test system, create them using the relevant SAP Fiori configuration apps before executing tests

---

## Test Data Preparation Checklist

Before executing test cases, verify the following setup:

- [ ] Quality Management (QM) module is active in the test environment
- [ ] Batch management is enabled for test materials (MARA-XCHPF = 'X')
- [ ] Inspection type configured for delivery (inspection origin = 04 for goods receipt from production)
- [ ] No billing block is set on test deliveries (LIKP-FAKSK and LIPS-FAKSP are blank)
- [ ] All test deliveries have goods issue posted (status in VL03N = "Goods Issue Posted")
- [ ] All test batches exist in MCH1 batch master with correct restriction indicators
- [ ] All test inspection lots exist in QALS with correct usage decision status
- [ ] Sales orders linked to test deliveries are open and not fully billed
- [ ] Fiscal posting periods are open for test billing dates
- [ ] Test user has authorization for VF01 (Create Billing Document), VL03N (Display Delivery), QA03 (Display Inspection Lot), MSC3N (Display Batch)
