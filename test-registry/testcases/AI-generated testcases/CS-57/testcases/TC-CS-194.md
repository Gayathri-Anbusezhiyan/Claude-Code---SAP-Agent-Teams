# TC-CS-194: INT-01: Validate Material Master integration

**User Story:**          [CS-57] Create a Recipe (Master Recipe) With Operations and In-Process Controls
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Master Recipe Creation
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION_TEST
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create master recipes (C_RECIPE_MNT) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.material}` exists in Material Master (MM module), is active, and is enabled for recipe creation (Recipe Creation Allowed indicator is set) |
| P4 | Master Data | Plant `{TD.plant}` is active, is configured for production, and is assigned to company code |
| P5 | Configuration | Recipe Type `{TD.recipeType}` is configured and active in the system |
| P6 | Integration | Material Master (MM module) integration is active and accessible from PP module |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.material}` | Material number from MM module — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Recipe Description | `{TD.recipeDescription}` | Descriptive text for the recipe — entered by the user | Valid |
| Recipe Type | `{TD.recipeType}` | Recipe type code — entered by the user | Valid |
| Base Quantity | `{TD.baseQuantity}` | Recipe base quantity — entered by the user | Valid |
| Unit of Measure | `{TD.uom}` | Unit of measure (auto-populated from Material Master) — verified by the user | Valid |
| Effective Date | `{TD.effectiveDate}` | Recipe effective date — entered by the user | Valid |
| Material Description | `{TD.materialDescription}` | Material description (auto-populated from Material Master) — verified by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Master Recipes" | — | Search results appear listing the "Manage Master Recipes" application |
| 8 | Click "Manage Master Recipes" from the search results | — | "Manage Master Recipes" application opens displaying the recipe list view |
| 9 | Click the "Create" button in the application toolbar | — | New recipe creation form opens in edit mode with header section visible |
| 10 | In the "Material:*" header field, enter the Material ID | `{TD.material}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material via Material Master (MM module) integration; field is accepted |
| 12 | Verify that Material Description field is auto-populated | `{TD.materialDescription}` | Material Description is auto-populated from Material Master (MM module); description matches the expected value from the MM master record |
| 13 | In the "Plant:*" header field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 14 | Press Enter to confirm the Plant entry | — | Plant value is accepted |
| 15 | In the "Recipe Description:*" header field, enter the recipe description text | `{TD.recipeDescription}` | Recipe description is entered |
| 16 | In the "Recipe Type:*" header field, enter the recipe type code | `{TD.recipeType}` | Recipe type code is entered |
| 17 | Press Enter to confirm the Recipe Type entry | — | Recipe type value is accepted; recipe type description may be displayed |
| 18 | In the "Base Quantity:*" header field, enter the base quantity | `{TD.baseQuantity}` | Base quantity is entered; unit of measure `{TD.uom}` is displayed (auto-populated from Material Master) |
| 19 | In the "Effective Date:*" header field, enter the effective date | `{TD.effectiveDate}` | Effective date is entered in the field (format: YYYY-MM-DD or system date format) |
| 20 | Click the "Save" button in the toolbar | — | SAP begins processing the recipe save operation |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Recipe ID |
| 22 | Note the Recipe ID from the success message or the top-left header area | — | Recipe ID is displayed (format is system-generated) |
| 23 | Verify the recipe status in the header | — | Recipe status shows "Draft" (initial status for newly created recipes) |
| 24 | Verify that Material Description is correctly stored in the saved recipe | `{TD.materialDescription}` | Material Description field displays the correct value retrieved from Material Master (MM module) |
| 25 | Navigate back to the "Manage Master Recipes" application list | — | Recipe list is displayed |
| 26 | Search for the newly created recipe using the Recipe ID noted in step 22 | — | The created recipe appears in the list with the expected Material, Plant, and Recipe Description |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Recipe ID is generated by SAP and displayed in the confirmation message
- The recipe is persisted in SAP with status "Draft"
- All header data (Material, Material Description, Plant, Recipe Description, Recipe Type, Base Quantity, Unit of Measure, Effective Date) is correctly stored
- **Material Description field is auto-populated from Material Master (MM module)** — Material Master integration is successful
- The Material Description value matches the description stored in the Material Master record for Material `{TD.material}`
- The created recipe appears in the "Manage Master Recipes" list and can be viewed

---

### Post-conditions

- SAP Master Recipe document exists with the generated Recipe ID
- Recipe status is "Draft"
- Material, Plant, Recipe Description, Recipe Type, Base Quantity, and Effective Date are correctly recorded
- Material Description is correctly retrieved from Material Master (MM module) and stored in the recipe
- Material Master (MM module) integration is validated — data retrieval is successful
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
