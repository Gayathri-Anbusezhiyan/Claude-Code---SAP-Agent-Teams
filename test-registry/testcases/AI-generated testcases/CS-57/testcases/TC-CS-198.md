# TC-CS-198: INT-05: Validate Change Document integration

**User Story:**          [CS-57] Create a Recipe (Master Recipe) With Operations and In-Process Controls
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Master Recipe Creation
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION_TEST
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create and edit master recipes (C_RECIPE_MNT) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | A Released recipe exists in the system with Recipe ID `{TD.releasedRecipeId}` (status = "Released") |
| P4 | Configuration | Change Document System is configured and active for Recipe Management |
| P5 | Integration | Change Document System integration is active and accessible from Recipe Management |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-INT-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Released Recipe ID | `{TD.releasedRecipeId}` | Existing Recipe ID with status "Released" — searched by the user | Valid |
| Modified Recipe Description | `{TD.modifiedRecipeDescription}` | Updated recipe description text (original description + " - Modified") — entered by the user | Valid |

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
| 9 | In the recipe list search/filter field, enter the Released Recipe ID | `{TD.releasedRecipeId}` | Recipe ID is entered into the search field |
| 10 | Press Enter or click the "Go" button to search | — | Search results are displayed; the Released recipe appears in the list |
| 11 | Click the Released Recipe ID row to open the recipe | — | Recipe detail screen opens; recipe is displayed in view or edit mode |
| 12 | Verify the Recipe Status in the header | — | Recipe status shows "Released" |
| 13 | Click the "Edit" button in the toolbar to modify the recipe | — | Recipe enters edit mode; a new version is automatically created OR a draft version is created for the Released recipe |
| 14 | Verify that a new version is automatically created | — | Recipe version increments (e.g., from Version 1 to Version 2) OR a new draft version is created (depending on SAP versioning configuration); system message may confirm new version creation |
| 15 | Locate the "Recipe Description" field in the header and modify the text | `{TD.modifiedRecipeDescription}` | Recipe description is updated (e.g., original text with " - Modified" appended) |
| 16 | Click the "Save" button in the toolbar to save the modified recipe | — | SAP begins processing the recipe save operation; a success message is displayed |
| 17 | Verify that a Change Document Number is generated | — | A system message is displayed containing the Change Document Number (10-digit numeric format) OR Change Document Number is visible in the recipe header or audit log section |
| 18 | Navigate to the audit log / change history section (if available in UI) | — | Audit log or change history section is displayed (may be accessible via a tab or button such as "Change Documents" or "History") |
| 19 | Verify that the Change Document Number is recorded in the audit log | — | Change Document Number is displayed in the audit log with format (10-digit numeric, e.g., 0000012345); change details (field changed, old value, new value) are recorded |
| 20 | Verify that "Changed By" field shows the current user | `{ENV.SAP_USERNAME}` | "Changed By" field shows the username or user ID of the current user (`{ENV.SAP_USERNAME}`) |
| 21 | Navigate back to the "Manage Master Recipes" application list | — | Recipe list is displayed |
| 22 | Search for the modified recipe using the Recipe ID | `{TD.releasedRecipeId}` | The modified recipe appears in the list with updated version number OR updated modification date |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Released recipe is successfully edited
- A new version is automatically created when the Released recipe is edited (Recipe Version increments OR a new draft version is created)
- The modified recipe description is saved successfully
- **A Change Document Number is generated by the Change Document System** — Change Document System integration is validated
- The Change Document Number is displayed in a system message OR in the audit log / change history section
- The Change Document Number is recorded in the audit log with the following details:
  - Change Document Number (10-digit numeric format)
  - Field changed: "Recipe Description"
  - Old value: original description
  - New value: modified description
  - Changed By: `{ENV.SAP_USERNAME}`
  - Change date/time: current timestamp
- The modified recipe appears in the "Manage Master Recipes" list with updated version or modification date

---

### Post-conditions

- SAP Master Recipe document exists with the Recipe ID `{TD.releasedRecipeId}`
- Recipe version is incremented OR a new draft version is created
- Recipe Description is updated to the modified value
- Change Document Number is generated and recorded in the Change Document System
- Change history is accessible via audit log or change history section
- Change Document System integration is validated — change document generation is successful
- No application-level errors or critical warnings remain outstanding

---

### Automation Note

**Automation Candidate: PARTIAL**

This test case is flagged as **PARTIAL** automation due to dependency on **Change Document query** for full end-to-end validation.

**Automation Coverage:**
- Steps 1–17 (login, search, edit recipe, save, verify success message with Change Document Number) can be fully automated
- Step 18–20 (audit log / change history verification) requires additional exploration of the audit log / change history UI section OR integration with Change Document OData API for programmatic verification

**Full Automation Requirements:**
- Audit log / change history section UI selectors must be explored and documented
- OR OData API for Change Documents (e.g., `/sap/opu/odata/sap/CHANGEDOCUMENT_SRV/` or custom Recipe Change Document API) must be integrated for programmatic query of change document records

**Recommended Approach:**
- Automate Steps 1–17 (core change document generation validation via success message)
- Implement Steps 18–20 as manual verification steps OR extend automation with Change Document API integration in Phase 5
- Alternatively, if Change Document Number is displayed in success message, Steps 18–20 can be implemented as API validation calls (OData query for Change Document Number)

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
