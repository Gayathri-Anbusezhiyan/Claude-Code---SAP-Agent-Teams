# Test Data Guide: [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process

**User Story:** CS-51
**Module:** PP — Production Planning and Control
**Feature:** Process Order Goods Issue with Batch Backflush
**Generated:** 2026-08-24

---

## Purpose

This guide explains how to resolve the `{{PLACEHOLDER}}` values in `CS-51-testdata.json` with actual SAP master data from your test system.

**IMPORTANT:** All placeholders MUST be replaced with real SAP data before test execution. DO NOT use production data — use dedicated test system data only.

---

## General Guidelines

1. **Use Test System Data Only:** All master data must exist in the SAP test system. Do NOT use production plant codes, materials, batches, or process orders.
2. **Batch Master Data Requirements:** 
   - Materials must be flagged as batch-managed
   - Multiple batches with varying SLED dates are required for FEFO logic validation
   - Test batches should be marked with "TEST" prefix or batch classification
3. **Process Order Requirements:**
   - Process orders must be in "Released" status for HP/AP/EDGE scenarios
   - Process orders in "Locked" or "Closed" status are required for ERR-04 scenario
4. **Batch Status Variations Required:**
   - Batches with unrestricted stock (standard)
   - Batch on quality hold (QI blocked) for NEG-01
   - Batch with expired SLED for NEG-02
   - Batch with zero available quantity for EDGE-04
5. **Data Consistency:** Use the same plant, storage location, and organizational codes across all datasets for consistency

---

## Placeholder Resolution Table

### Process Order Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{PROCESS_ORDER_NUMBER_RELEASED}}` | Process order number in Released status | `1000001234` | Use transaction CO03 or Fiori "Display Process Order" to find a test process order in Released status. Create a new test process order if none exist. |
| `{{PROCESS_ORDER_NUMBER_LOCKED_OR_CLOSED}}` | Process order in Locked or Closed status (for ERR-04) | `1000005678` | Find or create a process order with status "Locked", "Closed", or "Technically Completed" |
| `{{PROCESS_ORDER_STATUS_INVALID}}` | Invalid status label for error scenario | `Locked` or `Closed` | Use the exact SAP status text from the process order header |

### Yield and Quantity Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{YIELD_QUANTITY_STANDARD}}` | Standard yield quantity for confirmation | `10` | Use a typical yield quantity for your test process order (per target UoM, e.g., 10 KG, 100 EA) |
| `{{YIELD_QUANTITY_MINIMUM}}` | Minimum valid yield quantity (lower boundary) | `0.001` | Use the smallest valid decimal per UoM (0.001 KG, 0.001 EA) |
| `{{REQUIRED_COMPONENT_QTY_STANDARD}}` | Standard component quantity calculated by BOM | `5` | This is auto-calculated by SAP based on BOM factor and yield. Example: BOM factor = 0.5, yield = 10 → component qty = 5 |
| `{{REQUIRED_COMPONENT_QTY_MINIMUM}}` | Minimum component quantity for minimum yield | `0.0005` | BOM factor × minimum yield. Example: BOM factor = 0.5, yield = 0.001 → component qty = 0.0005 |
| `{{REQUIRED_COMPONENT_QTY_EXACT_MATCH}}` | Component quantity for exact match scenario | `5` | Must match the available quantity of the batch used in EDGE-02 |
| `{{REMAINING_QTY_AFTER_PRIMARY}}` | Remaining quantity for substitute batch | `3` | Required component qty - primary batch partial qty. Example: 5 - 2 = 3 |

### Plant and Organization Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{PLANT_CODE}}` | Production plant code | `1710` | Use your test plant code from organizational structure (transaction OX10 or Fiori "Manage Plants") |
| `{{STORAGE_LOCATION_CODE}}` | Storage location code for batch-managed materials | `0001` | Use a storage location in your test plant that is configured for batch management (transaction OX09 or Fiori "Manage Storage Locations") |

