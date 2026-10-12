# Test Data Guide: CS-19 — Place A Specific Batch Of Raw Material On Quality Hold

**Generated:** 2026-08-24
**Module:** MM — Materials Management (Inventory Management)
**Feature:** Batch Stock Status Management — Quality Hold

---

## Purpose

This guide explains how to replace every `{{PLACEHOLDER}}` in `CS-19-testdata.json` with actual SAP S/4HANA Cloud test system values.

**Target SAP Tenant:** `my426318.s4hana.cloud.sap` (as configured in `.env`)

---

## Environment Dependencies (from `.env`)

These values are NOT in the test data JSON — they come from the `.env` file:

| Placeholder | .env Variable | Description | Example Value |
|-------------|--------------|-------------|---------------|
| `{ENV.SAP_FIORI_URL}` | `SAP_FIORI_URL` | Full Fiori Launchpad URL with SSO params | `https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-autoStartTour=e8bc3755f84d8126e10000000a4450e5#Shell-home` |
| `{ENV.SAP_USERNAME}` | `SAP_USERNAME` | SAP login email address | `sunil.yogi@capgemini.com` |
| `{ENV.SAP_PASSWORD}` | `SAP_PASSWORD` | SAP login password | `SAP12345@1` |

---

## Master Data Requirements

### Material Master Data

#### `{{MATERIAL_BATCH_MANAGED_VALID}}`
- **Description:** Batch-managed material — existing material with batch management flag active
- **Required Attributes:**
  - Material Type: ROH (Raw Material) or similar
  - Batch Management flag: **ACTIVE** in material master (Material Master → General Data → Batch Management checkbox enabled)
  - Material Status: Active (not blocked)
  - Plant Assignment: Assigned to `{{PLANT_CODE}}`
  - Storage Location Assignment: Assigned to `{{STORAGE_LOCATION_CODE}}`
- **Suggested Value:** `RMPI001` (if this material exists and is batch-managed) OR create a new test material with batch management
- **Verification:** Navigate to "Display Material" (MM03) → General tab → Batch Management checkbox is checked

#### `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}`
- **Description:** Auto-populated material description for the batch-managed material
- **Source:** Material master MAKT table — automatically retrieved by SAP when Material Number is entered
- **Suggested Value:** Material short text from material master (e.g., "Raw Material Input 1 (WATER)" if `RMPI001`)

#### `{{MATERIAL_ID_NONEXISTENT}}`
- **Description:** Non-existent material number for negative testing (ERR-06: TC-CS-066)
- **Required Attributes:** Material must NOT exist in SAP tenant
- **Suggested Value:** `INVALID999` OR `NOTEXIST001` — verify by searching in Display Material (MM03) and confirming "Material INVALID999 does not exist"

#### `{{MATERIAL_ID_NON_BATCH_MANAGED}}`
- **Description:** Material that exists but is NOT batch-managed (ERR-08: TC-CS-068)
- **Required Attributes:**
  - Material exists and is active
  - Batch Management flag: **NOT ACTIVE** in material master
- **Suggested Value:** Create or identify a material without batch management checkbox enabled (e.g., a generic material like `GENERIC001`)
- **Verification:** Navigate to Display Material (MM03) → General tab → Batch Management checkbox is NOT checked

---

### Batch Master Data

#### `{{BATCH_NUMBER_UNRESTRICTED_01}}` through `{{BATCH_NUMBER_UNRESTRICTED_09}}`
- **Description:** Existing batches with unrestricted stock status (used for HP, AP, ERR scenarios)
- **Required Attributes:**
  - Batch exists in batch master (MCHA table) with material `{{MATERIAL_BATCH_MANAGED_VALID}}`
  - Current stock status: **Unrestricted-Use** (stock type: CLABS)
  - Available stock quantity > 0 (e.g., 10 units, 100 units)
  - Plant: `{{PLANT_CODE}}`
  - Storage Location: `{{STORAGE_LOCATION_CODE}}`
- **Suggested Values:**
  - `BATCH001`, `BATCH002`, `BATCH003`, `BATCH004`, `BATCH005`, `BATCH006`, `BATCH007`, `BATCH008`, `BATCH009` (9 unique batches for test isolation)
- **Creation:** Use transaction MIGO or "Create Goods Receipt" in Fiori to create batches with stock
- **Verification:** Navigate to "Display Batch" (MSC3N) or "Manage Stock" → filter by Material + Batch → verify Current Status = Unrestricted-Use

