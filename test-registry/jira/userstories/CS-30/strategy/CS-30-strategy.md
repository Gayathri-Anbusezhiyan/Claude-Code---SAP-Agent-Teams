# Test Strategy: [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif

**Defined:** 2026-08-22
**Defined By:** test-strategy-agent/skills/define-test-strategy
**User Story JSON:** jira/userstories/CS-30/CS-30.json
**Analysis:** jira/userstories/CS-30/strategy/CS-30-analysis.md
**Risk Profile:** jira/userstories/CS-30/strategy/CS-30-risk-profile.json

---

## Executive Summary

| Attribute | Value |
|-----------|-------|
| User Story | CS-30 |
| Module | MM — Materials Management |
| Business Object | Material Master (GMP-regulated API) |
| Overall Risk | CRITICAL |
| Story Complexity | Complex (GMP regulatory compliance, batch management, QM integration) |
| Total Test Cases Planned | 13 (min) to 15 (target) |
| Automation Viability | HIGH (100% automatable via Manage Material Master Fiori app) |
| Test Execution Priority | P0 — Must execute before release (regulatory compliance blocker) |

**Risk Rationale:** GMP (Good Manufacturing Practice) pharmaceutical materials require strict regulatory compliance with FDA 21 CFR Part 11 and EU GMP Annex 11. Missing batch management or audit trail capabilities create regulatory audit findings and potential production shutdown. Critical validation coverage is mandatory.

---

## Coverage Model

| Scenario Type | Coverage Rule | Min TC Count | Target TC Count | Rationale |
|---------------|--------------|--------------|-----------------|-----------|
| **HP** (Happy Path) | MANDATORY | 1 | 1 | One complete end-to-end flow covering all 6 ACs: access app, set batch indicator, enter shelf-life parameters, assign QM type, verify procurement release control, validate change log |
| **AP** (Alternative Path) | SKIP | 0 | 0 | No alternative valid paths exist — all fields are mandatory for GMP materials; material type configuration enforces single creation path |
| **NEG** (Negative) | MANDATORY | 3 | 3 | Three critical validation scenarios: (1) missing batch management indicator (AC-2, AC-5 — CRITICAL risk), (2) missing QM inspection type (AC-4, AC-5 — HIGH risk), (3) procurement release attempt with incomplete fields (AC-5 — CRITICAL risk) |
| **ERR** (Error) | MANDATORY | 4 | 4 | Four mandatory field error scenarios: (1) missing Total Shelf Life (AC-3 — HIGH risk), (2) missing Minimum Remaining Shelf Life (AC-3 — HIGH risk), (3) missing Batch Management Indicator (AC-2 — CRITICAL risk), (4) missing QM Inspection Type (AC-4 — HIGH risk) |
| **EDGE** (Edge Case) | MANDATORY | 5 | 7 | Five mandatory boundary scenarios for shelf-life validation (AC-3 — BVA technique): (1) Total Shelf Life = 1 day (lower), (2) Total Shelf Life = 3650 days (upper), (3) Min Remaining Shelf Life = 1 day (lower), (4) Min Remaining Shelf Life = Total - 1 (upper), (5) Min = Total (invalid, should fail). Target +2 optional: Material Description length boundaries (1 char, 40 char) |
| **INT** (Integration) | SKIP | 0 | 0 | No linked issues identified (hasLinkedIssues = false) |
| **TOTAL** | — | **13** | **15** | Comprehensive regulatory compliance coverage with optional usability/boundary tests |

**Coverage Notes:**
- **HP-01** is the only happy path — no optional HP scenarios because all GMP fields are mandatory
- **NEG scenarios** focus on business rule enforcement (batch indicator, QM type, procurement release control) rather than UI validation
- **ERR scenarios** verify mandatory field enforcement at save/submit actions (not inline validation)
- **EDGE scenarios** validate SAP's shelf-life business logic (SLED — Shelf Life Expiration Date calculation)
- **No integration scenarios** — CS-30 is standalone; QM inspection type is a configuration lookup, not a cross-module dependency

---

## Acceptance Criteria Traceability

