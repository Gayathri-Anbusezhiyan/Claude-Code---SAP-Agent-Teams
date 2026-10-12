# Test Data Guide: [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G

**Module:** PP-QM — Production Planning and Control / Quality Management
**Feature:** Electronic Batch Record Review and Approval
**Generated:** 2026-08-24

---

## Overview

This guide explains how to substitute real SAP values for the `{{PLACEHOLDER}}` tokens in the test data JSON file `CS-53-testdata.json`. All test cases reference this data file using `{TD.*}` placeholders.

**IMPORTANT:** Test data must be resolved **before** test execution. Update the JSON file with actual values from the SAP S/4HANA Cloud test tenant (my426318.s4hana.cloud.sap).

---

## Environment Variables (from .env)

These values are already configured in `.env` and referenced as `{ENV.*}` in test cases. **Do NOT include them in the JSON file.**

| Placeholder | Source | Description |
|-------------|--------|-------------|
| `{ENV.SAP_FIORI_URL}` | `.env` | Full Fiori Launchpad URL with SSO parameters |
| `{ENV.SAP_USERNAME}` | `.env` | QA Reviewer user email (e.g., sunil.yogi@capgemini.com) |
| `{ENV.SAP_PASSWORD}` | `.env` | User's SAP password |
| `{ENV.SAP_USERNAME_UNAUTHORIZED}` | `.env` | User email without QA authorization (for NEG-03 test) |
| `{ENV.SAP_PASSWORD_UNAUTHORIZED}` | `.env` | Password for unauthorized user (for NEG-03 test) |

---

## Test Data Parameters — Resolution Instructions

### Happy Path Data

#### {{PROCESS_ORDER_NUMBER_TECO}}
- **Type:** Process Order Number
- **Status Required:** TECO (Technically Complete)
- **How to Find:**
  1. Navigate to SAP Fiori: "Monitor Production Orders" or "Manage Process Orders"
  2. Filter by Status = TECO
  3. Select a process order with a linked batch, all operations confirmed, and inspection results recorded
  4. Use the Process Order number (e.g., 1000012345)
- **Example:** `1000012345`

#### {{BATCH_NUMBER_VALID}}
- **Type:** Batch Number
- **Status Required:** Linked to TECO process order, all in-process controls recorded and in-spec
- **How to Find:**
  1. From the selected TECO process order, note the linked Batch Number
  2. Navigate to "Display Batch" (Fiori app or transaction code MSC3N)
  3. Verify batch is linked to the process order and has QM inspection lot with results
- **Example:** `0001234567`

#### {{MATERIAL_DESCRIPTION}}
- **Type:** Material Description
- **How to Find:**
  - Auto-populated by SAP from the material master for the batch
  - Reference only (not user-entered); captured during test execution
- **Example:** `Finished Product - Batch Lot A`

#### {{PLANT_CODE}}
- **Type:** Plant Code
- **How to Find:**
  - Auto-populated by SAP from the batch master
  - Reference only (not user-entered); captured during test execution
- **Example:** `1710`

#### {{COMPONENT_CONSUMPTION_DATA}}
- **Type:** Component Consumption Data
- **How to Find:**
  - Auto-populated by SAP from goods movements (MSEG table) linked to the process order
  - Reference only; verified during test execution
- **Example:** `Component1: 100 KG, Component2: 50 L`

#### {{INSPECTION_RESULTS_IN_SPEC}}
- **Type:** In-Process Control Results (All In-Spec)
- **How to Find:**
  - Auto-populated by SAP from QM inspection results (QAMR table)
  - Reference only; verified during test execution
  - All characteristics should show "In Spec" or "Pass" status
- **Example:** `pH: 7.2 (In Spec), Temperature: 25°C (In Spec)`

---

### Deviation Data (HP-02)

#### {{PROCESS_ORDER_NUMBER_DEVIATION}}
- **Type:** Process Order Number with Out-of-Spec Result and Approved Deviation
- **Status Required:** TECO (Technically Complete), at least one out-of-spec inspection result with linked approved quality notification
- **How to Find:**
  1. Navigate to "Monitor Quality Notifications" or "Manage Quality Notifications"
  2. Filter by Status = Approved
  3. Note the linked Batch Number and Process Order Number
  4. Verify the process order is in TECO status
- **Example:** `1000067890`

#### {{BATCH_NUMBER_WITH_DEVIATION}}
- **Type:** Batch Number with Approved Deviation
- **How to Find:**
  - From the approved quality notification, note the linked Batch Number
- **Example:** `0001234568`

#### {{DEVIATION_REFERENCE_APPROVED}}
- **Type:** Quality Notification Number (Deviation)
- **Status Required:** Approved
- **How to Find:**
  1. Navigate to "Manage Quality Notifications"
  2. Select a quality notification with Status = Approved and Type = Deviation
  3. Note the Quality Notification Number
