# Story Analysis: CS-28

**Issue Key:** CS-28  
**Type:** Task  
**Priority:** Critical  
**Status:** To Do  
**Story Points:** Not set  
**Epic:** None  
**Labels:** Management, Materials  

---

## Story Decomposition

### User Story Statement
"As a Warehouse Operator, I want to transfer consignment stock of a high-value biologic from vendor-owned to company-owned inventory upon usage, so that vendor liability and inventory valuation are correctly reflected."

### Decomposition Elements

| Element | Value |
|---------|-------|
| **Actor** | Warehouse Operator |
| **Action** | Transfer consignment stock from vendor-owned to company-owned inventory upon usage |
| **Goal** | Ensure vendor liability and inventory valuation are correctly reflected |
| **Business Object** | Consignment Stock (high-value biologic material) |
| **SAP Module** | MM (Materials Management) - Consignment Stock Management |
| **SAP Transaction/App** | Post Goods Movement (Fiori app) - Movement Type 411 (Consignment Withdrawal) |
| **Business Process** | Consignment Stock Withdrawal & Settlement |

### Business Context
- **Consignment Stock** is vendor-owned material stored at the buyer's premises
- Ownership transfers to the company only upon withdrawal for consumption/production
- Critical for high-value materials (biologics, pharmaceuticals) to minimize working capital
- Requires precise tracking for financial liability, inventory valuation, and vendor settlement
- Batch traceability is mandatory for regulated industries (pharma, biotech)

---

## Acceptance Criteria Classification

### AC-1: Access Post Goods Movement Fiori app for consignment withdrawal
- **Type:** Navigation / Access Control
- **Risk Level:** Low
- **Risk Factors:** 
  - Authorization failure (missing SAP role/transaction authorization)
  - App unavailable or not assigned to user role
- **Test Techniques:** Positive (authorized user), Negative (unauthorized user)
- **Testability:** High
- **SAP Authorization Objects:** M_MSEG_BWA (Goods Movement Authorization), F_LFA1_BUK (Vendor Master Authorization)

### AC-2: System tracks consignment stock separately by vendor and batch, excluded from company-owned inventory valuation until withdrawn
- **Type:** Data Segregation / Accounting Logic
- **Risk Level:** Critical
- **Risk Factors:**
  - Consignment stock incorrectly included in company valuation (financial misstatement)
  - Vendor/batch segregation failure (compliance violation, incorrect liability)
  - Special stock indicator (K) not properly maintained
- **Test Techniques:** State verification, Data integrity check, Accounting validation
- **Testability:** High
- **SAP Configuration:** Special Stock Indicator 'K' (Consignment Stock), MB5K report (Consignment Stock Report)

### AC-3: Upon withdrawal for production or sale, system automatically transfers ownership and triggers liability posting to vendor
- **Type:** Business Logic / Financial Integration
- **Risk Level:** Critical
- **Risk Factors:**
  - Ownership transfer failure (material remains vendor-owned)
  - Liability posting failure (vendor not credited, financial error)
  - Automatic posting failure (manual intervention required)
  - Price determination error (wrong valuation posted)
- **Test Techniques:** End-to-end transaction flow, Financial posting verification, Integration test
- **Testability:** High
- **SAP Movement Type:** 411 (Consignment Withdrawal to Unrestricted Stock)
- **SAP Posting:** Debit: Inventory (BSX), Credit: Vendor Liability (GBB)

### AC-4: System generates consignment settlement document listing all withdrawals for defined settlement period
- **Type:** Reporting / Settlement Document Generation
- **Risk Level:** High
- **Risk Factors:**
  - Settlement document missing withdrawals (incomplete vendor billing)
  - Wrong settlement period applied (billing errors)
  - Settlement document not generated (process blocked)
  - Batch-level details missing (traceability gap)
- **Test Techniques:** Document generation verification, Data completeness check, Period boundary test
- **Testability:** High
- **SAP Transaction:** MRKO (Consignment Settlement)
- **SAP Document Type:** Settlement Document