#### `{{BATCH_NUMBER_BLOCKED_01}}` through `{{BATCH_NUMBER_BLOCKED_04}}`
- **Description:** Existing batches with blocked or quality inspection stock status (used for HP-03 release scenario and NEG scenarios)
- **Required Attributes:**
  - Batch exists in batch master with material `{{MATERIAL_BATCH_MANAGED_VALID}}`
  - Current stock status: **Blocked Stock** (CINSM) OR **Quality Inspection** (CSPEM)
  - Available stock quantity > 0
  - Plant: `{{PLANT_CODE}}`
  - Storage Location: `{{STORAGE_LOCATION_CODE}}`
- **Suggested Values:**
  - `BATCHBLK01`, `BATCHBLK02`, `BATCHBLK03`, `BATCHBLK04` (4 unique blocked batches)
- **Creation:** Create batches via MIGO, then use "Change Stock Status" (MB52 or Manage Stock app) to set status to Blocked or Quality Inspection
- **Verification:** Navigate to Manage Stock → filter by Material + Batch → verify Current Status = Blocked Stock or Quality Inspection

#### `{{BATCH_NUMBER_ZERO_STOCK}}`
- **Description:** Batch with zero or no available stock (NEG-04: TC-CS-060)
- **Required Attributes:**
  - Batch exists in batch master
  - Unrestricted stock quantity = 0 (no stock available)
- **Suggested Value:** `BATCHZERO` (create batch record without stock, or consume all stock to zero)
- **Verification:** Manage Stock → filter by Material + Batch → verify Available Quantity = 0

#### `{{BATCH_NUMBER_NONEXISTENT}}`
- **Description:** Non-existent batch number for negative testing (ERR-07: TC-CS-067)
- **Required Attributes:** Batch must NOT exist in SAP for material `{{MATERIAL_BATCH_MANAGED_VALID}}`
- **Suggested Value:** `NOTEXIST` OR `INVALID999` — verify by searching in Display Batch (MSC3N) and confirming batch does not exist

#### `{{BATCH_NUMBER_MIN_STOCK}}`
- **Description:** Batch with minimum valid stock quantity (EDGE-01: TC-CS-069)
- **Required Attributes:**
  - Batch exists with unrestricted stock
  - Stock quantity = 0.001 units (minimum boundary for blocking)
- **Suggested Value:** `BATCHMIN` (create batch with very small stock quantity: 0.001 KG or equivalent)
- **Verification:** Manage Stock → filter by Batch → verify Available Quantity = 0.001

#### `{{BATCH_NUMBER_MAX_STOCK}}`
- **Description:** Batch with maximum stock quantity (EDGE-02: TC-CS-070)
- **Required Attributes:**
  - Batch exists with unrestricted stock
  - Stock quantity = 999999999.999 units (system maximum, if achievable in test system)
- **Suggested Value:** `BATCHMAX` (create batch with very large stock quantity OR use the highest available stock batch in test system)
- **Verification:** Manage Stock → filter by Batch → verify Available Quantity is at or near system maximum

#### `{{BATCH_NUMBER_IN_ACTIVE_PROCESS_ORDER}}`
- **Description:** Batch that is currently being consumed in an active production process order (INT-01: TC-CS-072)
- **Required Attributes:**
  - Batch exists with unrestricted stock
  - Batch is referenced in an active (not completed) process order in PP module
- **Suggested Value:** `BATCHPO001` (create batch, then create a process order that consumes this batch)
- **Verification:** Use PP transaction COOIS or "Manage Production Orders" → verify process order status = Released or In Process

---

### Organizational Master Data

#### `{{PLANT_CODE}}`
- **Description:** Valid plant code assigned to user authorization
- **Required Attributes:**
  - Plant exists and is active in SAP
  - User has authorization to manage stock in this plant
  - Plant is assigned to material `{{MATERIAL_BATCH_MANAGED_VALID}}`
- **Suggested Value:** `1710` (if this plant exists in tenant my426318) OR use any valid plant code from user's authorization
- **Verification:** Navigate to "Display Plant" (transaction OX10) or check user authorization via SU01

#### `{{STORAGE_LOCATION_CODE}}`
- **Description:** Valid storage location within the plant
- **Required Attributes:**
  - Storage location exists in plant `{{PLANT_CODE}}`
  - Material is assigned to this storage location
- **Suggested Value:** `0001` (standard storage location) OR any valid storage location code
- **Verification:** Navigate to "Display Storage Location" or check material-plant assignment in MM03

---

### Stock Status Codes

#### `{{STOCK_TYPE_BLOCKED}}`
- **Description:** Stock status code for Blocked Stock
- **Required Attributes:** Valid stock type code recognized by SAP Manage Stock app
- **Suggested Value:** `Blocked Stock` OR `CINSM` (SAP stock type for blocked stock)
- **Verification:** In Manage Stock → Change Stock Status → dropdown displays "Blocked Stock" option