- **Example:** `300000123`

#### {{OUT_OF_SPEC_RESULT}}
- **Type:** Out-of-Specification Inspection Result
- **How to Find:**
  - Auto-populated by SAP from QM inspection results
  - Reference only; verified during test execution
  - At least one characteristic should show "Out of Spec" or "Fail" status
- **Example:** `Viscosity: 1200 cP (Out of Spec, Target: 1000 ± 100 cP)`

---

### Archived Batch Data (HP-03)

#### {{BATCH_NUMBER_ARCHIVED}}
- **Type:** Archived Batch Number
- **Status Required:** Batch record approved and archived
- **How to Find:**
  1. Use a batch from a previously approved batch record (e.g., from TC-CS-125 execution)
  2. OR navigate to "Review Batch Records" and search for batches with status = APPROVED
- **Example:** `0001234567` (same as {{BATCH_NUMBER_VALID}} after approval)

#### {{ARCHIVE_REFERENCE_EBR}}
- **Type:** Archive Object ID or EBR Document Number
- **How to Find:**
  - After batch record approval, SAP displays the EBR document number or archive reference
  - Note this value from the approved batch record
- **Example:** `EBR-2026-00001` or `ARCH1234567890`

#### {{REVIEWER_USER_ID_ARCHIVED}}
- **Type:** User ID who approved the batch record
- **How to Find:**
  - From the archived batch record, view the "Reviewed By" field
- **Example:** `SUNIL.YOGI` or `{ENV.SAP_USERNAME}`

#### {{SIGNED_ON_TIMESTAMP_UTC}}
- **Type:** Approval Timestamp in UTC Format
- **How to Find:**
  - From the archived batch record, view the "Signed On" timestamp
- **Example:** `2026-08-23T10:15:30Z`

---

### Reviewer Comments Data (AP-01)

#### {{REVIEWER_COMMENTS_STANDARD}}
- **Type:** Reviewer Comments Text
- **Length:** Up to 255 characters (standard)
- **How to Resolve:**
  - Use a standard review comment template
- **Example:** `Batch reviewed; all in-process controls within specification; no deviations recorded; approved for release to Unrestricted-Use stock.`

---

### Negative Test Data

#### {{PROCESS_ORDER_NUMBER_INCOMPLETE}}
- **Type:** Process Order Number with Missing In-Process Control Result
- **Status Required:** TECO, but at least one mandatory inspection characteristic is NOT recorded in QM
- **How to Find:**
  1. Create a test process order in SAP (or coordinate with SAP admin)
  2. Complete the process order but do NOT record all mandatory in-process control results
  3. Set status to TECO
- **Example:** `1000098765` (manually configured in test environment)

#### {{BATCH_NUMBER_INCOMPLETE}}
- **Type:** Batch Number with Missing In-Process Control Result
- **How to Find:**
  - From the incomplete process order, note the linked Batch Number
- **Example:** `0009876543`

#### {{MISSING_CONTROL_CHARACTERISTIC_NAME}}
- **Type:** Name of the Missing Inspection Characteristic
- **How to Find:**
  - From the inspection plan, identify a mandatory characteristic that is NOT recorded
- **Example:** `Final pH` or `Assay (%)`

#### {{PROCESS_ORDER_NUMBER_OUT_OF_SPEC}}
- **Type:** Process Order Number with Out-of-Spec Result and NO Approved Deviation
- **Status Required:** TECO, at least one out-of-spec inspection result, NO linked quality notification
- **How to Find:**
  1. Create a test process order in SAP (or coordinate with SAP admin)
  2. Record an out-of-spec inspection result in QM
  3. Do NOT create or approve a quality notification (deviation)
  4. Set status to TECO
- **Example:** `1000054321` (manually configured in test environment)

#### {{BATCH_NUMBER_OUT_OF_SPEC}}
- **Type:** Batch Number with Out-of-Spec Result and No Deviation
- **How to Find:**
  - From the out-of-spec process order, note the linked Batch Number
- **Example:** `0005432109`

#### {{OUT_OF_SPEC_CHARACTERISTIC_NAME}}
- **Type:** Name of the Out-of-Specification Characteristic
- **How to Find:**
  - From the inspection results, identify the characteristic with "Out of Spec" status
- **Example:** `Viscosity` or `Purity (%)`

#### {{PROCESS_ORDER_NUMBER_UNAPPROVED}}
- **Type:** Process Order Number with Unapproved Batch Record
- **Status Required:** TECO, batch record NOT approved (status = PENDING or IN REVIEW)
- **How to Find:**
  1. Use a process order that is complete but the batch record has NOT been approved by QA
  2. OR use the same process order from NEG-01 or NEG-02 (before approval)
- **Example:** `1000098765`

