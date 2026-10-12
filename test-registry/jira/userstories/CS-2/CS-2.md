# [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud

**Issue Key:** CS-2
**Type:** Story
**Status:** To Do
**Resolution:** Unresolved
**Priority:** Critical
**Assignee:** Pabbathi Sai Chand Reddy
**Reporter:** Pabbathi Sai Chand Reddy
**Story Points:** 2
**Sprint:** Not assigned
**Fix Version/s:** Unreleased
**Epic:** None
**Created:** 2026-05-10
**Updated:** 2026-05-21

## Description

As a **Procurement Officer**, I want to create a new Standard Purchase Order by specifying a supplier, material, quantity, and price, so that I can formally initiate a procurement transaction that is tracked with a unique PO number in the system.

## Acceptance Criteria

- The user can access the "Manage Purchase Orders" application from the SAP Fiori launchpad.

- A new Purchase Order form is available by clicking "Create" on the Manage Purchase Orders page.

- The system validates the entered Supplier ID and auto-populates supplier details upon confirmation.

- The user can add one or more line items to the order by specifying a material, order quantity, and net order price.

- The system validates the material number and auto-populates material details upon confirmation.

- A unique Standard Purchase Order number is generated and displayed upon successful order submission.

- The system prevents submission if any mandatory field (Supplier, Material, Quantity, Price) is missing and clearly indicates which fields need to be filled.

- The system displays a descriptive error message if the supplier or material entered does not exist in the system.

## Linked Issues

- [inward: Defect] CS-6 — [MM] TC-CS-021: PO success notification does not display generated PO number — AC-6 violated (To Do)

## Comments

### Comment 1 — Pabbathi Sai Chand Reddy (2026-05-18)
Defect \[CS-6|https://jira-naqet.atlassian.net/browse/CS-6\] detected by automation.

_Test Case:_ TC-CS-021 — Verify System Displays a Formal Success Confirmation After PO Submission
_AC Violated:_ AC-6: A unique Standard Purchase Order number is generated and displayed upon successful order submission.
_Status:_ Open — logged automatically by Defect Logging Agent on 2026-05-18

_Summary of Defect:_ After clicking the Order button with valid PO data, SAP displays a generic alert "Purchase order has been created." that does NOT include the 10-digit PO number. The system then navigates to the list page. The PO number is absent from the success confirmation flow, violating AC-6's "displayed" requirement.

_Evidence:_ Confirmed across 3 executions (Phase 3 MCP exploration + 2 Playwright test runner runs). All executions produced identical behavior.

### Comment 2 — Pabbathi Sai Chand Reddy (2026-05-19)
**Re-run confirmation (2026-05-19):** Defect \[CS-6|https://jira-naqet.atlassian.net/browse/CS-6\] re-confirmed by automated pipeline re-run (/e2e-automation-v2 CS-2).

_Test Case:_ TC-CS-021 — Verify System Displays a Formal Success Confirmation After PO Submission
_AC Violated:_ AC-6: A unique Standard Purchase Order number is generated and displayed upon successful order submission.
_Status:_ Open (CS-6 unchanged) — re-confirmed automatically by Defect Logging Agent on 2026-05-19

_Evidence:_ Confirmed across 2 additional MCP executions (Phase 3a + Phase 5b, 2026-05-19T05:36:13Z). SAP consistently shows role=alert "Purchase order has been created." without the 10-digit PO number. Behavior unchanged since initial defect report on 2026-05-18.

### Comment 3 — Pabbathi Sai Chand Reddy (2026-05-21)
**Re-run confirmation (2026-05-21 v7):** Defect [CS-6](https://jira-naqet.atlassian.net/browse/CS-6) re-confirmed by automated pipeline re-run (/e2e-automation-v2 CS-2 v7).

_Test Case:_ TC-CS-021 — Verify System Displays a Formal Success Confirmation After PO Submission
_AC Violated:_ AC-6: A unique Standard Purchase Order number is generated and displayed upon successful order submission.
_Status:_ Open (CS-6 unchanged) — re-confirmed automatically by Defect Logging Agent on 2026-05-21

_Evidence:_ Confirmed across 2 additional MCP executions in this run (Phase 3a + Phase 5b, 2026-05-21T13:32:00Z). SAP consistently shows role=alert "Purchase order has been created." without the 10-digit PO number. This is the 5th consecutive confirmation across pipeline runs on 2026-05-18, 2026-05-19, and 2026-05-21. Behavior unchanged since initial defect report.

## Links

- **Jira:** https://jira-naqet.atlassian.net/browse/CS-2
