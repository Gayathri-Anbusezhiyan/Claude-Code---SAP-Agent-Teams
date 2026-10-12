# Test Data Guide: [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man

**Generated:**    2026-08-23
**Module:**       MM — Materials Management
**Feature:**      Vendor Change Request Approval Workflow
**Data File:**    testdata/CS-31/CS-31-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-31/CS-31-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Vendor Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{VENDOR_ID_VALID}}` | An active vendor account number in the SAP test system with approved status | SAP Fiori: Manage Suppliers / Manage Business Partner → search active vendors; or T-code LFA1/BP |
| `{{VENDOR_ID_FOR_REJECTION}}` | A vendor account with a pending change request that will be used for rejection testing | Create a vendor with a pending manufacturing site change request in the test system |
| `{{VENDOR_ID_WITH_PENDING_CHANGE}}` | A vendor account with a pending manufacturing site change request (not yet approved) for PO blocking test | Create a vendor with a pending manufacturing site change request; ensure status is "Pending Approval" |
| `{{VENDOR_ID_EDGE_TEST}}` | A vendor account for edge case testing (maximum length comments) | Any active vendor with a pending change request |
| `{{VENDOR_ID_MAX_ATTACH_TEST}}` | A vendor account for edge case testing (maximum size attachment) | Any active vendor with a pending change request |
| `{{VENDOR_ID_NO_ATTACH_TEST}}` | A vendor account for edge case testing (no attachment) | Any active vendor with a pending change request |

### Change Request Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CHANGE_REQUEST_ID_PENDING}}` | A workflow item ID for a pending vendor manufacturing site change request | SAP Fiori: My Inbox → locate a pending vendor change request; note the workflow item ID |
| `{{CHANGE_REQUEST_ID_FOR_REJECTION}}` | A workflow item ID for a change request to be rejected | Create a change request in test system; note the workflow ID before approval/rejection |
| `{{CHANGE_REQUEST_ID_PENDING_STATUS}}` | A workflow item ID for a change request in pending status (used for PO blocking test) | Create a change request and leave it in pending status (do not approve) |
| `{{CHANGE_REQUEST_ID_ERROR_TEST}}` | A workflow item ID for error scenario testing (missing decision) | Any pending change request workflow item |
| `{{CHANGE_REQUEST_ID_MISSING_VENDOR}}` | A workflow item ID for error scenario testing (missing vendor ID) | Simulated test condition — may require test data setup or manual creation of incomplete change request |
| `{{CHANGE_REQUEST_ID_EDGE_TEST}}` | A workflow item ID for edge case testing (max comments) | Any pending change request workflow item |
| `{{CHANGE_REQUEST_ID_MAX_ATTACH_TEST}}` | A workflow item ID for edge case testing (max attachment) | Any pending change request workflow item |
| `{{CHANGE_REQUEST_ID_NO_ATTACH_TEST}}` | A workflow item ID for edge case testing (no attachment) | Any pending change request workflow item |

### Approval Decision and Comments

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{APPROVAL_COMMENTS_STANDARD}}` | Standard approval comments text | Use realistic text like "Manufacturing site audit completed. All compliance requirements met. Approved for procurement." (50-150 characters) |
| `{{REJECTION_COMMENTS}}` | Rejection reason comments | Use realistic text like "Manufacturing site does not meet GMP standards. Audit report incomplete. Rejected pending further review." (50-150 characters) |
| `{{OPTIONAL_COMMENTS}}` | Optional comments for error testing | Use any short text like "Test comments" (10-50 characters) |
| `{{APPROVAL_COMMENTS_MAX_ATTACH}}` | Approval comments for max attachment test | Use standard approval text (50-100 characters) |
| `{{APPROVAL_COMMENTS_NO_ATTACH}}` | Approval comments for no attachment test | Use text like "Approval based on verbal confirmation. Written audit report to follow." (50-100 characters) |
| `{{COMMENTS_MAX_LENGTH_255}}` | Comments text at exactly 255 characters (maximum allowed) | Use a 255-character string. Example: "This approval is based on the comprehensive manufacturing site audit conducted on [DATE]. The audit covered all critical areas including production facilities, quality control systems, compliance with GMP standards, and supplier qualification." (pad to exactly 255 chars) |

### Attachment Files

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{AUDIT_REPORT_FILE_VALID}}` | A valid audit report file for attachment (PDF or DOCX, under 10 MB) | Create or use a sample audit report file; typical size 1-5 MB; format: PDF, DOCX, or XLSX; store in test data folder |
| `{{ATTACHMENT_FILE_10MB}}` | An audit report file at exactly 10 MB (maximum allowed attachment size) | Create a test file at exactly 10.0 MB (10,485,760 bytes); can be a PDF padded to exact size; store in test data folder |

