# Test Coverage Matrix: CS-20

**User Story:** [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Generated:** 2026-08-24
**Total Test Cases:** 18

---

## Acceptance Criteria Traceability

| AC ID | Acceptance Criterion | Covered By Test Cases | Coverage |
|-------|---------------------|----------------------|----------|
| AC-1 | The user can access the "Create Purchase Requisition" Fiori app. | TC-CS-174, TC-CS-175, TC-CS-181, TC-CS-182, TC-CS-183, TC-CS-184, TC-CS-186, TC-CS-187, TC-CS-188 | 100% |
| AC-2 | The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type. | TC-CS-174, TC-CS-175, TC-CS-178, TC-CS-185, TC-CS-187 | 100% |
| AC-3 | The requisition cannot be converted into a Purchase Order until all required approval steps are completed. | TC-CS-174, TC-CS-175, TC-CS-179 | 100% |
| AC-4 | Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision. | TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-180, TC-CS-189 | 100% |
| AC-5 | The system displays the current approval status and history on the requisition. | TC-CS-174, TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-180 | 100% |
| AC-6 | The requisitioner receives a notification when the requisition is fully approved or rejected. | TC-CS-174, TC-CS-175, TC-CS-176, TC-CS-180, TC-CS-190, TC-CS-191 | 100% |

**Overall AC Coverage:** 6/6 (100%)

---

## Test Case Summary by Scenario Type

| Scenario Type | TC IDs | Count | Priority Breakdown |
|--------------|--------|-------|-------------------|
| Happy Path (HP) | TC-CS-174, TC-CS-175 | 2 | CRITICAL: 2 |
| Alternative Path (AP) | TC-CS-176, TC-CS-177 | 2 | HIGH: 2 |
| Negative (NEG) | TC-CS-178, TC-CS-179, TC-CS-180 | 3 | CRITICAL: 1, HIGH: 2 |
| Error / Missing Field (ERR) | TC-CS-181, TC-CS-182, TC-CS-183, TC-CS-184 | 4 | HIGH: 4 |
| Edge Case / Boundary (EDGE) | TC-CS-185, TC-CS-186, TC-CS-187, TC-CS-188 | 4 | MEDIUM: 4 |
| Integration (INT) | TC-CS-189, TC-CS-190, TC-CS-191 | 3 | HIGH: 1, MEDIUM: 2 |
| **TOTAL** | TC-CS-174 to TC-CS-191 | **18** | **CRITICAL: 3, HIGH: 9, MEDIUM: 6** |

---

## Risk Coverage Matrix

| Risk Area | Risk Level | Test Cases | Status |
|-----------|-----------|------------|--------|
| PR document creation | CRITICAL | TC-CS-174, TC-CS-175 | ✓ Covered |
| Release strategy determination | CRITICAL | TC-CS-174, TC-CS-175, TC-CS-185 | ✓ Covered |
| Approval workflow routing | CRITICAL | TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-189 | ✓ Covered |
| PO conversion blocking | CRITICAL | TC-CS-179 | ✓ Covered |
| Approver notifications | HIGH | TC-CS-189 | ✓ Covered |
| Requisitioner notifications | MEDIUM | TC-CS-190, TC-CS-191 | ✓ Covered |
| Approval status display | MEDIUM | TC-CS-174, TC-CS-175, TC-CS-176, TC-CS-177, TC-CS-180 | ✓ Covered |
| Material validation | HIGH | TC-CS-178, TC-CS-181 | ✓ Covered |
| Mandatory field validation | HIGH | TC-CS-181, TC-CS-182, TC-CS-183, TC-CS-184 | ✓ Covered |
| Approval threshold boundaries | MEDIUM | TC-CS-185 | ✓ Covered |
| Input range boundaries | MEDIUM | TC-CS-186, TC-CS-187, TC-CS-188 | ✓ Covered |
| Approval rejection handling | HIGH | TC-CS-180, TC-CS-191 | ✓ Covered |
| Send-back for revision | HIGH | TC-CS-176 | ✓ Covered |

**Overall Risk Coverage:** 13/13 risk areas covered (100%)

---

## Automation Coverage

| Category | TC IDs | Count | Percentage |
|----------|--------|-------|------------|
| Automation Candidate: YES | TC-CS-174, TC-CS-175, TC-CS-178, TC-CS-179, TC-CS-180, TC-CS-181, TC-CS-182, TC-CS-183, TC-CS-184, TC-CS-186, TC-CS-187, TC-CS-188, TC-CS-189 | 13 | 72% |
| Automation Candidate: NO | TC-CS-176, TC-CS-177, TC-CS-185, TC-CS-190, TC-CS-191 | 5 | 28% |
| **TOTAL** | TC-CS-174 to TC-CS-191 | **18** | **100%** |

**Automation Eligibility Gate:** ✓ PASS (≥ 9 TCs required; 13 TCs flagged)

---

## Quality Gates Status

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 6/6 (100%) | ✓ PASS |
| HP Coverage | All 2 HP scenarios generated | 2/2 (100%) | ✓ PASS |
| AP Coverage | All 2 AP scenarios generated | 2/2 (100%) | ✓ PASS |
| NEG Coverage | All 3 NEG scenarios generated | 3/3 (100%) | ✓ PASS |
| ERR Coverage | All 4 ERR scenarios generated | 4/4 (100%) | ✓ PASS |
| EDGE Coverage | All 4 EDGE TCs generated | 4/4 (100%) | ✓ PASS |
| INT Coverage | All 3 INT scenarios generated | 3/3 (100%) | ✓ PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values | ✓ PASS |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES | 13 TCs | ✓ PASS |

**Overall Quality Gate Status:** ✓ ALL GATES PASSED (9/9)

---

## Test Execution Order (Risk-Based)

### Priority 1 — CRITICAL (execute first)
1. TC-CS-174: HP-01 — Create PR with single-level or no approval
2. TC-CS-175: HP-02 — Create PR with multi-level approval (high-value GMP-critical material)
3. TC-CS-179: NEG-02 — Attempt to convert PR to PO before all approvals completed

### Priority 2 — HIGH (validate immediately after)
4. TC-CS-178: NEG-01 — Invalid material type (material does not exist in plant)
5. TC-CS-180: NEG-03 — Approver rejects PR
6. TC-CS-181: ERR-01 — Missing Material field
7. TC-CS-182: ERR-02 — Missing Quantity field
8. TC-CS-183: ERR-03 — Missing Plant field
9. TC-CS-184: ERR-04 — Missing Delivery Date field
10. TC-CS-176: AP-01 — Approver sends PR back for revision
11. TC-CS-177: AP-02 — Multi-step approval chain (partial release)
12. TC-CS-189: INT-01 — Fiori My Inbox task creation and delivery

### Priority 3 — MEDIUM (complete coverage)
13. TC-CS-185: EDGE-01 — PR total value at approval threshold boundary
14. TC-CS-186: EDGE-02 — Minimum quantity boundary (quantity = 1)
15. TC-CS-187: EDGE-03 — Zero price per unit (price = 0)
16. TC-CS-188: EDGE-04 — Delivery date = today + 1 day (minimum lead time)

### Priority 4 — Integration (run after core stability confirmed)
17. TC-CS-190: INT-02 — Notification delivery to requisitioner (approval complete)
18. TC-CS-191: INT-03 — Notification delivery to requisitioner (rejection)

---

## Test Data Dependencies

All test cases reference parameterized test data from:
```
testdata/CS-20/CS-20-testdata.json
```

Dataset IDs:
- `TD-CS-20-HP-001`: HP-01 (TC-CS-174)
- `TD-CS-20-HP-002`: HP-02 (TC-CS-175)
- `TD-CS-20-AP-001`: AP-01 (TC-CS-176)
- `TD-CS-20-AP-002`: AP-02 (TC-CS-177)
- `TD-CS-20-NEG-001`: NEG-01 (TC-CS-178)
- `TD-CS-20-NEG-002`: NEG-02 (TC-CS-179)
- `TD-CS-20-NEG-003`: NEG-03 (TC-CS-180)
- `TD-CS-20-ERR-001`: ERR-01 (TC-CS-181)
- `TD-CS-20-ERR-002`: ERR-02 (TC-CS-182)
- `TD-CS-20-ERR-003`: ERR-03 (TC-CS-183)
- `TD-CS-20-ERR-004`: ERR-04 (TC-CS-184)
- `TD-CS-20-EDGE-001`: EDGE-01 (TC-CS-185)
- `TD-CS-20-EDGE-002`: EDGE-02 (TC-CS-186)
- `TD-CS-20-EDGE-003`: EDGE-03 (TC-CS-187)
- `TD-CS-20-EDGE-004`: EDGE-04 (TC-CS-188)
- `TD-CS-20-INT-001`: INT-01 (TC-CS-189)
- `TD-CS-20-INT-002`: INT-02 (TC-CS-190)
- `TD-CS-20-INT-003`: INT-03 (TC-CS-191)

---

## Notes

- All test cases use parameterized test data with `{TD.*}` placeholders
- All test cases reference environment variables with `{ENV.*}` placeholders
- No hardcoded SAP system values are present in any test case
- Test cases cover all 6 acceptance criteria with 100% traceability
- All mandatory quality gates have been met for this CRITICAL-risk story
