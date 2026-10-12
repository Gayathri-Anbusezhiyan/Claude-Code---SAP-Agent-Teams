# Test Strategy: [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor

**Created:**          2026-08-24
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-21/strategy/CS-21-analysis.md
**Risk Profile:**     jira/userstories/CS-21/strategy/CS-21-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Warehouse Operator
- **Business Object:** Return Delivery (Goods Movement 122)
- **SAP Module:** MM — Materials Management
- **Business Goal:** Formally remove non-conforming GMP materials from inventory with full traceability and enable vendor cost recovery

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 4 | 4 | CRITICAL/HIGH |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM/HIGH |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **18** | **18** | — |

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (HP) — CRITICAL Priority
- **HP-01**: Return rejected batch from Blocked Stock with debit memo trigger
  - Risk: CRITICAL
  - ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  - Coverage: Full end-to-end flow including financial integration
  
- **HP-02**: Return rejected batch from Quality Inspection Stock without debit memo
  - Risk: CRITICAL
  - ACs: AC-1, AC-2, AC-3, AC-4, AC-5
  - Coverage: Core return flow with QI stock type, debit memo optional path

#### Alternative Path (AP) — CRITICAL/HIGH Priority
- **AP-01**: Return batch from Blocked Stock (stock type 'S')
  - Risk: CRITICAL
  - ACs: AC-2, AC-4
  - Rationale: Validate stock removal from Blocked stock type specifically
  
- **AP-02**: Return batch from Quality Inspection Stock (stock type 'X')
  - Risk: CRITICAL
  - ACs: AC-2, AC-4
  - Rationale: Validate stock removal from QI stock type specifically
  
- **AP-03**: Trigger debit memo request for vendor cost recovery
  - Risk: HIGH
  - ACs: AC-6
  - Rationale: Validate financial integration path (debit memo creation)
  
- **AP-04**: Skip debit memo request (manual processing later)
  - Risk: MEDIUM
  - ACs: AC-6
  - Rationale: Validate optional debit memo path (defer to manual processing)

#### Negative (NEG) — HIGH Priority
- **NEG-01**: Invalid or non-existent Purchase Order number
  - Risk: HIGH
  - ACs: AC-2
  - Expected: System rejects with error message "Purchase Order XXXXXXXXXX does not exist"
  
- **NEG-02**: Invalid or non-existent Batch number
  - Risk: HIGH
  - ACs: AC-2
  - Expected: System rejects with error message "Batch XXXXXXXXXX does not exist"
  
- **NEG-03**: Batch exists but has zero quantity in restricted stock
  - Risk: HIGH
  - ACs: AC-2, AC-4
  - Expected: System rejects with error message "No stock available for batch XXXXXXXXXX"
  
- **NEG-04**: Batch is in Unrestricted Stock (not Blocked/QI)
  - Risk: HIGH
  - ACs: AC-2, AC-4
  - Expected: System rejects with error message "Batch not in Blocked or Quality Inspection stock"
  
- **NEG-05**: Purchase Order exists but has no goods receipt posted
  - Risk: HIGH
  - ACs: AC-2
  - Expected: System rejects with error message "No goods receipt found for Purchase Order XXXXXXXXXX"

#### Error / Missing Field (ERR) — HIGH Priority
- **ERR-01**: Missing Rejection Reason Code
  - Risk: HIGH
  - ACs: AC-3
  - Field: Reason for Movement (mandatory field)
  - Expected: System blocks posting with error "Reason for Movement is required"
  
- **ERR-02**: Missing Return Quantity
  - Risk: HIGH
  - ACs: (implied mandatory field)
  - Field: Quantity (mandatory field)
  - Expected: System blocks posting with error "Enter a quantity" or "Quantity is required"
  
- **ERR-03**: Missing Purchase Order
  - Risk: HIGH
  - ACs: AC-2
  - Field: Purchase Order (mandatory field)
  - Expected: System blocks posting with error "Purchase Order is required"

#### Edge Case / Boundary (EDGE) — MEDIUM/HIGH Priority
- **EDGE-01**: Return quantity = minimum UoM precision (e.g., 0.001 KG)
  - Risk: MEDIUM
  - ACs: AC-4
  - Parameter: returnQuantity (lower boundary)
  - Expected: System accepts minimum valid quantity
  
- **EDGE-02**: Return quantity = exact available batch quantity (full return)
  - Risk: MEDIUM
  - ACs: AC-4
  - Parameter: returnQuantity (upper boundary)
  - Expected: System accepts full batch return; stock becomes zero
  
- **EDGE-03**: Return quantity > available batch quantity (over-return attempt)
  - Risk: HIGH
  - ACs: AC-4
  - Parameter: returnQuantity (upper boundary violation)
  - Expected: System rejects with error "Quantity exceeds available stock"
  
