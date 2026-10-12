# Test Strategy: [CS-63] User Story PP-014

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-63/strategy/CS-63-analysis.md
**Risk Profile:**     jira/userstories/CS-63/strategy/CS-63-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Planner
- **Business Object:** Reservation (component reservation against Planned Order / Process Order)
- **SAP Module:** PP — Production Planning and Control
- **Business Goal:** Ensure required raw materials are earmarked and protected from allocation to other production runs (pharmaceutical batch production context)

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 5 | 5 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **23** | **23** | — |

**Rationale for full MANDATORY coverage:**
- Story risk is CRITICAL (pharmaceutical production with material allocation logic)
- 3 of 6 ACs are CRITICAL risk (automatic reservation creation, stock exclusion, backflush release)
- Complex integration dependencies with MM (Inventory Management) and SD (Sales & Distribution)
- Business impact: production delays, material shortages, compliance violations
- All scenario types directly trace to explicit acceptance criteria

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Access Stock/Requirements List app and view existing reservations | LOW | AC-1 |
| HP-02 | Convert Planned Order to Process Order and verify automatic component reservation creation | CRITICAL | AC-2, AC-3 |
| HP-03 | Confirm reserved quantities are excluded from available stock in other processes | CRITICAL | AC-3 |
| HP-04 | Execute backflush consumption and verify automatic reservation release | CRITICAL | AC-6 |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Manually adjust reservation quantity before process order release | HIGH | AC-5 |
| AP-02 | Manually adjust reservation date before process order release | HIGH | AC-5 |
| AP-03 | Cancel process order and verify automatic reservation release | CRITICAL | AC-6 |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Attempt to reserve component quantity exceeding current available stock and verify shortage warning | HIGH | AC-4 |
| NEG-02 | Attempt to convert planned order with no BOM and verify error handling | HIGH | AC-2 |
| NEG-03 | Attempt to access Stock/Requirements List app without authorization | MEDIUM | AC-1 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk | ACs Covered | Field |
|----|-------------|------|-------------|-------|
| ERR-01 | Missing Planned Order Number | HIGH | AC-2 | Planned Order |
| ERR-02 | Missing Material Number | HIGH | AC-2 | Material |
| ERR-03 | Missing Plant | HIGH | AC-2 | Plant |
| ERR-04 | Missing Requirement Date | HIGH | AC-2 | Requirement Date |
| ERR-05 | Missing Reservation Quantity (when manual adjustment attempted) | HIGH | AC-5 | Reservation Quantity |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| ID | Description | Risk | ACs Covered | Parameter | Boundary |
|----|-------------|------|-------------|-----------|----------|
| EDGE-01 | Reservation quantity at minimum boundary (0.001 or smallest UoM unit) | MEDIUM | AC-5 | quantity | lower |
| EDGE-02 | Reservation quantity equal to planned quantity (maximum valid boundary) | MEDIUM | AC-5 | quantity | upper |
| EDGE-03 | Requirement date set to current date (earliest valid date) | MEDIUM | AC-5 | date | lower |
| EDGE-04 | Requirement date set to end of planning horizon (furthest valid date) | MEDIUM | AC-5 | date | upper |
| EDGE-05 | Available stock exactly zero when reservation attempted (boundary for shortage warning) | HIGH | AC-4 | availableStock | zero |

### Mandatory Scenarios — Integration (INT)

| ID | Description | Risk | ACs Covered | Integration Module |
|----|-------------|------|-------------|--------------------|
| INT-01 | Verify reservation prevents concurrent allocation to sales order (PP→SD integration) | HIGH | AC-3 | Sales Order ATP check (SD) |
| INT-02 | Verify backflush goods issue releases reservation (PP→MM integration) | CRITICAL | AC-6 | Goods Movement posting (MM) |
| INT-03 | Verify shortage warning reflects real-time stock updates from warehouse (MM→PP integration) | HIGH | AC-4 | Stock update event (MM) |

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 5 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs (≥50% of total) flagged as Automation Candidate: YES | YES |

**CRITICAL risk story additional gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (entity validation) | 100% — all 3 NEG scenarios (shortage warning, missing BOM, authorization) | YES |
| Error coverage (mandatory fields) | 100% — all 5 mandatory fields tested (Planned Order, Material, Plant, Requirement Date, Reservation Quantity) | YES |

