# Test Strategy: [CS-3] View and Modify an Existing Purchase Order

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-3/strategy/CS-3-analysis.md
**Risk Profile:**     jira/userstories/CS-3/strategy/CS-3-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Officer or Buyer
- **Business Object:** Purchase Order (SAP MM document)
- **SAP Module:** MM — Materials Management
- **Business Goal:** Single unified workflow for auditing (read-only) and changing (edit) existing Purchase Orders without creating a new PO; critical for procurement responsiveness and order accuracy

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | — |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **9** | **9** | — |

**AP rationale:** No alternative valid paths are defined in the ACs — the story describes a single workflow with two modes (display/edit). AP is not applicable.
**INT rationale:** No linked issues in CS-3 — integration scenarios are not applicable.
**EDGE is MANDATORY (not just RECOMMENDED):** Story is CRITICAL risk, and the quantity boundary parameter (AC-6/AC-7) represents a change to a legal procurement document — boundary failures must be explicitly tested.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

| ID | Description | Type | Risk | ACs Covered |
|----|-------------|------|------|-------------|
| HP-01 | Open an existing PO in Display mode and verify all header/item details are visible and read-only | HP | CRITICAL | AC-1, AC-2, AC-3, AC-4 |
| HP-02 | Switch an open PO from Display to Edit mode, modify order quantity, save, and verify success message | HP | CRITICAL | AC-1, AC-2, AC-5, AC-6, AC-7, AC-8 |
| NEG-01 | Enter an invalid (non-existent) PO number — verify clear error message is displayed | NEG | HIGH | AC-2, AC-9 |
| NEG-02 | Attempt to interact with an editable field while PO is in Display mode — verify field remains read-only | NEG | HIGH | AC-4 |
| NEG-03 | Attempt to switch to Edit mode without edit authorization — verify access is denied | NEG | HIGH | AC-5 |
| ERR-01 | Attempt to modify a goods-receipted (locked) item field in Edit mode — verify field is locked with explanation | ERR | HIGH | AC-10 |
| EDGE-01 | Modify quantity to minimum valid value (1) — verify save succeeds | EDGE | MEDIUM | AC-6, AC-7 |
| EDGE-02 | Attempt to set quantity to zero — verify system rejection | EDGE | MEDIUM | AC-6 |
| EDGE-03 | Enter a PO number in invalid format (non-numeric or too short) — verify error message | EDGE | MEDIUM | AC-2, AC-9 |

### Recommended Scenarios

None — all 9 identified scenarios are MANDATORY for this CRITICAL risk story.

### Optional Scenarios

None.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 10 AC items covered by ≥ 1 TC | YES |
| HP Coverage | Both HP scenarios (HP-01, HP-02) generated | YES |
| NEG Coverage | All 3 NEG scenarios (NEG-01, NEG-02, NEG-03) generated | YES |
| ERR Coverage | 1 ERR scenario (ERR-01) generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated (quantity min, quantity zero, invalid PO format) | YES |
| Parameterization | 0 hardcoded SAP values — all data via `{TD.*}` or `{ENV.*}` placeholders | YES |
| Automation Eligibility | ≥ 6 of 9 TCs flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All 7 mandatory gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (Display mode view) | CRITICAL | CRITICAL | Core audit workflow — must never fail in regression |
| HP (Edit mode save) | CRITICAL | CRITICAL | Legal document change — data integrity is paramount |
| NEG (invalid PO) | HIGH | MAJOR | Poor error handling blocks users and degrades experience |
| NEG (display-mode edit attempt) | HIGH | MAJOR | Read-only enforcement is a compliance and data integrity requirement |
| NEG (unauthorized edit attempt) | HIGH | MAJOR | Authorization gate — security and access control |
| ERR (locked field) | HIGH | MAJOR | SAP processing-status business rule — failure causes data inconsistency |
| EDGE (min quantity) | MEDIUM | MINOR | Boundary correctness — important but recoverable if caught in testing |
| EDGE (zero quantity) | MEDIUM | MINOR | Boundary rejection — SAP should enforce; verify explicitly |
| EDGE (invalid PO format) | MEDIUM | MINOR | Input validation at field level — important for UX |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Stable, regression-critical — primary Playwright targets |
| AP | N/A | Not applicable for this story |
| NEG | YES | Validation checks are stable and machine-verifiable (error message text) |
| ERR | PARTIAL | ERR-01 requires a PO with a goods-receipted line — specific SAP data state needed |
| EDGE | YES | Quantity boundaries are deterministic and machine-verifiable |
| INT | N/A | Not applicable for this story |

**Target automation coverage:** 8 of 9 TCs (89%) — ERR-01 is PARTIAL due to SAP data pre-condition (goods-receipted PO line must exist in test system)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-012 (HP-01): Display mode — view PO details
  TC-CS-013 (HP-02): Edit mode — modify quantity and save

Priority 2 — HIGH (validate immediately after):
  TC-CS-014 (NEG-01): Invalid PO number
  TC-CS-015 (NEG-02): Attempt field edit in Display mode
  TC-CS-016 (NEG-03): Unauthorized Edit mode attempt
  TC-CS-017 (ERR-01): Locked goods-receipted field

Priority 3 — MEDIUM (complete coverage):
  TC-CS-018 (EDGE-01): Minimum valid quantity
  TC-CS-019 (EDGE-02): Zero quantity rejection
  TC-CS-020 (EDGE-03): Invalid PO number format

Priority 4 — Integration:
  None
```

---

## Regulatory and Compliance Notes

- Purchase Orders are legally binding procurement documents — field-level changes must be fully auditable in SAP
- The read-only enforcement tested in NEG-02 is a compliance requirement: display-mode users must not be able to alter PO data
- Authorization testing (NEG-03) verifies that SAP role-based access control is correctly configured
- Ensure test data uses dedicated test system PO numbers (not production)
- All test execution must run against a dedicated SAP S/4HANA Cloud test tenant

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-3-risk-profile.json` for the structured scenario inventory (9 scenarios across HP/NEG/ERR/EDGE)
2. Generate TCs in execution order: HP → NEG → ERR → EDGE
3. AP and INT are NOT APPLICABLE — do not generate
4. Apply all 7 quality gates before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. TC ID format: `TC-CS-{NNN}` — start from TC-CS-012 (CS-2 used TC-CS-001 through TC-CS-011)
7. TC-to-Scenario mapping:
   - TC-CS-012 = HP-01, TC-CS-013 = HP-02
   - TC-CS-014 = NEG-01, TC-CS-015 = NEG-02, TC-CS-016 = NEG-03
   - TC-CS-017 = ERR-01
   - TC-CS-018 = EDGE-01, TC-CS-019 = EDGE-02, TC-CS-020 = EDGE-03
8. Flag automation candidates per the Automation Viability table above (ERR-01 = PARTIAL)
9. Output files to `testcases/AI-generated testcases/CS-3/` and `testdata/CS-3/`
10. The pre-existing PO number for test data should reference an actual PO in the test system (e.g. `4500065467` from CS-2 testing — requires re-validation for new tenant my426318)
