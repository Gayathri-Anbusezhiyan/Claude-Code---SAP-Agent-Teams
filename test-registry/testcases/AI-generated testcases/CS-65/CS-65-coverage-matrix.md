# Test Coverage Matrix: [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc

**User Story:**    CS-65
**Module:**        PP — Production Planning and Manufacturing
**Generated:**     2026-08-24
**Total TCs:**     23

---

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | 2             | 2         | PASS   |
| Alternative   | 1             | 1         | PASS   |
| Negative      | 6             | 6         | PASS   |
| Error         | 5             | 5         | PASS   |
| Edge Case     | 6             | 6         | PASS   |
| State Transition | 3          | 3         | PASS   |
| Integration   | 0             | 0         | N/A    |
| **TOTAL**     | **23**        | **23**    | **PASS** |

---

## Acceptance Criteria Traceability

| AC ID | AC Text | Test Cases Covering This AC | Coverage Status |
|-------|---------|----------------------------|----------------|
| AC-1 | The user can access the "Manage Bills of Material" Fiori app. | TC-CS-151, TC-CS-152, TC-CS-153, TC-CS-154, TC-CS-155, TC-CS-156, TC-CS-160, TC-CS-161, TC-CS-162, TC-CS-163, TC-CS-164, TC-CS-165, TC-CS-166, TC-CS-167, TC-CS-168, TC-CS-169, TC-CS-170 | ✓ COVERED (17 TCs) |
| AC-2 | The system requires each BOM component to reference an approved, active material master record. | TC-CS-151, TC-CS-152, TC-CS-153, TC-CS-154, TC-CS-155, TC-CS-160, TC-CS-161, TC-CS-162, TC-CS-163, TC-CS-164, TC-CS-165, TC-CS-166, TC-CS-167, TC-CS-168, TC-CS-169 | ✓ COVERED (15 TCs) |
| AC-3 | The system supports alternative/substitute components, each individually flagged with regulatory approval status. | TC-CS-152, TC-CS-153, TC-CS-156, TC-CS-170 | ✓ COVERED (4 TCs) |
| AC-4 | Any change to a released BOM triggers a new version and requires re-approval before use in a process order. | TC-CS-171, TC-CS-172, TC-CS-173 | ✓ COVERED (3 TCs) |
| AC-5 | The system prevents process order creation against a BOM version not in "Released" status. | TC-CS-157, TC-CS-158, TC-CS-159, TC-CS-173 | ✓ COVERED (4 TCs) |
| AC-6 | The system maintains a full change history of BOM revisions for regulatory audit purposes. | TC-CS-151, TC-CS-152, TC-CS-171, TC-CS-172, TC-CS-173 | ✓ COVERED (5 TCs) |

**AC Coverage:** 6 / 6 (100%)

---

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | 6 / 6 ACs covered | ✓ PASS |
| HP Coverage | All 2 HP scenarios generated | 2 generated | ✓ PASS |
| AP Coverage | 1 AP scenario generated | 1 generated | ✓ PASS |
| NEG Coverage | All 6 NEG scenarios generated | 6 generated | ✓ PASS |
| ERR Coverage | All 5 ERR scenarios generated | 5 generated | ✓ PASS |
| EDGE Coverage | All 6 EDGE scenarios generated | 6 generated | ✓ PASS |
| ST Coverage | All 3 ST scenarios generated | 3 generated | ✓ PASS |
| Parameterization | 0 hardcoded SAP values — all data via {TD.*} or {ENV.*} placeholders | 0 hardcoded values found | ✓ PASS |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES (≥ 50% of total) | 18 TCs flagged YES or PARTIAL (78%) | ✓ PASS |
| Regulatory Compliance Notes | Test data guide explicitly states: "Use test system only, no production vendor/material IDs" | Compliance note included in testdata guide | ✓ PASS |

**Overall Quality Gate Status:** ✓ ALL PASSED (10 / 10 gates)

---

## Priority Distribution

| Priority | Count | Percentage |
|----------|-------|-----------|
| CRITICAL | 5     | 22%       |
| HIGH     | 13    | 57%       |
| MEDIUM   | 5     | 22%       |
| LOW      | 0     | 0%        |
| **TOTAL** | **23** | **100%** |

---

## Automation Viability

| Automation Candidate | Count | Percentage |
|---------------------|-------|-----------|
| YES                 | 13    | 57%       |
| PARTIAL             | 9     | 39%       |
| NO                  | 1     | 4%        |
| **TOTAL**           | **23** | **100%** |

**Target automation coverage:** 18 of 23 TCs (78%) — includes all YES and viable PARTIAL candidates

---

## Test Case List by Scenario Type

### Happy Path (2)
- TC-CS-151: Create BOM for Finished Pharmaceutical Product with Active Ingredients and Excipient Components (CRITICAL)
- TC-CS-152: Create BOM with Alternative and Substitute Components Flagged with Regulatory Approval Status (CRITICAL)

