# Test Coverage Matrix: [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|----------------|-----------|--------|
| Happy Path    | ≥ 1            | 2         | PASS   |
| Alternative   | 0 or more      | 5         | PASS   |
| Negative      | 4              | 4         | PASS   |
| Error         | 4              | 4         | PASS   |
| Edge Case     | ≥ 2            | 6         | PASS   |
| Integration   | 0 or more      | 3         | PASS   |
| **TOTAL**     | —              | **24**    | **PASS** |

---

## Acceptance Criteria to Test Case Traceability

| AC ID | Acceptance Criterion | Test Cases Covering AC | Count |
|-------|---------------------|------------------------|-------|
| AC-1  | The user can access the "Post Goods Movement" Fiori app for consignment withdrawal. | TC-CS-100, TC-CS-110, TC-CS-113, TC-CS-114 | 4 |
| AC-2  | The system tracks consignment stock separately by vendor and batch, excluded from company-owned inventory valuation until withdrawn. | TC-CS-100, TC-CS-102, TC-CS-103, TC-CS-104, TC-CS-107, TC-CS-108, TC-CS-109 | 7 |
| AC-3  | Upon withdrawal for production or sale, the system automatically transfers ownership and triggers the liability posting to the vendor. | TC-CS-100, TC-CS-102, TC-CS-103, TC-CS-106, TC-CS-111, TC-CS-112, TC-CS-118, TC-CS-119, TC-CS-120, TC-CS-121 | 10 |
| AC-4  | The system generates a consignment settlement document listing all withdrawals for a defined settlement period. | TC-CS-101, TC-CS-104, TC-CS-105, TC-CS-106, TC-CS-116, TC-CS-117 | 6 |
| AC-5  | The settlement document can be used to generate the vendor's invoice verification automatically. | TC-CS-101, TC-CS-118, TC-CS-123 | 3 |
| AC-6  | The system maintains batch traceability throughout the consignment-to-owned stock transition. | TC-CS-100, TC-CS-104, TC-CS-115, TC-CS-121, TC-CS-122 | 5 |

**Total AC Coverage Instances:** 35  
**All ACs Covered:** YES (6/6)

---

## Test Case Inventory by Scenario Type

### Happy Path (HP) — 2 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-100 | Transfer consignment stock with valid material, vendor, and batch to company ownership | CRITICAL | YES | AC-1, AC-2, AC-3, AC-6 |
| TC-CS-101 | Generate consignment settlement document and create vendor invoice automatically | CRITICAL | YES | AC-4, AC-5 |

### Alternative Path (AP) — 5 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-102 | Transfer partial consignment stock quantity (less than available stock) | HIGH | YES | AC-2, AC-3 |
| TC-CS-103 | Transfer consignment stock with full withdrawal of exact available stock quantity | HIGH | YES | AC-2, AC-3 |
| TC-CS-104 | Transfer consignment stock for multiple batches in same settlement period | HIGH | YES | AC-2, AC-4, AC-6 |
| TC-CS-105 | Generate consignment settlement for cross-month period with withdrawals | MEDIUM | YES | AC-4 |
| TC-CS-106 | Transfer consignment stock with backdated posting date | MEDIUM | YES | AC-3, AC-4 |

### Negative (NEG) — 4 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-107 | Attempt to transfer consignment stock with insufficient available stock quantity | CRITICAL | YES | AC-2 |
| TC-CS-108 | Attempt to transfer consignment stock with invalid vendor-batch combination | HIGH | YES | AC-2 |
| TC-CS-109 | Attempt to transfer consignment stock for non-consignment-enabled material | HIGH | YES | AC-2 |
| TC-CS-110 | Attempt to access Post Goods Movement app without required authorization | MEDIUM | NO | AC-1 |

### Error (ERR) — 4 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-111 | Attempt to transfer consignment stock with zero withdrawal quantity | MEDIUM | YES | AC-3 |
| TC-CS-112 | Attempt to transfer consignment stock with negative withdrawal quantity | MEDIUM | YES | AC-3 |
| TC-CS-113 | Attempt to transfer consignment stock with missing plant field | MEDIUM | YES | AC-1 |
| TC-CS-114 | Attempt to transfer consignment stock with missing storage location field | MEDIUM | YES | AC-1 |

### Edge Case (EDGE) — 6 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-115 | Attempt to transfer consignment stock from expired batch | CRITICAL | YES | AC-6 |
| TC-CS-116 | Generate consignment settlement document for same-day withdrawal | MEDIUM | YES | AC-4 |
| TC-CS-117 | Generate consignment settlement for period with no withdrawals | LOW | YES | AC-4 |
| TC-CS-118 | Generate consignment settlement and invoice with price change during period | HIGH | YES | AC-3, AC-5 |
| TC-CS-119 | Transfer consignment stock with maximum decimal precision quantity | LOW | YES | AC-3 |
| TC-CS-120 | Transfer consignment stock for zero-price consignment material | MEDIUM | YES | AC-3 |

