# Test Data Guide: [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu

**Generated:**    2026-08-24
**Module:**       MM — Materials Management
**Feature:**      Subcontracting Purchase Order Creation
**Data File:**    test-registry/testdata/CS-24/CS-24-testdata.json

---

## Overview

This test data guide explains how to resolve all `{{PLACEHOLDER}}` values in the CS-24 test data JSON for subcontracting purchase order creation. Subcontracting is a specialized procurement process where:

1. A **finished material** is procured from a **Contract Manufacturing Organization (CMO)** using a Purchase Order with **Item Category L (Subcontracting)**
2. **Components** (raw materials) are provided to the CMO from your plant's inventory using **Movement Type 541** (Issue to Subcontractor)
3. Components are tracked as **Special Stock O** (Stock provided to vendor) at the CMO
4. When the **finished goods** are received, SAP automatically **consumes the components** (backflush) from the special stock at the CMO
5. If **Quality Management (QM)** is active, an **inspection lot** is created for the received finished goods

---

## How to Use This Guide

1. Open `test-registry/testdata/CS-24/CS-24-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value in the JSON
3. Replace it with the actual value from your SAP test system using the tables below
4. Save the updated JSON — **do NOT commit real SAP values to version control**
5. The updated values are substituted into test steps at execution time

---

## Environment Configuration (from .env)

These variables are **not** stored in the testdata JSON. They are read directly from the `.env` file at the project root.

| Variable | Usage in Tests | Current Status |
|----------|---------------|----------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation Step 1 of every test case | Already set in `.env` |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login Step 2 | Already set in `.env` |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login Step 4 | Already set in `.env` |

---

## Master Data Placeholders

### Supplier Master Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CMO_SUPPLIER_ID}}` | Supplier account number for a Contract Manufacturing Organization (CMO). This supplier MUST have the **Subcontracting indicator** active in the Supplier Master record. | SAP Fiori: Open "Manage Supplier Master Data" → Search for suppliers with "Subcontracting" indicator active in the Purchasing Data view → Note the Supplier ID (e.g., `17300003`). Alternatively, use the supplier created during SAP test system setup specifically for subcontracting scenarios. |
| `{{CMO_SUPPLIER_NAME}}` | The name of the CMO supplier (auto-populated by SAP after entering `{{CMO_SUPPLIER_ID}}`). | This value is auto-populated by SAP — no manual entry needed. For reference, note the supplier name from the Supplier Master (e.g., `CMO Manufacturing Inc.`). |
| `{{SUPPLIER_ID_STANDARD}}` | A standard supplier (NOT configured for subcontracting). Used for negative test TC-CS-205 to verify that subcontracting PO creation is blocked for non-CMO suppliers. | Use any standard supplier from CS-2/CS-3 test data that does NOT have the subcontracting indicator (e.g., `17300002` — Carbon Tec Inc.). |

---

