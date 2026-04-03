/**
 * Script to generate two JSON files for the iOS ExploreCapitals app:
 * 1. images.json — all image keyword → full URL mappings
 * 2. flagMap.json — country/territory/de facto name → 2-letter ISO code
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://explorecapitals.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'iOS ExploreCapitals', 'ExploreCapitals', 'ExploreCapitals', 'Data');

// ─── Task 1: Parse all image TS files ────────────────────────────────────────

function parseImageFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const entries = {};
  // Match lines like:  "Some Key": "/png/DATABASE/...",
  const regex = /"([^"]+)":\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    entries[match[1]] = BASE_URL + match[2];
  }
  return entries;
}

const imagesDirs = [
  path.join(__dirname, 'data', 'images', 'countries'),
  path.join(__dirname, 'data', 'images', 'territories'),
  path.join(__dirname, 'data', 'images', 'defacto'),
];

const allImages = {};
let fileCount = 0;

for (const dir of imagesDirs) {
  if (!fs.existsSync(dir)) {
    console.log(`Skipping missing directory: ${dir}`);
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const entries = parseImageFile(filePath);
    Object.assign(allImages, entries);
    fileCount++;
  }
}

// ─── Task 2: Parse flag emoji → 2-letter ISO code from constants.ts ─────────

function getCountryCode(emoji) {
  if (!emoji) return '';
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0) - 127397))
    .join('')
    .toLowerCase();
}

function parseFlagEntries(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const entries = {};
  // Match: name: 'Country Name' ... flag: '🇦🇫'
  // Works for both inline objects and multi-line objects
  const nameRegex = /name:\s*'([^']+)'/g;
  const flagRegex = /flag:\s*'([^']+)'/g;

  const names = [];
  const flags = [];
  let m;
  while ((m = nameRegex.exec(content)) !== null) names.push(m[1]);
  while ((m = flagRegex.exec(content)) !== null) flags.push(m[1]);

  for (let i = 0; i < Math.min(names.length, flags.length); i++) {
    const code = getCountryCode(flags[i]);
    if (code) {
      entries[names[i]] = code;
    }
  }
  return entries;
}

const flagMap = {};

// Parse main countries from constants.ts
const constantsPath = path.join(__dirname, 'constants.ts');
Object.assign(flagMap, parseFlagEntries(constantsPath));

// Parse territories
const territoriesPath = path.join(__dirname, 'data', 'territories.ts');
Object.assign(flagMap, parseFlagEntries(territoriesPath));

// Parse de facto countries
const deFactoPath = path.join(__dirname, 'data', 'deFacto.ts');
Object.assign(flagMap, parseFlagEntries(deFactoPath));

// ─── Write output ────────────────────────────────────────────────────────────

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesOutputPath = path.join(OUTPUT_DIR, 'images.json');
const flagMapOutputPath = path.join(OUTPUT_DIR, 'flagMap.json');

fs.writeFileSync(imagesOutputPath, JSON.stringify(allImages, null, 2));
fs.writeFileSync(flagMapOutputPath, JSON.stringify(flagMap, null, 2));

// ─── Report ──────────────────────────────────────────────────────────────────

const imageEntryCount = Object.keys(allImages).length;
const flagEntryCount = Object.keys(flagMap).length;
const imagesSize = fs.statSync(imagesOutputPath).size;
const flagMapSize = fs.statSync(flagMapOutputPath).size;

console.log('\n=== Conversion Results ===\n');
console.log(`Image files processed: ${fileCount}`);
console.log(`Total image entries: ${imageEntryCount}`);
console.log(`images.json size: ${(imagesSize / 1024).toFixed(1)} KB`);
console.log(`\nFlag map entries: ${flagEntryCount}`);
console.log(`flagMap.json size: ${(flagMapSize / 1024).toFixed(1)} KB`);

// Sample entries
const imageKeys = Object.keys(allImages);
console.log('\n--- Sample image entries ---');
for (let i = 0; i < Math.min(5, imageKeys.length); i++) {
  console.log(`  "${imageKeys[i]}": "${allImages[imageKeys[i]]}"`);
}

const flagKeys = Object.keys(flagMap);
console.log('\n--- Sample flag entries ---');
for (let i = 0; i < Math.min(10, flagKeys.length); i++) {
  console.log(`  "${flagKeys[i]}": "${flagMap[flagKeys[i]]}"`);
}
console.log('');