#### `{{STOCK_TYPE_QUALITY_INSPECTION}}`
- **Description:** Stock status code for Quality Inspection Stock
- **Required Attributes:** Valid stock type code recognized by SAP Manage Stock app
- **Suggested Value:** `Quality Inspection` OR `CSPEM` (SAP stock type for quality inspection stock)
- **Verification:** In Manage Stock → Change Stock Status → dropdown displays "Quality Inspection" option

#### `{{STOCK_TYPE_UNRESTRICTED}}`
- **Description:** Stock status code for Unrestricted-Use Stock (default stock type)
- **Required Attributes:** Valid stock type code recognized by SAP Manage Stock app
- **Suggested Value:** `Unrestricted-Use` OR `CLABS` (SAP stock type for unrestricted stock)
- **Verification:** In Manage Stock → Change Stock Status → dropdown displays "Unrestricted-Use" option

---

### Reason Codes

#### `{{REASON_CODE_BLOCK}}`
- **Description:** Reason code for placing batch on quality hold
- **Required Attributes:**
  - Reason code configured in SAP Customizing (transaction OMJJ or similar)
  - Code is selectable in "Reason for Block" field in Manage Stock app
- **Suggested Value:** `DEVINV` (Deviation Investigation) OR `QUALITYHOLD` OR `SUSPECT` (verify what reason codes are configured in tenant my426318)
- **Verification:** Navigate to Manage Stock → Change Stock Status → "Reason for Block" dropdown displays the configured reason codes

#### `{{REASON_CODE_RELEASE}}`
- **Description:** Reason code for releasing batch from quality hold
- **Required Attributes:**
  - Reason code configured in SAP Customizing
  - Code is selectable in "Reason" field when changing status back to Unrestricted
- **Suggested Value:** `INVCOMP` (Investigation Complete) OR `APPROVED` OR `RELEASED` (verify configured codes)
- **Verification:** Navigate to Manage Stock → Change Stock Status to Unrestricted → "Reason" dropdown displays configured codes

---

### Integration Data (PP Module)

#### `{{PROCESS_ORDER_NUMBER_ACTIVE}}`
- **Description:** Active production process order number for integration testing (INT-01: TC-CS-072)
- **Required Attributes:**
  - Process order exists in PP module
  - Status: Released or In Process (not completed or closed)
  - Process order BOM includes material `{{MATERIAL_BATCH_MANAGED_VALID}}` with batch `{{BATCH_NUMBER_IN_ACTIVE_PROCESS_ORDER}}`
- **Suggested Value:** `1000000001` OR create a new process order via "Manage Production Orders" app
- **Verification:** Navigate to "Display Process Order" (COR3) → verify status and BOM components

#### `{{PRODUCTION_PLANNING_EMAIL}}`
- **Description:** Email address or notification recipient for Production Planning department (INT-01: TC-CS-072)
- **Required Attributes:** Valid email address configured in SAP notification system for PP alerts
- **Suggested Value:** `pp.team@capgemini.com` OR SAP workflow recipient user ID
- **Verification:** Check notification configuration in SAP Workflow (transaction SWDD) or notification settings

---

### Boundary Values

#### `{{STOCK_QUANTITY_MIN}}`
- **Description:** Minimum valid stock quantity for blocking (EDGE-01: TC-CS-069)
- **Required Attributes:** Smallest non-zero stock quantity allowed by SAP (3 decimal places max)
- **Suggested Value:** `0.001` (0.001 KG, 0.001 PC, etc., depending on UoM)

#### `{{STOCK_QUANTITY_MAX}}`
- **Description:** Maximum stock quantity (EDGE-02: TC-CS-070)
- **Required Attributes:** Largest stock quantity supported by SAP stock management (13-digit integer + 3 decimal places)
- **Suggested Value:** `999999999.999` OR the highest stock quantity achievable in the test system

---

### Negative Test Data

#### `{{USER_UNAUTHORIZED_NO_QA_ROLE}}`
- **Description:** User without QA Manager role/authorization to release batch holds (NEG-03: TC-CS-059)
- **Required Attributes:**
  - User exists in SAP
  - User has Plant Manager role (can block batches) BUT does NOT have QA Manager role (cannot release blocks)
- **Suggested Value:** Create a test user with limited authorization OR use an existing non-QA user account
- **Verification:** Check user authorizations via SU01 → verify no QA release authorization object

