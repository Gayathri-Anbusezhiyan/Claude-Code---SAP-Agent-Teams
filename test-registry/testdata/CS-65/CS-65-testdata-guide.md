# Test Data Guide: [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc

**Generated:**    2026-08-24
**Module:**       Production Planning and Manufacturing (PP)
**Feature:**      Bill of Material (BOM) Maintenance for Pharmaceutical Finished Product
**Data File:**    testdata/CS-65/CS-65-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-65/CS-65-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Finished Product Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{FINISHED_PRODUCT_MATERIAL_VALID}}` | An active finished product material number (FERT or HALB type) in the SAP test system | SAP Fiori: Manage Material → search for materials with material type FERT (Finished Product) or HALB (Semi-Finished Product); or T-code MM60/MARA. Must be configured for the test plant. |
| `{{FINISHED_PRODUCT_DESCRIPTION_VALID}}` | The description of the finished product material above (auto-populated) | Shown in material master data for the finished product material ID above |

### Plant and Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code configured for production planning and BOM maintenance | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 |
| `{{PLANT_DESCRIPTION}}` | Plant description (auto-populated) | Shown in plant configuration for the plant code above |
| `{{COMPANY_CODE}}` | Company code assigned to the plant | SAP configuration → Enterprise Structure; or T-code OX02. The company code is automatically determined from the plant. |
| `{{BOM_USAGE_PRODUCTION}}` | BOM usage type for production (typically "1" = Production) | SAP configuration → Production Planning → Bill of Material → BOM Usage. Use "Production" or usage code "1". |

### Component Material Data (Primary Components)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{COMPONENT_MATERIAL_PRIMARY_VALID}}` | An active component material number (ROH or HALB type) configured for the test plant | SAP Fiori: Manage Material → search for materials with material type ROH (Raw Material) or HALB (Semi-Finished); or T-code MM60/MARA |
| `{{COMPONENT_MATERIAL_ACTIVE_INGREDIENT_VALID}}` | An active pharmaceutical active ingredient component material number | SAP Fiori: Manage Material → search for pharmaceutical active ingredient materials; ensure material is approved for pharmaceutical use |
| `{{COMPONENT_MATERIAL_EXCIPIENT_VALID}}` | An active pharmaceutical excipient component material number | SAP Fiori: Manage Material → search for pharmaceutical excipient materials (e.g., binders, fillers, preservatives) |
| `{{COMPONENT_DESCRIPTION_PRIMARY}}` | Component material description (auto-populated) | Shown in material master data for the component material ID |
| `{{COMPONENT_DESCRIPTION_ACTIVE_INGREDIENT}}` | Active ingredient component description (auto-populated) | Shown in material master data for the active ingredient material ID |
| `{{COMPONENT_DESCRIPTION_EXCIPIENT}}` | Excipient component description (auto-populated) | Shown in material master data for the excipient material ID |
| `{{COMPONENT_MATERIAL_INVALID}}` | A component material number that does NOT exist in SAP | Use a non-existent material number like "ZZNOTEXIST999" — verify it returns "not found" in material search |
| `{{COMPONENT_MATERIAL_INACTIVE}}` | A component material number that exists but is marked as inactive or blocked for the plant | Use a material that exists but has deletion flag or plant status set to inactive/blocked |

