# TC-CS-055: Attempt to Create Free Goods Order with Zero Order Quantity

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** HIGH  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-003`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.zeroQuantity}` = 0 (Invalid - zero boundary)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter material and zero quantity (0)  
18. Press Enter or Click "Save"  
19. **Expected:** SAP displays error "Order quantity must be greater than zero"; submission blocked  
20. Sign out  

### Expected Final Result
- SAP rejects zero quantity with validation error
- Sales order NOT created

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
