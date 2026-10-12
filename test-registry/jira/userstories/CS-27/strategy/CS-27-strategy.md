# Test Strategy: [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri

**Defined:** 2026-08-22
**Defined By:** test-strategy-agent/skills/define-test-strategy
**Story Analysis:** jira/userstories/CS-27/strategy/CS-27-analysis.md
**Risk Profile:** jira/userstories/CS-27/strategy/CS-27-risk-profile.json

---

## 1. Strategy Overview

| Attribute | Value |
|-----------|-------|
| User Story Key | CS-27 |
| Module | MM — Materials Management |
| Business Object | Purchasing Contract (Outline Agreement) |
| Overall Risk Level | CRITICAL |
| Story Complexity | Complex |
| Total Acceptance Criteria | 6 |
| Critical ACs | 2 (AC-3: cumulative release tracking, AC-4: balance warning) |
| High Risk ACs | 3 (AC-2: contract definition, AC-5: vendor-material validation, AC-2: validity period) |

### Strategy Summary

This story implements SAP Purchasing Contract (Outline Agreement) functionality with negotiated pricing, cumulative release tracking, and expiration alerting. The CRITICAL overall risk is driven by:

1. **State management complexity** — Cumulative release tracking across multiple release orders (AC-3) with failure impact on over-commitment and contract breaches
2. **Financial validation** — Release order balance warnings (AC-4) prevent over-spending; failure has direct financial impact
3. **Multi-entity dependencies** — Vendor master, material master, source list, purchasing org, plant, and pricing condition synchronization

**Test strategy emphasis:**
- **CRITICAL coverage** for release tracking and balance validation (HP, NEG, EDGE scenarios)
- **HIGH coverage** for contract definition, tiered pricing, and master data validation (HP, AP, NEG, ERR, EDGE scenarios)
- **MEDIUM coverage** for expiration alerting (HP, EDGE scenarios — time-based trigger, lower business impact)
- **Comprehensive boundary testing** for quantity, value, pricing, and date parameters (10 EDGE scenarios)
- **Mandatory error handling** for 8 mandatory fields

---

## 2. Coverage Model

### 2.1 Scenario Type Decision Matrix

| Scenario Type | MANDATORY | RECOMMENDED | OPTIONAL | Rationale |
|--------------|-----------|-------------|----------|-----------|
| **HP (Happy Path)** | ✓ | | | MANDATORY — At least 4 TCs covering: standard contract creation (AC-1, AC-2, AC-5), multi-tier pricing (AC-2), release tracking (AC-3), expiration alert (AC-6) |
| **AP (Alternative Path)** | ✓ | | | MANDATORY — 2 TCs covering Target Value variant (AC-2) and dual Target Quantity+Value variant (AC-2) — business-critical alternatives |
| **NEG (Negative)** | ✓ | | | MANDATORY — 6 TCs covering vendor/material validation failures (AC-5), release order limit exceeded (AC-3, AC-4), invalid date order (AC-2), invalid price tier order (AC-2) — all HIGH/CRITICAL risk |
| **ERR (Error / Missing Field)** | ✓ | | | MANDATORY — 8 TCs covering all mandatory fields: Supplier, Material, Target Qty/Value, Valid From/To, Net Price, Purch Org, Plant — prevent incomplete contracts |
| **EDGE (Edge Case / Boundary)** | ✓ | | | MANDATORY — 10 TCs covering quantity/value/price/date boundaries and exact balance match scenarios — financial accuracy and date logic validation |
| **INT (Integration)** | | | Not Applicable | No linked issues — no integration scenarios required |

### 2.2 Test Case Count per Scenario Type

