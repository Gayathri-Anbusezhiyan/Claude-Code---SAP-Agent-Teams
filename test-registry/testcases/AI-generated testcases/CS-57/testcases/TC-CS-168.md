# TC-CS-168: Edit Released recipe and verify automatic version creation

**User Story:**          [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Manufacturing (PP)
**Feature:**             Master Recipe Creation and Versioning
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
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to maintain Master Recipes |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | A Master Recipe `{TD.existingRecipeId}` exists in SAP with status "Released" and version 1 |
| P4 | Master Data | Material `{TD.materialNumber}` exists, is active, and configured for plant `{TD.plant}` |
| P5 | Configuration | Recipe versioning is enabled and configured in the system |

---

### Test Data

**Dataset Reference:** `testdata/CS-57/CS-57-testdata.json` — Dataset ID: `TD-CS-57-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Existing Recipe ID | `{TD.existingRecipeId}` | Recipe ID of an existing Released recipe | Valid |
| Material Number | `{TD.materialNumber}` | Material number from existing recipe | Valid |
| Plant | `{TD.plant}` | Plant code from existing recipe | Valid |
| Modified Base Quantity | `{TD.modifiedBaseQuantity}` | Updated base quantity value — different from original | Valid |
| Modified Standard Duration | `{TD.modifiedStandardDuration}` | Updated operation standard time — different from original | Valid |

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
| 8 | Click the "Manage Master Recipes" application from the search results | — | Manage Master Recipes application opens displaying the recipe list |
| 9 | Search for the existing Recipe ID using the search/filter function | `{TD.existingRecipeId}` | The existing recipe appears in the list with status "Released" and version 1 |
| 10 | Click on the Recipe ID to open the recipe detail view | — | Recipe detail view opens displaying the Released recipe |
| 11 | Verify that the Recipe Status displays "Released" | — | Recipe Status shows "Released" |
| 12 | Verify that the Recipe Version displays "1" | — | Recipe Version shows "1" |
| 13 | Click the "Edit" button in the toolbar | — | SAP automatically creates a new draft version; recipe opens in edit mode |
| 14 | Verify that a message is displayed indicating a new version was created | — | System message confirms: "New version created" or similar notification |
| 15 | Verify that the Recipe Version now displays "2" | — | Recipe Version shows "2" (new version number) |
| 16 | Verify that the Recipe Status displays "Draft" | — | Recipe Status shows "Draft" (new version starts as draft) |
| 17 | In the "Base Quantity" field, modify the value | `{TD.modifiedBaseQuantity}` | Modified Base Quantity is entered (different from version 1) |
| 18 | Navigate to the Operations section and modify the Standard Duration field | `{TD.modifiedStandardDuration}` | Modified Standard Duration is entered (different from version 1) |
| 19 | Click the "Save" button in the toolbar | — | SAP saves the modified recipe version; confirmation message is displayed |
| 20 | Click the "Back" button or navigate back to the recipe list | — | Recipe list is displayed |
| 21 | Search for the Recipe ID again using the search/filter function | `{TD.existingRecipeId}` | Multiple versions of the recipe are now displayed in the list |
| 22 | Verify that version 1 still exists with status "Released" | — | Version 1 is listed with status "Released" and original data preserved |
| 23 | Verify that version 2 exists with status "Draft" | — | Version 2 is listed with status "Draft" |
| 24 | Click on version 1 to open it | — | Version 1 opens displaying the original data |
| 25 | Verify that the Base Quantity in version 1 is the original value (not the modified value) | — | Base Quantity shows the original value from version 1 |
| 26 | Verify that the Recipe Status remains "Released" for version 1 | — | Recipe Status shows "Released" |
| 27 | Navigate back to the recipe list | — | Recipe list is displayed |
| 28 | Click on version 2 to open it | — | Version 2 opens displaying the modified data |
| 29 | Verify that the Base Quantity in version 2 is the modified value | `{TD.modifiedBaseQuantity}` | Base Quantity shows the modified value |
| 30 | Verify that the Standard Duration in version 2 is the modified value | `{TD.modifiedStandardDuration}` | Standard Duration shows the modified value |
| 31 | Verify that the "Changed By" field displays the current user | `{ENV.SAP_USERNAME}` | Changed By field shows the current user ID |
| 32 | Verify that the "Changed On" field displays the current date/time | — | Changed On field shows today's date and recent timestamp |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The original Released recipe (version 1) remains unchanged with status "Released"
- All original data (Base Quantity, Standard Duration, etc.) is preserved in version 1
- A new recipe version (version 2) is automatically created when Edit is clicked on the Released recipe
- Version 2 starts with status "Draft"
- Version 2 contains the modified data (Modified Base Quantity, Modified Standard Duration)
- Both versions are visible in the recipe list when searching by Recipe ID
- The audit trail for version 2 records:
  - Changed By = current user ID
  - Changed On = modification timestamp
- Versioning behavior complies with AC-3: any change to a released recipe automatically creates a new version

---

### Post-conditions

- SAP Master Recipe version 1 exists with status "Released" and original data
- SAP Master Recipe version 2 exists with status "Draft" and modified data
- Prior version (version 1) is preserved for audit history per AC-3
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
