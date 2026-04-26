const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const premiumGames = [
  'DrivingDirection.tsx',
  'CurrencyCraze.tsx',
  'LanguageLegend.tsx',
  'AreaAce.tsx',
  'TimeZoneTrekker.tsx',
  'TerritoryTitans.tsx'
];

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Only target game components (they have <GameFooterNav />)
  if (!content.includes('<GameFooterNav />')) {
    continue;
  }

  const isPremium = premiumGames.includes(file);

  // 1. Inject import
  if (!content.includes('GameRandomButton')) {
    content = content.replace(
      "import GameFooterNav from '../components/GameFooterNav';",
      "import GameFooterNav from '../components/GameFooterNav';\nimport GameRandomButton from '../components/GameRandomButton';"
    );
  }

  // 2. Fix layout margins on mobile
  content = content.replace(
    /className="m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md"/g,
    'className="mx-auto mt-6 mb-8 sm:m-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-md"'
  );

  // 3. Make lobby card relative
  content = content.replace(
    /className="game-lobby-card w-full bg-white\/20 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white\/40 overflow-hidden group"/g,
    'className="game-lobby-card w-full bg-white/20 backdrop-blur-3xl rounded-3xl p-5 sm:p-8 text-center border-2 border-white/40 overflow-hidden group relative"'
  );

  // 4. Inject <GameRandomButton /> into the lobby card
  if (!content.includes('<GameRandomButton />')) {
    content = content.replace(
      /(<div className="game-lobby-card[^>]+>)/g,
      '$1\n              <GameRandomButton />'
    );
  }

  if (isPremium) {
    // 5. Remove Premium badge
    content = content.replace(
      /<div className="absolute top-4 right-4 px-3 py-1 bg-amber-500\/20 rounded-full text-\[9px\] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">\s*<Crown size=\{10\} \/> Premium\s*<\/div>/g,
      ''
    );

    // 6. Make image container golden
    content = content.replace(
      /className="w-20 h-20 rounded-2xl mx-auto mb-8 border border-white\/30 relative overflow-hidden"/g,
      'className="w-20 h-20 rounded-2xl mx-auto mb-8 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.3)] relative overflow-hidden"'
    );
  }

  // 7. Make sure py-16 is adjusted to pt-4 pb-16 sm:py-16 to avoid overflowing on mobile
  content = content.replace(
    /className="h-full flex px-3 sm:px-4 py-16 overflow-y-auto"/g,
    'className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