- **EDGE-04**: Return quantity = 0
  - Risk: MEDIUM
  - ACs: AC-4
  - Parameter: returnQuantity (zero value)
  - Expected: System rejects with error "Quantity must be greater than 0"

### Recommended Scenarios

None — all scenario types have been classified as MANDATORY due to CRITICAL overall risk.

### Optional Scenarios

None — all scenario types have been classified as MANDATORY due to CRITICAL overall risk.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 4 AP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES | YES |

**Additional CRITICAL-risk gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — all 5 NEG scenarios generated | YES |
| Error coverage (mandatory fields) | 100% — all 3 ERR scenarios generated | YES |
| Stock type validation | Both Blocked ('S') and QI ('X') stock types covered | YES |
| Financial integration | Debit memo trigger and skip paths both covered | YES |
| Document reference integrity | HP-01 and HP-02 must verify GR and inspection lot references | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of quality gates required for CRITICAL-risk story.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core inventory transaction for GMP compliance; impacts physical stock, financial accounting, and audit trail |
| AP (stock type variants) | CRITICAL | CRITICAL | Stock removal from restricted stock types (Blocked, QI) is inventory-critical; must validate both paths |
| AP (debit memo options) | HIGH | MAJOR | Financial integration for vendor cost recovery; failure blocks financial reconciliation |
| NEG (invalid entity) | HIGH | MAJOR | PO and batch validation failures block business process; must provide clear error messages |
| NEG (stock type mismatch) | HIGH | MAJOR | Unrestricted stock returns create audit issues and inventory discrepancies |
| ERR (missing mandatory field) | HIGH | MAJOR | Rejection reason is GMP-critical; missing mandatory fields block posting |
| EDGE (boundary) | MEDIUM | MINOR | Quantity boundaries are important but edge cases occur rarely |
| EDGE (over-return) | HIGH | MAJOR | Over-return creates stock discrepancy; must be rejected |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable flow with machine-verifiable results (document number, stock removal) |
| AP (stock types) | YES | Data-driven via testdata JSON; stock type parameter varies but flow is stable |
| AP (debit memo) | PARTIAL | Debit memo creation may require FI module setup; debit memo verification may need additional navigation |
| NEG | YES | Validation checks are stable and repeatable; error messages are predictable |
| ERR | YES | Field-level validation is stable; missing field errors are predictable |
| EDGE | PARTIAL | Boundary values require specific test data setup (batches with exact quantities); minimum UoM precision may vary by material |
| INT | NOT APPLICABLE | No Jira-linked integration scenarios (domain integrations with QM and FI covered in HP/AP) |

**Target automation coverage:** 14 of 18 TCs (77.8%)

**Automation notes:**
- HP-01, HP-02: Full automation possible (document number verification, stock query)
- AP-01, AP-02: Full automation possible (stock type parameter)
- AP-03: Partial automation (verify debit memo request creation; full FI posting may be out of scope)
- AP-04: Full automation possible (verify no debit memo created)
- NEG-01 to NEG-05: Full automation possible (predictable error messages)
- ERR-01 to ERR-03: Full automation possible (field validation errors)
- EDGE-01, EDGE-02: Partial automation (require test data with specific batch quantities)
- EDGE-03, EDGE-04: Full automation possible (over-return and zero quantity errors)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{HP-01} — Return rejected batch from Blocked Stock with debit memo trigger
  TC-CS-{HP-02} — Return rejected batch from Quality Inspection Stock without debit memo
  TC-CS-{AP-01} — Return batch from Blocked Stock (stock type 'S')
  TC-CS-{AP-02} — Return batch from Quality Inspection Stock (stock type 'X')

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NEG-01} — Invalid or non-existent Purchase Order number
  TC-CS-{NEG-02} — Invalid or non-existent Batch number
  TC-CS-{NEG-03} — Batch exists but has zero quantity in restricted stock
  TC-CS-{NEG-04} — Batch is in Unrestricted Stock (not Blocked/QI)
  TC-CS-{NEG-05} — Purchase Order exists but has no goods receipt posted
  TC-CS-{ERR-01} — Missing Rejection Reason Code
  TC-CS-{ERR-02} — Missing Return Quantity
  TC-CS-{ERR-03} — Missing Purchase Order
  TC-CS-{AP-03} — Trigger debit memo request for vendor cost recovery
  TC-CS-{EDGE-03} — Return quantity > available batch quantity (over-return attempt)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{AP-04} — Skip debit memo request (manual processing later)
  TC-CS-{EDGE-01} — Return quantity = minimum UoM precision
  TC-CS-{EDGE-02} — Return quantity = exact available batch quantity (full return)
  TC-CS-{EDGE-04} — Return quantity = 0