### Material and Batch Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{COMPONENT_MATERIAL_ID_BATCH_MANAGED}}` | Raw material number (batch-managed) | `RM-BATCH-001` | Use transaction MM03 or Fiori "Display Material" to find a batch-managed raw material. Material must have "Batch Management" indicator active in material master. |
| `{{BATCH_NUMBER_FEFO_PRIMARY}}` | Primary batch (earliest SLED) with sufficient stock | `BATCH-2024-01` | Use transaction MMBE or Fiori "Display Stock Overview" to find batches for the material. Select the batch with the earliest SLED and sufficient available quantity. |
| `{{BATCH_NUMBER_PRIMARY_EARLIEST_SLED}}` | Primary batch for FEFO validation (earliest SLED) | `BATCH-2024-01` | Same as above — batch with earliest expiration date |
| `{{BATCH_NUMBER_SECONDARY_LATER_SLED}}` | Secondary batch for FEFO validation (later SLED) | `BATCH-2024-02` | A batch with later SLED than the primary batch (used to validate FEFO selection logic) |
| `{{BATCH_NUMBER_PRIMARY_INSUFFICIENT}}` | Primary batch with insufficient quantity | `BATCH-2024-01-PARTIAL` | Batch with available quantity LESS than required component quantity (for multi-batch scenario AP-01) |
| `{{BATCH_NUMBER_SUBSTITUTE}}` | Substitute batch (second FEFO batch) | `BATCH-2024-02` | Second batch selected when primary batch quantity is insufficient |
| `{{BATCH_NUMBER_SUBSTITUTE_SECOND}}` | Second substitute batch (for zero-qty scenario) | `BATCH-2024-02` | Second batch used when primary batch has zero quantity |
| `{{BATCH_NUMBER_FEFO_PROPOSED}}` | FEFO-proposed batch (for manual override scenario) | `BATCH-2024-01` | Batch that SAP would auto-select per FEFO logic |
| `{{BATCH_NUMBER_MANUAL_OVERRIDE}}` | Manually selected batch (overrides FEFO) | `BATCH-2024-03` | A different valid batch with later SLED (used to test manual batch override) |
| `{{BATCH_NUMBER_QUALITY_HOLD}}` | Batch on quality hold (QI blocked) | `BATCH-QI-HOLD` | Create or use a batch with quality inspection status "Blocked" (use transaction MSC3N "Create Quality Lot" or set stock type to Quality Inspection in MMBE) |
| `{{BATCH_NUMBER_EXPIRED}}` | Batch with expired SLED | `BATCH-EXPIRED-2023` | Batch with SLED date in the past (SLED < current system date). Use transaction MSC2N "Change Batch" to set SLED to a past date. |
| `{{BATCH_NUMBER_EXPIRES_TODAY}}` | Batch expiring today (SLED = system date) | `BATCH-EXPIRES-TODAY` | Batch with SLED = current system date (boundary scenario). Set SLED to today's date using MSC2N. |
| `{{BATCH_NUMBER_EXACT_MATCH}}` | Batch with quantity exactly matching required qty | `BATCH-EXACT-05` | Batch with available quantity EXACTLY EQUAL to required component quantity (e.g., 5 KG available, 5 KG required) |
| `{{BATCH_NUMBER_ZERO_QTY}}` | Batch with zero available quantity | `BATCH-DEPLETED` | Batch with available unrestricted stock = 0 (fully consumed). Use transaction MB1C or MIGO to reduce stock to zero. |

