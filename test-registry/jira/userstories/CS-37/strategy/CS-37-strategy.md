# Test Strategy: [CS-37] Process Return Order for customer complaint about defective pharmaceutical

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-37/strategy/CS-37-analysis.md
**Risk Profile:**     jira/userstories/CS-37/strategy/CS-37-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Customer Service Representative
- **Business Object:** Return Order, Return Delivery, Quality Notification
- **SAP Module:** SD — Sales & Distribution (with QM — Quality Management integration)
- **Business Goal:** Enable investigation of defective batch and provide customer with credit or replacement

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 7 | 7 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 7 | 7 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 2 | 2 | CRITICAL |
| **TOTAL** | — | **22** | **22** | — |

**Rationale for CRITICAL risk story:**
- All scenario types are MANDATORY due to pharmaceutical regulatory compliance requirements
- Batch traceability and quality inspection are patient safety-critical
- Cross-module integration with QM is mandatory for regulatory compliance
- Zero tolerance for validation failures in pharmaceutical return processing

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (1 scenario):**
- HP-01: Create Return Order with valid SO/Delivery reference, reason code, batch/lot/expiration, verify Return Delivery created, batch moved to Quality Inspection stock, Quality Notification generated and linked
  - Risk: CRITICAL
  - ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

**Negative (7 scenarios):**
- NEG-01: Create Return Order with non-existent Sales Order reference — Risk: HIGH — AC-1
- NEG-02: Create Return Order with non-existent Delivery reference — Risk: HIGH — AC-1
- NEG-03: Create Return Order with invalid return reason code — Risk: HIGH — AC-2
- NEG-04: Create Return Order with invalid batch number (not from original delivery) — Risk: CRITICAL — AC-3
- NEG-05: Create Return Order with expired batch (expiration date in past) — Risk: CRITICAL — AC-3
- NEG-06: Create Return Order with mismatched lot number (not associated with batch) — Risk: HIGH — AC-3
- NEG-07: Return Order with quantity exceeding original delivery quantity — Risk: MEDIUM

**Error / Missing Field (7 scenarios):**
- ERR-01: Missing Sales Order reference — Risk: HIGH — AC-1
- ERR-02: Missing Delivery reference — Risk: HIGH — AC-1
- ERR-03: Missing Return Reason Code — Risk: HIGH — AC-2
- ERR-04: Missing Batch Number — Risk: CRITICAL — AC-3
- ERR-05: Missing Lot Number — Risk: CRITICAL — AC-3
- ERR-06: Missing Expiration Date — Risk: CRITICAL — AC-3
- ERR-07: Missing Returned Quantity — Risk: HIGH

**Edge Case / Boundary (4 scenarios):**
- EDGE-01: Return quantity = 1 (minimum boundary) — Risk: MEDIUM
- EDGE-02: Return quantity = original delivery quantity (maximum boundary) — Risk: MEDIUM
- EDGE-03: Return quantity = 0 (zero boundary - invalid) — Risk: MEDIUM
- EDGE-04: Batch expiration date = today (boundary date) — Risk: MEDIUM — AC-3

**Integration (2 scenarios):**
- INT-01: Verify Quality Notification created and linked to Return Order — Risk: CRITICAL — AC-6
- INT-02: Verify returned batch moved to Quality Inspection stock type (not unrestricted stock) — Risk: CRITICAL — AC-5

### Recommended Scenarios

**Alternative Path (1 scenario):**
- AP-01: Create Return Order with different return reason codes ("Defective Product", "Quality Complaint", "Packaging Damage")
  - Risk: HIGH
  - ACs: AC-2
  - Note: Data-driven approach — one TC with 3 reason code variants

### Optional Scenarios

None — All identified scenarios are MANDATORY or RECOMMENDED due to pharmaceutical regulatory compliance requirements.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | 1 HP scenario generated | YES |
| NEG Coverage | All 7 NEG scenarios generated | YES |
| ERR Coverage | All 7 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| INT Coverage | All 2 INT scenarios generated | YES |
| AP Coverage | 1 AP scenario generated | YES |
| Parameterization | 0 hardcoded values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | YES |
| Batch Traceability | Every TC involving batch/lot must verify all 3 parameters (batch, lot, expiration) | YES |
| Quality Integration | HP and both INT scenarios must verify Quality Notification creation and stock placement | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of recommended gates must PASS (pharmaceutical compliance requires maximum coverage).

**CRITICAL risk story additional requirements:**
- Negative coverage (entity validation): 100% — one NEG per named entity that can be invalid ✓ (7 NEG scenarios cover all validation points)
- Error coverage (mandatory fields): 100% — one ERR per mandatory field in ACs ✓ (7 ERR scenarios cover all mandatory fields)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | End-to-end pharmaceutical return with quality integration; regulatory requirement; patient safety impact |
| NEG (invalid entity) | HIGH | MAJOR | Prevents fraudulent returns; ensures batch traceability; regulatory compliance |
| ERR (missing field) | HIGH | MAJOR | Data integrity failure; regulatory audit trail incomplete; blocks complaint processing |
| EDGE (boundary) | MEDIUM | MINOR | Business rule enforcement; prevents over-return and invalid quantities |
| AP (alternative) | HIGH | MAJOR | Return reason code drives downstream credit/replacement workflow; regulatory reporting |
| INT (integration) | CRITICAL | CRITICAL | Quality Notification creation is regulatory requirement; Quality Inspection stock placement prevents defective product re-entry |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; end-to-end flow stable and repeatable |
| AP | YES | Data-driven via testdata JSON with 3 return reason code variants |
| NEG | YES | Stable validation checks; error messages are machine-verifiable |
| ERR | YES | Field-level validation stable; mandatory field errors are consistent |
| EDGE | PARTIAL | Boundary values may require specific batch master data in SAP; minimum/maximum quantities depend on original delivery |
| INT | PARTIAL | Quality Notification verification requires QM module navigation; stock type verification requires MM inventory query |

