# Story Analysis: [CS-42] Generate Billing Document only after batch QA release

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-42/CS-42.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Billing Clerk |
| Core Action | Generate Billing Document only after batch QA release |
| Business Goal | Prevent invoicing customers for pharmaceutical products that may fail final QA inspection |
| Business Object | Billing Document (linked to Outbound Delivery, Batch, QA Status) |
| SAP Module | SD — Sales & Distribution (with MM — Materials Management batch integration) |
| Complexity | Complex (No story points assigned, but multi-module integration + batch management + QA gating) |

### Implicit Business Rules (Domain-Inferred)
- Batch-managed material must be configured with QA status tracking in material master (MARA/MARC)
- Outbound Delivery must contain at least one batch-managed material to trigger QA check
- QA release status must be maintained in batch master (MCH1) with values "Released" or "Approved"
- Billing type must be configured to allow manual vs automatic billing control
- Delivery must be goods-issued (status "C" — completed) before billing eligibility
- User performing billing must have authorization for billing document creation (VF01/VF04)
- Billing block indicator must be system-managed based on QA status
- Notification mechanism requires workflow or alert configuration in SAP system

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can perform goods issue for an Outbound Delivery containing a batch-managed pharmaceutical material. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system checks the QA release status of all batches in the delivery before allowing billing. | BUSINESS_RULE | CRITICAL | EP, DT | HP, NEG | 2 |
| AC-3 | The system blocks automatic billing if any batch in the delivery does not have a QA release status of "Released" or "Approved". | VALIDATION_NEGATIVE | CRITICAL | EP, DT | NEG, ERR | 3 |
| AC-4 | The system sends a notification to the Billing team when a batch receives QA release, triggering billing eligibility. | INTEGRATION | HIGH | EP | HP, INT | 2 |
| AC-5 | The user can manually create a Billing Document only after all batches in the delivery have been QA-released. | BUSINESS_RULE | CRITICAL | EP, DT | HP, NEG | 2 |
| AC-6 | The system logs the QA release date and approver information in the Billing Document for traceability. | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Delivery Number | Outbound Delivery | Alphanumeric (10 digits) | Yes | Existing delivery in SAP with goods issue completed |
| Batch Number | Batch | Alphanumeric | Yes | Existing batch assigned to delivery line items |
| Material Number | Material | Alphanumeric | Yes | Batch-managed pharmaceutical material |
| QA Release Status | QA Status | List value | Yes (system-set) | "Released", "Approved", "Rejected", "Pending" |
| QA Release Date | QA Release Date | Date | Yes (system-set) | Date of QA approval |
| QA Approver | Released By | User ID | Yes (system-set) | SAP user who approved QA |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Delivery selection | Customer master (KNA1) |
| Material Description | Material Description | Delivery selection | Material master (MAKT) |
| Delivery Quantity | Delivery Quantity | Delivery selection | Outbound Delivery item (LIPS) |
| Billing Block | Billing Block | QA status check | Determined by QA status logic |
| Billing Date | Billing Date | Billing document creation | Current system date |
| Sales Organization | Sales Organization | Delivery selection | Delivery header (LIKP) |
| Distribution Channel | Distribution Channel | Delivery selection | Delivery header (LIKP) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Billing Document Number | Unique SAP-generated billing document number | 10-digit numeric, begins with 90 |
| Billing Document Status | Status of billing document | "Open", "Completed", "Blocked" |
| QA Traceability Log | Log entry with QA release details | Text field with date, approver, batch |
| Notification ID | System notification sent to Billing team | Workflow notification ID |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Batch Count | 1 (minimum) | System-configured (typically 10-50) | N/A (at least 1 required) | Per delivery |
| QA Release Date | Past date (cannot be future) | Current date | N/A | Must be valid date |
| Delivery Quantity | Greater than 0 | System-configured max | 0 (invalid for billing) | Per line item |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| QA-based billing block | CRITICAL | MEDIUM | CRITICAL | Invoicing unreleased batches violates pharmaceutical compliance (GxP) |
| Batch QA status validation | CRITICAL | MEDIUM | CRITICAL | Core gating mechanism for billing eligibility |
| Automatic billing prevention | CRITICAL | LOW | CRITICAL | System must enforce block — user override would breach quality control |
| Notification to Billing team | HIGH | MEDIUM | HIGH | Workflow dependency — if fails, billing may be delayed |
| Manual billing after QA release | HIGH | LOW | HIGH | Primary business operation after QA gate passes |
| QA traceability logging | HIGH | LOW | HIGH | Regulatory audit requirement for pharmaceutical industry |
| Goods issue execution | MEDIUM | LOW | MEDIUM | Prerequisite operation — standard SD process |

