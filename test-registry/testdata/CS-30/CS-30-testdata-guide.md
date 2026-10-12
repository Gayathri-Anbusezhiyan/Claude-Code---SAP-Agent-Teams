# Test Data Guide: CS-30 — GMP-Regulated Material Master Creation

**User Story:** CS-30  
**Module:** MM — Materials Management  
**Feature:** GMP-Regulated Material Master Creation  
**Generated:** 2026-08-24  
**Purpose:** This guide explains how to resolve each `{{PLACEHOLDER}}` in the `CS-30-testdata.json` file with real values from your SAP S/4HANA Cloud tenant.

---

## Overview

This test data guide provides instructions for identifying and substituting valid SAP master data values for all placeholders used in CS-30 test datasets. All test cases require **GMP-regulated material types** with specific mandatory fields including batch management, shelf-life parameters, and QM inspection types.

**CRITICAL:** This story tests GMP (Good Manufacturing Practice) pharmaceutical materials. Your SAP tenant MUST have:
1. GMP-flagged material type configured
2. QM (Quality Management) module activated
3. Batch management capabilities enabled

---

## Master Data Prerequisites

Before executing test cases, verify the following master data exists in your SAP tenant:

### 1. Material Type (GMP-Regulated)

**Placeholder:** `{{MATERIAL_TYPE_GMP}}`

**How to find:**
1. Navigate to "Manage Material Types" app (or use SAP GUI: transaction OMS2)
2. Search for material types with **GMP flag enabled** (pharmaceutical materials)
3. Common GMP material types: `FERT` (Finished Product), `HALB` (Semi-Finished Product), `ROH` (Raw Material) — but must be configured with GMP indicator
4. Verify the material type has:
   - Batch management indicator enabled
   - Plant-specific data views active
   - Quality management integration configured

**Example values:**
- `FERT` (if GMP-flagged in your tenant)
- `ZPHARMA` (custom GMP material type)
- `ZAPI` (custom API material type)

**Validation:** Create a test material with the selected material type and verify that:
- Batch Management checkbox is available and can be enabled
- Plant Data / Storage view contains Total Shelf Life and Minimum Remaining Shelf Life fields
- Quality Management view is accessible

---

### 2. Plant Code

**Placeholder:** `{{PLANT_CODE}}`

**How to find:**
1. Navigate to "Manage Plants" app (or use SAP GUI: transaction /SAPAPO/OMON2)
2. Select an active plant assigned to your company code
3. Verify the plant supports GMP materials and batch management

**Example values:**
- `1710` (Velotics Inc. — if available in your tenant)
- `1000` (Standard SAP plant)
- Your tenant-specific plant code

**Validation:** Verify the plant is:
- Active (status indicator green)
- Assigned to a valid company code
- Configured for batch management and quality management

---

### 3. Company Code

**Placeholder:** `{{COMPANY_CODE}}`

**How to find:**
1. Company code is **auto-populated** when you select a Plant in the Material Master app
2. To verify: Navigate to "Manage Plants" app → select your plant → view assigned company code
3. Alternatively: Use SAP GUI transaction /SAPAPO/OMON2 → Plant Details

**Example values:**
- `1710` (Velotics Inc. company code)
- `1000` (Standard SAP company code)

**Note:** This field is auto-populated by SAP; do NOT enter it manually in test steps.

---

### 4. Base Unit of Measure

**Placeholder:** `{{BASE_UOM_STANDARD}}`

**How to find:**
1. Navigate to "Manage Units of Measure" app (or use SAP GUI: transaction CUNI)
2. Select a valid UoM for pharmaceutical materials

**Example values:**
- `KG` (Kilogram) — recommended for APIs
- `L` (Liter)
- `PC` (Piece)
- `EA` (Each)

**Validation:** Verify the UoM exists in SAP table T006 and is active.

---

### 5. QM Inspection Type

**Placeholder:** `{{QM_INSPECTION_TYPE_VALID}}`

**How to find:**
1. Navigate to "Manage Quality Management" app in Fiori
2. Go to "Inspection Types" section
3. Select a valid inspection type configured for your plant and material type

**Example values:**
- `01` (Incoming Inspection)
- `02` (In-Process Inspection)
- `03` (Final Inspection)
- `04` (Batch Release Inspection)

**Critical:** QM module must be activated in your SAP tenant. If QM inspection types are not available:
- Contact your SAP Basis team to activate QM module
- Or request configuration of QM inspection types for GMP materials

