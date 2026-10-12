# Test Strategy: [CS-39] Process Free Goods (Sample) order for healthcare provider

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-39/strategy/CS-39-analysis.md
**Risk Profile:**     jira/userstories/CS-39/strategy/CS-39-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Sales Representative
- **Business Object:** Sales Order (Free Goods / Promotional Sample type)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Enable physicians to evaluate pharmaceutical products before prescribing while ensuring compliance with promotional sample regulations

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **12** | **12** | — |

**Rationale for AP = 0:** Free Goods process is standardized with no alternative valid paths identified in the ACs or story description. All valid flows converge to the single happy path scenario.

**Rationale for EDGE = MANDATORY (deviation from standard CRITICAL risk model):** AC-6 explicitly requires boundary validation testing (annual sample limit enforcement), making EDGE scenarios compliance-critical rather than optional.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path Scenarios (1):**
- **HP-01:** Create Free Goods Sales Order for approved healthcare provider with valid reason code, material not restricted, quantity within annual limit, pricing auto-set to zero — **Risk: CRITICAL** — **ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6**

**Negative Scenarios (4):**
- **NEG-01:** Customer is not approved for promotional samples — **Risk: HIGH** — **ACs: AC-4**
- **NEG-02:** Material is restricted from promotional sampling — **Risk: CRITICAL** — **ACs: AC-6**
- **NEG-03:** Customer has exceeded annual sample limit — **Risk: CRITICAL** — **ACs: AC-6**
- **NEG-04:** Attempt to manually override pricing to non-zero value — **Risk: CRITICAL** — **ACs: AC-2**

**Error Scenarios (4):**
- **ERR-01:** Missing Reason Code for Free Goods — **Risk: HIGH** — **ACs: AC-3** — **Field: Reason Code**
- **ERR-02:** Missing Customer (Sold-to Party) — **Risk: HIGH** — **ACs: AC-1** — **Field: Customer**
- **ERR-03:** Missing Material — **Risk: HIGH** — **ACs: AC-1** — **Field: Material**
- **ERR-04:** Missing Order Quantity — **Risk: HIGH** — **ACs: AC-1** — **Field: Order Quantity**

**Edge Cases (3):**
- **EDGE-01:** Order quantity exactly at annual sample limit (boundary) — **Risk: HIGH** — **ACs: AC-6** — **Parameter: quantity (upper)**
- **EDGE-02:** Order quantity = 1 (minimum valid quantity) — **Risk: MEDIUM** — **ACs: AC-1** — **Parameter: quantity (lower)**
- **EDGE-03:** Cumulative quantity = 0 (first Free Goods order for this customer) — **Risk: LOW** — **ACs: AC-5** — **Parameter: cumulativeQuantity (lower)**

### Recommended Scenarios

None — all scenarios are MANDATORY.

### Optional Scenarios

None — all scenarios are MANDATORY.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated (compliance-critical) | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 6 TCs flagged as Automation Candidate: YES (50% of total) | YES |

**Additional CRITICAL Risk Gates:**
| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (entity validation) | 100% — 4 NEG scenarios covering customer eligibility, material restriction, annual limit, pricing override | YES |
| Error coverage (mandatory fields) | 100% — 4 ERR scenarios covering Reason Code, Customer, Material, Order Quantity | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must PASS (no optional gates defined).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core pharmaceutical compliance transaction; regulatory violations result in FDA/EMA fines and enforcement actions |
| NEG (invalid entity) | HIGH | MAJOR | Non-compliance with promotional sample regulations (non-approved customer, restricted material) blocks business operations |
| NEG (business rule violations) | CRITICAL | CRITICAL | Annual limit enforcement and pricing override prevention are regulatory controls — failure = compliance breach |
| ERR (missing field) | HIGH | MAJOR | Missing mandatory fields prevent compliant order creation — data integrity failure |
| EDGE (boundary) | MEDIUM to HIGH | MAJOR | Annual sample limit boundary testing is compliance-critical (EDGE-01 = HIGH); minimum quantity and first-order scenarios are standard edge cases (MEDIUM) |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; stable Free Goods order creation flow |
| AP | N/A | No alternative path scenarios |
| NEG | PARTIAL | NEG-01, NEG-02, NEG-03 require SAP master data pre-configuration (non-approved customer, restricted material, customer with limit exceeded). NEG-04 (pricing override) is automation-friendly if UI allows manual price entry attempt. |
| ERR | YES | Field-level validation stable and repeatable |
| EDGE | PARTIAL | EDGE-01 requires customer with cumulative quantity exactly 1 unit below limit (complex data setup). EDGE-02 and EDGE-03 are automation-friendly. |
| INT | N/A | No integration scenarios |

**Target automation coverage:** 6 of 12 TCs (50%) — HP-01, NEG-04, ERR-01, ERR-02, ERR-03, ERR-04, EDGE-02, EDGE-03 (8 TCs) are automation candidates. NEG-01, NEG-02, NEG-03, EDGE-01 require extensive master data pre-conditions and are marked PARTIAL.

