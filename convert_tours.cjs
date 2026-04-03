const fs = require('fs');
const path = require('path');

const toursDir = path.join(__dirname, 'data', 'tours');
const outputPath = '/Users/Daniell/Sites/iOS ExploreCapitals/ExploreCapitals/ExploreCapitals/Data/tours.json';

// Collect all .ts files from all subdirectories
const subdirs = ['countries', 'defacto', 'territories'];
const allFiles = [];
for (const sub of subdirs) {
  const dir = path.join(toursDir, sub);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
    for (const f of files) {
      allFiles.push(path.join(dir, f));
    }
  }
}

console.log(`Found ${allFiles.length} tour files to process.`);

const combined = {};

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Strip the import line and export declaration, leaving the object literal
  // Find the first { after the = sign on the export line
  const exportMatch = content.match(/export\s+const\s+\w+\s*:\s*Record<[^>]+>\s*=\s*/);
  if (!exportMatch) {
    console.warn(`Skipping ${filePath}: no export found`);
    continue;
  }

  const startIdx = exportMatch.index + exportMatch[0].length;
  // Everything from startIdx to end of file is the object literal (plus trailing semicolon/whitespace)
  let objStr = content.slice(startIdx).trimEnd();
  // Remove trailing semicolon
  if (objStr.endsWith(';')) {
    objStr = objStr.slice(0, -1).trimEnd();
  }

  // Use Function() to evaluate the JS object literal
  let data;
  try {
    data = new Function('return (' + objStr + ')')();
  } catch (e) {
    console.error(`Error parsing ${path.basename(filePath)}: ${e.message}`);
    continue;
  }

  const keys = Object.keys(data);
  console.log(`  ${path.basename(filePath)}: ${keys.length} entries (${keys[0]} ... ${keys[keys.length - 1]})`);
  Object.assign(combined, data);
}

// Sort by country name
const sorted = {};
for (const key of Object.keys(combined).sort()) {
  sorted[key] = combined[key];
}

const json = JSON.stringify(sorted, null, 2);
fs.writeFileSync(outputPath, json, 'utf-8');

const countryCount = Object.keys(sorted).length;
const firstKey = Object.keys(sorted)[0];
const fileSizeKB = (Buffer.byteLength(json, 'utf-8') / 1024).toFixed(1);

console.log(`\n=== Results ===`);
console.log(`Total countries/territories: ${countryCount}`);
console.log(`First entry: "${firstKey}" — tour title: "${sorted[firstKey].tourTitle}"`);
console.log(`Output file size: ${fileSizeKB} KB`);
console.log(`Output written to: ${outputPath}`);

// Quick validation
try {
  JSON.parse(json);
  console.log(`JSON validation: PASSED`);
} catch (e) {
  console.error(`JSON validation: FAILED — ${e.message}`);
}
