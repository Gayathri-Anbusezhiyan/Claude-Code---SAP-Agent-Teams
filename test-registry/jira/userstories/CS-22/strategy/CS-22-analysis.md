# Story Analysis: [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject

**Analysed:** 2026-08-24
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** test-registry/jira/userstories/CS-22/CS-22.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Manager |
| Core Action | View an aggregated Vendor Quality Scorecard |
| Business Goal | Make informed sourcing decisions for regulated materials |
| Business Object | Vendor Evaluation Report |
| SAP Module | MM — Materials Management |
| Complexity | Medium (No story points assigned) |

### Implicit Business Rules (Domain-Inferred)
- Vendor quality scorecard aggregates data from Quality Inspection (QM) module — requires integration with QM inspection lots and results
- Batch acceptance rate calculated from inspection lot decisions (Accepted/Rejected/Conditional) over a time period
- On-time delivery metrics require integration between MM Purchase Orders and Goods Receipt timestamps
- Quality threshold configuration must exist in customizing (configurable per material type or purchasing organization)
- Drill-down navigation requires inspection lot data to be accessible and linked to vendor master
- Export functionality must generate audit-compliant reports meeting GMP (Good Manufacturing Practice) regulatory standards
- User must have authorization for QM analytical apps and vendor evaluation reports
- Scorecard aggregation may span multiple plants and purchasing organizations

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access a "Vendor Evaluation" Fiori analytical app. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system calculates and displays a vendor's batch acceptance rate over a configurable time period. | BUSINESS_RULE | CRITICAL | EP, BVA | HP + AP + EDGE | 4 |
| AC-3 | The system displays on-time delivery performance based on PO delivery dates versus actual goods receipt dates. | BUSINESS_RULE | CRITICAL | EP, BVA | HP + NEG | 3 |
| AC-4 | The user can drill down from the scorecard into individual rejected inspection lots. | NAVIGATION | HIGH | EP | HP + NEG | 2 |
| AC-5 | The system flags vendors falling below a configurable quality threshold with a visual indicator. | VALIDATION_POSITIVE | HIGH | EP, BVA, DT | HP + AP + NEG | 3 |
| AC-6 | The scorecard can be exported for inclusion in periodic GMP vendor audit reports. | SUCCESS_CONFIRMATION | HIGH | EP | HP + ERR | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Vendor ID | Vendor | Alphanumeric | Yes | Existing vendor in SAP vendor master (LFA1) |
| Time Period From | From Date | Date | Yes | Past date, must be before To Date |
| Time Period To | To Date | Date | Yes | Current or past date, must be after From Date |
| Purchasing Organization | Purchasing Org | Alphanumeric | No | Valid purchasing organization (T024E) |
| Plant | Plant | Alphanumeric | No | Valid plant code (T001W) |
| Material Group | Material Group | Alphanumeric | No | Valid material group (T023) |
| Quality Threshold | Threshold % | Numeric | No | 0-100 (percentage) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Vendor Name | Vendor Name | Confirm Vendor ID | Vendor master LFA1-NAME1 |
| Total Inspection Lots | Total Lots | Load scorecard | QM inspection lot count (QALS) |
| Accepted Lots | Accepted | Load scorecard | Inspection decision = Accepted (QALS-VFDAT) |
| Rejected Lots | Rejected | Load scorecard | Inspection decision = Rejected (QALS-VFDAT) |
| Batch Acceptance Rate | Acceptance Rate % | Calculate | (Accepted / Total) × 100 |
| On-Time Deliveries | On-Time Count | Calculate | GR date <= PO delivery date |
| Late Deliveries | Late Count | Calculate | GR date > PO delivery date |
| On-Time Delivery Rate | OTD Rate % | Calculate | (On-Time / Total Deliveries) × 100 |
| Threshold Status | Status Indicator | Apply threshold rule | Visual flag (Green/Yellow/Red) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Vendor Quality Scorecard | Aggregated analytical view | Dashboard with KPI tiles |
| Batch Acceptance Rate | Calculated percentage | Numeric percentage (2 decimal places) |
| On-Time Delivery Rate | Calculated percentage | Numeric percentage (2 decimal places) |
| Visual Status Indicator | Quality threshold flag | Icon or color badge (Red/Yellow/Green) |
| Inspection Lot Detail View | Drill-down navigation target | List of inspection lots with status |
| Exported Report | GMP-compliant audit report | PDF or Excel format with vendor scorecard data |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Time Period (days) | 1 day (minimum) | System-configured (e.g., 3 years historical data) | 0 (invalid) | Period must span at least 1 day |
| Quality Threshold % | 0% (always flag) | 100% (never flag) | 0 (valid — flags all vendors) | Configurable per organization |
| Batch Acceptance Rate | 0% (all rejected) | 100% (all accepted) | 0 (valid — no accepted lots) | Division by zero if no lots |
| On-Time Delivery Rate | 0% (all late) | 100% (all on-time) | 0 (valid — no on-time deliveries) | Division by zero if no deliveries |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch acceptance rate calculation | CRITICAL | MEDIUM | CRITICAL | Incorrect calculation leads to wrong sourcing decisions; financial and compliance risk |
| On-time delivery performance calculation | CRITICAL | MEDIUM | CRITICAL | Impacts vendor selection and supply chain reliability |
| Quality threshold flagging | HIGH | MEDIUM | HIGH | Misidentified vendors may result in poor quality materials entering production |
| Drill-down to inspection lots | HIGH | LOW | HIGH | Essential for root cause analysis; data integrity dependency |
| Vendor Evaluation app access | MEDIUM | LOW | MEDIUM | Authorization and navigation — cosmetic if fails but blocks all analysis |
| Export to GMP audit report | HIGH | MEDIUM | HIGH | Regulatory compliance requirement; export failure impacts audit readiness |
| Time period configuration | MEDIUM | MEDIUM | MEDIUM | Incorrect period may show incomplete or misleading data |
| Division by zero handling | MEDIUM | LOW | MEDIUM | If no inspection lots or deliveries exist, system must handle gracefully |

