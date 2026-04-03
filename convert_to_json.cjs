const fs = require('fs');
const path = require('path');

// Read all source files
const constantsTs = fs.readFileSync(path.join(__dirname, 'constants.ts'), 'utf-8');
const territoriesTs = fs.readFileSync(path.join(__dirname, 'data', 'territories.ts'), 'utf-8');
const deFactoTs = fs.readFileSync(path.join(__dirname, 'data', 'deFacto.ts'), 'utf-8');
const aliasesTs = fs.readFileSync(path.join(__dirname, 'data', 'aliases.ts'), 'utf-8');

// Extract aliases map
function parseAliases(text) {
  // Find the object content between the first { and the matching }
  const match = text.match(/COUNTRY_ALIASES[^{]*\{([\s\S]*)\};/);
  if (!match) throw new Error('Could not find COUNTRY_ALIASES');
  const body = match[1];
  // Parse each line like '1': ['AFG'],
  const aliases = {};
  const lineRe = /['"]([^'"]+)['"]\s*:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = lineRe.exec(body)) !== null) {
    const id = m[1];
    const vals = m[2].split(',')
      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(s => s.length > 0);
    aliases[id] = vals;
  }
  return aliases;
}

// Extract array from TS file using eval
// We need to handle the TS array syntax which is basically valid JS
function extractArray(text, varName) {
  // Find the array start
  const patterns = [
    new RegExp(`(?:const|export const)\\s+${varName}[^=]*=\\s*\\[`, 's'),
  ];
  let startIdx = -1;
  for (const pat of patterns) {
    const m = pat.exec(text);
    if (m) {
      startIdx = m.index + m[0].length - 1; // position of the '['
      break;
    }
  }
  if (startIdx === -1) throw new Error(`Could not find ${varName} array`);

  // Find matching closing bracket
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx === -1) throw new Error(`Could not find end of ${varName} array`);

  const arrayStr = text.substring(startIdx, endIdx + 1);
  // eval it - the content is plain JS objects
  const result = eval(arrayStr);
  return result;
}

const aliases = parseAliases(aliasesTs);
console.log(`Parsed ${Object.keys(aliases).length} alias entries`);

const rawCountries = extractArray(constantsTs, 'RAW_COUNTRIES');
console.log(`Parsed ${rawCountries.length} countries`);

const territories = extractArray(territoriesTs, 'TERRITORIES');
console.log(`Parsed ${territories.length} territories`);

const deFacto = extractArray(deFactoTs, 'DE_FACTO_COUNTRIES');
console.log(`Parsed ${deFacto.length} de facto countries`);

// Build combined array
function buildEntry(item, type) {
  return {
    id: item.id,
    name: item.name,
    capital: item.capital,
    population: item.population,
    region: item.region,
    flag: item.flag,
    lat: item.lat,
    lng: item.lng,
    description: item.description,
    area: item.area,
    currency: item.currency,
    languages: item.languages || [],
    borders: item.borders || [],
    gdp: item.gdp || null,
    timeZone: item.timeZone || null,
    callingCode: item.callingCode || null,
    driveSide: item.driveSide || null,
    alsoKnownAs: aliases[item.id] || [],
    type: type,
    sovereignty: item.sovereignty || null,
  };
}

const combined = [
  ...rawCountries.map(c => buildEntry(c, 'country')),
  ...territories.map(t => buildEntry(t, 'territory')),
  ...deFacto.map(d => buildEntry(d, 'de_facto')),
];

console.log(`\nTotal entries: ${combined.length}`);
console.log(`  Countries: ${rawCountries.length}`);
console.log(`  Territories: ${territories.length}`);
console.log(`  De facto: ${deFacto.length}`);

// Write output
const outputPath = path.join('/Users/Daniell/Sites/iOS ExploreCapitals/ExploreCapitals/Data', 'countries.json');
fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2), 'utf-8');
console.log(`\nWritten to: ${outputPath}`);

// Print a few samples
console.log('\n--- Sample entries ---');
console.log('\nFirst country:', JSON.stringify(combined[0], null, 2));
console.log('\nFirst territory:', JSON.stringify(combined.find(e => e.type === 'territory'), null, 2));
console.log('\nFirst de facto:', JSON.stringify(combined.find(e => e.type === 'de_facto'), null, 2));

// Validate
try {
  JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  console.log('\nJSON validation: PASSED');
} catch (e) {
  console.error('\nJSON validation: FAILED', e.message);
}