### Material Master Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{FINISHED_MATERIAL_ID}}` | Material number for a **finished good** that is configured for **subcontracting procurement**. The material must have a **BOM (Bill of Materials)** assigned with at least one component, and must support **Item Category L** in the purchasing view. | SAP Fiori: Open "Manage Material Master" → Search for materials with Material Type = **FERT** (Finished Product) → Verify the material has an active BOM in the plant specified by `{{PLANT_CODE}}` → Verify the material is flagged for subcontracting procurement → Note the Material ID (e.g., `FG-SUBCON-001`). If no such material exists, create one using the "Create Material" app with Material Type = FERT, assign a BOM, and set the subcontracting indicator in Purchasing Data. |
| `{{FINISHED_MATERIAL_DESC}}` | The description of the finished material (auto-populated by SAP after entering `{{FINISHED_MATERIAL_ID}}`). | This value is auto-populated by SAP — no manual entry needed. For reference, note the material description from the Material Master (e.g., `Subcontracted Finished Product`). |
| `{{FINISHED_MATERIAL_MULTI_BOM}}` | Material number for a finished good with a **multi-level BOM** containing 2-3 components. Used for alternative path test TC-CS-203 to verify component explosion for complex BOMs. | Use a finished material with a BOM that includes 2-3 active components. Verify in "Manage Bill of Materials" app → Note the Material ID and the number of components (e.g., `FG-SUBCON-MULTI`). |
| `{{FINISHED_MATERIAL_ID_QM_ACTIVE}}` | Material number for a finished good with **Quality Management (QM) inspection** active. Used for integration test TC-CS-222 to verify inspection lot creation during goods receipt. | Use a finished material with QM inspection type = **02 (Goods Receipt Inspection)** set in the Quality Management view of the Material Master → Note the Material ID (e.g., `FG-SUBCON-QM`). |
| `{{COMPONENT_MATERIAL_ID}}` | Material number for a **component** (raw material) that is part of the BOM for `{{FINISHED_MATERIAL_ID}}`. This component will be issued to the CMO using Movement Type 541. | SAP Fiori: Open "Manage Bill of Materials" → Search for the BOM of `{{FINISHED_MATERIAL_ID}}` → Note the Material ID of the first active component (e.g., `RM-COMP-001`). Verify the component material exists in the Material Master with Material Type = **ROH** (Raw Material). |
| `{{COMPONENT_DESC}}` | The description of the component material (auto-populated by SAP). | This value is auto-populated by SAP — no manual entry needed. For reference, note the component description from the Material Master (e.g., `Raw Material Component 1`). |
| `{{COMPONENT_NOT_IN_BOM}}` | Material number for a component that is **NOT** included in the BOM for `{{FINISHED_MATERIAL_ID}}`. Used for negative test TC-CS-207 to verify that invalid components cannot be issued against a subcontracting PO. | Use any raw material from your test system that is NOT listed in the BOM of `{{FINISHED_MATERIAL_ID}}` (e.g., `RMPI001` from CS-2 test data if it is not in the subcontracting BOM). |
| `{{MATERIAL_ID_STANDARD}}` | A standard material (NOT configured for subcontracting). Used for negative test TC-CS-206 to verify that subcontracting PO creation is blocked for non-subcontracting materials. | Use any standard material from CS-2/CS-3 test data that does NOT support Item Category L (e.g., `RMPI001`). |

---

### Quantity and Unit of Measure

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PO_QUANTITY_STANDARD}}` | Standard order quantity for the finished material. Used in most happy path and alternative path tests. | Use a value like `10`, `20`, or `50` — appropriate for the finished material's base unit of measure. Confirm sufficient component stock is available for the calculated component requirements (PO quantity × BOM component quantity per unit). |
| `{{PO_QUANTITY_MIN}}` | Minimum valid order quantity (lower boundary). Used for edge case test TC-CS-215. | Typically `1` for most unit-of-measure types (EA, PC, etc.). For weight-based UoMs (KG, G), `0.001` may be the minimum. Confirm from the material's purchasing info record. |
| `{{PO_QUANTITY_MAX}}` | Maximum valid order quantity (upper boundary). Used for edge case test TC-CS-217. | Use a high value like `9999` or the maximum allowed by the material's purchasing info record. Verify that the system does not impose additional constraints on subcontracting POs. |
| `{{PO_QUANTITY_PARTIAL}}` | Partial goods receipt quantity — less than `{{PO_QUANTITY_STANDARD}}`. Used for alternative path test TC-CS-204 to verify partial GR and proportional component consumption. | Use a value like `5` or `8` (50-80% of `{{PO_QUANTITY_STANDARD}}`). Ensure it is greater than zero and less than the total PO quantity. |
| `{{COMPONENT_QUANTITY}}` | Quantity of the component material to issue to the CMO using Movement Type 541. This should match or exceed the BOM requirement for the PO quantity. | Calculate as: `PO_QUANTITY_STANDARD × BOM_COMPONENT_QUANTITY_PER_UNIT`. For example, if the BOM requires 2 KG of component per 1 unit of finished material, and PO quantity is 10, then component quantity = 20 KG. |
| `{{COMPONENT_COUNT_MULTI}}` | The expected number of components in the BOM for `{{FINISHED_MATERIAL_MULTI_BOM}}`. Used for alternative path test TC-CS-203 to verify multi-component explosion. | Use `2` or `3` depending on the BOM structure of `{{FINISHED_MATERIAL_MULTI_BOM}}`. Verify in "Manage Bill of Materials" app. |
| `{{UNIT_OF_MEASURE}}` | The base unit of measure for the finished material (auto-populated by SAP after entering `{{FINISHED_MATERIAL_ID}}`). | This value is auto-populated by SAP — no manual entry needed. Common values: `EA` (Each), `PC` (Piece), `KG` (Kilogram). |

---

### Pricing and Currency

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{NET_PRICE_VALID}}` | Net order price per unit of measure for the finished material. This is the CMO's processing/manufacturing fee. | Use a value like `5.00`, `10.00`, or `15.00` USD per unit. This price represents the service fee charged by the CMO for converting the provided components into the finished product. |
| `{{CURRENCY_CODE}}` | Currency code for the purchase order (auto-populated by SAP based on supplier and company code configuration). | This value is auto-populated by SAP — no manual entry needed. Common values: `USD`, `EUR`, `GBP`. |