---

## Integration Risk

**Integration Dependencies Identified:**
- **QM (Quality Management) Module**: Inspection lot data (QALS, QAVE) — batch acceptance/rejection decisions
- **MM Purchase Orders**: PO delivery dates (EKPO-EINDT)
- **MM Goods Receipt**: Actual GR timestamps (MKPF-BUDAT, MSEG)
- **Vendor Master (LFA1)**: Vendor names and organizational assignments
- **Customizing**: Quality threshold configuration tables

No linked issues found in `linkedIssues` array, but functional integration risk is HIGH due to cross-module data aggregation dependencies.

| Integration Area | Type | Integration Risk | Scenario Needed |
|-----------------|------|-----------------|-----------------|
| QM Inspection Lot Data | Cross-module | HIGH | INT-01: Verify scorecard reflects inspection lot results from QM |
| MM PO and GR Date Comparison | Cross-module | HIGH | INT-02: Verify on-time delivery calculation spans PO and GR documents |
| Vendor Master Lookup | Master Data | MEDIUM | Covered in HP scenarios via vendor validation |

---

## Scenario Inventory

**SCENARIO INVENTORY — CS-22: View An Aggregated Vendor Quality Scorecard Based On Inspection Reject**
Module: MM — Materials Management

**Happy Path Scenarios:**
  HP-01: Access Vendor Evaluation app and view scorecard for valid vendor with inspection history — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5
  HP-02: View batch acceptance rate for configurable time period (standard period, e.g., last 90 days) — Risk: CRITICAL — ACs: AC-2
  HP-03: View on-time delivery performance with valid PO and GR data — Risk: CRITICAL — ACs: AC-3
  HP-04: Drill down from scorecard to inspection lot details for rejected lots — Risk: HIGH — ACs: AC-4
  HP-05: Export vendor quality scorecard to audit-compliant report format — Risk: HIGH — ACs: AC-6

**Alternative Path Scenarios:**
  AP-01: View scorecard with custom time period (e.g., last 12 months) — Risk: MEDIUM — ACs: AC-2
  AP-02: View scorecard filtered by specific purchasing organization or plant — Risk: MEDIUM — ACs: AC-2, AC-3
  AP-03: View vendor with quality threshold met (above threshold, green status) — Risk: HIGH — ACs: AC-5
  AP-04: View vendor with quality threshold warning (near threshold, yellow status) — Risk: HIGH — ACs: AC-5

**Negative Scenarios:**
  NEG-01: Attempt to view scorecard for non-existent vendor ID — Risk: MEDIUM — ACs: AC-1, AC-2
  NEG-02: Attempt to view scorecard for vendor with no inspection history (zero lots) — Risk: MEDIUM — ACs: AC-2
  NEG-03: Attempt to drill down when no rejected inspection lots exist — Risk: MEDIUM — ACs: AC-4
  NEG-04: View on-time delivery when vendor has no purchase orders or goods receipts — Risk: MEDIUM — ACs: AC-3
  NEG-05: Vendor falls below quality threshold (red flag) — Risk: HIGH — ACs: AC-5

**Error Scenarios:**
  ERR-01: Missing Vendor ID field — Risk: MEDIUM — ACs: AC-1
  ERR-02: Invalid date range (To Date before From Date) — Risk: MEDIUM — ACs: AC-2
  ERR-03: Export fails due to insufficient authorization — Risk: HIGH — ACs: AC-6

**Edge Cases:**
  EDGE-01: Time period = 1 day (minimum boundary) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Time period = maximum historical data range (e.g., 3 years) — Risk: MEDIUM — ACs: AC-2
  EDGE-03: Quality threshold = 0% (all vendors flagged) — Risk: MEDIUM — ACs: AC-5
  EDGE-04: Quality threshold = 100% (no vendors flagged) — Risk: MEDIUM — ACs: AC-5
  EDGE-05: Batch acceptance rate = 0% (all lots rejected) — Risk: HIGH — ACs: AC-2, AC-5
  EDGE-06: Batch acceptance rate = 100% (all lots accepted) — Risk: LOW — ACs: AC-2, AC-5
  EDGE-07: On-time delivery rate = 0% (all deliveries late) — Risk: HIGH — ACs: AC-3, AC-5
  EDGE-08: On-time delivery rate = 100% (all deliveries on-time) — Risk: LOW — ACs: AC-3

**Integration Scenarios:**
  INT-01: Verify batch acceptance rate aggregates inspection lot results from QM module — Risk: HIGH — Integration: QM inspection lots
  INT-02: Verify on-time delivery calculation uses PO delivery dates and GR actual dates — Risk: HIGH — Integration: MM PO + GR documents

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 5 | Core happy paths covering all 6 ACs: app access, acceptance rate, OTD, drill-down, threshold flagging, export |
| AP | 4 | Alternative valid paths: custom time period, org/plant filters, threshold met/warning states |
| NEG | 5 | Invalid vendor, no data scenarios, no rejected lots, threshold breach |
| ERR | 3 | Missing mandatory field (vendor), invalid date range, export authorization failure |
| EDGE | 8 | Boundary conditions for time period, quality threshold, acceptance rate, OTD rate |
| INT | 2 | Cross-module validation: QM inspection lot aggregation, PO+GR date comparison |
| **TOTAL** | **27** | |