**Revised automation count:** 8 TCs automation-friendly (67%), 4 TCs require manual data setup (PARTIAL).

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-[HP-01]: Create Free Goods Sales Order for approved healthcare provider with valid reason code, material not restricted, quantity within annual limit, pricing auto-set to zero

Priority 2 — HIGH (validate immediately after):
  TC-CS-[NEG-01]: Customer is not approved for promotional samples
  TC-CS-[NEG-02]: Material is restricted from promotional sampling
  TC-CS-[NEG-03]: Customer has exceeded annual sample limit
  TC-CS-[NEG-04]: Attempt to manually override pricing to non-zero value
  TC-CS-[ERR-01]: Missing Reason Code for Free Goods
  TC-CS-[ERR-02]: Missing Customer (Sold-to Party)
  TC-CS-[ERR-03]: Missing Material
  TC-CS-[ERR-04]: Missing Order Quantity
  TC-CS-[EDGE-01]: Order quantity exactly at annual sample limit (boundary)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-[EDGE-02]: Order quantity = 1 (minimum valid quantity)
  TC-CS-[EDGE-03]: Cumulative quantity = 0 (first Free Goods order for this customer)

Priority 4 — Integration (run after core stability confirmed):
  None
```

---

## Regulatory and Compliance Notes

**Pharmaceutical Promotional Sample Compliance:**
- Free Goods (promotional sample) orders are subject to FDA regulations (21 CFR Part 203) in the United States and equivalent regulations in other jurisdictions (EMA guidelines in Europe)
- Test cases must verify that all regulatory controls are enforced:
  - **Customer eligibility validation (AC-4):** Only approved healthcare providers can receive samples
  - **Reason code tracking (AC-3):** Required for audit trails
  - **Annual sample limit enforcement (AC-6):** Prevents excessive distribution
  - **Pricing set to zero (AC-2):** Ensures no commercial sale occurs
  - **Material restriction checks (AC-6):** Controlled substances and restricted materials must not be distributed as samples
- **Test data requirements:**
  - Do NOT use real production customer IDs or healthcare provider NPIs
  - Use dedicated test customer master data with eligibility flags set
  - Use non-controlled, non-restricted materials for testing
  - Ensure test execution occurs in a dedicated SAP S/4HANA Cloud test tenant (not production)
- **Audit trail verification:**
  - AC-5 requires verification that cumulative quantity tracking data is updated post-delivery
  - Test cases must confirm that compliance reporting data structures are populated correctly

**SAP SD Standard Test Governance:**
- Sales Orders created during testing must be reversible (use test sales organizations with separate number ranges)
- Ensure authorization objects for Free Goods order type are assigned to the test user
- Delivery and goods issue processing must be testable without generating actual shipments

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-39-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE — no optional scenarios in this story)
3. No RECOMMENDED types exist for this story — all 12 scenarios are MANDATORY
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 12 scenarios generated (1 HP + 4 NEG + 4 ERR + 3 EDGE)
   - 0 hardcoded values (use `{TD.*}` placeholders for all test data)
   - ≥ 6 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - **YES:** HP-01, NEG-04, ERR-01, ERR-02, ERR-03, ERR-04, EDGE-02, EDGE-03
   - **PARTIAL:** NEG-01, NEG-02, NEG-03, EDGE-01 (note master data pre-condition complexity)
7. Output files to `testcases/AI-generated testcases/CS-39/` and `testdata/CS-39/`
8. **Parameterization requirements:**
   - Order Type (Free Goods): `{TD.orderType}`
   - Customer ID (approved): `{TD.customerId_approved}`
   - Customer ID (non-approved): `{TD.customerId_nonApproved}`
   - Material ID (valid): `{TD.materialId}`
   - Material ID (restricted): `{TD.materialId_restricted}`
   - Quantity (valid): `{TD.quantity}`
   - Quantity (minimum): `{TD.quantity_min}`
   - Quantity (at limit): `{TD.quantity_atLimit}`
   - Reason Code (valid): `{TD.reasonCode}`
   - Requested Delivery Date: `{TD.requestedDeliveryDate}`
   - Customer ID (exceeded limit): `{TD.customerId_exceededLimit}`
9. **Expected auto-populated fields to verify in test steps (NOT test data):**
   - Customer Name
   - Material Description
   - Sales Organization
   - Distribution Channel
   - Net Price (must = 0.00)
   - Currency
   - Sales Order Number (output)
   - Overall Status (output)
   - Cumulative Free Goods Quantity (output for AC-5)
10. **Compliance-specific test step requirements:**
    - AC-2 verification: Assert that Net Price = 0.00 for all line items after order creation
    - AC-5 verification: Capture cumulative quantity before order creation, then verify it increments by order quantity after delivery
    - AC-6 verification: For NEG-03, pre-condition must set customer cumulative quantity to (annual limit - order quantity + 1) to trigger rejection