| Scenario Type | Minimum TCs | Target TCs | Actual Planned | Justification |
|--------------|-------------|------------|----------------|---------------|
| **HP** | 4 | 4 | 4 | 1 standard creation + 1 multi-tier pricing + 1 release tracking + 1 expiration alert |
| **AP** | 2 | 2 | 2 | Target Value only + Target Qty + Value both specified |
| **NEG** | 6 | 6 | 6 | 2 master data validation + 2 contract limit exceeded + 2 data integrity |
| **ERR** | 8 | 8 | 8 | One per mandatory field (8 fields identified in analysis) |
| **EDGE** | 10 | 10 | 10 | 2 Target Quantity + 1 Target Value + 1 Net Price + 3 Validity Date + 2 Alert Lead Time + 2 exact balance match |
| **INT** | 0 | 0 | 0 | No linked issues |
| **TOTAL** | **30** | **30** | **30** | Full coverage of all risk areas |

---

## 3. Acceptance Criteria Traceability

| AC ID | Description | Risk Level | Scenario Types | Min TCs | Planned TCs | TC IDs |
|-------|-------------|-----------|---------------|---------|-------------|--------|
| AC-1 | Access "Manage Purchase Contracts" Fiori app | LOW | HP | 1 | 1 | TC-CS-021 (HP-01) |
| AC-2 | Define target quantity/value, validity period, tiered pricing | HIGH | HP, AP, NEG, ERR, EDGE | 4 | 16 | TC-CS-021, TC-CS-022 (HP), TC-CS-023, TC-CS-024 (AP), TC-CS-029 (NEG), TC-CS-031-038 (ERR), TC-CS-039-044 (EDGE) |
| AC-3 | Track cumulative release quantities/values | CRITICAL | HP, NEG, EDGE | 2 | 7 | TC-CS-023 (HP), TC-CS-025, TC-CS-026 (NEG), TC-CS-039, TC-CS-040, TC-CS-047, TC-CS-048 (EDGE) |
| AC-4 | Warn when release order exceeds contract balance | CRITICAL | NEG, EDGE | 2 | 4 | TC-CS-025, TC-CS-026 (NEG), TC-CS-047, TC-CS-048 (EDGE) |
| AC-5 | Link to approved vendor-material combination (source list) | HIGH | HP, NEG, ERR | 3 | 5 | TC-CS-021 (HP), TC-CS-027, TC-CS-028 (NEG), TC-CS-031, TC-CS-032, TC-CS-038 (ERR) |
| AC-6 | Alert before contract expiration | MEDIUM | HP, EDGE | 2 | 3 | TC-CS-024 (HP), TC-CS-045, TC-CS-046 (EDGE) |

**Coverage Summary:**
- All 6 ACs covered by at least minimum required TCs
- CRITICAL ACs (AC-3, AC-4) covered by 7 and 4 TCs respectively (exceeds minimum)
- 100% AC traceability achieved

---

## 4. Quality Gates

### 4.1 Test Case Quality Gates

| Gate ID | Gate Name | Criteria | Pass Threshold | Validation Method |
|---------|-----------|----------|----------------|-------------------|
| QG-1 | **AC Traceability** | Every AC must be covered by at least min TCs | 100% of ACs covered | Trace each AC to TC IDs in coverage matrix (Section 3) |
| QG-2 | **Happy Path Coverage** | At least 1 HP TC per critical business flow | 4 HP TCs: standard creation, multi-tier pricing, release tracking, expiration alert | Count HP TCs in test suite |
| QG-3 | **Negative Scenario Coverage** | All CRITICAL/HIGH risk negative scenarios covered | 6 NEG TCs: vendor not approved, material not in source list, exceed qty limit, exceed value limit, invalid date order, invalid price tier order | Count NEG TCs covering AC-3, AC-4, AC-5, AC-2 |
| QG-4 | **Error Handling Coverage** | All mandatory fields validated with ERR scenarios | 8 ERR TCs: one per mandatory field | Count ERR TCs; verify each mandatory field has dedicated TC |
| QG-5 | **Boundary Value Coverage** | CRITICAL/HIGH risk parameters tested at boundaries | 10 EDGE TCs: quantity (2), value (1), price (1), dates (3), alert lead time (2), exact match (2) | Count EDGE TCs; verify boundaries per data parameter inventory |
| QG-6 | **Test Data Parameterization** | All test data externalized with {{PLACEHOLDER}} syntax | 100% of TCs use test data references, not hardcoded values | Inspect TC steps for {{TD.*}} or hardcoded test data |
| QG-7 | **Expected Result Specificity** | Every step has observable SAP-specific expected result | 100% of steps include UI state, message, or data verification | Review TC steps for vague results like "success" |
| QG-8 | **Automation Eligibility** | All TCs marked as automatable or manual-only with rationale | 100% of TCs have automation feasibility assessment | Check TC metadata for automation flag + rationale |