| AC ID | Acceptance Criterion | Risk | Scenario Type(s) | TC Count | Coverage Status |
|-------|---------------------|------|-----------------|----------|-----------------|
| AC-1 | The user can access the "Manage Material Master" Fiori app. | LOW | HP | 1 | COVERED (HP-01) |
| AC-2 | The system requires the batch management indicator to be set for materials flagged as GMP-regulated in the material type configuration. | CRITICAL | HP, NEG, ERR | 3 | COVERED (HP-01, NEG-01, ERR-03) |
| AC-3 | The system requires entry of total shelf life and minimum remaining shelf life on the Plant Data / Storage view. | HIGH | HP, ERR, EDGE | 7 | COVERED (HP-01, ERR-01, ERR-02, EDGE-01 to EDGE-05) |
| AC-4 | The system requires an assigned Quality Management inspection type for GMP-relevant materials. | HIGH | HP, NEG, ERR | 3 | COVERED (HP-01, NEG-02, ERR-04) |
| AC-5 | The material record cannot be released for procurement until all mandatory GMP fields are completed. | CRITICAL | HP, NEG | 4 | COVERED (HP-01, NEG-01, NEG-02, NEG-03) |
| AC-6 | A change log captures all subsequent modifications to regulatory-relevant fields for audit purposes. | CRITICAL | HP | 1 | COVERED (HP-01) |

**Traceability Status:** 100% — All 6 ACs covered by at least one test case.

**Gap Analysis:** None — All mandatory, high-risk, and critical ACs have sufficient coverage. AC-3 has 7 TCs (highest count) due to BVA technique requirements.

---

## Test Case Distribution

### Test Case Inventory

| TC Type | TC ID | Scenario Description | Priority | ACs Covered | Automation |
|---------|-------|---------------------|---------|-------------|------------|
| **HP** | TC-CS-021 | Create complete GMP-regulated API Material Master with all mandatory fields (batch indicator, total shelf life, min remaining shelf life, QM type); verify procurement release and change log | P0 | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 | YES |
| **NEG** | TC-CS-022 | Attempt to create GMP material without batch management indicator; verify system rejects and displays validation error | P0 | AC-2, AC-5 | YES |
| **NEG** | TC-CS-023 | Attempt to create GMP material without QM inspection type; verify system rejects and displays validation error | P0 | AC-4, AC-5 | YES |
| **NEG** | TC-CS-024 | Attempt to release material for procurement with incomplete GMP fields (missing shelf-life); verify system blocks release | P0 | AC-5 | YES |
| **ERR** | TC-CS-025 | Create material with missing Total Shelf Life on Plant Data/Storage view; verify system displays mandatory field error | P1 | AC-3, AC-5 | YES |
| **ERR** | TC-CS-026 | Create material with missing Minimum Remaining Shelf Life on Plant Data/Storage view; verify system displays mandatory field error | P1 | AC-3, AC-5 | YES |
| **ERR** | TC-CS-027 | Create material with missing Batch Management Indicator; verify system displays mandatory field error | P0 | AC-2, AC-5 | YES |
| **ERR** | TC-CS-028 | Create material with missing QM Inspection Type; verify system displays mandatory field error | P1 | AC-4, AC-5 | YES |
| **EDGE** | TC-CS-029 | Create material with Total Shelf Life = 1 day (minimum boundary); verify system accepts value and calculates SLED correctly | P1 | AC-3 | YES |
| **EDGE** | TC-CS-030 | Create material with Total Shelf Life = 3650 days (maximum boundary); verify system accepts value | P2 | AC-3 | YES |
| **EDGE** | TC-CS-031 | Create material with Minimum Remaining Shelf Life = 1 day (minimum boundary); verify system accepts value | P2 | AC-3 | YES |
| **EDGE** | TC-CS-032 | Create material with Minimum Remaining Shelf Life = Total Shelf Life - 1 day (maximum valid boundary); verify system accepts value | P1 | AC-3 | YES |
| **EDGE** | TC-CS-033 | Create material with Minimum Remaining Shelf Life = Total Shelf Life (invalid equal values); verify system rejects with validation error | P1 | AC-3 | YES |
| **EDGE** (optional) | TC-CS-034 | Create material with Material Description = 1 character (minimum boundary); verify system accepts | P3 | AC-1 | YES |
| **EDGE** (optional) | TC-CS-035 | Create material with Material Description = 40 characters (maximum boundary); verify system accepts | P3 | AC-1 | YES |

**TC Count:** 13 mandatory + 2 optional = 15 target

**Priority Mapping:**
- **P0 (Blocker):** HP + NEG scenarios (regulatory compliance, business rule enforcement) — 4 TCs
- **P1 (Critical):** ERR scenarios (mandatory field validation) + critical EDGE scenarios — 6 TCs
- **P2 (High):** Non-critical EDGE scenarios (boundary validation) — 2 TCs
- **P3 (Medium):** Optional EDGE scenarios (usability) — 2 TCs

