# Story Analysis: [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-60/CS-60.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Maintenance Planner |
| Core Action | Maintain a Resource/Work Center Master for validated production equipment |
| Business Goal | Process Orders can only be scheduled on equipment that is currently within its qualification and calibration validity period |
| Business Object | Work Center Master Record with Calibration/Qualification tracking |
| SAP Module | PP — Production Planning (with PM — Plant Maintenance integration) |
| Complexity | Complex (inferred from multi-system integration, regulatory compliance, and capacity planning automation) |

### Implicit Business Rules (Domain-Inferred)
- Work Center must be created in SAP before calibration dates can be maintained (Work Center Type = "Machine" or "Production Resource/Tool")
- Calibration/Qualification validity must be maintained in Equipment Master (PM) and linked to Work Center (PP)
- Process Order operations reference Work Centers via routing/recipe → capacity availability check must evaluate calibration status
- Equipment technical object (functional location or equipment) must exist in PM module and be assigned to the Work Center
- Alerts require background job configuration (notification variant, alert recipient determination, lead-time threshold)
- Batch traceability requires integration with QM (Quality Management) for equipment-specific batch record linkage
- "Out of service" status update must trigger capacity recalculation across all open/planned Process Orders
- Requalification workflow must update Equipment Master → propagate to Work Center → trigger capacity recalculation
- GMP/FDA 21 CFR Part 11 compliance implied for pharmaceutical/life sciences regulated industries (audit trail, electronic signature)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Work Centers" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system captures the equipment's qualification/calibration expiration date on the work center master. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP, EDGE | 3 |
| AC-3 | The system prevents scheduling a process order operation on a work center whose calibration has expired. | VALIDATION_NEGATIVE | CRITICAL | EP, DT | NEG | 2 |
| AC-4 | The system generates an alert to Maintenance a configurable number of days before a work center's calibration is due to expire. | BUSINESS_RULE | HIGH | EP, BVA | HP, EDGE | 3 |
| AC-5 | Equipment taken out of service for maintenance is automatically excluded from capacity planning until requalified. | BUSINESS_RULE | CRITICAL | EP, ST | HP, AP | 2 |
| AC-6 | The batch record references the specific equipment/work center used, including its calibration status at time of use. | INTEGRATION | CRITICAL | EP | INT | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Work Center ID | Work Center | Alphanumeric (8 chars) | Yes | Must be unique within Plant |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Existing plant in SAP org structure |
| Work Center Category | Category | Dropdown | Yes | "0001" (Machine), "0002" (Production Resource/Tool), etc. |
| Equipment Number | Equipment | Alphanumeric (18 chars) | No (but required for calibration tracking) | Existing Equipment Master record from PM |
| Calibration Expiration Date | Next Calibration Due | Date (DD.MM.YYYY) | No | Future date only (validation: >= Today) |
| Qualification Expiration Date | Next Qualification Due | Date (DD.MM.YYYY) | No | Future date only (validation: >= Today) |
| Alert Lead Time (Days) | Alert Lead Time | Numeric (0-999) | No | Integer >= 0; default = 30 days |
| Capacity Utilization | Available capacity | Time (minutes or hours) | Yes | > 0 |
| Work Center Status | System Status | Dropdown | System-controlled | "Released", "Out of Service", "In Maintenance" |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Work Center Description | Description | Confirm Equipment Number | Equipment Master EQUI table — Equipment Description |
| Responsible Person | Person Responsible | Confirm Plant | Organizational Management — Plant assignment |
| Capacity Category | Capacity Category | Confirm Work Center Category | Standard SAP configuration table (T001W / CRHD) |
| Current Calibration Status | Calibration Status | System evaluation on display | Calculated: if (Today <= Calibration Expiration) then "Valid" else "Expired" |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Work Center Master Record | SAP Work Center document created/updated | Work Center ID (8-digit alphanumeric) |
| Alert Notification | Maintenance alert generated if calibration expiring soon | Notification Number (12-digit numeric, begins with "1" for PM notifications) |
| Capacity Planning Exclusion | Work Center removed from available capacity pool | System status change → capacity recalculation triggered |
| Batch Record Equipment Link | Equipment ID and calibration status stamped to batch production record | Batch Number + Equipment ID + Calibration Status + Timestamp |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Calibration Expiration Date | Today (minimum valid) | No upper limit (system date field max) | Past date (invalid — validation error expected) | Must be >= Today |
| Qualification Expiration Date | Today (minimum valid) | No upper limit | Past date (invalid — validation error expected) | Must be >= Today |
| Alert Lead Time (Days) | 0 (alert on expiration day only) | 999 days (system field max) | 0 (valid — no advance warning) | Per configuration; 30 days = typical |
| Available Capacity | 1 minute (minimum valid) | 999,999 minutes (system field max) | 0 (invalid — capacity must be > 0) | Per capacity unit (minutes/hours/days) |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Process Order scheduling on expired equipment | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance failure (GMP/FDA); invalid production batch; product recall risk; audit finding |
| Calibration date capture and validation | HIGH | MEDIUM | HIGH | Master data integrity; incorrect calibration status → downstream scheduling errors |
| Alert generation for expiring calibration | HIGH | MEDIUM | HIGH | Equipment downtime risk if alerts missed; missed maintenance windows |
| Capacity planning exclusion (out of service) | CRITICAL | MEDIUM | CRITICAL | Production schedule disruption; order fulfillment delays; capacity overcommitment |
| Batch record equipment traceability | CRITICAL | LOW | CRITICAL | Regulatory traceability requirement (GMP 21 CFR Part 11); audit trail completeness |
| Navigation/Access to Manage Work Centers app | LOW | LOW | LOW | UI access; cosmetic risk |
| Alert lead-time boundary (0 days, 999 days) | MEDIUM | MEDIUM | MEDIUM | Configuration flexibility; edge cases must not crash alert job |
| Equipment requalification workflow | HIGH | MEDIUM | HIGH | Equipment re-entry into capacity pool; status transition validation |

