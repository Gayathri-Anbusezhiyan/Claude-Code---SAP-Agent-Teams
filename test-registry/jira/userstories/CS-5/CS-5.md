# [CS-5] Agentic Feature Usage Summary Dashboard

**Issue Key:** CS-5
**Type:** Story
**Status:** To Do
**Resolution:** Unresolved
**Priority:** Critical
**Assignee:** Unassigned
**Reporter:** Pabbathi Sai Chand Reddy
**Story Points:** Not estimated
**Sprint:** Not assigned
**Fix Version/s:** Unreleased
**Epic:** None
**Created:** 2026-05-14
**Updated:** 2026-05-14

## Description

**\*\*Story Slug:\*\*** agentic-feature-usage-summary-dashboard

**\*\*Status:\*\*** Active

 

**## Feature Overview**

The REWS AI Agent Usage Summary Dashboard is a single, read-only page designed for REWS leadership to monitor AI agent adoption across regions. It provides high-level KPIs, region-specific breakdowns, and a ranked list of top agent capabilities, all filterable by timeframe, region, and capability.

 

**## User Story**

**\*\*As a\*\*** REWS leader,

**\*\*I want\*\*** a single summary dashboard showing AI agent usage across all regions and capabilities,

**\*\*So that\*\*** I can quickly understand adoption patterns, identify top performers, and determine which areas require additional support or enablement.

 

**## Story Scope**

**\*\*In Scope:\*\***

* 4 High-level KPI cards.

* A data table breaking down interactions and active users by region.

* A ranked list of the top 5 agent capabilities.

* A ranked list of the top 5 active users.

* Global page filters for Timeframe (30-day, 60-day), Region, and Capability.

* "No data available" empty state handling.

* Mock seed data API layer for initial implementation.

 

**## Key Features**

1. **\*\*KPI Cards:\*\***

* Total interactions across the company.

* Total number of unique active users.

* Top performing region.

* Top capability overall.

   _\*(Note: KPI cards will dynamically filter based on the UI Design image behavior if applicable, but default to global context unless filtered).\*_

2. **\*\*Region Breakdown Table:\*\***

* Columns: Region Name, Interaction Count, Active User Count.

* Default sort: Interaction Count (Descending).

3. **\*\*Top 5 Capabilities List:\*\***

* Numbered, ranked list showing capability name and usage count.

4. **\*\*Top 5 Users List:\*\***

* Numbered, ranked list showing user ID and interaction count.

5. **\*\*Global Filters:\*\***

* Timeframe Toggle: 30-day vs. 60-day.

* Region Dropdown: APAC, EMEA, AMER, LATAM, All Regions.

* Capability Dropdown: Desk Booking, Facilities Support, All Capabilities.

5. **\*\*Empty States:\*\***

* If a specific filter combination yields 0 results, the UI must explicitly display a "No data available" message in the respective component areas.

 

**## Out of Scope**

* Trend lines, bar charts, or donut graphs.

* Visual gap indicators.

* Real-time data polling (load once on page mount is sufficient).

* Drill-downs into sub-locations or specific departments.

* Mobile responsiveness (desktop-only view).

 

**## Value**

Provides immediate, zero-friction visibility into AI adoption for leadership, enabling data-driven decisions on support and scaling without requiring complex reporting tools.

## Acceptance Criteria

## Acceptance Criteria
- **Given** a user navigates to the dashboard, **When** the page loads, **Then** the 4 KPI cards must render with data.

- **Given** the region breakdown table is displayed, **When** the data is populated, **Then** the rows must be sorted by Interaction Count in descending order.

- **Given** the user views the capabilities list, **When** the data is populated, **Then** it must display exactly the top 5 capabilities ranked by usage count.

- **Given** the user views the users list, **When** the data is populated, **Then** it must display exactly the top 5 users ranked by interaction count.

- **Given** the user selects a combination of filters (e.g., "LATAM" and "Facilities Support"), **When** the resulting data is empty, **Then** the affected components must display a "No data available" message instead of a generic error or 0.

- **Given** the user interacts with the UI, **When** they apply a filter, **Then** all applicable components on the page must re-fetch and update to reflect the filtered context.

 
## Technical & Architecture Rules
- **API Architecture:** You MUST explicitly implement the **3-Tier API architecture**. The Node.js API must be structured into:

1. **Domain Layer** (`api/domain/`): Handles raw SQLite queries and data access.

1. **Business Layer** (`api/business/`): Orchestrates business logic and applies rules.

1. **Experience Layer** (`api/experience/`): Formats the aggregated dashboard data for the frontend.

- **Database:** SQLite via `sql.js` (No `better-sqlite3`). Mock seed data must be loaded on initialization.

 
## Design Notes
- **Design System:** Standard Google Material Design colors.

- Blue: `#4285F4`

- Red: `#EA4335`

- Yellow: `#FBBC05`

- Green: `#34A853`

- **Layout:** Three stacked sections on a clean white background.

- **Interactions:** No fancy animations. Keep transitions minimal and professional.

- **Fidelity:** The frontend must respect and perfectly replicate the UI Design image (PNG) provided/generated in the subsequent UX stage.

## Links

- **Jira:** https://jira-naqet.atlassian.net/browse/CS-5
