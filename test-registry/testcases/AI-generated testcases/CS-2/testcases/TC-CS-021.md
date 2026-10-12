# TC-CS-021: Verify System Displays Formal Success Confirmation with PO Number After Submission (DESIGNED TO FAIL)

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation — Success Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE / DEFECT_DETECTION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### ⚠️ DESIGN NOTE: This test case is **DESIGNED TO FAIL**

This test case is intentionally designed to fail because it validates an expected system behavior that **does not exist in the current SAP configuration**. The purpose is to:
1. Detect that SAP does NOT display a formal success confirmation dialog/popup with the PO number after submission
2. Trigger the **Defect Logging Agent** to classify this as an **APP_DEFECT** (missing feature or broken UX)
3. Generate a Jira Bug linked to this user story documenting the missing success notification

**Known Issue (AC-6 Defect):** SAP shows the PO number in the page heading only. There is **NO dedicated success notification or confirmation popup** — this is the defect that this test is designed to expose.

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.supplierId}` exists; Material `{TD.materialId}` exists; all required configuration is in place |
| P4 | **Defect Context** | **KNOWN DEFECT**: SAP does not display a formal success confirmation with PO number after submission; only shows PO in heading |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-DEFECT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Valid vendor account number | Valid |
| Material ID | `{TD.materialId}` | Valid material master number | Valid |
| Order Quantity | `{TD.quantity}` | Valid order quantity | Valid |
| Net Order Price | `{TD.price}` | Valid price | Valid |
| Plant | `{TD.plant}` | Valid plant code | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result (Per AC-6) | ⚠️ KNOWN ISSUE |
|------|--------|-----------|---------------------------|--------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed | — |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered | — |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen | — |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) | — |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page | — |
| 6 | If a Guided Tour / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible | — |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear | — |
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens | — |
| 9 | Click the "Create" button in the application toolbar | — | New Purchase Order creation form opens in edit mode | — |
| 10 | Enter Supplier ID | `{TD.supplierId}` | Supplier is auto-populated | — |
| 11 | Press Enter | — | Supplier is confirmed | — |
| 12 | Click the "Create" button in the Items section | — | New line item row appears | — |
| 13 | Enter Material ID | `{TD.materialId}` | Material is auto-populated | — |
| 14 | Press Enter | — | Material is confirmed | — |
| 15 | Enter Order Quantity | `{TD.quantity}` | Quantity is entered | — |
| 16 | Press Enter | — | Quantity is confirmed | — |
| 17 | Enter Net Order Price | `{TD.price}` | Price is entered | — |
| 18 | Press Enter | — | Price is confirmed | — |
| 19 | Verify Plant field | `{TD.plant}` | Plant is entered/confirmed | — |
| 20 | Click the "Order" button (footer submit) | — | **EXPECTED (Per AC-6):** A formal success confirmation dialog or popup appears displaying: **(a)** "Purchase Order successfully created"; **(b)** the new PO number (10-digit); **(c)** a "Close" or "OK" button to dismiss | ⚠️ **ACTUAL BEHAVIOR (DEFECT):** SAP does NOT display a formal success confirmation. Instead: **(a)** The page silently redirects to a success state showing only the PO number in the page heading (e.g., "Purchase Order 4500065467"); **(b)** NO popup or toast notification appears; **(c)** The user must manually verify success by reading the page heading or navigating to the list |
| 21 | Observe the success notification behavior | — | **EXPECTED:** A clear, user-friendly success confirmation dialog with prominent PO number display and action buttons | ⚠️ **ACTUAL:** Minimal UX feedback; success is indicated only in the page title/heading; no explicit confirmation dialog |
| 22 | Click "OK" or "Close" on the confirmation dialog (or note absence of dialog) | — | **EXPECTED:** Success confirmation is dismissed and page navigates to confirmation state | ⚠️ **ACTUAL:** No dialog to dismiss; page is already in success state |
| 23 | Verify the PO was created by checking the list | — | **EXPECTED (if success confirmation exists):** Navigate to list; verify PO number matches the one from the confirmation dialog | Already visible in heading |
| 24 | Navigate back to the Manage Purchase Orders application list | — | Purchase Orders list is displayed | — |
| 25 | Verify the newly created PO appears in the list | — | The created PO appears with status "Sent" or "Open" | — |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears | — |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears | — |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed | — |

---

### Expected Final Result (Per AC-6 Requirement)

**As defined in Acceptance Criteria AC-6:**
- A **formal success confirmation** is displayed to the user after clicking "Order"
- The confirmation clearly displays the **new Purchase Order number** (10-digit format)
- The confirmation includes user-friendly text: "Purchase Order {ID} has been successfully created"
- The user can close the confirmation dialog and proceed
- The UX provides clear, explicit feedback that the PO creation was successful

---

### Actual Result (KNOWN DEFECT — This is why the test fails)

**What actually happens in SAP:**
- NO formal success confirmation dialog appears
- The system silently transitions to a success state
- The PO number is visible ONLY in the page heading/title
- NO toast notification, popup, or explicit success message
- Minimal UX feedback — user must infer success from page state change
- Poor user experience compared to typical e-commerce/transactional systems

**Defect Classification:** `APP_DEFECT` — Missing feature/poor UX
**Impact:** Users cannot easily confirm that their PO was created successfully; PO creation appears to "silently" complete without explicit confirmation
**Severity:** MAJOR — Impacts user experience and confidence in the system

---

### Post-conditions

- A Purchase Order IS created in the system (the business transaction succeeds)
- The PO appears in the Manage Purchase Orders list
- The defect is UX-level only (missing success notification), not a transaction failure

---

### Execution Status

- [x] **DESIGNED TO FAIL** — Expected test failure (test should report FAIL)
- [ ] Pass — Would indicate SAP has been fixed to display success confirmation (UNLIKELY)

---

### Defects / Observations

**DEFECT ID:** CS-6 (Linked to Acceptance Criteria AC-6)

**Defect Description:** "No formal success confirmation displayed after Purchase Order submission"

**Reproduction Steps:**
1. Create a PO via Manage Purchase Orders app
2. Click Order button to submit
3. Observe: NO success dialog appears; PO number only visible in page heading

**Expected (AC-6):** Formal success confirmation dialog with PO number
**Actual:** Silent success; PO number in heading only

**Root Cause:** SAP Fiori app (likely) does not implement a post-submission confirmation dialog; relies on page state to indicate success

**Workaround:** Users must check the page heading or navigate to the list to confirm PO creation

---

### Automation Notes

**Why This Test is Designed to Fail:**

This test is included in the test suite specifically to demonstrate the **Self-Healing Agent** and **Defect Logging Agent** workflows:

1. **Automation Agent** runs this TC and it **FAILS** (because the expected confirmation dialog does not exist)
2. **Self-Healing Agent** analyzes the failure and determines: "The system works correctly (PO is created), but the success confirmation behavior is missing — this is an app defect, not an automation bug"
3. **Defect Logging Agent** receives the failure, classifies it as `APP_DEFECT`, and creates a Jira Bug linked to story CS-2 documenting the missing UX feature

**Test Purpose:** Validates the end-to-end defect detection pipeline from test failure → analysis → defect logging

**To Disable This Test (Optional):**
If you fix SAP to display a proper success confirmation, update this test's Expected Result and remove the `designedToFail` flag. The test will then verify the fix.

---
