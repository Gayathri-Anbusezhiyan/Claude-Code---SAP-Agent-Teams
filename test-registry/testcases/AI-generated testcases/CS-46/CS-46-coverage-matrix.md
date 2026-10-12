# Test Coverage Matrix: [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 5         | PASS   |
| Alternative   | 0 or more     | 3         | PASS   |
| Negative      | 8             | 8         | PASS   |
| Error         | 8             | 8         | PASS   |
| Edge Case     | ≥ 2           | 13        | PASS   |
| Integration   | 0 or more     | 0         | N/A    |
| **TOTAL**     | —             | **37**    | **PASS** |

---

## Acceptance Criteria Coverage

| AC ID | Acceptance Criterion | Test Case IDs | Coverage Status |
|-------|---------------------|---------------|-----------------|
| AC-1 | The user can create a Scheduling Agreement specifying the customer (hospital), material (pharmaceutical product), total quantity, validity period, and delivery schedule. | TC-CS-125, TC-CS-126, TC-CS-130, TC-CS-131, TC-CS-132, TC-CS-133, TC-CS-134, TC-CS-135, TC-CS-138, TC-CS-139, TC-CS-140, TC-CS-141, TC-CS-142, TC-CS-146, TC-CS-147, TC-CS-148, TC-CS-157, TC-CS-158 | ✅ COVERED |
| AC-2 | The system allows the user to define delivery schedules as fixed dates (e.g., first Monday of each month) or intervals (e.g., every 14 days). | TC-CS-125, TC-CS-126, TC-CS-143, TC-CS-144, TC-CS-145, TC-CS-149, TC-CS-150, TC-CS-151, TC-CS-152, TC-CS-159, TC-CS-160 | ✅ COVERED |
| AC-3 | The system automatically creates delivery schedule lines for each scheduled delivery date within the validity period. | TC-CS-125, TC-CS-126, TC-CS-152, TC-CS-157, TC-CS-159, TC-CS-160 | ✅ COVERED |
| AC-4 | The system allows the hospital to call off deliveries against the Scheduling Agreement by confirming the delivery schedule lines. | TC-CS-127, TC-CS-136, TC-CS-137, TC-CS-153, TC-CS-154, TC-CS-161 | ✅ COVERED |
| AC-5 | The system tracks the cumulative quantity called off and remaining quantity under the Scheduling Agreement. | TC-CS-127, TC-CS-136, TC-CS-153, TC-CS-154, TC-CS-161 | ✅ COVERED |
| AC-6 | The system sends a notification to the Sales team when the Scheduling Agreement is nearing its validity end date or when the remaining quantity falls below a threshold. | TC-CS-128, TC-CS-129, TC-CS-155, TC-CS-156 | ✅ COVERED |

**AC Traceability:** ✅ PASS — All 6 acceptance criteria are covered by at least one test case

---

## Scenario Type Breakdown

### Happy Path (5 test cases)
| TC ID | Title | Priority | Automation |
|-------|-------|----------|------------|
| TC-CS-125 | Create Scheduling Agreement with valid customer, material, total quantity, validity period, and fixed-date delivery schedule | CRITICAL | YES |
| TC-CS-126 | Create Scheduling Agreement with interval-based delivery schedule | CRITICAL | YES |
| TC-CS-127 | Call off delivery against a Scheduling Agreement by confirming a schedule line | HIGH | YES |
| TC-CS-128 | Notification triggered when remaining quantity falls below threshold | MEDIUM | YES |
| TC-CS-129 | Notification triggered when Scheduling Agreement nears validity end date | MEDIUM | YES |

### Negative (8 test cases)
| TC ID | Title | Priority | Automation |
|-------|-------|----------|------------|
| TC-CS-130 | Attempt to create Scheduling Agreement with non-existent customer ID | HIGH | YES |
| TC-CS-131 | Attempt to create Scheduling Agreement with non-existent material ID | HIGH | YES |
| TC-CS-132 | Attempt to create Scheduling Agreement with material not enabled for scheduling agreements | HIGH | YES |
| TC-CS-133 | Attempt to create Scheduling Agreement with customer not assigned to sales organization | HIGH | YES |
| TC-CS-134 | Attempt to create Scheduling Agreement with validity end date before start date | HIGH | YES |
| TC-CS-135 | Attempt to create Scheduling Agreement with validity start date in the past | HIGH | YES |
| TC-CS-136 | Attempt to call off quantity exceeding remaining quantity | HIGH | YES |
| TC-CS-137 | Attempt to confirm non-existent schedule line | HIGH | YES |

### Error / Missing Field (8 test cases)
| TC ID | Title | Priority | Automation |
|-------|-------|----------|------------|
| TC-CS-138 | Missing Customer ID field | HIGH | YES |
| TC-CS-139 | Missing Material ID field | HIGH | YES |
| TC-CS-140 | Missing Total Quantity field | HIGH | YES |
| TC-CS-141 | Missing Validity Start Date field | HIGH | YES |
| TC-CS-142 | Missing Validity End Date field | HIGH | YES |
| TC-CS-143 | Missing Delivery Schedule Type selection | HIGH | YES |
| TC-CS-144 | Missing Fixed Dates when Fixed Dates schedule type selected | HIGH | YES |
| TC-CS-145 | Missing Interval when Interval schedule type selected | HIGH | YES |

