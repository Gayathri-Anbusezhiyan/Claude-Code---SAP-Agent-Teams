# Story Analysis: [CS-12] As a Quality Doc SME, I want to initiate the Send for Review and Verification workflow on a Draft document and assign a reviewer so that the document enters formal review

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-12/CS-12.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Doc SME (Subject Matter Expert) |
| Core Action | Initiate "Send for Review And Verification" workflow and assign a reviewer |
| Business Goal | Document enters formal review with assigned reviewer |
| Business Object | Quality Document (Veeva Vault QualityDocs) |
| SAP Module | N/A — **VEEVA VAULT QUALITYDOCS** (not SAP S/4HANA) |
| Complexity | Medium (estimated 3-5 SP based on multi-step workflow with state transition) |

### Implicit Business Rules (Domain-Inferred)
- Document must exist in the system before workflow can be initiated
- User must have Quality Doc SME role assignment in Veeva Vault before accessing workflow actions
- Reviewer account must exist in the system and have Reviewer role permissions before assignment
- Workflow actions are state-dependent — only available when document is in eligible state (Draft)
- State transitions are atomic — document moves from Draft → In Review only after successful workflow submission
- Workflow task assignment must be immediate and visible to reviewer upon creation
- Role-based access control must be enforced at both authentication and action execution levels
- Document search functionality depends on document metadata being indexed and searchable
- Workflow initiation creates an audit trail entry (implied by quality management system requirements)
- Reviewer assignment field must validate against active user accounts with Reviewer role (not just any user)
- Document locking rules may prevent simultaneous editing once workflow is initiated
- Reviewer task list must auto-refresh or poll for new workflow tasks

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | [RP-FUNC-001] Quality Doc SME can authenticate to Veeva Vault QualityDocs using role-specific credentials | NAVIGATION | HIGH | EP | HP | 1 |
| AC-2 | [NAV-001] After entering application URL and submitting valid credentials, user gains access to QualityDocs module landing page | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |
| AC-3 | [RP-FUNC-002] Quality Doc SME can navigate from QualityDocs landing page to Full Library view | NAVIGATION | LOW | EP | HP | 1 |
| AC-4 | [NAV-002] After clicking "Full Library" in navigation, Full Library document search interface is displayed | SUCCESS_CONFIRMATION | LOW | EP | HP | 1 |
| AC-5 | [RP-FUNC-003] Quality Doc SME can search for document by name ("Test1 for Workflow") and see matching results | VALIDATION_POSITIVE | MEDIUM | EP | HP + NEG(no results) | 2 |
| AC-6 | [NAV-003] Quality Doc SME can open document from search results and document detail page is displayed | SUCCESS_CONFIRMATION | LOW | EP | HP | 1 |
| AC-7 | [RP-FUNC-004] Document detail page confirms document is in Draft state | VALIDATION_POSITIVE | HIGH | ST | HP | 1 |
| AC-8 | [RP-FUNC-005] Quality Doc SME can click "Send for Review And Verification" user action on Draft document | BUSINESS_RULE | CRITICAL | ST, EP | HP | 1 |
| AC-9 | [NAV-004] After clicking workflow action, workflow initiation dialog is displayed with reviewer assignment field | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |
| AC-10 | [RP-FUNC-006] Quality Doc SME can select reviewer from reviewer assignment field | VALIDATION_POSITIVE | HIGH | EP | HP | 1 |
| AC-11 | [RP-FUNC-009] After submitting workflow initiation, workflow task is created and assigned to designated reviewer | SUCCESS_CONFIRMATION | CRITICAL | EP | HP | 1 |
| AC-12 | [AR-001] After workflow submission, document status transitions from Draft to In Review | SUCCESS_CONFIRMATION | CRITICAL | ST | HP | 1 |
| AC-13 | [AR-002] After workflow submission, reviewer sees assigned workflow task in Home view task list | INTEGRATION | HIGH | EP | HP | 1 |
| AC-14 | [RP-DATA-001] Document status field displays "In Review" after workflow is initiated | SUCCESS_CONFIRMATION | CRITICAL | EP | HP | 1 |
| AC-15 | [GR-001] "Send for Review And Verification" action is disabled/hidden when document is not in Draft state | VALIDATION_NEGATIVE | HIGH | ST | NEG | 1 |
| AC-16 | [GR-002] Workflow initiation dialog prevents submission when no reviewer is selected (mandatory field) | MANDATORY_FIELD | HIGH | EP | ERR | 1 |
| AC-17 | [RP-ROLE-001] Only users with Quality Doc SME role can access and execute "Send for Review And Verification" workflow action | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |
| AC-18 | [GR-006] Only authenticated users with valid credentials can access QualityDocs workflow functionality | ERROR_HANDLING | HIGH | EP | NEG | 1 |
| AC-19 | [RP-NFR-003] System must enforce role-based access control — users without SME role cannot initiate workflow | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |
| AC-20 | [RISK-003] System shall prevent workflow initiation on documents not in Draft state | BUSINESS_RULE | HIGH | ST | NEG | 1 |
| AC-21 | [RISK-004] System shall validate assigned reviewer account exists and has Reviewer role permissions before allowing workflow submission | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |
| AC-22 | [BR-001] "Send for Review And Verification" workflow can only be initiated on documents in Draft state | BUSINESS_RULE | CRITICAL | ST | HP + NEG | 2 |
| AC-23 | [BR-002] Reviewer must be assigned when initiating workflow (mandatory field) | MANDATORY_FIELD | HIGH | EP | ERR | 1 |
| AC-24 | [RP-BIZ-002] Reviewer assignment field must contain valid reviewer account before system allows workflow submission | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (Veeva UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|------------------------|-----------|-----------|---------------------|
| Username | Username / Email | String (email) | Yes | Valid Veeva Vault user credential |
| Password | Password | String | Yes | Matching password for user |
| Document Name | Search field | String | Yes | "Test1 for Workflow" (existing document) |
| Reviewer | Reviewer / Assignee | Email (user lookup) | Yes | Test_user01@partnersi-capgemini.com (valid reviewer account) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Document State | Status / Lifecycle State | Document load | Veeva document lifecycle configuration |
| Available Actions | User Actions menu | Document state + user role | Veeva role-permission matrix |
| SME Display Name | User profile | Authentication success | Veeva user master |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Document State | Updated lifecycle state after workflow initiation | "In Review" |
| Workflow Task ID | Unique identifier for created workflow task | System-generated UUID or numeric ID |
| Task Assignee | Reviewer to whom task is assigned | Email (Test_user01@partnersi-capgemini.com) |
| Workflow Initiated Timestamp | Timestamp when workflow was submitted | ISO8601 datetime |
| Task Status | Initial task status after creation | "Open" or "Pending" |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Document Name Length | 1 character | System-configured max (typically 255 chars) | N/A (empty search may return all or none) | Search behavior depends on implementation |
| Reviewer Email Length | Valid email format (min ~6 chars) | System-configured max (typically 255 chars) | N/A | Must conform to email RFC standards |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Workflow initiation | CRITICAL | MEDIUM | CRITICAL | Core document lifecycle operation — failure blocks review process |
| State transition (Draft → In Review) | CRITICAL | MEDIUM | CRITICAL | Document stuck in Draft prevents compliance progress |
| Task assignment to reviewer | CRITICAL | MEDIUM | CRITICAL | Reviewer not notified blocks downstream review phase |
| Role-based access control | HIGH | LOW | HIGH | Unauthorized workflow initiation violates audit/compliance requirements |
| Document state validation (Draft check) | HIGH | LOW | HIGH | Workflow on wrong state causes data integrity issues |
| Reviewer validation | HIGH | MEDIUM | HIGH | Invalid reviewer causes workflow failure or orphaned task |
| Mandatory reviewer field | HIGH | LOW | HIGH | Missing reviewer prevents workflow completion |
| Authentication | HIGH | LOW | HIGH | Failed auth blocks all functionality |
| Navigation/Search | MEDIUM | LOW | MEDIUM | Search failure delays workflow but not critical |
| UI display/rendering | LOW | LOW | LOW | Cosmetic issues |

---

## Integration Risk

None — no linked issues identified.

However, implicit integration points exist within the Veeva Vault system:
- **Reviewer's Home view task list** (AC-13) — requires integration between workflow engine and user task view
- **Document lifecycle state management** — integration between workflow actions and document state transition logic
- **Role-based permission system** — integration between user authentication and action authorization

These are **intra-system integrations** (within Veeva Vault) rather than cross-story integrations, so no INT scenarios are required from a test case numbering perspective. However, verification of these integration points is critical and covered in the Happy Path and Success Confirmation test cases.

---

## Scenario Inventory

**SCENARIO INVENTORY — CS-12: Initiate Send for Review and Verification workflow**
**Module:** Veeva Vault QualityDocs (Quality Management)

**Happy Path Scenarios:**
  HP-01: Complete workflow initiation — SME authenticates → navigates to Full Library → searches for Draft document "Test1 for Workflow" → opens document → verifies Draft state → clicks "Send for Review And Verification" → assigns reviewer (Test_user01@partnersi-capgemini.com) → submits workflow → verifies document status changed to "In Review" → verifies workflow task created and assigned to reviewer — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-12, AC-13, AC-14, AC-22

**Alternative Path Scenarios:**
  AP-01: Direct URL navigation to Full Library — SME authenticates using direct Full Library URL with tab parameters (bypassing landing page navigation) → continues with document search and workflow initiation — Risk: LOW — ACs: AC-1, AC-2 (description mentions this alternative)

**Negative Scenarios:**
  NEG-01: Workflow action unavailable on non-Draft document — SME searches for a document NOT in Draft state (e.g., "In Review" or "Approved") → opens document → verifies "Send for Review And Verification" action is disabled or hidden — Risk: HIGH — ACs: AC-15, AC-20, AC-22
  NEG-02: Invalid reviewer assignment — SME initiates workflow → attempts to assign a user account that does not have Reviewer role permissions → system prevents submission with validation error — Risk: HIGH — ACs: AC-21, AC-24
  NEG-03: Unauthorized role access — User with non-SME role (e.g., basic Viewer role) attempts to access workflow action on Draft document → system prevents access or hides action — Risk: HIGH — ACs: AC-17, AC-19
  NEG-04: Unauthenticated access attempt — Unauthenticated user (no valid session) attempts to access QualityDocs URL → system redirects to login or displays authentication error — Risk: HIGH — ACs: AC-18
  NEG-05: Document search returns no results — SME searches for a document name that does not exist in the system → system displays "No results found" or equivalent message — Risk: MEDIUM — ACs: AC-5

**Error Scenarios:**
  ERR-01: Missing reviewer assignment — SME initiates workflow → leaves reviewer field blank → attempts to submit → system displays mandatory field validation error and prevents submission — Risk: HIGH — ACs: AC-16, AC-23

**Edge Cases:**
  EDGE-01: Document name boundary — minimum length search (1 character) — Risk: LOW — ACs: AC-5
  EDGE-02: Document name boundary — maximum length search (255 characters or system max) — Risk: LOW — ACs: AC-5
  EDGE-03: Reviewer email boundary — minimum valid email format (e.g., a@b.co) — Risk: LOW — ACs: AC-10
  EDGE-04: Reviewer email boundary — maximum length email (255 characters or system max) — Risk: LOW — ACs: AC-10

**Integration Scenarios:**
  (None — no cross-story linked issues; intra-system integrations covered in HP-01)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single primary happy path covering all critical success confirmations (AC-1 through AC-14) |
| AP | 1 | One alternative path explicitly mentioned in description (direct URL navigation) |
| NEG | 5 | Five distinct negative validation scenarios: non-Draft document (AC-15, AC-20, AC-22), invalid reviewer role (AC-21, AC-24), unauthorized user role (AC-17, AC-19), unauthenticated access (AC-18), no search results (AC-5) |
| ERR | 1 | One mandatory field (reviewer assignment) — AC-16, AC-23 |
| EDGE | 4 | Four boundary conditions: document name min/max (AC-5), reviewer email min/max (AC-10) |
| INT | 0 | No cross-story linked issues; intra-system integration verified in HP |
| **TOTAL** | **12** | |
