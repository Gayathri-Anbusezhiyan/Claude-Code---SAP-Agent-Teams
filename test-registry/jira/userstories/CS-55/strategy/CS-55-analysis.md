# Story Analysis: [CS-55] Record A Deviation Directly Against An In-Process Control Result That

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-55/CS-55.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Assurance Specialist |
| Core Action | Record a Deviation directly against an in-process control result that falls outside specification |
| Business Goal | Formally investigate any out-of-specification event during production before the batch proceeds |
| Business Object | Quality Notification (Deviation), In-Process Control Result, Process Order |
| SAP Module | PP — Production Planning & QM — Quality Management (cross-module integration) |
| Complexity | Complex (estimated 8+ SP — multi-module, state transition, workflow integration) |

### Implicit Business Rules (Domain-Inferred)
- Process orders must be in "Released" or "In Process" status to record in-process control results
- In-process inspection plans must be assigned to the material/batch to enable control result entry
- Deviation workflows require authorization profile for QM02 (Change Quality Notification)
- Process order status must transition to "HOLD" (GMPS-specific status) when deviation is recorded
- Deviation closure requires approval workflow configured in SAP Quality Management
- Root cause categorization codes must be maintained in the QM customizing (QMTT table)
- CAPA actions recorded in deviation link to SAP Action Management module (if active)
- Trend reports aggregate data from QMEL (Quality Notification) and QMFE (Quality Notification Item) tables
- Process order operation cannot advance if predecessor operation has open deviation (workflow validation)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Quality Notification" Fiori app, triggered from the in-process control result entry. | NAVIGATION + INTEGRATION | HIGH | EP | HP, INT | 2 |
| AC-2 | The system automatically pre-populates the deviation with the process order, operation, batch, and out-of-spec result. | VALIDATION_POSITIVE + BUSINESS_RULE | CRITICAL | EP | HP, NEG | 2 |
| AC-3 | The process order is automatically placed on hold at the affected operation pending deviation disposition. | BUSINESS_RULE + STATE_TRANSITION | CRITICAL | ST | HP, NEG | 2 |
| AC-4 | The QA user can document root cause, impact assessment, and corrective/preventive action (CAPA) on the deviation record. | MANDATORY_FIELD + BUSINESS_RULE | HIGH | EP, DT | HP, ERR | 4 |
| AC-5 | The process order cannot proceed to the next operation until the deviation is formally closed with an approved disposition. | BUSINESS_RULE + STATE_TRANSITION | CRITICAL | ST, DT | HP, NEG | 3 |
| AC-6 | A trend report is available showing deviation frequency by material, operation, and root-cause category. | SUCCESS_CONFIRMATION + BUSINESS_RULE | MEDIUM | EP | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Process Order | Process Order / Manufacturing Order | Alphanumeric (12-digit) | Yes (auto-populated from context) | Existing process order in RELEASED or CONFIRMED status |
| Operation Number | Operation | Numeric (4-digit) | Yes (auto-populated from context) | Valid operation within the process order routing |
| Batch Number | Batch | Alphanumeric (10-char) | Yes (auto-populated from context) | Existing batch linked to process order |
| In-Process Result Value | Inspection Result | Numeric/Unit | Yes (auto-populated from inspection entry) | Outside specification lower/upper limit |
| Characteristic | Inspection Characteristic | Alphanumeric | Yes (auto-populated) | Characteristic code from inspection plan |
| Notification Type | Notification Type | Code (2-char) | Yes (auto-populated) | "QN" for Quality Notification (Deviation type) |
| Root Cause | Root Cause / Cause Code | Code | Yes | Valid root cause codes from QM customizing (QMTT) |
| Impact Assessment | Impact Assessment / Description | Long Text | Yes | Free text, min 10 characters |
| Corrective Action | Corrective Action / CAPA | Long Text | Yes | Free text, min 10 characters |
| Preventive Action | Preventive Action / CAPA | Long Text | Yes | Free text, min 10 characters |
| Disposition Decision | Disposition | Code | Yes (at closure) | "USE_AS_IS", "REWORK", "SCRAP", "RETURN" |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Number | Material | System reads from process order | AFPO-MATNR (Process Order Item) |
| Material Description | Material Description | Material number confirmed | MAKT-MAKTX (Material Description) |
| Plant | Plant | System reads from process order | AFKO-WERKS (Process Order Header) |
| Work Center | Work Center | System reads from operation | AFVC-ARBPL (Process Order Operation) |
| Inspection Plan | Inspection Plan | Material + Plant + Operation | MAPL (Task List Header) |
| Specification Lower Limit | Lower Spec Limit | Characteristic from inspection plan | QPMK-TOLERANZUN (Characteristic Lower Limit) |
| Specification Upper Limit | Upper Spec Limit | Characteristic from inspection plan | QPMK-TOLERANZOB (Characteristic Upper Limit) |
| Process Order Status | Order Status | Process order header read | AFKO-GLTRP (Planned start date - but status from JEST) |
| Deviation Number | Notification Number | System generates on save | QMEL-QMNUM (Quality Notification Number) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Deviation Number | Unique SAP-generated Quality Notification number | 12-digit numeric, begins with 1000xxxxxx (number range config) |
| Process Order Hold Status | Operation status updated to HOLD | Status code "HOLD" in operation control key AFVC-STEUS |
| Deviation Status | Initial status on creation | "OUTSTANDING" (open) → transitions to "CLOSED" after disposition |
| CAPA Action ID | If CAPA module active, linked action ID | 12-digit numeric (separate number range) |
| Trend Report Data | Aggregated deviation metrics | Multi-dimensional table: Material x Operation x Root Cause x Frequency |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Root Cause Text Length | 10 characters | 255 characters | Empty string (invalid) | Mandatory field validation |
| Impact Assessment Text Length | 10 characters | 1000 characters | Empty string (invalid) | Mandatory field validation |
| Corrective Action Text Length | 10 characters | 1000 characters | Empty string (invalid) | Mandatory field validation |
| Preventive Action Text Length | 10 characters | 1000 characters | Empty string (invalid) | Mandatory field validation |
| In-Process Result Value | Must be < Lower Spec OR > Upper Spec | System-configured spec limits | N/A (must be numeric) | Boundary triggers deviation eligibility |
| Deviation Closure Wait Time | 0 seconds (immediate close possible) | No upper limit (can remain open indefinitely) | N/A | Business process-driven |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Deviation creation from in-process control | CRITICAL | MEDIUM | CRITICAL | Failure breaks GMP compliance — out-of-spec event not captured |
| Auto-population of process order data | CRITICAL | MEDIUM | CRITICAL | Incorrect data linkage corrupts traceability chain |
| Process order hold on deviation creation | CRITICAL | MEDIUM | CRITICAL | If hold fails, non-conforming batch may proceed (GMP violation) |
| CAPA documentation on deviation | HIGH | LOW | HIGH | Mandatory for regulatory inspection — but UI enforces entry |
| Process order release after deviation closure | CRITICAL | MEDIUM | CRITICAL | Incorrect release logic may block valid batches or release non-conforming ones |
| Trend report accuracy | MEDIUM | LOW | MEDIUM | Business intelligence — errors delay corrective action but not immediate compliance risk |
| Root cause validation | HIGH | LOW | HIGH | Invalid codes break downstream analytics |
| Navigation from in-process result to deviation | HIGH | MEDIUM | HIGH | If integration broken, manual workaround creates data disconnection |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None explicitly linked | N/A | IMPLICIT HIGH | This story implicitly integrates 3 modules: PP (Process Order), QM (Quality Notification), QM (In-Process Inspection). Integration scenarios required even without explicit linkedIssues. |

