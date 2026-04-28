const fs = require('fs');

// 1. Update Navigation.tsx
let navContent = fs.readFileSync('components/Navigation.tsx', 'utf8');
navContent = navContent.replace(
  'className="w-7 h-7 object-contain shrink-0"',
  'className="w-7 h-7 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"'
);
fs.writeFileSync('components/Navigation.tsx', navContent, 'utf8');

// 2. Update Home.tsx
let homeContent = fs.readFileSync('pages/Home.tsx', 'utf8');
homeContent = homeContent.replace(
  'className="w-[82%] h-[82%] object-contain"',
  'className="w-[82%] h-[82%] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"'
);
fs.writeFileSync('pages/Home.tsx', homeContent, 'utf8');

// 3. Update build.cjs
let buildContent = fs.readFileSync('blog/build.cjs', 'utf8');
buildContent = buildContent.replace(
  '<img src="/png/STYLE/explorecapitals-globe-favicon-new.png" alt="ExploreCapitals" width="28" height="28" />',
  '<img src="/png/STYLE/explorecapitals-globe-favicon-new.png" alt="ExploreCapitals" width="28" height="28" style="filter: drop-shadow(0 0 6px rgba(255,255,255,0.8));" />'
);
fs.writeFileSync('blog/build.cjs', buildContent, 'utf8');

console.log('Added glow.');
