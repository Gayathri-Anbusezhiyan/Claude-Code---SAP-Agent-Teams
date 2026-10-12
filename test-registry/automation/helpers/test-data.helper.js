/**
 * Test Data Helper
 * Provides test case metadata and parameterized test data for automation scripts
 * Generated: 2026-07-31
 */

export function getTestCase(tcId) {
  const testCases = {
    'TC-CS-001': {
      id: 'TC-CS-001',
      title: 'Create Standard PO — single line item',
      priority: 'CRITICAL',
      scenarioType: 'HAPPY_PATH'
    },
    'TC-CS-002': {
      id: 'TC-CS-002',
      title: 'Create Standard PO — multiple line items',
      priority: 'HIGH',
      scenarioType: 'ALTERNATIVE_PATH'
    },
    'TC-CS-003': {
      id: 'TC-CS-003',
      title: 'Attempt PO with non-existent Supplier',
      priority: 'HIGH',
      scenarioType: 'NEGATIVE'
    },
    'TC-CS-004': {
      id: 'TC-CS-004',
      title: 'Attempt PO with non-existent Material',
      priority: 'HIGH',
      scenarioType: 'NEGATIVE'
    },
    'TC-CS-005': {
      id: 'TC-CS-005',
      title: 'Attempt PO with empty Supplier',
      priority: 'HIGH',
      scenarioType: 'ERROR'
    },
    'TC-CS-006': {
      id: 'TC-CS-006',
      title: 'Attempt PO with empty Material',
      priority: 'HIGH',
      scenarioType: 'ERROR'
    },
    'TC-CS-007': {
      id: 'TC-CS-007',
      title: 'Attempt PO with empty Quantity',
      priority: 'HIGH',
      scenarioType: 'ERROR'
    },
    'TC-CS-008': {
      id: 'TC-CS-008',
      title: 'Attempt PO with empty Price',
      priority: 'HIGH',
      scenarioType: 'ERROR'
    },
    'TC-CS-009': {
      id: 'TC-CS-009',
      title: 'Create PO with minimum Quantity',
      priority: 'MEDIUM',
      scenarioType: 'EDGE_CASE'
    },
    'TC-CS-010': {
      id: 'TC-CS-010',
      title: 'Attempt PO with zero Quantity',
      priority: 'MEDIUM',
      scenarioType: 'EDGE_CASE'
    },
    'TC-CS-011': {
      id: 'TC-CS-011',
      title: 'Attempt PO with zero Price',
      priority: 'MEDIUM',
      scenarioType: 'EDGE_CASE'
    },
    'TC-CS-021': {
      id: 'TC-CS-021',
      title: 'Verify formal success confirmation',
      priority: 'HIGH',
      designedToFail: true,
      scenarioType: 'DEFECT_DETECTION'
    },
  };
  return testCases[tcId] || { id: tcId };
}

export function getTestData(datasetId) {
  const datasets = {
    // TD-CS-002-001: Single line item (Happy Path)
    'TD-CS-002-001': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      supplierName: 'Carbon Tec Inc.',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      materialDesc: 'Input 1 (WATER)',
      uom: 'KG',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
      currency: 'USD',
      purchasingOrg: '1710',
      purchasingGroup: '001',
      companyCode: '1710',
      expectedNetValue: '0.80'
    },

    // TD-CS-002-AP-001: Multiple line items (Alternative Path)
    'TD-CS-002-AP-001': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      materialId2: process.env.MATERIAL_ID_2_VALID || 'PLACEHOLDER',
      quantity2: process.env.PO_QUANTITY_STANDARD_2 || '5',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-ERR-001: Missing Supplier (Error)
    'TD-CS-002-ERR-001': {
      emptyValue: '',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-ERR-002: Missing Material (Error)
    'TD-CS-002-ERR-002': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      emptyValue: '',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-ERR-003: Missing Quantity (Error)
    'TD-CS-002-ERR-003': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      emptyValue: '',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-ERR-004: Missing Price (Error)
    'TD-CS-002-ERR-004': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      emptyValue: '',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-EDGE-001: Minimum Quantity (Edge Case)
    'TD-CS-002-EDGE-001': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      minQuantity: process.env.PO_QUANTITY_MIN || '1',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-EDGE-002: Zero Quantity (Edge Case)
    'TD-CS-002-EDGE-002': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      zeroQuantity: '0',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-EDGE-003: Zero Price (Edge Case)
    'TD-CS-002-EDGE-003': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      zeroPrice: '0.00',
      plant: process.env.PLANT_CODE || '1710',
    },

    // TD-CS-002-DEFECT-001: Success notification test (Designed to Fail)
    'TD-CS-002-DEFECT-001': {
      supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
      materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
      quantity: process.env.PO_QUANTITY_STANDARD || '10',
      price: process.env.NET_PRICE_VALID || '0.08',
      plant: process.env.PLANT_CODE || '1710',
    },
  };

  return datasets[datasetId] || {
    supplierId: process.env.SUPPLIER_ID_VALID || '17300002',
    materialId: process.env.MATERIAL_ID_VALID || 'RMPI001',
    quantity: process.env.PO_QUANTITY_STANDARD || '10',
    price: process.env.NET_PRICE_VALID || '0.08',
    plant: process.env.PLANT_CODE || '1710',
  };
}
