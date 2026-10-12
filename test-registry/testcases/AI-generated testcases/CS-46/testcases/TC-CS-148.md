# TC-CS-148: Create Scheduling Agreement with maximum allowed total quantity

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Customer Scheduling Agreement Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to create Scheduling Agreements (transaction VA31) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and enabled for scheduling agreements in sales organization `{TD.salesOrg}` |
| P5 | Configuration | SAP system configuration allows the maximum quantity value `{TD.maxQuantity}` for scheduling agreements |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid hospital customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical product material number — entered by the user | Valid |
| Total Quantity | `{TD.maxQuantity}` | Maximum allowed quantity — entered by the user | Valid (boundary) |
| Validity Start Date | `{TD.validityStartDate}` | Valid start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Valid end date — entered by the user | Valid |
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
| 12 | In the "Valid From:*" field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 13 | In the "Valid To:*" field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 14 | In the "Items" section, click the "Create" button | — | A new empty line item row appears in the Items table |
| 15 | In the "Material:*" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 17 | In the "Target Quantity:*" field, enter the maximum allowed quantity | `{TD.maxQuantity}` | Maximum quantity is entered |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 19 | In the "Schedule Type:*" field, select "Fixed Dates" | `{TD.scheduleType}` | Schedule Type is set to "Fixed Dates" |
| 20 | Click the "Define Delivery Dates" button | — | Delivery Dates dialog opens |
| 21 | Enter a single fixed delivery date | `{TD.fixedDate1}` | Delivery date is entered |
| 22 | Click "OK" to confirm the delivery date | — | Delivery Dates dialog closes; delivery schedule is defined |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the Scheduling Agreement creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Scheduling Agreement number |
| 25 | Note the Scheduling Agreement number from the success message | — | Scheduling Agreement number is displayed |
| 26 | Navigate to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 27 | Verify that the delivery schedule line is generated with the maximum quantity | `{TD.maxQuantity}` | Schedule line appears with the maximum quantity value |
| 28 | Navigate back to the Scheduling Agreement list | — | Scheduling Agreement list is displayed |
| 29 | Search for the newly created Scheduling Agreement using the number noted in step 25 | — | The created Scheduling Agreement appears in the list with status "Active" |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Scheduling Agreement number is generated by SAP
- The Scheduling Agreement is created successfully with maximum allowed quantity
- The Scheduling Agreement is persisted with status "Active"
- Delivery schedule line is generated with the maximum quantity value
- The system accepts the maximum boundary value without errors

---

### Post-conditions

- SAP Scheduling Agreement document exists with the generated SA number
- SA status is "Active"
- Total quantity = maximum allowed value is correctly stored
- Delivery schedule line exists with correct date and maximum quantity
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
