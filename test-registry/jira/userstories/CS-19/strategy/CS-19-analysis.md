# Story Analysis: [CS-19] Place A Specific Batch Of Raw Material On Quality Hold

**Analysed:** 2026-08-24
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-19/CS-19.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Plant Manager |
| Core Action | Place a specific batch of raw material on Quality Hold |
| Business Goal | Prevent further goods movements consuming that batch during deviation investigation |
| Business Object | Material Batch, Stock Status, Batch Stock Transaction |
| SAP Module | MM — Materials Management (Inventory Management / Quality Management submodule) |
| Complexity | Medium (no story points assigned, but involves batch-managed stock, status changes, authorization, and notifications) |

### Implicit Business Rules (Domain-Inferred)
- Material must be batch-managed (batch management flag active in material master)
- Batch must exist in the system with a valid batch number and material number
- User must have authorization for stock status change transactions (typically FM01, FM02 or similar)
- Blocked stock is physically present but logically unavailable for consumption or goods issue
- Quality Inspection stock status may trigger automatic inspection lot creation (IM-QM integration)
- Batch hold must be reversible by authorized QA personnel (role-based authorization)
- Active process orders consuming the batch must be identified before hold to prevent production disruption
- Reason codes for hold must be configured in SAP Customizing (reason code catalog)
- Notification to Production Planning implies integration with PP module or workflow system
- Change history must be maintained in batch master data (CHARG table) and material document (MSEG)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Stock" or "Batch Where-Used List" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection." | VALIDATION_POSITIVE | CRITICAL | EP, ST | HP + AP | 2 |
| AC-3 | Once blocked, the system prevents any goods issue transaction against that batch, including production order consumption. | BUSINESS_RULE | CRITICAL | EP, ST | HP + NEG | 2 |
| AC-4 | The system logs the reason code and the user who initiated the hold, along with a timestamp. | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |
| AC-5 | The system allows an authorized QA user to release the hold once the investigation is closed, restoring the batch to Unrestricted-Use stock. | BUSINESS_RULE | HIGH | EP, ST | HP + NEG | 2 |
| AC-6 | A notification is sent to Production Planning when a batch used in an active process order is placed on hold. | INTEGRATION | HIGH | EP | INT | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Number | Material | Alphanumeric (18 char max) | Yes | Existing batch-managed material in SAP master |
| Batch Number | Batch | Alphanumeric (10 char max) | Yes | Existing batch in MCHB (batch stock table) |
| Plant | Plant | Alphanumeric (4 char) | Yes | Valid plant assigned to user authorization |
| Storage Location | Storage Location | Alphanumeric (4 char) | Yes | Valid storage location in plant |
| Stock Type | Stock Type | Dropdown | Yes | "Blocked Stock" or "Quality Inspection Stock" |
| Reason Code | Reason for Block | Alphanumeric / Dropdown | Yes | Configured reason code (e.g., "DEVINV" for deviation investigation) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Enter Material Number | Material master MAKT |
| Current Stock Quantity | Available Quantity | Select Batch | Batch stock table MCHB |
| Current Stock Status | Current Status | Select Batch | Stock status field MCHB-CLABS/CINSM/CSPEM |
| Batch Creation Date | Created On | Select Batch | Batch master MCHA-ERSDA |
| User ID | Changed By | Save transaction | Current user session (SY-UNAME) |
| Timestamp | Changed At | Save transaction | System timestamp (SY-DATUM, SY-UZEIT) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Document Number | Document number for stock status change transaction | 10-digit numeric (49xxxxxxxx) |
| Material Document Year | Fiscal year of transaction | 4-digit year (YYYY) |
| Change Log Entry | Audit trail entry in batch history | Text log with user, timestamp, old status, new status |
| Notification Number | Work item or notification sent to Production Planning | 10-12 digit numeric (if PP integration active) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Batch Stock Quantity | Must be > 0 to block | System maximum (999,999,999.999 per UoM) | Cannot block batch with 0 stock | Blocking zero-stock batch is invalid |
| Reason Code Length | 1 character | 10 characters (typical SAP config) | N/A | Mandatory field |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch status change to Blocked/QI | CRITICAL | MEDIUM | CRITICAL | Core quality management operation; failure allows consumption of defective material |
| Prevent goods issue on blocked batch | CRITICAL | MEDIUM | CRITICAL | Business rule enforcement failure = compliance violation |
| Authorization check (QA release) | HIGH | LOW | HIGH | Role-based authorization failure = security breach |
| Change log audit trail | HIGH | LOW | HIGH | Regulatory compliance requirement (GxP, ISO) |
| Notification to Production Planning | HIGH | MEDIUM | HIGH | Integration dependency; failure causes production disruption |
| Navigation/App access | LOW | LOW | LOW | UI access; easily detected |
| Reason code validation | MEDIUM | LOW | MEDIUM | Mandatory field enforcement |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| (None) | N/A | MEDIUM | INT-01: Notification to Production Planning (PP module integration implied by AC-6) |