### Alternative and Substitute Component Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{ALTERNATIVE_COMPONENT_MATERIAL_1_VALID}}` | First alternative/substitute component material number (active, approved) | SAP Fiori: Manage Material → search for alternative materials that can substitute the primary component |
| `{{ALTERNATIVE_COMPONENT_MATERIAL_2_VALID}}` | Second alternative/substitute component material number (active, approved) | SAP Fiori: Manage Material → search for additional alternative materials |
| `{{ALTERNATIVE_COMPONENT_DESCRIPTION_1}}` | First alternative component description (auto-populated) | Shown in material master data for the first alternative material ID |
| `{{ALTERNATIVE_COMPONENT_DESCRIPTION_2}}` | Second alternative component description (auto-populated) | Shown in material master data for the second alternative material ID |
| `{{SUBSTITUTE_COMPONENT_MATERIAL_UNAPPROVED}}` | A substitute material that exists but lacks regulatory approval status flag | Use a material that exists but does not have the required approval flag for pharmaceutical use |
| `{{ALTERNATIVE_BASE_UOM_1}}` | Base unit of measure for first alternative component (auto-populated) | Shown in material master data |
| `{{ALTERNATIVE_BASE_UOM_2}}` | Base unit of measure for second alternative component (auto-populated) | Shown in material master data |
| `{{ALTERNATIVE_QUANTITY_1}}` | Quantity of first alternative component per finished product unit | Use a realistic quantity that matches the primary component quantity or equivalent usage |
| `{{ALTERNATIVE_QUANTITY_2}}` | Quantity of second alternative component per finished product unit | Use a realistic quantity that matches the primary component quantity or equivalent usage |
| `{{ALTERNATIVE_UOM_1}}` | Unit of measure for first alternative component | Typically same as base UoM from material master (e.g., KG, G, L, ML) |
| `{{ALTERNATIVE_UOM_2}}` | Unit of measure for second alternative component | Typically same as base UoM from material master |
| `{{SUBSTITUTE_QUANTITY}}` | Quantity of substitute component | Use a realistic quantity matching primary component usage |
| `{{SUBSTITUTE_UOM}}` | Unit of measure for substitute component | Typically same as base UoM from material master |

### Component Quantities and UoM

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{COMPONENT_QUANTITY_STANDARD}}` | A standard, realistic component quantity | Use a typical quantity based on pharmaceutical formulation (e.g., 50 for grams, 0.5 for kilograms, 100 for milligrams) |
| `{{COMPONENT_QUANTITY_MIN}}` | Minimum valid component quantity (lower boundary) | Use the smallest precision allowed by SAP (e.g., 0.001 or 0.0001 depending on UoM and system configuration) |
| `{{COMPONENT_QUANTITY_MAX}}` | Maximum component quantity (upper boundary) | Use a very large value near system maximum (e.g., 999999999.999) |
| `{{COMPONENT_QUANTITY_MODIFIED}}` | Modified component quantity (for state transition tests) | Use a different value from the initial quantity (e.g., if initial is 50, use 75) |
| `{{COMPONENT_BASE_UOM_1}}` | Base unit of measure for first component (auto-populated) | Shown in material master data (e.g., KG, G, L, ML, EA, PC) |
| `{{COMPONENT_BASE_UOM_2}}` | Base unit of measure for second component (auto-populated) | Shown in material master data |
| `{{COMPONENT_UOM_1}}` | Unit of measure for first component | Typically same as base UoM from material master |
| `{{COMPONENT_UOM_2}}` | Unit of measure for second component | Typically same as base UoM from material master |

### Regulatory Approval Status

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{APPROVAL_STATUS_APPROVED}}` | Regulatory approval status indicating the component is approved for pharmaceutical use | Use "Approved" or the equivalent status code in your SAP system configuration (may be a custom field or standard classification) |

### BOM Numbers and Status

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BOM_NUMBER_DRAFT_STATUS}}` | A BOM number that exists in the system with status "Draft" | Create a BOM in "Manage Bills of Material" app, save it, but do not release it; note the BOM number |
| `{{BOM_NUMBER_IN_REVIEW_STATUS}}` | A BOM number that exists in the system with status "In Review" | Create a BOM, set status to "In Review" using workflow or status change function; note the BOM number (status may vary by SAP configuration) |
| `{{BOM_NUMBER_OBSOLETE_STATUS}}` | A BOM number that exists in the system with status "Obsolete" | Create a BOM, release it, then set status to "Obsolete" using status change function; note the BOM number |

### Production Order Data (for BOM Status Validation Tests)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PRODUCTION_ORDER_TYPE_PROCESS}}` | Production/Process order type configured in SAP | Use the standard process order type for pharmaceutical production (e.g., "PI01" or similar, depending on SAP configuration) |
| `{{ORDER_QUANTITY_STANDARD}}` | Standard order quantity for production planning | Use a realistic production batch size (e.g., 1000 units, 100 kg, etc.) |
| `{{ORDER_UOM}}` | Unit of measure for the order quantity | Typically matches the finished product base UoM (e.g., EA, PC, KG, L) |

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DATE_FUTURE_7D}}` | A BOM validity start date at least 7 calendar days from the test execution date | Calculate as: today + 7 days; format YYYY-MM-DD or DD.MM.YYYY (depending on SAP date format settings) |

### User Information

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{USER_ID}}` | User ID of the test user performing the BOM creation/modification/release | Use the SAP user ID (typically the email prefix or employee ID) — will appear in change history entries |