**Overall pass threshold:** All mandatory gates must PASS. Zero tolerance for deviations in CRITICAL risk stories.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Automatic reservation creation and release are core production planning transactions; failure blocks pharmaceutical batch execution |
| AP (manual adjustments) | HIGH | MAJOR | Manual quantity/date adjustments prevent material shortages; cancellation release prevents inventory lock-up |
| NEG (invalid entity) | HIGH | MAJOR | Shortage warnings prevent production stops; missing BOM/authorization errors block order processing |
| ERR (missing field) | HIGH | MAJOR | Mandatory field validation ensures data integrity for material requirements planning |
| EDGE (boundary) | MEDIUM | MINOR | Boundary conditions (min/max quantity, date ranges) rarely occur but must be validated for pharmaceutical compliance |
| INT (integration) | HIGH | MAJOR | Cross-module integration failures cause cascading issues (double allocation in SD, incorrect ATP, stock sync delays) |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable transaction flows with machine-verifiable outcomes (reservation number, status) |
| AP | YES | Data-driven via testdata JSON; manual adjustments use standard SAP input fields |
| NEG | YES | Stable validation checks; shortage warning and error messages are predictable |
| ERR | YES | Field-level validation stable; SAP returns consistent error messages for missing mandatory fields |
| EDGE | PARTIAL | Boundary values (min UoM, max quantity, date range limits) may require SAP configuration verification; however field input is automatable |
| INT | PARTIAL | Multi-session orchestration needed (concurrent sales order, goods movement posting); requires careful timing and state verification across modules |

**Target automation coverage:** 18 of 23 TCs (78%)
- Full automation: HP (4) + AP (3) + NEG (3) + ERR (5) = 15 TCs
- Partial automation: EDGE (5) + INT (3) = 8 TCs → 3 automatable = 3 TCs
- **Total YES:** 18 TCs

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-HP-01: Access Stock/Requirements List app
  TC-CS-HP-02: Convert Planned Order to Process Order with automatic reservation
  TC-CS-HP-03: Verify stock exclusion logic for reserved quantities
  TC-CS-HP-04: Execute backflush consumption and verify reservation release
  TC-CS-AP-03: Cancel process order and verify automatic reservation release

Priority 2 — HIGH (validate immediately after):
  TC-CS-NEG-01: Shortage warning for quantity exceeding available stock
  TC-CS-NEG-02: Error handling for planned order with no BOM
  TC-CS-ERR-01: Missing Planned Order Number
  TC-CS-ERR-02: Missing Material Number
  TC-CS-ERR-03: Missing Plant
  TC-CS-ERR-04: Missing Requirement Date
  TC-CS-ERR-05: Missing Reservation Quantity
  TC-CS-AP-01: Manually adjust reservation quantity
  TC-CS-AP-02: Manually adjust reservation date

Priority 3 — MEDIUM (complete coverage):
  TC-CS-EDGE-01: Reservation quantity at minimum boundary
  TC-CS-EDGE-02: Reservation quantity at maximum boundary
  TC-CS-EDGE-03: Requirement date at current date (earliest valid)
  TC-CS-EDGE-04: Requirement date at planning horizon end (furthest valid)
  TC-CS-EDGE-05: Available stock exactly zero
  TC-CS-NEG-03: Authorization failure for Stock/Requirements List app

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-INT-01: Verify reservation prevents sales order allocation (PP→SD)
  TC-CS-INT-02: Verify backflush goods issue releases reservation (PP→MM)
  TC-CS-INT-03: Verify real-time stock update in shortage warning (MM→PP)
```

---

## Regulatory and Compliance Notes

**SAP PP (Production Planning) for Pharmaceutical Manufacturing:**
- Component reservations are critical for GMP (Good Manufacturing Practice) compliance — material traceability must be maintained
- Shortage warnings directly impact batch execution timelines — false negatives can cause production delays and regulatory filing issues
- Backflush consumption and reservation release must be auditable — test cases must verify that reservation status changes are logged in SAP change documents
- Test data must not use production material or order numbers — use dedicated test plant and materials with "TEST" or "DEMO" prefixes
- All test execution must use dedicated test system instances (not production or validated QA systems)

**Data Integrity:**
- Reservation documents are legally binding for material allocation — test cases must verify that reserved quantities accurately reflect BOM requirements
- ATP (Available-to-Promise) calculations must exclude reserved quantities — integration test cases must confirm cross-module data consistency

**Segregation of Duties (SOD):**
- Production planner role must be authorized to view Stock/Requirements List but may not be authorized to execute goods movements
- Test case NEG-03 (authorization failure) validates SOD enforcement

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-63-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR, EDGE, INT) — no scenario type may be skipped
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 23 TCs generated (4 HP + 3 AP + 3 NEG + 5 ERR + 5 EDGE + 3 INT)
   - Zero hardcoded values (all data uses `{TD.*}` or `{ENV.*}` placeholders)
   - ≥12 TCs flagged as Automation Candidate: YES
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above
6. Output files to:
   - `testcases/AI-generated testcases/CS-63/` — individual TC markdown files
   - `testdata/CS-63/` — parameterized test datasets JSON + guide
7. For integration test cases (INT-01, INT-02, INT-03), include explicit verification steps for cross-module data consistency
8. For pharmaceutical compliance, include audit trail verification in test steps where applicable (reservation status changes, backflush confirmations)
