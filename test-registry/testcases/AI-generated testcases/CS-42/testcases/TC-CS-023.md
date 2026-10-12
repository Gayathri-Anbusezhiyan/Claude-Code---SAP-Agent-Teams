# TC-CS-023: Attempt Billing for Delivery with Quality Inspection Status Not Released

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
| P4 | Delivery | Delivery document `{TD.deliveryNumberNotReleased}` exists with goods issue posted |
| P5 | Batch Assignment | Batch `{TD.batchNumberNotReleased}` is assigned to delivery line item; batch status is Unrestricted |
| P6 | Quality Inspection | Inspection lot `{TD.inspectionLotNumberNotReleased}` exists for batch `{TD.batchNumberNotReleased}` |
| P7 | Usage Decision | Usage decision status (QALS-VERWENDG) is NOT 'Accepted' (value is blank, 'R' = Rejected, or other non-released status) |
| P8 | Configuration | Quality Management (QM) module is active; quality inspection validation is enforced for billing |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberNotReleased}` | Delivery with non-released quality inspection lot | Valid (exists but quality not released) |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |
| Inspection Lot Number | `{TD.inspectionLotNumberNotReleased}` | Inspection lot without 'Accepted' usage decision | Invalid (not released) |

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
| 12 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumberNotReleased}` | Delivery number is entered |
| 13 | Press Enter to confirm the delivery entry | — | SAP validates the delivery; delivery data is attempted to load |
| 14 | Observe the system validation response | — | SAP performs quality inspection status validation and detects inspection lot `{TD.inspectionLotNumberNotReleased}` has not been released (usage decision not 'Accepted') |
| 15 | Verify error message is displayed | — | System displays an error message indicating "Usage decision not made" or "Inspection lot not released"; billing document creation is blocked |
| 16 | Verify that no billing document number is generated | — | No billing document number appears; the billing process is halted at validation |
| 17 | Attempt to click "Save" button (if available) | — | Save button is either disabled or clicking it produces the same quality release error |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No billing document is created
- SAP displays a clear error message stating the quality inspection lot is not released or usage decision has not been made
- The quality release validation prevents the billing process from completing
- User is informed that the billing cannot proceed until the quality inspection status is updated to 'Accepted'
- No incomplete or partial billing document is persisted in the system

---

### Post-conditions

- No billing document exists in SAP for delivery `{TD.deliveryNumberNotReleased}`
- Delivery remains unbilled due to quality release failure
- Inspection lot `{TD.inspectionLotNumberNotReleased}` continues to have non-released status
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