### Edge Case / Boundary (13 test cases)
| TC ID | Title | Priority | Automation |
|-------|-------|----------|------------|
| TC-CS-146 | Create Scheduling Agreement with minimum valid total quantity (1 unit) | MEDIUM | YES |
| TC-CS-147 | Create Scheduling Agreement with zero total quantity (invalid) | MEDIUM | YES |
| TC-CS-148 | Create Scheduling Agreement with maximum allowed total quantity | MEDIUM | PARTIAL |
| TC-CS-149 | Create Scheduling Agreement with minimum interval (1 day) | MEDIUM | YES |
| TC-CS-150 | Create Scheduling Agreement with maximum reasonable interval (365 days) | MEDIUM | PARTIAL |
| TC-CS-151 | Create Scheduling Agreement with zero interval (invalid) | MEDIUM | YES |
| TC-CS-152 | Create Scheduling Agreement with single fixed delivery date | MEDIUM | YES |
| TC-CS-153 | Call off exact remaining quantity (boundary condition) | MEDIUM | YES |
| TC-CS-154 | Call off when cumulative quantity equals total quantity (no remaining) | MEDIUM | PARTIAL |
| TC-CS-155 | Notification threshold at 0% (no notification) | LOW | PARTIAL |
| TC-CS-156 | Notification threshold at 100% (immediate notification) | LOW | PARTIAL |
| TC-CS-157 | Validity period of 1 day (minimum) | MEDIUM | YES |
| TC-CS-158 | Validity start date = today (earliest possible) | LOW | YES |

### Alternative Path (3 test cases)
| TC ID | Title | Priority | Automation |
|-------|-------|----------|------------|
| TC-CS-159 | Create Scheduling Agreement with fixed dates (specific calendar dates) | HIGH | YES |
| TC-CS-160 | Create Scheduling Agreement with interval (days between deliveries) | HIGH | YES |
| TC-CS-161 | Multiple call-offs against the same Scheduling Agreement (cumulative tracking) | HIGH | YES |

---

## Quality Gates Summary

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% | 100% (6/6 ACs covered) | ✅ PASS |
| HP Coverage | All 5 HP scenarios | 5 generated | ✅ PASS |
| NEG Coverage | All 8 NEG scenarios | 8 generated | ✅ PASS |
| ERR Coverage | All 8 ERR scenarios | 8 generated | ✅ PASS |
| EDGE Coverage | All 13 EDGE scenarios | 13 generated | ✅ PASS |
| AP Coverage | All 3 AP scenarios | 3 generated | ✅ PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded | ✅ PASS |
| Automation Eligibility | ≥ 50% flagged as automation candidates | 86% (32/37) | ✅ PASS |

**Overall Status:** ✅ **ALL GATES PASSED**

---

## Automation Viability Summary

| Automation Status | Count | Percentage |
|------------------|-------|------------|
| YES              | 32    | 86%        |
| PARTIAL          | 5     | 14%        |
| NO               | 0     | 0%         |
| **TOTAL**        | **37** | **100%**   |

**Target automation coverage achieved:** 32 automation-ready test cases (86% of total)

---

## Risk Coverage Summary

| Risk Level | Test Case Count | Coverage |
|-----------|----------------|----------|
| CRITICAL  | 2              | Core transaction creation scenarios (fixed dates + intervals) |
| HIGH      | 19             | Call-off, all NEG, all ERR scenarios |
| MEDIUM    | 14             | Notifications, all EDGE scenarios |
| LOW       | 2              | Edge notification thresholds (0% and 100%) |

---

## Test Execution Priority

### Priority 1 — CRITICAL (2 test cases)
Execute first in every regression cycle:
- TC-CS-125 (HP-01: Create SA with fixed dates)
- TC-CS-126 (HP-02: Create SA with intervals)

### Priority 2 — HIGH (19 test cases)
Execute immediately after Priority 1:
- TC-CS-127 (HP-03: Call off delivery)
- TC-CS-130 to TC-CS-137 (All NEG scenarios)
- TC-CS-138 to TC-CS-145 (All ERR scenarios)
- TC-CS-159 to TC-CS-161 (All AP scenarios)

### Priority 3 — MEDIUM (14 test cases)
Execute for complete coverage:
- TC-CS-128, TC-CS-129 (HP-04, HP-05: Notifications)
- TC-CS-146 to TC-CS-158 (All EDGE scenarios)

### Priority 4 — LOW (2 test cases)
Execute for comprehensive edge coverage:
- TC-CS-155 (EDGE-10: Notification 0%)
- TC-CS-156 (EDGE-11: Notification 100%)

---

## Notes

- All test cases follow the standard 6-step SAP Fiori login sequence
- All test data is fully parameterized using {TD.*} placeholders
- No hardcoded SAP values exist in any test case
- All test cases end with sign-out sequence for clean session management
- Navigation is performed via search bar (not tile-based navigation)
- All NEG and ERR test cases include specific error message verification
- Integration scenarios: N/A (no linked issues identified for CS-46)
