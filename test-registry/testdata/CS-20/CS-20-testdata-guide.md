# Test Data Resolution Guide: CS-20

**User Story:** [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B
**Module:** MM — Materials Management
**Generated:** 2026-08-24

---

## Purpose

This guide explains how to resolve the `{{PLACEHOLDER}}` values in `CS-20-testdata.json` with actual data from the SAP S/4HANA Cloud tenant `my426318.s4hana.cloud.sap`.

All test cases reference parameterized test data using `{TD.*}` placeholders. Before executing test cases, replace each `{{PLACEHOLDER}}` in the JSON file with concrete values retrieved from the SAP system.

---

## Placeholder Resolution Instructions

### Master Data Placeholders

| Placeholder | Description | Resolution Method | Example Value |
|-------------|-------------|-------------------|---------------|
| `{{MATERIAL_STANDARD}}` | Standard material ID (non-GMP-critical) | Use transaction MM03 or Fiori "Display Material" app. Select a material with material group that is NOT classified as GMP-critical. Verify material is created for plant `{{PLANT_CODE}}`. | `RMPI001` |
| `{{MATERIAL_GMP_CRITICAL}}` | GMP-critical material ID | Use transaction MM03 or Fiori "Display Material" app. Select a material with material group classified as GMP-critical (pharmaceutical/life sciences). Verify material is created for plant `{{PLANT_CODE}}`. | `GMPMAT001` |
| `{{MATERIAL_GROUP_GMP}}` | Material group code for GMP-critical materials | From material master MARA-MATKL field for `{{MATERIAL_GMP_CRITICAL}}` material. | `L003` |
| `{{PLANT_CODE}}` | Valid plant code | Use transaction OX10 or Fiori "Manage Plants" app. Select an active plant assigned to a company code and purchasing organization. | `1710` |
| `{{INVALID_MATERIAL_ID}}` | Material ID that does NOT exist in plant | Use a material ID format that is syntactically valid but does NOT exist in the SAP system. Verify non-existence by searching in MM03. | `INVALID001` or `9999999999` |

### User and Authorization Placeholders

| Placeholder | Description | Resolution Method | Example Value |
|-------------|-------------|-------------------|---------------|
| `{{APPROVER_USER_ID}}` | User ID of single-level approver | Use transaction SU01 or Fiori "Maintain Users" app. Select a user with authorization object M_EINK_FRG (PR release authorization). Verify user has Fiori My Inbox app assigned in launchpad. | `APPROVER01` |
| `{{APPROVER_LEVEL1_USER_ID}}` | User ID of first-level approver (multi-level) | Same as above. Ensure user is assigned to release strategy level 1 in release strategy configuration. | `MANAGER01` |
| `{{APPROVER_LEVEL2_USER_ID}}` | User ID of second-level approver (multi-level) | Same as above. Ensure user is assigned to release strategy level 2 in release strategy configuration. | `DIRECTOR01` |
| `{{APPROVER_EMAIL}}` | Email address of approver user | From user master (SU01) or Fiori user profile. Email address is used for notification verification. | `approver@example.com` |
| `{{REQUISITIONER_EMAIL}}` | Email address of requisitioner user | From user master (SU01) or Fiori user profile. This is typically the logged-in test user's email. | `requisitioner@example.com` |

### Date Placeholders (Dynamic)

| Placeholder | Description | Resolution Method | Example Value |
|-------------|-------------|-------------------|---------------|
| `{{TODAY_PLUS_1_DAY}}` | Current date + 1 day | Calculate dynamically at test execution time. Format: YYYY-MM-DD. | `2026-08-25` (if today is 2026-08-24) |
| `{{TODAY_PLUS_7_DAYS}}` | Current date + 7 days | Calculate dynamically at test execution time. Format: YYYY-MM-DD. | `2026-08-31` |
| `{{TODAY_PLUS_10_DAYS}}` | Current date + 10 days | Calculate dynamically at test execution time. Format: YYYY-MM-DD. | `2026-09-03` |
| `{{TODAY_PLUS_14_DAYS}}` | Current date + 14 days | Calculate dynamically at test execution time. Format: YYYY-MM-DD. | `2026-09-07` |
| `{{TODAY_PLUS_21_DAYS}}` | Current date + 21 days | Calculate dynamically at test execution time. Format: YYYY-MM-DD. | `2026-09-14` |

### Test Execution Placeholders (Dynamic/Captured)

| Placeholder | Description | Resolution Method | Example Value |
|-------------|-------------|-------------------|---------------|
| `{{PR_NUMBER_AWAITING_APPROVAL}}` | PR number of existing PR not yet approved | Create a PR in prerequisite test step (e.g., using TC-CS-174 dataset). Note the PR number. Verify status = "Not Released" or "In Approval". | `1000012345` |
| `{{PR_NUMBER_CREATED}}` | PR number created during test | Capture dynamically from success message in Step 18-19 of test case. | `1000012346` |
| `{{PR_NUMBER_APPROVED}}` | PR number of an approved PR | Create a PR and complete all approval steps. Note the PR number. Verify status = "Released". | `1000012347` |
| `{{PR_NUMBER_REJECTED}}` | PR number of a rejected PR | Create a PR and have approver reject it. Note the PR number. Verify status = "Rejected". | `1000012348` |
| `{{APPROVER_REJECTION_COMMENTS}}` | Comments entered by approver during rejection | Capture dynamically from approver's rejection action in My Inbox. | `Budget not available for this period` |

### Auto-Populated and Special Placeholders

| Placeholder | Description | Resolution Method | Example Value |
|-------------|-------------|-------------------|---------------|
| `{{AUTO_POPULATED}}` | Value is auto-filled by SAP | Do NOT resolve this placeholder. It indicates that the field is system-derived and should not be manually entered. Verify the auto-populated value in the Expected Result column of test steps. | N/A — verify after trigger |
| `{{EMPTY_VALUE}}` | Leave field blank/empty | Do NOT resolve this placeholder. It indicates that the field should be left empty to test mandatory field validation (ERR test cases). | (blank) |

---

## SAP Configuration Dependencies

### Release Strategy Configuration

**Prerequisite:** Release strategy for Purchase Requisitions must be configured in SAP Customizing (transaction M_EINK_FRG or SPRO → MM → Purchasing → Purchase Requisition → Release Procedure).

Verify the following configuration:

| Configuration Item | Requirement | Verification Method |
|-------------------|-------------|---------------------|
| Release Strategy Active | Automatic release determination is enabled for PR document type | SPRO → MM → Purchasing → Purchase Requisition → Release Procedure → Release Strategy |
| Value Thresholds | At least 2 threshold levels defined (e.g., $1000 for level 1, $10000 for level 2) | Release strategy characteristic values for total value |
| Material Criticality | Material group or custom field distinguishes GMP-critical from standard materials | Material master (MM03) → material group or additional data tab |
| Approver Assignment | Users `{{APPROVER_USER_ID}}`, `{{APPROVER_LEVEL1_USER_ID}}`, `{{APPROVER_LEVEL2_USER_ID}}` are assigned to release codes/strategies | Release strategy → Release groups/codes → User assignment |
| Fiori My Inbox | Fiori My Inbox app is configured and assigned to approver users' launchpad | Fiori launchpad designer → app assignment for approver roles |
| Workflow Foundation | SAP Workflow Foundation (SWF) is active and configured for PR release | Transaction SWFVISU (workflow visualization) — verify PR release workflow is active |

**Test Data Calibration:**

To ensure test data triggers the correct release strategies:

1. **Single-Level Approval (TD-CS-20-HP-001):**
   - Total value = `quantity × pricePerUnit` = `10 × 50.00` = `$500.00`
   - Material type = standard (non-GMP)
   - **Expected:** Triggers release strategy level 1 (single approver)
   - **Verify:** Release strategy code assigned; approver = `{{APPROVER_USER_ID}}`

2. **Multi-Level Approval (TD-CS-20-HP-002):**
   - Total value = `100 × 150.00` = `$15,000.00`
   - Material type = GMP-critical
   - **Expected:** Triggers release strategy level 2 (two approvers in sequence)
   - **Verify:** Release strategy code assigned; approvers = `{{APPROVER_LEVEL1_USER_ID}}`, `{{APPROVER_LEVEL2_USER_ID}}`

3. **Approval Threshold Boundary (TD-CS-20-EDGE-001):**
   - Total value = `100 × 100.00` = `$10,000.00` (exactly at threshold)
   - **Expected:** Triggers either level 1 or level 2 based on threshold rule (>= or >)
   - **Verify:** Release strategy determination logic in configuration

---

## Data Resolution Workflow

### Step 1: Query SAP for Master Data

Run the following queries in the SAP tenant `my426318.s4hana.cloud.sap`:

1. **Materials:**
   - Transaction MM03 or Fiori "Display Material" app
   - Filter by plant = `{{PLANT_CODE}}`
   - Select at least 2 materials (1 standard, 1 GMP-critical)

2. **Plants:**
   - Transaction OX10 or Fiori "Manage Plants" app
   - Select an active plant

3. **Users:**
   - Transaction SU01 or Fiori "Maintain Users" app
   - Identify 3 users with PR approval authorization

### Step 2: Update JSON File

Open `CS-20-testdata.json` and replace all `{{PLACEHOLDER}}` instances with resolved values.

Example:
```json
"materialId": "{{MATERIAL_STANDARD}}"
```
becomes:
```json
"materialId": "RMPI001"
```

### Step 3: Validate Configuration

Before executing test cases, validate that:
- Release strategy is active in the SAP tenant
- Approver users have Fiori My Inbox app access
- Workflow notifications are enabled

### Step 4: Execute Test Cases

Run test cases in the order defined in `CS-20-coverage-matrix.md`:
1. CRITICAL priority first (TC-CS-174, TC-CS-175, TC-CS-179)
2. HIGH priority next (TC-CS-176 to TC-CS-184, TC-CS-189)
3. MEDIUM priority last (TC-CS-185 to TC-CS-188, TC-CS-190, TC-CS-191)

---

## Notes

- **Tenant-Specific:** All placeholder values must be resolved from the **my426318.s4hana.cloud.sap** tenant. Do NOT use values from other tenants (e.g., my429998).
- **Test Data Isolation:** Use dedicated test materials and user accounts. Do NOT use production master data.
- **Dynamic Dates:** Date placeholders must be calculated at test execution time to ensure future dates are valid.
- **PR Number Capture:** PR numbers are generated by SAP at PR creation time. Capture and reuse them for integration test cases (INT-01, INT-02, INT-03).
- **Approval Workflow Timing:** Allow sufficient time (1-2 minutes) for workflow tasks to appear in Fiori My Inbox after PR submission.

---

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| Release strategy not assigned to PR | Value threshold or material type does not match configured criteria | Adjust test data values to align with release strategy configuration |
| Approver does not receive My Inbox task | Workflow not active, or user not assigned to release code | Verify workflow configuration (SWFVISU) and user assignment to release groups |
| Material not found in plant | Material-plant relationship not maintained | Use transaction MM02 to extend material to plant `{{PLANT_CODE}}` |
| Notification not received | Business Notification service not configured | Verify Fiori notification settings in SAP Fiori Configuration Cockpit |

---

## Contact

For questions about test data resolution or SAP configuration, contact the SAP Basis or SAP MM configuration team responsible for tenant `my426318.s4hana.cloud.sap`.
