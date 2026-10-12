# Story Analysis: [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-58/CS-58.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Operator |
| Core Action | Record Environmental Monitoring readings (cleanroom particle counts, temperature, humidity) against an active Process Order |
| Business Goal | Document environmental conditions during manufacturing as part of the batch record |
| Business Object | Process Order (Environmental Monitoring Data) |
| SAP Module | PP — Production Planning and Control (GMP/Life Sciences vertical) |
| Complexity | Complex (estimated 8 SP — environmental monitoring + range validation + automatic deviation triggering + EBR integration + trend reporting) |

### Implicit Business Rules (Domain-Inferred)
- Process Order must exist and be in active "In Process" status before environmental readings can be recorded
- Environmental monitoring operation must be configured in Process Order routing with environmental control flag enabled
- Acceptable range specifications (min/max thresholds) must be pre-defined in SAP master data (inspection characteristics or process parameters)
- Out-of-range readings must not block order confirmation (readings recorded first, deviation triggered after)
- Deviation records must reference the specific Process Order operation, timestamp, and reading parameter
- Electronic Batch Record (EBR) compilation must aggregate all environmental readings from all operations within the Process Order
- User must have PP_PROC_ORDER_CONFIRM authorization object with activity 02 (Change)
- Trend reporting requires historical data retention (multi-batch query capability)
- Environmental readings are time-stamped and immutable once saved (audit trail requirement for GMP compliance)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Confirm Process Order" Fiori app with an environmental monitoring input step. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system requires entry of environmental readings at the process order operations flagged as environmentally controlled. | MANDATORY_FIELD | HIGH | EP | HP + ERR (missing readings) | 2 |
| AC-3 | The system compares entered readings against predefined acceptable ranges and flags any out-of-range value. | VALIDATION_POSITIVE + VALIDATION_NEGATIVE | CRITICAL | EP, BVA | HP (in-range) + NEG (out-of-range) + EDGE (boundary values) | 4 |
| AC-4 | An out-of-range environmental reading automatically triggers a linked deviation record. | INTEGRATION | CRITICAL | EP | HP (verify deviation created + linked) | 1 |
| AC-5 | Environmental monitoring data is included in the compiled Electronic Batch Record. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (verify EBR contains readings) | 1 |
| AC-6 | A trend report is available to track environmental conditions across batches and production suites over time. | BUSINESS_RULE | MEDIUM | EP | HP (verify report shows multi-batch trend data) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Process Order Number | Process Order | Alphanumeric (12-digit) | Yes | Existing active Process Order with environmental monitoring operation |
| Operation Number | Operation | Numeric (4-digit) | Yes | Operation flagged as environmentally controlled |
| Particle Count | Particle Count (Particles/m³) | Numeric (Integer) | Yes (if flagged) | 0 to system-configured max (e.g., ISO 5 cleanroom = 0-3520) |
| Temperature | Temperature (°C) | Numeric (Decimal, 1 place) | Yes (if flagged) | System-configured range (e.g., 18.0 to 25.0) |
| Humidity | Relative Humidity (%) | Numeric (Decimal, 1 place) | Yes (if flagged) | System-configured range (e.g., 30.0 to 60.0) |
| Reading Timestamp | Timestamp | Date/Time | Auto-generated | Current system timestamp |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Process Order Description | Order Description | Confirm Process Order selection | AUFK-KTEXT (Process Order master) |
| Material | Material | Confirm Process Order selection | AFKO-MATNR (Process Order material) |
| Batch | Batch Number | Confirm Process Order selection | AFKO-CHARG (if batch-managed) |
| Operation Short Text | Operation Description | Confirm Operation selection | AFVC-LTXA1 (Operation routing text) |
| Acceptable Range Lower Limit | Min Value | Load Operation/Characteristic | Inspection plan/process parameter master |
| Acceptable Range Upper Limit | Max Value | Load Operation/Characteristic | Inspection plan/process parameter master |
| Production Suite | Work Center | Confirm Operation selection | AFVC-ARBPL (Operation work center) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Confirmation Number | Unique confirmation number (AFRU) | 10-digit numeric |
| Out-of-Range Flag | Visual indicator (if reading violates range) | Boolean (icon/color in UI) |
| Deviation Record Number | Linked QM deviation/notification number | 12-digit alphanumeric (begins with QM prefix) |
| EBR Entry ID | Electronic Batch Record line item reference | System-internal ID |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Particle Count | 0 (lower limit) | ISO-class-specific max (e.g., 3520 for ISO 5) | 0 (valid — cleanroom ideal) | Out-of-range triggers deviation |
| Temperature | System-configured min (e.g., 18.0°C) | System-configured max (e.g., 25.0°C) | N/A (must be positive or negative real) | Out-of-range triggers deviation |
| Humidity | System-configured min (e.g., 30.0%) | System-configured max (e.g., 60.0%) | 0 (invalid — sensor failure) | Out-of-range triggers deviation |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Environmental reading recording | CRITICAL | MEDIUM | CRITICAL | GMP compliance — missing/incorrect readings = batch rejection |
| Range validation (in-range readings accepted) | CRITICAL | LOW | CRITICAL | False rejection = production stoppage |
| Range validation (out-of-range flagged) | CRITICAL | MEDIUM | CRITICAL | Missed out-of-range = non-compliant product release |
| Automatic deviation triggering | CRITICAL | MEDIUM | CRITICAL | Missed deviation = audit finding / regulatory violation |
| EBR data inclusion | CRITICAL | LOW | CRITICAL | Missing EBR data = batch record incomplete (FDA 21 CFR Part 11) |
| Trend report accuracy | MEDIUM | MEDIUM | MEDIUM | Incorrect trends = poor production decisions but not immediate compliance risk |
| Mandatory field enforcement | HIGH | LOW | HIGH | UI enforces — but still critical for data integrity |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None | N/A | N/A | (No linked issues identified in JSON) |

