# Story Analysis: [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-53/CS-53.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | QA Reviewer |
| Core Action | Review and electronically sign off the Electronic Batch Record (EBR) generated from a completed Process Order |
| Business Goal | Ensure the batch is not released for distribution until all GMP documentation has been formally verified |
| Business Object | Electronic Batch Record (EBR) / Batch |
| SAP Module | PP — Production Planning and Control / QM — Quality Management |
| Complexity | Complex (regulated pharmaceutical workflow with compliance requirements) |

### Implicit Business Rules (Domain-Inferred)
- Process Order must be fully confirmed (all operations complete) before EBR can be generated
- User must have QA Reviewer authorization in SAP (role-based access control)
- Electronic signatures must meet 21 CFR Part 11 compliance (FDA regulation for electronic records in pharma)
- Batch must exist in SAP with a valid batch number linked to the Process Order
- All in-process control results must be recorded in SAP QM module (inspection lots/results)
- Deviations must be formally documented and approved in SAP Quality Notifications before batch record approval
- Stock type transition (Restricted → Unrestricted-Use) is controlled by batch release decision in QM
- Archived batch records must be immutable and audit-trailed for regulatory inspection (GxP requirement)
- Material must be configured with batch management active in material master
- Plant must be configured for GMP-compliant batch record archiving

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Review Batch Records" Fiori app. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system compiles all process order data — component consumption, in-process controls, confirmations, and deviations — into a structured batch record. | VALIDATION_POSITIVE | CRITICAL | EP | HP, INT | 2 |
| AC-3 | The system prevents batch record approval if any mandatory in-process control result is missing or out of specification without a documented deviation. | VALIDATION_NEGATIVE | CRITICAL | EP, DT | NEG (missing result), NEG (out of spec without deviation), HP (out of spec with deviation) | 3 |
| AC-4 | The reviewer can add electronic signatures with a timestamp and user ID compliant with 21 CFR Part 11 requirements. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP, INT (regulatory compliance verification) | 2 |
| AC-5 | The batch cannot be transferred to Unrestricted-Use stock until the batch record is fully approved. | BUSINESS_RULE | CRITICAL | EP, ST | HP (approved → transfer allowed), NEG (not approved → transfer blocked) | 2 |
| AC-6 | The completed, signed batch record is archived and retrievable for regulatory inspection. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (archive), HP (retrieve) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Process Order Number | Process Order | Alphanumeric | Yes | Existing completed process order in SAP (status = TECO - technically complete) |
| Batch Number | Batch | Alphanumeric | Yes | Existing batch linked to process order |
| Reviewer Comments | Comments / Review Notes | Text | No | Free text (max 255 chars typical) |
| Electronic Signature | Signature / User ID | Alphanumeric (user ID) | Yes | Current logged-in user with QA authorization |
| Signature Password | Password / Confirm Identity | Alphanumeric | Yes | User's SAP password for signature authentication |
| Deviation Reference | Deviation Number / Quality Notification | Alphanumeric | Conditional (if out-of-spec result exists) | Existing approved QM notification |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Batch Record Status | Status | Process order confirmation | Process order status (AFKO) |
| Component Consumption | Components Used | Process order confirmation | Goods movements (MSEG) linked to order |
| In-Process Control Results | Inspection Results | Inspection lot completion | QM inspection results (QALS, QAMR) |
| Process Order Confirmations | Operation Confirmations | Operation confirmation | Confirmation data (AFRU) |
| Deviation Records | Deviations | Quality notification creation | Quality notifications (QMEL) linked to batch |
| Reviewer Name | Reviewed By | Electronic signature entry | User master (USR21) |
| Signature Timestamp | Signed On | Electronic signature entry | System timestamp (UTC) |
| Material Description | Material | Batch number entry | Material master (MARA) |
| Plant | Plant | Batch number entry | Batch master (MCH1) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| EBR Document Number | Unique batch record document number | Alphanumeric (e.g., EBR-2026-00001 or SAP archive object ID) |
| Approval Status | Batch record approval status | APPROVED / PENDING / REJECTED |
| Archive Reference | Archive object ID in SAP ArchiveLink or DMS | Alphanumeric (SAP ArchiveLink object ID) |
| Stock Type After Release | Stock type after batch release | UR (Unrestricted-Use) if approved |
| Audit Trail Entry | Audit log entry for signature event | Timestamp + User ID + Action (21 CFR Part 11 compliant) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Reviewer Comments | 0 characters (optional field) | 255 characters (typical SAP text field limit) | Empty (valid) | No boundary test needed |
| In-Process Control Result Count | 1 (minimum — at least one control point) | System-configured (depends on recipe/routing) | 0 (invalid — blocks approval per AC-3) | EDGE test for missing results |
| Deviation Count | 0 (valid if all results in spec) | System-configured | N/A | No boundary test needed |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch record approval | CRITICAL | LOW | CRITICAL | Regulatory compliance failure; batch release without verification violates GMP/FDA 21 CFR Part 11 |
| Electronic signature compliance | CRITICAL | MEDIUM | CRITICAL | Non-compliant signatures invalidate regulatory audit trail; FDA warning letter risk |
| In-process control validation | CRITICAL | MEDIUM | CRITICAL | Out-of-spec product released to market = patient safety risk + recall |
| Deviation enforcement | CRITICAL | MEDIUM | CRITICAL | Unapproved deviations bypassing review = GMP violation |
| Stock transfer prevention | HIGH | LOW | HIGH | Premature stock release = non-conforming product in supply chain |
| Archive and retrieval | HIGH | LOW | HIGH | Inability to retrieve batch records during FDA inspection = compliance failure |
| Navigation/Access to app | MEDIUM | LOW | MEDIUM | Delays batch release workflow but no patient safety risk |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None — no linked issues in `issuelinks` array | N/A | MEDIUM (inherent cross-module dependency) | INT-01: PP-QM integration (process order → inspection lot → batch record compilation), INT-02: MM-QM integration (stock transfer → batch release decision) |