### 4.2 Test Execution Quality Gates

| Gate ID | Gate Name | Criteria | Pass Threshold | Validation Method |
|---------|-----------|----------|----------------|-------------------|
| QG-9 | **HP Pass Rate** | All Happy Path scenarios must pass before NEG/ERR/EDGE execution | 100% of HP TCs pass | Execute HP TCs first; block remaining execution if any HP fails |
| QG-10 | **Critical Scenario Pass Rate** | CRITICAL risk scenarios (AC-3, AC-4) must pass | 100% of CRITICAL TCs pass (11 TCs: TC-CS-023, TC-CS-025, TC-CS-026, TC-CS-039, TC-CS-040, TC-CS-047, TC-CS-048, plus HP-03 prerequisites) | Review test results; escalate any CRITICAL failure immediately |
| QG-11 | **Overall Pass Rate** | Overall test suite pass rate | ≥ 95% pass rate (max 1-2 failures allowed in EDGE/ERR scenarios) | Calculate pass rate from test results |
| QG-12 | **Zero Blocking Defects** | No P1/P2 defects in contract creation or release tracking | 0 blocking defects | Review defect log; block deployment if P1/P2 exists |

---

## 5. Test Case Prioritization

### 5.1 Priority Assignment per Scenario Type

| Scenario Type | Default Priority | Override Conditions | Rationale |
|--------------|------------------|---------------------|-----------|
| **HP** | **P1 (Critical)** | None — all HP are P1 | Core business flows; must pass before release |
| **AP** | **P1 (Critical)** | None — both alternatives are business-critical (Target Value, dual targets) | Target Value variant is common SAP usage pattern |
| **NEG** | **P1 (Critical)** if AC is CRITICAL; **P2 (High)** if AC is HIGH | NEG-03, NEG-04 = P1 (exceed limit); NEG-01, NEG-02, NEG-05, NEG-06 = P2 | Release limit validation is CRITICAL; master data validation is HIGH |
| **ERR** | **P2 (High)** | None | Mandatory field validation prevents incomplete contracts; HIGH business impact |
| **EDGE** | **P2 (High)** if financial/quantity boundary; **P3 (Medium)** if date/alert boundary | EDGE-01 to EDGE-04, EDGE-09, EDGE-10 = P2; EDGE-05 to EDGE-08 = P3 | Financial/quantity boundaries have direct business impact; date/alert boundaries are lower risk |
| **INT** | N/A | N/A | No integration scenarios for CS-27 |

### 5.2 Test Case Execution Order (Risk-Descending)

| Execution Order | TC ID Range | Scenario Types | Priority | Rationale |
|----------------|-------------|---------------|----------|-----------|
| **Wave 1** | TC-CS-021, TC-CS-022, TC-CS-023, TC-CS-024 | HP (all 4) | P1 | Happy path must pass first — validates baseline functionality before negative/edge testing |
| **Wave 2** | TC-CS-023, TC-CS-024 | AP (both) | P1 | Alternative business flows — Target Value variant and dual targets are critical usage patterns |
| **Wave 3** | TC-CS-025, TC-CS-026 | NEG (CRITICAL risk: exceed limits) | P1 | Release limit validation — CRITICAL business rule, must be validated early |
| **Wave 4** | TC-CS-027, TC-CS-028, TC-CS-029, TC-CS-030 | NEG (HIGH risk: master data, date, price) | P2 | Master data validation and data integrity rules — HIGH impact |
| **Wave 5** | TC-CS-031 to TC-CS-038 | ERR (all 8) | P2 | Mandatory field validation — HIGH impact, prevents incomplete contracts |
| **Wave 6** | TC-CS-039, TC-CS-040, TC-CS-047, TC-CS-048 | EDGE (financial/quantity boundaries) | P2 | Quantity/value/price boundaries — financial accuracy validation |
| **Wave 7** | TC-CS-041 to TC-CS-046 | EDGE (date/alert boundaries) | P3 | Date/alert boundaries — lower business impact |

