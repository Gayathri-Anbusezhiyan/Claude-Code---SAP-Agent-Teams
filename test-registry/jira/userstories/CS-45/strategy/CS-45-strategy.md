# Test Strategy: [CS-45] Capture Serialization/Track-and-Trace data at outbound delivery

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-45/strategy/CS-45-analysis.md
**Risk Profile:**     jira/userstories/CS-45/strategy/CS-45-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Warehouse Supervisor
- **Business Object:** Outbound Delivery (with serialization data)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Comply with pharmaceutical serialization regulations (e.g., DSCSA, EU FMD) and track each unit through the supply chain

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | MEDIUM |
| Integration (INT) | MANDATORY | 4 | 4 | CRITICAL |
| **TOTAL** | — | **20** | **20** | — |

**Rationale for CRITICAL risk story:**
- All scenario types are MANDATORY due to regulatory compliance requirements
- Failure in any category = regulatory violation, fines, supply chain disruption
- Integration scenarios are CRITICAL — external Track-and-Trace system dependency
- EDGE scenarios include CRITICAL boundaries (expired goods, GTIN format validation)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios:**
- **HP-01:** Pick, pack, and scan serialization data for a serialized pharmaceutical delivery (single unit)
  - Risk: CRITICAL
  - ACs covered: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  - Priority: CRITICAL

- **HP-02:** Pick, pack, and scan serialization data for multiple units in one delivery (multi-line)
  - Risk: CRITICAL
  - ACs covered: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  - Priority: CRITICAL

**Negative (NEG) — 4 scenarios:**
- **NEG-01:** Serial number does not exist in system
  - Risk: CRITICAL
  - ACs covered: AC-3, AC-6
  - Priority: HIGH

- **NEG-02:** Serial number already shipped/used
  - Risk: CRITICAL
  - ACs covered: AC-3, AC-6
  - Priority: HIGH

- **NEG-03:** Serial number does not match batch number in delivery
  - Risk: CRITICAL
  - ACs covered: AC-3, AC-6
  - Priority: HIGH

- **NEG-04:** GTIN validation failure (incorrect or missing GTIN)
  - Risk: HIGH
  - ACs covered: AC-4, AC-6
  - Priority: HIGH

**Error / Missing Field (ERR) — 4 scenarios:**
- **ERR-01:** Missing Serial Number field
  - Risk: CRITICAL
  - ACs covered: AC-2, AC-6
  - Priority: HIGH
  - Field: Serial Number

- **ERR-02:** Missing Batch Number field
  - Risk: CRITICAL
  - ACs covered: AC-4, AC-6
  - Priority: HIGH
  - Field: Batch Number

- **ERR-03:** Missing Expiration Date field
  - Risk: CRITICAL
  - ACs covered: AC-4, AC-6
  - Priority: HIGH
  - Field: Expiration Date

- **ERR-04:** Incomplete serialization data at goods issue attempt
  - Risk: CRITICAL
  - ACs covered: AC-6
  - Priority: HIGH
  - Field: Serialization Data (any field)

**Edge Case / Boundary (EDGE) — 5 scenarios:**
- **EDGE-01:** Minimum serial number length (1 character)
  - Risk: MEDIUM
  - ACs covered: AC-2, AC-3
  - Priority: MEDIUM
  - Boundary: lower

- **EDGE-02:** Maximum serial number length (18 characters)
  - Risk: MEDIUM
  - ACs covered: AC-2, AC-3
  - Priority: MEDIUM
  - Boundary: upper

- **EDGE-03:** Expiration date = today (boundary: same-day expiry)
  - Risk: HIGH
  - ACs covered: AC-4
  - Priority: MEDIUM
  - Boundary: lower

- **EDGE-04:** Expiration date in the past (expired goods)
  - Risk: CRITICAL
  - ACs covered: AC-4, AC-6
  - Priority: HIGH
  - Boundary: invalid (must be blocked)

- **EDGE-05:** GTIN format validation (non-numeric or wrong length)
  - Risk: HIGH
  - ACs covered: AC-4, AC-6
  - Priority: HIGH
  - Boundary: format

