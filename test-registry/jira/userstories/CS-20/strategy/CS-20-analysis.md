# Story Analysis: [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-20/CS-20.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer |
| Core Action | Create a Purchase Requisition with automatic approval routing based on value and material criticality |
| Business Goal | Ensure spend on GMP-critical materials receives appropriate management sign-off before PO creation |
| Business Object | Purchase Requisition (with Release Strategy / Approval Workflow) |
| SAP Module | MM — Materials Management |
| Complexity | Medium-Complex (No SP assigned; workflow automation + approval routing + Fiori integration = complex) |

### Implicit Business Rules (Domain-Inferred)
- Release strategy must be configured in SAP Customizing (transaction M_EINK_FRG or SPRO) with value thresholds and material classification rules
- Materials must have "Material Type" attribute maintained in material master (e.g., GMP-critical flag or specific material group)
- Approvers must have appropriate authorization objects (M_EINK_FRG for PR release) and be assigned to the relevant approval workflow role
- Purchase Requisition must have valid plant, purchasing organization, and material assignments before release strategy can be determined
- Fiori "My Inbox" app requires SAP Workflow Foundation (SWF) configuration and user-to-workflow assignment
- Notification delivery requires SAP Business Notification service to be active
- PR-to-PO conversion is blocked by checking PR release status field (EBAN-FRGKZ) — only fully released PRs can be converted
- Approval history is stored in SAP Workflow logs (table SWWWIHEAD) and release documentation (CDHDR/CDPOS)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Purchase Requisition" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system automatically determines the approval workflow (release strategy) based on the requisition's total value and material type. | BUSINESS_RULE | CRITICAL | EP, DT, BVA | HP (correct determination), AP (multi-level approval), NEG (invalid material type), EDGE (value threshold boundary) | 4 |
| AC-3 | The requisition cannot be converted into a Purchase Order until all required approval steps are completed. | BUSINESS_RULE | CRITICAL | EP, ST | HP (approval complete → conversion allowed), NEG (approval incomplete → conversion blocked) | 2 |
| AC-4 | Approvers receive a task notification in their Fiori "My Inbox" app with the option to approve, reject, or send back for revision. | INTEGRATION | HIGH | EP | HP (task received + approve), NEG (reject), AP (send back for revision), INT | 4 |
| AC-5 | The system displays the current approval status and history on the requisition. | SUCCESS_CONFIRMATION | MEDIUM | EP | HP (status visible), AP (history visible after multi-step approval) | 2 |
| AC-6 | The requisitioner receives a notification when the requisition is fully approved or rejected. | INTEGRATION | MEDIUM | EP | HP (approved notification), NEG (rejected notification), INT | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material ID | Material | Alphanumeric | Yes | Existing material in plant (MARC table) |
| Quantity | Quantity | Numeric | Yes | > 0, per UoM |
| Plant | Plant | Alphanumeric (4-digit) | Yes | Valid plant in SAP (T001W) |
| Delivery Date | Delivery Date | Date | Yes | Future date >= current date |
| Price per Unit | Price per Unit | Decimal | No | >= 0 (can be auto-determined from info record) |
| Requisitioner | Requisitioner | User ID | No | Defaults to logged-in user |
| Material Type / Group | Material Group | Alphanumeric | Yes (implicit) | Valid material group (T023) — determines criticality flag |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Confirm Material ID | Material master MAKT |
| Unit of Measure | UoM | Confirm Material ID | Material master MARA-MEINS |
| Total Value | Total Value | Enter Quantity + Price | Sum(Quantity × Price per Unit) across all line items |
| Release Strategy | Release Strategy Code | Save PR (after total value calculated) | Release strategy determination logic (CEKKO/ME_REL_STRATEGIE) based on total value + material type |
| Purchasing Organization | Purchasing Organization | Confirm Plant | Plant-to-PurchOrg assignment (T024E) |
| Company Code | Company Code | Confirm Plant | Plant-to-CompanyCode assignment (T001K) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| PR Number | Unique SAP-generated Purchase Requisition document number | 10-digit numeric, begins with 10 (BANF-BANFN) |
| Release Status | Current approval state of PR | Enumerated: "Not Released", "Partially Released", "Released", "Rejected" |
| Release Strategy Code | Workflow/approval chain assigned to PR | Alphanumeric code (e.g., "01", "02") from release strategy config |
| Approval History | Chronological log of approval actions | Table with timestamp, approver name, action (Approve/Reject/Send Back), comments |
| Workflow Instance ID | SAP Workflow task ID sent to My Inbox | System-generated workflow key |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Total Value | Threshold_1 (e.g., $0 – no approval) | Threshold_2 (e.g., $10,000 – manager approval), Threshold_3 (e.g., $50,000 – director approval) | 0 (valid if price = 0) | Approval workflow determined by which threshold range total value falls into |
| Quantity | 1 (minimum valid) | System-configured maximum per UoM | 0 (invalid) | Per material master settings |
| Delivery Date | Today + 1 day (minimum lead time) | No hard upper limit (but SAP planning horizon typically 999 days) | Past date (invalid) | Must be in future |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Automatic release strategy determination | CRITICAL | MEDIUM | CRITICAL | Incorrect approver routing = compliance breach, unauthorized spend, or approval deadlock. Complex logic with value + material type decision table. |
| Approval gate enforcement (block PO conversion) | CRITICAL | LOW | CRITICAL | If gate fails, PR can convert to PO without approval = financial control bypass. SAP standard logic is reliable but must be tested. |
| Fiori My Inbox task creation | HIGH | MEDIUM | HIGH | External integration (Fiori Launchpad + Workflow Foundation). If tasks don't arrive, approvers unaware of pending work = delayed procurements. |
| Approver actions (approve/reject/send back) | HIGH | MEDIUM | HIGH | Workflow state transition errors. Reject must block PO conversion; send-back must return to requisitioner. |
| Approval status and history display | MEDIUM | LOW | MEDIUM | Informational UI feature. Failure = poor user experience but does not break core approval logic. |
| Notification to requisitioner | MEDIUM | MEDIUM | MEDIUM | Email/Fiori notification delivery depends on external services. Failure = delayed awareness but requisitioner can check status manually. |
| Mandatory field validation | HIGH | LOW | HIGH | PR creation fails without material/quantity/plant/date. SAP UI enforces but must verify no bypass paths exist. |
| Navigation/Access | LOW | LOW | LOW | Fiori app tile access. Cosmetic risk; easily detected. |

