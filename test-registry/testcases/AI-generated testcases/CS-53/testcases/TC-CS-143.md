# TC-CS-143: Verify MM-QM integration — batch release decision enables Unrestricted-Use stock transfer

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management / Materials Management (PP-QM-MM)
**Feature:**             Batch Release Decision and Stock Transfer Enablement (MM-QM Integration)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records; user also has Warehouse Clerk role for stock transfer execution |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberMMQM}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberMMQM}` exists, is linked to Process Order `{TD.processOrderNumberMMQM}`, and is currently in Restricted-Use stock |
| P5 | In-Process Controls | All mandatory in-process control results for batch `{TD.batchNumberMMQM}` are complete and within specification limits |
| P6 | Integration | SAP QM-MM integration is configured; batch release decision in QM module controls stock type in MM module |
| P7 | Stock Status Before Approval | Batch `{TD.batchNumberMMQM}` is in Restricted-Use stock; not yet released for Unrestricted-Use |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberMMQM}` | Process order number in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumberMMQM}` | Batch number in Restricted-Use stock — entered by the user | Valid |
| Material Number | `{TD.materialNumberMMQM}` | Material number for the batch — entered by the user | Valid |
| Plant | `{TD.plantMMQM}` | Plant code for the batch — entered by the user | Valid |
| Storage Location | `{TD.storageLocationMMQM}` | Storage location code — entered by the user | Valid |
| Quantity to Transfer | `{TD.quantityToTransferMMQM}` | Quantity to transfer to Unrestricted-Use — entered by the user | Valid |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear listing the "Review Batch Records" application |
| 8 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection screen |
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberMMQM}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberMMQM}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that all batch record sections are complete (Component Consumption, In-Process Control Results, Deviations, Operation Confirmations) | — | All sections display complete data; no validation errors are present |
| 14 | Click the "Approve" button in the batch record toolbar | — | Electronic signature dialog appears prompting for password authentication |
| 15 | In the "Password" field of the signature dialog, enter the signature password | `{TD.signaturePassword}` | Password is entered (masked) |
| 16 | Click the "Confirm" button in the signature dialog | — | SAP processes the electronic signature; batch record approval begins; QM module updates batch release decision |
| 17 | Observe the on-screen confirmation response | — | Success message is displayed: "Batch record approved successfully" |
| 18 | Verify that the batch record status changes to "APPROVED" | — | Batch record status field displays "APPROVED"; QM module marks batch as released |
| 19 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 20 | Click the search icon and type "Transfer Posting" or "Stock Transfer" | — | Search results appear listing the stock transfer application |
| 21 | Click the stock transfer application from the search results | — | Stock transfer application opens displaying the transfer entry screen |
| 22 | In the "Material" field, enter the Material Number | `{TD.materialNumberMMQM}` | Material Number is entered into the field |
| 23 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 24 | In the "Plant" field, enter the Plant code | `{TD.plantMMQM}` | Plant code is entered into the field |
| 25 | Press Enter to confirm the Plant entry | — | SAP validates the plant |
| 26 | In the "Storage Location" field, enter the Storage Location code | `{TD.storageLocationMMQM}` | Storage Location code is entered into the field |
| 27 | Press Enter to confirm the Storage Location entry | — | SAP validates the storage location |
| 28 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberMMQM}` | Batch Number is entered into the field |
| 29 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch release decision from QM module is checked; system confirms batch is approved for release |
| 30 | In the "Quantity" field, enter the quantity to transfer | `{TD.quantityToTransferMMQM}` | Quantity is entered into the field |
| 31 | In the "Stock Type" or "Movement Type" field, select or enter the movement type for transfer to Unrestricted-Use stock | — | Movement type for Unrestricted-Use transfer (e.g., movement type 321 or similar) is selected or entered |
| 32 | Click the "Post" or "Save" button to submit the stock transfer | — | System validation is triggered; MM module checks batch release decision from QM module |
| 33 | Observe the on-screen confirmation response | — | Success message is displayed: "Stock transfer posted successfully" or "Goods movement document [number] created" |
| 34 | Verify that a goods movement document number is generated | — | A unique goods movement document number is displayed in the success message |
| 35 | Verify that the batch stock type has changed from Restricted-Use to Unrestricted-Use | `{TD.batchNumberMMQM}` | Batch `{TD.batchNumberMMQM}` is now in Unrestricted-Use stock; stock type transition is complete |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch record approval in QM module successfully triggers batch release decision update
- MM-QM integration is functioning correctly; batch release decision in QM module controls stock transfer eligibility in MM module
- After batch record approval, stock transfer from Restricted-Use to Unrestricted-Use is allowed and successfully executed
- Goods movement document is created in MM module
- Batch `{TD.batchNumberMMQM}` stock type changes from Restricted-Use to Unrestricted-Use
- System enforces GMP business rule that batches cannot be released for distribution until batch record is approved
- Integration between QM (batch release decision) and MM (stock type control) is seamless and error-free

---

### Post-conditions

- Batch record exists with status "APPROVED"
- Batch `{TD.batchNumberMMQM}` is now in Unrestricted-Use stock; available for distribution
- Goods movement document is created and posted in MM module (MSEG table)
- Batch release decision in QM module (QALS table) is updated to "Released"
- Electronic signature audit trail entry is created in SAP Change Documents (CDHDR/CDPOS)
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
