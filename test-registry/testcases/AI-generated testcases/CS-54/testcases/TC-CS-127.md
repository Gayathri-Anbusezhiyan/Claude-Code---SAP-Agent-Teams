# TC-CS-127: Convert Planned Order to Purchase Requisition for External Procurement

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             Planned Order Conversion to Purchase Requisition
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to convert planned orders to purchase requisitions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured with procurement type "E" (External procurement) in material master |
| P4 | Master Data | Material `{TD.materialNumber}` has purchasing data maintained (purchasing group, purchasing organization) |
| P5 | Master Data | Plant `{TD.plant}` is active and configured for purchase requisition processing |
| P6 | Transactional Data | A planned order `{TD.plannedOrderNumber}` exists for material `{TD.materialNumber}` at plant `{TD.plant}` with status "Open" (not yet converted) |
| P7 | Configuration | Purchase requisition creation authorization is assigned to the user role |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Planned Order Number | `{TD.plannedOrderNumber}` | Existing planned order number to be converted — entered or selected by the user | Valid |
| Material Number | `{TD.materialNumber}` | Material number configured for external procurement — verified in planned order details | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in planned order details | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — verified in planned order details | Valid |
| Planned Order Quantity | `{TD.plannedOrderQuantity}` | Quantity in the planned order — verified before conversion | Valid |
| Purchase Requisition Number | `{TD.purchaseReqNumber}` | System-generated purchase requisition number after conversion — verified in confirmation message | Auto-populated |
| Procurement Type | `{TD.procurementType}` | Procurement type (E = External) — verified in material master | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the "Stock/Requirements List" application |
| 8 | Click the "Stock/Requirements List" application name from the search results | — | Stock/Requirements List application opens with search criteria fields displayed |
| 9 | In the "Planned Order" search or filter field, enter the planned order number | `{TD.plannedOrderNumber}` | Planned order number value is entered into the field |
| 10 | Press Enter to confirm the Planned Order entry | — | SAP validates and searches for the planned order |
| 11 | Click the "Go" or "Execute" button to display the planned order | — | Planned order details are displayed in the Stock/Requirements List |
| 12 | Verify that the planned order is displayed with the correct material | `{TD.materialNumber}`, `{TD.materialDesc}` | Planned order row shows material number and description |
| 13 | Verify that the material procurement type is "E" (External procurement) | `{TD.procurementType}` | Material is configured for external procurement |
| 14 | Verify that the planned order quantity is displayed | `{TD.plannedOrderQuantity}` | Planned order quantity is visible in the results |
| 15 | Select the planned order row by clicking the checkbox or row | — | Planned order row is selected (highlighted) |
| 16 | Click the "Convert to Purchase Requisition" button or menu option | — | Conversion dialog or confirmation prompt appears |
| 17 | In the conversion dialog, review the planned order details | `{TD.materialNumber}`, `{TD.plant}`, `{TD.plannedOrderQuantity}` | Material, plant, and quantity are pre-filled and correct |
| 18 | Click the "Convert" or "OK" button to confirm the conversion | — | SAP begins processing the conversion of planned order to purchase requisition |
| 19 | Wait for conversion processing to complete | — | Conversion completes; a confirmation message is displayed |
| 20 | Verify that a success message is displayed containing the generated purchase requisition number | `{TD.purchaseReqNumber}` | Success message displays the newly created purchase requisition number |
| 21 | Note the purchase requisition number from the confirmation message | — | Purchase requisition number is displayed (10-digit SAP-generated number) |
| 22 | Verify that the planned order status changes to "Converted" or is no longer displayed as open | — | Planned order is marked as converted or removed from the open planned orders list |
| 23 | Navigate to the "Manage Purchase Requisitions" application | — | Purchase Requisition application opens |
| 24 | Search for the newly created purchase requisition using the number noted in step 21 | `{TD.purchaseReqNumber}` | The created purchase requisition appears in the purchase requisition list |
| 25 | Click the purchase requisition number to open the purchase requisition details | — | Purchase requisition details screen is displayed |
| 26 | Verify that the purchase requisition material matches the original planned order material | `{TD.materialNumber}` | Purchase requisition material is correct |
| 27 | Verify that the purchase requisition quantity matches the planned order quantity | `{TD.plannedOrderQuantity}` | Purchase requisition quantity is correct |
| 28 | Verify that the purchase requisition plant matches the planned order plant | `{TD.plant}` | Purchase requisition plant is correct |
| 29 | Verify that the purchase requisition status is "Open" or "Not Processed" | — | Purchase requisition status indicates it is ready for procurement processing |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Planned order `{TD.plannedOrderNumber}` is successfully converted to a purchase requisition
- A unique purchase requisition number is generated by SAP and displayed in the confirmation message
- The purchase requisition is persisted in SAP with the same material, quantity, and plant as the original planned order
- The planned order status changes to "Converted" and is no longer available for further conversion
- The created purchase requisition appears in the "Manage Purchase Requisitions" list and is ready for procurement processing

---

### Post-conditions

- SAP Purchase Requisition document exists with the generated purchase requisition number
- Purchase requisition status is "Open" or "Not Processed"
- Purchase requisition is linked to material `{TD.materialNumber}`, plant `{TD.plant}`, and reflects the original planned order quantity
- Planned order `{TD.plannedOrderNumber}` is marked as converted and is no longer an open planned order
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