---

## Integration Risk

**None — no linked issues identified.**

However, story description implies integration with:
- **Fiori My Inbox app** (AC-4): task delivery + approver actions
- **SAP Business Notification service** (AC-6): notification delivery to requisitioner
- **Release Strategy configuration** (AC-2): Customizing dependency

These are **internal SAP integrations** (not cross-story dependencies), but still introduce MEDIUM-HIGH risk due to configuration and service dependencies.

---

## Scenario Inventory

### SCENARIO INVENTORY — CS-20: Create A Purchase Requisition That Automatically Routes For Approval B
**Module:** MM — Materials Management

#### Happy Path Scenarios:
- **HP-01**: Create PR below approval threshold (no release strategy required) or single-level approval (e.g., manager only) — **Risk: CRITICAL** — **ACs: AC-1, AC-2, AC-3, AC-5, AC-6**
  - Material: standard (non-GMP), Total value: below threshold_1 or within threshold_2
  - Expected: PR created, correct release strategy assigned (or none if below threshold), approval status visible, requisitioner notified
- **HP-02**: Create PR requiring multi-level approval (high-value GMP-critical material) — **Risk: CRITICAL** — **ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6**
  - Material: GMP-critical, Total value: > threshold_3
  - Expected: PR created, multi-step release strategy assigned, tasks sent to all approvers sequentially, each approval step visible in history, final approval triggers requisitioner notification, PR becomes convertible to PO

#### Alternative Path Scenarios:
- **AP-01**: Approver sends PR back for revision — **Risk: HIGH** — **ACs: AC-4, AC-5, AC-6**
  - Expected: PR status = "Sent Back", requisitioner receives notification with approver comments, requisitioner can edit and resubmit, approval workflow restarts from beginning
- **AP-02**: Multi-step approval chain (first approver approves, second approver pending) — **Risk: HIGH** — **ACs: AC-4, AC-5**
  - Expected: PR status = "Partially Released", first approval recorded in history, second approver receives task, PO conversion still blocked

