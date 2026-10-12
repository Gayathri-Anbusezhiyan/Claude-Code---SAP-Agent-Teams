# TC-CS-052: Attempt to Submit Free Goods Order with Delivery Date Field Empty

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** ERROR  
**Priority:** HIGH  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist

### Test Data
**Dataset ID:** `TD-CS-039-ERR-004`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.quantity}` (Valid)
- Delivery Date: `{TD.emptyValue}` (Invalid - empty)

### Test Steps
1-12. Standard login, navigate, enter customer  
13. Click "Create" in Items  
14. Enter Material ID and quantity  
15. Leave Delivery Date field EMPTY (or clear auto-default)  
16. Click "Save"  
17. **Expected:** SAP highlights Delivery Date field as mandatory; error displayed; submission blocked  
18. Sign out  

### Expected Final Result
- Delivery Date field highlighted as mandatory
- Sales order NOT created

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
