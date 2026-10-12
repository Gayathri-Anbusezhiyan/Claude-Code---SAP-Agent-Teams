# Story Analysis: [CS-45] Capture Serialization/Track-and-Trace data at outbound delivery

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-45/CS-45.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Warehouse Supervisor |
| Core Action | Capture serialization and Track-and-Trace data at the time of outbound delivery |
| Business Goal | Comply with pharmaceutical serialization regulations (e.g., DSCSA, EU FMD) and track each unit through the supply chain |
| Business Object | Outbound Delivery (with serialization data) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (regulatory compliance + external system integration) |

### Implicit Business Rules (Domain-Inferred)
- Serialized materials must be flagged as serialization-relevant in material master (MARA-SERNP field)
- Serial numbers must exist in equipment master (EQUI/SERI tables) or serial number master data
- Batch management must be active for serialized pharmaceutical materials (MARA-XCHPF)
- Goods Issue cannot be posted without complete and validated serialization data
- EPCIS event records must conform to GS1 standards for pharmaceutical Track-and-Trace
- Integration with external Track-and-Trace repository requires middleware/API configuration
- Each serial number must be unique across the supply chain (global uniqueness)
- Serial number status must transition from "Available" to "Shipped" upon goods issue
- GTIN (Global Trade Item Number) must be maintained in material master (EAN/UPC field)
- Expiration date management must be active (SLED tracking)
- Regulatory reporting system connection must be available and validated at delivery time

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can pick and pack an Outbound Delivery for a serialized pharmaceutical material. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system requires the user to scan or enter the unique serial number for each unit of the serialized material. | MANDATORY_FIELD | CRITICAL | EP | HP, ERR | 2 |
| AC-3 | The system validates that the serial number is valid, has not already been shipped, and matches the batch number in the delivery. | VALIDATION_NEGATIVE | CRITICAL | EP, DT | HP, NEG (invalid), NEG (already shipped), NEG (batch mismatch) | 4 |
| AC-4 | The system captures the serial number, batch number, expiration date, and GTIN (Global Trade Item Number) for each unit. | VALIDATION_POSITIVE | CRITICAL | EP | HP (verify all 4 fields captured) | 1 |
| AC-5 | The system generates a serialization event record (EPCIS format or equivalent) and uploads it to the Track-and-Trace repository or regulatory reporting system. | INTEGRATION | CRITICAL | EP | HP, INT (upload success), NEG (upload failure) | 3 |
| AC-6 | The system blocks goods issue if serialization data is incomplete or invalid for any unit in the delivery. | ERROR_HANDLING | CRITICAL | EP, DT | ERR (incomplete data), ERR (invalid data) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Serial Number | Serial Number / Equipment Number | Alphanumeric (up to 18 chars) | Yes | Valid serial number from EQUI/SERI tables, not already shipped |
| Batch Number | Batch | Alphanumeric (up to 10 chars) | Yes | Valid batch for the material in delivery |
| Expiration Date | Expiry Date / SLED | Date (DD.MM.YYYY) | Yes | Future date, matches batch master |
| GTIN | Global Trade Item Number | Numeric (14 digits) | Yes | Valid EAN/UPC from material master |
| Delivery Number | Outbound Delivery | Numeric (10 digits) | Yes | Existing outbound delivery document |
| Delivery Item | Item | Numeric (6 digits) | Yes | Valid item line in the delivery |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Number | Material | Select delivery item | Delivery item line (LIPS-MATNR) |
| Material Description | Material Description | Select delivery item | Material master (MAKT-MAKTX) |
| Quantity | Quantity | Select delivery item | Delivery item quantity (LIPS-LFIMG) |
| Unit of Measure | UoM | Select delivery item | Delivery item UoM (LIPS-MEINS) |
| Plant | Plant | Select delivery item | Delivery item plant (LIPS-WERKS) |
| Storage Location | Storage Location | Select delivery item | Delivery item storage location (LIPS-LGORT) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Serialization Event ID | Unique identifier for the EPCIS event | GUID or numeric sequence |
| Goods Issue Document | SAP Goods Issue document number (Material Document) | 10-digit numeric, begins with 5 |
| Track-and-Trace Upload Status | Success/Failure status of regulatory system upload | Enum: SUCCESS, FAILED, PENDING |
| Serial Number Status | Updated status of the serial number | Enum: SHIPPED, BLOCKED |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Serial Number Length | 1 character | 18 characters | 0 (invalid) | SAP EQUI-SERNR field limit |
| Batch Number Length | 1 character | 10 characters | 0 (invalid) | SAP MCHA-CHARG field limit |
| GTIN | 14 digits exactly | 14 digits exactly | Invalid | Must conform to GS1 standard |
| Expiration Date | Today or future | System-configured maximum | Past date (invalid) | Cannot ship expired goods |
| Quantity per Serial | 1 unit | 1 unit | 0 (invalid) | Pharmaceutical serialization = 1:1 serial-to-unit mapping |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Serialization data capture | CRITICAL | MEDIUM | CRITICAL | Regulatory non-compliance = fines, recalls, supply chain halt |
| Serial number validation | CRITICAL | MEDIUM | CRITICAL | Duplicate or invalid serial = regulatory violation |
| EPCIS event generation | CRITICAL | HIGH | CRITICAL | External system integration + regulatory data format |
| Track-and-Trace upload | CRITICAL | HIGH | CRITICAL | External API dependency + network/auth failures |
| Goods Issue blocking | CRITICAL | LOW | CRITICAL | Core business control — must prevent incomplete shipments |
| Batch-serial matching | CRITICAL | MEDIUM | CRITICAL | Data integrity — incorrect batch = product recall risk |
| GTIN validation | HIGH | LOW | HIGH | Master data dependency — incorrect GTIN = reporting failure |
| Expiration date validation | HIGH | LOW | HIGH | Business rule — expired goods = regulatory violation |
| Mandatory field enforcement | HIGH | LOW | HIGH | UI enforces — but still critical for compliance |

