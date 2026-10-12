# TC-CS-060: Verify Delivery Document Created and Linked to Free Goods Sales Order

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** INTEGRATION  
**Priority:** HIGH  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist
- Order type ZFOC is configured with automatic delivery creation OR manual delivery creation is enabled
- User has authorization to view delivery documents

### Test Data
**Dataset ID:** `TD-CS-039-INT-002`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.quantity}` (Valid)

### Test Steps
1-12. Standard login, navigate, enter customer  
13-19. Create Free Goods sales order with valid data  
20. Click "Save"  
21. **Expected:** Sales order created successfully  
22. Note sales order number  
23. Navigate to "Manage Outbound Deliveries" application  
24. Filter by sales order number or customer  
25. Click "Go"  
26. **Expected:** Delivery document is created (automatically or manually) and appears in the list  
27. Click delivery document number  
28. Verify delivery document is linked to the sales order; material, quantity, and customer match  
29. Sign out  

### Expected Final Result
- Free Goods sales order is created
- Delivery document is created and linked to the sales order
- Delivery document contains correct material, quantity, and customer data

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