### AC-5: Settlement document can be used to generate vendor invoice verification automatically
- **Type:** Integration / Invoice Automation
- **Risk Level:** High
- **Risk Factors:**
  - Invoice verification fails (manual intervention required)
  - Price mismatch between settlement and invoice (reconciliation failure)
  - Automatic posting failure (blocked invoice, error status)
  - GR/IR account clearing failure (open items remain)
- **Test Techniques:** Integration test, Invoice matching verification, Financial reconciliation
- **Testability:** High
- **SAP Transaction:** MIRO (Invoice Verification) or automated ERS (Evaluated Receipt Settlement)

### AC-6: System maintains batch traceability throughout consignment-to-owned stock transition
- **Type:** Data Integrity / Compliance Requirement
- **Risk Level:** Critical
- **Risk Factors:**
  - Batch number lost during ownership transfer (regulatory violation)
  - Batch split incorrectly handled (traceability broken)
  - Batch genealogy incomplete (recall scenario failure)
  - Batch expiry not tracked post-transfer (quality risk)
- **Test Techniques:** Batch document flow verification, Traceability chain test, Where-used verification
- **Testability:** High
- **SAP Transaction:** MB51 (Material Document List), MCX* (Batch where-used analysis)
- **Regulatory Requirement:** FDA 21 CFR Part 11 (for pharma/biotech), ISO 9001 (quality traceability)

---

## Data Parameter Identification

### Input Parameters (User-Entered)

| Parameter | Data Type | Source | Validation Rule | Example Value |
|-----------|-----------|--------|-----------------|---------------|
| Material Number | String (18) | Material Master | Must exist, batch-managed, consignment-enabled | `BIO-HV-001` |
| Batch Number | String (10) | Batch Master | Must exist for material, vendor consignment batch | `BATCH-2024-001` |
| Vendor Code | String (10) | Vendor Master | Must exist, consignment vendor | `17300005` |
| Plant | String (4) | Plant Master | Must exist, user authorized | `1710` |
| Storage Location | String (4) | Storage Location Master | Must exist in plant | `0001` |
| Withdrawal Quantity | Decimal (13,3) | User input | Must be > 0, ≤ available consignment stock | `50.000 KG` |
| Movement Type | String (3) | System default | Fixed: 411 (Consignment Withdrawal) | `411` |
| Movement Reason | String (4) | Optional | User-defined reason code | `0001` (Production consumption) |
| Settlement Period | Date Range | User selection | Start ≤ End, must cover withdrawal dates | `01.01.2026 - 31.01.2026` |

### Auto-Populated Parameters (System-Determined)

| Parameter | Data Source | Logic |
|-----------|-------------|-------|
| Material Description | Material Master | Lookup from MAKT |
| Batch Status | Batch Master | Unrestricted-use status for consignment batch |
| Unit of Measure | Material Master | Base UoM from MARA |
| Consignment Stock Quantity | Real-time inventory | MB52 - Current stock in special stock 'K' for vendor |
| Price (Moving Average) | Material Valuation | MBEW - Standard/moving average price for material/plant |
| Vendor Name | Vendor Master | LFA1 - Vendor description |
| Company Code | Plant Master | Derived from plant assignment |
| Posting Date | System date | Current date (can be backdated with authorization) |
| Document Date | System date | Current date |
| Material Document Number | Number range | Auto-generated (50xxxxxxxx) |
| Accounting Document Number | Number range | Auto-generated (50xxxxxxxx) in FI |
| Settlement Document Number | Number range | Auto-generated during MRKO execution |

### Output Parameters (Verification Points)

