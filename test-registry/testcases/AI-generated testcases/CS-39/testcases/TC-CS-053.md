# TC-CS-053: Create Free Goods Order with Minimum Order Quantity (1 Unit)

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** MEDIUM  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-001`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.minQuantity}` = 1 (Valid - minimum boundary)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter material and minimum quantity (1 unit)  
18. Press Enter  
19. Click "Save"  
20. **Expected:** Sales order created successfully with minimum quantity  
21. Verify order appears in list  
22. Sign out  

### Expected Final Result
- Free Goods sales order created successfully with minimum quantity (1 unit)
- Net value is 0.00

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
