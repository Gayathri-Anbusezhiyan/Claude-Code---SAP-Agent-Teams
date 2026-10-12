# Story Analysis: [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-46/CS-46.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Contract Administrator |
| Core Action | Maintain a Customer Scheduling Agreement for recurring pharmaceutical supply |
| Business Goal | Enable hospital to receive regular shipments of critical medications without creating individual sales orders for each delivery |
| Business Object | Scheduling Agreement (SAP SD document type) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (6 detailed ACs + advanced scheduling logic + call-off tracking) |

### Implicit Business Rules (Domain-Inferred)
- Customer (hospital) must exist in customer master (KNA1) and be assigned to the sales organization
- Material (pharmaceutical) must exist in material master (MARA/MARC) and be configured for the sales organization and distribution channel
- Sales Organization, Distribution Channel, and Division must be valid combinations per SAP configuration
- Delivery schedule lines must respect SAP calendar (working days, holidays) if configured
- Call-off quantities cannot exceed the remaining quantity under the Scheduling Agreement
- Each call-off must reference a valid delivery schedule line
- Notification thresholds must be pre-configured in SAP or defined at agreement creation
- User must have authorization for transaction VA31/VA32 (Create/Change Scheduling Agreement)
- Material must be available for scheduling agreement document type (not blocked for scheduling agreements)
- Validity period must align with fiscal calendar constraints (if any)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Scheduling Agreement specifying the customer (hospital), material (pharmaceutical product), total quantity, validity period, and delivery schedule. | BUSINESS_RULE | CRITICAL | EP, DT | HP | 1 |
| AC-2 | The system allows the user to define delivery schedules as fixed dates (e.g., first Monday of each month) or intervals (e.g., every 14 days). | BUSINESS_RULE | HIGH | EP, DT | HP + AP(fixed dates) + AP(intervals) | 3 |
| AC-3 | The system automatically creates delivery schedule lines for each scheduled delivery date within the validity period. | VALIDATION_POSITIVE | CRITICAL | EP | HP | 1 |
| AC-4 | The system allows the hospital to call off deliveries against the Scheduling Agreement by confirming the delivery schedule lines. | BUSINESS_RULE | HIGH | EP | HP | 1 |
| AC-5 | The system tracks the cumulative quantity called off and remaining quantity under the Scheduling Agreement. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP + EDGE(boundary tracking) | 2 |
| AC-6 | The system sends a notification to the Sales team when the Scheduling Agreement is nearing its validity end date or when the remaining quantity falls below a threshold. | SUCCESS_CONFIRMATION | MEDIUM | EP, BVA | HP + EDGE(threshold) + EDGE(end date) | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer ID | Sold-To Party | Alphanumeric | Yes | Existing customer in SAP master (KNA1) |
| Material ID | Material | Alphanumeric | Yes | Existing material in SAP master (MARA), enabled for scheduling agreements |
| Total Quantity | Target Quantity | Numeric | Yes | Must be > 0, per UoM |
| Validity Start Date | Valid From | Date | Yes | Valid date (YYYY-MM-DD), >= today |
| Validity End Date | Valid To | Date | Yes | Valid date, must be > Valid From |
| Delivery Schedule Type | Schedule Type | Selection | Yes | "Fixed Dates" or "Interval" |
| Fixed Dates | Delivery Dates | Date List | Conditional | List of dates within validity period (if Fixed Dates selected) |
| Interval | Interval (Days) | Numeric | Conditional | 1-365 days between deliveries (if Interval selected) |
| Notification Threshold | Threshold Quantity | Numeric | Optional | Percentage or absolute quantity for notification trigger |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-To Party Name | Confirm Customer ID | Customer master KNA1 |
| Material Description | Material Description | Confirm Material ID | Material master MARA |
| Sales Organization | Sales Org | Confirm Customer ID | Customer sales area data KNVV |
| Distribution Channel | Distr. Channel | Confirm Customer ID | Customer sales area data KNVV |
| Division | Division | Confirm Customer ID | Customer sales area data KNVV |
| Unit of Measure | UoM | Confirm Material ID | Material master MARA |
| Delivery Schedule Lines | Schedule Lines | Schedule Type + Dates/Interval + Validity Period | System calculation based on schedule definition |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Scheduling Agreement Number | Unique SAP-generated Scheduling Agreement document number | 10-digit numeric, e.g., 5500000123 |
| Delivery Schedule Line IDs | Line item numbers for each scheduled delivery | Sequential line numbers (10, 20, 30...) |
| Cumulative Quantity Called Off | Total quantity confirmed for delivery across all call-offs | Numeric, updated with each call-off |
| Remaining Quantity | Calculated: Total Quantity - Cumulative Quantity Called Off | Numeric, decreases with each call-off |
| Notification Status | Indicates if threshold notification has been triggered | Boolean or status flag |
| Notification Message | Notification sent to Sales team | Text message with agreement number, remaining qty, or validity end date |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Total Quantity | 1 (minimum valid) | System-configured maximum per UoM | 0 (invalid) | Must be positive |
| Validity Start Date | Today's date | Max future date allowed by SAP | Past date (invalid) | Cannot create agreements for past periods |
| Validity End Date | Validity Start Date + 1 day | Max future date allowed by SAP | Before start date (invalid) | Must be after start date |
| Interval (Days) | 1 (daily delivery) | 365 (annual delivery) | 0 (invalid) | Reasonable interval range |
| Notification Threshold | 1% or 1 unit | 100% or total quantity | 0 (no notification) | Percentage or absolute value |
| Fixed Dates Count | 1 (minimum one delivery) | System-configured max schedule lines | 0 (invalid) | At least one delivery date required |
| Call-off Quantity per Line | 1 (minimum) | Remaining quantity on that line | 0 (invalid) | Cannot call off zero or exceed remaining |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Scheduling Agreement creation | CRITICAL | MEDIUM | CRITICAL | Core SD transactional operation — failure blocks hospital supply chain |
| Customer (hospital) validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid customer blocks agreement |
| Material (pharmaceutical) validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid material blocks agreement |
| Delivery schedule line generation | CRITICAL | MEDIUM | CRITICAL | Complex date calculation logic — errors lead to wrong delivery dates |
| Call-off tracking (cumulative/remaining qty) | HIGH | MEDIUM | HIGH | Quantity accuracy critical for hospitals — errors cause stock-outs or overstocking |
| Notification logic (threshold/end date) | MEDIUM | MEDIUM | MEDIUM | Business alert — not transactional, but important for proactive management |
| Date/interval calculations | HIGH | HIGH | HIGH | Complex scheduling logic prone to boundary errors (leap years, month-end, intervals) |
| Mandatory field enforcement | HIGH | LOW | HIGH | UI enforces, but critical for data integrity |
| Validity period constraints | MEDIUM | MEDIUM | MEDIUM | Date boundary errors (start > end, past dates) |
| Navigation/Access to VA31/VA32 | LOW | LOW | LOW | Cosmetic risk — easily detected |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-46: Maintain Customer Scheduling Agreement for hospital recurring supply
Module: SD — Sales & Distribution