| Parameter | Expected Behavior | Verification Method |
|-----------|-------------------|---------------------|
| Material Document Number | Generated after successful posting | Display on confirmation screen |
| Consignment Stock Balance | Reduced by withdrawal quantity | MB52 - Special stock 'K' for vendor |
| Unrestricted Stock Balance | Increased by withdrawal quantity | MB52 - Unrestricted stock |
| Vendor Liability Posting | FI document with credit to vendor account | FB03 - Display accounting document |
| Inventory Valuation Increase | Inventory account debited by price × quantity | FB03 - BSX account posting |
| GR/IR Clearing Entry | GR/IR account cleared if PO-based consignment | FB03 - WRX account |
| Settlement Document Items | All withdrawals listed with batch details | MRKO display |
| Invoice Document | Automatically created with settlement reference | MIRO or MIR7 (invoice list) |
| Batch Document Flow | Material document linked to batch in genealogy | MB03 - Batch display, Classification tab |

### Boundary Conditions

| Parameter | Minimum | Maximum | Edge Cases |
|-----------|---------|---------|------------|
| Withdrawal Quantity | 0.001 (smallest unit) | Available consignment stock | Exact stock match, decimal precision |
| Settlement Period | 1 day | 1 fiscal year | Same-day withdrawal, cross-year settlement |
| Batch Expiry Date | Current date | No limit | Expired batch withdrawal (should be blocked) |
| Material Price | 0.00 (free goods) | No limit | Zero-price consignment, price change during period |
| Number of Withdrawals in Period | 1 | No limit | Single withdrawal, bulk settlement (100+ items) |

---

## Risk Assessment by Scenario Area

### Scenario Area 1: Consignment Stock Access and Availability
- **Business Impact:** Medium
- **Failure Probability:** Low
- **Overall Risk:** Low-Medium
- **Failure Scenarios:**
  - User cannot access Post Goods Movement app → Production delay
  - No consignment stock available for material/vendor/batch → Withdrawal blocked
  - Wrong storage location selected → Incorrect stock reduced
- **Mitigation:** Authorization testing, Stock availability validation, Location verification

### Scenario Area 2: Ownership Transfer and Financial Posting
- **Business Impact:** Critical
- **Failure Probability:** Medium
- **Overall Risk:** Critical
- **Failure Scenarios:**
  - Ownership transfer fails → Material remains vendor-owned, production uses vendor stock (liability error)
  - Liability posting missing → Vendor not credited, financial statement incorrect
  - Wrong price used → Valuation error, vendor underpaid/overpaid
  - Accounting document not generated → Financial reconciliation failure
- **Mitigation:** Financial integration testing, Price validation, Posting verification, Accounting reconciliation

### Scenario Area 3: Batch Traceability
- **Business Impact:** Critical
- **Failure Probability:** Low
- **Overall Risk:** High
- **Failure Scenarios:**
  - Batch number lost in transfer → Regulatory non-compliance (FDA audit failure)
  - Batch genealogy broken → Cannot trace material in recall scenario
  - Expired batch allowed → Quality violation, patient safety risk
- **Mitigation:** Batch flow verification, Expiry date validation, Genealogy chain testing

### Scenario Area 4: Settlement Document Generation
- **Business Impact:** High
- **Failure Probability:** Medium
- **Overall Risk:** High
- **Failure Scenarios:**
  - Settlement document incomplete → Vendor under-billed, revenue loss
  - Wrong period applied → Billing disputes, delayed payment
  - Batch details missing → Cannot reconcile with vendor records
  - Settlement fails for cross-plant withdrawals → Manual intervention required
- **Mitigation:** Period boundary testing, Data completeness verification, Multi-plant scenario testing

### Scenario Area 5: Invoice Verification Automation
- **Business Impact:** High
- **Failure Probability:** Medium
- **Overall Risk:** High
- **Failure Scenarios:**
  - Automatic invoice creation fails → Manual processing required, delay
  - Price mismatch → Invoice blocked, requires manual clearing
  - GR/IR account not cleared → Open items accumulate, month-end reconciliation issue
- **Mitigation:** Invoice matching validation, Price consistency check, GR/IR clearing verification

### Scenario Area 6: Error Handling and Data Validation
- **Business Impact:** Medium
- **Failure Probability:** Medium
- **Overall Risk:** Medium
- **Failure Scenarios:**
  - Zero/negative quantity accepted → Invalid movement posted
  - Insufficient consignment stock not detected → Overdrawn stock, negative inventory
  - Invalid vendor/batch combination allowed → Incorrect liability posting
  - Backdated posting without authorization → Audit violation