### Batch Quantity and SLED Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{BATCH_AVAILABLE_QTY_EXACT}}` | Batch available quantity (exact match with required qty) | `5` | Available unrestricted stock for the batch. Query via MMBE or "Display Stock Overview". |
| `{{BATCH_AVAILABLE_QTY_PRIMARY}}` | Primary batch available quantity (sufficient) | `10` | Available quantity for primary batch (must be ≥ required component qty) |
| `{{BATCH_AVAILABLE_QTY_PARTIAL}}` | Primary batch partial quantity (insufficient) | `2` | Available quantity LESS than required component qty (e.g., required = 5, available = 2) |
| `{{BATCH_AVAILABLE_QTY_SUBSTITUTE}}` | Substitute batch available quantity | `10` | Available quantity for substitute batch (sufficient to cover remaining requirement) |
| `{{BATCH_AVAILABLE_QTY_FEFO}}` | FEFO-proposed batch available quantity | `10` | Available quantity for FEFO-proposed batch |
| `{{BATCH_AVAILABLE_QTY_OVERRIDE}}` | Manual override batch available quantity | `10` | Available quantity for manually overridden batch |
| `{{BATCH_AVAILABLE_QTY_STANDARD}}` | Standard batch available quantity | `10` | Standard available quantity for general scenarios |
| `{{BATCH_AVAILABLE_QTY_EXACT_MATCH}}` | Batch quantity exactly matching required qty (boundary) | `5` | Available qty = required qty (for EDGE-02 exact boundary scenario) |
| `{{BATCH_SLED_EARLIEST}}` | Earliest SLED among available batches | `2026-12-31` | SLED (Shelf Life Expiration Date) for the earliest expiring batch (use transaction MSC3N or "Display Batch" to view SLED) |
| `{{BATCH_SLED_PRIMARY_EARLIEST}}` | Primary batch SLED (earliest) | `2026-12-31` | SLED for primary batch (earliest expiration) |
| `{{BATCH_SLED_SECONDARY_LATER}}` | Secondary batch SLED (later than primary) | `2027-06-30` | SLED for secondary batch (later than primary batch SLED) |
| `{{BATCH_SLED_SECOND_EARLIEST}}` | Second earliest SLED | `2027-01-31` | SLED for second batch in FEFO order |
| `{{BATCH_SLED_EXPIRED_PAST}}` | Expired SLED (date in the past) | `2023-01-01` | SLED date < current system date (expired batch for NEG-02) |
| `{{BATCH_SLED_TODAY}}` | SLED = current system date (boundary) | `2026-08-24` (replace with actual current date) | SLED = today's date (for EDGE-03 boundary scenario) |

### Batch Status Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{BATCH_STATUS_QI_BLOCKED}}` | Quality hold / QI blocked status label | `Quality Inspection` or `Blocked` | Exact SAP status text for quality inspection stock. View in MMBE or "Display Batch" (MSC3N). |

### Finished Product Batch Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{FINISHED_PRODUCT_BATCH_NUMBER}}` | Finished product batch for genealogy linkage | `FG-BATCH-001` | Batch number assigned to the finished product produced by the process order. This may be auto-generated by SAP or manually entered during confirmation. Check process order output in CO03. |

### Date Parameters

| Placeholder | Description | Example Value | How to Obtain |
|-------------|-------------|---------------|---------------|
| `{{POSTING_DATE_TODAY}}` | Today's date (for goods movement posting) | `2026-08-24` | Current system date. Use SAP system date (transaction SM51 or Fiori header date display). Format: YYYY-MM-DD. |

---

## Dataset-Specific Resolution Instructions

### TD-CS-051-001: Single Batch Consumption (Happy Path)
**Requirements:**
- Process order in Released status
- Batch-managed component material in BOM
- Batch with available quantity exactly matching or exceeding required component quantity
- Batch SLED is earliest among available batches (FEFO)

**Resolution Steps:**
1. Identify a test process order in Released status: `{{PROCESS_ORDER_NUMBER_RELEASED}}`
2. Find the backflush component material from the process order BOM: `{{COMPONENT_MATERIAL_ID_BATCH_MANAGED}}`
3. Query available batches for this material in MMBE, filter by plant and storage location
4. Select the batch with the earliest SLED and sufficient stock: `{{BATCH_NUMBER_FEFO_PRIMARY}}`
5. Note the batch available quantity: `{{BATCH_AVAILABLE_QTY_EXACT}}`
6. Note the batch SLED: `{{BATCH_SLED_EARLIEST}}`
7. Calculate required component quantity based on yield and BOM: `{{REQUIRED_COMPONENT_QTY_STANDARD}}`
8. Identify or create a finished product batch for genealogy: `{{FINISHED_PRODUCT_BATCH_NUMBER}}`