### Edge Case Data (Arrays for Maximum Component/Alternative Tests)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{MAX_COMPONENTS_COUNT}}` | Maximum number of BOM components allowed by SAP system | Typically 999 or as per SAP system configuration. Verify with SAP Basis team or system documentation. |
| `{{COMPONENT_MATERIAL_ARRAY}}` | Array of component material numbers (count equals system maximum) | Create or identify an array of valid component material numbers up to system maximum count. Example: ["MAT001", "MAT002", ..., "MAT999"] |
| `{{COMPONENT_QUANTITY_ARRAY}}` | Array of component quantities corresponding to each material in the array | Create an array of quantities matching the material array. Example: ["10", "20", "15", ..., "10"] |
| `{{COMPONENT_UOM_ARRAY}}` | Array of component UoMs corresponding to each material in the array | Create an array of UoMs matching the material array. Example: ["KG", "G", "L", ..., "KG"] |
| `{{MAX_ALTERNATIVES_COUNT}}` | Maximum number of alternative components allowed per BOM item | Typically 99 or as per SAP system configuration. Verify with SAP Basis team or system documentation. |
| `{{ALTERNATIVE_MATERIAL_ARRAY}}` | Array of alternative material numbers (count equals system maximum alternatives) | Create or identify an array of valid alternative material numbers up to system maximum alternatives count |
| `{{ALTERNATIVE_QUANTITY_ARRAY}}` | Array of alternative component quantities corresponding to each alternative material | Create an array of quantities matching the alternative material array |
| `{{ALTERNATIVE_UOM_ARRAY}}` | Array of alternative component UoMs corresponding to each alternative material | Create an array of UoMs matching the alternative material array |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full Fiori Launchpad URL with SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step. Set in `.env` file. User email address for SAP IDP login. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step. Set in `.env` file. User password for SAP IDP login. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `COMPONENT_MATERIAL_INVALID` and `COMPONENT_MATERIAL_INACTIVE` values must be verified in the test system before executing negative test cases:
   - Invalid material must NOT exist in the system (returns "not found" error)
   - Inactive material must exist but be marked as blocked/inactive for the plant
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **Pharmaceutical-specific requirements:**
   - All component materials must have appropriate material type (ROH for raw materials, HALB for semi-finished)
   - Active ingredient and excipient materials must be flagged as approved for pharmaceutical use
   - Regulatory approval status must be configured for alternative/substitute components
   - BOM usage must be set to "Production" for pharmaceutical manufacturing
7. **BOM Status workflow:**
   - Draft: Initial status after BOM creation; cannot be used for process orders
   - In Review: Intermediate status (may vary by SAP configuration and workflow)
   - Released: Final approved status; available for production planning and process orders
   - Obsolete: Deactivated BOM; cannot be used for new process orders
8. **BOM Versioning:**
   - Modifying a Draft BOM = in-place edit (no new version created)
   - Modifying a Released BOM = new Draft version created (old version remains Released)
9. **Edge case test data:**
   - Arrays (for maximum component/alternative tests) are complex datasets; consider using test data generation scripts or SAP data load tools to create them
   - Verify system maximum limits with SAP Basis team before executing edge case tests

---

## Test Data Dependencies

### Pre-requisite Master Data

Before executing test cases, ensure the following master data exists in the SAP test system:

1. **Finished Product Material** (FERT or HALB type)
   - Active status
   - Configured for test plant
   - Base UoM defined
   - Material group assigned (pharmaceutical-specific)

2. **Component Materials** (ROH or HALB type)
   - Multiple component materials (active ingredients, excipients)
   - Active status
   - Configured for test plant
   - Base UoM defined
   - Approved for pharmaceutical use (regulatory flag)

