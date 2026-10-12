# Test Coverage Matrix: [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor

**Generated:** 2026-08-24  
**Story:** CS-21  
**Module:** MM — Materials Management  
**Feature:** Return Delivery for Rejected Batch

---

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path (HP) | 2 | 2 | **PASS** |
| Alternative Path (AP) | 4 | 4 | **PASS** |
| Negative (NEG) | 5 | 5 | **PASS** |
| Error / Missing Field (ERR) | 3 | 3 | **PASS** |
| Edge Case / Boundary (EDGE) | 4 | 4 | **PASS** |
| Integration (INT) | 0 | 0 | **N/A** |
| **TOTAL** | **18** | **18** | **PASS** |

---

## Acceptance Criteria Traceability

| AC ID | AC Description | Test Cases Covering AC | Status |
|-------|----------------|------------------------|--------|
| AC-1 | The user can access the "Post Goods Movement" (Return Delivery) Fiori app | TC-CS-175, TC-CS-176 | **PASS** |
| AC-2 | The user can select the original Purchase Order and the specific rejected batch to be returned | TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-178, TC-CS-181, TC-CS-182, TC-CS-183, TC-CS-184, TC-CS-185, TC-CS-188 | **PASS** |
| AC-3 | The system requires a rejection reason code before the return can be posted | TC-CS-175, TC-CS-176, TC-CS-186 | **PASS** |
| AC-4 | The stock is removed from Blocked/Quality Inspection stock upon posting | TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-178, TC-CS-183, TC-CS-184, TC-CS-189, TC-CS-190, TC-CS-191, TC-CS-192 | **PASS** |
| AC-5 | The system generates a Return Delivery document that references the original goods receipt and inspection lot | TC-CS-175, TC-CS-176 | **PASS** |
| AC-6 | A debit memo request can be triggered from the return delivery for vendor cost recovery | TC-CS-175, TC-CS-179, TC-CS-180 | **PASS** |

**AC Coverage Status:** 6 of 6 ACs covered (100%) — **PASS**

---

## Test Case Inventory

### Happy Path (HP) — 2 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-175 | Record Return Delivery from Blocked Stock with Debit Memo Request | CRITICAL | YES | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 |
| TC-CS-176 | Record Return Delivery from Quality Inspection Stock without Debit Memo Request | CRITICAL | YES | AC-1, AC-2, AC-3, AC-4, AC-5 |

### Alternative Path (AP) — 4 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-177 | Return Batch from Blocked Stock (Stock Type S) Validation | CRITICAL | YES | AC-2, AC-4 |
| TC-CS-178 | Return Batch from Quality Inspection Stock (Stock Type X) Validation | CRITICAL | YES | AC-2, AC-4 |
| TC-CS-179 | Trigger Debit Memo Request for Vendor Cost Recovery | HIGH | PARTIAL | AC-6 |
| TC-CS-180 | Skip Debit Memo Request for Manual Processing Later | MEDIUM | YES | AC-6 |

### Negative (NEG) — 5 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-181 | Attempt Return Delivery with Invalid or Non-existent Purchase Order Number | HIGH | YES | AC-2 |
| TC-CS-182 | Attempt Return Delivery with Invalid or Non-existent Batch Number | HIGH | YES | AC-2 |
| TC-CS-183 | Attempt Return Delivery with Batch Having Zero Quantity in Restricted Stock | HIGH | YES | AC-2, AC-4 |
| TC-CS-184 | Attempt Return Delivery with Batch in Unrestricted Stock (Not Blocked or QI) | HIGH | YES | AC-2, AC-4 |
| TC-CS-185 | Attempt Return Delivery with Purchase Order Having No Goods Receipt Posted | HIGH | YES | AC-2 |