---

### Organizational Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PLANT_CODE}}` | The receiving plant code where the finished goods will be received and where the components are issued from. | Use the same plant code as CS-2/CS-3 (e.g., `1710`). Verify the plant has the BOM assigned for `{{FINISHED_MATERIAL_ID}}`. |
| `{{PURCHASING_ORG_CODE}}` | Purchasing Organization code (auto-populated by SAP based on supplier and user profile). | This value is auto-populated by SAP — no manual entry needed. Use the same purchasing org as CS-2/CS-3 (e.g., `1710`). |
| `{{PURCHASING_GROUP_CODE}}` | Purchasing Group code (auto-populated by SAP based on supplier master record). | This value is auto-populated by SAP — no manual entry needed. Use the same purchasing group as CS-2/CS-3 (e.g., `001`). |
| `{{COMPANY_CODE}}` | Company Code (auto-populated by SAP based on purchasing organization configuration). | This value is auto-populated by SAP — no manual entry needed. Use the same company code as CS-2/CS-3 (e.g., `1710` — Velotics Inc.). |

---

### Date Fields

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DELIVERY_DATE_FUTURE}}` | A delivery date at least 7 days in the future from the test execution date. | Calculate as: `Test Execution Date + 7 days` or more. Format: `YYYY-MM-DD` (e.g., `2026-09-05`). |
| `{{DELIVERY_DATE_TODAY}}` | Delivery date = today (same as test execution date). Used for edge case test TC-CS-218. | Use the current date at the time of test execution. Format: `YYYY-MM-DD` (e.g., `2026-08-24`). |
| `{{DELIVERY_DATE_PAST}}` | A delivery date in the past (before the test execution date). Used for edge case test TC-CS-219 to verify past date validation. | Calculate as: `Test Execution Date - 7 days` or more. Format: `YYYY-MM-DD` (e.g., `2026-08-10`). |

---

### Purchase Order Numbers

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SUBCON_PO_NUMBER}}` | An existing subcontracting Purchase Order number (Item Category L) with status **Open** or **Sent**, at least one line item, and no full goods receipt posted. Used by TC-CS-200 (component issue), TC-CS-201 (GR), TC-CS-220 (zero component), TC-CS-221 (integration), TC-CS-222 (QM integration). | Create a subcontracting PO using TC-CS-199 (HP-001) first, then note the generated PO number (e.g., `4500065468`). Alternatively, use "Manage Purchase Orders" → filter by Item Category = L → select an open PO → note the PO number. |
| `{{SUBCON_PO_NO_COMPONENT_STOCK}}` | A subcontracting PO number where **NO component stock has been issued to the CMO** (special stock O is zero or insufficient). Used by TC-CS-208 to verify insufficient component stock error during goods receipt. | Create a subcontracting PO but do NOT perform Movement Type 541 component issue. Note the PO number. When a goods receipt is attempted, SAP should display an insufficient component stock error. |

---

### BOM and Configuration Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BOM_ALTERNATIVE}}` | BOM alternative number if multiple BOMs exist for the finished material. Used for integration test TC-CS-223 to verify BOM explosion logic. | Typically `1` (default BOM alternative). If multiple BOM alternatives exist for `{{FINISHED_MATERIAL_ID}}`, specify the alternative number (e.g., `2`, `3`). Verify in "Manage Bill of Materials" app. |

