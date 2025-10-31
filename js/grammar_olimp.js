// ==============================
// 🏅 AI Bayan Grammar Olympiad — A2 Full (18 topics × 4 questions = 72)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const olimpContent = document.getElementById("olimpContent");
  const olimpScore = document.getElementById("olimpScore");
  const btnPrev = document.getElementById("oPrev");
  const btnNext = document.getElementById("oNext");
  if (!olimpContent) return;

  let current = 0;
  let score = 0;

  // ===== Questions =====
  const olimpData = [
    // 1️⃣ Present Simple
    { topic: "Present Simple", q: "She ___ to school every day.", options: ["go", "goes", "is going", "going"], a: 1 },
    { topic: "Present Simple", q: "They ___ football on Sundays.", options: ["play", "plays", "playing", "played"], a: 0 },
    { topic: "Present Simple", q: "I ___ tea in the morning.", options: ["drink", "drinks", "drinking", "drank"], a: 0 },
    { topic: "Present Simple", q: "He ___ not like coffee.", options: ["do", "does", "is", "did"], a: 1 },

    // 2️⃣ Present Continuous
    { topic: "Present Continuous", q: "She ___ to music now.", options: ["listen", "listening", "is listening", "are listening"], a: 2 },
    { topic: "Present Continuous", q: "They ___ TV at the moment.", options: ["watch", "is watching", "are watching", "watches"], a: 2 },
    { topic: "Present Continuous", q: "He ___ dinner right now.", options: ["have", "having", "is having", "has"], a: 2 },
    { topic: "Present Continuous", q: "I ___ my homework now.", options: ["do", "am doing", "doing", "did"], a: 1 },

    // 3️⃣ Past Simple
    { topic: "Past Simple", q: "They ___ a movie yesterday.", options: ["watch", "watched", "watching", "watches"], a: 1 },
    { topic: "Past Simple", q: "He ___ his homework last night.", options: ["do", "did", "does", "doing"], a: 1 },
    { topic: "Past Simple", q: "We ___ to the park yesterday.", options: ["go", "went", "gone", "going"], a: 1 },
    { topic: "Past Simple", q: "I ___ breakfast at 8 a.m.", options: ["had", "have", "having", "has"], a: 0 },

    // 4️⃣ Future Simple
    { topic: "Future Simple", q: "I think it ___ rain tomorrow.", options: ["is", "was", "will", "are"], a: 2 },
    { topic: "Future Simple", q: "They ___ travel next week.", options: ["will", "are", "were", "was"], a: 0 },
    { topic: "Future Simple", q: "She ___ call you later.", options: ["will", "is", "was", "were"], a: 0 },
    { topic: "Future Simple", q: "We ___ see the movie tonight.", options: ["are", "will", "was", "were"], a: 1 },

    // 5️⃣ Used to
    { topic: "Used to", q: "I ___ play football when I was a child.", options: ["use", "used to", "am used to", "was used to"], a: 1 },
    { topic: "Used to", q: "He ___ smoke, but he stopped.", options: ["use to", "used to", "uses to", "using to"], a: 1 },
    { topic: "Used to", q: "They ___ live here long ago.", options: ["used to", "use to", "are used to", "were used to"], a: 0 },
    { topic: "Used to", q: "I’m not ___ getting up early.", options: ["use to", "used to", "used", "used for"], a: 1 },

    // 6️⃣ Word Order
    { topic: "Word Order", q: "___ you like coffee?", options: ["Like do", "Do like", "Do you", "You do"], a: 2 },
    { topic: "Word Order", q: "Where ___ you live?", options: ["do", "does", "are", "is"], a: 0 },
    { topic: "Word Order", q: "___ they go to school every day?", options: ["Does", "Do", "Are", "Is"], a: 1 },
    { topic: "Word Order", q: "What ___ she doing?", options: ["is", "does", "did", "do"], a: 0 },

    // 7️⃣ Types of Questions
    { topic: "Types of Questions", q: "___ are you from?", options: ["Where", "When", "What", "Why"], a: 0 },
    { topic: "Types of Questions", q: "___ is your name?", options: ["Where", "What", "How", "Who"], a: 1 },
    { topic: "Types of Questions", q: "___ you like pizza?", options: ["Does", "Do", "Did", "Are"], a: 1 },
    { topic: "Types of Questions", q: "___ is your birthday?", options: ["When", "Where", "Who", "Why"], a: 0 },

    // 8️⃣ Comparatives / Superlatives
    { topic: "Comparatives", q: "Mount Everest is ___ mountain in the world.", options: ["the higher", "higher", "the highest", "high"], a: 2 },
    { topic: "Comparatives", q: "My car is ___ than yours.", options: ["fast", "faster", "the fastest", "fastly"], a: 1 },
    { topic: "Comparatives", q: "This book is ___ than that one.", options: ["good", "better", "best", "more good"], a: 1 },
    { topic: "Comparatives", q: "Winter is ___ than summer.", options: ["cold", "colder", "coldest", "more cold"], a: 1 },

    // 9️⃣ Too / Enough
    { topic: "Too / Enough", q: "It’s not warm ___ to swim.", options: ["too", "enough", "so", "very"], a: 1 },
    { topic: "Too / Enough", q: "She is ___ young to drive.", options: ["too", "enough", "so", "very"], a: 0 },
    { topic: "Too / Enough", q: "I don’t have ___ money.", options: ["enough", "too", "some", "many"], a: 0 },
    { topic: "Too / Enough", q: "The room is ___ small for us.", options: ["too", "enough", "very", "little"], a: 0 },

    // 🔟 Gerunds & Infinitives
    { topic: "Gerunds & Infinitives", q: "She enjoys ___ books.", options: ["read", "to read", "reading", "reads"], a: 2 },
    { topic: "Gerunds & Infinitives", q: "I want ___ a doctor.", options: ["be", "to be", "being", "was"], a: 1 },
    { topic: "Gerunds & Infinitives", q: "They finished ___ dinner.", options: ["eat", "eating", "to eat", "ate"], a: 1 },
    { topic: "Gerunds & Infinitives", q: "He decided ___ abroad.", options: ["go", "to go", "going", "gone"], a: 1 },

    // 11️⃣ Modal Verbs
    { topic: "Modal Verbs", q: "You ___ study harder for the exam.", options: ["can", "must", "may", "will"], a: 1 },
    { topic: "Modal Verbs", q: "I ___ swim when I was 5.", options: ["could", "can", "must", "might"], a: 0 },
    { topic: "Modal Verbs", q: "May I ___ in?", options: ["come", "to come", "coming", "came"], a: 0 },
    { topic: "Modal Verbs", q: "You ___ eat so much cake!", options: ["shouldn't", "must", "can", "will"], a: 0 },

    // 12️⃣ Prepositions
    { topic: "Prepositions", q: "The cat is ___ the table.", options: ["in", "on", "at", "to"], a: 1 },
    { topic: "Prepositions", q: "He was born ___ May.", options: ["in", "on", "at", "by"], a: 0 },
    { topic: "Prepositions", q: "We meet ___ 8 o’clock.", options: ["in", "on", "at", "to"], a: 2 },
    { topic: "Prepositions", q: "They live ___ London.", options: ["at", "in", "on", "to"], a: 1 },

    // 13️⃣ Conditionals
    { topic: "Conditionals", q: "If it rains, we ___ stay at home.", options: ["will", "would", "are", "have"], a: 0 },
    { topic: "Conditionals", q: "If I were you, I ___ do it.", options: ["will", "would", "am", "can"], a: 1 },
    { topic: "Conditionals", q: "If I see her, I ___ tell her.", options: ["will", "would", "am", "can"], a: 0 },
    { topic: "Conditionals", q: "If they studied, they ___ pass.", options: ["will", "would", "can", "could"], a: 1 },

    // 14️⃣ Passive Voice
    { topic: "Passive Voice", q: "The letter ___ yesterday.", options: ["is sent", "was sent", "sends", "will send"], a: 1 },
    { topic: "Passive Voice", q: "This house ___ in 1990.", options: ["was built", "build", "is building", "has built"], a: 0 },
    { topic: "Passive Voice", q: "The food ___ by the chef.", options: ["is cooked", "cook", "was cooking", "cooked"], a: 0 },
    { topic: "Passive Voice", q: "The book ___ by a famous writer.", options: ["is written", "writes", "was write", "write"], a: 0 },

    // 15️⃣ Reported Speech
    { topic: "Reported Speech", q: "He said he ___ tired.", options: ["is", "was", "were", "will be"], a: 1 },
    { topic: "Reported Speech", q: "She said she ___ to Paris.", options: ["goes", "had gone", "went", "go"], a: 1 },
    { topic: "Reported Speech", q: "They said they ___ hungry.", options: ["are", "were", "was", "will"], a: 1 },
    { topic: "Reported Speech", q: "He said he ___ finish it tomorrow.", options: ["will", "would", "shall", "can"], a: 1 },

    // 16️⃣ Phrasal Verbs
    { topic: "Phrasal Verbs", q: "Please ___ your shoes before entering.", options: ["take off", "take on", "put off", "get up"], a: 0 },
    { topic: "Phrasal Verbs", q: "He ___ early every day.", options: ["gets up", "takes off", "goes out", "puts on"], a: 0 },
    { topic: "Phrasal Verbs", q: "Turn ___ the lights, please.", options: ["off", "on", "up", "down"], a: 1 },
    { topic: "Phrasal Verbs", q: "Look ___ that word in the dictionary.", options: ["up", "for", "at", "after"], a: 0 },

    // 17️⃣ Articles
    { topic: "Articles", q: "I bought ___ apple and ___ banana.", options: ["a / a", "an / a", "the / the", "a / the"], a: 1 },
    { topic: "Articles", q: "___ sun rises in the east.", options: ["A", "An", "The", "-"], a: 2 },
    { topic: "Articles", q: "She is ___ doctor.", options: ["a", "the", "-", "an"], a: 0 },
    { topic: "Articles", q: "___ water is important for life.", options: ["A", "An", "The", "-"], a: 3 },

    // 18️⃣ Active Voice
    { topic: "Active Voice", q: "She ___ the cake herself.", options: ["was baked", "bake", "bakes", "is bake"], a: 2 },
    { topic: "Active Voice", q: "They ___ a song now.", options: ["sing", "sang", "are singing", "sings"], a: 2 },
    { topic: "Active Voice", q: "He ___ homework every evening.", options: ["do", "did", "does", "done"], a: 2 },
    { topic: "Active Voice", q: "We ___ English at school.", options: ["study", "studies", "studied", "studying"], a: 0 }
  ];

  // ===== Functions =====
  function showOlimpQuestion() {
    const q = olimpData[current];
    olimpContent.innerHTML = `
      <h3>${current + 1}. <span class="topic">${q.topic}</span></h3>
      <p class="question">${q.q}</p>
      <div class="options">
        ${q.options
          .map((opt, i) => `<button class="option" data-i="${i}">${String.fromCharCode(97 + i)}) ${opt}</button>`)
          .join("")}
      </div>
      <p class="progress">Question ${current + 1} of ${olimpData.length}</p>
    `;
    olimpScore.textContent = score;

    document.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.i);
        if (index === q.a) {
          score++;
          olimpScore.textContent = score;
          popStar();
          if (index === q.a) { score++; popStar(); addScore("Grammar", 1); }
        }
        setTimeout(() => {
          if (current < olimpData.length - 1) {
            current++;
            showOlimpQuestion();
          } else showFinish();
        }, 300);
      });
    });
  }

  function showFinish() {
    olimpContent.innerHTML = `
      <h2>🎉 You’ve completed the Olympiad!</h2>
      <p>Your total score: <b>${score}</b> / ${olimpData.length}</p>
      <button onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  btnNext.addEventListener("click", () => {
    if (current < olimpData.length - 1) {
      current++;
      showOlimpQuestion();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showOlimpQuestion();
    }
  });

  showOlimpQuestion();
});
