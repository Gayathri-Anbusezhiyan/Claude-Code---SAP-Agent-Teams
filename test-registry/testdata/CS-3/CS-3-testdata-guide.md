# Test Data Guide: [CS-3] View and Modify an Existing Purchase Order

**Generated:**    2026-05-12
**Module:**       MM — Materials Management
**Feature:**      Purchase Order Display and Modification
**Data File:**    testdata/CS-3/CS-3-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-3/CS-3-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system (see the table below)
4. Save the updated JSON — **do NOT commit real SAP values to version control**
5. The updated values are substituted into test steps at execution time

---

## Placeholder Reference

### Purchase Order Numbers

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PO_NUMBER_VALID_OPEN}}` | An existing Purchase Order in the test SAP system with status **Open** or **Sent**, at least one editable line item, and no full goods receipt posted against it. This PO is used by TC-CS-012 (display), TC-CS-013 (edit/save), TC-CS-015 (read-only check), TC-CS-016 (auth check), TC-CS-018 (min qty), TC-CS-019 (zero qty). | SAP Fiori: Open "Manage Purchase Orders" → filter by status "Open" → select any PO → note the 10-digit PO number (starts with 45). Example from CS-2 test run: `4500065467` |
| `{{PO_NUMBER_NON_EXISTENT}}` | A 10-digit numeric PO number in the correct format (starts with 45) that does **NOT** exist in SAP. Used by TC-CS-014. | Choose a PO number that follows the format but does not exist in your test system, e.g., `4500000001`. Verify by searching for it in "Manage Purchase Orders" — it should return no results. |
| `{{PO_NUMBER_WITH_GR_POSTING}}` | A PO in the test system where at least one line item has had a **Goods Receipt (GR) posted** against it — meaning the GR document exists and the quantity field on that line is locked for editing. Used by TC-CS-017. | SAP Fiori: Open "Manage Purchase Orders" → open a PO → check if line items show a "Goods Receipt" document referenced. Alternatively, use the "Manage Goods Receipts" app to find GR documents and trace back to the originating PO. Note: this data may need to be created by posting a GR in the test system first. |
| `{{PO_NUMBER_INVALID_FORMAT}}` | An alphanumeric string or number with fewer than 10 digits that is in an **invalid format** for a PO number. Used by TC-CS-020. | Use a value such as `"INVALID"`, `"ABC123"`, `"123"`, or `"99"` — any input that is not a 10-digit numeric string starting with 45. |

---

### Quantity Values

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PO_QUANTITY_MODIFIED}}` | A valid quantity greater than zero to set on a PO line item during the edit-mode modification test (TC-CS-013). Different from the current quantity on `{{PO_NUMBER_VALID_OPEN}}`. | Use a value like `15`, `20`, or `25` — any positive integer or decimal appropriate for the material's UoM. Confirm the value is different from the PO's current quantity so the change is observable. |
| `{{PO_QUANTITY_MIN}}` | The minimum valid order quantity accepted by SAP for the line item on `{{PO_NUMBER_VALID_OPEN}}`. Used by TC-CS-018 (boundary lower test). | Typically `1` for most unit-of-measure types (EA, PC, etc.). For weight-based UoMs (KG, G), `0.001` may be the minimum. Confirm from the material's purchasing info record or by testing directly. |

---

## Environment Variables (from .env — not in testdata.json)

These are **not** stored in the testdata JSON. They are read directly from the `.env` file at the project root.

| Variable | Usage in Tests | How to Set |
|----------|---------------|------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation Step 1 of every test case | Already set in `.env`: `https://my429998.s4hana.cloud.sap/ui?sap-language=en&...` |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login Step 2 | Already set in `.env` |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login Step 4 | Already set in `.env` |
| `SAP_USERNAME_DISPLAY_ONLY` | **Add to `.env`** — a SAP user with display-only PO access (no Change authorization). Required by TC-CS-016. | Create or identify a SAP user in the test system with role restricted to PO display. Add `SAP_USERNAME_DISPLAY_ONLY=<email>` to `.env`. |
| `SAP_PASSWORD_DISPLAY_ONLY` | **Add to `.env`** — password for the display-only user. Required by TC-CS-016. | Add `SAP_PASSWORD_DISPLAY_ONLY=<password>` to `.env`. |

---

## Test Data Setup Requirements

### Pre-conditions That Require SAP System Preparation

| Test Case | Requirement | Action Needed |
|-----------|-------------|---------------|
| TC-CS-012, TC-CS-013, TC-CS-015, TC-CS-018, TC-CS-019 | `{{PO_NUMBER_VALID_OPEN}}` must exist with status Open and at least one editable line item | Verify in SAP or use the PO created during CS-2 testing (e.g., `4500065467`). If closed, create a new test PO. |
| TC-CS-014 | `{{PO_NUMBER_NON_EXISTENT}}` must truly not exist | Verify by searching in "Manage Purchase Orders" — must return no results |
| TC-CS-016 | A display-only SAP user must exist | May require SAP Basis / admin to create or configure a user with restricted role |
| TC-CS-017 | `{{PO_NUMBER_WITH_GR_POSTING}}` must have a GR posted | Post a Goods Receipt against a test PO using the "Post Goods Receipt for Purchase Order" Fiori app before executing this test case |
| TC-CS-019 | Zero quantity rejection must be system-active | Standard SAP validation — no special setup needed |
| TC-CS-020 | Invalid format inputs must fail gracefully | No setup needed — standard SAP input validation |

---

## Notes

1. **Never commit real SAP IDs or passwords** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation must be done in a **dedicated SAP S/4HANA Cloud test system** — never use production credentials or documents
3. After a test system refresh from production, re-verify all `{{PO_NUMBER_*}}` values — PO numbers may change
4. The PO `4500065467` (created during CS-2 test execution on 2026-05-12) can be used for `{{PO_NUMBER_VALID_OPEN}}` if it still has an Open/editable status in the test system
5. TC-CS-017 (ERR-01 — PARTIAL automation candidate) requires manual setup of a GR-posted PO in advance; this cannot be fully automated without a separate GR creation step