---

## Placeholder Resolution Table (Alphabetical)

| Placeholder | Example Value | Data Type | Notes |
|-------------|--------------|-----------|-------|
| `{{BOM_ALTERNATIVE}}` | `1` | String | BOM alternative number — default = `1` |
| `{{CMO_SUPPLIER_ID}}` | `17300003` | String | CMO supplier with subcontracting indicator active |
| `{{CMO_SUPPLIER_NAME}}` | `CMO Manufacturing Inc.` | String | Auto-populated by SAP |
| `{{COMPANY_CODE}}` | `1710` | String | Auto-populated by SAP |
| `{{COMPONENT_COUNT_MULTI}}` | `2` or `3` | String | Expected number of components in multi-BOM |
| `{{COMPONENT_DESC}}` | `Raw Material Component 1` | String | Auto-populated by SAP |
| `{{COMPONENT_MATERIAL_ID}}` | `RM-COMP-001` | String | Component from BOM of finished material |
| `{{COMPONENT_NOT_IN_BOM}}` | `RMPI001` | String | Component NOT in BOM — for negative test |
| `{{COMPONENT_QUANTITY}}` | `20` | String | PO qty × BOM component qty per unit |
| `{{CURRENCY_CODE}}` | `USD` | String | Auto-populated by SAP |
| `{{DELIVERY_DATE_FUTURE}}` | `2026-09-05` | String | Today + 7 days |
| `{{DELIVERY_DATE_PAST}}` | `2026-08-10` | String | Today - 7 days |
| `{{DELIVERY_DATE_TODAY}}` | `2026-08-24` | String | Current date |
| `{{FINISHED_MATERIAL_DESC}}` | `Subcontracted Finished Product` | String | Auto-populated by SAP |
| `{{FINISHED_MATERIAL_ID}}` | `FG-SUBCON-001` | String | Finished material with BOM and subcon support |
| `{{FINISHED_MATERIAL_ID_QM_ACTIVE}}` | `FG-SUBCON-QM` | String | Finished material with QM inspection active |
| `{{FINISHED_MATERIAL_MULTI_BOM}}` | `FG-SUBCON-MULTI` | String | Finished material with 2-3 components in BOM |
| `{{MATERIAL_ID_STANDARD}}` | `RMPI001` | String | Standard material — NOT subcontracting |
| `{{NET_PRICE_VALID}}` | `10.00` | String | CMO processing fee per unit |
| `{{PLANT_CODE}}` | `1710` | String | Receiving plant with BOM for finished material |
| `{{PO_QUANTITY_MAX}}` | `9999` | String | Maximum valid quantity |
| `{{PO_QUANTITY_MIN}}` | `1` | String | Minimum valid quantity (lower boundary) |
| `{{PO_QUANTITY_PARTIAL}}` | `5` | String | Partial GR quantity — less than standard |
| `{{PO_QUANTITY_STANDARD}}` | `10` | String | Standard order quantity |
| `{{PURCHASING_GROUP_CODE}}` | `001` | String | Auto-populated by SAP |
| `{{PURCHASING_ORG_CODE}}` | `1710` | String | Auto-populated by SAP |
| `{{SUBCON_PO_NO_COMPONENT_STOCK}}` | `4500065469` | String | Subcon PO with no component stock issued |
| `{{SUBCON_PO_NUMBER}}` | `4500065468` | String | Open subcontracting PO for testing |
| `{{SUPPLIER_ID_STANDARD}}` | `17300002` | String | Standard supplier — NOT subcontracting |
| `{{UNIT_OF_MEASURE}}` | `EA` or `KG` | String | Auto-populated by SAP |

---

## Test Execution Notes

### Pre-conditions That Require SAP System Preparation