**Integration (INT) — 4 scenarios:**
- **INT-01:** EPCIS event upload success to Track-and-Trace repository
  - Risk: CRITICAL
  - ACs covered: AC-5
  - Priority: CRITICAL

- **INT-02:** EPCIS event upload failure (timeout/network error)
  - Risk: CRITICAL
  - ACs covered: AC-5, AC-6
  - Priority: CRITICAL

- **INT-03:** EPCIS event upload failure (authentication error)
  - Risk: CRITICAL
  - ACs covered: AC-5, AC-6
  - Priority: CRITICAL

- **INT-04:** EPCIS event format validation failure (rejected by regulatory system)
  - Risk: CRITICAL
  - ACs covered: AC-5, AC-6
  - Priority: CRITICAL

### Recommended Scenarios

**Alternative Path (AP) — 1 scenario:**
- **AP-01:** Manual entry of serial number (instead of scanning)
  - Risk: HIGH
  - ACs covered: AC-2, AC-3
  - Priority: HIGH
  - Rationale: Fallback workflow when scanner is unavailable

### Optional Scenarios

None — all scenario types are MANDATORY or RECOMMENDED due to the CRITICAL risk level of this story.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC (AC-1 through AC-6) covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE TCs generated (includes CRITICAL expiry validation) | YES |
| INT Coverage | All 4 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all test data in `{TD.*}` placeholders | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES (50% threshold) | YES |

**Overall pass threshold:** All mandatory gates must PASS.

**Additional gates for CRITICAL risk stories:**

| Additional Gate | Threshold |
|----------------|-----------|
| Negative coverage (entity validation) | 100% — 4 named entity validations (serial existence, serial status, batch-serial match, GTIN validity) | YES |
| Error coverage (mandatory fields) | 100% — 4 mandatory field tests (serial, batch, expiry, GTIN) | YES |
| Integration failure coverage | 100% — all 3 external system failure modes tested (timeout, auth, format rejection) | YES |

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Regulatory compliance — successful serialization capture is legally required |
| NEG (invalid entity) | HIGH | MAJOR | Data integrity — invalid serial/batch = product recall risk |
| ERR (missing field) | HIGH | MAJOR | Regulatory compliance — incomplete data = cannot ship |
| EDGE (boundary) | MEDIUM to HIGH | MAJOR | Expired goods (EDGE-04) = CRITICAL; serial length/GTIN format = HIGH |
| AP (alternative) | HIGH | MAJOR | Fallback workflow must be reliable (manual entry when scanner fails) |
| INT (integration) | CRITICAL | CRITICAL | External system dependency — upload failure = regulatory non-compliance |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | PARTIAL | Requires mock/stub for Track-and-Trace repository API in test environment |
| AP | YES | Manual entry flow is stable and repeatable |
| NEG | YES | Validation checks are stable and repeatable (master data dependency) |
| ERR | YES | Field-level validation is stable |
| EDGE | YES | Boundary values can be parameterized via test data JSON |
| INT | NO | External API integration requires live Track-and-Trace system OR advanced mocking/stubbing infrastructure |

**Target automation coverage:** 14 of 20 TCs (70%)
- HP (2): PARTIAL — automate with stubbed API responses
- AP (1): YES
- NEG (4): YES
- ERR (4): YES
- EDGE (5): YES
- INT (4): NO — requires live integration OR advanced test harness

**Automation notes:**
- Integration scenarios (INT-01 through INT-04) require either:
  - Live connection to regulatory system test instance (preferred), OR
  - SAP middleware stubbing/mocking infrastructure (complex)
- If neither is available, mark INT scenarios as MANUAL execution only
- HP scenarios depend on INT-01 (successful upload) — stub the API response for HP automation

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-021 (HP-01): Single-unit serialization capture with successful upload
  TC-CS-022 (HP-02): Multi-unit serialization capture with successful upload
  TC-CS-026 (INT-01): EPCIS event upload success

