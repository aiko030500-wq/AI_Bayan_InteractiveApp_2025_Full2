// ==============================
// 📘 AI Bayan — General English Trainer (v2025)
// Includes 11 modules: Irregulars + 10 topics
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const genTitle = document.getElementById("genTitle");
  const genInstr = document.getElementById("genInstr");
  const genContent = document.getElementById("genContent");
  const genScore = document.getElementById("genScore");
  const nextBtn = document.getElementById("genNext");
  const prevBtn = document.getElementById("genPrev");

  if (!genContent) return;

  // 🌟 Score and question control
  let currentQ = 0;
  let score = 0;
  let currentModule = "mod-irregulars";

  // ======================
  // MODULE DATA
  // ======================
  const modules = {};

  // 1️⃣ Irregular Verbs
  modules["mod-irregulars"] = {
    title: "🔁 Irregular Verbs",
    instr: "Choose the correct past form of each verb:",
    data: [
      { q: "go → ?", options: ["went", "goed", "gone", "goes"], a: 0 },
      { q: "see → ?", options: ["saw", "seed", "seen", "see"], a: 0 },
      { q: "come → ?", options: ["came", "comed", "comes", "come"], a: 0 },
      { q: "eat → ?", options: ["ate", "eated", "eaten", "eat"], a: 0 },
      { q: "write → ?", options: ["wrote", "writed", "writes", "write"], a: 0 },
      { q: "run → ?", options: ["ran", "runned", "run", "running"], a: 0 }
    ]
  };

  // 2️⃣ Clock
  modules["mod-clock"] = {
    title: "🕒 Clock & Time",
    instr: "Choose the correct time expression:",
    data: [
      { q: "07:30 = ?", options: ["half past seven", "seven and half", "thirty seven", "seven thirty past"], a: 0 },
      { q: "15:15 = ?", options: ["quarter past three", "three fifteen", "quarter to three", "fifteen three"], a: 0 },
      { q: "20:45 = ?", options: ["quarter to nine", "nine quarter", "twenty forty-five", "eight quarter"], a: 0 },
      { q: "12:00 = ?", options: ["twelve o’clock", "midday clock", "twelve sharp", "half twelve"], a: 0 },
    ]
  };

  // 3️⃣ To Be
  modules["mod-tobe"] = {
    title: "✅ Verb To Be",
    instr: "Choose the correct form of ‘to be’:",
    data: [
      { q: "I ___ a student.", options: ["is", "are", "am", "be"], a: 2 },
      { q: "They ___ happy.", options: ["is", "are", "am", "was"], a: 1 },
      { q: "She ___ at home.", options: ["are", "is", "am", "were"], a: 1 },
      { q: "We ___ friends.", options: ["am", "is", "are", "been"], a: 2 },
    ]
  };

  // 4️⃣ Phonetics
  modules["mod-phon"] = {
    title: "🔤 Phonetics — Sounds",
    instr: "Choose the word with the same sound:",
    data: [
      { q: "‘Cat’ rhymes with:", options: ["hat", "cut", "cot", "caught"], a: 0 },
      { q: "‘See’ sounds like:", options: ["tree", "tea", "say", "sea"], a: 3 },
      { q: "‘Book’ rhymes with:", options: ["look", "cook", "took", "all"], a: 0 },
      { q: "‘Fine’ rhymes with:", options: ["nine", "fan", "none", "find"], a: 0 },
    ]
  };

  // 5️⃣ Silent Letters
  modules["mod-silent"] = {
    title: "🤫 Silent Letters",
    instr: "Choose the word with a silent letter:",
    data: [
      { q: "Which has a silent 'k'?", options: ["know", "king", "kite", "key"], a: 0 },
      { q: "Which has a silent 'w'?", options: ["write", "water", "wait", "white"], a: 0 },
      { q: "Which has a silent 'b'?", options: ["climb", "bomb", "cab", "baby"], a: 0 },
      { q: "Which has a silent 'g'?", options: ["sign", "green", "go", "give"], a: 0 },
    ]
  };

  // 6️⃣ Articles
  modules["mod-articles"] = {
    title: "🔹 Articles (a/an/the)",
    instr: "Choose the correct article:",
    data: [
      { q: "I saw ___ elephant.", options: ["a", "an", "the", "no article"], a: 1 },
      { q: "He bought ___ car yesterday.", options: ["a", "an", "the", "no article"], a: 0 },
      { q: "___ sun is bright today.", options: ["a", "an", "the", "no article"], a: 2 },
      { q: "She doesn’t like ___ milk.", options: ["a", "an", "the", "no article"], a: 3 },
    ]
  };

  // 7️⃣ Phrasal Verbs
  modules["mod-phrasal"] = {
    title: "🧩 Phrasal Verbs",
    instr: "Choose the correct phrasal meaning:",
    data: [
      { q: "Turn off", options: ["switch off", "run away", "go out", "look after"], a: 0 },
      { q: "Look after", options: ["care for", "find", "search", "see"], a: 0 },
      { q: "Give up", options: ["stop trying", "donate", "stand up", "go down"], a: 0 },
      { q: "Wake up", options: ["open eyes", "sleep", "stand", "go to bed"], a: 0 },
    ]
  };

  // 8️⃣ Synonyms
  modules["mod-syn"] = {
    title: "🧠 Synonyms",
    instr: "Choose the word with similar meaning:",
    data: [
      { q: "Big", options: ["large", "small", "tiny", "thin"], a: 0 },
      { q: "Happy", options: ["sad", "glad", "mad", "angry"], a: 1 },
      { q: "Quick", options: ["fast", "slow", "late", "lazy"], a: 0 },
      { q: "Begin", options: ["start", "end", "finish", "close"], a: 0 },
    ]
  };

  // 9️⃣ Antonyms
  modules["mod-ant"] = {
    title: "⚡ Antonyms",
    instr: "Choose the opposite word:",
    data: [
      { q: "Hot", options: ["cold", "warm", "wet", "dry"], a: 0 },
      { q: "Old", options: ["new", "young", "modern", "fresh"], a: 0 },
      { q: "Easy", options: ["hard", "light", "soft", "low"], a: 0 },
      { q: "Up", options: ["down", "top", "over", "under"], a: 0 },
    ]
  };

  // 🔟 Numerals
  modules["mod-num"] = {
    title: "🔢 Numerals",
    instr: "Choose the correct number form:",
    data: [
      { q: "15th", options: ["fifteen", "fifteenth", "fifty", "five teen"], a: 1 },
      { q: "21st", options: ["twenty-one", "twenty-first", "twenty one-th", "twenty firsts"], a: 1 },
      { q: "100", options: ["hundred", "hundreds", "one hundred", "a hundredth"], a: 2 },
      { q: "1000", options: ["thousand", "one thousand", "a thousandth", "thousands"], a: 1 },
    ]
  };

  // 11️⃣ Plural Nouns
  modules["mod-plural"] = {
    title: "👥 Plural Nouns",
    instr: "Choose the correct plural form:",
    data: [
      { q: "Child → ?", options: ["childs", "children", "childes", "childrens"], a: 1 },
      { q: "Foot → ?", options: ["foots", "feets", "feet", "footes"], a: 2 },
      { q: "Man → ?", options: ["mans", "mens", "man", "men"], a: 3 },
      { q: "Mouse → ?", options: ["mouses", "mice", "mouse", "meese"], a: 1 },
    ]
  };

  // ======================
  // RENDER FUNCTION
  // ======================
  function showQuestion() {
    const mod = modules[currentModule];
    const q = mod.data[currentQ];
    genTitle.textContent = mod.title;
    genInstr.textContent = mod.instr;
    genContent.innerHTML = `
      <h3>${currentQ + 1}. ${q.q}</h3>
      ${q.options
        .map(
          (opt, i) =>
            `<button class="genOpt" data-i="${i}">${opt}</button>`
        )
        .join("<br>")}
      <p class="progress">Question ${currentQ + 1} of ${mod.data.length}</p>
    `;
    genScore.textContent = score;
    document.querySelectorAll(".genOpt").forEach((b) => {
      b.onclick = () => checkAnswer(parseInt(b.dataset.i));
    });
  }

  function checkAnswer(i) {
    const mod = modules[currentModule];
    if (i === mod.data[currentQ].a) {
      score++;
      genScore.textContent = score;
      popStar();
      if (right) { score++; popStar(); addScore("General", 1); }
    }
    if (currentQ < mod.data.length - 1) {
      currentQ++;
      showQuestion();
    } else {
      genContent.innerHTML = `<h3>🎉 Module Complete!</h3>
      <p>Your score: ${score} / ${mod.data.length}</p>`;
    }
  }

  // NAVIGATION BUTTONS
  nextBtn.onclick = () => {
    if (currentQ < modules[currentModule].data.length - 1) {
      currentQ++;
      showQuestion();
    }
  };
  prevBtn.onclick = () => {
    if (currentQ > 0) {
      currentQ--;
      showQuestion();
    }
  };

  // TAB SWITCHING
  document.querySelectorAll(".subtab").forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll(".subtab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentModule = tab.getAttribute("data-sub");
      currentQ = 0;
      score = 0;
      showQuestion();
    };
  });

  // INIT
  showQuestion();
});
