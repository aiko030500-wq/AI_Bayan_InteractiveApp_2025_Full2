// ==============================
// 📖 AI Bayan — Reading Olympiad (10 texts, MCQ, stars & score)
// Works with: #readingContent, #readingScore, #rPrev, #rNext
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("readingContent");
  const scoreEl = document.getElementById("readingScore");
  const btnPrev = document.getElementById("rPrev");
  const btnNext = document.getElementById("rNext");
  if (!container) return;

  // ⭐ Star helper (uses global popStar if present)
  function starBurst(x = null, y = null) {
    if (typeof window.popStar === "function") {
      window.popStar(x, y);
      return;
    }
    const s = document.createElement("div");
    s.textContent = "⭐";
    Object.assign(s.style, {
      position: "fixed",
      left: x ? `${x}px` : `${Math.random() * 80 + 10}%`,
      top: y ? `${y}px` : `${Math.random() * 60 + 20}%`,
      fontSize: `${26 + Math.random() * 18}px`,
      animation: "flyStar 1s ease-out forwards",
      zIndex: 9999
    });
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }

  // Data — 10 olympiad-style texts (original, English-only)
  const readingData = [
    {
      title: "1) Library Day",
      text:
        "Today our class visited the city library. The librarian showed us how to find books using the catalogue and explained the rules for borrowing. I chose a book about explorers because I enjoy true stories about brave people. My best friend picked a book with jokes to read after homework. We promised to return the books on time and keep them clean.",
      questions: [
        { q: "Why did the narrator choose a book about explorers?", options: [
          "Because it had colorful pictures only.",
          "Because the librarian recommended it to everyone.",
          "Because they enjoy true stories about brave people.",
          "Because it was the only book left."
        ], a: 2 },
        { q: "What did the librarian show the class?", options: [
          "How to pay for damaged books.",
          "How to use the catalogue to find books.",
          "How to write a book report.",
          "How to print photos."
        ], a: 1 },
        { q: "What did the friend choose?", options: [
          "A history book.",
          "A book with jokes.",
          "A science magazine.",
          "A dictionary."
        ], a: 1 },
        { q: "What promise did the class make?", options: [
          "To finish all books in one day.",
          "To read only at school.",
          "To return books on time and keep them clean.",
          "To buy new books for the library."
        ], a: 2 }
      ]
    },
    {
      title: "2) A Healthy Morning",
      text:
        "Nazgul wakes up early to stretch, drink a glass of water, and eat oatmeal with fruit. She walks to school instead of taking a bus when the weather is good. During breaks she stands up and moves around rather than checking her phone. In the evening, she helps her brother prepare a simple salad for dinner.",
      questions: [
        { q: "What does Nazgul drink in the morning?", options: [
          "Tea with sugar.",
          "A glass of water.",
          "Coffee with milk.",
          "Orange juice."
        ], a: 1 },
        { q: "How does she usually go to school in good weather?", options: [
          "By taxi.",
          "By bicycle.",
          "On foot.",
          "By bus."
        ], a: 2 },
        { q: "What does she prefer to do during breaks?", options: [
          "Sit and play games on her phone.",
          "Stand up and move around.",
          "Sleep at her desk.",
          "Eat snacks."
        ], a: 1 },
        { q: "What do they prepare for dinner?", options: [
          "A complicated cake.",
          "A simple salad.",
          "Fried chicken.",
          "Pasta and sausages."
        ], a: 1 }
      ]
    },
    {
      title: "3) Weekend at the Zoo",
      text:
        "On Saturday, my family visited the zoo to learn more about animals and their habitats. We joined a short talk about endangered species and signed a poster to support protection programs. I liked the giraffes best because they moved calmly and looked curious. Before we left, we placed our plastic bottles in a recycling box near the exit.",
      questions: [
        { q: "What was the main reason for the visit?", options: [
          "To buy souvenirs.",
          "To learn about animals and habitats.",
          "To feed the animals.",
          "To meet the zookeeper."
        ], a: 1 },
        { q: "What did the family sign?", options: [
          "A birthday card.",
          "A poster for protection programs.",
          "A delivery form.",
          "A holiday postcard."
        ], a: 1 },
        { q: "Which animals did the narrator like best?", options: [
          "Penguins.",
          "Giraffes.",
          "Lions.",
          "Monkeys."
        ], a: 1 },
        { q: "What did they do before leaving?", options: [
          "Bought ice cream.",
          "Threw bottles into the river.",
          "Recycled plastic bottles.",
          "Took a bus tour."
        ], a: 2 }
      ]
    },
    {
      title: "4) School Newspaper",
      text:
        "Our English teacher started a school newspaper to practice writing. Students report on events, interview teachers, and review books. I wrote an article about our robotics club, explaining how we test ideas and learn from mistakes. Next month, we plan to publish a special edition about science projects.",
      questions: [
        { q: "Why did the teacher start a school newspaper?", options: [
          "To practice writing.",
          "To sell advertisements.",
          "To replace English lessons.",
          "To organize school trips."
        ], a: 0 },
        { q: "What did the narrator write about?", options: [
          "A football match.",
          "The school cafeteria.",
          "The robotics club.",
          "A birthday party."
        ], a: 2 },
        { q: "What will the next edition focus on?", options: [
          "Sports competitions.",
          "Science projects.",
          "Holiday plans.",
          "Art exhibitions."
        ], a: 1 },
        { q: "What do students do for the newspaper?", options: [
          "They only draw cartoons.",
          "They interview teachers and review books.",
          "They print money.",
          "They design school uniforms."
        ], a: 1 }
      ]
    },
    {
      title: "5) Journey by Train",
      text:
        "My cousin and I travelled by train to visit our grandparents. The seats were comfortable, and we could see fields and small villages through the window. A friendly conductor checked our tickets and told us the arrival time. We shared sandwiches and planned the games we would play with our little cousins.",
      questions: [
        { q: "Where were they going?", options: [
          "To a theme park.",
          "To their grandparents.",
          "To a museum.",
          "To the seaside."
        ], a: 1 },
        { q: "Who checked their tickets?", options: [
          "The chef.",
          "The driver.",
          "The conductor.",
          "The guide."
        ], a: 2 },
        { q: "What did they see from the window?", options: [
          "Skyscrapers and a stadium.",
          "Fields and small villages.",
          "Only tunnels.",
          "A desert."
        ], a: 1 },
        { q: "What did they do on the train?", options: [
          "Slept the whole time.",
          "Argued with other passengers.",
          "Shared sandwiches and planned games.",
          "Watched a movie on a big screen."
        ], a: 2 }
      ]
    },
    {
      title: "6) Helping a Neighbour",
      text:
        "When our elderly neighbour broke her arm, our class decided to help. We took turns walking her dog, watering plants, and carrying groceries. She told us stories about her childhood and thanked us with warm smiles. I learned that small actions can make people feel stronger and less lonely.",
      questions: [
        { q: "Why did the class help the neighbour?", options: [
          "She broke her arm.",
          "She moved to another city.",
          "She was a new teacher.",
          "She wanted to sell her house."
        ], a: 0 },
        { q: "What did students do?", options: [
          "Painted the whole house.",
          "Walked the dog and carried groceries.",
          "Built a tree house.",
          "Organized a concert."
        ], a: 1 },
        { q: "How did the neighbour thank them?", options: [
          "With warm smiles and stories.",
          "With a large party.",
          "With expensive gifts.",
          "With free tickets."
        ], a: 0 },
        { q: "What lesson did the narrator learn?", options: [
          "Only big actions matter.",
          "Helping others makes homework easier.",
          "Small actions can make people feel stronger.",
          "Dogs are always difficult."
        ], a: 2 }
      ]
    },
    {
      title: "7) Green Saturday",
      text:
        "Our city held a 'Green Saturday' to clean the riverbank. Volunteers collected litter, sorted plastic and paper, and painted signs asking people to keep the area tidy. I worked with a group of younger students and showed them how to separate bottles and cans. By the afternoon, the park looked fresh and welcoming.",
      questions: [
        { q: "What was the event about?", options: [
          "A sports competition.",
          "Cleaning and protecting the riverbank.",
          "Opening a new bridge.",
          "Building a playground."
        ], a: 1 },
        { q: "What did volunteers do?", options: [
          "Collected litter and sorted recyclables.",
          "Practiced dancing.",
          "Watched a film.",
          "Sold snacks."
        ], a: 0 },
        { q: "Who did the narrator work with?", options: [
          "Teachers only.",
          "Parents only.",
          "Younger students.",
          "Tourists."
        ], a: 2 },
        { q: "How did the park look by afternoon?", options: [
          "Crowded and noisy.",
          "Fresh and welcoming.",
          "Closed and dark.",
          "Flooded after rain."
        ], a: 1 }
      ]
    },
    {
      title: "8) The Science Fair",
      text:
        "During the science fair, teams presented experiments and models. My team built a simple water filter using sand, stones, and charcoal. We explained how clean water can save lives in many parts of the world. The judges praised our clear steps and teamwork, and we received a special certificate.",
      questions: [
        { q: "What did the team build?", options: [
          "A solar car.",
          "A water filter.",
          "A robot teacher.",
          "A wind turbine."
        ], a: 1 },
        { q: "What materials did they use?", options: [
          "Sand, stones, and charcoal.",
          "Clay and glass.",
          "Metal and plastic only.",
          "Paper and glue."
        ], a: 0 },
        { q: "What did they explain?", options: [
          "Why camping is difficult.",
          "How clean water helps people.",
          "How to cook faster.",
          "Why robots are friendly."
        ], a: 1 },
        { q: "What did the judges praise?", options: [
          "Expensive equipment.",
          "Clear steps and teamwork.",
          "Loud music.",
          "Fancy costumes."
        ], a: 1 }
      ]
    },
    {
      title: "9) After-School Chess Club",
      text:
        "At the chess club, we learn to plan moves and predict our opponent’s ideas. Our coach shows us classic games and explains why a simple move can change the result. Last week I lost quickly, but I wrote down my mistakes and improved. Now I help a new member practice openings.",
      questions: [
        { q: "What do students learn at the chess club?", options: [
          "How to play football.",
          "How to plan moves and predict ideas.",
          "How to make videos.",
          "How to sing in a choir."
        ], a: 1 },
        { q: "What does the coach explain?", options: [
          "How to draw cartoons.",
          "Why simple moves matter.",
          "How to dance.",
          "How to repair computers."
        ], a: 1 },
        { q: "What happened last week to the narrator?", options: [
          "They won a big prize.",
          "They lost quickly but learned.",
          "They didn’t come to the club.",
          "They changed clubs."
        ], a: 1 },
        { q: "Who does the narrator help now?", options: [
          "A new member.",
          "The coach.",
          "A younger sister.",
          "A teacher."
        ], a: 0 }
      ]
    },
    {
      title: "10) My Dream School",
      text:
        "If I could design a school, every classroom would have quiet reading corners, plants, and a place for projects. Lessons would mix subjects, so we could use maths in art or science in music. We would meet experts online to ask real questions. The school would be safe, friendly, and open to new ideas.",
      questions: [
        { q: "What would every classroom include?", options: [
          "A swimming pool.",
          "Quiet reading corners and plants.",
          "A cinema screen.",
          "A kitchen for each student."
        ], a: 1 },
        { q: "How would lessons be organized?", options: [
          "Each subject alone without connections.",
          "Only sports every day.",
          "By mixing subjects together.",
          "By removing projects."
        ], a: 2 },
        { q: "Who would students meet online?", options: [
          "Actors from movies.",
          "Friends from games.",
          "Experts to ask real questions.",
          "Chefs from restaurants."
        ], a: 2 },
        { q: "Which adjective best describes the dream school?", options: [
          "Dangerous.",
          "Boring.",
          "Friendly.",
          "Closed."
        ], a: 2 }
      ]
    }
  ];

  // State
  let index = 0;
  let totalScore = 0;

  // Render one text with its questions
  function renderText() {
    const item = readingData[index];
    const qHtml = item.questions
      .map((qq, qi) => {
        const opts = qq.options
          .map((opt, oi) => {
            const letter = String.fromCharCode(97 + oi); // a,b,c,d
            return `<button class="opt" data-qi="${qi}" data-oi="${oi}">
                      <span class="letter">${letter})</span> ${opt}
                    </button>`;
          })
          .join("");
        return `
          <div class="q-block">
            <p class="q-title">${qi + 1}. ${qq.q}</p>
            <div class="opts">${opts}</div>
          </div>`;
      })
      .join("");

    container.innerHTML = `
      <h3>${item.title}</h3>
      <p class="r-text">${item.text}</p>
      <div class="r-qs">${qHtml}</div>
      <div class="progress">Text ${index + 1} / ${readingData.length}</div>
    `;

    // click handlers
    container.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const b = e.currentTarget;
        const qi = parseInt(b.dataset.qi);
        const oi = parseInt(b.dataset.oi);
        const correct = readingData[index].questions[qi].a;

        // если уже отвечено на этот вопрос — блокируем повторный подсчёт
        const block = b.closest(".q-block");
        if (block.classList.contains("answered")) return;

        // подсветка
        const all = block.querySelectorAll(".opt");
        all.forEach((x) => x.disabled = true);
        if (oi === correct) {
          b.classList.add("ok");
          totalScore++;
          scoreEl.textContent = totalScore;
          starBurst(e.clientX, e.clientY);
        } else {
          b.classList.add("bad");
          all[correct].classList.add("ok");
        }
        block.classList.add("answered");
      });
    });

    // Кнопки навигации
    btnPrev.disabled = index === 0;
    btnNext.textContent = (index === readingData.length - 1) ? "✅ Finish" : "➡️ Next";
  }

  // Navigation
  if (btnPrev) btnPrev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      renderText();
    }
  });
  if (btnNext) btnNext.addEventListener("click", () => {
    if (index < readingData.length - 1) {
      index++;
      renderText();
    } else {
      // Final screen
      container.innerHTML = `
        <div class="final-screen">
          <h2>🎉 Reading Olympiad Complete!</h2>
          <p>Your total score: <b>${totalScore}</b> / ${readingData.length * 4}</p>
          <button onclick="show('menu')">🏠 Back to Menu</button>
        </div>
      `;
      btnPrev.disabled = true;
      btnNext.disabled = true;
    }
  });

  // minimal CSS helpers (optional)
  const style = document.createElement("style");
  style.textContent = `
    #reading .r-text { margin: 10px 0 16px; line-height: 1.5; }
    #reading .q-block { margin: 12px 0 16px; padding: 10px; border-radius: 10px; background: #fff8e6; }
    #reading .q-title { margin: 0 0 8px; font-weight: 600; }
    #reading .opts { display: grid; gap: 6px; }
    #reading .opt { text-align: left; padding: 8px 10px; border-radius: 8px; border: 1px solid #ddd; background: #fff; cursor: pointer; }
    #reading .opt:hover { border-color: #aaa; }
    #reading .opt.ok { background: #e6ffef; border-color: #26a65b; }
    #reading .opt.bad { background: #ffecec; border-color: #e74c3c; }
    #reading .letter { font-weight: 700; margin-right: 6px; }
    #reading .progress { margin-top: 8px; color: #555; }
    @keyframes flyStar { from{ transform: translateY(0) scale(0.8); opacity:1;} to{ transform: translateY(-90px) scale(1.4); opacity:0; } }
  `;
  document.head.appendChild(style);

  // Start
  scoreEl.textContent = "0";
  renderText();
});
