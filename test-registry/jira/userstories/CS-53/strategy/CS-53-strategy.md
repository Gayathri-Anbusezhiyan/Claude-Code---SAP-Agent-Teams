# Test Strategy: [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-53/strategy/CS-53-analysis.md
**Risk Profile:**     jira/userstories/CS-53/strategy/CS-53-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** QA Reviewer
- **Business Object:** Electronic Batch Record (EBR) / Batch
- **SAP Module:** PP-QM — Production Planning and Control / Quality Management
- **Business Goal:** Ensure the batch is not released for distribution until all GMP documentation has been formally verified

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | OPTIONAL | 0 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 7 | 7 | HIGH |
| Edge Case / Boundary (EDGE) | RECOMMENDED | 2 | 2 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **19** | **20** | — |

**Rationale for Coverage Adjustments:**
- **HP (3):** All 3 HP scenarios are CRITICAL risk — core approval flow, approval with deviation, and archive retrieval are all regulatory requirements.
- **AP (0 min, 1 target):** Optional comments path is MEDIUM risk; not mandatory for CRITICAL stories but RECOMMENDED for comprehensive coverage.
- **NEG (4):** All 4 NEG scenarios are CRITICAL risk — missing control result, out-of-spec without deviation, unauthorized access, and premature stock transfer all represent GMP violations.
- **ERR (7):** All 7 ERR scenarios must be covered — 3 missing mandatory fields (process order, batch, signature password), 4 invalid inputs (wrong password, non-existent order/batch, wrong order status).
- **EDGE (2):** RECOMMENDED — zero deviations and max comment length test boundary conditions for regulatory data capture.
- **INT (3):** MANDATORY despite no linked Jira issues — inherent cross-module dependencies (PP-QM data compilation, MM-QM stock transfer, 21 CFR Part 11 compliance) are HIGH to CRITICAL risk.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 3 scenarios:**
- **HP-01:** Review and approve batch record with all in-spec results, no deviations — **CRITICAL** — ACs: AC-1, AC-2, AC-4, AC-5, AC-6
- **HP-02:** Review and approve batch record with out-of-spec result AND documented/approved deviation — **CRITICAL** — ACs: AC-2, AC-3, AC-4, AC-5, AC-6
- **HP-03:** Retrieve archived batch record for regulatory inspection — **CRITICAL** — ACs: AC-6

**Negative (NEG) — 4 scenarios:**
- **NEG-01:** Attempt to approve batch record with missing mandatory in-process control result — **CRITICAL** — ACs: AC-3
- **NEG-02:** Attempt to approve batch record with out-of-spec result and NO documented deviation — **CRITICAL** — ACs: AC-3
- **NEG-03:** Attempt to access "Review Batch Records" app without QA authorization — **CRITICAL** — ACs: AC-1
- **NEG-04:** Attempt to transfer batch to Unrestricted-Use stock before batch record approval — **CRITICAL** — ACs: AC-5

**Error / Missing Field (ERR) — 7 scenarios:**
- **ERR-01:** Missing Process Order Number — **HIGH** — ACs: AC-2 — Field: Process Order
- **ERR-02:** Missing Batch Number — **HIGH** — ACs: AC-2 — Field: Batch
- **ERR-03:** Missing Electronic Signature Password — **HIGH** — ACs: AC-4 — Field: Signature Password
- **ERR-04:** Invalid Electronic Signature Password — **HIGH** — ACs: AC-4 — Field: Signature Password
- **ERR-05:** Non-existent Process Order Number — **MEDIUM** — ACs: AC-2 — Field: Process Order
- **ERR-06:** Non-existent Batch Number — **MEDIUM** — ACs: AC-2 — Field: Batch
- **ERR-07:** Process Order not in TECO status (not technically complete) — **MEDIUM** — ACs: AC-2 — Field: Process Order

**Integration (INT) — 3 scenarios:**
- **INT-01:** Verify PP-QM integration: process order confirmations + inspection results compiled into batch record — **HIGH** — ACs: AC-2
- **INT-02:** Verify MM-QM integration: batch release decision enables Unrestricted-Use stock transfer — **HIGH** — ACs: AC-5
- **INT-03:** Verify 21 CFR Part 11 compliance: electronic signature includes timestamp, user ID, and audit trail — **CRITICAL** — ACs: AC-4

### Recommended Scenarios

**Alternative Path (AP) — 1 scenario:**
- **AP-01:** Review batch record, add comments, and approve — **MEDIUM** — ACs: AC-4

**Edge Case / Boundary (EDGE) — 2 scenarios:**
- **EDGE-01:** Batch record with zero deviations (all in-spec) — **LOW** — ACs: AC-3 — Boundary: deviation count = 0
- **EDGE-02:** Batch record with maximum allowed reviewer comments length — **LOW** — ACs: AC-4 — Boundary: reviewer comments = 255 characters

