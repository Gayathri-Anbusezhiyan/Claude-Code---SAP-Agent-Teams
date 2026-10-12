# Story Analysis: [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-64/CS-64.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | QA Manager |
| Core Action | Review a Batch Release Dashboard showing all batches pending final QA disposition |
| Business Goal | Prioritize review activities and prevent unreleased batches from causing distribution delays |
| Business Object | Batch, Batch Record, Quality Inspection |
| SAP Module | QM — Quality Management (with integration to PP and SD) |
| Complexity | Complex (no story points provided, inferred from multi-module integration and analytical dashboard requirements) |

### Implicit Business Rules (Domain-Inferred)
- Batches must have a Quality Inspection status before appearing in the dashboard
- Process orders must be linked to batches for proper traceability
- Batch records must be compiled and available for review before disposition
- Deviations must be tracked and associated with specific batches
- Customer ship dates must be maintained in sales orders for priority flagging
- Final disposition workflow must trigger stock status updates in real-time
- Released batches must become available for Sales & Distribution picking
- Rejected/Rework batches must be excluded from available stock
- QA Manager role must have authorization to record batch dispositions
- Batch release decisions must be auditable and logged with timestamp and user

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access a "Batch Release" analytical Fiori app. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The dashboard lists all batches currently in Quality Inspection status with days pending and associated process order. | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP, NEG (no batches), EDGE (aging calculation) | 3 |
| AC-3 | The user can drill down into a batch to view its complete compiled batch record and any open deviations. | NAVIGATION | HIGH | EP | HP, NEG (no deviations), AP (with deviations) | 3 |
| AC-4 | The system highlights batches approaching a committed customer ship date to flag release priority. | BUSINESS_RULE | HIGH | DT, BVA | HP (near ship date), NEG (no ship date), EDGE (past due) | 3 |
| AC-5 | The QA manager can record the final disposition (Release, Reject, Rework) directly from the dashboard. | SUCCESS_CONFIRMATION | CRITICAL | EP, DT | HP (Release), AP (Reject), AP (Rework) | 3 |
| AC-6 | The system automatically updates the batch's stock status upon disposition, making it available to Sales & Distribution where applicable. | INTEGRATION | CRITICAL | EP, ST | HP (Release→Available), INT (SD availability check), NEG (Reject→Unavailable) | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Batch Number | Batch | Alphanumeric | Yes (for drill-down) | Existing batch in Quality Inspection status |
| Disposition | Disposition / Final Decision | Enum | Yes (for disposition action) | Release, Reject, Rework |
| Comments | Disposition Comments | Text | No | Free text, 255 char max |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Days Pending | Days Pending QA | Dashboard load | Calculated from QI status timestamp to current date |
| Process Order | Process Order | Batch selection | Batch master MCHA-CHARG linked to process order AFKO-AUFNR |
| Batch Status | Status | Batch selection | Quality inspection status from MCHA-CLABS |
| Customer Ship Date | Ship Date | Batch selection | Sales order VBEP-MBDAT linked via material and plant |
| Compiled Batch Record | Batch Record / Batch Documentation | Drill-down | QM batch record tables (QALS, QAVE) |
| Open Deviations | Deviations | Drill-down | QM notifications QMFE filtered by batch |
| Stock Status | Stock Status | Post-disposition | MCHA-CLABS updated after disposition |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Disposition Timestamp | Date and time of disposition action | ISO8601 timestamp |
| Disposition User | QA Manager who recorded the disposition | SAP User ID |
| Stock Status Update | New stock status (Unrestricted/Blocked/Quality Inspection) | Enum |
| SD Availability | Flag indicating if batch is now available to SD | Boolean |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Days Pending | 0 (same day as QI status) | No max, but aging alerts typical at 7/14/30 days | N/A | Date calculation field |
| Ship Date Threshold | Today (immediate priority) | Future dates (lower priority) | Past dates (overdue, highest priority) | Days to ship date calculation |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Batch disposition workflow | CRITICAL | MEDIUM | CRITICAL | Direct impact on production release and customer delivery |
| Dashboard data accuracy (days pending, status) | CRITICAL | MEDIUM | CRITICAL | Incorrect data leads to wrong prioritization and missed ship dates |
| Stock status update integration | CRITICAL | MEDIUM | CRITICAL | Failure breaks SD picking process and causes fulfillment delays |
| Customer ship date highlighting | HIGH | LOW | HIGH | Missing alerts cause delayed releases but manual monitoring possible |
| Batch record drill-down | HIGH | LOW | HIGH | QA decisions require full visibility; incomplete data risks compliance |
| Deviation tracking | HIGH | MEDIUM | HIGH | Open deviations may block release; missing data risks quality breach |
| Navigation/Access to dashboard | MEDIUM | LOW | MEDIUM | Cosmetic risk; workaround via transaction codes |
| Disposition comments | LOW | LOW | LOW | Optional field; no business impact if missing |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None | N/A | N/A | However, implicit integration exists with SD (Sales & Distribution) module for customer ship date and stock availability — recommend INT scenarios |