**Note:** While no Jira-linked issues exist, this story has implicit integration dependencies:
- **Quality Management (QM) module** — Deviation record creation
- **Electronic Batch Record (EBR) system** — May be a separate document management system or SAP DMS/PLM integration
- **Trend Reporting (possibly BW/Analytics Cloud)** — Cross-batch data aggregation

These should be flagged as integration scenarios (INT-01, INT-02, INT-03).

---

## Scenario Inventory

SCENARIO INVENTORY — CS-58: Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
Module: PP — Production Planning and Control (GMP/Life Sciences)

**Happy Path Scenarios:**
  HP-01: Record environmental readings (particle count, temperature, humidity) for an active Process Order operation (all readings in range) — verify confirmation created, no deviation triggered, EBR contains readings — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3 (in-range), AC-5

**Alternative Path Scenarios:**
  AP-01: Record readings for multiple operations within same Process Order (verify each operation's readings independently recorded and flagged) — Risk: MEDIUM — ACs: AC-1, AC-2

**Negative Scenarios:**
  NEG-01: Enter particle count above acceptable range (e.g., 5000 for ISO 5 cleanroom with max 3520) — verify system flags out-of-range, still saves reading, triggers deviation — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-02: Enter temperature below acceptable range (e.g., 15.0°C when min is 18.0°C) — verify system flags out-of-range, triggers deviation — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-03: Enter humidity above acceptable range (e.g., 75.0% when max is 60.0%) — verify system flags out-of-range, triggers deviation — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-04: Attempt to access non-environmentally-controlled operation (no environmental monitoring step configured) — verify system does not prompt for readings — Risk: HIGH — ACs: AC-2
  NEG-05: Attempt to record readings for inactive/completed Process Order — verify system prevents entry — Risk: HIGH — ACs: AC-2

**Error Scenarios:**
  ERR-01: Missing Particle Count field (when operation requires it) — verify system prevents confirmation submission — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Temperature field (when operation requires it) — verify system prevents confirmation submission — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Humidity field (when operation requires it) — verify system prevents confirmation submission — Risk: HIGH — ACs: AC-2
  ERR-04: Invalid Process Order Number (non-existent) — verify system displays error "Process Order does not exist" — Risk: MEDIUM — ACs: AC-1, AC-2
  ERR-05: Invalid Operation Number (not part of selected Process Order) — verify system displays error "Operation not found" — Risk: MEDIUM — ACs: AC-1, AC-2

**Edge Cases:**
  EDGE-01: Particle Count at exact lower boundary (0 particles/m³) — verify system accepts, no out-of-range flag — Risk: MEDIUM — ACs: AC-3
  EDGE-02: Particle Count at exact upper boundary (e.g., 3520 for ISO 5) — verify system accepts, no out-of-range flag — Risk: MEDIUM — ACs: AC-3
  EDGE-03: Particle Count at upper boundary + 1 (3521) — verify system flags out-of-range, triggers deviation — Risk: MEDIUM — ACs: AC-3, AC-4
  EDGE-04: Temperature at exact lower boundary (18.0°C) — verify system accepts, no flag — Risk: MEDIUM — ACs: AC-3
  EDGE-05: Temperature at exact upper boundary (25.0°C) — verify system accepts, no flag — Risk: MEDIUM — ACs: AC-3
  EDGE-06: Temperature at lower boundary - 0.1°C (17.9°C) — verify system flags out-of-range — Risk: MEDIUM — ACs: AC-3
  EDGE-07: Humidity at exact lower boundary (30.0%) — verify system accepts, no flag — Risk: MEDIUM — ACs: AC-3
  EDGE-08: Humidity at exact upper boundary (60.0%) — verify system accepts, no flag — Risk: MEDIUM — ACs: AC-3
  EDGE-09: Humidity at lower boundary - 0.1% (29.9%) — verify system flags out-of-range — Risk: MEDIUM — ACs: AC-3

**Integration Scenarios:**
  INT-01: Verify deviation record automatically created in QM module when out-of-range reading entered — check deviation linked to Process Order and operation — Risk: CRITICAL — ACs: AC-4
  INT-02: Verify environmental readings appear in compiled Electronic Batch Record (EBR) — check all operations' readings aggregated correctly — Risk: CRITICAL — ACs: AC-5
  INT-03: Verify trend report displays environmental data across multiple Process Orders/batches and production suites over time — check date range filtering and chart accuracy — Risk: MEDIUM — ACs: AC-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One complete end-to-end confirmation with all readings in range |
| AP | 1 | Multiple operations within same Process Order (validates per-operation logic) |
| NEG | 5 | 3 out-of-range readings (particle, temp, humidity) + 1 non-environmental operation + 1 inactive PO |
| ERR | 5 | 3 missing mandatory readings + 2 invalid lookup values (PO, Operation) |
| EDGE | 9 | 3 environmental parameters × 3 boundary tests each (lower, upper, just-outside) |
| INT | 3 | 1 deviation triggering + 1 EBR inclusion + 1 trend report |
| **TOTAL** | **24** | |
