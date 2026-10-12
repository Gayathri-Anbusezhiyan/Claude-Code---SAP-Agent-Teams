# TC-CS-022: Create source list with multiple approved vendors for material-plant combination

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create and maintain source lists |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Vendor `{TD.vendorId1}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P5 | Master Data | Vendor `{TD.vendorId2}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P6 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP-critical raw material master number — entered by the user | Valid |
| Vendor ID 1 | `{TD.vendorId1}` | First approved vendor account number — entered by the user | Valid |
| Vendor ID 2 | `{TD.vendorId2}` | Second approved vendor account number — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Approval validity start date — entered by the user | Valid (today's date) |
| Validity End Date | `{TD.validityEndDate}` | Approval expiry date — entered by the user | Valid (future date) |

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
| 12 | In the "Vendor" field, enter the first Vendor ID | `{TD.vendorId1}` | First Vendor ID value is entered into the field |
| 13 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName1}` is auto-populated |
| 14 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 15 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 16 | In the "Valid From" date field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is populated |
| 17 | In the "Valid To" date field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is populated |
| 18 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected, designating the first vendor as approved |
| 19 | Click the "Save" button in the toolbar | — | SAP begins processing the first source list creation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed indicating the source list record was created for the first vendor |
| 21 | Click the "Create" button again to create a second source list record | — | New source list creation form opens in edit mode |
| 22 | In the "Material" field, enter the same Material ID | `{TD.materialId}` | Material ID value is entered into the field |
| 23 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 24 | In the "Vendor" field, enter the second Vendor ID | `{TD.vendorId2}` | Second Vendor ID value is entered into the field |
| 25 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName2}` is auto-populated |
| 26 | In the "Plant" field, enter the same Plant code | `{TD.plant}` | Plant code is entered into the field |
| 27 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 28 | In the "Valid From" date field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is populated |
| 29 | In the "Valid To" date field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is populated |
| 30 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected, designating the second vendor as approved |
| 31 | Click the "Save" button in the toolbar | — | SAP begins processing the second source list creation |
| 32 | Observe the on-screen confirmation response | — | A success message is displayed indicating the second source list record was created |
| 33 | Navigate back to the source list table view | — | Source list table is displayed |
| 34 | Search for source list records using the material and plant combination | `{TD.materialId}`, `{TD.plant}` | Both created source list records appear in the table with status "Active" |
| 35 | Verify that both vendors are listed as approved for the material-plant combination | — | Two source list records are displayed, each with a different vendor and the fixed vendor indicator |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two unique source list records are created by SAP for the same material-plant combination
- Each source list record is persisted in SAP with status "Active"
- Both vendors are designated as "Approved" for the specified material-plant combination
- Validity start and end dates are correctly stored for both records
- Both source list records appear in the "Manage Source Lists" table and can be viewed

---

### Post-conditions

- Two SAP source list records exist for the material-plant combination with different vendors
- Both source list statuses are "Active"
- Material, vendors, plant, and validity dates are correctly recorded for both records
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
