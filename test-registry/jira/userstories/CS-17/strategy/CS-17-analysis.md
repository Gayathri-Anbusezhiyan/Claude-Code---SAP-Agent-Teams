# Story Analysis: [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-17/CS-17.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer |
| Core Action | Maintain an Approved Vendor List (Source List) for critical GMP raw materials |
| Business Goal | Ensure purchase orders can only be created against vendors who are formally qualified and audited |
| Business Object | Source List (Approved Vendor List) for Materials |
| SAP Module | MM — Materials Management |
| Complexity | Complex (Priority: Critical, GMP compliance + multi-entity validation + time-bound approval + notification system) |

### Implicit Business Rules (Domain-Inferred)
- **GMP Compliance Requirement:** Source lists for GMP materials must enforce strict vendor qualification to comply with pharmaceutical/regulated industry standards
- **Material Master Prerequisite:** Materials must exist in material master (MARA/MARC) and be flagged as "critical" or "GMP-regulated"
- **Vendor Master Prerequisite:** Vendors must exist in vendor master (LFA1) before they can be added to a source list
- **Plant-Material Assignment:** Source list approval is plant-specific; same vendor may have different approval status across plants
- **Purchasing Info Record Dependency:** Approved source list entries typically require a purchasing info record (EINE) to exist for the vendor-material-plant combination
- **Authorization Control:** Only users with specific authorization objects (M_EINA_EKO, M_EINA_WRK) can maintain source lists
- **Audit Trail Requirement:** All source list changes (create/modify/delete) must be logged with timestamp and user ID for GMP audit compliance
- **Block Indicator Logic:** SAP uses "Blocking indicator" field in source list (EORD-SPERM) to control PO creation — blocked vendors are not available in PO vendor selection
- **Validity Period Enforcement:** If validity end date is reached, SAP automatically treats the source list entry as expired/blocked
- **MRP Integration:** If MRP (Material Requirements Planning) is active, it will only propose vendors present in the approved source list for automatic purchase requisitions

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Source Lists" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system allows the user to designate one or more vendors as "Approved" for a specific material and plant combination. | BUSINESS_RULE | CRITICAL | EP, BVA | HP(single vendor) + AP(multiple vendors) | 2 |
| AC-3 | The system blocks creation of a Purchase Order for a restricted material if the vendor is not present on the approved source list. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG | 1 |
| AC-4 | The system displays a warning/error message identifying the material as requiring vendor qualification when a non-approved vendor is selected. | ERROR_HANDLING | CRITICAL | EP | NEG | 1 |
| AC-5 | Approved vendor status can be time-bound with validity start and end dates reflecting audit/certification expiry. | BUSINESS_RULE | HIGH | EP, BVA, ST | HP(valid period) + EDGE(start date) + EDGE(end date) + EDGE(expired) | 4 |
| AC-6 | The system sends a notification to the Procurement team a configurable number of days before a vendor's approval validity expires. | SUCCESS_CONFIRMATION | HIGH | EP, BVA | HP(notification sent) + EDGE(notification timing) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material ID | Material | Alphanumeric | Yes | Existing material in SAP master, flagged as GMP/critical |
| Plant | Plant | Alphanumeric | Yes | Existing plant code (4-digit) |
| Vendor ID | Vendor | Alphanumeric | Yes | Existing vendor in SAP master, qualified status |
| Valid From | Valid From | Date | No | Date in YYYY-MM-DD format, defaults to today if not provided |
| Valid To | Valid To | Date | No | Date in YYYY-MM-DD format, must be ≥ Valid From |
| Source List Type | Source List Type | Dropdown | Yes | "Approved" or "Blocked" (AC-2 specifies "Approved") |
| Notification Lead Time | Notification Days | Numeric | No | Number of days before expiry for notification (e.g., 30, 60, 90) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Confirm Material ID | Material master MAKT |
| Vendor Name | Vendor Name | Confirm Vendor ID | Vendor master LFA1 |
| Purchasing Organization | Purchasing Org | Confirm Vendor ID | Vendor master purchasing org view (LFM1) |
| Last Audit Date | Last Audit Date | Vendor qualification record lookup | Vendor audit history (custom table or SAP EHS) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Source List Entry Number | Unique SAP-generated source list record ID | Alphanumeric, internal key (EORD-ZEORD) |
| Status | Source list entry status | "Active", "Expired", "Blocked" |
| Created By | User who created the source list entry | SAP user ID |
| Created On | Timestamp of source list creation | YYYY-MM-DD HH:MM:SS |
| Notification ID | ID of expiry notification scheduled | Workflow or BAdI notification reference |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Valid From | Today (current date) | No limit | Not applicable | Cannot be in the past for new entries |
| Valid To | Valid From date | System date + 10 years (configurable) | Null (no expiry) | If null, approval is indefinite |
| Notification Lead Time | 1 day | 365 days | 0 (no notification) | Zero value disables notification |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Source list creation for critical GMP material | CRITICAL | MEDIUM | CRITICAL | GMP compliance failure → regulatory violation, production halt |
| Blocking PO creation for non-approved vendor | CRITICAL | MEDIUM | CRITICAL | Bypass of vendor qualification → non-compliant material procurement → patient safety risk |
| Vendor approval validation at PO creation | CRITICAL | HIGH | CRITICAL | Integration point (Source List ↔ PO creation) — SAP customizing dependent (SPRO settings) |
| Time-bound validity enforcement | HIGH | MEDIUM | HIGH | Expired vendor approval → non-compliant procurement if not blocked |
| Notification before expiry | HIGH | MEDIUM | HIGH | Missed notification → expired vendor used unknowingly → compliance breach |
| Multi-vendor approval (one material-plant) | MEDIUM | LOW | MEDIUM | Business rule complexity — rare configuration errors |
| Navigation/Access to Manage Source Lists app | LOW | LOW | LOW | Cosmetic risk; easily detected |