---

## Integration Risk

**No direct Jira linked issues** — but the feature has implicit external integrations:

| External System | Integration Type | Integration Risk | Scenario Needed |
|----------------|-----------------|-----------------|-----------------|
| Track-and-Trace Repository / Regulatory Reporting System | API upload (EPCIS event) | HIGH | INT-01: Successful upload; INT-02: Upload failure (timeout/auth/network); INT-03: Invalid event format rejected |
| Serial Number Master Data (EQUI/SERI) | Real-time validation query | MEDIUM | NEG-01: Serial number does not exist; NEG-02: Serial already shipped |
| Batch Master Data (MCHA) | Lookup for expiration date/batch validation | MEDIUM | NEG-03: Batch-serial mismatch |

---

## Scenario Inventory

SCENARIO INVENTORY — CS-45: Capture Serialization/Track-and-Trace data at outbound delivery
Module: SD — Sales & Distribution

**Happy Path Scenarios:**
  HP-01: Pick, pack, and scan serialization data for a serialized pharmaceutical delivery (single unit) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  HP-02: Pick, pack, and scan serialization data for multiple units in one delivery (multi-line) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

**Alternative Path Scenarios:**
  AP-01: Manual entry of serial number (instead of scanning) — Risk: HIGH — ACs: AC-2, AC-3

**Negative Scenarios:**
  NEG-01: Serial number does not exist in system — Risk: CRITICAL — ACs: AC-3, AC-6
  NEG-02: Serial number already shipped/used — Risk: CRITICAL — ACs: AC-3, AC-6
  NEG-03: Serial number does not match batch number in delivery — Risk: CRITICAL — ACs: AC-3, AC-6
  NEG-04: GTIN validation failure (incorrect or missing GTIN) — Risk: HIGH — ACs: AC-4, AC-6

**Error Scenarios:**
  ERR-01: Missing Serial Number field — Risk: CRITICAL — ACs: AC-2, AC-6
  ERR-02: Missing Batch Number field — Risk: CRITICAL — ACs: AC-4, AC-6
  ERR-03: Missing Expiration Date field — Risk: CRITICAL — ACs: AC-4, AC-6
  ERR-04: Incomplete serialization data at goods issue attempt — Risk: CRITICAL — ACs: AC-6

**Edge Cases:**
  EDGE-01: Minimum serial number length (1 character) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-02: Maximum serial number length (18 characters) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-03: Expiration date = today (boundary: same-day expiry) — Risk: HIGH — ACs: AC-4
  EDGE-04: Expiration date in the past (expired goods) — Risk: CRITICAL — ACs: AC-4, AC-6
  EDGE-05: GTIN format validation (non-numeric or wrong length) — Risk: HIGH — ACs: AC-4, AC-6

**Integration Scenarios:**
  INT-01: EPCIS event upload success to Track-and-Trace repository — Risk: CRITICAL — ACs: AC-5
  INT-02: EPCIS event upload failure (timeout/network error) — Risk: CRITICAL — ACs: AC-5, AC-6
  INT-03: EPCIS event upload failure (authentication error) — Risk: CRITICAL — ACs: AC-5, AC-6
  INT-04: EPCIS event format validation failure (rejected by regulatory system) — Risk: CRITICAL — ACs: AC-5, AC-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | 1 single-unit delivery + 1 multi-unit delivery |
| AP | 1 | Manual entry (alternative to scan) |
| NEG | 4 | Invalid serial + already shipped + batch mismatch + GTIN failure |
| ERR | 4 | Missing serial + missing batch + missing expiry + incomplete data blocking |
| EDGE | 5 | Serial length boundaries (2) + expiration date boundaries (3) |
| INT | 4 | Upload success + timeout + auth failure + format rejection |
| **TOTAL** | **20** | |