3. **Alternative/Substitute Materials**
   - Multiple alternative materials for testing substitute scenarios
   - Active status
   - Approved for pharmaceutical use
   - Configured for test plant

4. **Organizational Structure**
   - Plant configured and active
   - Company code assigned to plant
   - Purchasing organization (if applicable)
   - BOM usage "Production" configured

5. **Inactive/Blocked Material** (for negative tests)
   - One material that exists but is inactive or blocked for the plant

### Test Execution Order

For state transition tests (TC-CS-171, TC-CS-172, TC-CS-173), follow this sequence:

1. **TC-CS-173** (Release BOM): Create BOM → Release → Verify status transition
2. **TC-CS-171** (Modify Released BOM): Create BOM → Release → Modify → Verify new version created
3. **TC-CS-172** (Modify Draft BOM): Create BOM → Modify (without releasing) → Verify in-place edit

---

## Mapping Test Cases to Datasets

| Test Case ID | Dataset ID | Scenario Type | Key Test Data |
|--------------|-----------|---------------|--------------|
| TC-CS-151 | TD-CS-065-001 | HAPPY_PATH | 2 components (active ingredient + excipient) |
| TC-CS-152 | TD-CS-065-002 | HAPPY_PATH | Primary component + 1 alternative with approval status |
| TC-CS-153 | TD-CS-065-AP-001 | ALTERNATIVE_PATH | Primary component + 2 alternatives with approval status |
| TC-CS-154 | TD-CS-065-NEG-001 | NEGATIVE | Invalid (non-existent) component material |
| TC-CS-155 | TD-CS-065-NEG-002 | NEGATIVE | Inactive/blocked component material |
| TC-CS-156 | TD-CS-065-NEG-003 | NEGATIVE | Substitute component without approval status |
| TC-CS-157 | TD-CS-065-NEG-004 | NEGATIVE | BOM with Draft status (process order creation blocked) |
| TC-CS-158 | TD-CS-065-NEG-005 | NEGATIVE | BOM with In Review status (process order creation blocked) |
| TC-CS-159 | TD-CS-065-NEG-006 | NEGATIVE | BOM with Obsolete status (process order creation blocked) |
| TC-CS-160 | TD-CS-065-ERR-001 | ERROR | Missing Finished Product Material field |
| TC-CS-161 | TD-CS-065-ERR-002 | ERROR | Missing Plant field |
| TC-CS-162 | TD-CS-065-ERR-003 | ERROR | Missing Component Material field |
| TC-CS-163 | TD-CS-065-ERR-004 | ERROR | Missing Component Quantity field |
| TC-CS-164 | TD-CS-065-ERR-005 | ERROR | Missing Component UoM field |
| TC-CS-165 | TD-CS-065-EDGE-001 | EDGE_CASE | Minimum component quantity boundary |
| TC-CS-166 | TD-CS-065-EDGE-002 | EDGE_CASE | Maximum component quantity boundary |
| TC-CS-167 | TD-CS-065-EDGE-003 | EDGE_CASE | Zero component quantity (invalid) |
| TC-CS-168 | TD-CS-065-EDGE-004 | EDGE_CASE | Single-component BOM (minimum structure) |
| TC-CS-169 | TD-CS-065-EDGE-005 | EDGE_CASE | Maximum number of components |
| TC-CS-170 | TD-CS-065-EDGE-006 | EDGE_CASE | Maximum number of alternatives per component |
| TC-CS-171 | TD-CS-065-ST-001 | STATE_TRANSITION | Modify Released BOM → New version created |
| TC-CS-172 | TD-CS-065-ST-002 | STATE_TRANSITION | Modify Draft BOM → In-place edit (no new version) |
| TC-CS-173 | TD-CS-065-ST-003 | STATE_TRANSITION | Release BOM → Status transition Draft → Released |

---

## Contact and Support

For questions about test data preparation or SAP system configuration:
- Contact SAP Basis team for system configuration limits (max components, max alternatives)
- Contact Master Data team for material master data creation
- Contact Test Environment owner for test system access and data refresh schedules

---
