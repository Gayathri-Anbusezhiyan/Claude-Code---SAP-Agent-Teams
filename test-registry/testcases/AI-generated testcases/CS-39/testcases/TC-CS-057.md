# TC-CS-057: Create Free Goods Order with Batch Minimum Shelf Life Remaining

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** MEDIUM  
**Automation Candidate:** PARTIAL  

---

### Pre-conditions
- Customer `{TD.customerId}` and batch-managed Material `{TD.batchMaterialId}` exist
- Batch `{TD.minShelfLifeBatch}` has expiry date = today + 30 days (minimum shelf life)

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-005`
- Customer ID: `{TD.customerId}` (Valid)
- Batch Material ID: `{TD.batchMaterialId}` (Valid)
- Order Quantity: `{TD.quantity}` (Valid)
- Batch Number: `{TD.minShelfLifeBatch}` (Valid - minimum shelf life)
- Batch Expiry: `{TD.minShelfLifeExpiry}` = today + 30 days (Valid - lower boundary)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter batch-managed material and quantity  
18. Enter batch number with minimum shelf life  
19. Press Enter  
20. Verify expiry date is displayed (today + 30 days)  
21. Click "Save"  
22. **Expected:** Sales order created successfully; batch with minimum shelf life accepted  
23. Verify order appears in list  
24. Sign out  

### Expected Final Result
- Free Goods sales order created successfully with batch at minimum shelf life
- Batch expiry date is captured

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
