# TC-CS-056: Create Free Goods Order with Delivery Date = Today (Same-Day Delivery)

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** EDGE_CASE  
**Priority:** MEDIUM  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist

### Test Data
**Dataset ID:** `TD-CS-039-EDGE-004`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.quantity}` (Valid)
- Delivery Date: `{TD.todayDate}` = current date (Valid - lower boundary)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-17. Enter material and quantity  
18. Enter delivery date = today's date  
19. Press Enter  
20. Click "Save"  
21. **Expected:** Sales order created successfully with same-day delivery date  
22. Verify order appears in list  
23. Sign out  

### Expected Final Result
- Free Goods sales order created successfully with delivery date = today
- System accepts same-day delivery date

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