**Implicit Integration Points Identified:**
- **PP → QM**: Process order to batch linkage
- **QM → MM**: Stock status update after disposition
- **MM → SD**: Stock availability for picking
- **SD → QM**: Customer ship date for priority flagging

Recommend treating these as integration test scenarios despite no explicit linked issues in Jira.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-64: Review A Batch Release Dashboard Showing All Batches Pending Final Qa
Module: PP/QM — Production Planning & Quality Management

Happy Path Scenarios:
  HP-01: Access Batch Release Dashboard and view batches in QI status with days pending and process orders — Risk: CRITICAL — ACs: AC-1, AC-2
  HP-02: Drill down into a batch with open deviations, review compiled batch record, and return to dashboard — Risk: HIGH — ACs: AC-3
  HP-03: Identify a batch approaching customer ship date (highlighted), record Release disposition, verify stock status updated to Unrestricted — Risk: CRITICAL — ACs: AC-2, AC-4, AC-5, AC-6

Alternative Path Scenarios:
  AP-01: Record Reject disposition on a batch, verify stock status remains Blocked — Risk: CRITICAL — ACs: AC-5, AC-6
  AP-02: Record Rework disposition on a batch, verify stock status remains in Quality Inspection — Risk: HIGH — ACs: AC-5, AC-6
  AP-03: Drill down into a batch with no open deviations, confirm empty deviation list — Risk: MEDIUM — ACs: AC-3

Negative Scenarios:
  NEG-01: Access dashboard when no batches are in Quality Inspection status — verify empty state message — Risk: MEDIUM — ACs: AC-2
  NEG-02: Select a batch with no associated customer ship date — verify no priority highlight — Risk: HIGH — ACs: AC-4
  NEG-03: Attempt disposition action without selecting a batch — verify validation error — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Batch Number for drill-down — Risk: HIGH — ACs: AC-3
  ERR-02: Missing Disposition selection when attempting to record — Risk: CRITICAL — ACs: AC-5

Edge Cases:
  EDGE-01: Batch with 0 days pending (just entered QI status today) — verify days pending = 0 — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Batch with ship date in the past (overdue) — verify highest priority highlight — Risk: HIGH — ACs: AC-4
  EDGE-03: Batch with ship date = today — verify immediate priority highlight — Risk: HIGH — ACs: AC-4
  EDGE-04: Batch with ship date far in future (30+ days) — verify no priority highlight — Risk: LOW — ACs: AC-4

Integration Scenarios:
  INT-01: Verify Released batch becomes available in SD for sales order picking — Risk: CRITICAL — ACs: AC-6
  INT-02: Verify Rejected batch is excluded from SD available-to-promise (ATP) — Risk: CRITICAL — ACs: AC-6
  INT-03: Verify process order linkage displayed correctly for batches created via production order — Risk: HIGH — ACs: AC-2

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | Core workflows: dashboard access/view, drill-down with deviations, full disposition cycle with Release |
| AP | 3 | Alternative disposition outcomes (Reject, Rework) + drill-down without deviations |
| NEG | 3 | Empty dashboard state, missing ship date, missing batch selection |
| ERR | 2 | Missing batch for drill-down, missing disposition selection |
| EDGE | 4 | Days pending boundaries (0, today, past, future) and ship date priority thresholds |
| INT | 3 | Stock status updates propagate to SD availability checks |
| **TOTAL** | **18** | |