### Integration (INT) — 3 Test Cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|------------|-------------|
| TC-CS-121 | Transfer consignment stock triggered by production order goods issue | HIGH | YES | AC-3, AC-6 |
| TC-CS-122 | Transfer consignment stock to quality inspection with batch traceability | MEDIUM | YES | AC-6 |
| TC-CS-123 | Generate consignment settlement and invoice with price variance handling | HIGH | YES | AC-5 |

---

## Priority Distribution

| Priority  | Count | Percentage |
|-----------|-------|------------|
| CRITICAL  | 5     | 20.8%      |
| HIGH      | 7     | 29.2%      |
| MEDIUM    | 10    | 41.7%      |
| LOW       | 2     | 8.3%       |
| **TOTAL** | **24** | **100%**  |

---

## Automation Viability

| Automation Status | Count | Percentage |
|-------------------|-------|------------|
| YES               | 23    | 95.8%      |
| NO                | 1     | 4.2%       |
| **TOTAL**         | **24** | **100%**  |

**Non-Automatable Test Cases:**
- TC-CS-110 (NEG-4): Requires user context switch with different authorization profile — not feasible in single-session automation

---

## Coverage Quality Gates

| Gate | Criterion | Status |
|------|-----------|--------|
| **Gate 1** | Every AC covered by at least 2 test cases | PASS (AC-1: 4, AC-2: 7, AC-3: 10, AC-4: 6, AC-5: 3, AC-6: 5) |
| **Gate 2** | All 6 mandatory scenario types present | PASS (HP: 2, AP: 5, NEG: 4, ERR: 4, EDGE: 6, INT: 3) |
| **Gate 3** | All 5 critical risk areas covered | PASS (see risk area mapping below) |
| **Gate 4** | Test data fully parameterized | PASS (see testdata/CS-28/CS-28-testdata.json) |
| **Gate 5** | At least 80% automation-eligible | PASS (95.8% = 23/24) |
| **Gate 6** | Batch traceability regulatory compliance | PASS (5 TCs explicitly verify FDA 21 CFR Part 11 requirements) |

---

## Critical Risk Area Coverage

| Risk Area | Risk Level | Test Cases Covering Area | Count |
|-----------|------------|--------------------------|-------|
| Ownership transfer accuracy | CRITICAL | TC-CS-100, TC-CS-102, TC-CS-103 | 3 |
| Financial posting correctness | CRITICAL | TC-CS-100, TC-CS-101, TC-CS-123 | 3 |
| Batch traceability integrity | CRITICAL | TC-CS-100, TC-CS-104, TC-CS-115, TC-CS-121, TC-CS-122 | 5 |
| Settlement completeness | HIGH | TC-CS-101, TC-CS-105, TC-CS-116, TC-CS-117 | 4 |
| Invoice automation reliability | HIGH | TC-CS-101, TC-CS-118, TC-CS-123 | 3 |

---

## Test Execution Recommendation

**Execution Wave 1 (P1 — Critical Priority):**
1. TC-CS-100 — Complete Consignment Withdrawal Flow
2. TC-CS-107 — Insufficient Consignment Stock
3. TC-CS-115 — Expired Batch Withdrawal
4. TC-CS-101 — Settlement Document Generation and Invoice Creation
5. TC-CS-121 — Production Order Integration

**Execution Wave 2 (P2 — High Priority):**
6. TC-CS-102 — Partial Withdrawal
7. TC-CS-103 — Full Withdrawal
8. TC-CS-104 — Multiple Batches Withdrawal
9. TC-CS-108 — Invalid Vendor-Batch Combination
10. TC-CS-109 — Material Not Consignment-Enabled
11. TC-CS-118 — Price Change During Settlement Period
12. TC-CS-123 — Invoice Verification with Price Variance

**Execution Wave 3 (P3 — Medium Priority):**
13. TC-CS-105 — Cross-Month Settlement Period
14. TC-CS-106 — Backdated Withdrawal Posting
15. TC-CS-110 — Unauthorized User Access (Manual)
16. TC-CS-111 — Zero Withdrawal Quantity
17. TC-CS-112 — Negative Withdrawal Quantity
18. TC-CS-113 — Missing Plant Field
19. TC-CS-114 — Missing Storage Location Field
20. TC-CS-116 — Same-Day Settlement
21. TC-CS-120 — Zero-Price Consignment Material
22. TC-CS-122 — Quality Inspection Post-Withdrawal

**Execution Wave 4 (P4 — Low Priority):**
23. TC-CS-117 — Settlement Period with No Withdrawals
24. TC-CS-119 — Maximum Decimal Precision Quantity

---

## Coverage Matrix Metadata

- **User Story:** CS-28
- **Story Priority:** Critical
- **Module:** MM (Materials Management)
- **Total Test Cases:** 24
- **Total ACs:** 6
- **Total AC Coverage Instances:** 35
- **Average TCs per AC:** 5.8
- **Coverage Analysis Date:** 2026-08-24
- **Coverage Analysis By:** TestCase Agent (Phase 3)
- **Strategy Source:** test-registry/jira/userstories/CS-28/strategy/CS-28-strategy.md
- **Test Data Source:** testdata/CS-28/CS-28-testdata.json
- **Overall Coverage Status:** COMPLETE — All mandatory scenario types covered, all ACs covered, all quality gates passed
