const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Fix text-white/40 to text-white/70 for the description paragraph in start screen
  if (content.includes('text-white/40 text-[10px] mb-6')) {
    content = content.replace(/text-white\/40 text-\[10px\] mb-6/g, 'text-white/70 text-[10px] mb-6');
    changed = true;
  }

  // 2. Fix GameNavigationButtons being inside the button wrapper
  // We'll use a regex that matches:
  // <div className="flex flex-col gap-6 w-full">
  //   <Button ...>...</Button>
  //   <GameNavigationButtons />
  // </div>
  // and changes it to have the </div> before GameNavigationButtons.
  
  const badStructureRegex = /(<div\s+className="flex\s+flex-col\s+gap-6\s+w-full">[\s\S]*?(?:<\/Button>))(\s*<GameNavigationButtons\s*\/>\s*)(<\/div>)/g;
  
  if (badStructureRegex.test(content)) {
    content = content.replace(badStructureRegex, '$1$3$2');
    changed = true;
  }
  
  // Also fix if there are multiple GameNavigationButtons in the file (e.g. game over screen)
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', file);
  }
}