---

## Quality Gates

| Quality Gate | Target | Enforcement | Validation Method |
|--------------|--------|-------------|-------------------|
| **QG-1: AC Traceability** | 100% of ACs covered by ≥1 TC | MANDATORY | Compare coverage matrix (above) with AC list from analysis — all 6 ACs must have ≥1 TC; fail if any AC has 0 TCs |
| **QG-2: Happy Path Coverage** | 1 HP TC covering all 6 ACs in one end-to-end flow | MANDATORY | Review TC-CS-021 (HP-01) — must include all steps: access app, select GMP material type, set batch indicator, enter shelf-life params, assign QM type, verify procurement release, validate change log |
| **QG-3: Negative Coverage** | 100% of CRITICAL risk ACs have ≥1 NEG TC | MANDATORY | AC-2 (CRITICAL) → NEG-01; AC-5 (CRITICAL) → NEG-01, NEG-02, NEG-03; AC-6 (CRITICAL) → HP-01 change log validation |
| **QG-4: Error Coverage** | 100% of HIGH risk mandatory fields have ≥1 ERR TC | MANDATORY | AC-3 (HIGH) → ERR-01, ERR-02; AC-4 (HIGH) → ERR-04; AC-2 (CRITICAL) → ERR-03 |
| **QG-5: Edge Coverage** | BVA applied to all numeric mandatory fields | MANDATORY | Total Shelf Life (lower, upper, zero) → EDGE-01, EDGE-02; Min Remaining Shelf Life (lower, upper, invalid equal) → EDGE-03, EDGE-04, EDGE-05 |
| **QG-6: Parameterization** | 100% of test data externalized to `{KEY}-testdata.json` | MANDATORY | No hardcoded SAP master data (material type, plant, QM type, shelf-life values) in TC steps — use `{TD.materialType}`, `{TD.plant}`, `{TD.totalShelfLife}` placeholders |
| **QG-7: Automation Eligibility** | 100% of TCs automatable via Playwright MCP | PASS | All 15 TCs executable via Manage Material Master Fiori app — no backend/API scenarios; no manual SAP GUI transactions required |
| **QG-8: Expected Result Precision** | 100% of TCs have verifiable Expected Result with exact SAP message text or UI state | MANDATORY | Every TC step must specify: (1) exact error message (e.g., "Batch management indicator is required"), (2) field state (enabled/disabled), (3) success message (e.g., "Material 123 saved successfully"), or (4) change log entry format |

**Pass Criteria:** All MANDATORY quality gates must pass before TCs are submitted to Automation Agent.

**Failure Actions:**
- **QG-1 fail:** Add missing TCs to cover gap ACs
- **QG-2/3/4/5 fail:** Add missing HP/NEG/ERR/EDGE scenarios
- **QG-6 fail:** Refactor TCs to externalize hardcoded data
- **QG-8 fail:** Add exact SAP message text or UI state to Expected Result column

---

## Test Case Priorities

| Priority | Definition | Scenario Types | TC Count | Execution Timing |
|---------|------------|---------------|----------|------------------|
| **P0 (Blocker)** | Must pass for story acceptance — regulatory compliance blockers | HP, NEG (CRITICAL risk) | 4 | Smoke test suite — executed before every deployment |
| **P1 (Critical)** | Must pass for production release — mandatory field validation and critical boundaries | ERR, EDGE (HIGH risk) | 6 | Regression suite — executed before release |
| **P2 (High)** | Should pass for production release — boundary validation | EDGE (MEDIUM risk) | 2 | Full regression suite — executed weekly |
| **P3 (Medium)** | Optional usability/boundary tests | EDGE (optional) | 2 | Extended regression suite — executed on-demand |

**Priority Assignment Rules:**
- **P0:** All HP scenarios + NEG scenarios with CRITICAL risk rating
- **P1:** All ERR scenarios + EDGE scenarios with HIGH risk rating or involving CRITICAL ACs
- **P2:** EDGE scenarios with MEDIUM risk rating
- **P3:** Optional EDGE scenarios not tied to regulatory compliance

**Critical Path:** P0 + P1 = 10 TCs (77% of total) — must pass for release approval.

---

## Automation Viability

