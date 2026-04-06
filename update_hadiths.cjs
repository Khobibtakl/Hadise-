const fs = require('fs');

const newHadiths = [
  {
    "id": 1,
    "title": "Core Hadith 1",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 2,
    "title": "Core Hadith 2",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 3,
    "title": "Core Hadith 3",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 4,
    "title": "Core Hadith 4",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 5,
    "title": "Core Hadith 5",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 6,
    "title": "Core Hadith 6",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 7,
    "title": "Core Hadith 7",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 8,
    "title": "Core Hadith 8",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 9,
    "title": "Core Hadith 9",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 10,
    "title": "Core Hadith 10",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 11,
    "title": "Core Hadith 11",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 12,
    "title": "Core Hadith 12",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 13,
    "title": "Core Hadith 13",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 14,
    "title": "Core Hadith 14",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 15,
    "title": "Core Hadith 15",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 16,
    "title": "Core Hadith 16",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 17,
    "title": "Core Hadith 17",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 18,
    "title": "Core Hadith 18",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 19,
    "title": "Core Hadith 19",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 20,
    "title": "Core Hadith 20",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "Faith",
    "reference": "Bukhari / Muslim",
    "explanation": "دا حديث د ايمان، اخلاقو او اسلامي ژوند مهم اصول بيانوي."
  },
  {
    "id": 21,
    "title": "Hadith 21",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 22,
    "title": "Hadith 22",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 23,
    "title": "Hadith 23",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 24,
    "title": "Hadith 24",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 25,
    "title": "Hadith 25",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 26,
    "title": "Hadith 26",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 27,
    "title": "Hadith 27",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 28,
    "title": "Hadith 28",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 29,
    "title": "Hadith 29",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 30,
    "title": "Hadith 30",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 31,
    "title": "Hadith 31",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 32,
    "title": "Hadith 32",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 33,
    "title": "Hadith 33",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 34,
    "title": "Hadith 34",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 35,
    "title": "Hadith 35",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 36,
    "title": "Hadith 36",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 37,
    "title": "Hadith 37",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 38,
    "title": "Hadith 38",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 39,
    "title": "Hadith 39",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 40,
    "title": "Hadith 40",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 41,
    "title": "Hadith 41",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 42,
    "title": "Hadith 42",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 43,
    "title": "Hadith 43",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 44,
    "title": "Hadith 44",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 45,
    "title": "Hadith 45",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 46,
    "title": "Hadith 46",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 47,
    "title": "Hadith 47",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 48,
    "title": "Hadith 48",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 49,
    "title": "Hadith 49",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 50,
    "title": "Hadith 50",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 51,
    "title": "Hadith 51",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 52,
    "title": "Hadith 52",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 53,
    "title": "Hadith 53",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 54,
    "title": "Hadith 54",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 55,
    "title": "Hadith 55",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 56,
    "title": "Hadith 56",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 57,
    "title": "Hadith 57",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 58,
    "title": "Hadith 58",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 59,
    "title": "Hadith 59",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 60,
    "title": "Hadith 60",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 61,
    "title": "Hadith 61",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 62,
    "title": "Hadith 62",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 63,
    "title": "Hadith 63",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 64,
    "title": "Hadith 64",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 65,
    "title": "Hadith 65",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 66,
    "title": "Hadith 66",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 67,
    "title": "Hadith 67",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 68,
    "title": "Hadith 68",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 69,
    "title": "Hadith 69",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 70,
    "title": "Hadith 70",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 71,
    "title": "Hadith 71",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 72,
    "title": "Hadith 72",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 73,
    "title": "Hadith 73",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 74,
    "title": "Hadith 74",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 75,
    "title": "Hadith 75",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 76,
    "title": "Hadith 76",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 77,
    "title": "Hadith 77",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 78,
    "title": "Hadith 78",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 79,
    "title": "Hadith 79",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 80,
    "title": "Hadith 80",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 81,
    "title": "Hadith 81",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 82,
    "title": "Hadith 82",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 83,
    "title": "Hadith 83",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 84,
    "title": "Hadith 84",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 85,
    "title": "Hadith 85",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 86,
    "title": "Hadith 86",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 87,
    "title": "Hadith 87",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 88,
    "title": "Hadith 88",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 89,
    "title": "Hadith 89",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 90,
    "title": "Hadith 90",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 91,
    "title": "Hadith 91",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 92,
    "title": "Hadith 92",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 93,
    "title": "Hadith 93",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 94,
    "title": "Hadith 94",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 95,
    "title": "Hadith 95",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 96,
    "title": "Hadith 96",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 97,
    "title": "Hadith 97",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 98,
    "title": "Hadith 98",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 99,
    "title": "Hadith 99",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  },
  {
    "id": 100,
    "title": "Hadith 100",
    "arabic": "قَالَ رَسُولُ اللَّهِ ﷺ",
    "translation": "رسول الله صلی الله عليه وسلم وفرمايل",
    "category": "General",
    "reference": "Various",
    "explanation": "دا حديث د اسلامي لارښوونو، ښه اخلاقو او د ژوند د سمې لارې ښوونه کوي."
  }
];

const existingHadiths = JSON.parse(fs.readFileSync('src/data/hadiths.json', 'utf8'));

// We want to keep the existing 20 hadiths and append the new ones, or replace them?
// The user provided IDs 1 to 100.
// Let's just merge them. If ID exists in existingHadiths, keep existing, otherwise add new.
// Actually, the user's list is just placeholders.
// Let's format the user's list into the correct format.

const formattedHadiths = newHadiths.map(h => {
  const existing = existingHadiths.find(e => e.id === h.id);
  if (existing) {
    return existing;
  }
  return {
    id: h.id,
    title: {
      en: h.title,
      ps: h.title,
      fa: h.title
    },
    category: {
      en: h.category,
      ps: h.category,
      fa: h.category
    },
    arabic: h.arabic,
    translation: {
      en: h.translation,
      ps: h.translation,
      fa: h.translation
    },
    explanation: {
      en: h.explanation,
      ps: h.explanation,
      fa: h.explanation
    },
    reference: {
      en: h.reference,
      ps: h.reference,
      fa: h.reference
    },
    source: h.reference.split(' / ')[0] || "Various"
  };
});

fs.writeFileSync('src/data/hadiths.json', JSON.stringify(formattedHadiths, null, 2));
