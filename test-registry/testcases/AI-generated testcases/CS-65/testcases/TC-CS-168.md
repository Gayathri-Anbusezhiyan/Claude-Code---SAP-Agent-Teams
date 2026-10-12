# TC-CS-168: Single-Component BOM (Minimum Valid Structure)

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MEDIUM
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterial1}` exists, is active, approved for pharmaceutical use, and is configured for plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-EDGE-04`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Single component material number — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of component per finished product unit — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for component — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Bills of Material" | — | Search results appear listing the "Manage Bills of Material" application |
| 8 | Click "Manage Bills of Material" from the search results | — | "Manage Bills of Material" application opens displaying the BOM list screen |
| 9 | Click the "Create" button in the application toolbar | — | New BOM creation form opens in edit mode |
| 10 | In the "Material" header field, enter the finished product material number | `{TD.finishedProductMaterial}` | Finished product material number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedProductDesc}` is auto-populated |
| 12 | In the "Plant" header field, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description `{TD.plantDesc}` is auto-populated |
| 14 | In the "BOM Usage" field, select the usage type | `{TD.bomUsage}` | BOM Usage is set to "Production" |
| 15 | In the "Valid From" date field, enter the validity start date | `{TD.validFromDate}` | Valid From date is populated with the specified date |
| 16 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 17 | In the "Component" field of the line item, enter the component material number | `{TD.componentMaterial1}` | Component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated; base UoM `{TD.componentBaseUoM1}` is auto-filled |
| 19 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | Do NOT add any additional component line items (single-component BOM structure) | — | Only one component line item exists in the BOM |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the BOM creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed indicating the BOM has been created with a BOM number (SAP accepts single-component BOM structure) |
| 25 | Note the BOM number from the success message or the header area | — | BOM number is displayed (system-generated) |
| 26 | Verify the BOM status field | — | BOM status is set to "Draft" |
| 27 | Verify the BOM contains exactly one component line item | — | Only one component line item is present with material `{TD.componentMaterial1}`, quantity `{TD.componentQuantity1}`, and UoM `{TD.componentUoM1}` |
| 28 | Navigate to the "Change History" or "Change Log" tab if available | — | Change History tab is accessible |
| 29 | Verify the change history entry | — | An audit trail entry is present showing: creation timestamp, user ID `{TD.createdByUser}`, and object key (BOM number) |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique BOM number is generated by SAP and displayed in the confirmation message
- The BOM is persisted in SAP with status "Draft"
- The BOM contains exactly one component line item (minimum valid structure)
- All header data (Finished Product Material, Plant, BOM Usage, Valid From) is correctly stored
- Component line item (Component Material, Quantity, UoM) is correctly stored
- A change history entry is created capturing: creation timestamp, user ID, and BOM number
- SAP accepts single-component BOM as a valid structure (no minimum component count enforced)

---

### Post-conditions

- SAP Bill of Material exists with the generated BOM number
- BOM status is "Draft"
- Finished product material, plant, and BOM usage are correctly recorded in the BOM header
- One component line item exists with correct material number, quantity, and UoM
- Component material is active and approved as per material master status
- Change history audit trail entry exists for BOM creation
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
