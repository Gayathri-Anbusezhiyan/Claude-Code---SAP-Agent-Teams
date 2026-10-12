# Story Analysis: [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-47/CS-47.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Assurance Specialist |
| Core Action | Link a Customer Complaint from Sales to a formal Quality Notification |
| Business Goal | Ensure product quality issues raised by customers are investigated using GMP-compliant process |
| Business Object | Quality Notification (linked to Sales/Return Order) |
| SAP Module | QM — Quality Management (integration with SD — Sales & Distribution) |
| Complexity | Complex (estimated 8+ SP — multi-module integration, regulatory compliance, workflow routing) |

### Implicit Business Rules (Domain-Inferred)
- Customer Complaint must exist in a Sales Order or Return Order document before Quality Notification can be created
- Material and Batch referenced in the complaint must exist in SAP Material Master and Batch Master
- Customer referenced must exist in Customer Master
- Quality Notification must comply with GMP (Good Manufacturing Practice) regulatory requirements
- QA team worklist assignment requires proper authorization and user role assignment
- Quality Notification cannot be closed without required documentation fields populated
- Root-cause analysis documentation must be captured in structured SAP fields (not just free text)
- Corrective action must reference specific action items and responsible parties
- Bidirectional link between Sales document and Quality Notification must be maintained for traceability

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Quality Notification" Fiori app, initiated from the sales/return order. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system pre-populates the notification with the customer, material, batch, and complaint details from the originating document. | VALIDATION_POSITIVE | HIGH | EP | HP + NEG(missing source data) | 2 |
| AC-3 | The notification routes to the QA team's worklist for investigation and root-cause analysis. | INTEGRATION | HIGH | EP | HP + INT(worklist assignment) | 2 |
| AC-4 | The system tracks the notification status (Open, Under Investigation, Closed) and displays it back on the originating sales document. | INTEGRATION | CRITICAL | ST | HP + AP(status transitions) + INT(bidirectional link) | 3 |
| AC-5 | The system prevents closure of the notification until a documented disposition and corrective action are recorded. | VALIDATION_NEGATIVE | CRITICAL | DT | NEG(missing disposition) + NEG(missing corrective action) | 2 |
| AC-6 | A report is available showing complaint volume and trends by material and batch. | BUSINESS_RULE | MEDIUM | EP | HP(report access and data accuracy) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Sales/Return Order Number | Originating Document | Alphanumeric (10-digit) | Yes | Existing Sales Order or Return Order in SAP |
| Quality Notification Type | Notification Type | Dropdown | Yes | Customer Complaint type code (system-configured) |
| Defect Description | Description / Complaint Details | Text (long) | Yes | Free text (min 20 chars for GMP compliance) |
| Disposition Code | Disposition | Dropdown | Yes (at closure) | System-configured disposition codes |
| Corrective Action | Corrective Action | Text (long) | Yes (at closure) | Documented action plan (min 50 chars for GMP compliance) |
| Root Cause Analysis | Root Cause | Text (long) | Yes (at closure) | Documented root cause (min 50 chars for GMP compliance) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer ID | Customer | On initiation from Sales Order | Sales Order header (VBAK-KUNNR) |
| Customer Name | Customer Name | On initiation from Sales Order | Customer Master (KNA1) |
| Material Number | Material | On initiation from Sales Order | Sales Order item (VBAP-MATNR) |
| Material Description | Material Description | On initiation from Sales Order | Material Master (MARA) |
| Batch Number | Batch | On initiation from Sales/Return Order | Sales Order item batch (LIPS-CHARG) |
| Sales Order Number | Reference Document | On initiation | Source Sales/Return Order number |
| Complaint Date | Notification Date | On creation | System date |
| Created By | Created By | On creation | Current user ID |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Quality Notification Number | Unique SAP-generated Quality Notification document number | 12-digit numeric |
| Notification Status | Current workflow status | Text: "Open" / "Under Investigation" / "Closed" |
| QA Team Assignment | QA team/user assigned via worklist | User ID or Team ID |
| Status on Sales Order | Quality Notification status displayed on originating Sales Order | Status text visible in Sales Order UI |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Defect Description length | 20 characters (min for GMP) | 1000 characters (system max) | N/A | Mandatory field |
| Root Cause length | 50 characters (min for closure) | 2000 characters (system max) | N/A | Required at closure |
| Corrective Action length | 50 characters (min for closure) | 2000 characters (system max) | N/A | Required at closure |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Quality Notification creation from Sales | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance (GMP); product safety; customer trust |
| Auto-population of customer/material/batch data | HIGH | MEDIUM | HIGH | Data integrity; traceability; investigation accuracy |
| QA worklist routing | HIGH | MEDIUM | HIGH | Workflow assignment; investigation SLA; team accountability |
| Status tracking and bidirectional link | CRITICAL | MEDIUM | CRITICAL | Auditability; traceability; regulatory reporting |
| Closure validation (disposition/corrective action) | CRITICAL | LOW | CRITICAL | GMP compliance; prevents incomplete investigations |
| Report availability (complaint trends) | MEDIUM | LOW | MEDIUM | Business intelligence; continuous improvement |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| (No linked issues in JSON) | — | — | No explicit integration dependencies identified |

