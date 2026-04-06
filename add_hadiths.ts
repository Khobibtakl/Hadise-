import fs from 'fs';
import path from 'path';

const newHadiths = [
  {
    "id": 11,
    "title": { "en": "The Importance of Prayer", "ps": "د لمانځه اهمیت", "fa": "اهمیت نماز" },
    "category": { "en": "Prayer", "ps": "لمونځ", "fa": "نماز" },
    "arabic": "بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلاَةِ",
    "translation": {
      "en": "Between a man and polytheism and disbelief is the abandonment of prayer.",
      "ps": "د سړي او شرک او کفر تر منځ د لمانځه پریښودل دي.",
      "fa": "بین انسان و شرک و کفر ترک نماز است."
    },
    "explanation": {
      "en": "Prayer is a fundamental pillar of Islam and a key distinction between belief and disbelief.",
      "ps": "لمونځ د اسلام یو بنسټیز رکن دی او د ایمان او کفر تر منځ یو مهم توپیر دی.",
      "fa": "نماز رکن اساسی اسلام و تفاوت کلیدی بین ایمان و کفر است."
    },
    "reference": { "en": "Sahih Muslim 82", "ps": "صحیح مسلم ۸۲", "fa": "صحیح مسلم ۸۲" },
    "source": "Muslim"
  },
  {
    "id": 12,
    "title": { "en": "Patience in Adversity", "ps": "په سختیو کې صبر", "fa": "صبر در سختی‌ها" },
    "category": { "en": "Patience", "ps": "صبر", "fa": "صبر" },
    "arabic": "عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ",
    "translation": {
      "en": "How wonderful is the case of a believer; there is good for him in everything and this applies only to a believer. If prosperity attends him, he expresses gratitude to Allah and that is good for him; and if adversity befalls him, he endures it patiently and that is better for him.",
      "ps": "د مؤمن کار څومره د حیرانتیا دی؛ د هغه لپاره په هر څه کې خیر دی او دا یوازې د مؤمن لپاره دی. که ورته خوښي ورسیږي، د الله شکر ادا کوي او دا د هغه لپاره خیر دی؛ او که ورته سختی ورسیږي، صبر کوي او دا د هغه لپاره غوره دی.",
      "fa": "چقدر شگفت‌انگیز است کار مؤمن؛ در هر چیزی برای او خیر است و این فقط برای مؤمن صدق می‌کند. اگر به او خوشی برسد، شکر خدا را به جا می‌آورد و این برای او خیر است؛ و اگر به او سختی برسد، صبر می‌کند و این برای او بهتر است."
    },
    "explanation": {
      "en": "A believer's life is always filled with good, whether they are experiencing joy (which leads to gratitude) or hardship (which leads to patience).",
      "ps": "د مؤمن ژوند تل له خیر څخه ډک وي، که هغه خوښي تجربه کوي (چې د شکر لامل کیږي) یا سختی (چې د صبر لامل کیږي).",
      "fa": "زندگی مؤمن همیشه پر از خیر است، چه در حال تجربه شادی باشد (که منجر به شکرگزاری می‌شود) و چه در حال سختی (که منجر به صبر می‌شود)."
    },
    "reference": { "en": "Sahih Muslim 2999", "ps": "صحیح مسلم ۲۹۹۹", "fa": "صحیح مسلم ۲۹۹۹" },
    "source": "Muslim"
  },
  {
    "id": 13,
    "title": { "en": "The Value of Time", "ps": "د وخت ارزښت", "fa": "ارزش زمان" },
    "category": { "en": "Life", "ps": "ژوند", "fa": "زندگی" },
    "arabic": "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ الصِّحَّةُ وَالْفَرَاغُ",
    "translation": {
      "en": "There are two blessings which many people lose: (They are) Health and free time for doing good.",
      "ps": "دوه نعمتونه دي چې ډیری خلک یې له لاسه ورکوي: (هغه) روغتیا او د ښو کارونو لپاره خالي وخت دی.",
      "fa": "دو نعمت وجود دارد که بسیاری از مردم آن‌ها را از دست می‌دهند: (آن‌ها) سلامتی و وقت آزاد برای انجام کارهای خوب است."
    },
    "explanation": {
      "en": "Health and free time are precious gifts from Allah that are often taken for granted until they are lost. We should use them wisely.",
      "ps": "روغتیا او خالي وخت د الله له لوري ارزښتناکې ډالۍ دي چې ډیری وختونه له پامه غورځول کیږي تر هغه چې له لاسه لاړ شي. موږ باید له دوی څخه په هوښیارۍ سره کار واخلو.",
      "fa": "سلامتی و وقت آزاد هدایای گرانبهایی از جانب خداوند هستند که اغلب تا زمانی که از دست نروند، نادیده گرفته می‌شوند. ما باید از آن‌ها عاقلانه استفاده کنیم."
    },
    "reference": { "en": "Sahih al-Bukhari 6412", "ps": "صحیح البخاري ۶۴۱۲", "fa": "صحیح بخاری ۶۴۱۲" },
    "source": "Bukhari"
  },
  {
    "id": 14,
    "title": { "en": "Honesty in Trade", "ps": "په سوداګرۍ کې صداقت", "fa": "صداقت در تجارت" },
    "category": { "en": "Business", "ps": "سوداګري", "fa": "تجارت" },
    "arabic": "الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا فَإِنْ صَدَقَا وَبَيَّنَا بُورِكَ لَهُمَا فِي بَيْعِهِمَا وَإِنْ كَتَمَا وَكَذَبَا مُحِقَتْ بَرَكَةُ بَيْعِهِمَا",
    "translation": {
      "en": "The buyer and the seller have the option of canceling or confirming the bargain unless they separate, and if they spoke the truth and made clear the defects of the goods, then they would be blessed in their bargain, and if they told lies and hid some facts, their bargain would be deprived of Allah's blessings.",
      "ps": "پیرودونکی او پلورونکی د معاملې د لغوه کولو یا تاییدولو اختیار لري تر هغه چې دوی جلا نشي، او که دوی رښتیا وویل او د توکو نیمګړتیاوې یې روښانه کړې، نو د دوی معامله به برکت ولري، او که دوی دروغ وویل او ځینې حقایق یې پټ کړل، د دوی معامله به د الله له برکت څخه بې برخې شي.",
      "fa": "خریدار و فروشنده تا زمانی که از هم جدا نشده‌اند، اختیار فسخ یا تأیید معامله را دارند، و اگر راست بگویند و عیوب کالا را روشن کنند، معامله آن‌ها پربرکت خواهد بود، و اگر دروغ بگویند و حقایقی را پنهان کنند، معامله آن‌ها از برکت خداوند محروم خواهد شد."
    },
    "explanation": {
      "en": "Honesty and transparency are essential in business transactions. Deceit removes the blessing from one's earnings.",
      "ps": "په سوداګریزو معاملو کې صداقت او روڼتیا اړینه ده. فریب د انسان له عاید څخه برکت لرې کوي.",
      "fa": "صداقت و شفافیت در معاملات تجاری ضروری است. فریب، برکت را از درآمد انسان دور می‌کند."
    },
    "reference": { "en": "Sahih al-Bukhari 2079", "ps": "صحیح البخاري ۲۰۷۹", "fa": "صحیح بخاری ۲۰۷۹" },
    "source": "Bukhari"
  },
  {
    "id": 15,
    "title": { "en": "Respect for Parents", "ps": "د والدینو درناوی", "fa": "احترام به والدین" },
    "category": { "en": "Family", "ps": "کورنۍ", "fa": "خانواده" },
    "arabic": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
    "translation": {
      "en": "The Lord's pleasure is in the parent's pleasure, and the Lord's anger is in the parent's anger.",
      "ps": "د رب خوښي د پلار په خوښي کې ده، او د رب غوسه د پلار په غوسه کې ده.",
      "fa": "رضایت پروردگار در رضایت والدین است و خشم پروردگار در خشم والدین است."
    },
    "explanation": {
      "en": "Treating parents with utmost respect and kindness is a direct way to earn Allah's pleasure.",
      "ps": "له والدینو سره په ډیر درناوي او مهربانۍ چلند کول د الله د خوښۍ ترلاسه کولو مستقیمه لار ده.",
      "fa": "رفتار با والدین با نهایت احترام و مهربانی راهی مستقیم برای کسب رضایت خداوند است."
    },
    "reference": { "en": "Jami` at-Tirmidhi 1899", "ps": "جامع الترمذي ۱۸۹۹", "fa": "جامع ترمذی ۱۸۹۹" },
    "source": "Tirmidhi"
  },
  {
    "id": 16,
    "title": { "en": "The Best of You", "ps": "په تاسو کې تر ټولو غوره", "fa": "بهترین شما" },
    "category": { "en": "Family", "ps": "کورنۍ", "fa": "خانواده" },
    "arabic": "خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ وَأَنَا خَيْرُكُمْ لأَهْلِي",
    "translation": {
      "en": "The best of you is the one who is best to his family, and I am the best of you to my family.",
      "ps": "په تاسو کې تر ټولو غوره هغه څوک دی چې له خپلې کورنۍ سره تر ټولو ښه وي، او زه په تاسو کې له خپلې کورنۍ سره تر ټولو ښه یم.",
      "fa": "بهترین شما کسی است که با خانواده‌اش بهترین باشد، و من بهترین شما با خانواده‌ام هستم."
    },
    "explanation": {
      "en": "True character is shown in how one treats their own family members behind closed doors.",
      "ps": "رښتینی شخصیت په دې کې ښکاري چې یو څوک د تړلو دروازو شاته د خپلې کورنۍ له غړو سره څنګه چلند کوي.",
      "fa": "شخصیت واقعی در نحوه رفتار فرد با اعضای خانواده‌اش در پشت درهای بسته نشان داده می‌شود."
    },
    "reference": { "en": "Jami` at-Tirmidhi 3895", "ps": "جامع الترمذي ۳۸۹۵", "fa": "جامع ترمذی ۳۸۹۵" },
    "source": "Tirmidhi"
  },
  {
    "id": 17,
    "title": { "en": "Controlling Anger", "ps": "د غوسې کنټرول", "fa": "کنترل خشم" },
    "category": { "en": "Manners", "ps": "اخلاق", "fa": "اخلاق" },
    "arabic": "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    "translation": {
      "en": "The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.",
      "ps": "قوي هغه څوک نه دی چې د خپل ځواک په واسطه پر خلکو بریالی شي، بلکې قوي هغه څوک دی چې د غوسې پر مهال خپل ځان کنټرول کړي.",
      "fa": "قوی کسی نیست که با قدرت خود بر مردم غلبه کند، بلکه قوی کسی است که در هنگام خشم خود را کنترل کند."
    },
    "explanation": {
      "en": "True strength lies in self-control and emotional regulation, not physical power.",
      "ps": "رښتینی ځواک په ځان کنټرول او احساساتي تنظیم کې دی، نه په فزیکي ځواک کې.",
      "fa": "قدرت واقعی در خودکنترلی و تنظیم احساسات نهفته است، نه قدرت فیزیکی."
    },
    "reference": { "en": "Sahih al-Bukhari 6114", "ps": "صحیح البخاري ۶۱۱۴", "fa": "صحیح بخاری ۶۱۱۴" },
    "source": "Bukhari"
  },
  {
    "id": 18,
    "title": { "en": "The Importance of Cleanliness", "ps": "د پاکوالي اهمیت", "fa": "اهمیت پاکیزگی" },
    "category": { "en": "Faith", "ps": "ایمان", "fa": "ایمان" },
    "arabic": "الطُّهُورُ شَطْرُ الإِيمَانِ",
    "translation": {
      "en": "Cleanliness is half of faith.",
      "ps": "پاکوالی د ایمان نیمایي برخه ده.",
      "fa": "پاکیزگی نیمی از ایمان است."
    },
    "explanation": {
      "en": "Physical and spiritual purity are deeply intertwined in Islam. Maintaining cleanliness is a core aspect of a believer's life.",
      "ps": "په اسلام کې فزیکي او روحاني پاکوالی په ژوره توګه تړلي دي. د پاکوالي ساتل د مؤمن د ژوند یو بنسټیز اړخ دی.",
      "fa": "پاکی جسمی و روحی در اسلام عمیقاً در هم تنیده شده‌اند. حفظ پاکیزگی یکی از جنبه‌های اصلی زندگی مؤمن است."
    },
    "reference": { "en": "Sahih Muslim 223", "ps": "صحیح مسلم ۲۲۳", "fa": "صحیح مسلم ۲۲۳" },
    "source": "Muslim"
  },
  {
    "id": 19,
    "title": { "en": "Helping Others", "ps": "له نورو سره مرسته", "fa": "کمک به دیگران" },
    "category": { "en": "Charity", "ps": "صدقه", "fa": "صدقه" },
    "arabic": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    "translation": {
      "en": "Allah is helping the servant as long as the servant is helping his brother.",
      "ps": "الله د بنده په مرسته کې دی تر هغه چې بنده د خپل ورور په مرسته کې وي.",
      "fa": "خداوند در کمک به بنده است تا زمانی که بنده در کمک به برادرش باشد."
    },
    "explanation": {
      "en": "Aids and support from Allah are granted to those who actively help and support their fellow human beings.",
      "ps": "د الله له لوري مرسته او ملاتړ هغو کسانو ته ورکول کیږي چې په فعاله توګه د خپلو همنوعانو سره مرسته او ملاتړ کوي.",
      "fa": "کمک و حمایت خداوند به کسانی اعطا می‌شود که فعالانه به همنوعان خود کمک و حمایت می‌کنند."
    },
    "reference": { "en": "Sahih Muslim 2699", "ps": "صحیح مسلم ۲۶۹۹", "fa": "صحیح مسلم ۲۶۹۹" },
    "source": "Muslim"
  },
  {
    "id": 20,
    "title": { "en": "Speaking Good or Remaining Silent", "ps": "ښه ویل یا چوپ پاتې کیدل", "fa": "خوب گفتن یا سکوت کردن" },
    "category": { "en": "Manners", "ps": "اخلاق", "fa": "اخلاق" },
    "arabic": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    "translation": {
      "en": "He who believes in Allah and the Last Day must either speak good or remain silent.",
      "ps": "څوک چې پر الله او د آخرت پر ورځ ایمان لري باید یا ښه ووایي یا چوپ پاتې شي.",
      "fa": "کسی که به خدا و روز قیامت ایمان دارد باید یا سخن نیک بگوید یا سکوت کند."
    },
    "explanation": {
      "en": "Guarding one's tongue is crucial. If you cannot say something beneficial or kind, it is better to say nothing at all.",
      "ps": "د خپلې ژبې ساتل خورا مهم دي. که تاسو نشئ کولی یو ګټور یا مهربان شی ووایاست، نو غوره ده چې هیڅ ونه وایئ.",
      "fa": "محافظت از زبان بسیار مهم است. اگر نمی‌توانید چیز مفید یا مهربانانه‌ای بگویید، بهتر است اصلاً چیزی نگویید."
    },
    "reference": { "en": "Sahih al-Bukhari 6018", "ps": "صحیح البخاري ۶۰۱۸", "fa": "صحیح بخاری ۶۰۱۸" },
    "source": "Bukhari"
  }
];

const existingHadiths = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/hadiths.json'), 'utf-8'));
const allHadiths = [...existingHadiths, ...newHadiths];

fs.writeFileSync(path.join(process.cwd(), 'src/data/hadiths.json'), JSON.stringify(allHadiths, null, 2));
console.log('Added 10 more hadiths.');