#### `{{GOODS_ISSUE_MOVEMENT_TYPE}}`
- **Description:** Movement type code for goods issue transaction (NEG-01: TC-CS-057)
- **Required Attributes:** Valid SAP movement type for goods issue (e.g., 261 for goods issue to cost center)
- **Suggested Value:** `261` (goods issue to cost center) OR `201` (goods issue to another plant)

#### `{{PRODUCTION_ORDER_ACTIVE}}`
- **Description:** Active production order for consumption test (NEG-02: TC-CS-058)
- **Required Attributes:** Production order in status Released or In Process
- **Suggested Value:** Same as `{{PROCESS_ORDER_NUMBER_ACTIVE}}` OR create a separate test production order
- **Verification:** Manage Production Orders → verify order status

---

## Test Data Preparation Checklist

Before executing test cases, verify ALL of the following:

- [ ] **Material:** Batch-managed material `{{MATERIAL_BATCH_MANAGED_VALID}}` exists with batch management flag active
- [ ] **Batches:** 9 batches with unrestricted stock created (`BATCH001` to `BATCH009`)
- [ ] **Batches:** 4 batches with blocked/QI status created (`BATCHBLK01` to `BATCHBLK04`)
- [ ] **Batches:** 1 batch with zero stock created (`BATCHZERO`)
- [ ] **Batches:** 1 batch with minimum stock (0.001) created (`BATCHMIN`)
- [ ] **Batches:** 1 batch with maximum stock created (`BATCHMAX`)
- [ ] **Batches:** 1 batch in active process order created (`BATCHPO001`)
- [ ] **Invalid Data:** Non-existent material `{{MATERIAL_ID_NONEXISTENT}}` confirmed NOT to exist
- [ ] **Invalid Data:** Non-existent batch `{{BATCH_NUMBER_NONEXISTENT}}` confirmed NOT to exist
- [ ] **Non-Batch Material:** Material `{{MATERIAL_ID_NON_BATCH_MANAGED}}` exists WITHOUT batch management flag
- [ ] **Plant & SLoc:** Plant `{{PLANT_CODE}}` and storage location `{{STORAGE_LOCATION_CODE}}` exist and are assigned to materials
- [ ] **Reason Codes:** Reason codes `{{REASON_CODE_BLOCK}}` and `{{REASON_CODE_RELEASE}}` are configured in SAP Customizing
- [ ] **Authorized User:** QA Manager role user account available for TC-CS-055 (release hold)
- [ ] **Unauthorized User:** Non-QA user account available for TC-CS-059 (unauthorized release attempt)
- [ ] **Integration:** Active process order `{{PROCESS_ORDER_NUMBER_ACTIVE}}` created with batch `{{BATCH_NUMBER_IN_ACTIVE_PROCESS_ORDER}}` in BOM
- [ ] **Notification:** Production Planning notification recipient `{{PRODUCTION_PLANNING_EMAIL}}` configured

---

## Test Data Reset Instructions

After each test execution cycle, reset batch stock statuses to their initial state:

1. **Blocked Batches → Unrestricted:**
   - Navigate to Manage Stock
   - Filter by Material + Batch
   - Select blocked batches (`BATCHBLK01` to `BATCHBLK04`)
   - Change stock status to Unrestricted-Use
   - Save

2. **Unrestricted Batches → Reset to Unrestricted (if blocked during testing):**
   - Repeat step 1 for any batches that were blocked during HP/AP scenario testing

3. **Minimum/Maximum Stock Batches:**
   - Verify stock quantities remain at boundary values (0.001 and max)
   - If consumed, recreate stock via goods receipt

4. **Process Order Status:**
   - Reset process order `{{PROCESS_ORDER_NUMBER_ACTIVE}}` to Released status if changed

---

## Notes

- **SAP Tenant:** All data is specific to tenant `my426318.s4hana.cloud.sap` (as of 2026-08-24)
- **Data Isolation:** Use dedicated test batches (e.g., `BATCH001` to `BATCH009`) to avoid conflicts with other test scenarios or parallel test execution
- **Authorization:** Ensure test user has both Plant Manager AND QA Manager roles to execute all 20 test cases (some TCs require QA role for batch release)
- **Batch Management Flag:** CRITICAL — Material MUST have batch management flag active in material master; without this, batch field will not appear in Manage Stock app
- **Stock Quantities:** Maintain realistic stock quantities (10 to 1000 units) for most test scenarios; only EDGE scenarios require boundary values (0.001 and max)
- **Reason Code Configuration:** If reason codes are not configured in tenant my426318, coordinate with SAP Basis/Config team to add reason codes via transaction OMJJ before test execution