**Implicit Integration Points** (not captured as linked issues):
- **SD → QM**: Sales Order/Return Order must pass customer, material, batch, and complaint details to Quality Notification creation
- **QM → Worklist**: Quality Notification must route to QA team worklist (requires Workflow/Task Management integration)
- **QM → SD**: Quality Notification status must display back on originating Sales document (bidirectional link)
- **QM → Reporting**: Quality Notification data must feed into complaint volume and trend reports

These implicit integration points require INT scenarios even though no formal linked issues exist.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-47: Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
Module: QM — Quality Management (with SD integration)

**Happy Path Scenarios:**
  HP-01: Create Quality Notification from Sales Order with complete customer complaint details — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
  HP-02: Create Quality Notification from Return Order with complete customer complaint details — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4

**Alternative Path Scenarios:**
  AP-01: Status transition from "Open" → "Under Investigation" → "Closed" with all required fields — Risk: CRITICAL — ACs: AC-4, AC-5
  AP-02: Access complaint report filtered by specific material — Risk: MEDIUM — ACs: AC-6
  AP-03: Access complaint report filtered by specific batch — Risk: MEDIUM — ACs: AC-6

**Negative Scenarios:**
  NEG-01: Attempt to create Quality Notification from Sales Order missing material data — Risk: HIGH — ACs: AC-2
  NEG-02: Attempt to create Quality Notification from Sales Order missing batch data — Risk: HIGH — ACs: AC-2
  NEG-03: Attempt to create Quality Notification from Sales Order missing customer data — Risk: HIGH — ACs: AC-2
  NEG-04: Attempt to close Quality Notification without disposition code — Risk: CRITICAL — ACs: AC-5
  NEG-05: Attempt to close Quality Notification without corrective action — Risk: CRITICAL — ACs: AC-5
  NEG-06: Attempt to close Quality Notification without root cause analysis — Risk: CRITICAL — ACs: AC-5

**Error Scenarios:**
  ERR-01: Missing Defect Description field (mandatory at creation) — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Disposition Code (mandatory at closure) — Risk: CRITICAL — ACs: AC-5
  ERR-03: Missing Corrective Action (mandatory at closure) — Risk: CRITICAL — ACs: AC-5
  ERR-04: Missing Root Cause Analysis (mandatory at closure) — Risk: CRITICAL — ACs: AC-5

**Edge Cases:**
  EDGE-01: Defect Description at minimum length boundary (20 chars) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Defect Description at maximum length boundary (1000 chars) — Risk: LOW — ACs: AC-2
  EDGE-03: Root Cause at minimum closure length boundary (50 chars) — Risk: MEDIUM — ACs: AC-5
  EDGE-04: Corrective Action at minimum closure length boundary (50 chars) — Risk: MEDIUM — ACs: AC-5

**Integration Scenarios:**
  INT-01: Verify Quality Notification status displays correctly on originating Sales Order — Risk: CRITICAL — ACs: AC-4 (SD ↔ QM bidirectional link)
  INT-02: Verify Quality Notification routes to correct QA team member's worklist — Risk: HIGH — ACs: AC-3 (QM → Workflow)
  INT-03: Verify complaint report aggregates data from multiple Quality Notifications — Risk: MEDIUM — ACs: AC-6 (QM → Reporting)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Two primary paths: from Sales Order, from Return Order |
| AP | 3 | Status transitions (1 TC) + report filters (2 TCs) |
| NEG | 6 | Missing source data (3 ACs) + missing closure data (3 ACs) |
| ERR | 4 | Four mandatory fields with distinct validation rules |
| EDGE | 4 | Four text length boundaries (defect description, root cause, corrective action) |
| INT | 3 | Bidirectional Sales link (1) + Worklist routing (1) + Reporting aggregation (1) |
| **TOTAL** | **22** | Comprehensive coverage for CRITICAL regulatory compliance scenario |