**Happy Path Scenarios:**
  HP-01: Create Scheduling Agreement with valid customer, material, total quantity, validity period, and fixed-date delivery schedule — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
  HP-02: Create Scheduling Agreement with interval-based delivery schedule (e.g., every 14 days) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
  HP-03: Call off delivery against a Scheduling Agreement by confirming a schedule line — Risk: HIGH — ACs: AC-4, AC-5
  HP-04: Notification triggered when remaining quantity falls below threshold — Risk: MEDIUM — ACs: AC-6
  HP-05: Notification triggered when Scheduling Agreement nears validity end date — Risk: MEDIUM — ACs: AC-6

**Alternative Path Scenarios:**
  AP-01: Create Scheduling Agreement with fixed dates (specific calendar dates) — Risk: HIGH — ACs: AC-2, AC-3
  AP-02: Create Scheduling Agreement with interval (days between deliveries) — Risk: HIGH — ACs: AC-2, AC-3
  AP-03: Multiple call-offs against the same Scheduling Agreement (cumulative tracking) — Risk: HIGH — ACs: AC-4, AC-5

**Negative Scenarios:**
  NEG-01: Attempt to create Scheduling Agreement with non-existent customer ID — Risk: HIGH — ACs: AC-1
  NEG-02: Attempt to create Scheduling Agreement with non-existent material ID — Risk: HIGH — ACs: AC-1
  NEG-03: Attempt to create Scheduling Agreement with material not enabled for scheduling agreements — Risk: HIGH — ACs: AC-1
  NEG-04: Attempt to create Scheduling Agreement with customer not assigned to sales organization — Risk: HIGH — ACs: AC-1
  NEG-05: Attempt to create Scheduling Agreement with validity end date before start date — Risk: HIGH — ACs: AC-1
  NEG-06: Attempt to create Scheduling Agreement with validity start date in the past — Risk: HIGH — ACs: AC-1
  NEG-07: Attempt to call off quantity exceeding remaining quantity under Scheduling Agreement — Risk: HIGH — ACs: AC-4, AC-5
  NEG-08: Attempt to confirm schedule line that does not exist or is already fully called off — Risk: HIGH — ACs: AC-4

