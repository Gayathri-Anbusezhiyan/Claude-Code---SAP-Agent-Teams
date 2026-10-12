# Story Analysis: [CS-31] Review And Approve A Change Request Affecting An Approved Vendor's Manufacturing Site

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-31/CS-31.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Assurance Manager |
| Core Action | Review and approve a Change Request affecting an approved vendor's manufacturing site |
| Business Goal | Ensure materials are not procured from unapproved or unverified manufacturing locations |
| Business Object | Vendor Change Request (affecting manufacturing site) |
| SAP Module | MM - Materials Management (Vendor Master Management with Quality Workflow) |
| Complexity | Complex (no story points assigned, but involves multi-step approval workflow, document attachment, system blocking logic, and audit trail) |

### Implicit Business Rules (Domain-Inferred)
- Vendor must already exist in vendor master (LFA1) with approved status before a manufacturing site change can be requested
- Manufacturing site changes require explicit QA approval workflow activation (likely via change management configuration in vendor master)
- Any purchase order creation against a vendor in "pending change approval" state must be blocked by the system
- Approval workflow must maintain data integrity: rejected changes must restore previous approved state without manual intervention
- Audit trail must capture full approval chain for regulatory compliance (GxP, ISO, FDA requirements)
- Requestor (likely procurement or vendor coordinator) must have authorization to submit change requests but not to approve them (segregation of duties)
- QA Manager must have approval authorization object (e.g., F_LFA1_APP or custom workflow auth)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "My Inbox" Fiori app to review pending vendor change requests. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system flags any change to a vendor's registered manufacturing site as requiring QA approval before it takes effect. | BUSINESS_RULE | CRITICAL | EP, ST | HP, NEG(change without approval workflow active) | 2 |
| AC-3 | The requestor can attach supporting documentation (e.g., site audit report) to the change request. | VALIDATION_POSITIVE | MEDIUM | EP, BVA | HP(with attachment), AP(without attachment), EDGE(large file), EDGE(unsupported format) | 4 |
| AC-4 | The system prevents purchase orders from being created against the changed vendor record until QA approval is granted. | BUSINESS_RULE | CRITICAL | EP, ST | HP(blocked PO), NEG(attempt PO creation), INT(PO creation after approval) | 3 |
| AC-5 | The system logs the approver, decision, and timestamp for audit trail purposes. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(approval logged), AP(rejection logged) | 2 |
| AC-6 | Rejected changes return the vendor record to its previous approved state automatically. | BUSINESS_RULE | CRITICAL | ST | HP(rejection restores state), NEG(state not restored manually) | 2 |

---
## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Vendor ID | Vendor | Alphanumeric | Yes | Existing approved vendor in SAP master with pending manufacturing site change |
| Change Request ID | Change Request | Alphanumeric | Yes | Valid change request in "Pending QA Approval" workflow status |
| Approval Decision | Approve/Reject | Boolean | Yes | Approve OR Reject |
| Approval Comments | Comments | Text | No | Free text, max 1000 characters (typical SAP workflow comment limit) |
| Attachment File | Attachment | File | No | PDF, DOCX, XLSX, PNG, JPG; max 10MB (SAP Fiori attachment typical limit) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Vendor Name | Vendor Name | Load change request | Vendor master LFA1-NAME1 |
| Current Manufacturing Site | Current Site | Load change request | Vendor master LFA1 plant data |
| Requested Manufacturing Site | New Site | Load change request | Change request payload |
| Requestor Name | Requested By | Load change request | Workflow initiator user record |
| Request Date | Requested On | Load change request | Workflow creation timestamp |
| Change Request Status | Status | Open change request in inbox | Workflow status table (SWWWIHEAD) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Approval Decision | Approve or Reject action | Enum: "Approved", "Rejected" |
| Approval Timestamp | Date and time of decision | ISO8601 timestamp |
| Approver User ID | SAP user who approved/rejected | Alphanumeric SAP user ID |
| Workflow Log Entry | Audit trail record | System-generated workflow log entry in SWWWIHEAD/SWWLOGHIST |
| Vendor Record Status | Vendor master status post-approval | "Approved" (if approved), "Approved" with previous site (if rejected) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Attachment File Size | 1 KB (minimum valid file) | 10 MB (typical SAP Fiori limit) | 0 bytes (invalid) | Validate MIME type and size before upload |
| Approval Comments Length | 0 characters (optional field) | 1000 characters | N/A | Typical SAP workflow comment field limit |