#### {{BATCH_NUMBER_UNAPPROVED}}
- **Type:** Batch Number with Unapproved Batch Record
- **Status Required:** Batch record NOT approved; currently in Restricted-Use stock
- **How to Find:**
  - From the unapproved process order, note the linked Batch Number
- **Example:** `0009876543`

#### {{MATERIAL_NUMBER_UNAPPROVED}}
- **Type:** Material Number for Unapproved Batch
- **How to Find:**
  1. From the unapproved batch, navigate to "Display Batch" (MSC3N)
  2. Note the Material Number
- **Example:** `MAT123456`

#### {{PLANT_CODE_UNAPPROVED}}
- **Type:** Plant Code for Unapproved Batch
- **How to Find:**
  - From the unapproved batch master, note the Plant code
- **Example:** `1710`

#### {{STORAGE_LOCATION_UNAPPROVED}}
- **Type:** Storage Location Code for Unapproved Batch
- **How to Find:**
  - From the batch stock status, note the Storage Location code
- **Example:** `0001`

#### {{QUANTITY_TO_TRANSFER}}
- **Type:** Quantity to Transfer to Unrestricted-Use
- **How to Resolve:**
  - Use a valid quantity within the available batch stock (e.g., 10 units)
- **Example:** `10`

---

### Error Test Data

#### Empty Value (for ERR-01, ERR-02, ERR-03)
- **Type:** Empty/Blank Value
- **How to Resolve:**
  - In the JSON file, use `""` (empty string)
- **Example:** `""`

#### {{INVALID_PASSWORD}}
- **Type:** Invalid SAP Password
- **How to Resolve:**
  - Use any incorrect password string (NOT the actual user password)
- **Example:** `WRONGPASS123`

#### {{NON_EXISTENT_PROCESS_ORDER}}
- **Type:** Non-existent Process Order Number
- **How to Resolve:**
  - Use a process order number that does NOT exist in SAP (e.g., 9999999999)
  - Verify by searching in SAP that this number is not found
- **Example:** `9999999999`

#### {{NON_EXISTENT_BATCH}}
- **Type:** Non-existent Batch Number
- **How to Resolve:**
  - Use a batch number that does NOT exist in SAP (e.g., BATCH999999)
  - Verify by searching in SAP that this number is not found
- **Example:** `BATCH999999`

#### {{PROCESS_ORDER_NUMBER_NOT_TECO}}
- **Type:** Process Order Number NOT in TECO Status
- **Status Required:** REL (Released) or PCNF (Partially Confirmed) — NOT TECO
- **How to Find:**
  1. Navigate to "Monitor Production Orders"
  2. Filter by Status = REL or PCNF
  3. Select a process order that is NOT technically complete
- **Example:** `1000011111`

#### {{BATCH_NUMBER_NOT_TECO}}
- **Type:** Batch Number linked to Non-TECO Process Order
- **How to Find:**
  - From the non-TECO process order, note the linked Batch Number
- **Example:** `0001111111`

#### {{PROCESS_ORDER_STATUS_NOT_TECO}}
- **Type:** Current Status of Non-TECO Process Order
- **How to Find:**
  - Auto-populated by SAP; reference only
- **Example:** `REL` (Released) or `PCNF` (Partially Confirmed)

---

### Edge Case Data

#### {{PROCESS_ORDER_NUMBER_ZERO_DEVIATIONS}}
- **Type:** Process Order Number with Zero Deviations (All In-Spec)
- **Status Required:** TECO, all inspection results in-spec, zero quality notifications
- **How to Find:**
  - Same as {{PROCESS_ORDER_NUMBER_TECO}} (can reuse the same data)
- **Example:** `1000012345`

#### {{BATCH_NUMBER_ZERO_DEVIATIONS}}
- **Type:** Batch Number with Zero Deviations
- **How to Find:**
  - Same as {{BATCH_NUMBER_VALID}} (can reuse the same data)
- **Example:** `0001234567`

#### {{REVIEWER_COMMENTS_255_CHARS}}
- **Type:** Reviewer Comments Text with Exactly 255 Characters
- **How to Resolve:**
  - Generate a text string with exactly 255 characters
- **Example:** `Batch thoroughly reviewed by QA team. All in-process control parameters including pH, temperature, viscosity, assay percentage, and impurity levels are within acceptable specification limits. Component consumption data verified against bill of materials. No deviations or quality notifications recorded. Approved for release.` (exactly 255 characters)

---

### Integration Test Data

#### {{PROCESS_ORDER_NUMBER_INTEGRATION}}
- **Type:** Process Order Number for PP-QM Integration Test
- **Status Required:** TECO, with complete operation confirmations, component consumption, and inspection results
- **How to Find:**
  - Same as {{PROCESS_ORDER_NUMBER_TECO}} (can reuse the same data)
- **Example:** `1000012345`

