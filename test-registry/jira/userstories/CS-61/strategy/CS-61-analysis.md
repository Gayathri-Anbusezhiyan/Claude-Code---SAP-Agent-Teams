# Story Analysis: [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-61/CS-61.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Planner |
| Core Action | view a Capacity Planning overview for cleanroom/sterile manufacturing suites |
| Business Goal | ensure process orders are scheduled without exceeding the available validated capacity of shared production resources |
| Business Object | Work Center Capacity / Process Order Schedule |
| SAP Module | PP — Production Planning |
| Complexity | Complex (no story points assigned, but involves capacity analytics, rescheduling, and cleanroom-specific constraints) |

### Implicit Business Rules (Domain-Inferred)
- Work centers must be maintained in SAP with defined available capacity (hours/day, shifts, utilization rate)
- Process orders must be assigned to work centers with sufficient capacity and capability (cleanroom classification)
- Cleanroom/sterile manufacturing requires validated work centers with specific GMP classifications (Grade A/B/C/D)
- Changeover/cleaning time between different products is mandatory for contamination prevention and must be planned as capacity-consuming activity
- Capacity load calculations must include setup time, processing time, teardown time, and cleaning/changeover time
- Overload situations prevent efficient production flow and may violate GMP scheduling requirements
- Capacity planning must respect sequence-dependent cleaning times (different products may require different changeover durations)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Capacity Planning" or "Monitor Work Center Load" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system displays planned and confirmed load against each work center's available capacity by time period. | VALIDATION_POSITIVE | CRITICAL | EP, DT | HP | 1 |
| AC-3 | The system highlights overload situations where scheduled process orders exceed available capacity. | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP, NEG | 2 |
| AC-4 | The planner can reschedule or resequence process orders directly from the capacity overview. | BUSINESS_RULE | HIGH | EP, ST | HP, AP | 2 |
| AC-5 | The system accounts for required cleaning/changeover time between batches of different products on the same line. | BUSINESS_RULE | CRITICAL | EP, DT | HP, NEG | 2 |
| AC-6 | The system reflects updated capacity load immediately after a process order is rescheduled. | SUCCESS_CONFIRMATION | HIGH | EP, ST | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Work Center ID | Work Center | Alphanumeric | Yes | Existing work center in SAP master (cleanroom/sterile classification) |
| Time Period | Period / Horizon | Date range | Yes | Future date range (days/weeks/months) |
| Process Order ID (for rescheduling) | Process Order | Alphanumeric | Yes (for reschedule action) | Existing process order in SAP |
| New Start Date/Time (for rescheduling) | Start Date | Date/Time | Yes (for reschedule action) | Future date/time within planning horizon |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Work Center Description | Work Center Name | Confirm Work Center ID | Work center master CRHD |
| Available Capacity | Available Capacity | Load time period | Capacity master data (shifts, utilization) |
| Planned Load | Planned Load | Load time period | Planned process order operations |
| Confirmed Load | Confirmed Load | Load time period | Confirmed process order operations |
| Capacity Utilization % | Utilization | Load time period | (Planned + Confirmed) / Available × 100 |
| Cleaning/Changeover Time | Changeover Duration | Process order sequence | Setup matrix or routing data |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Overload Indicator | Visual flag (red/yellow) indicating capacity exceeded | Color-coded cell or icon |
| Capacity Load Chart | Graphical view of load vs capacity over time | Bar chart or timeline |
| Rescheduling Confirmation | Success message after process order rescheduled | Text message |
| Updated Start Date | New scheduled start date/time of rescheduled process order | Date/Time |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Capacity Utilization % | 0% (no load) | 100% (full capacity) or >100% (overload) | 0% (valid — idle work center) | >100% triggers overload alert |
| Cleaning/Changeover Time | 0 (same product continuation) | System-configured maximum | 0 (valid — no changeover) | Product-dependent |
| Planning Horizon | Current date | System-configured future limit | N/A | Cannot plan in the past |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Capacity load calculation accuracy | CRITICAL | MEDIUM | CRITICAL | Incorrect capacity data leads to overbooked work centers and production delays |
| Overload detection | CRITICAL | LOW | CRITICAL | Missing overload alerts cause scheduling conflicts and GMP violations |
| Cleaning/changeover time inclusion | CRITICAL | MEDIUM | CRITICAL | Omitting changeover time leads to contamination risk and GMP non-compliance |
| Process order rescheduling | HIGH | MEDIUM | HIGH | Incorrect rescheduling breaks production sequence and material availability |
| Real-time capacity update | HIGH | LOW | HIGH | Stale capacity data causes planning conflicts |
| Work center access/navigation | LOW | LOW | LOW | Cosmetic risk — easily detected |

