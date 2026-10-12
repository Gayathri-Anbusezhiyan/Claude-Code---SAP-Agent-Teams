# Test Data Resolution Guide: CS-47

**User Story:** [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Module:** Quality Management (QM) — Sales & Distribution (SD) Integration
**Generated:** 2026-08-24
**Test Data JSON:** `testdata/CS-47/CS-47-testdata.json`

---

## Purpose

This guide explains how to resolve each `{{PLACEHOLDER}}` in the CS-47 testdata JSON file with real SAP values from your test environment. All placeholders must be replaced before executing the test cases.

**IMPORTANT:** Use only SAP QAS (Quality Assurance System) or sandbox instance data — NEVER use production customer, material, or batch data. GMP-compliant Quality Notifications may contain sensitive information and must not be tested with real production data.

---

## Master Data Placeholders

### Sales and Return Orders

| Placeholder | SAP Object | How to Resolve | Example Value | Notes |
|------------|-----------|----------------|---------------|-------|
| `{{SALES_ORDER_VALID}}` | Sales Order (VBAK) | Use an existing Sales Order with complete customer, material, and batch data in the test system | `40000123` | Must have material with batch management enabled; customer must exist in Customer Master |
| `{{RETURN_ORDER_VALID}}` | Return Order (VBAK) | Use an existing Return Order (document type RE) with complete customer, material, and batch data | `40000456` | Return Orders are special Sales Order document types; ensure batch is assigned to return line item |
| `{{SALES_ORDER_MISSING_MATERIAL}}` | Sales Order (VBAK) | Create or identify a Sales Order with incomplete material data on line items (material not released or missing) | `40000789` | Intentionally incomplete for negative test; may require creating a test Sales Order with invalid material reference |
| `{{SALES_ORDER_MISSING_BATCH}}` | Sales Order (VBAK) | Create or identify a Sales Order where the material has batch management enabled but no batch assigned to the line item | `40000790` | Batch-managed material without batch assignment; rare in production but valid negative test |
| `{{SALES_ORDER_MISSING_CUSTOMER}}` | Sales Order (VBAK) | Create or identify a Sales Order with missing or invalid customer assignment (customer deleted or blocked) | `40000791` | Intentionally incomplete for negative test; may require creating a test Sales Order referencing a non-existent customer |

### Customer Data

| Placeholder | SAP Object | How to Resolve | Example Value | Notes |
|------------|-----------|----------------|---------------|-------|
| `{{CUSTOMER_ID_VALID}}` | Customer Master (KNA1) | Use an existing active customer ID from the test system | `10000123` | Customer must be active and not blocked for sales |
| `{{CUSTOMER_NAME_VALID}}` | Customer Master (KNA1-NAME1) | The name corresponding to `{{CUSTOMER_ID_VALID}}` | `Acme Pharmaceuticals Inc.` | Auto-populated by SAP; include in testdata for verification purposes |

### Material and Batch Data

| Placeholder | SAP Object | How to Resolve | Example Value | Notes |
|------------|-----------|----------------|---------------|-------|
| `{{MATERIAL_NUMBER_VALID}}` | Material Master (MARA) | Use an existing material with batch management enabled (XCHPF flag set) | `MAT-PHARMA-001` | Material must be released for the plant and have batch management active |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material Master (MAKT-MAKTX) | The description corresponding to `{{MATERIAL_NUMBER_VALID}}` | `Paracetamol 500mg Tablets` | Auto-populated by SAP; include in testdata for verification purposes |
| `{{BATCH_NUMBER_VALID}}` | Batch Master (MCH1) | Use an existing batch number for the material in the test system | `BATCH-2026-001` | Batch must exist for the material and be assigned to the Sales/Return Order |

### Quality Notification Data

| Placeholder | SAP Object | How to Resolve | Example Value | Notes |
|------------|-----------|----------------|---------------|-------|
| `{{QUALITY_NOTIFICATION_OPEN}}` | Quality Notification (QMEL) | Use an existing Quality Notification with status "Open" or "Under Investigation" | `100000123456` | 12-digit numeric format; must be editable and closeable by the test user |
| `{{NOTIFICATION_TYPE_CUSTOMER_COMPLAINT}}` | Quality Notification Type (TQ80) | Use the system-configured notification type code for Customer Complaints | `Q1` or `CC` | QM configuration-dependent; check TQ80 table or ask QM configuration team |

---

## Closure Data Placeholders

### GMP-Compliant Closure Fields

| Placeholder | Field | How to Resolve | Example Value | Notes |
|------------|-------|----------------|---------------|-------|
| `{{ROOT_CAUSE_ANALYSIS_VALID}}` | Root Cause Analysis (QMEL-QMTXT) | Enter meaningful root cause text with at least 50 characters (GMP minimum) | `Raw material contamination detected during incoming inspection. Batch failed microbial test.` | Must be ≥ 50 characters to meet GMP documentation requirements |
| `{{ROOT_CAUSE_MIN_50_CHARS}}` | Root Cause Analysis (QMEL-QMTXT) | Enter root cause text with EXACTLY 50 characters (lower boundary test) | `Supplier process deviation caused quality issue.` | Exactly 50 characters (count carefully); used for EDGE-03 boundary test |
| `{{CORRECTIVE_ACTION_VALID}}` | Corrective Action (QMEL-QMTXT) | Enter meaningful corrective action plan with at least 50 characters (GMP minimum) | `Supplier notified; additional incoming inspection added; batch quarantined pending investigation.` | Must be ≥ 50 characters to meet GMP documentation requirements |
| `{{CORRECTIVE_ACTION_MIN_50_CHARS}}` | Corrective Action (QMEL-QMTXT) | Enter corrective action text with EXACTLY 50 characters (lower boundary test) | `Re-train supplier on quality standards and process.` | Exactly 50 characters (count carefully); used for EDGE-04 boundary test |
| `{{DISPOSITION_CODE_VALID}}` | Disposition Code (QMEL-QMANUM) | Use a valid disposition code from the QM configuration (dropdown value) | `D1` or `REJECTED` | System-configured values; check TQ07 table or QM configuration |

---

## Defect Description Placeholders

| Placeholder | Field | How to Resolve | Example Value | Notes |
|------------|-------|----------------|---------------|-------|
| `{{DEFECT_DESCRIPTION_VALID}}` | Defect Description (QMEL-QMTXT) | Enter meaningful customer complaint text with at least 20 characters (GMP minimum) | `Customer reported tablets discolored and packaging damaged during shipment.` | Must be ≥ 20 characters to meet GMP documentation requirements |
| `{{DEFECT_DESCRIPTION_MIN_20_CHARS}}` | Defect Description (QMEL-QMTXT) | Enter defect description with EXACTLY 20 characters (lower boundary test) | `Tablets discolored.` | Exactly 20 characters (count carefully); used for EDGE-01 boundary test |
| `{{DEFECT_DESCRIPTION_MAX_1000_CHARS}}` | Defect Description (QMEL-QMTXT) | Enter defect description with EXACTLY 1000 characters (upper boundary test) | `Customer reported... [long text with exactly 1000 characters]` | Exactly 1000 characters; generate or paste long complaint text; used for EDGE-02 boundary test |

---

## Integration Data Placeholders

| Placeholder | Field | How to Resolve | Example Value | Notes |
|------------|-------|----------------|---------------|-------|
| `{{QA_TEAM_OR_USER_ID}}` | QA Team Assignment (Workflow) | Identify the QA team or user ID that receives Quality Notifications per workflow routing rules | `QA_TEAM_01` or `USER12345` | System-configured workflow assignment; check with Workflow configuration team or test in SAP |
| `{{EXPECTED_NOTIFICATION_COUNT}}` | Complaint Report Count | Count the number of existing Quality Notifications for the test material/batch in the test system | `3` | Pre-condition for TC-CS-146; create at least 3 closed Quality Notifications before executing the test |

---

## Environment Variables (from `.env`)

These are NOT placeholders in the testdata JSON but are referenced in test case steps using `{ENV.*}` syntax:

| Variable | Source | Example Value | Notes |
|----------|--------|---------------|-------|
| `SAP_FIORI_URL` | `.env` | `https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-autoStartTour=...` | Full Fiori launch URL including SSO parameters |
| `SAP_USERNAME` | `.env` | `sunil.yogi@capgemini.com` | Test user email with QA Specialist role and QM authorization |
| `SAP_PASSWORD` | `.env` | `SAP12345@1` | Test user password (stored securely in `.env`) |

---

## Data Resolution Checklist

Before executing CS-47 test cases, verify that you have resolved:

### Happy Path (HP) — 2 datasets
- [ ] `TD-CS-047-001`: Sales Order with complete data
- [ ] `TD-CS-047-002`: Return Order with complete data

### Alternative Path (AP) — 3 datasets
- [ ] `TD-CS-047-AP-001`: Quality Notification with closure fields
- [ ] `TD-CS-047-AP-002`: Material Number for report filtering
- [ ] `TD-CS-047-AP-003`: Batch Number for report filtering

### Negative (NEG) — 6 datasets
- [ ] `TD-CS-047-NEG-001`: Sales Order missing material data
- [ ] `TD-CS-047-NEG-002`: Sales Order missing batch data
- [ ] `TD-CS-047-NEG-003`: Sales Order missing customer data
- [ ] `TD-CS-047-NEG-004`: Quality Notification for closure without disposition (Root Cause + Corrective Action populated)
- [ ] `TD-CS-047-NEG-005`: Quality Notification for closure without corrective action (Root Cause + Disposition populated)
- [ ] `TD-CS-047-NEG-006`: Quality Notification for closure without root cause (Corrective Action + Disposition populated)

### Error (ERR) — 4 datasets
- [ ] `TD-CS-047-ERR-001`: Sales Order (Defect Description intentionally left empty)
- [ ] `TD-CS-047-ERR-002`: Quality Notification (Disposition Code intentionally left empty)
- [ ] `TD-CS-047-ERR-003`: Quality Notification (Corrective Action intentionally left empty)
- [ ] `TD-CS-047-ERR-004`: Quality Notification (Root Cause intentionally left empty)

### Edge Case (EDGE) — 4 datasets
- [ ] `TD-CS-047-EDGE-001`: Defect Description with exactly 20 characters
- [ ] `TD-CS-047-EDGE-002`: Defect Description with exactly 1000 characters
- [ ] `TD-CS-047-EDGE-003`: Root Cause with exactly 50 characters
- [ ] `TD-CS-047-EDGE-004`: Corrective Action with exactly 50 characters

### Integration (INT) — 3 datasets
- [ ] `TD-CS-047-INT-001`: Sales Order + closure fields for bidirectional link test
- [ ] `TD-CS-047-INT-002`: Sales Order + expected QA team/user assignment
- [ ] `TD-CS-047-INT-003`: Material, Batch, and expected notification count for report test

---

## Data Privacy and Compliance Notes

### GMP Compliance
- All Quality Notifications are GMP-controlled documents
- Defect Description must be ≥ 20 characters (enforced by SAP QM configuration for GMP compliance)
- Root Cause Analysis and Corrective Action must be ≥ 50 characters at closure (GMP documentation requirement)
- Disposition Code is mandatory at closure (GMP requirement)

### Data Privacy
- Do NOT use real production customer names, contact information, or complaint details in test data
- Use anonymized or synthetic customer data for all test scenarios
- Batch numbers should reference test batches, not production batches with real quality issues

### Test Environment
- All test execution must occur in SAP QAS (Quality Assurance System) or sandbox instance
- Do NOT execute these test cases in SAP Production (PRD) environment
- Test user must have appropriate QM module authorizations (Q_QMEL - Create, Q_QMEL - Change, Q_QMEL - Display)

---

## Troubleshooting

### Common Issues

| Issue | Cause | Resolution |
|-------|-------|-----------|
| "Material does not exist" error | Material is not created or not released for the plant | Create material master with batch management enabled (XCHPF flag set); release for plant |
| "Batch does not exist" error | Batch is not created for the material | Create batch master (MCH1) for the material using transaction MSC1N or Manage Batches Fiori app |
| "Customer does not exist" error | Customer is deleted or blocked | Create customer master (KNA1) using transaction VD01 or Maintain Customer Fiori app |
| Disposition Code dropdown is empty | QM disposition codes not configured | Check TQ07 table; ask QM configuration team to configure disposition codes |
| Quality Notification not routed to worklist | Workflow routing rules not configured | Check Workflow configuration (transaction SWU3); verify QA team assignment rules |
| Status not visible on Sales Order | Bidirectional link not configured | Verify SD-QM integration configuration; check if Quality Notification number field is enabled on Sales Order UI |

---

## Contact

For questions about test data resolution or SAP configuration:
- **QM Module Configuration:** Contact SAP QM Configuration Team
- **Workflow Routing:** Contact SAP Workflow Configuration Team
- **Test Data Creation:** Contact SAP Test Data Management Team
- **GMP Compliance Requirements:** Contact Quality Assurance Compliance Team

---
