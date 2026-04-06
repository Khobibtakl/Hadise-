import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateHadiths() {
  const existingHadiths = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/hadiths.json'), 'utf-8'));
  const currentCount = existingHadiths.length;
  const needed = 100 - currentCount;
  
  if (needed <= 0) {
    console.log('Already have 100 hadiths.');
    return;
  }

  console.log(`Generating ${needed} hadiths...`);

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Generate ${needed} authentic Hadiths of Prophet Muhammad (PBUH). 
    Do not include any hadiths that are already in this list of titles: ${existingHadiths.map((h: any) => h.title.en).join(', ')}.
    Return the result as a JSON array of objects.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER, description: "Unique ID starting from " + (currentCount + 1) },
            title: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                ps: { type: Type.STRING, description: "Pashto translation" },
                fa: { type: Type.STRING, description: "Persian translation" }
              },
              required: ["en", "ps", "fa"]
            },
            category: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                ps: { type: Type.STRING },
                fa: { type: Type.STRING }
              },
              required: ["en", "ps", "fa"]
            },
            arabic: { type: Type.STRING, description: "Original Arabic text of the Hadith" },
            translation: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                ps: { type: Type.STRING },
                fa: { type: Type.STRING }
              },
              required: ["en", "ps", "fa"]
            },
            explanation: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                ps: { type: Type.STRING },
                fa: { type: Type.STRING }
              },
              required: ["en", "ps", "fa"]
            },
            reference: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                ps: { type: Type.STRING },
                fa: { type: Type.STRING }
              },
              required: ["en", "ps", "fa"]
            },
            source: { type: Type.STRING, description: "e.g., Bukhari, Muslim, Tirmidhi" }
          },
          required: ["id", "title", "category", "arabic", "translation", "explanation", "reference", "source"]
        }
      }
    }
  });

  const newHadiths = JSON.parse(response.text || '[]');
  const allHadiths = [...existingHadiths, ...newHadiths];
  
  // Fix IDs
  allHadiths.forEach((h, i) => {
    h.id = i + 1;
  });

  fs.writeFileSync(path.join(process.cwd(), 'src/data/hadiths.json'), JSON.stringify(allHadiths, null, 2));
  console.log(`Successfully generated and saved ${newHadiths.length} hadiths.`);
}

generateHadiths().catch(console.error);
