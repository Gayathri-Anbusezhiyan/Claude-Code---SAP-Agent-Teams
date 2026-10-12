# [CS-9] As a Reviewer, I want to complete my assigned review task with the appropriate verdict and review context so that the document review is formally recorded and the workflow progresses

**Issue Key:** CS-9
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

Once the Quality Doc SME has initiated the Send for Review and Verification workflow and assigned a reviewer, the assigned Reviewer must log in, locate their workflow task, and formally record their review outcome. This step is the core review action: the Reviewer evaluates the assigned document and submits their verdict and review context, which advances the document to Review Completed and triggers the next workflow task for the SME.

## What This Story Covers

The ability for the Reviewer to log in to Veeva Vault QualityDocs using their own credentials, navigate to the Home view where workflow tasks are displayed, identify and open the most recently assigned review task, and complete it by selecting verdict "Review Completed" and review context "Quality Review".

## Roles

* **Primary actor:** Reviewer — completes the review task with verdict and review context
* **Supporting roles:** None active during this story (SME has already completed their initiation action)

## Preconditions

* CS-8 (STORY-001) has been completed: the workflow has been initiated by the SME and the Reviewer has been assigned a task
* The Reviewer has valid credentials (Test_user01 account) to log in to Veeva Vault QualityDocs
* The Reviewer's workflow task is visible in their Home view

## Workflow Context

State before: Document is In Review; Reviewer has an assigned workflow task  
State after: Document is in Review Completed state; Quality Doc SME is assigned a final review task

## Notes

* The Reviewer logs in using the Test_user01 account (APP_USERNAME_REVIEWER / APP_PASSWORD_REVIEWER env variables).
* The workflow task is accessed from the Home view, not from the document library.
* Only the specified verdict ("Review Completed") and review context ("Quality Review") are described. Other verdict options are out of scope.
* Covers: RP-FUNC-006, RP-FUNC-007, RP-FUNC-008, RP-ROLE-004, RP-ROLE-005, RP-WFLOW-004, RP-WFLOW-005, RP-WFLOW-006, RP-BIZ-004, RP-BIZ-007, RP-DATA-004, RP-DATA-005, RP-DATA-008, RP-DATA-009, RP-DATA-010, RP-DATA-012

## Acceptance Criteria

### Happy Path

* The Reviewer can log in to Veeva Vault QualityDocs using the Reviewer account credentials and is presented with the QualityDocs interface
* After login, the Reviewer can navigate to the Home view
* The Reviewer's most recently assigned workflow task is visible in the Home view
* The Reviewer can open the assigned workflow task
* The task completion form displays a Verdict field and a Review Context field
* The Reviewer can select "Review Completed" from the Verdict field options
* The Reviewer can select "Quality Review" from the Review Context field options
* After completing and submitting the task, the task is marked as complete
* The workflow advances: the document transitions from In Review to Review Completed, and the Quality Doc SME receives their final review task

### Alternative Paths

* If the Reviewer has multiple tasks in their Home view, they can identify the most recent one assigned by the workflow initiation

### Validation and Error Cases

* The Verdict field is mandatory; the system does not allow the task to be submitted without a verdict selection
* The Review Context field is mandatory; the system does not allow the task to be submitted without a review context selection
* Only the assigned Reviewer can complete this task; other users (including the Quality Doc SME) cannot submit this task on behalf of the Reviewer

### Business Rules

* The Reviewer must complete the task with Verdict "Review Completed" and Review Context "Quality Review" as specified in the workflow requirement (RP-BIZ-004)
* Each workflow participant uses their own distinct session; the Reviewer session is separate from the SME session (RP-BIZ-007)
* Role-based access control is enforced: the Reviewer role can only perform the review task; they cannot initiate or finalize the workflow (RP-ROLE-005)



## Acceptance Criteria

(No acceptance criteria defined)

## Links

- **Jira:** https://jira-naqet.atlassian.net/browse/CS-9