**Note:** While no explicit linked issues are present in Jira, this story has **inherent cross-module integration risk** between PP (process order confirmations), QM (inspection results, deviations), and MM (stock transfers). These dependencies must be covered by integration test cases.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-53: Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
Module: PP-QM (Production Planning / Quality Management)

Happy Path Scenarios:
  HP-01: Review and approve batch record with all in-spec results, no deviations — Risk: CRITICAL — ACs: AC-1, AC-2, AC-4, AC-5, AC-6
  HP-02: Review and approve batch record with out-of-spec result AND documented/approved deviation — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5, AC-6
  HP-03: Retrieve archived batch record for regulatory inspection — Risk: CRITICAL — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Review batch record, add comments, and approve — Risk: MEDIUM — ACs: AC-4

Negative Scenarios:
  NEG-01: Attempt to approve batch record with missing mandatory in-process control result — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt to approve batch record with out-of-spec result and NO documented deviation — Risk: CRITICAL — ACs: AC-3
  NEG-03: Attempt to access "Review Batch Records" app without QA authorization — Risk: CRITICAL — ACs: AC-1
  NEG-04: Attempt to transfer batch to Unrestricted-Use stock before batch record approval — Risk: CRITICAL — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Process Order Number — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Batch Number — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Electronic Signature Password — Risk: HIGH — ACs: AC-4
  ERR-04: Invalid Electronic Signature Password — Risk: HIGH — ACs: AC-4
  ERR-05: Non-existent Process Order Number — Risk: MEDIUM — ACs: AC-2
  ERR-06: Non-existent Batch Number — Risk: MEDIUM — ACs: AC-2
  ERR-07: Process Order not in TECO status (not technically complete) — Risk: MEDIUM — ACs: AC-2

Edge Cases:
  EDGE-01: Batch record with zero deviations (all in-spec) — Risk: LOW — ACs: AC-3 (boundary: minimum deviation count = 0)
  EDGE-02: Batch record with maximum allowed reviewer comments length — Risk: LOW — ACs: AC-4

Integration Scenarios:
  INT-01: Verify PP-QM integration: process order confirmations + inspection results compiled into batch record — Risk: HIGH — ACs: AC-2
  INT-02: Verify MM-QM integration: batch release decision enables Unrestricted-Use stock transfer — Risk: HIGH — ACs: AC-5
  INT-03: Verify 21 CFR Part 11 compliance: electronic signature includes timestamp, user ID, and audit trail — Risk: CRITICAL — ACs: AC-4

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | Core approval flow (in-spec), approval with deviation, archive retrieval |
| AP | 1 | Optional comments path |
| NEG | 4 | Missing control result, out-of-spec without deviation, unauthorized access, premature stock transfer |
| ERR | 7 | Missing fields (process order, batch, signature password), invalid inputs (wrong password, non-existent order/batch, wrong order status) |
| EDGE | 2 | Zero deviations, max comment length |
| INT | 3 | PP-QM data compilation, MM-QM stock transfer, 21 CFR Part 11 compliance verification |
| **TOTAL** | **20** | |
