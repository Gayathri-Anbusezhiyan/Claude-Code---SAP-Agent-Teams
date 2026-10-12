# TC-CS-158: Create Scheduling Agreement with validity start date equal to today (earliest possible)

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Customer Scheduling Agreement Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            LOW
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to create Scheduling Agreements (transaction VA31) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and enabled for scheduling agreements in sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-EDGE-013`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid hospital customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical product material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Valid total quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDateToday}` | Today's date (earliest possible) — entered by the user | Valid (boundary) |
| Validity End Date | `{TD.validityEndDate}` | Future end date — entered by the user | Valid |
| Schedule Type | `{TD.scheduleType}` | "Fixed Dates" — selected by the user | Valid |
| Fixed Dates | `{TD.fixedDate1}` | Single delivery date — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Scheduling Agreement" | — | Search results appear listing the Scheduling Agreement application |
| 8 | Click "Scheduling Agreement" from the search results | — | Scheduling Agreement application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Scheduling Agreement creation form opens in edit mode |
| 10 | In the "Sold-To Party:*" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name is auto-populated |
| 12 | In the "Valid From:*" field, enter today's date | `{TD.validityStartDateToday}` | Validity start date (today) is entered |
| 13 | In the "Valid To:*" field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 14 | In the "Items" section, click the "Create" button | — | A new empty line item row appears in the Items table |
| 15 | In the "Material:*" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 17 | In the "Target Quantity:*" field, enter the total quantity | `{TD.totalQuantity}` | Total quantity is entered |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | In the "Schedule Type:*" field, select "Fixed Dates" | `{TD.scheduleType}` | Schedule Type is set to "Fixed Dates" |
| 20 | Click the "Define Delivery Dates" button | — | Delivery Dates dialog opens |
| 21 | Enter a fixed delivery date | `{TD.fixedDate1}` | Delivery date is entered |
| 22 | Click "OK" to confirm the delivery date | — | Delivery Dates dialog closes; delivery schedule is defined |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the Scheduling Agreement creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Scheduling Agreement number |
| 25 | Note the Scheduling Agreement number from the success message | — | Scheduling Agreement number is displayed |
| 26 | Verify that the Scheduling Agreement is active immediately (start date = today) | — | SA status is "Active"; validity starts today |
| 27 | Navigate back to the Scheduling Agreement list | — | Scheduling Agreement list is displayed |
| 28 | Search for the newly created Scheduling Agreement using the number noted in step 25 | — | The created Scheduling Agreement appears in the list with status "Active" |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Scheduling Agreement number is generated by SAP
- The Scheduling Agreement is created successfully with validity start date = today
- The SA is immediately active (no future start date)
- The system accepts today's date as the earliest possible start date
- The Scheduling Agreement is persisted with status "Active"

---

### Post-conditions

- SAP Scheduling Agreement document exists with the generated SA number
- SA status is "Active"
- Validity start date = today is correctly stored
- Delivery schedule line exists with correct date
- No application-level errors or critical warnings remain outstanding

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