Priority 2 — HIGH (validate immediately after):
  TC-CS-024 (NEG-01): Serial number does not exist
  TC-CS-025 (NEG-02): Serial number already shipped
  TC-CS-026 (NEG-03): Serial-batch mismatch
  TC-CS-027 (NEG-04): GTIN validation failure
  TC-CS-028 (ERR-01): Missing Serial Number
  TC-CS-029 (ERR-02): Missing Batch Number
  TC-CS-030 (ERR-03): Missing Expiration Date
  TC-CS-031 (ERR-04): Incomplete data at goods issue
  TC-CS-023 (AP-01): Manual serial number entry

Priority 3 — MEDIUM (complete coverage):
  TC-CS-032 (EDGE-01): Minimum serial number length
  TC-CS-033 (EDGE-02): Maximum serial number length
  TC-CS-034 (EDGE-03): Same-day expiration date
  TC-CS-036 (EDGE-05): GTIN format validation

Priority 4 — CRITICAL boundaries (run separately if needed):
  TC-CS-035 (EDGE-04): Expired goods blocking

Priority 5 — Integration failures (run after core stability confirmed):
  TC-CS-037 (INT-02): Upload timeout/network error
  TC-CS-038 (INT-03): Upload authentication failure
  TC-CS-039 (INT-04): Upload format validation failure
```

**Execution dependencies:**
- All NEG, ERR, EDGE scenarios depend on HP-01 test data being available (valid delivery with serialized material)
- INT failure scenarios (INT-02, INT-03, INT-04) can only be tested if SAP middleware allows simulated failures OR if test regulatory system supports negative testing

---

## Regulatory and Compliance Notes

**Pharmaceutical Serialization Context:**
- This feature implements DSCSA (Drug Supply Chain Security Act) and EU FMD (Falsified Medicines Directive) compliance requirements
- Serial numbers must be globally unique across the supply chain (GS1 SGTIN standard)
- EPCIS (Electronic Product Code Information Services) event format is the regulatory standard for Track-and-Trace data exchange
- Goods issue must be blocked if any serialization data is incomplete or invalid (zero-tolerance policy)

**Test Execution Requirements:**
- All test execution must use dedicated test system instances (not production)
- Test serial numbers must be flagged as "test/training" in the regulatory system to prevent contamination of production tracking data
- Test materials must be configured with serialization-relevant flag (MARA-SERNP) in SAP material master
- Batch master data must exist with valid expiration dates for all test scenarios
- GTIN values must be valid GS1-formatted identifiers (14-digit EAN/UPC)

**Data Privacy and Security:**
- Do not use real production serial numbers, batch numbers, or GTINs in test cases
- Test data JSON must use placeholder values (e.g., `{{SERIAL_NUMBER_VALID}}`, `{{BATCH_NUMBER_VALID}}`)
- Actual test data must be maintained in a secure test data management system with access controls

**Compliance Verification:**
- Verify that EPCIS event records generated during testing conform to GS1 CBV (Core Business Vocabulary) standard
- Verify that serial number status transitions are correctly recorded in SAP equipment master (EQUI table)
- Verify that goods issue documents reference the correct serialization event IDs

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-45-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE, INT)
3. Generate RECOMMENDED type (AP-01) next
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-45/` and `testdata/CS-45/`
8. For INT scenarios: include test data placeholders for mock API responses (success/failure/timeout)
9. For EDGE-04 (expired goods): ensure test data includes both a valid expiration date AND an expired date
10. For NEG scenarios: include test data for non-existent serial, already-shipped serial, mismatched batch
11. Ensure all 6 Acceptance Criteria are traced to at least one test case in the coverage matrix

**Test Case ID Range:** TC-CS-021 through TC-CS-040 (20 test cases)

**Critical Success Factors:**
- 100% AC traceability achieved
- All 20 planned TCs generated (no gaps in coverage)
- All test data parameterized (no hardcoded values)
- Integration scenarios include mock/stub strategy notes
- EDGE-04 (expired goods) correctly marked as blocking scenario
