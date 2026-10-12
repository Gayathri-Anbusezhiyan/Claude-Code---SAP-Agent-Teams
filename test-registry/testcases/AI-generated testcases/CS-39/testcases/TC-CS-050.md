# TC-CS-050: Attempt to Submit Free Goods Order with Material Field Empty

**User Story:** [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider  
**Module:** Sales & Distribution (SD)  
**Scenario Type:** ERROR  
**Priority:** HIGH  
**Automation Candidate:** YES  

---

### Pre-conditions
- Customer `{TD.customerId}` exists and is active

### Test Data
**Dataset ID:** `TD-CS-039-ERR-002`
- Customer ID: `{TD.customerId}` (Valid)
- Material ID: `{TD.emptyValue}` (Invalid - empty)
- Quantity: `{TD.quantity}` (Valid)

### Test Steps
1-12. Standard login and enter customer  
13. Click "Create" in Items  
14. Leave Material field EMPTY  
15. Enter quantity  
16. Click "Save"  
17. **Expected:** SAP highlights Material field as mandatory; error displayed; submission blocked  
18. Sign out  

### Expected Final Result
- Material field highlighted as mandatory
- Sales order NOT created

### Execution Status
- [ ] Pass  
- [ ] Fail  

---
