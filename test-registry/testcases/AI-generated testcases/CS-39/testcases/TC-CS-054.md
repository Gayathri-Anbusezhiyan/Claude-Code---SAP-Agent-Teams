# TC-CS-054: Create Free Goods Order with Maximum Order Quantity (Regulatory Limit)

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** MEDIUM  
**Automation Candidate:** PARTIAL  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist
- Regulatory maximum quantity limit is configured (e.g., 100 units)

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-002`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.maxQuantity}` = regulatory limit (Valid - upper boundary)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter material and maximum quantity (regulatory limit)  
18. Press Enter  
19. Click "Save"  
20. **Expected:** Sales order created successfully with maximum quantity  
21. Verify order appears in list  
22. Sign out  

### Expected Final Result
- Free Goods sales order created successfully with maximum regulatory quantity
- Net value is 0.00

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