### Optional Scenarios

None.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 7 ERR scenarios generated | YES |
| EDGE Coverage | ≥ 2 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES (50% threshold for CRITICAL risk) | YES |
| 21 CFR Part 11 Compliance | All electronic signature TCs must explicitly verify timestamp, user ID, and audit trail | YES |
| GMP Regulatory Coverage | All deviation enforcement and in-process control validation scenarios must be covered | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 80% of recommended gates must PASS.

**Additional CRITICAL Risk Gates:**
- **Negative coverage (entity validation):** 100% — all 4 NEG scenarios represent regulatory compliance failures and must be generated.
- **Error coverage (mandatory fields):** 100% — all 7 ERR scenarios must be generated to ensure data integrity enforcement.
- **Integration coverage:** 100% — all 3 INT scenarios are inherent cross-module dependencies and must be covered despite no linked Jira issues.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core batch approval) | CRITICAL | CRITICAL | Regulatory compliance requirement; batch release without verification violates GMP/FDA 21 CFR Part 11 |
| HP (approval with deviation) | CRITICAL | CRITICAL | Ensures deviation enforcement is working correctly; unapproved deviations = GMP violation |
| HP (archive retrieval) | CRITICAL | CRITICAL | Inability to retrieve batch records during FDA inspection = compliance failure |
| NEG (missing control result) | HIGH | MAJOR | Out-of-spec product released to market = patient safety risk + recall |
| NEG (out-of-spec without deviation) | HIGH | MAJOR | Non-conforming product bypassing quality review = GMP violation |
| NEG (unauthorized access) | HIGH | MAJOR | Audit trail integrity failure; unauthorized signatures invalidate 21 CFR Part 11 compliance |
| NEG (premature stock transfer) | HIGH | MAJOR | Non-conforming product in supply chain before quality approval |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity failure; incomplete batch records cannot be approved |
| ERR (invalid input) | HIGH | MAJOR | System must reject invalid process orders, batches, and signature credentials |
| EDGE (boundary value) | MEDIUM | MINOR | Important for regulatory data capture limits but not core path |
| AP (comments) | MEDIUM | MINOR | Optional path; does not block batch release workflow |
| INT (cross-module) | HIGH | MAJOR | Integration failures can cascade; PP-QM and MM-QM data compilation is critical for batch record accuracy |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable SAP QM app workflow |
| AP | YES | Data-driven via testdata JSON; comments field is optional parameter |
| NEG | PARTIAL | Missing control result and out-of-spec scenarios require pre-configured SAP QM inspection lots; unauthorized access is stable and automatable |
| ERR | YES | Field-level validation is stable; missing and invalid inputs are repeatable |
| EDGE | PARTIAL | Zero deviations is automatable; max comment length requires text generation |
| INT | PARTIAL | PP-QM and MM-QM integration requires multi-session orchestration and SAP backend configuration; 21 CFR Part 11 audit trail verification requires database query access |

**Target automation coverage:** 14 of 20 TCs (70%)

**Automation Constraints:**
- **NEG-01 (missing control result):** Requires SAP QM configuration to create incomplete inspection lot — manual pre-condition setup.
- **NEG-02 (out-of-spec without deviation):** Requires SAP QM configuration to create out-of-spec result without linked quality notification — manual pre-condition setup.
- **INT-02 (MM-QM stock transfer):** Requires SAP MM transaction (MIGO or stock transfer app) to be executed in same test — multi-app orchestration.
- **INT-03 (21 CFR Part 11 audit trail):** Requires verification of audit log entries in SAP Change Documents (CDHDR/CDPOS tables) — may require database access or SAP Audit Log app navigation.

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-[HP-01]: Review and approve batch record with all in-spec results, no deviations
  TC-CS-[HP-02]: Review and approve batch record with out-of-spec result AND documented/approved deviation
  TC-CS-[HP-03]: Retrieve archived batch record for regulatory inspection
  TC-CS-[INT-03]: Verify 21 CFR Part 11 compliance (electronic signature timestamp, user ID, audit trail)