| TC Type | Automation Method | Complexity | Challenges | Mitigation |
|---------|------------------|-----------|-----------|------------|
| **HP** | Playwright MCP via Manage Material Master Fiori app | HIGH | Multi-view navigation (General Data → Plant Data → Storage view → QM view); change log verification requires backend query or UI navigation to change history screen | Use `browser_snapshot` after each view to capture SAP state; change log verification via "Display Changes" action in Material Master app (available in object menu) |
| **NEG** | Playwright MCP via Manage Material Master Fiori app | MEDIUM | Must verify exact error message text from SAP MessageBox or Messages panel; error states vary by field (inline vs. dialog) | Capture error message text from `browser_snapshot` after save attempt; use `getByText()` assertion with exact SAP message |
| **ERR** | Playwright MCP via Manage Material Master Fiori app | MEDIUM | Same as NEG — mandatory field errors appear in SAP Messages panel or MessageBox | Use `browser_snapshot` after save/submit action to capture error panel |
| **EDGE** | Playwright MCP via Manage Material Master Fiori app | MEDIUM | Boundary validation may occur at field-level (inline) or save-level (dialog); SLED calculation verification requires inventory management view or batch record inspection | For EDGE-05 (invalid equal values), expect error message "Minimum remaining shelf life must be less than total shelf life"; for valid boundaries, verify material creation success |

**Overall Automation Viability:** HIGH — 100% of TCs automatable via Manage Material Master Fiori app.

**Non-Automatable Scenarios:** None — all scenarios executable via Fiori UI; no backend/API dependencies.

**Automation Risks:**
- **Risk 1 (HIGH):** Change log verification (AC-6, TC-CS-021) requires navigation to "Display Changes" screen — if unavailable in Fiori app, may require SAP GUI fallback or backend table query (CDHDR/CDPOS)
- **Risk 2 (MEDIUM):** Error message text variability — SAP may display different messages depending on material type configuration (GMP flag) or release level
- **Risk 3 (MEDIUM):** QM inspection type dropdown — may contain tenant-specific values; test data must use valid QM types from target SAP system

**Mitigation Strategy:**
- **Risk 1:** During Phase 3 (scriptless execution), verify change log accessibility via Fiori app; if unavailable, document alternative verification method (backend query or SAP GUI)
- **Risk 2:** Capture exact error message text during Phase 3 exploration; update test data JSON with actual SAP messages
- **Risk 3:** Test data guide must document "how to find valid QM inspection types in target SAP system" (navigation: Manage Quality Management → Inspection Types)

---

## Test Execution Order (Risk-Descending)

| Execution Order | TC ID | Scenario Type | Rationale |
|----------------|-------|---------------|-----------|
| **1** | TC-CS-021 | HP | Happy path first — validates complete end-to-end flow and establishes baseline test data (valid material created successfully) |
| **2** | TC-CS-022 | NEG | CRITICAL risk — missing batch management indicator (AC-2 regulatory blocker) |
| **3** | TC-CS-024 | NEG | CRITICAL risk — procurement release control (AC-5 business rule enforcement) |
| **4** | TC-CS-027 | ERR | CRITICAL risk — missing batch management indicator error message validation |
| **5** | TC-CS-023 | NEG | HIGH risk — missing QM inspection type (AC-4 regulatory requirement) |
| **6** | TC-CS-028 | ERR | HIGH risk — missing QM inspection type error message validation |
| **7** | TC-CS-025 | ERR | HIGH risk — missing total shelf life (AC-3 mandatory field) |
| **8** | TC-CS-026 | ERR | HIGH risk — missing minimum remaining shelf life (AC-3 mandatory field) |
| **9** | TC-CS-033 | EDGE | HIGH risk — invalid shelf-life boundary (Min = Total) |
| **10** | TC-CS-032 | EDGE | HIGH risk — maximum valid boundary (Min = Total - 1) |
| **11** | TC-CS-029 | EDGE | MEDIUM risk — minimum total shelf life boundary (1 day) |
| **12** | TC-CS-030 | EDGE | MEDIUM risk — maximum total shelf life boundary (3650 days) |
| **13** | TC-CS-031 | EDGE | MEDIUM risk — minimum remaining shelf life boundary (1 day) |
| **14** | TC-CS-034 | EDGE (optional) | LOW risk — usability boundary (1 char description) |
| **15** | TC-CS-035 | EDGE (optional) | LOW risk — usability boundary (40 char description) |

**Execution Strategy:**
- **Phase 1 (Smoke):** TCs 1–4 (P0 scenarios) — 4 TCs
- **Phase 2 (Regression):** TCs 5–13 (P1 + P2 scenarios) — 9 TCs
- **Phase 3 (Extended):** TCs 14–15 (P3 scenarios) — 2 TCs

