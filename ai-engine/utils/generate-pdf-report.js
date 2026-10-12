// generate-pdf-report.js
// Converts the markdown test execution report to PDF

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const markdownFilePath = path.join(__dirname, 'test-execution-report-TC-CS-001.md');
const htmlFilePath = path.join(__dirname, 'test-execution-report-TC-CS-001.html');
const pdfFilePath = path.join(__dirname, 'test-execution-report-TC-CS-001.pdf');

// Read markdown content
const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

// Create HTML with styling
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SAP S/4HANA Test Execution Report - TC-CS-001</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #0066cc;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        h2 {
            color: #0088cc;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 8px;
            margin-top: 25px;
        }
        h3 {
            color: #00aacc;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        th {
            background-color: #0066cc;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        td {
            padding: 10px 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f0f8ff;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #0066cc;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        .status-passed {
            color: #28a745;
            font-weight: bold;
        }
        .status-failed {
            color: #dc3545;
            font-weight: bold;
        }
        .status-pending {
            color: #ffc107;
            font-weight: bold;
        }
        .executive-summary {
            background-color: #e6f3ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 5px solid #0066cc;
        }
        .metric-box {
            display: inline-block;
            background-color: #fff;
            padding: 15px 25px;
            margin: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #0066cc;
        }
        .metric-label {
            font-size: 0.9em;
            color: #666;
            margin-top: 5px;
        }
        .success-badge {
            background-color: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
        }
        .warning-badge {
            background-color: #ffc107;
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
        }
        .info-badge {
            background-color: #17a2b8;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
        }
        blockquote {
            border-left: 4px solid #0066cc;
            padding-left: 20px;
            margin-left: 0;
            color: #666;
            font-style: italic;
        }
        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }
        .page-break {
            page-break-after: always;
        }
        .header-logo {
            text-align: right;
            color: #0066cc;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 0.9em;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="header-logo">
        SAP S/4HANA Cloud Automation | Capgemini
    </div>
    ${convertMarkdownToHTML(markdownContent)}
    <div class="footer">
        <p><strong>© 2026 SAP S/4HANA Cloud Automation Project - Capgemini</strong></p>
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>
`;

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;

    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Convert italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // Convert code blocks
    html = html.replace(/```(.*?)\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>');

    // Convert tables
    html = convertTables(html);

    // Convert lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gis, '<ul>$1</ul>');

    // Convert checkmarks and status
    html = html.replace(/✅/g, '<span class="status-passed">✅ PASSED</span>');
    html = html.replace(/❌/g, '<span class="status-failed">❌ FAILED</span>');
    html = html.replace(/⏭️/g, '<span class="status-pending">⏭️ PENDING</span>');
    html = html.replace(/⚠️/g, '<span class="warning-badge">⚠️ WARNING</span>');

    // Convert horizontal rules
    html = html.replace(/^---$/gim, '<hr>');

    // Convert line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^(.+)$/gim, '<p>$1</p>');

    return html;
}

function convertTables(html) {
    const tableRegex = /\|(.*)\|\n\|[-:\s|]+\|\n((?:\|.*\|\n?)*)/gim;

    html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
        const headers = headerRow.split('|').filter(h => h.trim()).map(h => h.trim());
        const rows = bodyRows.trim().split('\n').map(row =>
            row.split('|').filter(c => c.trim()).map(c => c.trim())
        );

        let table = '<table>';
        table += '<thead><tr>';
        headers.forEach(h => table += `<th>${h}</th>`);
        table += '</tr></thead><tbody>';

        rows.forEach(row => {
            table += '<tr>';
            row.forEach(cell => table += `<td>${cell}</td>`);
            table += '</tr>';
        });

        table += '</tbody></table>';
        return table;
    });

    return html;
}

// Write HTML file
fs.writeFileSync(htmlFilePath, htmlContent);
console.log(`✅ HTML report generated: ${htmlFilePath}`);

// Convert HTML to PDF using Chrome/Chromium
console.log('Converting HTML to PDF...');
const chromePath = 'chrome'; // or 'chromium' or full path

exec(`"${chromePath}" --headless --disable-gpu --print-to-pdf="${pdfFilePath}" "${htmlFilePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Error converting to PDF with Chrome. Trying Playwright...');

        // Fallback: Use Playwright to generate PDF
        const playwrightScript = `
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://${htmlFilePath}', { waitUntil: 'networkidle' });
  await page.pdf({
    path: '${pdfFilePath}',
    format: 'A4',
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
    printBackground: true
  });
  await browser.close();
  console.log('✅ PDF report generated: ${pdfFilePath}');
})();
        `;

        fs.writeFileSync('temp-pdf-gen.js', playwrightScript);
        exec('node temp-pdf-gen.js', (err2, stdout2, stderr2) => {
            if (err2) {
                console.error('❌ Error:', err2.message);
                return;
            }
            console.log(stdout2);
            fs.unlinkSync('temp-pdf-gen.js');
        });
    } else {
        console.log(`✅ PDF report generated: ${pdfFilePath}`);
    }
});