Priority 2 — HIGH (validate immediately after):
  TC-CS-[NEG-01]: Attempt to approve batch record with missing mandatory in-process control result
  TC-CS-[NEG-02]: Attempt to approve batch record with out-of-spec result and NO documented deviation
  TC-CS-[NEG-03]: Attempt to access "Review Batch Records" app without QA authorization
  TC-CS-[NEG-04]: Attempt to transfer batch to Unrestricted-Use stock before batch record approval
  TC-CS-[ERR-01]: Missing Process Order Number
  TC-CS-[ERR-02]: Missing Batch Number
  TC-CS-[ERR-03]: Missing Electronic Signature Password
  TC-CS-[ERR-04]: Invalid Electronic Signature Password
  TC-CS-[INT-01]: Verify PP-QM integration (process order confirmations + inspection results compiled)
  TC-CS-[INT-02]: Verify MM-QM integration (batch release decision → Unrestricted-Use stock transfer)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-[ERR-05]: Non-existent Process Order Number
  TC-CS-[ERR-06]: Non-existent Batch Number
  TC-CS-[ERR-07]: Process Order not in TECO status
  TC-CS-[AP-01]: Review batch record, add comments, and approve
  TC-CS-[EDGE-01]: Batch record with zero deviations (all in-spec)
  TC-CS-[EDGE-02]: Batch record with maximum allowed reviewer comments length
```

**Execution Dependencies:**
- **NEG-04** (premature stock transfer) depends on **HP-01** (approved batch) for comparison — execute after HP-01 completes.
- **HP-03** (archive retrieval) depends on **HP-01** or **HP-02** (approved batch records exist in archive) — execute after HP-01 or HP-02 completes.

---

## Regulatory and Compliance Notes

**FDA 21 CFR Part 11 Requirements:**
- Electronic batch records must be signed with secure, computer-generated, time-stamped audit trails.
- User authentication via password is mandatory for electronic signatures.
- All test cases involving electronic signatures (HP-01, HP-02, AP-01, ERR-03, ERR-04, INT-03) must explicitly verify:
  - Timestamp is recorded in UTC format.
  - User ID matches the logged-in QA Reviewer.
  - Audit trail entry is created and retrievable (SAP Change Documents or Audit Log).

**Good Manufacturing Practice (GMP) Compliance:**
- Batch records are legally binding documents for pharmaceutical manufacturing.
- Test cases must verify that:
  - Batches cannot be released without complete in-process control data (NEG-01).
  - Out-of-specification results block batch approval unless a documented, approved deviation exists (NEG-02, HP-02).
  - Stock transfers to Unrestricted-Use are blocked until batch record approval (NEG-04).
- Ensure test data does not use real production batch numbers or process orders.
- All test execution must use dedicated SAP S/4HANA Cloud test tenant (not production).

**SAP Module Integration:**
- PP (Production Planning) module provides process order data (operation confirmations, component consumption).
- QM (Quality Management) module provides inspection results, deviations, and batch release decisions.
- MM (Materials Management) module enforces stock transfer restrictions based on batch release status.
- Test cases must verify data flows correctly between these modules (INT-01, INT-02).

**Test System Configuration Requirements:**
- QM inspection plan must be configured with mandatory in-process control characteristics.
- QM quality notifications (deviations) must be pre-created and approved for HP-02 scenario.
- User role with QA Reviewer authorization must exist (for positive tests) and a user without QA authorization must exist (for NEG-03).
- Process orders must be created, confirmed, and set to TECO (technically complete) status for positive tests.
- Batch management must be active for test materials (material master configuration).
- SAP ArchiveLink or Document Management System (DMS) must be configured for batch record archiving (AC-6).

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-53-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP: 3, NEG: 4, ERR: 7, INT: 3)
3. Generate RECOMMENDED types (AP: 1, EDGE: 2) unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-53/` and `testdata/CS-53/`
8. For all electronic signature test cases (HP-01, HP-02, AP-01, ERR-03, ERR-04, INT-03), include explicit verification steps for:
   - Electronic signature timestamp (UTC format)
   - User ID matches logged-in QA Reviewer
   - Audit trail entry is created (SAP Change Documents or Audit Log)
9. For all NEG and ERR test cases, capture exact SAP error message text in Expected Result column
10. Use `{TD.*}` placeholders for all user-entered inputs; use `{ENV.*}` for credentials and tenant URLs
11. Generate testdata JSON with the following parameters:
    - `processOrderNumber` (valid TECO status order)
    - `batchNumber` (valid batch linked to process order)
    - `reviewerComments` (optional, max 255 chars)
    - `signaturePassword` (user's SAP password — use `{ENV.SAP_PASSWORD}`)
    - `deviationReference` (approved QM notification number — for HP-02 scenario)
    - `nonExistentProcessOrder` (9999999999 — for ERR-05)
    - `nonExistentBatch` (BATCH999999 — for ERR-06)
    - `invalidPassword` (WRONGPASS123 — for ERR-04)
    - `incompleteProcessOrder` (process order not in TECO status — for ERR-07)
12. Generate testdata guide with instructions for resolving real SAP values for process orders, batches, and deviation numbers in the test tenant