**Dependency Notes:**
- TC-CS-021 (HP) must execute first to establish valid test data and verify SAP system accessibility
- NEG/ERR scenarios have no dependencies (can execute in parallel after HP pass)
- EDGE scenarios should execute after HP to reuse valid test data structure

---

## Test Data Requirements

| Data Category | Parameters | Source | Notes |
|--------------|-----------|--------|-------|
| **Master Data (SAP Config)** | Material Type (GMP-regulated), Plant, QM Inspection Type | SAP tenant configuration | MUST be resolved during Phase 3 (scriptless execution) — values are tenant-specific; cannot be hardcoded |
| **User-Entered Inputs** | Material Description, Base UoM, Batch Management Indicator (checkbox), Total Shelf Life (days), Minimum Remaining Shelf Life (days) | Test data JSON | Parameterized with `{TD.*}` placeholders; values vary per TC type (HP/NEG/ERR/EDGE) |
| **Boundary Values** | Total Shelf Life (1, 3650), Min Remaining Shelf Life (1, Total-1, Total), Material Description length (1, 40) | Analysis boundary table | EDGE scenarios only — use exact boundary values from analysis |
| **Auto-Populated Fields** | Material Group, Valuation Class, Profit Center, Company Code | SAP system (auto-filled) | NOT test data — do not include in `{KEY}-testdata.json`; reference only in Expected Result for verification |
| **Expected Outputs** | Material Number (auto-generated), Creation Date, Created By, Change Log Entry | SAP system (generated) | NOT test data — capture during execution for verification |

**Test Data Strategy:**
- **HP scenario (TC-CS-021):** Use standard valid values — Total Shelf Life = 365 days, Min Remaining Shelf Life = 30 days
- **NEG scenarios (TC-CS-022 to TC-CS-024):** Omit mandatory fields to trigger validation
- **ERR scenarios (TC-CS-025 to TC-CS-028):** Same as NEG — leave mandatory fields blank
- **EDGE scenarios (TC-CS-029 to TC-CS-033):** Use exact boundary values from analysis
- **Optional EDGE (TC-CS-034, TC-CS-035):** Use Material Description length boundaries (1, 40 chars)

**Placeholder Syntax:**
- `{TD.materialType}` → GMP-regulated material type (e.g., FERT with GMP flag)
- `{TD.materialDescription}` → "API Test Material - {{TIMESTAMP}}"
- `{TD.baseUoM}` → KG (kilogram)
- `{TD.batchIndicator}` → TRUE (checked)
- `{TD.totalShelfLife}` → 365 (standard), 1 (min boundary), 3650 (max boundary)
- `{TD.minRemainingShelfLife}` → 30 (standard), 1 (min boundary), 364 (max valid), 365 (invalid)
- `{TD.plant}` → Valid plant code (e.g., 1710)
- `{TD.qmInspectionType}` → Valid QM type (e.g., 01 - Incoming Inspection)

**Test Data Guide Requirements:**
- Document "how to find valid GMP material types in SAP" (navigation path)
- Document "how to find valid QM inspection types in SAP" (navigation path)
- Document "how to resolve Plant code for test tenant" (navigation path)
- Include warning: "Total Shelf Life max value (3650) may vary by SAP tenant configuration"

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|------------|-----------|
| **R1: GMP material type not configured in test SAP tenant** | CRITICAL | LOW | Verify GMP material type availability during Phase 3 exploration; if unavailable, request SAP Basis team to configure test material type with GMP flag enabled |
| **R2: QM module not activated in test SAP tenant** | HIGH | MEDIUM | Verify QM inspection type availability during Phase 3; if QM not active, escalate to SAP Basis team — QM activation requires SAP license and configuration (cannot be bypassed) |
| **R3: Change log verification unavailable in Fiori app** | MEDIUM | MEDIUM | Explore "Display Changes" option in Material Master app during Phase 3; if unavailable, use SAP GUI transaction MM03 (Display Material) → Environment → Changes as fallback |
| **R4: Shelf-life validation rules vary by material type** | MEDIUM | MEDIUM | Capture exact error message text during Phase 3 exploration; update test data JSON with actual SAP messages per material type |
| **R5: Batch management indicator may be disabled (non-editable) for non-GMP material types** | LOW | LOW | Use only GMP-flagged material types for all TCs; verify field editability during Phase 3 |
| **R6: Test data pollution (material master accumulation)** | LOW | HIGH | Use Material Description with timestamp suffix (e.g., "API Test - {{TIMESTAMP}}") to create unique materials per test run; no cleanup required (materials remain in system but identifiable) |

