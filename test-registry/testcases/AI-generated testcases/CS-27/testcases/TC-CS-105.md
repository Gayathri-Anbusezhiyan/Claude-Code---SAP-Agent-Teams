# TC-CS-105: Attempt to create a contract with missing Supplier field

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.emptyValue}` | Empty/blank value (field left empty) | Missing |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Negotiated price — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter the password | `{ENV.SAP_PASSWORD}` | Password is entered |
| 5 | Click "Continue" | — | Fiori Launchpad home page loads |
| 6 | If Introduction pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Click search icon and type "Manage Purchase Contracts" | — | Search results appear |
| 8 | Click "Manage Purchase Contracts" | — | Application opens |
| 9 | Click "Create" button | — | Contract creation form opens |
| 10 | Leave the "Supplier:*" field BLANK (do not enter any value) | `{TD.emptyValue}` | Supplier field remains empty |
| 11 | In "Material:*" field, enter Material ID | `{TD.validMaterialId}` | Material ID is entered |
| 12 | Press Enter | — | Material is validated but supplier field error remains |
| 13 | In "Plant:*" field, enter Plant code | `{TD.plant}` | Plant is entered |
| 14 | Press Enter | — | Plant is accepted |
| 15 | In "Target Quantity" field, enter quantity | `{TD.targetQuantity}` | Quantity is entered |
| 16 | In "Valid From:*" field, enter start date | `{TD.validityStartDate}` | Start date is entered |
| 17 | In "Valid To:*" field, enter end date | `{TD.validityEndDate}` | End date is entered |
| 18 | In pricing "Scale Quantity" field, enter starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered |
| 19 | In pricing "Net Price:*" field, enter price | `{TD.netPrice}` | Price is entered |
| 20 | Press Enter | — | Pricing is saved but supplier field error persists |
| 21 | Click "Save" button | — | SAP displays mandatory field error for Supplier |
| 22 | Observe error message | — | Message states "Supplier is a mandatory field" or "Please enter a supplier" or similar validation message |
| 23 | Verify Supplier field is highlighted with error indicator | — | Field shows error icon or red border |
| 24 | Verify contract is NOT created | — | No success message; no contract number generated |
| 25 | Click User Profile icon | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out dialog appears |
| 27 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP detects that the mandatory "Supplier" field is empty
- An error message is displayed stating the field is mandatory
- The Supplier field is highlighted with an error indicator
- Contract creation is blocked; "Save" button does not create the contract
- No contract number is generated; no contract is persisted
- Mandatory field validation is functioning correctly

---

### Post-conditions

- No contract document is created
- Mandatory field validation enforced successfully
- No incomplete data persists in the system

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
