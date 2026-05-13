import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/pages/Home.tsx',
  'src/pages/Settings.tsx',
  'src/pages/Daily.tsx',
  'src/pages/Favorites.tsx',
  'src/components/Layout.tsx',
  'src/components/Splash.tsx',
  'src/components/HadithCard.tsx'
];

for (const p of filesToUpdate) {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/blue-50(?!0)/g, 'primary-50');
  content = content.replace(/blue-100/g, 'primary-100');
  content = content.replace(/blue-200/g, 'primary-200');
  content = content.replace(/blue-400/g, 'primary-400');
  content = content.replace(/blue-500/g, 'primary-500');
  content = content.replace(/blue-600/g, 'primary-600');
  content = content.replace(/blue-800/g, 'primary-800');
  content = content.replace(/blue-900/g, 'primary-900');
  fs.writeFileSync(p, content);
}

// Ensure the types module is updated
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes('theme: string;')) {
  typesContent = typesContent.replace('isDarkMode: boolean;', 'isDarkMode: boolean;\n  theme: string;\n  setTheme: (theme: string) => void;');
  fs.writeFileSync('src/types.ts', typesContent);
}

console.log("Updated blue to primary!");