#### {{BATCH_NUMBER_INTEGRATION}}
- **Type:** Batch Number for PP-QM Integration Test
- **How to Find:**
  - Same as {{BATCH_NUMBER_VALID}} (can reuse the same data)
- **Example:** `0001234567`

#### {{EXPECTED_OPERATION_COUNT}}
- **Type:** Expected Number of Confirmed Operations
- **How to Find:**
  1. From the process order, navigate to "Display Process Order" → Operations tab
  2. Count the number of confirmed operations
- **Example:** `5`

#### {{EXPECTED_COMPONENT_COUNT}}
- **Type:** Expected Number of Consumed Components
- **How to Find:**
  1. From the process order, navigate to "Display Process Order" → Components tab
  2. Count the number of consumed components (with goods movements posted)
- **Example:** `8`

#### {{EXPECTED_INSPECTION_LOT}}
- **Type:** Expected Inspection Lot Number
- **How to Find:**
  1. From the batch, navigate to "Display Batch" → Quality tab
  2. Note the Inspection Lot number linked to the batch
- **Example:** `100000012345`

#### {{EXPECTED_CONTROL_RESULT_COUNT}}
- **Type:** Expected Number of In-Process Control Results
- **How to Find:**
  1. From the inspection lot, navigate to "Display Inspection Lot" → Results tab
  2. Count the number of recorded inspection characteristics
- **Example:** `12`

#### {{PROCESS_ORDER_NUMBER_MM_QM}}
- **Type:** Process Order Number for MM-QM Integration Test
- **Status Required:** TECO, batch in Restricted-Use stock (before approval)
- **How to Find:**
  - Use a process order that is complete but batch record NOT yet approved
  - OR use {{PROCESS_ORDER_NUMBER_UNAPPROVED}}
- **Example:** `1000098765`

#### {{BATCH_NUMBER_MM_QM}}
- **Type:** Batch Number for MM-QM Integration Test
- **Status Required:** In Restricted-Use stock; batch record NOT yet approved
- **How to Find:**
  - From the MM-QM process order, note the linked Batch Number
- **Example:** `0009876543`

#### {{MATERIAL_NUMBER_MM_QM}}
- **Type:** Material Number for MM-QM Integration Test
- **How to Find:**
  - From the batch, note the Material Number
- **Example:** `MAT123456`

#### {{PLANT_CODE_MM_QM}}
- **Type:** Plant Code for MM-QM Integration Test
- **How to Find:**
  - From the batch master, note the Plant code
- **Example:** `1710`

#### {{STORAGE_LOCATION_MM_QM}}
- **Type:** Storage Location Code for MM-QM Integration Test
- **How to Find:**
  - From the batch stock status, note the Storage Location code
- **Example:** `0001`

#### {{QUANTITY_TO_TRANSFER_MM_QM}}
- **Type:** Quantity to Transfer to Unrestricted-Use (MM-QM Test)
- **How to Resolve:**
  - Use a valid quantity within the available batch stock
- **Example:** `10`

#### {{EXPECTED_AUDIT_ACTION}}
- **Type:** Expected Audit Log Action Description
- **How to Resolve:**
  - Use the expected action text from SAP Change Documents or Audit Log
- **Example:** `Batch Record Approved` or `Electronic Signature Recorded`

---

## Test Data Validation Checklist

Before executing test cases, verify:

- [ ] All process orders are in TECO status (except {{PROCESS_ORDER_NUMBER_NOT_TECO}})
- [ ] All batches are linked to their respective process orders
- [ ] All inspection lots have recorded results (except {{BATCH_NUMBER_INCOMPLETE}})
- [ ] Quality notifications (deviations) are approved for {{BATCH_NUMBER_WITH_DEVIATION}}
- [ ] NO quality notifications exist for {{BATCH_NUMBER_OUT_OF_SPEC}}
- [ ] Batch {{BATCH_NUMBER_UNAPPROVED}} is in Restricted-Use stock (not yet released)
- [ ] User `{ENV.SAP_USERNAME}` has QA Reviewer authorization
- [ ] User `{ENV.SAP_USERNAME_UNAUTHORIZED}` does NOT have QA Reviewer authorization
- [ ] All placeholder values in `CS-53-testdata.json` are replaced with actual SAP values (no `{{}}` tokens remain)

---

## Notes

- **Test Tenant:** my426318.s4hana.cloud.sap
- **Test Environment:** SAP S/4HANA Cloud (production tenant for CS project)
- **Regulatory Compliance:** All test data must comply with GMP and 21 CFR Part 11 requirements; do NOT use real production data
- **Data Refresh:** Test data must be re-validated if the SAP tenant is refreshed or master data is changed
- **Coordination:** Coordinate with SAP admin/tester to create incomplete or out-of-spec process orders and batches for negative test scenarios

---
