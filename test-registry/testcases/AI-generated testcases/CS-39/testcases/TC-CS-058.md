# TC-CS-058: Attempt to Create Free Goods Order with Expired Batch

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** HIGH  
**Automation Candidate:** PARTIAL  

---

### Pre-conditions
- Customer `{TD.customerId}` and batch-managed Material `{TD.batchMaterialId}` exist
- Batch `{TD.expiredBatch}` has expiry date in the past (expired)

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-006`
- Customer ID: `{TD.customerId}` (Valid)
- Batch Material ID: `{TD.batchMaterialId}` (Valid)
- Order Quantity: `{TD.quantity}` (Valid)
- Batch Number: `{TD.expiredBatch}` (Invalid - expired)
- Batch Expiry: `{TD.expiredBatchDate}` = past date (Invalid)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter batch-managed material and quantity  
18. Enter expired batch number  
19. Press Enter  
20. **Expected:** SAP displays error "Batch has expired" or "Expiry date is in the past"; submission blocked  
21. Sign out  

### Expected Final Result
- SAP rejects expired batch with validation error
- Sales order NOT created

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