**Execution Dependencies:**
- **Wave 2-7 blocked by Wave 1** — If any HP TC fails, halt execution and fix root cause before proceeding
- **Wave 3 requires TC-CS-021 and TC-CS-023 pass** — Release limit validation requires valid contract creation and release tracking baseline
- **Wave 6 requires TC-CS-021 pass** — Boundary testing requires valid contract creation baseline

---

## 6. Test Data Strategy

### 6.1 Test Data Categories

| Data Category | Source | Parameterization | Notes |
|--------------|--------|------------------|-------|
| **Master Data** | SAP vendor master (LFA1), material master (MARA/MARC), source list | {{TD.validVendorId}}, {{TD.validMaterialId}}, {{TD.invalidVendorId}}, {{TD.materialNotInSourceList}} | Must exist in SAP tenant; requires pre-requisite master data setup |
| **Organizational Data** | SAP org structure (T001K, T024, T001W) | {{TD.purchasingOrg}}, {{TD.purchasingGroup}}, {{TD.plant}}, {{TD.companyCode}} | Auto-populated from purchasing org/vendor; must match user authorization |
| **Transactional Data (Contract Header)** | User input | {{TD.targetQuantity}}, {{TD.targetValue}}, {{TD.validityStartDate}}, {{TD.validityEndDate}}, {{TD.alertLeadTime}} | Parameterized per TC; boundaries defined in risk profile |
| **Transactional Data (Pricing Tier)** | User input | {{TD.tier1QuantityFrom}}, {{TD.tier1NetPrice}}, {{TD.tier2QuantityFrom}}, {{TD.tier2NetPrice}}, {{TD.tier3QuantityFrom}}, {{TD.tier3NetPrice}} | Parameterized per TC; ascending order enforced for NEG-06 |
| **Transactional Data (Release Order)** | User input (created as prerequisite for AC-3, AC-4 testing) | {{TD.releaseQuantity}}, {{TD.releaseValue}} | Created via "Manage Purchase Orders" app with contract reference |
| **Auto-populated Data** | SAP backend (not user input) | {{AUTO.supplierName}}, {{AUTO.materialDescription}}, {{AUTO.uom}}, {{AUTO.currency}}, {{AUTO.remainingQuantity}}, {{AUTO.remainingValue}} | Verified in Expected Result column; not included in test data JSON |
| **Boundary Values** | Analysis-derived | {{TD.minTargetQuantity}}, {{TD.maxTargetQuantity}}, {{TD.minTargetValue}}, {{TD.minNetPrice}}, {{TD.todayDate}}, {{TD.minValidityPeriod}}, {{TD.minAlertLeadTime}}, {{TD.maxAlertLeadTime}} | Used in EDGE scenarios |
| **Invalid Data** | Analysis-derived | {{TD.endDateBeforeStartDate}}, {{TD.tier2QuantityLowerThanTier1}}, {{TD.nonExistentVendorId}} | Used in NEG scenarios |

### 6.2 Test Data Resolution Requirements

| Requirement | Description | Validation Method |
|-------------|-------------|-------------------|
| **Vendor-Material-Source List Consistency** | Vendor {{TD.validVendorId}} must have material {{TD.validMaterialId}} in source list for plant {{TD.plant}} | Query source list (table EINA/EINE) for vendor-material combination before test execution |
| **Vendor Approval Status** | Vendor {{TD.validVendorId}} must be marked as approved for purchasing org {{TD.purchasingOrg}} | Query vendor purchasing org data (table LFM1) for approval flag |
| **Material Plant Assignment** | Material {{TD.validMaterialId}} must be extended to plant {{TD.plant}} | Query material plant data (table MARC) for plant assignment |
| **Purchasing Org Authorization** | Test user must have authorization for purchasing org {{TD.purchasingOrg}} | Verify user authorization object M_EINK_EKO before test execution |
| **Contract Number Range** | SAP tenant must have number range configured for contract document type (typically MK) | Verify number range object (table NRIV) before test execution |
| **Release Order Prerequisites (for AC-3, AC-4)** | Valid contract created in HP-01 or HP-02 must exist before executing HP-03, NEG-03, NEG-04, EDGE-09, EDGE-10 | HP-01/HP-02 TCs are prerequisites; contract number captured and reused |

