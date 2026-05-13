import fs from 'fs';
import path from 'path';

// 1. Change color from emerald to blue in all ts/tsx files
function replaceColor(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColor(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/emerald/g, 'blue');
      
      // Also fix safe area top insets for top navigation bars
      // Finding the top sticky bar
      if (content.includes('sticky top-0')) {
        content = content.replace(/px-6 py-6/, 'px-6 pt-[calc(env(safe-area-inset-top,20px)+1.5rem)] pb-6');
      }
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceColor('./src');

// Fix Layout.tsx separately for the top/bottom safe areas
const layoutPath = 'src/components/Layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');
layout = layout.replace(/py-3 pb-safe/, 'py-3 pb-[calc(env(safe-area-inset-bottom,20px)+0.75rem)]');
fs.writeFileSync(layoutPath, layout);

// 2. Combine the new hadiths into the json array
const jsonPath = 'src/data/hadiths.json';
const existingHadiths = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const existingIds = new Set(existingHadiths.map((h: any) => h.id));

const newHadithsRaw = `{"id":12,"metadata":{"id":12,"length":40,"arabic":{"title":"أربعون ولي الله الدهلوي","author":"الشاه ولي الدين الدهلوي","introduction":""},"english":{"title":"د شاه ولي الله څلوېښت حدیثونه","author":"شاه ولي الله دهلوي","introduction":""}},"chapters":[{"id":0,"bookId":12,"arabic":"أربعون شاه ولي الله الدهلوي","english":"د شاه ولي الله دهلوي څلوېښت حدیثونه"}],"hadiths":[{"id":41026,"idInBook":1,"chapterId":0,"bookId":12,"arabic":"لَیْسَ الْخَبَرُ کَالْمُعَایَنَةِ","english":{"narrator":"","text":"خبر د لیدلو په شان نه دی."}},{"id":41027,"idInBook":2,"chapterId":0,"bookId":12,"arabic":"الْحَرْبُ خُدَعَةٌ","english":{"narrator":"","text":"جګړه چل ده."}},{"id":41028,"idInBook":3,"chapterId":0,"bookId":12,"arabic":"الْمُسْلِمُ مِرْآةُ الْمُسْلِمِ","english":{"narrator":"","text":"مسلمان د مسلمان آینه ده."}},{"id":41029,"idInBook":4,"chapterId":0,"bookId":12,"arabic":"الْمُسْتَشَارُ مُؤتَمَنٌ","english":{"narrator":"","text":"هغه څوک چې مشوره ترې وغوښتل شي، هغه باوري (امانت دار) دی."}},{"id":41030,"idInBook":5,"chapterId":0,"bookId":12,"arabic":"الدَّالُّ عَلَی الْخَیْرِ کَفَاعِلِهِ","english":{"narrator":"","text":"نیکۍ ته لارښوونه کوونکی د نیکۍ کوونکي په شان دی."}},{"id":41031,"idInBook":6,"chapterId":0,"bookId":12,"arabic":"إِسْتَعِیْنُوْا عَلَی الْحَوَائِجِ بِالْکِتْمَانِ","english":{"narrator":"","text":"په حاجتونو (کارونو) کې د پټ ساتلو په واسطه مرسته وغواړئ."}},{"id":41032,"idInBook":7,"chapterId":0,"bookId":12,"arabic":"إِتَّقُوْا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ","english":{"narrator":"","text":"له اور (دوزخ) نه ځان وساتئ، که څه هم د یوې نیمې کجورې په واسطه وي."}},{"id":41033,"idInBook":8,"chapterId":0,"bookId":12,"arabic":"الدُّنْیَا سِجْنُ الْمُؤمِنِ وَ جَنَّةُ الْکَافِرِ","english":{"narrator":"","text":"دنیا د مؤمن بندخونه او د کافر جنت دی."}},{"id":41034,"idInBook":9,"chapterId":0,"bookId":12,"arabic":"الْحَیَاءُ خَیْرٌ کُلُّهُ","english":{"narrator":"","text":"شرم ټول ښه دی."}},{"id":41035,"idInBook":10,"chapterId":0,"bookId":12,"arabic":"عِدَةُ الْمُؤمِنِ کَاَخْذِ الْکَفِّ","english":{"narrator":"","text":"د مؤمن وعده د لاس د نیولو (تړون) په شان ده."}},{"id":41036,"idInBook":11,"chapterId":0,"bookId":12,"arabic":"لَا یَحِلُّ لِمُؤمِنٍ اَنْ یَّجْهَرَ أخَاهُ فَوقَ ثَلَاثَةِ أیَّامٍ","english":{"narrator":"","text":"د مؤمن لپاره حلاله نه ده چې له خپل ورور سره له دریو ورځو نه زیات (اړیکې) پرې کړي."}},{"id":41037,"idInBook":12,"chapterId":0,"bookId":12,"arabic":"لَیْسَ مِنَّا مَنْ غَشَّنَا","english":{"narrator":"","text":"هغه څوک چې مونږ سره چل (دغل) وکړي، زمونږ نه دی."}},{"id":41038,"idInBook":13,"chapterId":0,"bookId":12,"arabic":"مَا قَلَّ وَكَفَى خَيْرٌ مِمَّا كَثُرَ وَأَلْهَى","english":{"narrator":"","text":"هغه لږ څه چې بسنه وکړي، د هغه زیات څه نه غوره دی چې غافل کړي."}},{"id":41039,"idInBook":14,"chapterId":0,"bookId":12,"arabic":"الرَّاجِعُ فِيْ هِبَتِهِ کَالرَّاجِعِ فِيْ قَیْئِهِ","english":{"narrator":"","text":"څوک چې خپله بخښنه (هدیه) بېرته واخلي، هغه د هغه چا په شان دی چې خپل قے بېرته خوري."}},{"id":41040,"idInBook":15,"chapterId":0,"bookId":12,"arabic":"الْبَلَاءُ مُوَکِّلٌ بِالْمَنْطِقِ","english":{"narrator":"","text":"بلا له وینا (خبرو) سره تړلې ده."}},{"id":41041,"idInBook":16,"chapterId":0,"bookId":12,"arabic":"النَّاسُ کَأسْنَانِ الْمُشْطِ","english":{"narrator":"","text":"خلک د کنگھی د غاښونو په شان دي."}},{"id":41042,"idInBook":17,"chapterId":0,"bookId":12,"arabic":"الْغِنَى غِنَى النَّفْسِ","english":{"narrator":"","text":"شتمني د نفس شتمني ده."}},{"id":41043,"idInBook":18,"chapterId":0,"bookId":12,"arabic":"الْسَّعِیْدُ مَنْ وُّعِظَ بِغَیْرِهِ","english":{"narrator":"","text":"نیکمرغه هغه څوک دی چې د بل (په بلا) نصیحت واخلي."}},{"id":41044,"idInBook":19,"chapterId":0,"bookId":12,"arabic":"وَ إِنَّ مِنَ الشِّعْرِ لَحِکْمَةً وَاِنَّ مِنَ الْبَیَانِ لَسِحْرًا","english":{"narrator":"","text":"او یقیناً په شعر کې حکمت دی او یقیناً په بیان کې جادو دی."}},{"id":41045,"idInBook":20,"chapterId":0,"bookId":12,"arabic":"عَفْوُ الْمُلُوْكِ إِبْقَاءٌ لِلْمُلْكِ","english":{"narrator":"","text":"د بادشاهانو بخښنه د سلطنت ساتنه ده."}},{"id":41046,"idInBook":21,"chapterId":0,"bookId":12,"arabic":"اَلْمَرْءُ مَعَ مَنْ أَحَبَّ","english":{"narrator":"","text":"سړی د هغه چا سره دی چې یې مینه کوي."}},{"id":41047,"idInBook":22,"chapterId":0,"bookId":12,"arabic":"مَا هَلَكَ إمْرُؤٌ عَرَفَ قَدْرَهُ","english":{"narrator":"","text":"هغه سړی چې خپل ارزښت وپیژني، هلاک نه شو."}},{"id":41048,"idInBook":23,"chapterId":0,"bookId":12,"arabic":"اَلْوَلَدُ لِلْفِرَاشِ وَ لِلْعَاهِرِ الْحَجَرُ","english":{"narrator":"","text":"اولاد د بستر (خاوند) ته دی او زناکار ته ډبره (سنگسار) ده."}},{"id":41049,"idInBook":24,"chapterId":0,"bookId":12,"arabic":"الْیَدُ الْعُلْیَا خَیْرٌ مِّنَ الْیَدِ السُّفْلَی","english":{"narrator":"","text":"پورتنۍ لاس (ورکوونکی) د ښکتنۍ لاس (اخیستونکي) نه غوره دی."}},{"id":41050,"idInBook":25,"chapterId":0,"bookId":12,"arabic":"لَا شَکَرَ اللهَ مَنْ لَّا یَشْکُرُ النَّاسَ","english":{"narrator":"","text":"هغه څوک چې د خلکو شکر نه کوي، د الله شکر نه دی کړی."}},{"id":41051,"idInBook":26,"chapterId":0,"bookId":12,"arabic":"حُبُّكَ الشَّيْءَ یُعْمِيْ وَ یُصِمُّ","english":{"narrator":"","text":"ستا د یو شي مینه ړوند او کوڼ کوي."}},{"id":41052,"idInBook":27,"chapterId":0,"bookId":12,"arabic":"جُبِلَتِ الْقُلُوبُ عَلی حُبَّ مَنْ اَحْسَنَ اِلَیْهَا وَ بُغْضِ مَنْ اَسَاءَ اِلَیْهَا","english":{"narrator":"","text":"زړونه د هغه چا د مینې پر باندې پیدا شوي دي چې له دوی سره نیکي کوي، او د هغه چا د کرکې پر باندې چې له دوی سره بدي کوي."}},{"id":41053,"idInBook":28,"chapterId":0,"bookId":12,"arabic":"الْتَّائِبُ مِنَ الذَّنْبِ کَمَنْ لَا ذَنْبَ لَهُ","english":{"narrator":"","text":"ګناه نه توبه کوونکی د هغه چا په شان دی چې هېڅ ګناه ورسره نه وي."}},{"id":41054,"idInBook":29,"chapterId":0,"bookId":12,"arabic":"الشَّاهِدُ یَرَی مَا لَا یَرَاهُ الْغَائِبُ","english":{"narrator":"","text":"حاضر (شاهد) هغه څه ویني چې غیر حاضر (غائب) نه ویني."}},{"id":41055,"idInBook":30,"chapterId":0,"bookId":12,"arabic":"اِذا جَاءَکُمْ کَرِیْمُ قَوْمٍ فَاَکْرِمُوهُ","english":{"narrator":"","text":"کله چې تاسو ته د یو قوم مشر (نیک کس) راشي، نو د هغه عزت وکړئ."}},{"id":41056,"idInBook":31,"chapterId":0,"bookId":12,"arabic":"الْیَمِینُ الْفَاجِرَةُ تَدَعُ الدِّیَارَ الْبَلَاقِعَ","english":{"narrator":"","text":"دروغجن قسم ځایونه ويجاړوي."}},{"id":41057,"idInBook":32,"chapterId":0,"bookId":12,"arabic":"مَنْ قُتِلَ دُونَ مَالِهِ فَهُوَ شَهِیْدٌ","english":{"narrator":"","text":"څوک چې د خپل مال د ساتنې لپاره ووژل شي، نو هغه شهید دی."}},{"id":41058,"idInBook":33,"chapterId":0,"bookId":12,"arabic":"الْاَعْمَالُ بِالنِّیَّةِ","english":{"narrator":"","text":"اعمال له نیتونو سره تړلي دي."}},{"id":41059,"idInBook":34,"chapterId":0,"bookId":12,"arabic":"سَیِّدُ الْقَوْمِ خَادِمُهُمْ","english":{"narrator":"","text":"د قوم مشر د دوی خدمتګار دی."}},{"id":41060,"idInBook":35,"chapterId":0,"bookId":12,"arabic":"خَیْرُ الْأُمُوْرِ أَوْسَطُهَا","english":{"narrator":"","text":"د کارونو غوره هغه ده چې معتدل (منځنی) وي."}},{"id":41061,"idInBook":36,"chapterId":0,"bookId":12,"arabic":"اَللَّهُمَّ بَارِكْ فِیْ أُمَّتِیْ فِی بُکُوْرِهَا یَوْمَ الْخَمِیْسِ","english":{"narrator":"","text":"ای الله! زما په امت کې د پنجشنبې په ورځ په سهار وختي برکت کړه."}},{"id":41062,"idInBook":37,"chapterId":0,"bookId":12,"arabic":"کَادَ الْفَقْرُ أَنْ یَکُوْنَ کُفْرًا","english":{"narrator":"","text":"بې وزلي نږدې ده چې کفر شي."}},{"id":41063,"idInBook":38,"chapterId":0,"bookId":12,"arabic":"الْسَّفَرُ قِطْعَةٌ مِّنَ الْعَذَابِ","english":{"narrator":"","text":"سفر د عذاب یوه برخه ده."}},{"id":41064,"idInBook":39,"chapterId":0,"bookId":12,"arabic":"خَیْرُ زَّادِ الْتَّقْوَی","english":{"narrator":"","text":"تر ټولو غوره توشه تقوی ده."}},{"id":41065,"idInBook":40,"chapterId":0,"bookId":12,"arabic":"الْمَجَالِسُ بِالْاَمَانَةِ","english":{"narrator":"","text":"مجلسونه امانت دي."}}]}`;
const newData = JSON.parse(newHadithsRaw);

for (const h of newData.hadiths) {
  if (!existingIds.has(h.id)) {
    existingHadiths.push({
      id: h.id,
      categoryId: newData.metadata.id,
      category: newData.metadata.english.title,
      arabic: h.arabic,
      pashto: h.english.text
    });
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(existingHadiths, null, 2));

console.log('Done replacement!');