**Error Scenarios (Missing Mandatory Fields):**
  ERR-01: Missing Customer ID field — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material ID field — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Total Quantity field — Risk: HIGH — ACs: AC-1
  ERR-04: Missing Validity Start Date field — Risk: HIGH — ACs: AC-1
  ERR-05: Missing Validity End Date field — Risk: HIGH — ACs: AC-1
  ERR-06: Missing Delivery Schedule Type selection — Risk: HIGH — ACs: AC-2
  ERR-07: Missing Fixed Dates when Fixed Dates schedule type selected — Risk: HIGH — ACs: AC-2
  ERR-08: Missing Interval when Interval schedule type selected — Risk: HIGH — ACs: AC-2

**Edge Cases (Boundary Values):**
  EDGE-01: Create Scheduling Agreement with minimum valid total quantity (1 unit) — Risk: MEDIUM — ACs: AC-1
  EDGE-02: Create Scheduling Agreement with zero total quantity (invalid) — Risk: MEDIUM — ACs: AC-1
  EDGE-03: Create Scheduling Agreement with maximum allowed total quantity — Risk: MEDIUM — ACs: AC-1
  EDGE-04: Create Scheduling Agreement with minimum interval (1 day) — Risk: MEDIUM — ACs: AC-2
  EDGE-05: Create Scheduling Agreement with maximum reasonable interval (365 days) — Risk: MEDIUM — ACs: AC-2
  EDGE-06: Create Scheduling Agreement with zero interval (invalid) — Risk: MEDIUM — ACs: AC-2
  EDGE-07: Create Scheduling Agreement with single fixed delivery date (minimum) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-08: Call off exact remaining quantity (boundary condition) — Risk: MEDIUM — ACs: AC-4, AC-5
  EDGE-09: Call off when cumulative quantity equals total quantity (no remaining) — Risk: MEDIUM — ACs: AC-5
  EDGE-10: Notification threshold at 0% (no notification) — Risk: LOW — ACs: AC-6
  EDGE-11: Notification threshold at 100% (immediate notification) — Risk: LOW — ACs: AC-6
  EDGE-12: Validity period of 1 day (minimum) — Risk: MEDIUM — ACs: AC-1, AC-3
  EDGE-13: Validity start date = today (earliest possible) — Risk: LOW — ACs: AC-1

**Integration Scenarios:**
  (None — no linked issues identified)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 5 | 1 for fixed-date creation, 1 for interval creation, 1 for call-off, 2 for notifications (threshold + end date) |
| AP | 3 | 1 for fixed dates, 1 for intervals, 1 for multiple call-offs (alternative valid paths) |
| NEG | 8 | 2 for customer/material validation, 1 for material not enabled, 1 for customer not assigned, 2 for date validation, 2 for call-off validation |
| ERR | 8 | 8 mandatory fields (Customer, Material, Total Qty, Valid From, Valid To, Schedule Type, Fixed Dates/Interval conditional) |
| EDGE | 13 | 3 for quantity boundaries, 3 for interval boundaries, 1 for fixed date minimum, 2 for call-off boundaries, 2 for notification threshold boundaries, 2 for validity period boundaries |
| INT | 0 | None — no linked issues |
| **TOTAL** | **37** | Comprehensive coverage for complex scheduling agreement functionality |