---

## 7. Automation Viability Assessment

### 7.1 Automation Feasibility per Scenario Type

| Scenario Type | Automation Viability | Recommended Approach | Manual Steps Required | Rationale |
|--------------|---------------------|---------------------|----------------------|-----------|
| **HP** | **HIGH (100% automatable)** | Playwright MCP + Page Object Model | None | Standard SAP Fiori app interactions; all steps are UI-driven (navigate, fill, click, verify) |
| **AP** | **HIGH (100% automatable)** | Playwright MCP + Page Object Model | None | Alternative paths use same UI elements as HP; no complex logic |
| **NEG** | **MEDIUM-HIGH (80% automatable)** | Playwright MCP + Error Message Verification | Manual: NEG-02 (source list verification may require backend query) | Most NEG scenarios result in SAP error messages visible in UI; NEG-02 may require source list pre-check |
| **ERR** | **HIGH (100% automatable)** | Playwright MCP + Mandatory Field Validation | None | All ERR scenarios trigger SAP validation messages in UI |
| **EDGE** | **MEDIUM (70% automatable)** | Playwright MCP + Test Data Parameterization | Manual: EDGE-08 (alert trigger date verification requires time travel or backend job monitoring) | Most EDGE scenarios are UI-driven; EDGE-08 (expiration alert) requires time-based trigger validation |
| **INT** | N/A | N/A | N/A | No integration scenarios |

### 7.2 Automation Blockers and Workarounds

| Blocker ID | Scenario(s) Affected | Description | Workaround | Impact |
|-----------|---------------------|-------------|------------|--------|
| AB-1 | TC-CS-024 (HP-04), TC-CS-045, TC-CS-046 (EDGE-07, EDGE-08) | Expiration alert is time-based trigger (requires X days before expiration) | **Option 1:** Create contract with expiration date = today + alert lead time days, then verify alert in SAP workflow/email system (requires manual check). **Option 2:** Mock system date in SAP (requires admin access). **Option 3:** Verify alert configuration only (not actual trigger) | MEDIUM — Alert verification requires manual intervention or admin access |
| AB-2 | TC-CS-023 (HP-03), TC-CS-025, TC-CS-026 (NEG-03, NEG-04) | Release order creation requires switching to "Manage Purchase Orders" app (cross-app workflow) | Use Playwright MCP to navigate to "Manage Purchase Orders" app, create PO with contract reference, verify cumulative tracking back in "Manage Purchase Contracts" app | LOW — Cross-app navigation is automatable, but test script becomes longer |
| AB-3 | TC-CS-028 (NEG-02) | Source list validation requires backend data verification (may not be visible in UI error message) | **Option 1:** Pre-query source list via SAP OData API or backend table (EINA/EINE) before test execution. **Option 2:** Rely on SAP error message "Source list does not exist" (if available in UI) | LOW — Most SAP systems display source list errors in UI; backend query is fallback |
| AB-4 | TC-CS-039, TC-CS-040 (EDGE-01, EDGE-02) | Maximum target quantity boundary (999999999) may cause performance issues or system limits | Use documented SAP maximum value from system configuration (table T001K or contract screen field limits); avoid hardcoding 999999999 if system limit is lower | LOW — Maximum value is tenant-specific; parameterize as {{TD.maxTargetQuantity}} |

### 7.3 Recommended Automation Toolchain

