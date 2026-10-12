# TC-CS-022: Attempt to Create Outbound Delivery for Material Without Storage Condition Classification

**User Story:**          [CS-35] Create An Outbound Delivery With A Cold-Chain Shipping Condition For T
**Epic:**                N/A — no epic assigned
**Module:**              Logistics Execution / Sales & Distribution (LE/SD)
**Feature:**             Cold-Chain Outbound Delivery Creation
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to create outbound deliveries |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists, is open, and ready for delivery creation |
| P4 | Master Data | Material `{TD.materialIdNoStorageCondition}` exists but does NOT have storage condition classification configured in the material master (storage condition field is blank or not set to temperature-sensitive) |
| P5 | Configuration | Storage location `{TD.storageLocation}` is configured and active for the delivery plant |

---

### Test Data

**Dataset Reference:** `testdata/CS-35/CS-35-testdata.json` — Dataset ID: `TD-CS-035-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Existing open sales order number — entered by the user | Valid |
| Material ID (No Storage Condition) | `{TD.materialIdNoStorageCondition}` | Material without storage condition classification — entered by the user | Invalid (for cold-chain purposes) |
| Quantity | `{TD.quantity}` | Delivery quantity — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |

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
| 11 | In the "Material" field of the delivery item, enter the Material ID without storage condition | `{TD.materialIdNoStorageCondition}` | Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated; storage condition classification field is blank or not displayed |
| 13 | Verify the "Shipping Condition" field | — | Shipping condition field is NOT auto-populated with cold-chain shipping condition; field remains blank or shows default non-cold-chain shipping condition |
| 14 | In the "Quantity" field, enter the delivery quantity | `{TD.quantity}` | Quantity is populated in the delivery item |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered and validated |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 17 | Observe the shipping condition determination | — | System does NOT auto-propose cold-chain shipping condition; user must manually select shipping condition if required, but cold-chain packaging and carrier requirements are NOT automatically enforced |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Material without storage condition classification does NOT trigger automatic cold-chain shipping condition proposal
- Shipping condition field remains blank or shows default non-cold-chain shipping condition
- System allows delivery creation but does NOT enforce cold-chain carrier or temperature monitoring requirements
- No error message is displayed (this is a negative scenario validating the absence of auto-population, not a system error)
- The behavior demonstrates that cold-chain shipping condition is dependent on material storage condition classification

---

### Post-conditions

- No outbound delivery is created (user stops process after observing missing cold-chain shipping condition)
- OR delivery is created without cold-chain shipping condition (if user proceeds without selecting cold-chain options)
- System behavior confirms that storage condition classification is the trigger for cold-chain shipping condition auto-proposal

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