#### Negative Scenarios:
- **NEG-01**: Invalid material type (material does not exist in plant) — **Risk: HIGH** — **ACs: AC-2**
  - Expected: System prevents PR creation with error message "Material [ID] is not maintained for plant [PLANT]"
- **NEG-02**: Attempt to convert PR to PO before all approvals completed — **Risk: CRITICAL** — **ACs: AC-3**
  - Expected: System blocks conversion with error message "Purchase Requisition [PR] is not fully released" or "Release strategy not completed"
- **NEG-03**: Approver rejects PR — **Risk: HIGH** — **ACs: AC-4, AC-5, AC-6**
  - Expected: PR status = "Rejected", requisitioner receives rejection notification with reason, PR cannot be converted to PO, requisitioner can cancel or revise and resubmit

#### Error Scenarios:
- **ERR-01**: Missing Material field — **Risk: HIGH** — **ACs: AC-1 (implicit mandatory field enforcement)**
  - Expected: System prevents PR creation with error "Material is a required field" or equivalent
- **ERR-02**: Missing Quantity field — **Risk: HIGH** — **ACs: AC-1**
  - Expected: System prevents PR creation with error "Quantity is a required field"
- **ERR-03**: Missing Plant field — **Risk: HIGH** — **ACs: AC-1**
  - Expected: System prevents PR creation with error "Plant is a required field"
- **ERR-04**: Missing Delivery Date field — **Risk: HIGH** — **ACs: AC-1**
  - Expected: System prevents PR creation with error "Delivery Date is a required field"

#### Edge Cases:
- **EDGE-01**: PR total value exactly at approval threshold boundary (e.g., $10,000.00) — **Risk: MEDIUM** — **ACs: AC-2**
  - Expected: System applies correct release strategy (either threshold_2 or threshold_3 approval level based on >= or > rule in config)
- **EDGE-02**: Minimum quantity boundary (quantity = 1) — **Risk: MEDIUM** — **ACs: AC-1**
  - Expected: PR created successfully with quantity = 1
- **EDGE-03**: Zero price per unit (price = 0) — **Risk: MEDIUM** — **ACs: AC-2**
  - Expected: PR created with total value = 0, no approval required (or lowest threshold approval level applied)
- **EDGE-04**: Delivery date = today + 1 day (minimum lead time) — **Risk: LOW** — **ACs: AC-1**
  - Expected: PR created successfully with delivery date = tomorrow

#### Integration Scenarios:
- **INT-01**: Fiori My Inbox task creation and delivery to approver — **Risk: HIGH** — **ACs: AC-4**
  - Expected: Task appears in approver's My Inbox app within 1 minute of PR submission, task displays PR number, material description, total value, requisitioner name, with action buttons (Approve, Reject, Send Back)
- **INT-02**: Notification delivery to requisitioner (approval complete) — **Risk: MEDIUM** — **ACs: AC-6**
  - Expected: Requisitioner receives Fiori notification (and/or email if configured) with PR number, approval status, timestamp
- **INT-03**: Notification delivery to requisitioner (rejection) — **Risk: MEDIUM** — **ACs: AC-6**
  - Expected: Requisitioner receives Fiori notification with PR number, rejection status, approver comments, option to view PR

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | HP-01 (single-level or no approval), HP-02 (multi-level approval) — covers core happy paths |
| AP | 2 | AP-01 (send back for revision), AP-02 (multi-step approval chain partial release) — valid alternative outcomes |
| NEG | 3 | NEG-01 (invalid material), NEG-02 (PO conversion blocked), NEG-03 (approver rejects) — critical validation and business rule failures |
| ERR | 4 | 4 mandatory fields (Material, Quantity, Plant, Delivery Date) × 1 ERR each |
| EDGE | 4 | EDGE-01 (value threshold boundary), EDGE-02 (min quantity), EDGE-03 (zero price), EDGE-04 (min delivery date) — boundary value analysis |
| INT | 3 | INT-01 (My Inbox task creation), INT-02 (approval notification), INT-03 (rejection notification) — Fiori integration points |
| **TOTAL** | **18** | Comprehensive coverage of all ACs, risk areas, and integration points |