| Tool | Purpose | Usage |
|------|---------|-------|
| **Playwright MCP** | Browser automation (navigate, fill, click, verify) | Phase 3 scriptless execution + Phase 4 script generation |
| **Page Object Model** | SAP Fiori app abstraction (locators, actions, fixtures) | Generated in Phase 4 per blueprint pattern |
| **Test Data JSON** | Parameterized test datasets | testdata/CS-27/CS-27-testdata.json with {{PLACEHOLDER}} syntax |
| **Exploration Data Capture** | Real SAP locators + behaviors | exploration-data/execution/CS-27/{TC-ID}/ captured in Phase 3 |
| **Test Results Reporter** | Pass/fail summary + defect logging | test-results/CS-27/ + defects/CS-27/ (Phase 5+6) |

---

## 8. Risk Mitigation Plan

| Risk ID | Risk Description | Impact | Likelihood | Mitigation Strategy | Validation Method |
|---------|-----------------|--------|-----------|---------------------|-------------------|
| R-1 | Cumulative release tracking failure (AC-3) — over-commitment | CRITICAL | MEDIUM | **HP-03 + NEG-03 + NEG-04 + EDGE-09 + EDGE-10** — 7 TCs covering within-limit, exceed-limit, and exact-match scenarios; execute in Wave 1-3 (early detection) | Verify "Remaining Target Qty/Value" updates correctly after each release order; verify warning appears when limit exceeded |
| R-2 | Release order balance warning missing (AC-4) — financial over-spending | CRITICAL | MEDIUM | **NEG-03 + NEG-04 + EDGE-09 + EDGE-10** — 4 TCs covering exceed quantity, exceed value, and exact match scenarios; execute in Wave 3 (early detection) | Verify SAP warning message appears when release order input exceeds remaining balance; verify save is blocked or requires override |
| R-3 | Tiered pricing setup errors (AC-2) — financial discrepancies | HIGH | MEDIUM | **HP-02 + NEG-06 + EDGE-04** — 3 TCs covering multi-tier setup, non-ascending thresholds, and minimum price boundary; execute in Wave 1 + Wave 4 + Wave 6 | Verify pricing tiers are saved correctly in contract; verify non-ascending thresholds are rejected; verify minimum price (0.01) is accepted |
| R-4 | Vendor-material validation bypass (AC-5) — source list inconsistency | HIGH | MEDIUM | **HP-01 + NEG-01 + NEG-02 + ERR-01 + ERR-02 + ERR-08** — 6 TCs covering valid vendor-material, vendor not approved, material not in source list, missing fields; execute in Wave 1 + Wave 4 + Wave 5 | Verify valid vendor-material combination is accepted; verify invalid combinations are rejected with specific error messages |
| R-5 | Validity period logic errors (AC-2) — invalid contracts active | HIGH | LOW | **HP-01 + NEG-05 + EDGE-05 + EDGE-06 + ERR-04 + ERR-05** — 6 TCs covering valid dates, invalid date order, date boundaries, missing dates; execute in Wave 1 + Wave 4 + Wave 5 + Wave 7 | Verify end date > start date validation; verify today date accepted; verify minimum period (1 day) accepted |
| R-6 | Expiration alert missing (AC-6) — missed contract renewals | MEDIUM | MEDIUM | **HP-04 + EDGE-07 + EDGE-08** — 3 TCs covering standard alert, no alert (0 days), and maximum alert (365 days); execute in Wave 7 (lower priority) | Verify alert configuration is saved; verify alert trigger date is calculated correctly (manual verification or backend job check) |
| R-7 | Test data dependency — vendor/material/source list not available in SAP tenant | HIGH | HIGH | **Pre-execution validation** — Query vendor master (LFA1), material master (MARA/MARC), source list (EINA/EINE) before test execution; document master data requirements in testdata guide | Run pre-execution validation script; create master data if missing (requires SAP admin access) |
| R-8 | Cross-app workflow complexity (release order creation) — automation failure | MEDIUM | MEDIUM | **AB-2 workaround** — Use Playwright MCP to automate cross-app navigation (Manage Purchase Contracts → Manage Purchase Orders → back); capture both app locators in exploration phase | Test cross-app navigation in HP-03 early (Wave 1); verify contract reference appears in release order |

---

## 9. Test Execution Plan

### 9.1 Execution Phases

