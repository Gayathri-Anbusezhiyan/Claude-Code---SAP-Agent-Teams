# TC-CS-050: Create Sales Order with Export License Expiring During Processing

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Export Compliance Officer with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and passes denied-party screening |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and flagged as controlled product |
| P5 | Master Data | Export license `{TD.expiringLicenseNumber}` exists and is valid at SO creation time BUT will expire DURING the time between SO creation and confirmation (temporal boundary test) |
| P6 | Configuration | Export license management system or SAP GTS is configured and accessible |
| P7 | Test Data | Export license validity date `{TD.expiringLicenseValidTo}` is set to expire within minutes/hours of test execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party — entered by user | Valid |
| Material ID | `{TD.materialId}` | Controlled product — entered by user | Valid |
| Destination Country | `{TD.destinationCountry}` | Cross-border destination | Valid |
| Order Quantity | `{TD.orderQuantity}` | Order quantity | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales org | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Dist channel | Valid |
| Division | `{TD.division}` | Division | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Future date | Valid |
| Expiring License Number | `{TD.expiringLicenseNumber}` | License about to expire | Boundary |
| Expiring License Valid To | `{TD.expiringLicenseValidTo}` | Expiration timestamp (near-future) | Boundary |

---

### Test Steps

_(Standard SO creation steps 1-27 as per HP test case)_

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 28 | Create Sales Order with all valid data while export license is still valid | All fields populated | SO is saved in draft mode; license check passes |
| 29 | Wait for the export license to expire (or manually advance system time if test environment allows) | — | License expiration time passes |
| 30 | Attempt to click "Order" button to confirm the Sales Order | — | SAP performs real-time license validity check at confirmation point |
| 31 | Observe compliance screening result | — | System detects license has expired since draft creation; compliance check fails with "Export license expired" error |
| 32 | Verify SO confirmation is blocked | — | Sales Order is NOT confirmed; error message displays: "Export license `{TD.expiringLicenseNumber}` expired on `{TD.expiringLicenseValidTo}`. Cannot confirm Sales Order." |
| 33-35 | Sign out | — | User signed out |

---

### Expected Final Result

- Sales Order draft may be created but is NOT confirmed
- Real-time license validity check at confirmation detects expiration and blocks SO
- Error message clearly states license expired during processing
- Compliance audit log records the temporal boundary failure

---

### Post-conditions

- Sales Order remains in draft or is not confirmed
- Compliance audit log entry records license expiration during processing

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
