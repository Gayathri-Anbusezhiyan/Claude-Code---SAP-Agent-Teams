# Story Analysis: [CS-16] Create A Quality Inspection Lot Automatically Upon Goods Receipt For G

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-16/CS-16.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Inspector |
| Core Action | Create a Quality Inspection Lot automatically upon Goods Receipt for GMP-regulated raw materials |
| Business Goal | Ensure incoming materials are quarantined and cannot be used in production until QA has reviewed and released them |
| Business Object | Quality Inspection Lot, Goods Receipt, Quality Inspection Stock |
| SAP Module | QM — Quality Management (integrated with MM — Materials Management) |
| Complexity | Complex (no story points provided) |

### Implicit Business Rules (Domain-Inferred)
- Material master must have a quality inspection type configured (QM procurement active) for automatic inspection lot creation
- Inspection plan must exist for the material defining inspection characteristics and test methods
- Quality Inspection stock type must be configured in the system and available for the plant/storage location
- Usage Decision authority must be assigned to the Quality Inspector role (authorization object Q_INSPLOT)
- Stock transfer between Quality Inspection → Unrestricted or Blocked must be automatic upon UD recording (no manual goods movement required)
- GMP regulatory compliance requires full traceability: all inspection results, UD decisions, timestamps, and user IDs must be logged
- Materials flagged for inspection cannot bypass the quality check — system must enforce quarantine

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Inspection Lots" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | An inspection lot is automatically generated when goods receipt is posted for materials flagged with a quality inspection type in the material master. | BUSINESS_RULE | CRITICAL | EP, DT | HP, NEG(no inspection type), INT(GR process) | 3 |
| AC-3 | The received stock is automatically posted to Quality Inspection stock and is not available for unrestricted use or production consumption. | BUSINESS_RULE | CRITICAL | EP | HP, NEG(verify blocked from production) | 2 |
| AC-4 | The inspector can record results of physical/chemical tests against the inspection characteristics defined in the inspection plan. | VALIDATION_POSITIVE | HIGH | EP | HP | 1 |
| AC-5 | The system allows Usage Decision (UD) recording — Accept, Reject, or Conditional Accept. | VALIDATION_POSITIVE | CRITICAL | DT, EP | HP(Accept), AP(Reject), AP(Conditional Accept) | 3 |
| AC-6 | Upon "Accept" UD, the stock is automatically transferred from Quality Inspection to Unrestricted-Use stock. | BUSINESS_RULE | CRITICAL | EP, ST | HP(Accept UD) | 1 |
| AC-7 | Upon "Reject" UD, the stock is transferred to Blocked stock and cannot be issued to production. | BUSINESS_RULE | CRITICAL | EP, ST | AP(Reject UD), NEG(verify blocked from production) | 2 |
| AC-8 | The system maintains a complete audit trail of inspection results and UD decisions for regulatory traceability. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(verify audit log) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Number | Material | Alphanumeric | Yes | Existing material with QM inspection type configured |
| Inspection Plan | Inspection Plan | Alphanumeric | Yes (auto-derived from material) | Valid inspection plan for material |
| Inspection Characteristics | Characteristic | Alphanumeric | Yes | Defined in inspection plan (e.g., pH, purity, moisture) |
| Test Results | Result Value | Numeric or Text | Yes | Per characteristic specification (numeric range or qualitative) |
| Usage Decision | UD Code | Enumeration | Yes | A (Accept), R (Reject), or C (Conditional Accept) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Inspection Lot Number | Inspection Lot | Goods Receipt posting | QM number range (auto-generated) |
| Material Description | Material Description | Material Number confirmation | Material master MAKT |
| Quantity Received | Inspection Lot Qty | Goods Receipt posting | GR document MSEG |
| Quality Inspection Stock | Stock Type | Goods Receipt posting | System configuration for QM-active materials |
| Inspector Name | Created By / Changed By | User login | System user |
| Timestamp | Created On / Changed On | Inspection lot creation / UD recording | System timestamp |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Inspection Lot Number | Unique SAP-generated inspection lot document number | 12-digit numeric |
| UD Decision Code | Usage Decision recorded (A/R/C) | Single character |
| Stock Transfer Document | Material document number for stock transfer after UD | 10-digit numeric |
| Audit Trail Log | Complete record of inspection results, UD, timestamps, users | System table QALS, QAVE |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Test Result Value (numeric) | Per characteristic lower spec | Per characteristic upper spec | May be valid depending on characteristic | BVA required for numeric characteristics |
| Inspection Lot Quantity | 1 (minimum) | GR quantity | 0 (invalid) | Must match GR qty |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Automatic inspection lot creation on GR | CRITICAL | MEDIUM | CRITICAL | Failure means materials bypass quality check — GMP violation |
| Stock posted to Quality Inspection (quarantine) | CRITICAL | MEDIUM | CRITICAL | Unrestricted stock release before QA approval = regulatory non-compliance |
| Recording inspection results | HIGH | LOW | HIGH | Incorrect results impact release decision |
| Usage Decision recording | CRITICAL | LOW | CRITICAL | Wrong UD (Accept when should Reject) = defective material in production |
| Automatic stock transfer on Accept UD | CRITICAL | MEDIUM | CRITICAL | Stock not available for production if transfer fails |
| Automatic stock transfer on Reject UD | CRITICAL | MEDIUM | CRITICAL | Blocked stock must be enforced to prevent use |
| Audit trail completeness | CRITICAL | LOW | CRITICAL | GMP regulatory requirement — missing audit = compliance failure |
| App navigation/access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None identified | — | MEDIUM (implicit) | INT-01: Goods Receipt to Inspection Lot creation trigger |