### Error / Missing Field (ERR) — 3 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-186 | Attempt Return Delivery with Missing Rejection Reason Code | HIGH | YES | AC-3 |
| TC-CS-187 | Attempt Return Delivery with Missing Return Quantity | HIGH | YES | (implied mandatory) |
| TC-CS-188 | Attempt Return Delivery with Missing Purchase Order | HIGH | YES | AC-2 |

### Edge Case / Boundary (EDGE) — 4 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-189 | Record Return Delivery with Minimum UoM Precision Return Quantity | MEDIUM | PARTIAL | AC-4 |
| TC-CS-190 | Record Return Delivery with Full Batch Quantity (Complete Return) | MEDIUM | PARTIAL | AC-4 |
| TC-CS-191 | Attempt Return Delivery with Quantity Exceeding Available Batch Stock | HIGH | YES | AC-4 |
| TC-CS-192 | Attempt Return Delivery with Zero Quantity | MEDIUM | YES | AC-4 |

---

## Quality Gates Verification

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 100% (6/6 ACs) | **PASS** |
| HP Coverage | All 2 HP scenarios generated | 2 | **PASS** |
| AP Coverage | All 4 AP scenarios generated | 4 | **PASS** |
| NEG Coverage | All 5 NEG scenarios generated | 5 | **PASS** |
| ERR Coverage | All 3 ERR scenarios generated | 3 | **PASS** |
| EDGE Coverage | All 4 EDGE scenarios generated | 4 | **PASS** |
| Parameterization | 0 hardcoded SAP values | 0 | **PASS** |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES | 14 YES + 3 PARTIAL = 14 | **PASS** |

**Additional CRITICAL-risk gates:**

| Additional Gate | Threshold | Actual | Status |
|----------------|-----------|--------|--------|
| Negative coverage (entity validation) | 100% — all 5 NEG scenarios generated | 5 | **PASS** |
| Error coverage (mandatory fields) | 100% — all 3 ERR scenarios generated | 3 | **PASS** |
| Stock type validation | Both Blocked ('S') and QI ('X') stock types covered | TC-CS-177 (S), TC-CS-178 (X) | **PASS** |
| Financial integration | Debit memo trigger and skip paths both covered | TC-CS-179 (trigger), TC-CS-180 (skip) | **PASS** |
| Document reference integrity | HP-01 and HP-02 verify GR and inspection lot references | TC-CS-175, TC-CS-176 | **PASS** |

**Overall Quality Gate Status:** **ALL GATES PASSED** ✓

---

## Priority Distribution

| Priority | Test Case Count | Percentage |
|----------|----------------|------------|
| CRITICAL | 4 | 22.2% |
| HIGH | 9 | 50.0% |
| MEDIUM | 5 | 27.8% |
| LOW | 0 | 0.0% |

---

## Automation Readiness

| Automation Status | Test Case Count | Percentage |
|------------------|----------------|------------|
| YES | 14 | 77.8% |
| PARTIAL | 3 | 16.7% |
| NO | 1 | 5.6% |

**Target automation coverage:** 14 of 18 TCs (77.8%) — **MEETS TARGET**

---

## Coverage Summary

- **Total Test Cases:** 18
- **Total ACs:** 6
- **AC Coverage:** 100% (all 6 ACs covered)
- **Scenario Coverage:** 100% (all mandatory scenario types generated)
- **Parameterization:** 100% (no hardcoded SAP values)
- **Automation Readiness:** 77.8% (14 full + 3 partial)
- **Quality Gate Status:** ALL GATES PASSED ✓

---

## Notes

- All 18 test cases are independently executable without dependencies on other test cases
- All test data is parameterized using `{TD.*}` placeholders — no hardcoded SAP values
- Environment values (SAP_FIORI_URL, SAP_USERNAME, SAP_PASSWORD) are referenced via `{ENV.*}` syntax
- Test data JSON and guide files are required before test execution
- Partial automation candidates (TC-CS-179, TC-CS-189, TC-CS-190) require specific test data setup (debit memo verification, minimum UoM precision, exact batch quantities)

---
