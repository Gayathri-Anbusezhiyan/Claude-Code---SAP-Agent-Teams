# [CS-3] View and Modify an Existing Purchase Order

**Issue Key:** CS-3
**Type:** Story
**Status:** To Do
**Resolution:** Unresolved
**Priority:** Critical
**Assignee:** Pabbathi Sai Chand Reddy
**Reporter:** Pabbathi Sai Chand Reddy
**Story Points:** Not estimated
**Sprint:** Not assigned
**Fix Version/s:** Unreleased
**Epic:** None
**Created:** 2026-05-12
**Updated:** 2026-05-12

## Description

As a **Procurement Officer or Buyer**, I want to open an existing Purchase Order to either review its full details in read-only mode or make changes to it (such as updating quantities), so that I have a single workflow for both auditing orders and responding to business changes without creating a new PO.

## Acceptance Criteria

- The user can access the Purchase Order application ("Display" or "Change" mode) from the SAP Fiori launchpad.

- A specific Purchase Order can be retrieved by entering its PO number.

- All PO details — including supplier, line items, materials, quantities, prices, delivery dates, and current status — are visible when the order is opened.

- In display mode, no fields are editable and the order is strictly read-only.

- A user with edit authorization can switch the order from display mode to edit mode.

- In edit mode, relevant fields (such as order quantity) are modifiable.

- Changes made to the Purchase Order are saved and persisted in the system upon confirmation.

- A success message confirming the PO has been changed is displayed after a successful save.

- The system displays a clear error message when an invalid or non-existent PO number is entered.

- Fields that cannot be changed due to the order's processing status (e.g., already goods-receipted) are locked, with a relevant explanation shown to the user.

## Links

- **Jira:** https://jira-naqet.atlassian.net/browse/CS-3
