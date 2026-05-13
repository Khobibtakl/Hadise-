import fs from 'fs';

// 1. Settings.tsx
const settingsPath = 'src/pages/Settings.tsx';
let settings = fs.readFileSync(settingsPath, 'utf8');
settings = settings.replace(/حبيب تكل/g, 'خبيب تکل');
fs.writeFileSync(settingsPath, settings);

// 2. Data
const jsonPath = 'src/data/hadiths.json';
const hadiths = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
hadiths.forEach((h: any, i: number) => {
  h.id = i + 1;
  h.idInBook = i + 1; 
});
fs.writeFileSync(jsonPath, JSON.stringify(hadiths, null, 2));
console.log("Updated name and numbered hadiths sequentially");
