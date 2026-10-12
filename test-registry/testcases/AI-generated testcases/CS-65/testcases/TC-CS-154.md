# TC-CS-154: Attempt to Add BOM Component with Non-Existent Material ID

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Component Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.invalidComponentMaterial}` does NOT exist in SAP |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Invalid Component Material | `{TD.invalidComponentMaterial}` | Non-existent component material number — entered by the user | Invalid |
| Component Quantity | `{TD.componentQuantity1}` | Quantity value — entered by the user | Valid |
| Component UoM | `{TD.componentUoM1}` | Unit of measure — entered by the user | Valid |

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
| 17 | In the "Component" field of the line item, enter the non-existent component material number | `{TD.invalidComponentMaterial}` | Invalid component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; an error message is displayed indicating the material does not exist; component description is NOT auto-populated; base UoM is NOT auto-filled |
| 19 | Observe the error message content | — | Error message states: "Material does not exist" or "Material [material number] not found" or similar validation error |
| 20 | Verify that the Component field is highlighted as invalid | — | Component field is highlighted in red or marked with an error indicator |
| 21 | Attempt to proceed by entering quantity and UoM in the line item | `{TD.componentQuantity1}`, `{TD.componentUoM1}` | Quantity and UoM can be entered but the line item remains invalid due to component validation failure |
| 22 | Click the "Save" button in the toolbar to attempt BOM creation | — | SAP validates all line items; submission is blocked due to invalid component material |
| 23 | Observe the system response | — | SAP displays a validation error message; BOM is NOT created; error message indicates "Component material is invalid" or "Cannot save BOM with invalid components" |
| 24 | Verify that no BOM number is generated | — | No BOM number is displayed; the form remains in edit mode with error indicators |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the component material ID and detects that it does not exist in the material master
- An error message is displayed indicating the material does not exist; the component description is NOT auto-populated
- The Component field is highlighted as invalid (red or error indicator)
- SAP prevents BOM creation when the Save button is clicked; a validation error message is displayed
- No BOM number is generated
- BOM is NOT created or persisted in SAP
- The system requires each BOM component to reference an approved, active material master record (AC-2 fulfilled)

---

### Post-conditions

- No BOM is created in SAP
- No BOM number is generated
- The user remains on the BOM creation form with validation errors displayed
- No application-level errors or critical warnings remain outstanding after sign-out

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
