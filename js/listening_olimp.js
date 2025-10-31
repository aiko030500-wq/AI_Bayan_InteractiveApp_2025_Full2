// ==============================
// 🎧 AI Bayan — Listening Olympiad (A2–B1)
// 10 аудио из репо + вопросы, мгновенная проверка, ⭐, автопереход
// Требует: #listeningContent, #listeningScore, #lPrev, #lNext и window.popStar()
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const box     = document.getElementById("listeningContent");
  const scoreEl = document.getElementById("listeningScore");
  const btnPrev = document.getElementById("lPrev");
  const btnNext = document.getElementById("lNext");
  if (!box) return;

  let i = 0; // трек
  let q = 0; // вопрос

  let score = 0;

  // 10 треков (названия и вопросы — дарын-стиль, A2–B1)
  const data = [
    {
      title: "1) At the Library",
      src: "library.mp3",
      qs: [
        { q: "Where is the speaker?", options: ["At the library", "At the airport", "At a shop", "At school"], a: 0 },
        { q: "True/False: The place is quiet.", type: "tf", a: true },
        { q: "What do visitors usually do there?", options: ["Play football", "Read and study", "Cook meals", "Sing songs"], a: 1 }
      ]
    },
    {
      title: "2) The Weather Report",
      src: "weather.mp3",
      qs: [
        { q: "What is the weather like?", options: ["Rainy", "Sunny and warm", "Snowy", "Windy"], a: 1 },
        { q: "True/False: The speaker advises to take an umbrella.", type: "tf", a: false }
      ]
    },
    {
      title: "3) Airport Announcement",
      src: "airport.mp3",
      qs: [
        { q: "Where are the people?", options: ["In a cinema", "At the airport", "At a restaurant", "At home"], a: 1 },
        { q: "True/False: The announcement mentions boarding.", type: "tf", a: true }
      ]
    },
    {
      title: "4) Morning Routine",
      src: "morning.mp3",
      qs: [
        { q: "What is the main topic?", options: ["Evening plans", "Morning routine", "Holiday trip", "School rules"], a: 1 },
        { q: "True/False: The person has breakfast.", type: "tf", a: true }
      ]
    },
    {
      title: "5) A Trip to the Zoo",
      src: "zoo.mp3",
      qs: [
        { q: "Where are the children?", options: ["At the park", "At the zoo", "At school", "At home"], a: 1 },
        { q: "True/False: They see animals.", type: "tf", a: true }
      ]
    },
    {
      title: "6) In the Classroom",
      src: "classroom.mp3",
      qs: [
        { q: "What are the students doing?", options: ["Cooking", "Reading/Studying", "Running", "Sleeping"], a: 1 },
        { q: "True/False: It is noisy like a stadium.", type: "tf", a: false }
      ]
    },
    {
      title: "7) Visiting Grandma",
      src: "grandma.mp3",
      qs: [
        { q: "Who are they visiting?", options: ["Their teacher", "Their grandma", "A neighbour", "A friend"], a: 1 },
        { q: "True/False: They bring something sweet.", type: "tf", a: true }
      ]
    },
    {
      title: "8) At the Restaurant",
      src: "restaurant.mp3",
      qs: [
        { q: "Where are the people?", options: ["At the airport", "At home", "At a restaurant", "In a shop"], a: 2 },
        { q: "True/False: They talk about a menu.", type: "tf", a: true }
      ]
    },
    {
      title: "9) Birthday Party",
      src: "party.mp3",
      qs: [
        { q: "What is the event?", options: ["A lesson", "A concert", "A birthday party", "A trip"], a: 2 },
        { q: "True/False: There is music.", type: "tf", a: true }
      ]
    },
    {
      title: "10) Shopping Day",
      src: "shopping.mp3",
      qs: [
        { q: "Where is the woman?", options: ["In a park", "At home", "At the shopping mall", "In the kitchen"], a: 2 },
        { q: "True/False: She buys nothing.", type: "tf", a: false }
      ]
    }
  ];

  function render() {
    const t = data[i];
    const item = t.qs[q];
    const isTF = item.type === "tf";

    box.innerHTML = `
      <h3>${t.title}</h3>
      <audio controls src="${t.src}" style="width:100%; margin:8px 0;"></audio>

      <div class="question card">
        <p><b>Q${q + 1}.</b> ${item.q}</p>
        <div class="options">
          ${
            isTF
              ? `<button class="opt" data-i="true">True</button>
                 <button class="opt" data-i="false">False</button>`
              : item.options.map((opt, k)=>`<button class="opt" data-i="${k}">${String.fromCharCode(65+k)}. ${opt}</button>`).join("")
          }
        </div>
      </div>
      <div class="progress">Track ${i + 1} of ${data.length} — Question ${q + 1} of ${t.qs.length}</div>
    `;
    scoreEl.textContent = score;

    box.querySelectorAll(".opt").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        if (isTF) {
          const val = (e.currentTarget.dataset.i === "true");
          if (val === item.a) { score++; scoreEl.textContent = score; if (window.popStar) popStar(); }
        } else {
          const idx = parseInt(e.currentTarget.dataset.i,10);
          if (idx === item.a) { score++; scoreEl.textContent = score; if (window.popStar) popStar(); }
        }
        nextStep();
      });
    });
  }

  function nextStep() {
    const t = data[i];
    if (q < t.qs.length - 1) {
      q++; render();
    } else if (i < data.length - 1) {
      i++; q = 0; render();
    } else {
      finish();
    }
  }

  function finish() {
    const total = data.reduce((s,t)=> s + t.qs.length, 0);
    box.innerHTML = `
      <h2>🎧 Listening complete!</h2>
      <p>⭐ Your score: <b>${score}</b> / ${total}</p>
      <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  btnPrev && btnPrev.addEventListener("click", ()=>{
    if (q > 0) {
      q--; render();
    } else if (i > 0) {
      i--; q = data[i].qs.length - 1; render();
    }
  });

  btnNext && btnNext.addEventListener("click", ()=>{
    const t = data[i];
    if (q < t.qs.length - 1 || i < data.length - 1) {
      nextStep();
    }
  });

  render();
});