**Note:** Although no explicit linked issues are present in the JSON, this story has an implicit integration dependency on the Goods Receipt process (MM module). Automatic inspection lot creation is triggered by a GR posting event, so integration testing with the GR transaction (MIGO or Fiori "Post Goods Receipt") is required.

---

## Scenario Inventory

### SCENARIO INVENTORY — CS-16: Create A Quality Inspection Lot Automatically Upon Goods Receipt For G
**Module:** QM — Quality Management (integrated with MM)

#### Happy Path Scenarios:
- **HP-01**: Access "Manage Inspection Lots" app — Risk: LOW — ACs: AC-1
- **HP-02**: Post GR for QM-active material → inspection lot auto-created → stock posted to Quality Inspection → record test results (all within spec) → record Accept UD → stock transferred to Unrestricted-Use → verify audit trail — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5, AC-6, AC-8

#### Alternative Path Scenarios:
- **AP-01**: Post GR for QM-active material → inspection lot auto-created → record test results → record Reject UD → stock transferred to Blocked — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5, AC-7
- **AP-02**: Post GR for QM-active material → inspection lot auto-created → record test results → record Conditional Accept UD → stock transferred to Unrestricted-Use with restriction note — Risk: HIGH — ACs: AC-2, AC-3, AC-4, AC-5

#### Negative Scenarios:
- **NEG-01**: Post GR for material WITHOUT QM inspection type configured → no inspection lot created, stock posted directly to Unrestricted-Use — Risk: HIGH — ACs: AC-2
- **NEG-02**: Attempt to issue material from Quality Inspection stock to production (without UD) → system rejects — Risk: CRITICAL — ACs: AC-3
- **NEG-03**: Attempt to issue material from Blocked stock to production (after Reject UD) → system rejects — Risk: CRITICAL — ACs: AC-7

#### Error Scenarios:
- **ERR-01**: Missing Inspection Lot Number (system generation failure) — Risk: CRITICAL — ACs: AC-2
- **ERR-02**: Missing Test Result entry for mandatory characteristic — Risk: HIGH — ACs: AC-4
- **ERR-03**: Missing Usage Decision before attempting to close inspection lot — Risk: CRITICAL — ACs: AC-5

#### Edge Cases:
- **EDGE-01**: Test result value exactly at lower specification limit — Risk: MEDIUM — ACs: AC-4
- **EDGE-02**: Test result value exactly at upper specification limit — Risk: MEDIUM — ACs: AC-4
- **EDGE-03**: Test result value outside specification range (out-of-spec) → system should flag and enforce Reject or Conditional Accept UD — Risk: HIGH — ACs: AC-4, AC-5

#### Integration Scenarios:
- **INT-01**: Post Goods Receipt via "Post Goods Receipt" Fiori app for QM-active material → verify inspection lot auto-created in "Manage Inspection Lots" app — Risk: HIGH — Linked: Implicit MM-QM integration

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | AC-1 navigation (1) + full Accept flow (1) |
| AP | 2 | Reject UD flow (1) + Conditional Accept UD flow (1) |
| NEG | 3 | No inspection type (1) + blocked from production via Quality Inspection stock (1) + blocked from production via Blocked stock (1) |
| ERR | 3 | Missing inspection lot (1) + missing test result (1) + missing UD (1) |
| EDGE | 3 | Lower boundary (1) + upper boundary (1) + out-of-spec (1) |
| INT | 1 | GR → inspection lot creation trigger (1) |
| **TOTAL** | **14** | |