**Validation:** Verify the inspection type is:
- Active
- Assigned to your plant
- Configured for GMP material types

---

### 6. Material Description

**Placeholder:** `{{MATERIAL_DESCRIPTION_STANDARD}}`

**Recommended format:**
```
GMP API Test Material - YYYYMMDD-HHMMSS
```
Example: `GMP API Test Material - 20260824-143000`

**Purpose:** Using a timestamp suffix ensures unique material descriptions for each test execution, avoiding conflicts with existing materials.

**Length constraints:**
- Short text (MAKTX): Maximum 40 characters
- Long text (optional): Maximum 80 characters

---

### 7. Shelf Life Parameters

#### Total Shelf Life

**Placeholder:** `{{TOTAL_SHELF_LIFE_STANDARD}}`

**Standard value:** `365` days (1 year)

**Boundary values:**
- `{{TOTAL_SHELF_LIFE_MIN_BOUNDARY}}` = `1` day (minimum valid)
- `{{TOTAL_SHELF_LIFE_MAX_BOUNDARY}}` = `3650` days (maximum; 10 years — may vary by tenant configuration)
- `{{TOTAL_SHELF_LIFE_FOR_EDGE_TEST}}` = `365` days (for edge test calculations)

**Format:** Numeric (integer), unit = days

**Validation:** SAP may enforce tenant-specific maximum values. If 3650 days fails, try 1825 days (5 years) or check SAP configuration for SLED (Shelf Life Expiration Date) calculation rules.

---

#### Minimum Remaining Shelf Life

**Placeholder:** `{{MIN_REMAINING_SHELF_LIFE_STANDARD}}`

**Standard value:** `30` days

**Boundary values:**
- `{{MIN_REMAINING_SHELF_LIFE_MIN_BOUNDARY}}` = `1` day (minimum valid)
- `{{MIN_REMAINING_SHELF_LIFE_MAX_VALID_BOUNDARY}}` = Total Shelf Life - 1 (e.g., `364` days if Total = 365)
- `{{MIN_REMAINING_SHELF_LIFE_INVALID_EQUAL}}` = Total Shelf Life (e.g., `365` days if Total = 365) — **INVALID** (should fail validation)
- `{{MIN_REMAINING_SHELF_LIFE_FOR_MIN_TOTAL}}` = `0` days (if Total = 1 day; may need to omit if 0 is invalid in SAP)

**Business rule:** Minimum Remaining Shelf Life MUST be strictly less than Total Shelf Life.

**Format:** Numeric (integer), unit = days

---

### 8. Material Description Length Boundaries (Optional EDGE Tests)

**Placeholder:** `{{MATERIAL_DESCRIPTION_MIN_LENGTH}}`  
**Value:** `A` (single character)

**Placeholder:** `{{MATERIAL_DESCRIPTION_MAX_LENGTH}}`  
**Value:** `GMP API Material Test Max Length 40Char` (exactly 40 characters)

**Note:** Use exactly 40 characters for max length test. Example:
```
1234567890123456789012345678901234567890
```
Count carefully to ensure exactly 40 characters.

---

## Test Data Resolution Workflow

### Step 1: Verify SAP Configuration

Before substituting placeholders, execute these checks in your SAP tenant:

1. **GMP Material Type Check:**
   - Navigate to "Manage Material Types" app
   - Search for material types with GMP flag enabled
   - If none found → Contact SAP Basis team to configure GMP material type

2. **QM Module Check:**
   - Navigate to "Manage Quality Management" app
   - Check if "Inspection Types" section is accessible
   - If not accessible → QM module is NOT activated; escalate to SAP Basis team

3. **Plant Check:**
   - Navigate to "Manage Plants" app
   - Verify active plant exists with batch management enabled
   - Verify plant is assigned to a company code

---

### Step 2: Substitute Placeholders in JSON

Open `CS-30-testdata.json` and perform find-replace for each placeholder:

| Placeholder | Your SAP Value | Example |
|-------------|---------------|---------|
| `{{MATERIAL_TYPE_GMP}}` | _____________ | `FERT` |
| `{{PLANT_CODE}}` | _____________ | `1710` |
| `{{COMPANY_CODE}}` | _____________ | `1710` |
| `{{BASE_UOM_STANDARD}}` | _____________ | `KG` |
| `{{QM_INSPECTION_TYPE_VALID}}` | _____________ | `01` |
| `{{MATERIAL_DESCRIPTION_STANDARD}}` | _____________ | `GMP API Test - 20260824-143000` |
| `{{TOTAL_SHELF_LIFE_STANDARD}}` | _____________ | `365` |
| `{{MIN_REMAINING_SHELF_LIFE_STANDARD}}` | _____________ | `30` |
| `{{TOTAL_SHELF_LIFE_MIN_BOUNDARY}}` | _____________ | `1` |
| `{{TOTAL_SHELF_LIFE_MAX_BOUNDARY}}` | _____________ | `3650` |
| `{{MIN_REMAINING_SHELF_LIFE_MIN_BOUNDARY}}` | _____________ | `1` |
| `{{MIN_REMAINING_SHELF_LIFE_MAX_VALID_BOUNDARY}}` | _____________ | `364` (if Total = 365) |
| `{{MIN_REMAINING_SHELF_LIFE_INVALID_EQUAL}}` | _____________ | `365` (same as Total; should fail) |
| `{{MATERIAL_DESCRIPTION_MIN_LENGTH}}` | _____________ | `A` |
| `{{MATERIAL_DESCRIPTION_MAX_LENGTH}}` | _____________ | `GMP API Material Test Max Length 40Char` |

---

### Step 3: Verify Test Data Before Execution

Before running automated test cases, manually execute TC-CS-101 (Happy Path) with substituted values to verify:
1. Material Master app is accessible
2. GMP material type displays batch management checkbox
3. Plant Data / Storage view displays Total Shelf Life and Minimum Remaining Shelf Life fields
4. Quality Management view displays QM Inspection Type dropdown
5. Material creation succeeds and generates a unique material number
6. Change log entry is created (verify via "Display Changes" action)

---

## Known Issues & Workarounds

### Issue 1: GMP Material Type Not Available

**Symptom:** No material types with GMP flag found in "Manage Material Types" app.

**Workaround:**
1. Use SAP GUI transaction OMS2 to check material type configuration
2. Look for material types with "Batch Management Indicator" enabled
3. If not available → Contact SAP Basis team to configure GMP-flagged material type OR use standard material type (FERT) with batch management enabled as a substitute (test coverage will be partial)

---

### Issue 2: QM Module Not Activated

**Symptom:** "Manage Quality Management" app not available; QM Inspection Type field missing in Material Master app.

**Workaround:**
- **No workaround available** — QM module activation requires SAP license and configuration by SAP Basis team
- Escalate to SAP Basis team with request: "Activate QM module for GMP material testing"
- Test cases TC-CS-103, TC-CS-108, and AC-4 validation in TC-CS-101 will be **BLOCKED** until QM module is activated

---

### Issue 3: Change Log Not Accessible in Fiori App

**Symptom:** "Display Changes" option not available in Material Master app menu.

**Workaround:**
- Use SAP GUI transaction MM03 (Display Material) → Environment → Changes to view change log
- Document alternative verification method in test case execution notes
- AC-6 validation remains valid if change log is accessible via SAP GUI

---

### Issue 4: Total Shelf Life Maximum Boundary Exceeds Tenant Limit

**Symptom:** SAP rejects Total Shelf Life = 3650 days with validation error.

**Workaround:**
- Try 1825 days (5 years) as maximum boundary
- Update `{{TOTAL_SHELF_LIFE_MAX_BOUNDARY}}` placeholder value accordingly
- Document actual maximum limit in test execution notes for TC-CS-110

---

## Test Execution Checklist

Before executing CS-30 test cases, verify:

- [ ] GMP material type identified and validated in SAP tenant
- [ ] QM module is activated and QM inspection types are available
- [ ] Plant code is active and supports batch management
- [ ] All placeholders in `CS-30-testdata.json` have been substituted with real SAP values
- [ ] Manual test execution of TC-CS-101 (Happy Path) completed successfully to validate test data

**Test Data Status:** Ready for Phase 3 (Scriptless Execution) after placeholder substitution

---

## Contact & Support

For test data resolution issues:
1. **SAP Configuration Issues:** Contact SAP Basis team or SAP functional lead
2. **QM Module Activation:** Escalate to SAP Project Manager (requires license verification)
3. **Test Data Clarification:** Contact QA Lead or Test Architect

---

**Guide Version:** 1.0  
**Last Updated:** 2026-08-24  
**Maintained By:** testcase-agent/skills/extract-testdata