### Alternative Path (1)
- TC-CS-153: Create BOM with Multiple Alternative Components for Single Item (HIGH)

### Negative (6)
- TC-CS-154: Attempt to Add BOM Component with Non-Existent Material ID (HIGH)
- TC-CS-155: Attempt to Add BOM Component with Inactive/Blocked Material Master (HIGH)
- TC-CS-156: Attempt to Add Substitute Component without Regulatory Approval Status Flag (HIGH)
- TC-CS-157: Attempt to Create Process Order against BOM with Draft Status (HIGH)
- TC-CS-158: Attempt to Create Process Order against BOM with In Review Status (HIGH)
- TC-CS-159: Attempt to Create Process Order against BOM with Obsolete Status (HIGH)

### Error / Missing Field (5)
- TC-CS-160: Attempt to Submit BOM with Finished Product Material Field Empty (HIGH)
- TC-CS-161: Attempt to Submit BOM with Plant Field Empty (HIGH)
- TC-CS-162: Attempt to Submit BOM with Component Material Field Empty (HIGH)
- TC-CS-163: Attempt to Submit BOM with Component Quantity Field Empty (HIGH)
- TC-CS-164: Attempt to Submit BOM with Component UoM Field Empty (HIGH)

### Edge Case / Boundary (6)
- TC-CS-165: Create BOM with Minimum Component Quantity at Lower Boundary (MEDIUM)
- TC-CS-166: Create BOM with Maximum Component Quantity at Upper Boundary (MEDIUM)
- TC-CS-167: Attempt to Create BOM with Zero Component Quantity (MEDIUM)
- TC-CS-168: Create BOM with Single Component (Minimum Valid BOM Structure) (MEDIUM)
- TC-CS-169: Create BOM with Maximum Number of Components (MEDIUM)
- TC-CS-170: Create BOM with Maximum Number of Alternatives per Component Item (MEDIUM)

### State Transition (3)
- TC-CS-171: Modify Released BOM and Verify New Version Created with Draft Status (CRITICAL)
- TC-CS-172: Modify Draft BOM and Verify In-Place Edit without Version Change (MEDIUM)
- TC-CS-173: Release BOM Version and Verify Status Transition from Draft to Released (CRITICAL)

---

## Execution Readiness

| Readiness Check | Status | Notes |
|----------------|--------|-------|
| All TCs have unique IDs | ✓ PASS | TC-CS-151 through TC-CS-173 |
| All TCs reference valid dataset IDs | ✓ PASS | TD-CS-065-{NNN} format |
| All TCs include login steps (1-6) | ✓ PASS | Verified in all 23 TCs |
| All TCs use search bar navigation | ✓ PASS | Steps 7-8 in all TCs |
| All TCs include sign-out steps | ✓ PASS | Final steps in all TCs |
| All TCs use parameterized test data | ✓ PASS | {TD.*} and {ENV.*} placeholders |
| Test data extraction completed | ✓ PASS | CS-65-testdata.json and CS-65-testdata-guide.md generated |

---

## Regulatory Compliance Notes

**Pharmaceutical Industry Context (FDA 21 CFR Part 11, EU GMP Annex 11):**
- Bills of Material are critical master data records subject to full audit trail requirements
- All BOM changes must be traceable: user ID, timestamp, field-level changes (AC-6 verification mandatory in TC-CS-151, TC-CS-152, TC-CS-171, TC-CS-172, TC-CS-173)
- Released BOMs are locked from direct editing — changes trigger versioning (AC-4 enforcement verified in TC-CS-171, TC-CS-172, TC-CS-173)
- Component approval status must be explicitly captured for regulatory compliance (AC-3 requirement verified in TC-CS-152, TC-CS-153, TC-CS-156)
- Process orders must only reference Released BOMs — system must prevent use of Draft/In Review/Obsolete versions (AC-5 enforcement verified in TC-CS-157, TC-CS-158, TC-CS-159, TC-CS-173)

**Test Data Governance:**
- All test data uses `{TD.*}` placeholders — no hardcoded production vendor or material IDs
- All test execution must use dedicated SAP test system instances (not production SAP tenant)
- Test materials must be clearly marked as "TEST" in material master descriptions
- Material type FERT (finished product) or HALB (semi-finished product) for finished product materials
- Material type ROH (raw material) or HALB for component materials
- Ensure test plant configuration is isolated from production plant data

---

## Summary

- **Overall Risk:** CRITICAL (pharmaceutical regulatory compliance context)
- **Total Test Cases:** 23 (all mandatory scenarios generated)
- **AC Coverage:** 100% (6 / 6 ACs covered)
- **Quality Gates:** 10 / 10 PASSED
- **Automation Target:** 18 TCs (78% coverage)
- **Priority Distribution:** CRITICAL: 5, HIGH: 13, MEDIUM: 5
- **Execution Readiness:** READY — all quality gates passed; test data extraction complete
- **Next Step:** `/automate CS-65` (Automation Agent Phase 3)
