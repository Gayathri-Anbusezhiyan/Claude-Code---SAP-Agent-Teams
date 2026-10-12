# TC-CS-126: Create Scheduling Agreement with interval-based delivery schedule

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Customer Scheduling Agreement Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to create Scheduling Agreements (transaction VA31) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and enabled for scheduling agreements in sales organization `{TD.salesOrg}` |
| P5 | Configuration | Sales Organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-HP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Hospital customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical product material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Total target quantity for the scheduling agreement — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Scheduling agreement start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Scheduling agreement end date — entered by the user | Valid |
| Schedule Type | `{TD.scheduleType}` | Delivery schedule type: "Interval" — selected by the user | Valid |
| Interval | `{TD.interval}` | Number of days between deliveries — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |
| Division | `{TD.division}` | Division code — verified in the header | Valid |

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
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated; Sales Org `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are auto-populated |
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values (auto-defaulted from customer master) |
| 13 | In the "Valid From:*" field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 14 | In the "Valid To:*" field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 15 | In the "Items" section, click the "Create" button | — | A new empty line item row appears in the Items table |
| 16 | In the "Material:*" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 17 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 18 | In the "Target Quantity:*" field, enter the total quantity | `{TD.totalQuantity}` | Total target quantity is populated in the line item |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 20 | In the "Schedule Type:*" field, select "Interval" | `{TD.scheduleType}` | Schedule Type is set to "Interval" |
| 21 | In the "Interval (Days):*" field, enter the interval value | `{TD.interval}` | Interval value is entered (e.g., 14 for every 14 days) |
| 22 | Press Enter to confirm the interval entry | — | Interval is confirmed; delivery schedule is calculated based on interval and validity period |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the Scheduling Agreement creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Scheduling Agreement number |
| 25 | Note the Scheduling Agreement number from the success message | — | Scheduling Agreement number is displayed (10-digit format, e.g., 5500000124) |
| 26 | Navigate to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 27 | Verify that delivery schedule lines are automatically generated at the specified interval within the validity period | `{TD.interval}` | Multiple schedule lines appear with sequential line numbers (10, 20, 30...) and delivery dates spaced by the specified interval |
| 28 | Verify that all delivery dates fall within the validity period | `{TD.validityStartDate}`, `{TD.validityEndDate}` | All schedule line delivery dates are >= validity start date and <= validity end date |
| 29 | Navigate back to the Scheduling Agreement list | — | Scheduling Agreement list is displayed |
| 30 | Search for the newly created Scheduling Agreement using the number noted in step 25 | — | The created Scheduling Agreement appears in the list with status "Active" |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Scheduling Agreement number is generated by SAP and displayed in the confirmation message
- The Scheduling Agreement is persisted in SAP with document type "Scheduling Agreement" and status "Active"
- All header data (Customer, Sales Org, Distribution Channel, Division, Validity Period) is correctly stored
- All line item data (Material, Total Quantity, Unit of Measure) is correctly stored
- Delivery schedule lines are automatically generated at the specified interval (e.g., every 14 days) within the validity period
- The created Scheduling Agreement appears in the list and can be viewed

---

### Post-conditions

- SAP Scheduling Agreement document exists with the generated SA number
- SA status is "Active"
- Customer, material, total quantity, validity period, and interval-based delivery schedule data are correctly recorded
- Delivery schedule lines exist with dates spaced at the specified interval and falling within the validity period
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
