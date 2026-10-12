# TC-CS-047: Attempt to Create Free Goods Order with Past Delivery Date

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order | Valid |
| Past Delivery Date | `{TD.pastDeliveryDate}` | Delivery date in the past | Invalid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | SAP IDP login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen displayed |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Fiori Launchpad displayed |
| 6 | Close Introduction pop-up if present | — | Pop-up dismissed |
| 7 | Search for "Manage Sales Orders" | — | Search results appear |
| 8 | Click "Manage Sales Orders" | — | Application opens |
| 9 | Click "Create" | — | Sales order form opens |
| 10 | Select Free Goods order type | `{TD.orderType}` | ZFOC selected |
| 11 | Enter Customer ID | `{TD.customerId}` | Customer ID entered |
| 12 | Press Enter | — | Customer name auto-populated |
| 13 | Click "Create" in Items section | — | Line item row appears |
| 14 | Enter Material ID | `{TD.materialId}` | Material ID entered |
| 15 | Press Enter | — | Material description auto-populated |
| 16 | Enter quantity | `{TD.quantity}` | Quantity entered |
| 17 | Press Enter | — | Quantity confirmed |
| 18 | Enter past delivery date | `{TD.pastDeliveryDate}` | Past date entered |
| 19 | Press Enter or tab out | — | SAP displays warning or error: "Delivery date cannot be in the past" |
| 20 | Click "Save" | — | System blocks submission with error message indicating invalid delivery date |
| 21 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP detects past delivery date and displays validation error
- Sales order is NOT created
- User is informed delivery date must be current or future date

---

### Post-conditions

- No sales order created
- System state unchanged

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
