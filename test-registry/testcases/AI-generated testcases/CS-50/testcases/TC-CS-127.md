# TC-CS-127: Attempt to Release Process Order When Component Material is on Quality Hold and Verify System Prevents Release

**User Story:**          [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Creation (Pharmaceutical Manufacturing)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create process orders (SAP_PP_PROCESS_ORDER_CREATE or equivalent) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Master Recipe `{TD.masterRecipeId}` exists with status "Approved/Released" and is active in the SAP system |
| P4 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and the material is configured for plant `{TD.plant}` |
| P5 | Master Data | Bill of Material (BOM) is active and linked to the master recipe `{TD.masterRecipeId}` |
| P6 | Master Data | Component material `{TD.componentMaterialOnHold}` exists in the BOM and is set to quality status "Blocked" or "On Hold" in the SAP system |
| P7 | Master Data | Routing/Operations are defined in the released recipe `{TD.masterRecipeId}` |
| P8 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing and assigned to company code `{TD.companyCode}` |
| P9 | Configuration | Quality management is active for component materials in plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID | `{TD.masterRecipeId}` | Recipe identifier with Approved/Released status — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished product material number with batch management active — entered by the user | Valid |
| Plant | `{TD.plant}` | Pharmaceutical manufacturing plant code — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Target production quantity — entered by the user | Valid |
| Production Start Date | `{TD.productionStartDate}` | Scheduled start date for production — entered by the user | Valid |
| Component Material on Hold | `{TD.componentMaterialOnHold}` | Component material number that is on quality hold (Blocked status) — auto-populated from BOM | Invalid (quality hold) |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Process Order" | — | Search results appear listing the "Create Process Order" application |
| 8 | Click the "Create Process Order" application name from the search results | — | "Create Process Order" application opens in edit mode |
| 9 | In the "Material:*" header field, enter the Material Number | `{TD.materialNumber}` | Material number is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated in the header |
| 11 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description is auto-populated |
| 13 | In the "Master Recipe:*" field, enter the Master Recipe ID | `{TD.masterRecipeId}` | Master Recipe ID is entered into the field |
| 14 | Press Enter to confirm the Master Recipe entry | — | SAP validates the master recipe; master recipe description is auto-populated; recipe status is confirmed as "Approved/Released" |
| 15 | Verify that the Bill of Material (BOM) section is displayed | — | BOM section is visible; component materials are listed including `{TD.componentMaterialOnHold}` |
| 16 | Verify that the component material `{TD.componentMaterialOnHold}` is displayed in the BOM section | `{TD.componentMaterialOnHold}` | Component material is listed in the BOM with material number and description |
| 17 | In the "Order Quantity:*" field, enter the target production quantity | `{TD.orderQuantity}` | Order quantity is entered into the field |
| 18 | Press Enter to confirm the Order Quantity entry | — | Order quantity is confirmed |
| 19 | In the "Production Start Date:*" field, enter the production start date | `{TD.productionStartDate}` | Production start date is entered into the field |
| 20 | Press Enter to confirm the Production Start Date entry | — | Production start date is confirmed |
| 21 | Click the "Create" button (primary submit action) in the top toolbar | — | SAP begins processing the process order creation and performs quality hold validation on component materials |
| 22 | Observe the on-screen response | — | An error message is displayed indicating that the process order cannot be released because component material `{TD.componentMaterialOnHold}` is on quality hold or blocked |
| 23 | Verify the error message content | — | Error message states: "Component material {material number} is on quality hold" or "Cannot release order: blocked material" or similar validation message |
| 24 | Verify that no Process Order number is generated | — | No success message is displayed; no Process Order number is shown |
| 25 | Verify that no Batch number is generated | — | No Batch number is displayed |
| 26 | Verify that the form remains in edit mode | — | The form remains open with all entered data visible; no document is created |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that component material `{TD.componentMaterialOnHold}` from the BOM is on quality hold (status "Blocked" or "On Hold")
- The system displays an error message indicating that the process order cannot be released because a component material is on quality hold
- Error message pattern: "Component material {material number} is on quality hold" or "Cannot release order: blocked material"
- No Process Order number is generated
- No Batch number is generated
- The transaction is not completed
- The form remains in edit mode with all entered data visible
- GMP compliance is maintained by preventing the use of non-conforming materials in production

---

### Post-conditions

- No SAP Process Order document is created
- No Batch number is generated
- The system remains in edit mode with validation error displayed
- No data is persisted in the SAP system
- Component material `{TD.componentMaterialOnHold}` remains on quality hold status

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