---

### TD-CS-051-002: FEFO Logic Validation (Happy Path)
**Requirements:**
- Same as TD-CS-051-001
- Additional requirement: At least TWO batches exist with different SLED dates

**Resolution Steps:**
1. Use same process order and component material as TD-CS-051-001
2. Identify the primary batch (earliest SLED): `{{BATCH_NUMBER_PRIMARY_EARLIEST_SLED}}` with SLED `{{BATCH_SLED_PRIMARY_EARLIEST}}`
3. Identify a secondary batch (later SLED): `{{BATCH_NUMBER_SECONDARY_LATER_SLED}}` with SLED `{{BATCH_SLED_SECONDARY_LATER}}`
4. Ensure primary batch SLED < secondary batch SLED (FEFO order)

---

### TD-CS-051-003: Multiple Batches with Substitute (Alternative Path)
**Requirements:**
- Primary batch available quantity < required component quantity
- Substitute batch available quantity ≥ remaining quantity

**Resolution Steps:**
1. Use same process order and component material
2. Identify a batch with insufficient quantity: `{{BATCH_NUMBER_PRIMARY_INSUFFICIENT}}` with available qty `{{BATCH_AVAILABLE_QTY_PARTIAL}}`
3. Calculate remaining quantity: `{{REMAINING_QTY_AFTER_PRIMARY}}` = required qty - primary batch partial qty
4. Identify substitute batch: `{{BATCH_NUMBER_SUBSTITUTE}}` with available qty `{{BATCH_AVAILABLE_QTY_SUBSTITUTE}}` ≥ remaining qty

---

### TD-CS-051-004: Manual Batch Override (Alternative Path)
**Requirements:**
- FEFO-proposed batch exists
- Alternative batch exists (later SLED, also valid)

**Resolution Steps:**
1. Identify FEFO-proposed batch (earliest SLED): `{{BATCH_NUMBER_FEFO_PROPOSED}}`
2. Identify alternative batch (later SLED, sufficient stock): `{{BATCH_NUMBER_MANUAL_OVERRIDE}}`
3. Ensure both batches have sufficient stock and are not on quality hold

---

### TD-CS-051-NEG-001: Batch on Quality Hold (Negative)
**Requirements:**
- Batch with quality inspection / QI blocked status

**Resolution Steps:**
1. Identify or create a batch on quality hold: `{{BATCH_NUMBER_QUALITY_HOLD}}`
2. Set batch stock type to "Quality Inspection" or "Blocked" using transaction MSC3N or MMBE
3. Note the exact SAP status label: `{{BATCH_STATUS_QI_BLOCKED}}` (e.g., "Quality Inspection", "QI Blocked")

---

### TD-CS-051-NEG-002: Expired Batch (Negative)
**Requirements:**
- Batch with SLED < current system date

**Resolution Steps:**
1. Identify or create a batch with expired SLED: `{{BATCH_NUMBER_EXPIRED}}`
2. Set SLED to a past date using transaction MSC2N: `{{BATCH_SLED_EXPIRED_PAST}}` (e.g., 2023-01-01)
3. Verify SLED < system date

---

### TD-CS-051-ERR-001, ERR-002, ERR-003: Missing Mandatory Fields (Error)
**Requirements:**
- Standard test data (process order, yield, posting date)
- `emptyValue` placeholder = blank/empty string

**Resolution Steps:**
1. Use standard test process order: `{{PROCESS_ORDER_NUMBER_RELEASED}}`
2. Use standard yield quantity: `{{YIELD_QUANTITY_STANDARD}}`
3. Use today's date: `{{POSTING_DATE_TODAY}}`
4. Leave `emptyValue` as blank/empty in test execution (do NOT enter value in the field)

---

### TD-CS-051-ERR-004: Invalid Process Order Status (Error)
**Requirements:**
- Process order in Locked, Closed, or Technically Completed status