**Implicit Integration Dependencies:**
- **PP → QM:** Process order must trigger inspection lot creation (via inspection plan assignment)
- **QM → QM:** In-process control result entry must enable deviation creation (Fiori app integration)
- **QM → PP:** Deviation creation must update process order operation status (workflow callback)
- **QM → PP:** Deviation closure must release process order hold (workflow callback)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-55: Record A Deviation Directly Against An In-Process Control Result That
Module: PP — Production Planning & QM — Quality Management

Happy Path Scenarios:
  HP-01: Record deviation for out-of-spec in-process result + auto-hold process order + document CAPA + close deviation with disposition + verify process order released — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  HP-02: View trend report showing deviation frequency by material, operation, and root cause — Risk: MEDIUM — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Record deviation with "USE_AS_IS" disposition (no rework) — Risk: HIGH — ACs: AC-4, AC-5
  AP-02: Record deviation with "REWORK" disposition (process order returns to previous operation) — Risk: HIGH — ACs: AC-4, AC-5
  AP-03: Record deviation with "SCRAP" disposition (batch cancelled) — Risk: HIGH — ACs: AC-4, AC-5

Negative Scenarios:
  NEG-01: Attempt to record deviation for in-spec result (result within specification limits) — expect error "Result is within specification — deviation not required" — Risk: HIGH — ACs: AC-2
  NEG-02: Attempt to advance process order operation while deviation status is OUTSTANDING — expect error "Operation on hold — deviation {number} must be closed" — Risk: CRITICAL — ACs: AC-5
  NEG-03: Attempt to close deviation without documenting root cause — expect validation error — Risk: HIGH — ACs: AC-4
  NEG-04: Attempt to close deviation without disposition decision — expect validation error — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Root Cause field — Risk: HIGH — ACs: AC-4
  ERR-02: Missing Impact Assessment field — Risk: HIGH — ACs: AC-4
  ERR-03: Missing Corrective Action field — Risk: HIGH — ACs: AC-4
  ERR-04: Missing Preventive Action field — Risk: HIGH — ACs: AC-4
  ERR-05: Missing Disposition Decision at closure — Risk: CRITICAL — ACs: AC-5