---

## Integration Risk

**Integration Dependencies Identified:**

| Linked Module/System | Integration Risk | Scenario Needed |
|---------------------|-----------------|-----------------|
| PM (Plant Maintenance) — Equipment Master | HIGH | INT-01: Calibration dates maintained in PM Equipment Master must sync to PP Work Center Master |
| PP (Production Planning) — Process Order Scheduling | CRITICAL | INT-02: Scheduling engine must query calibration status before assigning operations to Work Centers |
| PM (Plant Maintenance) — Maintenance Notifications | HIGH | INT-03: Alert generation must create PM Notification and trigger workflow to Maintenance Planner |
| QM (Quality Management) — Batch Records | CRITICAL | INT-04: Batch production record must reference Equipment ID + calibration status from Work Center at time of production order confirmation |
| Background Job Scheduler | MEDIUM | INT-05: Daily background job must scan all Work Centers, compare calibration dates to alert lead-time, and generate notifications |

**Note:** No linked Jira issues in `issuelinks` array, but domain analysis reveals deep cross-module integration typical of SAP PP-PM-QM regulated manufacturing scenarios.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-60: Maintain A Resource/Work Center Master For Validated Production Equipm
Module: PP (Production Planning) with PM/QM integration

**Happy Path Scenarios:**
  HP-01: Create Work Center with valid calibration date and verify capacity planning eligibility — Risk: HIGH — ACs: AC-1, AC-2, AC-5
  HP-02: Update existing Work Center with new calibration expiration date — Risk: MEDIUM — ACs: AC-2
  HP-03: Verify alert generated when calibration expiration is within alert lead-time threshold — Risk: HIGH — ACs: AC-4
  HP-04: Verify batch record captures Work Center ID and calibration status at production confirmation — Risk: CRITICAL — ACs: AC-6

**Alternative Path Scenarios:**
  AP-01: Mark Work Center as "Out of Service" and verify automatic exclusion from capacity planning — Risk: CRITICAL — ACs: AC-5
  AP-02: Requalify Work Center (update calibration date post-maintenance) and verify re-inclusion in capacity planning — Risk: HIGH — ACs: AC-5
  AP-03: Configure custom alert lead-time (non-default value) and verify alert timing — Risk: MEDIUM — ACs: AC-4

**Negative Scenarios:**
  NEG-01: Attempt to schedule Process Order operation on Work Center with expired calibration — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt to schedule Process Order operation on Work Center marked "Out of Service" — Risk: CRITICAL — ACs: AC-3, AC-5
  NEG-03: Enter past date as calibration expiration date and verify validation error — Risk: HIGH — ACs: AC-2

**Error Scenarios:**
  ERR-01: Missing Work Center ID — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Plant — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Work Center Category — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Equipment Number (when calibration tracking required) — Risk: MEDIUM — ACs: AC-2

**Edge Cases:**
  EDGE-01: Calibration expiration date = Today (minimum valid boundary) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Alert lead-time = 0 days (alert on expiration day only) — Risk: MEDIUM — ACs: AC-4
  EDGE-03: Alert lead-time = 999 days (maximum boundary) — Risk: LOW — ACs: AC-4
  EDGE-04: Available capacity = 1 minute (minimum valid) — Risk: MEDIUM — ACs: AC-5
  EDGE-05: Calibration expiration date = exactly alert lead-time days from today (boundary trigger) — Risk: HIGH — ACs: AC-4

**Integration Scenarios:**
  INT-01: Calibration date in Equipment Master (PM) propagates to Work Center Master (PP) — Risk: HIGH — Integration: PM ↔ PP
  INT-02: Process Order scheduling engine queries Work Center calibration status before assignment — Risk: CRITICAL — Integration: PP scheduling logic
  INT-03: Alert notification created in PM Notifications module and routed to Maintenance Planner — Risk: HIGH — Integration: PP → PM Notifications
  INT-04: Batch record in QM captures Equipment ID and calibration status from Work Center at production confirmation — Risk: CRITICAL — Integration: PP → QM Batch Management
  INT-05: Background job scans Work Centers and generates alerts based on configurable lead-time — Risk: HIGH — Integration: Background Job Framework

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core create/update Work Center with calibration, alert generation, and batch traceability |
| AP | 3 | Out-of-service workflow, requalification, custom alert lead-time |
| NEG | 3 | Prevent scheduling on expired/out-of-service equipment, past date validation |
| ERR | 4 | Mandatory fields: Work Center ID, Plant, Category, Equipment Number (when calibration required) |
| EDGE | 5 | Date boundaries (today, past), alert lead-time boundaries (0, 999, exact threshold), capacity minimum |
| INT | 5 | PM Equipment Master sync, PP scheduling validation, PM Notification generation, QM Batch record linkage, Background job alert generation |
| **TOTAL** | **24** | |