| Test Case | Requirement | Action Needed |
|-----------|-------------|---------------|
| TC-CS-199 (HP-001) | `{{CMO_SUPPLIER_ID}}` must exist with subcontracting indicator active; `{{FINISHED_MATERIAL_ID}}` must have an active BOM | Verify in SAP or create new CMO supplier and finished material with BOM. Ensure BOM is assigned to `{{PLANT_CODE}}`. |
| TC-CS-200 (HP-002) | `{{SUBCON_PO_NUMBER}}` must exist and be open | Create a subcontracting PO using TC-CS-199 first, or use an existing open subcontracting PO from the test system. |
| TC-CS-201 (HP-003) | Components must be issued to CMO (Movement Type 541) before goods receipt | Execute TC-CS-200 (component issue) before attempting goods receipt in TC-CS-201. |
| TC-CS-202 (HP-004) | Component stock at CMO (special stock O) must exist | Execute TC-CS-200 (component issue) to create special stock O balance at CMO. |
| TC-CS-203 (AP-001) | `{{FINISHED_MATERIAL_MULTI_BOM}}` must have 2-3 components in BOM | Create a multi-component BOM in "Manage Bill of Materials" app before test execution. |
| TC-CS-204 (AP-002) | `{{SUBCON_PO_NUMBER}}` must have sufficient component stock at CMO for partial GR | Execute TC-CS-200 (component issue) with full component quantity before attempting partial goods receipt. |
| TC-CS-205 (NEG-001) | `{{SUPPLIER_ID_STANDARD}}` must NOT have subcontracting indicator | Use a standard supplier from CS-2/CS-3 test data (e.g., `17300002` — Carbon Tec Inc.). |
| TC-CS-206 (NEG-002) | `{{MATERIAL_ID_STANDARD}}` must NOT support Item Category L | Use a standard material from CS-2/CS-3 test data (e.g., `RMPI001`). |
| TC-CS-207 (NEG-003) | `{{COMPONENT_NOT_IN_BOM}}` must exist as a material but NOT be listed in the BOM | Use any raw material not included in the BOM of `{{FINISHED_MATERIAL_ID}}`. |
| TC-CS-208 (NEG-004) | `{{SUBCON_PO_NO_COMPONENT_STOCK}}` must have zero or insufficient component stock at CMO | Create a subcontracting PO but do NOT execute component issue (Movement Type 541). |
| TC-CS-221 (INT-001) | Full integration flow requires creating PO, issuing components, and posting GR in sequence | Execute TC-CS-199, TC-CS-200, and TC-CS-201 in order, or combine steps in a single end-to-end test. |
| TC-CS-222 (INT-002) | `{{FINISHED_MATERIAL_ID_QM_ACTIVE}}` must have QM inspection type 02 active | Configure QM inspection in Material Master → Quality Management view → Set Inspection Type = 02 (GR Inspection). |
| TC-CS-223 (INT-003) | BOM must exist for `{{FINISHED_MATERIAL_ID}}` at `{{PLANT_CODE}}` | Verify BOM assignment in "Manage Bill of Materials" app. If missing, create a BOM with at least one component. |

---

## Notes

1. **Never commit real SAP IDs or passwords** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation must be done in a **dedicated SAP S/4HANA Cloud test system** — never use production credentials or documents
3. **Subcontracting requires**:
   - Supplier Master with subcontracting indicator
   - Finished Material with Material Type = FERT and subcontracting support
   - Bill of Materials (BOM) with at least one active component
   - Component materials with Material Type = ROH (Raw Material)
4. **Movement Type 541** (Issue to Subcontractor) creates **Special Stock O** (Stock provided to vendor) at the CMO
5. **Goods Receipt** for subcontracting PO automatically consumes (backflush) component stock from Special Stock O at the CMO
6. **Quality Management (QM)** integration requires finished material to have Inspection Type = 02 (Goods Receipt Inspection) in the Material Master
7. After a test system refresh from production, re-verify all `{{FINISHED_MATERIAL_ID}}`, `{{COMPONENT_MATERIAL_ID}}`, and `{{CMO_SUPPLIER_ID}}` values — master data may change
8. **BOM explosion** is triggered automatically when Item Category = L is set on the PO line item — no manual component entry required
9. **Stock Overview** app can be used to verify special stock O balances at the CMO after component issue (Movement Type 541)
