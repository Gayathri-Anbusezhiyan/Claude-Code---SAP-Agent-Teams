# TC-CS-026: Attempt Billing for Delivery with No Quality Inspection Lot Created

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       NEGATIVE  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Sales Order | Sales Order `{TD.salesOrderNumber}` exists with status Open and contains batch-managed material `{TD.materialId}` |
| P4 | Delivery | Delivery document `{TD.deliveryNumberNoInspectionLot}` exists with goods issue posted |
| P5 | Batch Assignment | Batch `{TD.batchNumberNoInspectionLot}` is assigned to delivery line item; batch status is Unrestricted |
| P6 | Quality Inspection | NO quality inspection lot (QALS entry) exists for batch `{TD.batchNumberNoInspectionLot}` — inspection lot creation step was skipped or failed |
| P7 | Configuration | Quality Management (QM) module is active; inspection lot creation is required for batch-managed materials before billing |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberNoInspectionLot}` | Delivery with no quality inspection lot created | Valid (exists but missing inspection lot) |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |
| Batch Number | `{TD.batchNumberNoInspectionLot}` | Batch with no associated inspection lot | Valid (batch exists but no QM lot) |

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
| 12 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumberNoInspectionLot}` | Delivery number is entered |
| 13 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is attempted to load |
| 14 | Observe the system validation response | — | SAP performs quality inspection lot lookup for batch `{TD.batchNumberNoInspectionLot}` and detects no inspection lot exists in QALS table |
| 15 | Verify error message is displayed | — | System displays an error message indicating "No inspection lot found" or "Quality inspection missing"; billing document creation is blocked |
| 16 | Verify that no billing document number is generated | — | No billing document number appears; the billing process is halted at validation |
| 17 | Attempt to click "Save" button (if available) | — | Save button is either disabled or clicking it produces the same missing inspection lot error |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No billing document is created
- SAP displays a clear error message stating that no quality inspection lot exists for the batch
- The quality inspection lot validation prevents the billing process from completing
- User is informed that the billing cannot proceed until a quality inspection lot is created and a usage decision is recorded
- No incomplete or partial billing document is persisted in the system

---

### Post-conditions

- No billing document exists in SAP for delivery `{TD.deliveryNumberNoInspectionLot}`
- Delivery remains unbilled due to missing quality inspection lot
- Batch `{TD.batchNumberNoInspectionLot}` continues to have no associated inspection lot in QALS
- No application-level data corruption or inconsistency occurs

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
