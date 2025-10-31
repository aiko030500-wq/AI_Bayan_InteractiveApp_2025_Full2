// ==============================
// 📘 AI Bayan — General English Trainer (10 modules, 72 questions)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".general-tabs .subtab");
  const titleEl = document.getElementById("genTitle");
  const instrEl = document.getElementById("genInstr");
  const contentEl = document.getElementById("genContent");
  const scoreEl = document.getElementById("genScore");
  const btnPrev = document.getElementById("genPrev");
  const btnNext = document.getElementById("genNext");
  if (!titleEl || !contentEl) return;

  // ------------------ DATA ------------------
  const DATA = {
    "mod-clock": {
      title: "🕒 Clocks (AM/PM)",
      instr: "Choose the correct time expression.",
      items: [
        { q: "07:15 — ?", options: ["seven fifteen AM", "seven fifteen PM", "quarter to seven", "quarter past eight"], a: 0 },
        { q: "09:30 — ?", options: ["half past nine AM", "half past nine PM", "nine to half", "half to nine"], a: 0 },
        { q: "6:45 PM — ?", options: ["quarter to six AM", "quarter to seven PM", "quarter past seven PM", "six forty-five AM"], a: 1 },
        { q: "12:00 at midday — ?", options: ["12:00 AM", "12:00 PM", "00:12 AM", "12 PM or noon"], a: 3 },
        { q: "10:05 — ?", options: ["five past ten", "ten past five", "five to ten", "ten to five"], a: 0 },
        { q: "“Twenty-five past three” — ?", options: ["03:35", "03:25", "03:45", "02:35"], a: 1 }
      ]
    },

    "mod-tobe": {
      title: "✅ Verb “to be”",
      instr: "Choose the correct form of the verb “to be”.",
      items: [
        { q: "I ___ a student.", options: ["am", "is", "are", "be"], a: 0 },
        { q: "They ___ happy.", options: ["am", "is", "are", "was"], a: 2 },
        { q: "He ___ at home yesterday.", options: ["were", "was", "are", "be"], a: 1 },
        { q: "We ___ in Astana last year.", options: ["was", "were", "is", "am"], a: 1 },
        { q: "This city ___ very old.", options: ["am", "is", "are", "were"], a: 1 },
        { q: "You ___ late for class.", options: ["is", "are", "am", "was"], a: 1 },
        { q: "There ___ a book on the table.", options: ["are", "is", "am", "be"], a: 1 },
        { q: "She ___ my best friend.", options: ["were", "is", "are", "be"], a: 1 }
      ]
    },

    "mod-phon": {
      title: "🔤 Phonetics (Vowels)",
      instr: "Pick the correct sound type.",
      items: [
        { q: "Type 1 (A = /eɪ/):", options: ["cat", "cake", "cap", "can"], a: 1 },
        { q: "Type 2 (short /æ/):", options: ["made", "mate", "cat", "late"], a: 2 },
        { q: "Type 3 (r-controlled /ɜː/):", options: ["bird", "bid", "bed", "bad"], a: 0 },
        { q: "Type 4 (silent e → long i):", options: ["rid", "ride", "read", "raid"], a: 1 },
        { q: "E says its name /iː/:", options: ["pet", "scene", "pen", "ten"], a: 1 },
        { q: "Silent e → long a:", options: ["hat", "hate", "had", "hut"], a: 1 },
        { q: "Short /ɪ/:", options: ["hit", "hide", "hike", "haze"], a: 0 },
        { q: "R-controlled /ɔːr/:", options: ["for", "foe", "far", "fire"], a: 0 }
      ]
    },

    "mod-silent": {
      title: "🤫 Silent Letters",
      instr: "Choose the word with the silent letter.",
      items: [
        { q: "Silent K:", options: ["knife", "king", "kid", "kite"], a: 0 },
        { q: "Silent B:", options: ["climb", "bribe", "cab", "tube"], a: 0 },
        { q: "Silent W:", options: ["write", "wet", "wife", "wide"], a: 0 },
        { q: "Silent GH:", options: ["night", "ghost", "roughly", "bright"], a: 0 },
        { q: "Silent T:", options: ["castle", "taste", "test", "tasty"], a: 0 },
        { q: "Silent L:", options: ["calm", "call", "cold", "coal"], a: 0 }
      ]
    },

    "mod-articles": {
      title: "🔹 Articles",
      instr: "Choose the correct article.",
      items: [
        { q: "I saw ___ interesting film.", options: ["a", "an", "the", "Ø"], a: 1 },
        { q: "She is ___ teacher.", options: ["a", "an", "the", "Ø"], a: 0 },
        { q: "___ Sun rises in the east.", options: ["A", "An", "The", "Ø"], a: 2 },
        { q: "We visited ___ UK.", options: ["a", "an", "the", "Ø"], a: 2 },
        { q: "I love ___ music.", options: ["a", "an", "the", "Ø"], a: 3 },
        { q: "He bought ___ umbrella and ___ apple.", options: ["a / a", "a / an", "an / a", "the / a"], a: 1 },
        { q: "She is playing ___ piano.", options: ["a", "an", "the", "Ø"], a: 2 },
        { q: "We need ___ sugar.", options: ["a", "an", "the", "Ø"], a: 3 }
      ]
    },

    "mod-phrasal": {
      title: "🧩 Phrasal Verbs",
      instr: "Pick the correct meaning.",
      items: [
        { q: "“put on” (a jacket):", options: ["remove", "wear", "repair", "close"], a: 1 },
        { q: "“take off” (a hat):", options: ["remove", "begin", "arrive", "improve"], a: 0 },
        { q: "“look after” a child:", options: ["search", "care for", "visit", "avoid"], a: 1 },
        { q: "“turn on” the TV:", options: ["start", "stop", "break", "carry"], a: 0 },
        { q: "“give up” smoking:", options: ["continue", "stop", "start", "share"], a: 1 },
        { q: "“pick up” new words:", options: ["learn casually", "throw away", "arrange", "put down"], a: 0 },
        { q: "“look for”:", options: ["search", "watch", "ignore", "prepare"], a: 0 },
        { q: "“run out of” time:", options: ["finish supply", "start quickly", "save more", "wait"], a: 0 }
      ]
    },

    "mod-syn": {
      title: "🧠 Synonyms",
      instr: "Choose the word with the same meaning.",
      items: [
        { q: "assist →", options: ["help", "hide", "hit", "hire"], a: 0 },
        { q: "rapid →", options: ["slow", "quick", "quiet", "rare"], a: 1 },
        { q: "purchase →", options: ["sell", "buy", "bring", "borrow"], a: 1 },
        { q: "elderly →", options: ["ancient", "old", "young", "tiny"], a: 1 },
        { q: "improve →", options: ["worsen", "enhance", "refuse", "remove"], a: 1 },
        { q: "require →", options: ["need", "note", "notice", "none"], a: 0 },
        { q: "reduce →", options: ["increase", "decrease", "declare", "defeat"], a: 1 }
      ]
    },

    "mod-ant": {
      title: "⚡ Antonyms",
      instr: "Choose the opposite meaning.",
      items: [
        { q: "polite →", options: ["rude", "calm", "kind", "quiet"], a: 0 },
        { q: "expand →", options: ["extend", "increase", "shrink", "show"], a: 2 },
        { q: "ancient →", options: ["modern", "normal", "middle", "minor"], a: 0 },
        { q: "permit →", options: ["allow", "forgive", "deny", "delay"], a: 2 },
        { q: "difficult →", options: ["hard", "easy", "rare", "safe"], a: 1 },
        { q: "include →", options: ["contain", "exclude", "insert", "explain"], a: 1 },
        { q: "visible →", options: ["invisible", "official", "pleasant", "possible"], a: 0 }
      ]
    },

    "mod-num": {
      title: "🔢 Numerals",
      instr: "Choose the correct numeral form.",
      items: [
        { q: "Which is ordinal?", options: ["twenty", "second", "hundred", "thirty"], a: 1 },
        { q: "1,504 →", options: ["one thousand five hundred four", "one five zero four", "fifteen hundred forty", "one thousand and five hundred"], a: 0 },
        { q: "21/03 →", options: ["the twenty-first of March", "twenty-one March", "twenty-first March", "the twenty-one of March"], a: 0 },
        { q: "Cardinal number:", options: ["third", "tenth", "eleven", "first"], a: 2 },
        { q: "08:00 →", options: ["eight o'clock", "eighteen", "eight and zero", "zero eight"], a: 0 },
        { q: "23rd →", options: ["twenty-threerd", "twenty-third", "twenty-three-th", "twentythird"], a: 1 }
      ]
    },

    "mod-plural": {
      title: "👥 Singular & Plural",
      instr: "Choose the correct form.",
      items: [
        { q: "child →", options: ["childs", "childes", "children", "childrens"], a: 2 },
        { q: "mouse →", options: ["mouses", "mice", "mouse", "mices"], a: 1 },
        { q: "two ___", options: ["mans", "men", "man", "mens"], a: 1 },
        { q: "many ___", options: ["information", "piece of information", "informations", "informationses"], a: 1 },
        { q: "tomato →", options: ["tomatos", "tomatoes", "tomatoe", "tomatoeses"], a: 1 },
        { q: "___ news is good.", options: ["These", "This", "Those", "They"], a: 1 },
        { q: "one sheep — two ___", options: ["sheeps", "sheep", "sheepses", "sheepes"], a: 1 },
        { q: "person →", options: ["persons", "peoples", "people", "persones"], a: 2 }
      ]
    }
  };

  // -----------------------------------------
  let current = "mod-clock", idx = 0, score = 0;

  function loadModule(key) {
    current = key;
    idx = 0;
    score = 0;
    scoreEl.textContent = score;
    render();
  }

  function render() {
    const mod = DATA[current];
    const q = mod.items[idx];
    titleEl.textContent = mod.title;
    instrEl.textContent = mod.instr;
    contentEl.innerHTML = `
      <h3>${idx + 1}/${mod.items.length}</h3>
      <p>${q.q}</p>
      ${q.options.map((opt, i) => `<button class="option" data-i="${i}">${opt}</button>`).join("")}
    `;
    document.querySelectorAll(".option").forEach(btn => {
      btn.onclick = () => {
        const choice = parseInt(btn.dataset.i);
        if (choice === q.a) {
          score++;
          scoreEl.textContent = score;
          popStar?.();
          btn.classList.add("correct");
        } else btn.classList.add("wrong");
        setTimeout(nextQ, 500);
      };
    });
  }

  function nextQ() {
    const mod = DATA[current];
    if (++idx < mod.items.length) render();
    else contentEl.innerHTML = `<h3>🎉 Finished ${mod.title}</h3><p>Your score: ${score}/${mod.items.length}</p>`;
  }

  btnNext.onclick = nextQ;
  btnPrev.onclick = () => { if (idx > 0) idx--; render(); };
  tabs.forEach(t => t.onclick = () => { tabs.forEach(b => b.classList.remove("active")); t.classList.add("active"); loadModule(t.dataset.sub); });
  loadModule(current);
});