| Phase | Description | TCs Included | Entry Criteria | Exit Criteria | Estimated Effort |
|-------|-------------|--------------|----------------|---------------|-----------------|
| **Phase 1: Happy Path Baseline** | Validate core contract creation, pricing, release tracking, alert flows | HP-01 to HP-04 (4 TCs) | SAP tenant accessible, master data verified, test user authorized | All 4 HP TCs pass (100% pass rate); contract number captured for Phase 2 | 2-3 hours (scriptless) / 1 hour (automated) |
| **Phase 2: Alternative Paths** | Validate Target Value and dual target usage patterns | AP-01 to AP-02 (2 TCs) | Phase 1 complete, HP TCs pass | Both AP TCs pass (100% pass rate) | 1 hour (scriptless) / 30 min (automated) |
| **Phase 3: Critical Negative Scenarios** | Validate release limit enforcement (quantity + value exceeded) | NEG-03 to NEG-04 (2 TCs) | Phase 1 complete, valid contract exists from HP-03 | Both NEG TCs pass (warnings triggered correctly) | 1 hour (scriptless) / 30 min (automated) |
| **Phase 4: High-Risk Negative Scenarios** | Validate master data, date, and pricing integrity | NEG-01, NEG-02, NEG-05, NEG-06 (4 TCs) | Phase 1 complete | All 4 NEG TCs pass (errors triggered correctly) | 2 hours (scriptless) / 1 hour (automated) |
| **Phase 5: Error Handling** | Validate mandatory field enforcement | ERR-01 to ERR-08 (8 TCs) | Phase 1 complete | All 8 ERR TCs pass (validation messages triggered correctly) | 2 hours (scriptless) / 1 hour (automated) |
| **Phase 6: Financial/Quantity Boundaries** | Validate quantity/value/price boundaries and exact match scenarios | EDGE-01 to EDGE-04, EDGE-09 to EDGE-10 (6 TCs) | Phase 1 complete | All 6 EDGE TCs pass (boundaries accepted/rejected correctly) | 2 hours (scriptless) / 1 hour (automated) |
| **Phase 7: Date/Alert Boundaries** | Validate date and alert lead time boundaries | EDGE-05 to EDGE-08 (4 TCs) | Phase 1 complete | All 4 EDGE TCs pass (boundaries accepted correctly; alert verification may be manual) | 1-2 hours (scriptless) / 1 hour (automated, excluding manual alert check) |

**Total Estimated Effort:**
- **Scriptless (Phase 3):** 11-13 hours for full test suite (30 TCs)
- **Automated (Phase 4+5):** 6-7 hours for full test suite (30 TCs) — assumes scripts are generated and validated

### 9.2 Execution Environment

| Environment | Purpose | URL | Credentials |
|------------|---------|-----|-------------|
| **SAP S/4HANA Cloud (my426318)** | Test execution environment | {{ENV.SAP_FIORI_URL}} (from .env) | {{ENV.SAP_USERNAME}}, {{ENV.SAP_PASSWORD}} |
| **Jira (jira-naqet)** | Defect logging (Phase 6) | {{ENV.JIRA_BASE_URL}} (from .env) | Atlassian MCP authentication |

### 9.3 Execution Dependencies

| Dependency | Description | Owner | Validation Method |
|-----------|-------------|-------|-------------------|
| **Master Data Setup** | Valid vendor {{TD.validVendorId}}, material {{TD.validMaterialId}}, source list entry must exist in SAP | SAP Admin / Test Data Owner | Pre-execution query: LFA1, MARA/MARC, EINA/EINE tables |
| **User Authorization** | Test user must have M_EINK_EKO authorization for purchasing org {{TD.purchasingOrg}} | SAP Security Admin | Pre-execution authorization check (transaction SU53) |
| **Number Range Configuration** | Contract number range must be configured for document type MK | SAP Basis Admin | Pre-execution query: NRIV table |
| **Expiration Alert Job** | Background job for contract expiration alerts must be configured (for TC-CS-024, TC-CS-045, TC-CS-046) | SAP Basis Admin | Verify job schedule (transaction SM37) |