---
## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Vendor change approval workflow | CRITICAL | MEDIUM | CRITICAL | Failure allows unapproved manufacturing sites, regulatory non-compliance (GxP, ISO) |
| PO blocking logic | CRITICAL | MEDIUM | CRITICAL | Failure allows procurement from unverified sites, supply chain quality risk |
| Audit trail logging | CRITICAL | LOW | CRITICAL | Missing audit data, regulatory audit failure (FDA, ISO 9001) |
| State restoration on rejection | CRITICAL | MEDIUM | CRITICAL | Failure leaves vendor in inconsistent state, procurement disruption |
| My Inbox access and navigation | MEDIUM | LOW | MEDIUM | Access failure delays approval process but does not directly breach compliance |
| Attachment upload | MEDIUM | MEDIUM | MEDIUM | Missing documentation reduces audit evidence but does not block approval process |

---

## Integration Risk

None - no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY - CS-31: Review And Approve A Change Request Affecting An Approved Vendor's Manufacturing Site
Module: MM - Materials Management

Happy Path Scenarios:
  HP-01: QA Manager reviews pending vendor manufacturing site change request in My Inbox, attaches site audit report, approves change, system updates vendor master and logs audit trail - Risk: CRITICAL - ACs: AC-1, AC-2, AC-3, AC-5
  HP-02: QA Manager reviews pending vendor manufacturing site change request, rejects change with comments, system restores vendor to previous approved state and logs rejection - Risk: CRITICAL - ACs: AC-1, AC-2, AC-5, AC-6

Alternative Path Scenarios:
  AP-01: QA Manager approves vendor manufacturing site change without attaching supporting documentation (optional) - Risk: MEDIUM - ACs: AC-1, AC-2, AC-5

Negative Scenarios:
  NEG-01: Procurement user attempts to create PO against vendor with pending manufacturing site change before QA approval - system blocks PO creation - Risk: CRITICAL - ACs: AC-4
  NEG-02: User without QA approval authorization attempts to access and approve change request - system denies access or approval action - Risk: HIGH - ACs: AC-1
  NEG-03: Vendor manufacturing site change is submitted but workflow does not trigger QA approval flag - Risk: CRITICAL - ACs: AC-2

Error Scenarios:
  ERR-01: Missing Vendor ID in change request - Risk: HIGH - ACs: AC-1, AC-2
  ERR-02: Missing Approval Decision (neither Approve nor Reject selected) - Risk: HIGH - ACs: AC-5
  ERR-03: Attachment file upload fails due to unsupported file type - Risk: MEDIUM - ACs: AC-3
  ERR-04: Attachment file upload fails due to size exceeding 10MB limit - Risk: MEDIUM - ACs: AC-3

Edge Cases:
  EDGE-01: Attachment file size at minimum boundary (1 KB) - Risk: LOW - ACs: AC-3
  EDGE-02: Attachment file size at maximum boundary (10 MB) - Risk: MEDIUM - ACs: AC-3
  EDGE-03: Approval comments at maximum character length (1000 characters) - Risk: LOW - ACs: AC-5
  EDGE-04: Multiple concurrent approval requests for same vendor - Risk: HIGH - ACs: AC-2, AC-4

Integration Scenarios:
  (None - no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Core approval flow (approve + reject) with all mandatory steps |
| AP | 1 | Approval without optional attachment |
| NEG | 3 | PO blocking validation, unauthorized access, workflow trigger failure |
| ERR | 4 | Missing vendor, missing decision, invalid attachment type, oversized attachment |
| EDGE | 4 | Attachment size boundaries, comment length boundary, concurrent requests |
| INT | 0 | None - no linked issues |
| **TOTAL** | **14** | |