- **Mitigation:** Input validation testing, Negative testing, Authorization boundary testing

---

## Test Scenario Inventory

### Happy Path Scenarios (HP)

1. **HP-1: Complete Consignment Withdrawal Flow**
   - Access app → Select valid material/vendor/batch → Enter withdrawal quantity → Post movement → Verify ownership transfer → Verify financial posting → Verify batch traceability maintained
   - **Coverage:** AC-1, AC-2, AC-3, AC-6

2. **HP-2: Settlement Document Generation and Invoice Creation**
   - Execute consignment settlement for period → Verify all withdrawals included → Verify batch details present → Generate invoice automatically → Verify invoice matches settlement → Verify GR/IR clearing
   - **Coverage:** AC-4, AC-5

### Alternative Path Scenarios (AP)

3. **AP-1: Partial Withdrawal (Less Than Available Stock)**
   - Withdraw 50% of available consignment stock → Verify remaining stock still vendor-owned → Verify liability posted only for withdrawn quantity
   - **Coverage:** AC-2, AC-3

4. **AP-2: Full Withdrawal (Exact Available Stock)**
   - Withdraw 100% of available consignment stock → Verify consignment stock balance = zero → Verify all stock transferred to company-owned
   - **Coverage:** AC-2, AC-3

5. **AP-3: Multiple Batches Withdrawal in Same Period**
   - Withdraw Batch A → Withdraw Batch B → Generate settlement → Verify both batches listed separately in settlement document
   - **Coverage:** AC-2, AC-4, AC-6

6. **AP-4: Cross-Month Settlement Period**
   - Withdraw in January and February → Settle for Jan 1 - Feb 28 → Verify all withdrawals included regardless of posting date
   - **Coverage:** AC-4

7. **AP-5: Backdated Withdrawal Posting**
   - Post withdrawal with past posting date (within allowed period) → Verify financial posting uses backdated values → Verify settlement includes backdated withdrawal
   - **Coverage:** AC-3, AC-4

### Negative Scenarios (NEG)

8. **NEG-1: Insufficient Consignment Stock**
   - Attempt to withdraw quantity > available consignment stock → System rejects with error "Insufficient consignment stock available"
   - **Coverage:** AC-2

9. **NEG-2: Invalid Vendor-Batch Combination**
   - Select Material X, Vendor A, Batch owned by Vendor B → System rejects with error "Batch not found for selected vendor"
   - **Coverage:** AC-2

10. **NEG-3: Material Not Consignment-Enabled**
    - Attempt consignment withdrawal for non-consignment material → System rejects with error "Material not enabled for consignment stock"
    - **Coverage:** AC-2

11. **NEG-4: Unauthorized User Access**
    - User without M_MSEG_BWA authorization attempts to access app → System denies access with authorization error
    - **Coverage:** AC-1

### Error Scenarios (ERR)

12. **ERR-1: Zero Withdrawal Quantity**
    - Enter withdrawal quantity = 0 → System rejects with error "Quantity must be greater than zero"
    - **Coverage:** AC-3

13. **ERR-2: Negative Withdrawal Quantity**
    - Enter withdrawal quantity = -10 → System rejects with error "Negative quantities not allowed"
    - **Coverage:** AC-3

14. **ERR-3: Missing Mandatory Field (Plant)**
    - Leave Plant field blank → Attempt to post → System rejects with error "Plant is a required field"
    - **Coverage:** AC-1

15. **ERR-4: Missing Mandatory Field (Storage Location)**
    - Leave Storage Location field blank → Attempt to post → System rejects with error "Storage Location is required"
    - **Coverage:** AC-1

### Edge Case Scenarios (EDGE)

16. **EDGE-1: Expired Batch Withdrawal**
    - Attempt to withdraw batch with expiry date in the past → System blocks with error "Batch has expired"
    - **Coverage:** AC-6