---

## 10. Success Criteria

| Criterion | Definition | Measurement | Target |
|-----------|-----------|-------------|--------|
| **AC Coverage Completeness** | All 6 ACs covered by at least minimum required TCs | Count of ACs with >= min TCs / total ACs | 100% (6/6 ACs covered) |
| **Test Case Generation Completeness** | All 30 planned TCs generated with required structure | Count of generated TCs / planned TCs | 100% (30/30 TCs generated) |
| **Test Data Parameterization** | All TCs use {{TD.*}} or {{ENV.*}} references, no hardcoded values | Count of TCs with parameterized data / total TCs | 100% (30/30 TCs parameterized) |
| **Happy Path Pass Rate** | All HP TCs pass | HP pass count / total HP TCs | 100% (4/4 HP pass) — BLOCKING for subsequent phases |
| **Critical Scenario Pass Rate** | All CRITICAL risk TCs pass (AC-3, AC-4 coverage) | CRITICAL pass count / total CRITICAL TCs | 100% (11/11 CRITICAL pass) — BLOCKING for deployment |
| **Overall Pass Rate** | Overall test suite pass rate | Total pass count / total TCs executed | ≥ 95% (max 1-2 EDGE/ERR failures allowed) |
| **Automation Coverage** | Percentage of TCs automated | Count of automated TCs / total TCs | ≥ 85% (26/30 TCs automated; 4 TCs manual due to alert verification) |
| **Defect Severity** | No P1/P2 defects open | Count of P1/P2 defects | 0 P1/P2 defects — BLOCKING for deployment |

---

## 11. Deliverables

| Deliverable | Location | Format | Owner | Delivery Timeline |
|------------|----------|--------|-------|-------------------|
| **Test Case Suite** | testcases/AI-generated testcases/CS-27/testcases/ | 30 individual TC markdown files (TC-CS-021.md to TC-CS-050.md) | TestCase Agent | Phase 2c (after strategy sign-off) |
| **Coverage Matrix** | testcases/AI-generated testcases/CS-27/CS-27-coverage-matrix.md | Markdown table with AC-to-TC traceability | TestCase Agent | Phase 2c |
| **Test Data JSON** | testdata/CS-27/CS-27-testdata.json | JSON with {{PLACEHOLDER}} syntax for all parameterized values | TestCase Agent | Phase 2c |
| **Test Data Guide** | testdata/CS-27/CS-27-testdata-guide.md | Markdown guide for resolving {{PLACEHOLDER}} values in SAP tenant | TestCase Agent | Phase 2c |
| **Test Case Summary JSON** | testcases/AI-generated testcases/CS-27/CS-27-summary.json | Machine-readable registry (used by Automation Agent) | TestCase Agent | Phase 2c |
| **Automation Scripts** | automation/pages/mm/purchase-contract/, automation/tests/mm-purchase-contract.spec.js | Playwright Page Objects + test specs | Automation Agent | Phase 4 (after scriptless exploration) |
| **Exploration Data** | exploration-data/execution/CS-27/{TC-ID}/ | JSON execution records with real locators + behaviors | Automation Agent | Phase 3 (scriptless execution) |
| **Test Results** | test-results/CS-27/ | Playwright HTML report + JSON results | Playwright Runner | Phase 5 (after script execution) |
| **Defect Log** | defects/CS-27/ | Classification JSON + Jira Bug links | Defect Logging Agent | Phase 6 (if failures occur) |

---

## 12. Sign-off

| Role | Name | Approval Status | Date | Comments |
|------|------|----------------|------|----------|
| **Test Strategy Architect** | test-strategy-agent | ✓ Approved | 2026-08-22 | Strategy defined with 30 TCs (4 HP, 2 AP, 6 NEG, 8 ERR, 10 EDGE); CRITICAL risk coverage prioritized; ready for test case generation (Phase 2c) |
| **Product Owner** | (Pending) | Pending | | |
| **QA Lead** | (Pending) | Pending | | |

---

**Next Phase:** Test Case Generation (Phase 2c) — `/generate-testcases CS-27`