---

## Integration Risk

None — no linked issues identified.

However, **implicit integration dependencies exist** (not captured in Jira linkedIssues):
- **Integration with Purchase Order creation flow (CS-2):** Source list validation must trigger during PO creation for restricted materials. If PO creation app does not check source list, AC-3/AC-4 will fail.
- **Integration with Material Master (MARC table):** "Restricted" or "GMP" material flag must be maintained in material master to trigger source list check.
- **Integration with Workflow/Notification system:** AC-6 requires workflow or BAdI configuration to send notifications — not a standard SAP feature in all versions.

**Recommended Action:** Confirm with SAP admin if "Source of Supply Check" is activated in SPRO for the plant/purchasing org. If not configured, AC-3/AC-4 cannot be tested.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-17: Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
Module: MM

Happy Path Scenarios:
  HP-01: Create source list entry with single approved vendor for critical GMP material — Risk: CRITICAL — ACs: AC-1, AC-2, AC-5
  HP-02: Create source list entry with multiple approved vendors for same material-plant combination — Risk: CRITICAL — ACs: AC-2
  HP-03: Successfully create PO for restricted material using approved vendor from source list — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4 (inverse validation)
  HP-04: Notification sent to Procurement team before vendor approval validity expires — Risk: HIGH — ACs: AC-6

Negative Scenarios:
  NEG-01: Attempt to create PO for restricted material with non-approved vendor — PO creation blocked — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-02: Attempt to create PO for restricted material with vendor not present in source list — PO creation blocked — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-03: Attempt to create PO for restricted material with expired vendor approval (validity end date passed) — PO creation blocked — Risk: CRITICAL — ACs: AC-3, AC-4, AC-5

Error Scenarios:
  ERR-01: Missing Material field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Plant field — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Vendor field — Risk: HIGH — ACs: AC-2
  ERR-04: Non-existent Material ID entered — Risk: HIGH — ACs: AC-2
  ERR-05: Non-existent Plant code entered — Risk: HIGH — ACs: AC-2
  ERR-06: Non-existent Vendor ID entered — Risk: HIGH — ACs: AC-2
  ERR-07: Valid To date earlier than Valid From date — Risk: MEDIUM — ACs: AC-5
  ERR-08: Valid From date in the past — Risk: LOW — ACs: AC-5 (if SAP allows, may be valid for backdated approvals)

Edge Cases:
  EDGE-01: Valid From date = today (current date, start of validity period) — Risk: MEDIUM — ACs: AC-5
  EDGE-02: Valid To date = Valid From date (one-day validity period) — Risk: MEDIUM — ACs: AC-5
  EDGE-03: Valid To date = far future date (10 years ahead, maximum validity) — Risk: LOW — ACs: AC-5
  EDGE-04: Valid To date = null (indefinite approval, no expiry) — Risk: MEDIUM — ACs: AC-5
  EDGE-05: Notification lead time = 1 day (minimum boundary for AC-6) — Risk: HIGH — ACs: AC-6
  EDGE-06: Notification lead time = 365 days (maximum boundary for AC-6) — Risk: LOW — ACs: AC-6
  EDGE-07: Notification lead time = 0 (notification disabled) — Risk: MEDIUM — ACs: AC-6

Integration Scenarios:
  (None explicitly linked, but see Integration Risk section above for implicit dependencies)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core source list creation (single/multiple vendors) + PO validation pass + notification delivery |
| AP | 0 | No alternative valid paths — all HP scenarios are sequential parts of the source list lifecycle |
| NEG | 3 | 3 PO blocking scenarios (non-approved vendor / not in list / expired approval) |
| ERR | 8 | 3 mandatory fields × 1 ERR each + 3 validation errors for non-existent entities + 2 date validation errors |
| EDGE | 7 | 4 date boundary scenarios (start, end, max, null) + 3 notification timing boundaries |
| INT | 0 | No linked issues, but integration testing implicit in NEG-01/02/03 and HP-03 |
| **TOTAL** | **22** | |