17. **EDGE-2: Same-Day Settlement**
    - Withdraw material → Immediately settle for same day → Verify settlement document generated correctly
    - **Coverage:** AC-4

18. **EDGE-3: Settlement Period with No Withdrawals**
    - Execute settlement for period with zero consignment withdrawals → Verify system displays "No data found" or empty settlement document
    - **Coverage:** AC-4

19. **EDGE-4: Price Change During Settlement Period**
    - Material price changes mid-period → Withdraw before and after price change → Verify settlement uses price at time of each withdrawal
    - **Coverage:** AC-3, AC-5

20. **EDGE-5: Maximum Decimal Precision Quantity**
    - Enter withdrawal quantity with 3 decimal places (e.g., 10.125 KG) → Verify posting accepts and processes correctly
    - **Coverage:** AC-3

21. **EDGE-6: Zero-Price Consignment Material**
    - Withdraw consignment material with moving average price = 0 → Verify posting succeeds with zero-value accounting entry
    - **Coverage:** AC-3

### Integration Scenarios (INT)

22. **INT-1: Production Order Integration**
    - Consignment withdrawal triggered by production order goods issue → Verify automatic Movement Type 411 posted → Verify production order references consignment withdrawal
    - **Coverage:** AC-3, AC-6

23. **INT-2: Quality Inspection Post-Withdrawal**
    - Withdraw consignment stock to quality inspection → Approve batch → Transfer to unrestricted → Verify batch chain maintained
    - **Coverage:** AC-6

24. **INT-3: Invoice Verification with Price Variance**
    - Settlement document price differs from vendor invoice price → Verify invoice blocked for review → Manual price adjustment → Invoice posted
    - **Coverage:** AC-5

---

## Overall Risk Assessment

**Overall Story Risk Level:** **CRITICAL**

### Risk Justification
1. **Financial Impact:** Direct impact on inventory valuation (balance sheet) and vendor liability (accounts payable)
2. **Regulatory Compliance:** Batch traceability is mandatory for FDA/EMA-regulated biologics (pharmaceutical industry)
3. **Business Criticality:** High-value materials (biologics cost $1,000-$100,000/kg) — errors = significant financial loss
4. **Process Complexity:** Multi-module integration (MM + FI + Batch Management) with automatic postings
5. **Data Integrity:** Consignment stock segregation failure = financial misstatement (audit risk)
6. **Vendor Relationship:** Incorrect settlement = vendor disputes, payment delays, supply disruption

### Critical Risk Areas (Require Mandatory Testing)
- Ownership transfer accuracy (AC-3)
- Financial posting correctness (AC-3)
- Batch traceability integrity (AC-6)
- Settlement completeness (AC-4)
- Invoice automation reliability (AC-5)

### Test Coverage Recommendation
- **Minimum Test Cases:** 24 (all scenarios above)
- **Mandatory Coverage Types:** HP (2), AP (5), NEG (4), ERR (4), EDGE (6), INT (3)
- **Test Data Requirements:** 
  - At least 2 consignment vendors
  - At least 3 batch-managed materials (1 high-value biologic)
  - Multiple batches per material/vendor
  - Historical withdrawals for settlement testing
- **Test Environment:** Dedicated system with pre-configured consignment stock and vendor agreements

---

## Dependencies and Prerequisites

### Master Data Prerequisites
1. Material Master with consignment indicator active (MARC-KZECH = 'X')
2. Batch Management active for material (MARC-XCHPF = 'X')
3. Vendor Master with consignment agreement (LFM1 consignment info record)
4. Info Record with consignment liabilities account (EINE)
5. Consignment stock already posted via GR against consignment PO (Movement Type 101, special stock 'K')

### Configuration Prerequisites
1. Movement Type 411 configured for consignment withdrawal
2. Automatic account determination for consignment liability (GBB account)
3. Number ranges for material documents, accounting documents, settlement documents
4. Batch determination strategy configured
5. Evaluated Receipt Settlement (ERS) configured for automatic invoice creation (if AC-5 required)

