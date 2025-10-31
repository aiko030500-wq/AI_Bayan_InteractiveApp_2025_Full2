// ==============================
// 📖 AI Bayan — Reading Olympiad (A2–B1)
// Дарын-стиль: 10 текстов, 3–4 вопроса к каждому
// Сразу показываем правильность, даём ⭐, автопереход
// Требует: #readingContent, #readingScore, #rPrev, #rNext и window.popStar()
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const box     = document.getElementById("readingContent");
  const scoreEl = document.getElementById("readingScore");
  const btnPrev = document.getElementById("rPrev");
  const btnNext = document.getElementById("rNext");
  if (!box) return;

  let ti = 0;          // индекс текста
  let qi = 0;          // индекс вопроса внутри текста
  let score = 0;

  // 10 адаптированных «дарын-стиль» текстов (5–7 предложений) + вопросы
  const texts = [
    {
      title: "1) City Library Project",
      text: "The new city library opened last spring after two years of renovation. It has a reading hall, a children’s corner, and a small café with healthy snacks. Volunteers help visitors find books and use computers. On weekends, the library runs free workshops on creative writing and public speaking. Many teenagers come to prepare for exams and group projects. The library is funded by local businesses and supported by the city council.",
      questions: [
        { q: "When did the library open?",            options: ["Last summer", "Last spring", "Two years ago", "This winter"], a: 1 },
        { q: "What is NOT mentioned as a library area?", options: ["Children’s corner", "Café", "Gym", "Reading hall"], a: 2 },
        { q: "True/False: Volunteers support visitors.", type: "tf", a: true },
        { q: "Who supports the library financially?", options: ["Only the government", "Only volunteers", "Local businesses and the city council", "No one"], a: 2 }
      ]
    },
    {
      title: "2) Eco School Day",
      text: "Once a month our school holds an Eco Day. Students collect paper, plant trees near the stadium, and check classrooms for energy saving. Teachers explain how small daily actions can help nature. The school newspaper publishes tips on recycling and reducing plastic. Parents are invited to join the activities and bring old batteries for safe disposal.",
      questions: [
        { q: "How often is Eco Day?",                  options: ["Every week", "Every month", "Every day", "Twice a year"], a: 1 },
        { q: "True/False: Students plant trees.",      type: "tf", a: true },
        { q: "What does the school newspaper do?",     options: ["Sells plastic bottles", "Publishes recycling tips", "Organizes exams", "Prints sports tickets"], a: 1 }
      ]
    },
    {
      title: "3) Weekend at the Lake",
      text: "Last weekend my family travelled to a lake two hours from the city. We stayed in a small cabin and cooked dinner together. In the morning we rented bikes and followed a forest trail. The weather was sunny but windy, so we didn’t swim. In the evening we sat by the fire and shared funny stories. It was a simple trip, but everyone felt relaxed.",
      questions: [
        { q: "Where did the family stay?",             options: ["Hotel", "Cabin", "Tent", "Friend’s house"], a: 1 },
        { q: "Why didn’t they swim?",                  options: ["It was windy", "It rained", "It was dark", "The water was frozen"], a: 0 },
        { q: "True/False: They went cycling.",         type: "tf", a: true }
      ]
    },
    {
      title: "4) Young Inventors Fair",
      text: "The Young Inventors Fair takes place every autumn in our city sports hall. School teams present devices that solve everyday problems. This year many projects were about clean water and cheap filters. Judges ask questions about safety and cost. The winners receive small grants to continue research. Some projects are later shown on local TV.",
      questions: [
        { q: "When is the fair held?",                 options: ["In spring", "In summer", "In autumn", "In winter"], a: 2 },
        { q: "True/False: Projects focused on clean water.", type: "tf", a: true },
        { q: "What do winners get?",                   options: ["Scholarships to universities", "Small grants", "Trips abroad", "Sports equipment"], a: 1 }
      ]
    },
    {
      title: "5) Cycling Club",
      text: "Our cycling club meets early on Saturday mornings. Before each ride, the leader checks everyone’s helmets and lights. We follow quiet roads and stop to take photos of fields and rivers. New members learn how to repair a flat tyre. At the end, the group shares snacks and warm tea. The club welcomes beginners and experienced riders.",
      questions: [
        { q: "When does the club meet?",               options: ["Weekdays", "Saturday mornings", "Sunday evenings", "Every night"], a: 1 },
        { q: "True/False: The leader checks safety equipment.", type: "tf", a: true },
        { q: "Who can join the club?",                 options: ["Only professionals", "Only teenagers", "Beginners and experienced riders", "Only teachers"], a: 2 }
      ]
    },
    {
      title: "6) Museum Night",
      text: "Once a year the city museum opens at night with free entry. Visitors explore exhibitions with flashlights and listen to short talks by historians. Children can join a treasure hunt that teaches facts about the past. The museum café serves hot chocolate and apple pie. Many families say it is their favourite event of the year.",
      questions: [
        { q: "How much is the entry fee?",             options: ["Free", "5 dollars", "10 dollars", "Depends on age"], a: 0 },
        { q: "True/False: Visitors listen to talks by historians.", type: "tf", a: true },
        { q: "What special activity is for children?", options: ["Movie night", "Treasure hunt", "Camping", "Sports contest"], a: 1 }
      ]
    },
    {
      title: "7) After-School Coding",
      text: "The after-school coding group helps students learn problem solving through simple games. First, members design levels on paper; then they create them on computers. The teacher encourages teamwork and clear instructions. Older students mentor beginners during practice. At the end of the term, teams present small projects to parents.",
      questions: [
        { q: "What do students design first?",         options: ["Websites", "Phone apps", "Levels on paper", "Robots"], a: 2 },
        { q: "True/False: Older students mentor beginners.", type: "tf", a: true },
        { q: "Who watches the final projects?",        options: ["Parents", "Tourists", "Neighbours", "Only teachers"], a: 0 }
      ]
    },
    {
      title: "8) A Book That Changed Me",
      text: "Last year our teacher recommended a novel about a teenager who moves to a new city. The hero learns to accept changes and builds friendships through kindness. I felt close to the character and started writing a diary. The diary helped me express ideas and practice English. Now I share book reviews with my classmates.",
      questions: [
        { q: "What did the teacher recommend?",        options: ["A poem", "A novel", "A play", "A comic"], a: 1 },
        { q: "True/False: The narrator started a diary.", type: "tf", a: true },
        { q: "What does the narrator share now?",      options: ["Book reviews", "Math projects", "Travel photos", "Songs"], a: 0 }
      ]
    },
    {
      title: "9) Sports Day",
      text: "Our school Sports Day takes place in early May. Classes compete in running, relay races, and long jump. Teachers organize fair rules and keep score. Parents bring water and cheer for the teams. The event builds school spirit and healthy habits. The winners receive medals at the closing ceremony.",
      questions: [
        { q: "When is Sports Day?",                    options: ["Early May", "Late June", "January", "September"], a: 0 },
        { q: "True/False: Only teachers compete.",     type: "tf", a: false },
        { q: "What do winners get?",                   options: ["Books", "Medals", "Bikes", "Tickets"], a: 1 }
      ]
    },
    {
      title: "10) Saving Water at Home",
      text: "Our family decided to save water after a geography lesson. We take shorter showers and turn off the tap while brushing teeth. We also collect rainwater for the garden. At the end of the month we check the bill to see the difference. These simple steps are easy to follow and good for the planet.",
      questions: [
        { q: "What do they collect for the garden?",   options: ["Tap water", "Rainwater", "Mineral water", "River water"], a: 1 },
        { q: "True/False: They ignore the bill.",      type: "tf", a: false },
        { q: "What is the main idea?",                 options: ["Saving water at home", "Buying new plants", "Swimming lessons", "Building a fountain"], a: 0 }
      ]
    }
  ];

  function render() {
    const t = texts[ti];
    const q = t.questions[qi];
    const isTF = q.type === "tf";

    box.innerHTML = `
      <h3>${t.title}</h3>
      <div class="reading-text card" style="white-space:pre-wrap">${t.text}</div>
      <div class="question card">
        <p><b>Q${qi + 1}.</b> ${q.q}</p>
        <div class="options">
          ${
            isTF
              ? `<button class="opt" data-i="true">True</button>
                 <button class="opt" data-i="false">False</button>`
              : q.options.map((opt,i)=>`<button class="opt" data-i="${i}">${String.fromCharCode(65+i)}. ${opt}</button>`).join("")
          }
        </div>
      </div>
      <div class="progress">Text ${ti + 1} of ${texts.length} — Question ${qi + 1} of ${t.questions.length}</div>
    `;
    scoreEl.textContent = score;

    box.querySelectorAll(".opt").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        let chosen;
        if (isTF) {
          chosen = (e.currentTarget.dataset.i === "true");
          if (chosen === q.a) {
            score++; scoreEl.textContent = score; if (window.popStar) popStar();
          }
        } else {
          const idx = parseInt(e.currentTarget.dataset.i,10);
          if (idx === q.a) {
            score++; scoreEl.textContent = score; if (window.popStar) popStar();
          }
        }
        nextStep();
      });
    });
  }

  function nextStep() {
    const t = texts[ti];
    if (qi < t.questions.length - 1) {
      qi++;
      render();
    } else {
      // следующий текст
      if (ti < texts.length - 1) {
        ti++; qi = 0;
        render();
      } else {
        finish();
      }
    }
  }

  function finish() {
    box.innerHTML = `
      <h2>🎉 Reading complete!</h2>
      <p>⭐ Your score: <b>${score}</b> / ${totalQuestions()}</p>
      <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  function totalQuestions() {
    return texts.reduce((sum,t)=> sum + t.questions.length, 0);
  }

  btnPrev && btnPrev.addEventListener("click", ()=>{
    if (qi > 0) {
      qi--; render();
    } else if (ti > 0) {
      ti--; qi = texts[ti].questions.length - 1; render();
    }
  });

  btnNext && btnNext.addEventListener("click", ()=>{
    const t = texts[ti];
    if (qi < t.questions.length - 1 || ti < texts.length - 1) {
      nextStep();
    }
  });

  render();
});
