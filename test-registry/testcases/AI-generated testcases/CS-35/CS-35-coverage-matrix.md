# Test Coverage Matrix: [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 1         | PASS   |
| Alternative   | 0             | 0         | N/A    |
| Negative      | 2             | 2         | PASS   |
| Error         | 3             | 3         | PASS   |
| Edge Case     | 2             | 2         | PASS   |
| Integration   | 0             | 0         | N/A    |
| **TOTAL**     | **8**         | **8**     | **PASS** |

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — all 6 ACs covered | All 6 ACs covered by 8 TCs | PASS |
| HP Coverage | All 1 HP scenarios generated | 1 HP generated (TC-CS-021) | PASS |
| NEG Coverage | All 2 NEG scenarios generated | 2 NEG generated (TC-CS-022, TC-CS-023) | PASS |
| ERR Coverage | All 3 ERR scenarios generated | 3 ERR generated (TC-CS-024, TC-CS-025, TC-CS-026) | PASS |
| EDGE Coverage | All 2 EDGE scenarios generated | 2 EDGE generated (TC-CS-027, TC-CS-028) | PASS |
| Parameterization | 0 hardcoded values | 0 hardcoded values found | PASS |
| Automation Eligibility | ≥ 6 TCs flagged YES | 7 TCs flagged YES, 1 PARTIAL | PASS |
| NEG Coverage (entity validation) | 100% — 2 NEG scenarios | Material storage condition (TC-CS-022) + Carrier qualification (TC-CS-023) | PASS |
| ERR Coverage (mandatory fields) | 100% — 3 ERR scenarios | Cold-chain carrier (TC-CS-024) + Temp logger ref (TC-CS-025) + Monitoring device ref (TC-CS-026) | PASS |

**Overall Result:** ALL GATES PASSED (100% compliance achieved for CRITICAL risk story)

## Acceptance Criteria Traceability

| AC ID | AC Text | Test Cases Covering AC | Coverage Status |
|-------|---------|------------------------|-----------------|
| AC-1 | The user can access the "Create Outbound Deliveries" Fiori app | TC-CS-021 (steps 7-8) | COVERED |
| AC-2 | The system automatically proposes the shipping condition based on the material's storage condition classification | TC-CS-021 (step 13), TC-CS-022 (steps 12-13, 17) | COVERED |
| AC-3 | The system requires selection of a qualified cold-chain carrier for materials flagged as temperature-sensitive | TC-CS-021 (steps 17-18), TC-CS-023 (steps 16-20), TC-CS-024 (steps 16-20) | COVERED |
| AC-4 | The delivery document displays required packaging instructions based on the shipping condition | TC-CS-021 (step 19), TC-CS-027 (step 19), TC-CS-028 (step 18) | COVERED |
| AC-5 | The system captures temperature logger/data recorder reference numbers against the delivery | TC-CS-021 (steps 20-21), TC-CS-025 (steps 18-22), TC-CS-027 (steps 20-21), TC-CS-028 (steps 19-21, 27) | COVERED |
| AC-6 | The delivery cannot be goods-issued if a required temperature monitoring device reference is missing | TC-CS-026 (steps 20-27) | COVERED |

**AC Traceability:** 100% — All 6 acceptance criteria are covered by at least one test case

## Test Case Summary

| TC ID | Title | Scenario Type | Priority | Automation |
|-------|-------|--------------|----------|------------|
| TC-CS-021 | Create Outbound Delivery with Cold-Chain Shipping Condition and Temperature Monitoring | HAPPY_PATH | CRITICAL | YES |
| TC-CS-022 | Attempt to Create Outbound Delivery for Material Without Storage Condition Classification | NEGATIVE | HIGH | YES |
| TC-CS-023 | Attempt to Select Non-Qualified Carrier for Cold-Chain Material | NEGATIVE | HIGH | PARTIAL |
| TC-CS-024 | Attempt to Save Outbound Delivery Without Selecting Cold-Chain Carrier | ERROR | HIGH | YES |
| TC-CS-025 | Attempt to Save Outbound Delivery Without Temperature Logger Reference | ERROR | HIGH | YES |
| TC-CS-026 | Attempt to Post Goods Issue Without Temperature Monitoring Device Reference | ERROR | HIGH | YES |
| TC-CS-027 | Create Outbound Delivery with Minimum Quantity Boundary for Cold-Chain Material | EDGE_CASE | MEDIUM | YES |
| TC-CS-028 | Create Outbound Delivery with Maximum Length Temperature Logger Reference | EDGE_CASE | MEDIUM | YES |

## Priority Distribution

- **CRITICAL:** 1 test case (HP core transaction)
- **HIGH:** 5 test cases (NEG + ERR scenarios — regulatory compliance validations)
- **MEDIUM:** 2 test cases (EDGE boundary tests)
- **LOW:** 0 test cases

## Automation Coverage

- **YES:** 7 test cases (87.5%)
- **PARTIAL:** 1 test case (12.5%) — TC-CS-023 requires non-qualified carrier setup
- **NO:** 0 test cases
- **Target Met:** YES (≥ 75% automation coverage achieved)

## Risk Coverage

All test cases address **CRITICAL risk story** requirements:
- Cold-chain shipping condition auto-proposal validation (AC-2)
- Carrier qualification enforcement (AC-3)
- Temperature logger and monitoring device reference capture (AC-5, AC-6)
- Regulatory compliance hard stops (AC-6 goods issue block)

## Notes

- All 8 mandatory scenarios generated per test strategy document
- No RECOMMENDED or OPTIONAL scenarios — all coverage is MANDATORY for CRITICAL risk story
- All test data fully parameterized using `{TD.*}` placeholders
- All test cases follow standard login/logout sequences
- All test cases use search bar navigation (not tile-based)
- Press Enter steps included after all lookup fields
- AC-6 (goods issue block) tested separately in TC-CS-026 with full delivery creation + goods issue attempt workflow
