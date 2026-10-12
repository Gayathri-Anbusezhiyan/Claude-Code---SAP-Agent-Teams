# TC-CS-031: Verify Billing Behavior When Quality Status Changes During Billing Process (Concurrent Update)

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Sales Order | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains batch-managed material `{TD.materialId}` |
| P4 | Delivery | Delivery document `{TD.deliveryNumberConcurrent}` exists with goods issue posted |
| P5 | Batch Assignment | Batch `{TD.batchNumberConcurrent}` is assigned to delivery line item; batch status is Unrestricted |
| P6 | Quality Inspection | Inspection lot `{TD.inspectionLotNumberConcurrent}` exists with initial usage decision 'Accepted' |
| P7 | Concurrent User | A second user or process is available to change the inspection lot usage decision during the billing process |
| P8 | Configuration | Quality Management (QM) module is active; real-time quality status validation is enforced |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberConcurrent}` | Delivery with quality status subject to concurrent change | Valid |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |
| Inspection Lot Number | `{TD.inspectionLotNumberConcurrent}` | Inspection lot with usage decision that will change during billing | Valid (initially), then Invalid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Create Billing Document" | — | Search results appear listing the Create Billing Document application |
| 8 | Click "Create Billing Document" from the search results | — | Create Billing Document application opens (VF01) |
| 9 | In the "Billing Type" field, enter the billing type | `{TD.billingType}` | Billing type is entered (F2) |
| 10 | Press Enter to confirm the billing type | — | Billing type is confirmed; additional fields become available |
| 11 | In the "Billing Date" field, enter the billing date | `{TD.billingDate}` | Billing date is entered |
| 12 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumberConcurrent}` | Delivery number is entered |
| 13 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is loaded; quality status is initially 'Accepted' |
| 14 | CONCURRENT ACTION: In a separate session or via QM transaction, change the usage decision of inspection lot `{TD.inspectionLotNumberConcurrent}` from 'Accepted' to 'Rejected' or blank | — | Inspection lot usage decision is changed in the backend (QALS table updated) |
| 15 | In the billing session, verify that the line items section displays delivery data | — | Line items table displays material, batch, and billing quantity populated from delivery |
| 16 | Click the "Save" button in the toolbar | — | SAP performs final batch and quality status validation at save time (re-checking current status) |
| 17 | Observe the system validation response | — | SAP detects that inspection lot usage decision has changed to 'Rejected' or blank (no longer 'Accepted') |
| 18 | Verify error message is displayed | — | System displays an error message indicating "Usage decision not made" or "Inspection lot not released"; billing document creation is blocked |
| 19 | Verify that no billing document number is generated | — | No billing document number appears; the billing process is halted at final validation |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No billing document is created
- SAP performs real-time quality status validation at final save/submit time
- System detects the concurrent change to inspection lot status and displays an error
- User is informed that the quality inspection status has changed and billing cannot proceed
- No incomplete or partial billing document is persisted in the system
- System prevents financial/compliance violation by enforcing quality release status at final validation checkpoint

---

### Post-conditions

- No billing document exists in SAP for delivery `{TD.deliveryNumberConcurrent}`
- Delivery remains unbilled due to concurrent quality status change
- Inspection lot `{TD.inspectionLotNumberConcurrent}` has updated status (Rejected or blank)
- No application-level data corruption or inconsistency occurs
- System demonstrates locking or real-time validation mechanism to prevent stale data usage

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