### Manufacturing Site Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{NEW_MANUFACTURING_SITE_ADDRESS}}` | The new manufacturing site address/code shown in the approved change request | Use a realistic address or site code like "Site B - 123 Industrial Park, City, Country" or "SITE_B_001" |
| `{{CURRENT_MANUFACTURING_SITE}}` | The existing (current) manufacturing site address/code before the change request | Use a realistic address or site code like "Site A - 456 Factory Road, City, Country" or "SITE_A_001" |
| `{{PROPOSED_MANUFACTURING_SITE}}` | The proposed new manufacturing site in the change request (to be rejected) | Use a different address/code like "Site C - 789 Industrial Zone, City, Country" or "SITE_C_001" |

### Material Data (for PO Blocking Test)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_VALID}}` | An active material number configured for the test plant | SAP Fiori: Manage Material → search materials; or T-code MM60/MARA |

### Quantity and Price (for PO Blocking Test)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PO_QUANTITY_STANDARD}}` | A standard order quantity for PO creation test | Use 10 (EA, PC, or KG depending on UoM) |
| `{{NET_PRICE_VALID}}` | A realistic net price per UoM | Use 100.00 (USD or system currency) |

### Organizational Structure (for PO Blocking Test)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code configured for the purchasing org | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Test Data Preparation Steps

### Pre-requisite Master Data Setup

Before executing test cases, ensure the following master data exists in your SAP test system:

1. **Vendor Records:**
   - Create or identify 3-4 vendor accounts with approved status
   - Assign each vendor to a purchasing organization and plant
   - Ensure vendor master includes a manufacturing site field

2. **Change Requests:**
   - Create vendor change requests for manufacturing site changes
   - Use SAP Fiori "Create Supplier Change Request" or equivalent workflow app
   - Leave some change requests in "Pending Approval" status (for NEG-02, ERR scenarios)
   - Assign change requests to QA Manager role for approval

3. **Material Master:**
   - Identify 1 active material number for PO blocking test (TC-CS-033)
   - Ensure material is configured for the test plant

4. **Workflow Configuration:**
   - Verify My Inbox app is configured for the test user
   - Ensure QA Manager role has authorization for vendor change request approval
   - Verify workflow triggers correctly when vendor manufacturing site is changed

### Test Data Files (Attachments)

Store attachment files in a dedicated test data folder (e.g., `testdata/CS-31/attachments/`):

1. **`audit-report-valid.pdf`** — Sample audit report, 2-5 MB, for HP test (TC-CS-031)
2. **`audit-report-10mb.pdf`** — Test file at exactly 10.0 MB for EDGE test (TC-CS-037)
3. Ensure file paths are updated in the test data JSON after file creation

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. Vendor change requests are typically created through SAP Master Data Governance (MDG) or Supplier Relationship Management (SRM) workflows — consult your SAP administrator for test system setup
4. The My Inbox app may require specific workflow customization in your test system — verify it is configured to display vendor change requests
5. **Regulatory Note:** Vendor manufacturing site changes are subject to GMP/ISO compliance in regulated industries — test data should reflect realistic audit documentation requirements
6. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
7. For missing vendor ID test (TC-CS-035), manual setup or data corruption simulation may be required — consult test environment owner

---

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| No pending change requests in My Inbox | Create a vendor change request manually using SAP workflow apps; assign to QA Manager role |
| PO creation not blocked for vendor with pending change | Verify system configuration: vendor blocking rules for pending change requests; may require BAdI or workflow customization |
| Attachment upload fails | Verify attachment size limits in SAP system configuration; check file format restrictions (PDF, DOCX, XLSX typically allowed) |
| Approval decision field not mandatory | Verify workflow configuration: decision field should be marked as mandatory in workflow template |
| Vendor record not reverting on rejection | Verify workflow logic includes automatic rollback functionality; may require custom development or standard SAP workflow configuration |

---
