# Test Coverage Matrix: [CS-19] Place A Specific Batch Of Raw Material On Quality Hold

**Generated:** 2026-08-24
**User Story:** [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Module:** MM — Materials Management (Inventory Management)

---

## Coverage Completeness

| Scenario Type | Inventory Count | Generated | Status |
|---------------|----------------|-----------|--------|
| Happy Path    | 3 | 3 | PASS |
| Alternative   | 1 | 1 | PASS |
| Negative      | 4 | 4 | PASS |
| Error         | 8 | 8 | PASS |
| Edge Case     | 3 | 3 | PASS |
| Integration   | 1 | 1 | PASS |
| **TOTAL**     | **20** | **20** | **PASS** |

---

## Test Case Inventory

### Happy Path (HP) — 3 test cases

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-053 | Place Batch on Quality Hold with Blocked Stock Status | CRITICAL | YES | TD-CS-19-001 |
| TC-CS-054 | Place Batch on Quality Hold with Quality Inspection Stock Status | CRITICAL | YES | TD-CS-19-002 |
| TC-CS-055 | QA User Releases Batch Quality Hold and Restores to Unrestricted-Use Stock | HIGH | YES | TD-CS-19-003 |

### Alternative Path (AP) — 1 test case

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-056 | Place Batch on Quality Hold via Batch Where-Used List App | MEDIUM | YES | TD-CS-19-004 |

### Negative (NEG) — 4 test cases

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-057 | Attempt Goods Issue Transaction Against Blocked Batch | CRITICAL | PARTIAL | TD-CS-19-005 |
| TC-CS-058 | Attempt Production Order Consumption Against Blocked Batch | CRITICAL | PARTIAL | TD-CS-19-006 |
| TC-CS-059 | Unauthorized User Attempts to Release Batch Hold | HIGH | PARTIAL | TD-CS-19-007 |
| TC-CS-060 | Attempt to Block Batch with Zero Stock Quantity | HIGH | YES | TD-CS-19-008 |

### Error (ERR) — 8 test cases

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-061 | Attempt to Block Batch with Missing Material Number | HIGH | YES | TD-CS-19-009 |
| TC-CS-062 | Attempt to Block Batch with Missing Batch Number | HIGH | YES | TD-CS-19-010 |
| TC-CS-063 | Attempt to Block Batch with Missing Plant | HIGH | YES | TD-CS-19-011 |
| TC-CS-064 | Attempt to Block Batch with Missing Storage Location | HIGH | YES | TD-CS-19-012 |
| TC-CS-065 | Attempt to Block Batch with Missing Reason Code | HIGH | YES | TD-CS-19-013 |
| TC-CS-066 | Attempt to Block Batch with Non-existent Material Number | HIGH | YES | TD-CS-19-014 |
| TC-CS-067 | Attempt to Block Batch with Non-existent Batch Number | HIGH | YES | TD-CS-19-015 |
| TC-CS-068 | Attempt to Block Batch for Material Not Batch-Managed | MEDIUM | YES | TD-CS-19-016 |

### Edge Case (EDGE) — 3 test cases

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-069 | Block Batch with Minimum Valid Stock Quantity | MEDIUM | PARTIAL | TD-CS-19-017 |
| TC-CS-070 | Block Batch with Maximum Stock Quantity | MEDIUM | PARTIAL | TD-CS-19-018 |
| TC-CS-071 | Release Hold on Batch That Was Never Blocked | MEDIUM | YES | TD-CS-19-019 |

### Integration (INT) — 1 test case

| TC ID | Title | Priority | Automation | Dataset |
|-------|-------|----------|-----------|---------|
| TC-CS-072 | Block Batch Used in Active Process Order and Verify Notification to Production Planning | HIGH | NO | TD-CS-19-020 |

---

## Acceptance Criteria Coverage

| AC ID | Acceptance Criterion | Test Cases | Coverage |
|-------|---------------------|-----------|----------|
| AC-1 | The user can access the "Manage Stock" or "Batch Where-Used List" Fiori app | TC-CS-053, TC-CS-054, TC-CS-056 | PASS |
| AC-2 | The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection" | TC-CS-053, TC-CS-054, TC-CS-056, TC-CS-060, TC-CS-061, TC-CS-062, TC-CS-063, TC-CS-064, TC-CS-066, TC-CS-067, TC-CS-068, TC-CS-069, TC-CS-070 | PASS |
| AC-3 | Once blocked, the system prevents any goods issue transaction against that batch, including production order consumption | TC-CS-053, TC-CS-054, TC-CS-057, TC-CS-058 | PASS |
| AC-4 | The system logs the reason code and the user who initiated the hold, along with a timestamp | TC-CS-053, TC-CS-054, TC-CS-065 | PASS |
| AC-5 | The system allows an authorized QA user to release the hold once the investigation is closed, restoring the batch to Unrestricted-Use stock | TC-CS-055, TC-CS-059, TC-CS-071 | PASS |
| AC-6 | A notification is sent to Production Planning when a batch used in an active process order is placed on hold | TC-CS-072 | PASS |

**Overall AC Coverage:** 6/6 (100%)

---

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | 6/6 ACs covered (100%) | PASS |
| HP Coverage | All 3 HP scenarios generated | 3/3 HP scenarios (100%) | PASS |
| NEG Coverage | All 4 NEG scenarios generated | 4/4 NEG scenarios (100%) | PASS |
| ERR Coverage | All 8 ERR scenarios generated | 8/8 ERR scenarios (100%) | PASS |
| EDGE Coverage | All 3 EDGE TCs generated | 3/3 EDGE scenarios (100%) | PASS |
| INT Coverage | 1 INT TC generated | 1/1 INT scenario (100%) | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values found | PASS |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES | 11/20 TCs flagged YES (55%) | PASS |

**Overall Quality Gate Status:** ALL GATES PASSED

---

## Priority Distribution

| Priority | Count | Percentage |
|----------|-------|-----------|
| CRITICAL | 4 | 20% |
| HIGH | 11 | 55% |
| MEDIUM | 5 | 25% |
| LOW | 0 | 0% |
| **Total** | **20** | **100%** |

---

## Automation Viability Analysis

| Automation Status | Count | Percentage | Test Cases |
|------------------|-------|-----------|-----------|
| YES (Fully Automatable) | 11 | 55% | TC-CS-053, TC-CS-054, TC-CS-055, TC-CS-056, TC-CS-060, TC-CS-061, TC-CS-062, TC-CS-063, TC-CS-064, TC-CS-065, TC-CS-066, TC-CS-067, TC-CS-068, TC-CS-071 |
| PARTIAL (Requires Setup) | 5 | 25% | TC-CS-057, TC-CS-058, TC-CS-059, TC-CS-069, TC-CS-070 |
| NO (Manual Only) | 1 | 5% | TC-CS-072 |
| **Total** | **20** | **100%** | — |

**Target Automation Coverage:** 14/20 TCs (70%) — fully or partially automatable

---

## Test Execution Order (Risk-Based)

### Priority 1 — CRITICAL (Execute First)
- TC-CS-053: Block batch (Blocked Stock status)
- TC-CS-054: Block batch (Quality Inspection status)
- TC-CS-057: Attempt goods issue against blocked batch
- TC-CS-058: Attempt production order consumption against blocked batch

### Priority 2 — HIGH (Execute Second)
- TC-CS-055: QA user releases batch hold
- TC-CS-059: Unauthorized user attempts release
- TC-CS-060: Block batch with zero stock
- TC-CS-061 to TC-CS-067: Missing/invalid mandatory fields (7 TCs)
- TC-CS-072: Notification to Production Planning

### Priority 3 — MEDIUM (Complete Coverage)
- TC-CS-056: Alternative navigation via Batch Where-Used List
- TC-CS-068: Material not batch-managed
- TC-CS-069: Minimum stock quantity
- TC-CS-070: Maximum stock quantity
- TC-CS-071: Release hold on never-blocked batch

---

## Test Data Requirements

**Total Datasets Required:** 20 (TD-CS-19-001 through TD-CS-19-020)

**Test Data File:** `test-registry/testdata/CS-19/CS-19-testdata.json`

**Key Parameters:**
- Material Number (batch-managed)
- Batch Numbers (5+ unique batches for different scenarios)
- Plant, Storage Location
- Stock Types (Blocked Stock, Quality Inspection, Unrestricted-Use)
- Reason Codes (block, release)
- Invalid values (non-existent material, non-existent batch, non-batch-managed material)
- Boundary values (min: 0.001, max: 999999999.999, zero: 0)
- Process Order Number (for INT scenario)

---

## Recommendations

1. **Automation Priority:** Automate the 11 fully automatable test cases (YES) first for regression testing
2. **Manual Setup:** For PARTIAL test cases (TC-CS-057, TC-CS-058, TC-CS-059, TC-CS-069, TC-CS-070), prepare SAP master data setup scripts or use scriptless MCP execution
3. **Integration Testing:** TC-CS-072 (INT) requires manual PP module configuration and cross-module verification; execute in dedicated integration test phase
4. **Test Data Refresh:** Before each test run, ensure batch stock statuses are reset to Unrestricted-Use (except for TC-CS-055, TC-CS-059, TC-CS-071 which require pre-blocked batches)
5. **Authorization Testing:** TC-CS-059 requires two user roles (Plant Manager and unauthorized user); prepare test credentials for both roles
6. **Audit Trail Verification:** All HP and NEG test cases must verify the audit log entry (user, timestamp, old status, new status, reason code) for regulatory compliance

---

## Notes

- All test cases follow the exact template from `ai-engine/prompts/testcase-generation-from-userstory.md`
- Zero hardcoded values — all data uses `{TD.*}` or `{ENV.*}` placeholders
- Standard login sequence (Steps 1-6) and sign-out sequence (last 3 steps) applied to all test cases
- Navigation via search bar (NOT tiles) as per SAP Fiori best practices documented in project memory
- Press Enter steps after every lookup field (Material, Batch, Plant) as per resolved SAP tenant behavior