Edge Cases:
  EDGE-01: Root Cause text at minimum length (10 characters) — Risk: MEDIUM — ACs: AC-4
  EDGE-02: Root Cause text at maximum length (255 characters) — Risk: MEDIUM — ACs: AC-4
  EDGE-03: Impact Assessment text at minimum length (10 characters) — Risk: MEDIUM — ACs: AC-4
  EDGE-04: Impact Assessment text at maximum length (1000 characters) — Risk: MEDIUM — ACs: AC-4
  EDGE-05: In-process result exactly at lower spec limit (boundary — should NOT trigger deviation) — Risk: HIGH — ACs: AC-2
  EDGE-06: In-process result exactly at upper spec limit (boundary — should NOT trigger deviation) — Risk: HIGH — ACs: AC-2
  EDGE-07: In-process result 0.01 below lower spec limit (should trigger deviation) — Risk: HIGH — ACs: AC-2
  EDGE-08: In-process result 0.01 above upper spec limit (should trigger deviation) — Risk: HIGH — ACs: AC-2

Integration Scenarios:
  INT-01: Verify deviation creation triggered from Fiori app "Manage In-Process Inspection Results" (PP-QM integration) — Risk: HIGH — Implicit linked module: Manage In-Process Inspection Results app
  INT-02: Verify process order hold status updated in backend (QM → PP callback) — Risk: CRITICAL — Implicit linked module: Process Order Management
  INT-03: Verify process order released after deviation closure (QM → PP callback) — Risk: CRITICAL — Implicit linked module: Process Order Management
  INT-04: Verify trend report aggregates data from multiple deviations across materials and operations — Risk: MEDIUM — Implicit linked module: Analytics/Reporting module

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | End-to-end deviation lifecycle (create → document → close → release) + trend report view |
| AP | 3 | Three disposition decision types: USE_AS_IS, REWORK, SCRAP (RETURN omitted as variant of SCRAP) |
| NEG | 4 | In-spec result rejection + process order advance blocked + missing root cause + missing disposition |
| ERR | 5 | Five mandatory fields: Root Cause, Impact Assessment, Corrective Action, Preventive Action, Disposition |
| EDGE | 8 | Four text fields × 2 boundaries (min/max length) + four result boundaries (at spec, below spec, above spec for lower/upper) |
| INT | 4 | Fiori app integration + process order hold update + process order release update + trend report aggregation |
| **TOTAL** | **26** | Comprehensive coverage for complex multi-module workflow with state transitions |
