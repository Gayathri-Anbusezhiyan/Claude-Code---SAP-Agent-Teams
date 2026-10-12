# TC-CS-023: Attempt to Select Non-Qualified Carrier for Cold-Chain Material

**User Story:**          [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T
**Epic:**                N/A — no epic assigned
**Module:**              Logistics Execution / Sales & Distribution (LE/SD)
**Feature:**             Cold-Chain Outbound Delivery Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries for temperature-sensitive materials |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and ready for delivery creation |
| P4 | Master Data | Material `{TD.materialId}` exists, is flagged as temperature-sensitive in the material master, and has storage condition classification `{TD.storageConditionClassification}` (e.g., 2–8°C) |
| P5 | Master Data | Non-qualified carrier `{TD.nonQualifiedCarrierId}` exists in the carrier master but does NOT have cold-chain qualification flag set |
| P6 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Temperature-sensitive biologics material number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Non-Qualified Carrier ID | `{TD.nonQualifiedCarrierId}` | Carrier without cold-chain qualification — selected by the user | Invalid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Deliveries" | — | Search results appear listing the "Create Outbound Deliveries" application |
| 8 | Click the "Create Outbound Deliveries" application from the search results | — | Application opens with outbound delivery creation form |
| 9 | In the "Sales Order" field, enter the Sales Order Number | `{TD.salesOrderNumber}` | Sales Order Number is entered into the field |
| 10 | Press Enter to confirm the Sales Order entry | — | SAP validates the sales order; order details are retrieved and displayed |
| 11 | In the "Material" field of the delivery item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated; storage condition classification is displayed; shipping condition is auto-proposed for cold-chain |
| 13 | In the "Quantity" field, enter the delivery quantity | `{TD.quantity}` | Quantity is populated in the delivery item |
| 14 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 15 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 16 | In the "Carrier" field, enter the non-qualified carrier ID | `{TD.nonQualifiedCarrierId}` | Non-qualified carrier ID is entered into the field |
| 17 | Press Enter to confirm the Carrier entry | — | SAP attempts to validate the carrier selection |
| 18 | Observe the validation response | — | SAP displays an error message indicating that the selected carrier is not qualified for cold-chain transport; error message states that carrier does not meet cold-chain requirements for temperature-sensitive materials |
| 19 | Verify that the Carrier field is highlighted or flagged | — | Carrier field is highlighted as invalid or error icon is displayed next to the field |
| 20 | Attempt to click the "Save" button in the toolbar | — | Save action is blocked or validation error is re-displayed; delivery cannot be saved with non-qualified carrier |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates carrier qualification against material cold-chain requirements
- System displays an error message indicating that the selected carrier is not qualified for cold-chain transport
- Error message references the carrier qualification requirement and the material's temperature-sensitive classification
- Carrier field is highlighted or flagged as invalid
- Outbound delivery is NOT created; save action is blocked until a qualified cold-chain carrier is selected
- System enforces cold-chain carrier qualification as a mandatory validation rule

---

### Post-conditions

- No outbound delivery document is created
- Carrier validation error is logged in the SAP message log
- User is required to select a qualified cold-chain carrier to proceed
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