### Authorization Prerequisites
1. M_MSEG_BWA with activity 01 (Create) for Movement Type 411
2. F_LFA1_BUK for vendor liability postings
3. S_TCODE for MRKO (Consignment Settlement)
4. M_MSEG_BWE for backdated postings (if AP-5 required)

---

## Test Execution Considerations

### Critical Verifications
1. **After Withdrawal Posting:**
   - Check MB52 for stock reduction in consignment stock (special stock 'K')
   - Check MB52 for stock increase in unrestricted stock
   - Check FB03 for accounting document with vendor credit and inventory debit
   - Check MB03 for batch document flow linkage

2. **After Settlement Generation:**
   - Check MRKO display for completeness of withdrawal items
   - Verify batch numbers present for all line items
   - Verify total settlement value matches sum of individual withdrawals
   - Check vendor master for liabilities balance update

3. **After Invoice Verification:**
   - Check MIRO or MIR7 for invoice document creation
   - Verify invoice references settlement document
   - Check GR/IR clearing entries (account WRX)
   - Verify vendor account balance reflects invoice posting

### Test Data Sensitivity
- **Biologics pricing:** Use realistic high-value pricing ($10,000+/unit) to validate financial impact
- **Batch expiry:** Set expiry dates realistically (12-24 months for biologics) to test expiry validation
- **Settlement periods:** Test month-end, quarter-end, year-end boundaries for period-related logic

### Performance Considerations
- Settlement processing with 100+ withdrawal line items may take 30-60 seconds
- Batch where-used analysis (MCX*) can be slow for materials with high transaction volume
- Financial document generation is real-time (no background processing) — expect 2-3 seconds per posting

---

## Traceability Matrix (AC to Scenario Mapping)

| AC | HP-1 | HP-2 | AP-1 | AP-2 | AP-3 | AP-4 | AP-5 | NEG-1 | NEG-2 | NEG-3 | NEG-4 | ERR-1 | ERR-2 | ERR-3 | ERR-4 | EDGE-1 | EDGE-2 | EDGE-3 | EDGE-4 | EDGE-5 | EDGE-6 | INT-1 | INT-2 | INT-3 |
|----|------|------|------|------|------|------|------|-------|-------|-------|-------|-------|-------|-------|-------|--------|--------|--------|--------|--------|--------|-------|-------|-------|
| AC-1 | ✓ |  |  |  |  |  |  |  |  |  | ✓ |  |  | ✓ | ✓ |  |  |  |  |  |  |  |  |  |
| AC-2 | ✓ |  | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AC-3 | ✓ |  | ✓ | ✓ |  |  | ✓ |  |  |  |  | ✓ | ✓ |  |  |  |  |  | ✓ | ✓ | ✓ | ✓ |  |  |
| AC-4 |  | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |  |  |  | ✓ | ✓ |  |  |  |  |  |  |
| AC-5 |  | ✓ |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | ✓ |  |  |  |  | ✓ |
| AC-6 | ✓ |  |  |  | ✓ |  |  |  |  |  |  |  |  |  |  | ✓ |  |  |  |  |  | ✓ | ✓ |  |

**Coverage Summary:**
- AC-1: 5 scenarios
- AC-2: 8 scenarios
- AC-3: 11 scenarios
- AC-4: 6 scenarios
- AC-5: 3 scenarios
- AC-6: 5 scenarios

**Total Unique Scenarios:** 24  
**Total AC Coverage Instances:** 38

---

## Analysis Metadata

- **Analyzed By:** Test Strategy Architect (Phase 2a Agent)
- **Analysis Date:** 2026-08-22
- **Story Key:** CS-28
- **Story Priority:** Critical
- **Analysis Confidence:** High
- **Recommended Test Cases:** 24
- **Estimated Test Effort:** 40-50 hours (includes test data setup, execution, verification)
- **Test Environment Requirements:** Dedicated SAP system with consignment stock configured
- **Special Skills Required:** SAP MM module knowledge, financial accounting understanding, batch management expertise
