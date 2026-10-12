# Story Analysis: [CS-8] As a Quality Doc SME, I want to initiate the Send for Review And Verification workflow on a Draft document so that a designated reviewer is formally assigned to evaluate the document

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-8/CS-8.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Doc SME |
| Core Action | Initiate the Send for Review And Verification workflow on a Draft document and assign a reviewer |
| Business Goal | Formally assign a designated reviewer to evaluate the document, transitioning it from Draft to In Review and creating a workflow task |
| Business Object | Quality Document (Veeva Vault QualityDocs) |
| SAP Module | QualityDocs — Document Management and Workflow (Veeva Vault QualityDocs) |
| Complexity | Medium (no storyPoints defined) |

### Implicit Business Rules (Domain-Inferred)
- The Quality Doc SME account must have authorization to access the Full Library in Veeva Vault QualityDocs
- The document "Test1 for Workflow" must exist in the Vault instance with Draft lifecycle state
- The reviewer account (Test_user01) must be a valid user in the Vault instance with the Reviewer role configured
- The "Send for Review And Verification" user action is lifecycle-state-dependent and only appears when the document is in Draft
- The workflow state transition (Draft → In Review) is atomic and triggers downstream system behaviors (task assignment, notification)
- Each workflow action requires mandatory field completion before submission can succeed
- Role-based access control (RBAC) governs which user actions are visible to which roles — the SME role has distinct permissions from the Reviewer role
- The Vault instance must have the Send for Review And Verification workflow configured and active for the document type

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The Quality Doc SME can log in to Veeva Vault QualityDocs using valid credentials and is presented with the QualityDocs interface | NAVIGATION | HIGH | EP | HP, NEG(invalid credentials) | 2 |
| AC-2 | After login, the Quality Doc SME can navigate to the Full Library view | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-3 | The Quality Doc SME can search for a document by name ("Test1 for Workflow") and the document appears in search results | VALIDATION_POSITIVE | HIGH | EP | HP, NEG(non-existent document) | 2 |
| AC-4 | The Quality Doc SME can open the document and view it in Draft state | NAVIGATION | MEDIUM | EP, ST | HP | 1 |
| AC-5 | The "Send for Review And Verification" user action is visible and available on the Draft document | BUSINESS_RULE | CRITICAL | EP, ST | HP, NEG(non-Draft state) | 2 |
| AC-6 | The Quality Doc SME can click "Send for Review And Verification" and a reviewer selection prompt or form is displayed | NAVIGATION | HIGH | EP | HP | 1 |
| AC-7 | The Quality Doc SME can select a reviewer account (Test_user01) and submit the workflow initiation | VALIDATION_POSITIVE | CRITICAL | EP | HP, ERR(no reviewer selected) | 2 |
| AC-8 | After submission, the document transitions from Draft state to In Review | SUCCESS_CONFIRMATION | CRITICAL | EP, ST | HP | 1 |
| AC-9 | The assigned reviewer (Test_user01) receives or has access to the workflow task | INTEGRATION | CRITICAL | EP | HP, INT(reviewer task validation) | 2 |
| AC-10 | If the Quality Doc SME navigates to QualityDocs via the module URL directly, the Full Library is accessible from the navigation | NAVIGATION | LOW | EP | AP | 1 |
| AC-11 | The "Send for Review And Verification" action is not available on a document that is not in Draft state | VALIDATION_NEGATIVE | HIGH | EP, ST | NEG | 1 |
| AC-12 | The workflow cannot be initiated without selecting a reviewer — submission without a reviewer is prevented | MANDATORY_FIELD | HIGH | EP | ERR | 1 |
| AC-13 | Only the Quality Doc SME role can initiate the workflow; the Reviewer role does not have access to the "Send for Review And Verification" action | ERROR_HANDLING | HIGH | EP | NEG(wrong role) | 1 |
| AC-14 | The document must be in Draft state for the "Send for Review And Verification" action to be available (RP-BIZ-001) | BUSINESS_RULE | CRITICAL | EP, ST | NEG | 1 |
| AC-15 | Only a user with the Quality Doc SME role can trigger this workflow action (RP-BIZ-002) | BUSINESS_RULE | HIGH | EP | NEG | 1 |
| AC-16 | Selecting a reviewer is a mandatory step when initiating the workflow — the system enforces this requirement (RP-BIZ-003) | MANDATORY_FIELD | HIGH | EP | ERR | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (Veeva UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|----------------------|-----------|-----------|---------------------|
| Username | Username | Alphanumeric | Yes | Valid QualDocSme.01 account (APP_USERNAME) |
| Password | Password | Alphanumeric (secure) | Yes | Valid password for QualDocSme.01 (APP_PASSWORD) |
| Document Name | Search field | Text | Yes (for search) | "Test1 for Workflow" |
| Reviewer Account | Reviewer selection field | User lookup | Yes | Test_user01 (valid Reviewer user) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Document State | State / Lifecycle | Document open | Vault document lifecycle metadata |
| Available User Actions | User Actions menu | Role + Document State | Vault RBAC + lifecycle state rules |
| Workflow Task ID | (System-generated) | Workflow submission | Vault workflow engine |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Document State | Document transitions from Draft to In Review | Text: "In Review" |
| Workflow Task | Reviewer receives a workflow task in their inbox | Task object with document reference |
| Task Assignment | Test_user01 is assigned as the reviewer | User reference in workflow task |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| (No numeric boundaries) | N/A | N/A | N/A | This workflow story involves state transitions and lookups, not numeric inputs |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Login authentication | CRITICAL | LOW | HIGH | Cannot access system without valid credentials; role-based access control |
| Document search and retrieval | HIGH | MEDIUM | HIGH | If document not found, workflow cannot proceed |
| User action visibility (state-dependent) | CRITICAL | MEDIUM | CRITICAL | "Send for Review And Verification" must appear only in Draft state; incorrect state handling breaks workflow |
| Reviewer selection validation | CRITICAL | LOW | CRITICAL | Mandatory field enforcement is critical; missing reviewer blocks workflow |
| Document state transition | CRITICAL | MEDIUM | CRITICAL | Draft → In Review transition is the core business transaction; failure means workflow not initiated |
| Workflow task creation | CRITICAL | MEDIUM | CRITICAL | Reviewer must receive task; failure means reviewer cannot perform their role |
| Role-based action access | HIGH | LOW | HIGH | RBAC enforcement prevents unauthorized users from initiating workflow |
| Alternative navigation path | LOW | LOW | LOW | Module URL navigation is a convenience feature; not business-critical |

---

## Integration Risk

**Moderate Integration Risk Identified:**

While `linkedIssues` is empty, this story has implicit integration dependencies:
- **Workflow Engine Integration**: The "Send for Review And Verification" action must successfully create a workflow task in the Veeva Vault workflow engine
- **User/Role Management Integration**: Reviewer account (Test_user01) must be a valid user with proper role configuration
- **Notification System Integration** (implicit): Reviewer likely receives notification of task assignment (not explicitly stated in ACs, but standard Vault behavior)

**Recommended Integration Scenarios:**
- INT-01: Verify reviewer receives workflow task in their task inbox after SME initiates workflow (AC-9)
- INT-02: Verify document state transition is persisted in Vault database and reflected in all views (AC-8)

---

## Scenario Inventory

### SCENARIO INVENTORY — CS-8: Initiate Send for Review And Verification workflow
Module: QualityDocs — Document Management and Workflow

**Happy Path Scenarios:**
- HP-01: Complete workflow initiation — SME logs in, searches for Draft document, opens it, initiates "Send for Review And Verification", selects reviewer, submits successfully, document transitions to In Review, reviewer receives task — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9
- HP-02 (AP-01): Alternative path — SME navigates via module URL directly to Full Library and executes workflow — Risk: LOW — ACs: AC-10

**Negative Scenarios:**
- NEG-01: Invalid login credentials — SME attempts login with incorrect username or password — Risk: HIGH — ACs: AC-1
- NEG-02: Non-existent document search — SME searches for a document name that does not exist in the library — Risk: HIGH — ACs: AC-3
- NEG-03: Non-Draft document state — SME opens a document that is not in Draft state (e.g., In Review, Approved) and "Send for Review And Verification" action is not available — Risk: HIGH — ACs: AC-5, AC-11, AC-14
- NEG-04: Wrong role access — User with Reviewer role attempts to initiate "Send for Review And Verification" workflow and is denied access to the action — Risk: HIGH — ACs: AC-13, AC-15

**Error Scenarios:**
- ERR-01: Missing reviewer selection — SME clicks "Send for Review And Verification", does not select a reviewer, and attempts to submit; system prevents submission — Risk: HIGH — ACs: AC-7, AC-12, AC-16

**Edge Cases:**
- (None identified — no numeric or boundary parameters in this story)

**Integration Scenarios:**
- INT-01: Reviewer task assignment verification — After SME submits workflow, verify that Test_user01 has the workflow task in their task inbox with correct document reference — Risk: CRITICAL — ACs: AC-9
- INT-02: Document state persistence — After workflow submission, verify document state is "In Review" across all library views and document detail pages — Risk: CRITICAL — ACs: AC-8

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Primary happy path covers all core ACs (AC-1 through AC-9) in a single end-to-end workflow execution |
| AP | 1 | One alternative navigation path (module URL entry) |
| NEG | 4 | Four distinct negative validation scenarios: invalid login, non-existent document, non-Draft state, wrong role |
| ERR | 1 | One mandatory field error: missing reviewer selection |
| EDGE | 0 | No numeric or boundary parameters requiring edge case testing |
| INT | 2 | Two integration validations: reviewer task assignment, document state persistence |
| **TOTAL** | **9** | Comprehensive coverage of workflow initiation, role-based access control, state-dependent actions, and mandatory field validation |
