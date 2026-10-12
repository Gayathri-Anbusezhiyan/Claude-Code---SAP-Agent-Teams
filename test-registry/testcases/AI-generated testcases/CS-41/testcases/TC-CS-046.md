# TC-CS-046: Attempt to Create Cross-Border Sales Order with Expired Export License

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Export Compliance Officer with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, has a cross-border destination country, and passes denied-party screening |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and flagged as a controlled pharmaceutical product in the material master |
| P5 | Master Data | An export license exists for the customer/destination/material combination BUT the license has EXPIRED (validity date `{TD.expiredLicenseValidTo}` is in the past or before the requested delivery date) |
| P6 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |
| P7 | Configuration | Export license management system or SAP GTS is configured and accessible |
| P8 | Test Data | Verify export license record exists for customer `{TD.customerId}`, material `{TD.materialId}`, and destination `{TD.destinationCountry}` BUT validity date is expired before test execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number (passes denied-party check) — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number for controlled pharmaceutical product — entered by the user | Valid |
| Destination Country | `{TD.destinationCountry}` | ISO country code for cross-border destination — derived from customer master | Valid |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity to order — entered by the user | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type code — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution Channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Future delivery date — entered by the user | Valid |
| Expired License Valid To | `{TD.expiredLicenseValidTo}` | Export license expiration date (in the past or before delivery date) — system validates | Invalid |
| Expired License Number | `{TD.expiredLicenseNumber}` | Export license number that is expired — system retrieves | Invalid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing the "Create Sales Order" application |
| 8 | Click the "Create Sales Order" application name from the search results | — | Create Sales Order application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Order Type" header field, enter the Sales Order Type | `{TD.salesOrderType}` | Order Type value is entered |
| 11 | Press Enter to confirm the Order Type entry | — | SAP validates the order type |
| 12 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrganization}` | Sales Organization code is entered |
| 13 | Press Enter to confirm the Sales Organization entry | — | Sales Organization is validated |
| 14 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel code is entered |
| 15 | Press Enter to confirm the Distribution Channel entry | — | Distribution Channel is validated |
| 16 | In the "Division" field, enter the Division code | `{TD.division}` | Division code is entered |
| 17 | Press Enter to confirm the Division entry | — | Division is validated |
| 18 | In the "Sold-To Party" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered |
| 19 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name and destination country are auto-populated |
| 20 | In the "Items" section, click the "Create" button | — | A new empty line item row appears |
| 21 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 22 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 23 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated |
| 24 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 25 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Requested delivery date is populated |
| 26 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 27 | Click the "Check" or "Validate" button to trigger compliance screening | — | SAP initiates denied-party screening and export license validation |
| 28 | Observe the system processing the compliance checks | — | Denied-party screening passes; export license validation is initiated |
| 29 | Wait for the export license validation to complete | — | Export license validation completes with a FAILED result (license is expired) |
| 30 | Observe the error message or compliance check failure notification | — | SAP displays a clear error message: "Export license expired" or "Compliance check failed: Export license `{TD.expiredLicenseNumber}` expired on `{TD.expiredLicenseValidTo}`"; error message includes the license number, expiration date, and failure reason |
| 31 | Verify the Compliance Check Status field shows "FAILED" or "BLOCKED" | — | Compliance check status shows "FAILED_EXPORT_LICENSE" or "BLOCKED_EXPIRED_LICENSE" |
| 32 | Attempt to click the "Save" or "Order" button | — | SAP prevents submission; the "Order" button is disabled or triggers the same compliance error |
| 33 | Observe that the Sales Order is NOT created | — | No Sales Order number is generated; the form remains in draft/unsaved state with the compliance blocking error visible |
| 34 | Verify that the error message explicitly states the export license is expired and the Sales Order cannot be confirmed | — | Error message clearly communicates: "Sales Order cannot be confirmed. Export license `{TD.expiredLicenseNumber}` for destination `{TD.destinationCountry}` and material `{TD.materialId}` expired on `{TD.expiredLicenseValidTo}`. Please renew export license before proceeding." |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- NO Sales Order number is generated
- The Sales Order creation is BLOCKED by the expired export license validation failure
- SAP displays a clear, descriptive error message indicating the export license is expired with the expiration date
- The error message includes the license number, destination country, material ID, expiration date, and failure reason
- The compliance check status is "FAILED_EXPORT_LICENSE" or "BLOCKED_EXPIRED_LICENSE"
- The user is prevented from submitting or confirming the Sales Order
- Compliance audit log entry is created recording the expired license validation failure and blocking action

---

### Post-conditions

- NO SAP Sales Order document is created or persisted
- Compliance audit log entry records the expired export license validation failure, license number, expiration date, customer ID, material ID, destination country, timestamp, and blocking action
- No application-level errors or critical warnings remain outstanding beyond the expected compliance blocking error

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
