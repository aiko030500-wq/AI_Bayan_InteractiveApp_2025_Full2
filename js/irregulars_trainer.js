// ==============================
// 📘 AI Bayan — Irregular Verbs Trainer (A2–B1)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("irregularsContent");
  const scoreEl = document.getElementById("irregularsScore");
  const btnPrev = document.getElementById("irPrev");
  const btnNext = document.getElementById("irNext");

  if (!box) return;

  let i = 0;
  let score = 0;

  const verbs = [
    ["be", "was/were", "been", "быть"],
    ["begin", "began", "begun", "начинать"],
    ["break", "broke", "broken", "ломать"],
    ["bring", "brought", "brought", "приносить"],
    ["build", "built", "built", "строить"],
    ["buy", "bought", "bought", "покупать"],
    ["catch", "caught", "caught", "ловить"],
    ["choose", "chose", "chosen", "выбирать"],
    ["come", "came", "come", "приходить"],
    ["do", "did", "done", "делать"],
    ["drink", "drank", "drunk", "пить"],
    ["drive", "drove", "driven", "водить (машину)"],
    ["eat", "ate", "eaten", "есть"],
    ["find", "found", "found", "находить"],
    ["fly", "flew", "flown", "летать"],
    ["forget", "forgot", "forgotten", "забывать"],
    ["get", "got", "got", "получать"],
    ["give", "gave", "given", "давать"],
    ["go", "went", "gone", "идти"],
    ["have", "had", "had", "иметь"],
    ["know", "knew", "known", "знать"],
    ["leave", "left", "left", "уходить"],
    ["make", "made", "made", "делать, создавать"],
    ["meet", "met", "met", "встречать"],
    ["read", "read", "read", "читать"],
    ["run", "ran", "run", "бежать"],
    ["say", "said", "said", "говорить"],
    ["see", "saw", "seen", "видеть"],
    ["send", "sent", "sent", "посылать"],
    ["sing", "sang", "sung", "петь"],
    ["sit", "sat", "sat", "сидеть"],
    ["sleep", "slept", "slept", "спать"],
    ["speak", "spoke", "spoken", "говорить"],
    ["swim", "swam", "swum", "плавать"],
    ["take", "took", "taken", "брать"],
    ["teach", "taught", "taught", "учить"],
    ["tell", "told", "told", "рассказывать"],
    ["think", "thought", "thought", "думать"],
    ["write", "wrote", "written", "писать"],
  ];

  function render() {
    const v = verbs[i];
    const form = Math.floor(Math.random() * 3);
    let question, correct, answers;

    if (form === 0) {
      question = `What is the <b>Past Simple</b> form of “${v[0]}”?`;
      correct = v[1];
      answers = shuffle([v[1], v[2], v[0]]);
    } else if (form === 1) {
      question = `What is the <b>Past Participle</b> of “${v[0]}”?`;
      correct = v[2];
      answers = shuffle([v[2], v[1], v[0]]);
    } else {
      question = `Translate the verb “${v[0]}” into Russian.`;
      correct = v[3];
      const distractors = shuffle(verbs).slice(0, 2).map(x => x[3]);
      answers = shuffle([correct, ...distractors]);
    }

    box.innerHTML = `
      <h3>${i + 1}. Irregular Verb</h3>
      <div class="question card">
        <p>${question}</p>
        <div class="options">
          ${answers.map((a, k) => `<button class="opt" data-a="${a}">${String.fromCharCode(65 + k)}. ${a}</button>`).join("")}
        </div>
      </div>
      <div class="progress">Verb ${i + 1} of ${verbs.length}</div>
    `;
    scoreEl.textContent = score;

    box.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const choice = e.currentTarget.dataset.a;
        if (choice === correct) {
          score++;
          scoreEl.textContent = score;
          if (window.popStar) popStar();
        }
        setTimeout(() => nextVerb(), 400);
      });
    });
  }

  function shuffle(a) {
    return a.sort(() => Math.random() - 0.5);
  }

  function nextVerb() {
    if (i < verbs.length - 1) {
      i++;
      render();
    } else {
      finish();
    }
  }

  function finish() {
    box.innerHTML = `
      <h2>🎉 All done!</h2>
      <p>⭐ Your score: <b>${score}</b> / ${verbs.length}</p>
      <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  btnPrev.addEventListener("click", () => {
    if (i > 0) {
      i--;
      render();
    }
  });

  btnNext.addEventListener("click", () => {
    if (i < verbs.length - 1) {
      i++;
      render();
    }
  });

  render();
});