**Critical Blocker:** R1 + R2 — If GMP material type or QM module unavailable, story is not testable in target SAP tenant. Escalation to SAP Basis team required.

---

## Handoff to TestCase Agent

**Input Artefacts:**
1. `jira/userstories/CS-30/strategy/CS-30-analysis.md` (Story decomposition, ACs, data parameters, scenario inventory)
2. `jira/userstories/CS-30/strategy/CS-30-risk-profile.json` (Machine-readable risk + scenario data)
3. `jira/userstories/CS-30/strategy/CS-30-strategy.md` (This document — coverage model, quality gates, TC distribution)

**Expected Outputs (Phase 2b — TestCase Agent):**
1. `testcases/AI-generated testcases/CS-30/testcases/TC-CS-021.md` to `TC-CS-035.md` (15 individual TC files)
2. `testcases/AI-generated testcases/CS-30/CS-30-coverage-matrix.md` (AC-to-TC traceability table + completeness checklist)
3. `testcases/AI-generated testcases/CS-30/CS-30-summary.json` (Machine-readable TC registry for Automation Agent)
4. `testdata/CS-30/CS-30-testdata.json` (Parameterized test datasets with `{{PLACEHOLDER}}` values)
5. `testdata/CS-30/CS-30-testdata-guide.md` (Instructions for resolving SAP master data placeholders)

**TestCase Agent Constraints:**
- Use TC ID range **TC-CS-021 to TC-CS-035** (next available after CS-3 which ended at TC-CS-020)
- Follow industrial-standard test case format from `prompts/testcase-generation-from-userstory.md`
- Include exact boundary values from CS-30-analysis.md boundary parameters table
- Use `{TD.*}` syntax for test data placeholders (not `{{.*}}` — that's reserved for JSON)
- Mark auto-populated fields (Material Group, Valuation Class, Profit Center, Company Code) as "Expected Result" only, NOT "Input"
- Include exact SAP error message text in Expected Result for NEG/ERR scenarios (use placeholder if unknown: "{{SAP_ERROR_MSG}}" to be resolved in Phase 3)

**Validation Checklist for TestCase Agent:**
- [ ] All 6 ACs have ≥1 TC covering them (QG-1)
- [ ] TC-CS-021 (HP) includes all 6 ACs in one end-to-end flow (QG-2)
- [ ] All CRITICAL ACs (AC-2, AC-5, AC-6) have ≥1 NEG or HP TC (QG-3)
- [ ] All HIGH ACs (AC-3, AC-4) have ≥1 ERR TC (QG-4)
- [ ] All numeric mandatory fields have BVA coverage (QG-5)
- [ ] No hardcoded SAP master data in TC steps — use `{TD.*}` placeholders (QG-6)
- [ ] Every TC has precise Expected Result with SAP message text or UI state (QG-8)

---

## Appendix: Scenario Type Definitions

| Type | Full Name | Purpose | When Required |
|------|-----------|---------|---------------|
| **HP** | Happy Path | Validate successful end-to-end flow with all valid inputs and expected system behavior | MANDATORY — at least 1 per story |
| **AP** | Alternative Path | Validate alternative valid flows (different user roles, optional features, multi-path ACs) | OPTIONAL — only if story has multi-path ACs |
| **NEG** | Negative | Validate business rule enforcement (system rejects invalid business scenarios) | MANDATORY — if story has business rule ACs with CRITICAL/HIGH risk |
| **ERR** | Error | Validate mandatory field enforcement and input validation | MANDATORY — if story has mandatory field ACs or input validation rules |
| **EDGE** | Edge Case / Boundary | Validate numeric boundaries, length limits, min/max values using BVA technique | MANDATORY — if story has numeric/length parameters with defined boundaries |
| **INT** | Integration | Validate cross-module dependencies with linked issues | MANDATORY — if `hasLinkedIssues = true` in risk profile JSON |

---

**Strategy Status:** COMPLETE — Ready for Phase 2b (TestCase Generation)
**Total TCs Planned:** 13 (mandatory minimum) to 15 (target with optional)
**Critical Path TCs:** 10 (P0 + P1)
**Automation Viability:** HIGH (100% automatable)