---

## Integration Risk

**Integration Dependencies Identified:**

| Scenario Area | Integration Point | Risk Level | Rationale |
|--------------|------------------|-----------|-----------|
| Batch QA status check | MM (Batch Management) → SD (Billing) | CRITICAL | Billing depends on real-time QA status from batch master (MCH1) |
| Notification triggering | SD → Workflow/Alert System | HIGH | Notification must fire when QA status changes to "Released" |
| QA data in Billing Document | QA module → SD Billing Document | HIGH | QA release date and approver must transfer to billing document fields |

**Note:** While `linkedIssues` array is empty in the JSON, this story has implicit integration dependencies across SAP modules (SD, MM, QA).

---

## Scenario Inventory

**SCENARIO INVENTORY — CS-42: Generate Billing Document only after batch QA release**
**Module:** SD — Sales & Distribution (with MM batch integration)

### Happy Path Scenarios:
**HP-01:** Complete goods issue → all batches QA-released → automatic billing allowed → verify billing document created with QA traceability — **Risk: CRITICAL** — ACs: AC-1, AC-2, AC-5, AC-6

**HP-02:** Complete goods issue → all batches QA-released → manual billing → verify billing document created with QA traceability — **Risk: CRITICAL** — ACs: AC-1, AC-2, AC-5, AC-6

**HP-03:** Batch receives QA release → notification sent to Billing team → verify notification received — **Risk: HIGH** — ACs: AC-4

### Negative Scenarios:
**NEG-01:** Attempt automatic billing when at least one batch is NOT QA-released (status = "Pending") → verify billing blocked with error message — **Risk: CRITICAL** — ACs: AC-2, AC-3

**NEG-02:** Attempt automatic billing when at least one batch is QA-rejected (status = "Rejected") → verify billing blocked with error message — **Risk: CRITICAL** — ACs: AC-2, AC-3

**NEG-03:** Attempt manual billing creation when at least one batch is NOT QA-released → verify billing document cannot be saved — **Risk: CRITICAL** — ACs: AC-3, AC-5

### Error Scenarios:
**ERR-01:** Missing Delivery Number when attempting billing → verify error message — **Risk: HIGH** — ACs: AC-1, AC-5

**ERR-02:** Delivery without goods issue completed → verify billing blocked with appropriate status error — **Risk: HIGH** — ACs: AC-1, AC-2

**ERR-03:** Missing batch assignment on delivery line item → verify error during QA check — **Risk: HIGH** — ACs: AC-2

### Edge Cases:
**EDGE-01:** Multiple batches in delivery (boundary: minimum = 1 batch all QA-released) → verify billing succeeds — **Risk: MEDIUM** — ACs: AC-2, AC-5

**EDGE-02:** Multiple batches in delivery (boundary: mix of released and pending) → verify billing blocked — **Risk: CRITICAL** — ACs: AC-2, AC-3

**EDGE-03:** Delivery with maximum allowed batch count, all QA-released → verify billing succeeds — **Risk: MEDIUM** — ACs: AC-2, AC-5

**EDGE-04:** QA release date = current date (same day billing) → verify billing allowed and date logged — **Risk: LOW** — ACs: AC-6

### Integration Scenarios:
**INT-01:** Batch QA status updated in MM module → verify SD billing block status updates in real-time — **Risk: CRITICAL** — Integration: MM Batch Management → SD Billing

**INT-02:** QA release event triggers notification workflow → verify notification reaches Billing team inbox/email — **Risk: HIGH** — Integration: SD → Workflow System

**INT-03:** Billing document created → verify QA release date and approver data copied from batch master — **Risk: HIGH** — Integration: MM Batch Master → SD Billing Document

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | HP-01 (automatic billing after QA release), HP-02 (manual billing after QA release), HP-03 (notification on QA release) |
| AP | 0 | No alternative valid paths — billing is either allowed (after QA) or blocked (before QA) |
| NEG | 3 | NEG-01 (billing blocked — pending batch), NEG-02 (billing blocked — rejected batch), NEG-03 (manual billing blocked) |
| ERR | 3 | ERR-01 (missing delivery), ERR-02 (delivery not goods-issued), ERR-03 (missing batch) |
| EDGE | 4 | EDGE-01 (single batch released), EDGE-02 (mixed batch statuses), EDGE-03 (max batch count), EDGE-04 (same-day QA release) |
| INT | 3 | INT-01 (QA status sync), INT-02 (notification workflow), INT-03 (QA data in billing doc) |
| **TOTAL** | **16** | |
