# TC-CS-034: Create source list with Validity End Date in the past (expired approval)

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Date Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create and maintain source lists |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Vendor `{TD.vendorId}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP-critical raw material master number — entered by the user | Valid |
| Vendor ID | `{TD.vendorId}` | Approved vendor account number — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDatePast}` | Past date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDatePast}` | Past date (earlier than today — expired) — entered by the user | Valid (boundary - past) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Source Lists" | — | Search results appear listing the "Manage Source Lists" application |
| 8 | Click "Manage Source Lists" from the search results | — | "Manage Source Lists" application opens with the source list table view |
| 9 | Click the "Create" button in the application toolbar | — | New source list creation form opens in edit mode |
| 10 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 12 | In the "Vendor" field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered into the field |
| 13 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated |
| 14 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 15 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 16 | In the "Valid From" date field, enter a past validity start date | `{TD.validityStartDatePast}` | Past validity start date is populated |
| 17 | In the "Valid To" date field, enter a past date (earlier than today) | `{TD.validityEndDatePast}` | Past validity end date is populated (expired approval) |
| 18 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected |
| 19 | Click the "Save" button in the toolbar | — | SAP begins processing the source list creation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed indicating the source list record was created (SAP allows creation of expired records for historical data) |
| 21 | Note the source list record number or confirmation details from the message | — | Source list record number is displayed (format is system-generated) |
| 22 | Navigate back to the source list table view | — | Source list table is displayed |
| 23 | Search for the newly created source list record using the material and vendor combination | `{TD.materialId}`, `{TD.vendorId}`, `{TD.plant}` | The created source list record appears in the table |
| 24 | Verify that the source list status is "Expired" or "Inactive" due to the past end date | — | Source list record displays status "Expired" or "Inactive"; validity dates are in the past |
| 25 | Verify that the expired source list does not block PO creation (vendor is not actively approved) | — | Source list record exists but is not enforced for current transactions |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique source list record is created by SAP with expired validity dates
- The source list record is persisted in SAP with status "Expired" or "Inactive"
- The validity end date is in the past (boundary case for expired approvals)
- The expired source list does not actively approve the vendor for current PO creation
- The created source list record appears in the "Manage Source Lists" table with expired status

---

### Post-conditions

- SAP source list record exists for the material-plant-vendor combination with expired validity
- Source list status is "Expired" or "Inactive"
- Validity dates are correctly recorded as past dates
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