---

## Integration Risk

No linked issues identified in the Jira story data. However, this feature has **implicit integration dependencies**:

| Dependency Area | Integration Risk | Scenario Needed |
|----------------|-----------------|-----------------|
| Process Order Management | HIGH | INT-01: Verify that rescheduling a process order from Capacity Planning updates the process order master data (header and operations) |
| Material Availability Check (MRP) | MEDIUM | INT-02: Verify that rescheduled process orders trigger re-evaluation of material availability dates |
| Shop Floor Execution | MEDIUM | INT-03: Verify that confirmed operations in execution update the capacity load in real-time |

---

## Scenario Inventory

SCENARIO INVENTORY — CS-61: View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
Module: PP — Production Planning

Happy Path Scenarios:
  HP-01: View capacity planning overview with planned and confirmed load displayed — Risk: CRITICAL — ACs: AC-1, AC-2
  HP-02: Identify overload situation highlighted on work center capacity view — Risk: CRITICAL — ACs: AC-3
  HP-03: Reschedule a process order from capacity overview and verify updated start date — Risk: HIGH — ACs: AC-4, AC-6
  HP-04: View capacity load including cleaning/changeover time between different products — Risk: CRITICAL — ACs: AC-5

Alternative Path Scenarios:
  AP-01: Resequence (change order) of multiple process orders without changing dates — Risk: HIGH — ACs: AC-4

Negative Scenarios:
  NEG-01: Attempt to schedule process order into time period with insufficient capacity (overload) — Risk: CRITICAL — ACs: AC-3
  NEG-02: Schedule two incompatible products back-to-back without accounting for required changeover time — Risk: CRITICAL — ACs: AC-5

Error Scenarios:
  ERR-01: Attempt to reschedule process order to a past date — Risk: HIGH — ACs: AC-4
  ERR-02: Attempt to reschedule process order to a work center without capability for the material — Risk: HIGH — ACs: AC-4
  ERR-03: Attempt to access capacity planning for non-existent work center — Risk: MEDIUM — ACs: AC-1, AC-2

Edge Cases:
  EDGE-01: View capacity planning at 100% utilization (no overload) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-02: View capacity planning at 0% utilization (idle work center) — Risk: LOW — ACs: AC-2
  EDGE-03: Reschedule process order with zero changeover time (same product continuation) — Risk: LOW — ACs: AC-5

Integration Scenarios:
  INT-01: Reschedule process order from Capacity Planning and verify process order header updated in Manage Process Orders app — Risk: HIGH — Linked: Process Order Management
  INT-02: Reschedule process order and verify material availability dates re-calculated in MRP — Risk: MEDIUM — Linked: Material Requirements Planning
  INT-03: Confirm operation in Shop Floor Execution and verify capacity load updated in Capacity Planning — Risk: MEDIUM — Linked: Shop Floor Execution

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core capacity viewing, overload detection, rescheduling, changeover time inclusion |
| AP | 1 | Alternative action: resequence vs reschedule |
| NEG | 2 | Overload prevention + changeover omission |
| ERR | 3 | Invalid reschedule date, invalid work center capability, non-existent work center |
| EDGE | 3 | Boundary capacity utilization (0%, 100%) + zero changeover time |
| INT | 3 | Process Order Management, MRP, Shop Floor Execution cross-module dependencies |
| **TOTAL** | **16** | |
