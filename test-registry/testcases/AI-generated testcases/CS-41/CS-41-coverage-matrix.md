# Test Coverage Matrix: [CS-41] User Story SD-009

## Coverage Completeness

| Scenario Type | Inventory Count | Generated | Status |
|---------------|----------------|-----------|--------|
| Happy Path    | 1 | 1 | PASS |
| Alternative   | 2 | 2 | PASS |
| Negative      | 3 | 3 | PASS |
| Error         | 3 | 3 | PASS |
| Edge Case     | 3 | 3 | PASS |
| Integration   | 4 | 4 | PASS |
| **TOTAL**     | **16** | **16** | **PASS** |

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | All 8 ACs covered | PASS |
| HP Coverage | All 1 HP scenarios generated | 1 generated | PASS |
| NEG Coverage | All 3 NEG scenarios generated | 3 generated | PASS |
| ERR Coverage | All 3 ERR scenarios generated | 3 generated | PASS |
| EDGE Coverage | All 3 EDGE TCs generated | 3 generated | PASS |
| INT Coverage | All 4 INT scenarios generated | 4 generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values found | PASS |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES (50% threshold) | 9 flagged YES/PARTIAL | PASS |
| Critical AC Coverage | AC-1, AC-2, AC-3, AC-4, AC-8 each covered by ≥ 1 TC | All critical ACs covered | PASS |
| Compliance Error Messaging | All NEG and ERR TCs verify explicit error message content per AC-8 | All verify error messages | PASS |

**Overall Quality Gate Status:** **ALL 10 MANDATORY GATES PASSED**

## AC Traceability Matrix

| AC ID | AC Description | Covered By Test Cases |
|-------|---------------|----------------------|
| AC-1 | System must perform denied-party screening before cross-border SO confirmation | TC-CS-041 (HP-01), TC-CS-044 (NEG-01), TC-CS-051 (EDGE-02), TC-CS-053 (INT-01) |
| AC-2 | System must perform export license screening before cross-border SO confirmation | TC-CS-041 (HP-01), TC-CS-045 (NEG-02), TC-CS-046 (NEG-03), TC-CS-050 (EDGE-01), TC-CS-054 (INT-02) |
| AC-3 | System must prevent SO confirmation if customer is on denied-party list | TC-CS-044 (NEG-01), TC-CS-051 (EDGE-02) |
| AC-4 | System must prevent SO confirmation if export license is missing or invalid | TC-CS-045 (NEG-02), TC-CS-046 (NEG-03), TC-CS-050 (EDGE-01) |
| AC-5 | Screening must apply only to cross-border Sales Orders | TC-CS-041 (HP-01), TC-CS-042 (AP-01), TC-CS-055 (INT-03) |
| AC-6 | Screening must apply only to controlled pharmaceutical products | TC-CS-041 (HP-01), TC-CS-043 (AP-02), TC-CS-052 (EDGE-03), TC-CS-056 (INT-04) |
| AC-7 | Compliance check results must be visible to Export Compliance Officer | TC-CS-041 (HP-01) |
| AC-8 | System must display clear error message with failure reason if screening fails | TC-CS-044 (NEG-01), TC-CS-045 (NEG-02), TC-CS-046 (NEG-03), TC-CS-047 (ERR-01), TC-CS-048 (ERR-02), TC-CS-049 (ERR-03) |

## Test Case Summary by Type

### Happy Path (1 TC)
- **TC-CS-041**: Create Cross-Border Sales Order with Valid Compliance Screening and Controlled Product (CRITICAL, PARTIAL automation)

### Alternative Path (2 TCs)
- **TC-CS-042**: Create Domestic Sales Order to Verify Screening is Bypassed (MEDIUM, YES automation)
- **TC-CS-043**: Create Cross-Border Sales Order with Non-Controlled Product to Verify Reduced Screening (MEDIUM, YES automation)

### Negative (3 TCs)
- **TC-CS-044**: Attempt to Create Cross-Border Sales Order with Customer on Denied-Party List (CRITICAL, PARTIAL automation)
- **TC-CS-045**: Attempt to Create Cross-Border Sales Order with No Valid Export License (CRITICAL, PARTIAL automation)
- **TC-CS-046**: Attempt to Create Cross-Border Sales Order with Expired Export License (CRITICAL, PARTIAL automation)

### Error / Missing Field (3 TCs)
- **TC-CS-047**: Attempt to Submit Sales Order with Customer Field Empty (HIGH, YES automation)
- **TC-CS-048**: Attempt to Submit Sales Order with Material Field Empty (HIGH, YES automation)
- **TC-CS-049**: Attempt to Submit Sales Order with Destination Country Missing (HIGH, YES automation)

### Edge Case / Boundary (3 TCs)
- **TC-CS-050**: Create Sales Order with Export License Expiring During Processing (HIGH, NO automation — temporal boundary)
- **TC-CS-051**: Create Sales Order with Customer Added to Denied-Party List During Processing (HIGH, NO automation — temporal boundary)
- **TC-CS-052**: Create Sales Order with Minimum Order Quantity for Controlled Product (MEDIUM, PARTIAL automation)

### Integration (4 TCs)
- **TC-CS-053**: Attempt to Create Sales Order When Denied-Party Screening API Unavailable (HIGH, NO automation)
- **TC-CS-054**: Attempt to Create Sales Order When Export License System Unavailable (HIGH, NO automation)
- **TC-CS-055**: Attempt to Create Sales Order with Customer Master Missing Destination Country (HIGH, NO automation)
- **TC-CS-056**: Attempt to Create Sales Order with Material Master Missing Export Control Classification (HIGH, NO automation)

## Automation Candidate Summary

| Automation Status | Count | Test Case IDs |
|------------------|-------|---------------|
| YES | 6 | TC-CS-042, TC-CS-043, TC-CS-047, TC-CS-048, TC-CS-049, (TC-CS-052 partial) |
| PARTIAL | 4 | TC-CS-041, TC-CS-044, TC-CS-045, TC-CS-046 |
| NO | 6 | TC-CS-050, TC-CS-051, TC-CS-053, TC-CS-054, TC-CS-055, TC-CS-056 |
| **Total Automatable** | **10** | **(YES + PARTIAL = 62.5% coverage)** |

**Automation Notes:**
- YES/PARTIAL scenarios (10 TCs) can be automated if test data prerequisites (denied-party list, export licenses) are configured in test environment
- EDGE temporal scenarios (2 TCs) and INT external dependency scenarios (4 TCs) require manual execution
- Recommended automation priority: ERR (3 TCs) → AP (2 TCs) → HP (1 TC) → NEG (3 TCs if test data available)

---

**Generated:** 2026-08-24
**Generated By:** testcase-agent/skills/generate-testcases
**Prompt Version:** ai-engine/prompts/testcase-generation-from-userstory.md