**Resolution Steps:**
1. Identify a process order in invalid status: `{{PROCESS_ORDER_NUMBER_LOCKED_OR_CLOSED}}`
2. Note the exact status: `{{PROCESS_ORDER_STATUS_INVALID}}` (e.g., "Locked", "Closed", "Technically Completed")
3. Use transaction CO02 or "Change Process Order" to set status if needed

---

### TD-CS-051-EDGE-001: Minimum Yield Quantity (Edge)
**Requirements:**
- Minimum valid yield quantity per UoM (0.001 or equivalent)

**Resolution Steps:**
1. Use standard test data
2. Set yield quantity to minimum: `{{YIELD_QUANTITY_MINIMUM}}` = 0.001 (or UoM-specific minimum)
3. Calculate minimum component quantity: `{{REQUIRED_COMPONENT_QTY_MINIMUM}}` = BOM factor × 0.001

---

### TD-CS-051-EDGE-002: Exact Batch Quantity Match (Edge)
**Requirements:**
- Batch available quantity EXACTLY EQUALS required component quantity

**Resolution Steps:**
1. Calculate required component quantity: `{{REQUIRED_COMPONENT_QTY_EXACT_MATCH}}` (e.g., 5 KG)
2. Identify or adjust a batch to have available quantity = required qty: `{{BATCH_NUMBER_EXACT_MATCH}}` with `{{BATCH_AVAILABLE_QTY_EXACT_MATCH}}` = 5 KG
3. Use transaction MB1C or MIGO to adjust batch stock if needed

---

### TD-CS-051-EDGE-003: Batch Expiring Today (Edge)
**Requirements:**
- Batch with SLED = current system date (boundary)

**Resolution Steps:**
1. Identify or create a batch expiring today: `{{BATCH_NUMBER_EXPIRES_TODAY}}`
2. Set SLED = today's date using transaction MSC2N: `{{BATCH_SLED_TODAY}}` = current system date (e.g., 2026-08-24)
3. Verify SLED = system date

---

### TD-CS-051-EDGE-004: Zero Batch Quantity (Edge)
**Requirements:**
- Primary batch (earliest SLED) with zero available quantity
- Substitute batch (second earliest SLED) with sufficient quantity

**Resolution Steps:**
1. Identify a batch with earliest SLED and zero stock: `{{BATCH_NUMBER_ZERO_QTY}}` with SLED `{{BATCH_SLED_EARLIEST}}`
2. Use transaction MB1C or MIGO to consume all stock (reduce to zero) if needed
3. Identify substitute batch (second earliest SLED): `{{BATCH_NUMBER_SUBSTITUTE_SECOND}}` with SLED `{{BATCH_SLED_SECOND_EARLIEST}}` and available qty `{{BATCH_AVAILABLE_QTY_SUBSTITUTE}}`

---

## Data Validation Checklist

Before executing test cases, verify:

- [ ] All process orders exist and are in the correct status (Released for HP/AP/EDGE; Locked/Closed for ERR-04)
- [ ] All component materials are batch-managed and exist in process order BOMs
- [ ] All batches exist with the correct SLED dates, stock quantities, and quality statuses
- [ ] FEFO batch order is correct (earliest SLED = FEFO priority)
- [ ] Plant and storage location codes are consistent across all datasets
- [ ] Finished product batch numbers are available or can be auto-generated during confirmation
- [ ] NO production data is used — all data is from test system only
- [ ] Test batches are marked with "TEST" prefix or classification to prevent accidental production use

---

## Notes

- **Batch Genealogy Verification:** After test execution, use transaction MB56 or Fiori "Batch Where-Used" to verify batch genealogy linkages
- **FEFO Logic:** SAP FEFO logic selects batches based on SLED (earliest expiration first). Ensure test batches have different SLED dates to validate FEFO selection
- **Movement Type 261:** Goods issue for process order backflush consumption always uses movement type 261
- **Real-Time Inventory:** Inventory updates occur atomically during confirmation. Verify stock reduction immediately after confirmation via MMBE or "Display Stock Overview"

---
