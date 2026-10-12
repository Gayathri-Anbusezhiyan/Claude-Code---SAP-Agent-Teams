# TC-CS-135: Attempt Export Delivery Creation with Sales Order Field Empty

**User Story:**          [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Export Documentation Generation with Certificate of Analysis
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries (V_LIKP_LES) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Scenario | User attempts to create an outbound delivery WITHOUT entering a Sales Order Number in the mandatory Sales Order field |

---

### Test Data

**Dataset Reference:** `testdata/CS-49/CS-49-testdata.json` — Dataset ID: `TD-CS-049-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.emptyValue}` | Sales Order field left EMPTY — mandatory field | Invalid (empty) |
| Shipping Point | `{TD.shippingPoint}` | Shipping point — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Delivery date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Delivery" | — | Search results appear listing the "Create Outbound Deliveries" application |
| 8 | Click the "Create Outbound Deliveries" application from the search results | — | "Create Outbound Deliveries" application opens |
| 9 | Leave the "Sales Order" field EMPTY (do not enter any value) | `{TD.emptyValue}` | Sales Order field remains blank |
| 10 | In the "Shipping Point" field, enter the Shipping Point | `{TD.shippingPoint}` | Shipping Point is entered |
| 11 | Press Enter to confirm the Shipping Point entry | — | Shipping Point is entered but no validation occurs because Sales Order is missing |
| 12 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery Date is entered |
| 13 | Press Enter to confirm the Delivery Date entry | — | Delivery Date is entered |
| 14 | Attempt to click the "Save" button or "Create" button to proceed with delivery creation | — | SAP blocks the save action |
| 15 | Observe the system response | — | SAP displays an error message highlighting the "Sales Order" field as mandatory and stating "Sales Order is required" or "Enter a sales order number"; field is highlighted in red or with an error indicator |
| 16 | Verify that no Outbound Delivery Number is generated | — | No delivery is created; no delivery number is displayed |
| 17 | Verify that the user cannot proceed without entering a Sales Order | — | Save or Create button remains disabled or continues to show error; delivery creation is blocked |
| 18 | Click the User Profile icon (top-right shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Delivery creation FAILS with an error message
- SAP highlights the "Sales Order" field as mandatory and displays an error message stating "Sales Order is required" or "Enter a sales order number"
- No Outbound Delivery Number is generated
- User cannot proceed with delivery creation until the Sales Order field is filled

---

### Post-conditions

- No Outbound Delivery document is created in SAP
- No changes to master data or sales order status

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