**Target automation coverage:** 18 of 22 TCs (82%)

**Automation challenges:**
- INT scenarios require multi-app navigation (Return Order → Quality Notification → Stock Overview)
- EDGE scenarios require pre-configured batch master data with specific expiration dates
- All scenarios require pre-existing Sales Order and Delivery with goods issue posted

**Automation recommendations:**
- Create dedicated test data setup script for Sales Order + Delivery + Batch master data
- Implement helper functions for Quality Notification lookup and verification
- Implement helper functions for stock type verification via MM transaction
- Use SAP standard return reason codes (ZDEF, ZQUA, ZPKG) configured in test system

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  HP-01 (TC-CS-038)
  INT-01 (TC-CS-054)
  INT-02 (TC-CS-055)

Priority 2 — HIGH (validate immediately after):
  NEG-01 (TC-CS-040)
  NEG-02 (TC-CS-041)
  NEG-03 (TC-CS-042)
  NEG-04 (TC-CS-043)
  NEG-05 (TC-CS-044)
  NEG-06 (TC-CS-045)
  ERR-01 (TC-CS-047)
  ERR-02 (TC-CS-048)
  ERR-03 (TC-CS-049)
  ERR-04 (TC-CS-050)
  ERR-05 (TC-CS-051)
  ERR-06 (TC-CS-052)
  ERR-07 (TC-CS-053)
  AP-01 (TC-CS-039)

Priority 3 — MEDIUM (complete coverage):
  NEG-07 (TC-CS-046)
  EDGE-01 (TC-CS-056)
  EDGE-02 (TC-CS-057)
  EDGE-03 (TC-CS-058)
  EDGE-04 (TC-CS-059)
```

**Execution dependencies:**
- All test cases require pre-existing Sales Order and Delivery in SAP test system
- HP-01 must pass before executing INT scenarios (validates end-to-end flow)
- NEG and ERR scenarios can run in parallel (independent validation checks)
- EDGE scenarios should run after HP-01 to confirm baseline quantity validation works

---

## Regulatory and Compliance Notes

**Pharmaceutical Industry Compliance:**
- Return Orders for pharmaceutical products are subject to FDA 21 CFR Part 11 electronic records requirements
- Batch traceability is mandatory under pharmaceutical Good Distribution Practice (GDP) regulations
- Quality Notifications must be created for all defective product complaints (regulatory requirement)
- Returned pharmaceutical batches MUST be quarantined in Quality Inspection stock — unauthorized release to unrestricted stock is a critical patient safety violation
- Test cases must verify that:
  - Batch, lot, and expiration date are captured and non-editable after posting
  - Quality Notification is automatically created and linked (not optional)
  - Stock placement in Quality Inspection stock is enforced (not configurable)
  - Return reason code is mandatory and traceable for regulatory reporting

**SAP MM/QM Integration Requirements:**
- Test execution requires QM module configuration in SAP test system
- Quality Notification type must be configured and linked to return process
- Quality Inspection stock type must be configured for the plant/storage location
- Test data must use batch-managed materials with active batch master records

**Test Data Governance:**
- Do not use real production batch numbers, lot numbers, or customer data
- All test execution must use dedicated SAP test system (not production)
- Test batches must have realistic expiration dates (not past dates unless testing NEG-05)
- Return reason codes must be configured in SAP customizing (ZDEF, ZQUA, ZPKG recommended)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-37-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE, INT)
3. Generate RECOMMENDED type (AP) — pharmaceutical compliance requires maximum coverage
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-37/` and `testdata/CS-37/`
8. **Critical pharmaceutical-specific requirements:**
   - Every TC must verify batch/lot/expiration capture (not just HP-01)
   - HP-01 must verify all 6 success confirmations (Return Order, Return Delivery, Quality Notification, stock placement, batch traceability, linkage)
   - NEG scenarios must specify exact SAP error messages expected
   - INT scenarios must include verification steps for Quality Notification and stock type (not just assertions)
9. **Test data placeholders:**
   - Use `{TD.originalSalesOrder}` for Sales Order reference
   - Use `{TD.originalDelivery}` for Delivery reference
   - Use `{TD.batchNumber}`, `{TD.lotNumber}`, `{TD.expirationDate}` for batch data
   - Use `{TD.returnReasonCode}` for return reason
   - Use `{TD.returnedQuantity}` for quantity values
10. **Quality Notification verification:**
    - INT-01 must navigate to Quality Notification and verify it exists
    - HP-01 must verify Quality Notification number is displayed and linked to Return Order
11. **Stock type verification:**
    - INT-02 must navigate to stock overview and verify batch is in Quality Inspection stock (not unrestricted)
    - HP-01 must verify stock type field shows "Quality Inspection" after Return Delivery posting
