# [CS-8] As a Quality Doc SME, I want to initiate the Send for Review And Verification workflow on a Draft document so that a designated reviewer is formally assigned to evaluate the document

**Issue Key:** CS-8
**Type:** Story
**Status:** To Do
**Resolution:** Unresolved
**Priority:** High
**Assignee:** Unassigned
**Reporter:** Pabbathi Sai Chand Reddy
**Story Points:** Not estimated
**Sprint:** Not assigned
**Fix Version/s:** Unreleased
**Epic:** None
**Labels:** groomed, requirement-sourced
**Created:** 2026-05-22
**Updated:** 2026-05-22

## Description

## Background

The Send for Review and Verification workflow is a controlled quality gate in Veeva Vault QualityDocs. Before a document can progress beyond Draft, it must be formally reviewed. The Quality Doc SME is responsible for identifying the document that requires review and initiating the process by sending it for review and assigning the appropriate reviewer. This story covers the SME's complete entry action into the workflow.

## What This Story Covers

The ability for the Quality Doc SME to log in to Veeva Vault QualityDocs, locate the target document ("Test1 for Workflow") in the Full Library, open it while it is in Draft state, trigger the "Send for Review And Verification" user action, and assign a specific reviewer account — thereby creating an active workflow task for the reviewer and transitioning the document from Draft to In Review.

## Roles

* **Primary actor:** Quality Doc SME — initiates the workflow, assigns the reviewer
* **Supporting roles:** None (Reviewer is not yet active at this stage)

## Preconditions

* The Quality Doc SME has valid credentials to log in to Veeva Vault QualityDocs
* The document "Test1 for Workflow" exists in the QualityDocs library in Draft state
* The Reviewer account (Test_user01) exists in the Vault instance and can be selected as a reviewer
* The "Send for Review And Verification" user action is available on the document when it is in Draft state

## Workflow Context

State before: Document exists in Draft state; no active workflow  
State after: Document is In Review; Reviewer has been assigned a workflow task

## Notes

* The login step uses role-specific credentials for the QualDocSme.01 account. APP_USERNAME and APP_PASSWORD must be set to the SME account credentials.
* The search is performed via the Full Library navigation (not the Home view).
* The reviewer must be selected from a list when initiating the workflow — this is a mandatory field (RP-BIZ-003).
* Covers: RP-FUNC-001, RP-FUNC-002, RP-FUNC-003, RP-FUNC-004, RP-FUNC-005, RP-ROLE-001, RP-ROLE-002, RP-ROLE-005, RP-WFLOW-001, RP-WFLOW-002, RP-WFLOW-003, RP-BIZ-001, RP-BIZ-002, RP-BIZ-003, RP-BIZ-006, RP-DATA-001, RP-DATA-002, RP-DATA-003, RP-DATA-007, RP-DATA-011, RP-NFR-001, RP-NFR-002

## Acceptance Criteria

### Happy Path

* The Quality Doc SME can log in to Veeva Vault QualityDocs using valid credentials and is presented with the QualityDocs interface
* After login, the Quality Doc SME can navigate to the Full Library view
* The Quality Doc SME can search for a document by name ("Test1 for Workflow") and the document appears in search results
* The Quality Doc SME can open the document and view it in Draft state
* The "Send for Review And Verification" user action is visible and available on the Draft document
* The Quality Doc SME can click "Send for Review And Verification" and a reviewer selection prompt or form is displayed
* The Quality Doc SME can select a reviewer account (Test_user01) and submit the workflow initiation
* After submission, the document transitions from Draft state to In Review
* The assigned reviewer (Test_user01) receives or has access to the workflow task

### Alternative Paths

* If the Quality Doc SME navigates to QualityDocs via the module URL directly, the Full Library is accessible from the navigation

### Validation and Error Cases

* The "Send for Review And Verification" action is not available on a document that is not in Draft state
* The workflow cannot be initiated without selecting a reviewer — submission without a reviewer is prevented
* Only the Quality Doc SME role can initiate the workflow; the Reviewer role does not have access to the "Send for Review And Verification" action

### Business Rules

* The document must be in Draft state for the "Send for Review And Verification" action to be available (RP-BIZ-001)
* Only a user with the Quality Doc SME role can trigger this workflow action (RP-BIZ-002)
* Selecting a reviewer is a mandatory step when initiating the workflow — the system enforces this requirement (RP-BIZ-003)
* Each role in the workflow uses a distinct login account; the SME session is the only session active during this story (RP-BIZ-007, RP-NFR-002)



## Acceptance Criteria

(No acceptance criteria defined)

## Links

- **Jira:** https://jira-naqet.atlassian.net/browse/CS-8