**Note:** Although no linked issues are present in Jira, AC-6 explicitly requires integration with Production Planning (PP module) for notification when a batch in an active process order is blocked. This is a cross-module integration risk.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-19: Place A Specific Batch Of Raw Material On Quality Hold
Module: MM — Materials Management (IM/QM)

Happy Path Scenarios:
  HP-01: Select batch and change status to "Blocked Stock" — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4
  HP-02: Select batch and change status to "Quality Inspection Stock" — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4
  HP-03: QA user releases batch hold, restoring to Unrestricted-Use stock — Risk: HIGH — ACs: AC-5

Alternative Path Scenarios:
  AP-01: Block batch via "Batch Where-Used List" app (alternative navigation path) — Risk: MEDIUM — ACs: AC-1, AC-2

Negative Scenarios:
  NEG-01: Attempt goods issue transaction against blocked batch — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt production order consumption against blocked batch — Risk: CRITICAL — ACs: AC-3
  NEG-03: Unauthorized user attempts to release batch hold — Risk: HIGH — ACs: AC-5
  NEG-04: Attempt to block batch with zero stock quantity — Risk: MEDIUM — ACs: AC-2

Error Scenarios:
  ERR-01: Missing Material Number — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Batch Number — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Plant — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Storage Location — Risk: HIGH — ACs: AC-2
  ERR-05: Missing Reason Code — Risk: HIGH — ACs: AC-4
  ERR-06: Non-existent Material Number — Risk: MEDIUM — ACs: AC-2
  ERR-07: Non-existent Batch Number — Risk: MEDIUM — ACs: AC-2
  ERR-08: Material not batch-managed — Risk: MEDIUM — ACs: AC-2

Edge Cases:
  EDGE-01: Block batch with minimum valid stock quantity (0.001 UoM) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-02: Block batch with maximum stock quantity — Risk: LOW — ACs: AC-2, AC-3
  EDGE-03: Release hold on batch that was never blocked — Risk: MEDIUM — ACs: AC-5

Integration Scenarios:
  INT-01: Block batch used in active process order → notification sent to Production Planning — Risk: HIGH — ACs: AC-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | HP-01 (Blocked), HP-02 (QI), HP-03 (Release) |
| AP | 1 | AP-01 (Alternative navigation via Batch Where-Used List app) |
| NEG | 4 | NEG-01 (Goods Issue blocked), NEG-02 (PO consumption blocked), NEG-03 (Unauthorized release), NEG-04 (Zero stock) |
| ERR | 8 | ERR-01 to ERR-08 (Missing/invalid mandatory fields: Material, Batch, Plant, SLoc, Reason, and validation errors) |
| EDGE | 3 | EDGE-01 (Min quantity), EDGE-02 (Max quantity), EDGE-03 (Release already unrestricted batch) |
| INT | 1 | INT-01 (PP notification for active process order) |
| **TOTAL** | **20** | |
