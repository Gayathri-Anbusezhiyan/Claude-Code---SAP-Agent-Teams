# TC-CS-051: Attempt to Submit Free Goods Order with Order Quantity Field Empty

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** ERROR  
**Priority:** HIGH  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` and Material `{TD.materialId}` exist

### Test Data
**Dataset ID:** `TD-CS-039-ERR-003`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.materialId}` (Valid)
- Order Quantity: `{TD.emptyValue}` (Invalid - empty)

### Test Steps
1-12. Standard login, navigate, enter customer  
13. Click "Create" in Items  
14. Enter Material ID  
15. Press Enter  
16. Leave Order Quantity field EMPTY  
17. Click "Save"  
18. **Expected:** SAP highlights Order Quantity field as mandatory; error displayed; submission blocked  
19. Sign out  

### Expected Final Result
- Order Quantity field highlighted as mandatory
- Sales order NOT created

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
