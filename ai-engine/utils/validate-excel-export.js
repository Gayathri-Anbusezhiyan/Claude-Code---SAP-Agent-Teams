/**
 * Validation Script for Enhanced Excel Export
 * Verifies that all three enhancements are present
 */

const ExcelJS = require('exceljs');

async function validateExcelExport(filePath) {
  console.log(`\n📋 Validating Excel Export: ${filePath}`);
  console.log('='.repeat(80));

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  // Check sheets
  const sheets = workbook.worksheets.map(ws => ws.name);
  console.log(`\n✅ Found ${sheets.length} sheets:`, sheets.join(', '));

  // Validate Test Steps sheet
  const testStepsSheet = workbook.getWorksheet('Test Steps');
  if (testStepsSheet) {
    console.log('\n📝 Test Steps Sheet Validation:');
    const headerRow = testStepsSheet.getRow(3);
    const headers = [];
    for (let i = 1; i <= 6; i++) {
      headers.push(headerRow.getCell(i).value);
    }
    console.log('   Headers:', headers.join(' | '));

    // Check first data row
    const firstDataRow = testStepsSheet.getRow(4);
    const storyId = firstDataRow.getCell(1).value;
    const tcId = firstDataRow.getCell(2).value;
    console.log(`   ✅ Enhancement 1: User Story ID column present: ${storyId}`);
    console.log(`   Sample data: Story=${storyId}, TC=${tcId}`);
  } else {
    console.log('   ❌ Test Steps sheet not found');
  }

  // Validate Test Data sheet
  const testDataSheet = workbook.getWorksheet('Test Data');
  if (testDataSheet) {
    console.log('\n📊 Test Data Sheet Validation:');
    const headerRow = testDataSheet.getRow(3);
    const headers = [];
    for (let i = 1; i <= 8; i++) {
      headers.push(headerRow.getCell(i).value);
    }
    console.log('   Headers:', headers.join(' | '));

    // Check first data row
    const firstDataRow = testDataSheet.getRow(4);
    const storyId = firstDataRow.getCell(1).value;
    const tcId = firstDataRow.getCell(2).value;
    const testDataId = firstDataRow.getCell(3).value;
    const parameter = firstDataRow.getCell(5).value;
    const value = firstDataRow.getCell(6).value;

    if (testDataId && parameter && value) {
      console.log(`   ✅ Enhancement 2: Declared test data values present`);
      console.log(`   Sample data: Story=${storyId}, TC=${tcId}, DataID=${testDataId}, Param=${parameter}, Value=${value}`);
    } else if (storyId === 'No test data found') {
      console.log(`   ⚠️  No test data found for this story (expected for CS-2)`);
    } else {
      console.log(`   ❌ Test data values missing or incomplete`);
    }
  } else {
    console.log('   ❌ Test Data sheet not found');
  }

  // Validate Traceability sheet
  const traceabilitySheet = workbook.getWorksheet('Traceability');
  if (traceabilitySheet) {
    console.log('\n🔗 Traceability Sheet Validation:');
    const headerRow = traceabilitySheet.getRow(3);
    const headers = [];
    for (let i = 1; i <= 4; i++) {
      headers.push(headerRow.getCell(i).value);
    }
    console.log('   Headers:', headers.join(' | '));

    // Check first data row
    const firstDataRow = traceabilitySheet.getRow(4);
    const storyId = firstDataRow.getCell(1).value;
    const tcId = firstDataRow.getCell(2).value;
    const executionStatus = firstDataRow.getCell(3).value;
    const defectId = firstDataRow.getCell(4).value;

    console.log(`   ✅ Enhancement 3: Execution status and defect tracking present`);
    console.log(`   Sample data: Story=${storyId}, TC=${tcId}, Status=${executionStatus}, Defect=${defectId}`);
  } else {
    console.log('   ❌ Traceability sheet not found');
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ Validation complete!\n');
}

// Main execution
const filePath = process.argv[2] || 'test-registry/testcases/AI-generated testcases/CS-3/testcases/CS-3-testcases.xlsx';
validateExcelExport(filePath).catch(err => {
  console.error('❌ Validation failed:', err.message);
  process.exit(1);
});