Priority 4 — Integration (run after core stability confirmed):
  None (no Jira-linked integration scenarios)
```

**Execution notes:**
- Execute HP-01 and HP-02 first to establish baseline (CRITICAL priority)
- Execute AP-01 and AP-02 immediately after to validate stock type variants (CRITICAL priority)
- Execute all NEG and ERR scenarios before EDGE to ensure validation logic is stable
- Execute EDGE-03 (over-return) in Priority 2 due to HIGH risk (stock discrepancy)
- Execute remaining EDGE scenarios in Priority 3 (MEDIUM risk)

---

## Regulatory and Compliance Notes

**SAP MM — GMP Compliance Requirements:**
- Return Deliveries for rejected batches are audit-critical transactions in regulated industries (pharma, food, medical devices)
- Test cases must verify that the rejection reason code is mandatory (AC-3) — missing reason = audit failure
- Test cases must verify that the system generates a Return Delivery document with full traceability to the original Goods Receipt and Inspection Lot (AC-5)
- Ensure test data does not use real production vendor, material, or batch IDs
- All test execution must use dedicated test system instances (not production)

**SAP MM — Financial Accounting Integration:**
- Return Deliveries impact vendor accounts (debit memo for cost recovery)
- Test cases must verify that debit memo requests can be triggered (AP-03) or skipped (AP-04) per business policy
- Financial postings must be reversible in the test system (use test period configuration)

**SAP MM — Inventory Management:**
- Stock removal from Blocked/Quality Inspection stock must be accurate and traceable
- Test cases must verify that stock is removed only from restricted stock types (NEG-04)
- Test cases must verify that over-return attempts are rejected (EDGE-03)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-21-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR, EDGE)
3. Generate 18 test cases total (2 HP + 4 AP + 5 NEG + 3 ERR + 4 EDGE)
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, HP-02, AP-01, AP-02, AP-04, NEG-01 to NEG-05, ERR-01 to ERR-03, EDGE-03, EDGE-04
   - PARTIAL: AP-03, EDGE-01, EDGE-02
7. Output files to `testcases/AI-generated testcases/CS-21/` and `testdata/CS-21/`
8. Generate test data JSON with the following placeholders:
   - `{{PURCHASE_ORDER_VALID}}` — Existing PO with goods receipt posted
   - `{{PURCHASE_ORDER_INVALID}}` — Non-existent PO number
   - `{{PURCHASE_ORDER_NO_GR}}` — Existing PO with no goods receipt
   - `{{BATCH_BLOCKED_STOCK}}` — Batch in Blocked Stock (stock type 'S')
   - `{{BATCH_QI_STOCK}}` — Batch in Quality Inspection Stock (stock type 'X')
   - `{{BATCH_UNRESTRICTED_STOCK}}` — Batch in Unrestricted Stock (not Blocked/QI)
   - `{{BATCH_INVALID}}` — Non-existent batch number
   - `{{BATCH_ZERO_QTY}}` — Batch with zero quantity in restricted stock
   - `{{MATERIAL_NUMBER}}` — Material from original GR (auto-filled from PO)
   - `{{RETURN_QUANTITY_STANDARD}}` — Standard return quantity (e.g., 10 KG)
   - `{{RETURN_QUANTITY_MIN}}` — Minimum UoM precision (e.g., 0.001 KG)
   - `{{RETURN_QUANTITY_FULL}}` — Exact available batch quantity (full return)
   - `{{RETURN_QUANTITY_OVER}}` — Quantity exceeding available stock (e.g., 9999 KG)
   - `{{REJECTION_REASON_CODE}}` — Valid rejection reason (e.g., 0001=Failed spec, 0002=Damaged, 0003=Expired)
   - `{{PLANT}}` — Plant from original GR
   - `{{STORAGE_LOCATION}}` — Storage location from original GR
   - `{{TRIGGER_DEBIT_MEMO_YES}}` — "Yes" or "true" (trigger debit memo)
   - `{{TRIGGER_DEBIT_MEMO_NO}}` — "No" or "false" (skip debit memo)
9. For Expected Results in test steps:
   - Use exact SAP message text where possible (e.g., "Material Document 50000XXXXX posted")
   - Reference auto-populated fields (vendorId, vendorName, materialDescription, inspectionLotNumber) in Expected Result column (not test data)
   - For success scenarios: verify document number presence, stock removal, and document references
   - For error scenarios: verify exact error message text
10. Assign test case priorities per the Test Case Priority Assignment table above
11. Generate coverage matrix showing AC-to-TC traceability and completeness status
