// ==============================
// 🔁 AI Bayan — Irregular & Phrasal Verbs Trainer
// 45 Irregular + 27 Phrasal, separate tabs & scores
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("irregular_trainer");
  if (!screen) return; // если секция ещё не добавлена в index.html

  // Построим внутренний UI, если пусто:
  if (!screen.dataset.ready) {
    screen.innerHTML = `
      <h2>🔁 Irregular & Phrasal Verbs Trainer</h2>

      <div class="subtabs">
        <button class="subtab active" id="tabIrreg">Irregular Verbs</button>
        <button class="subtab" id="tabPhrasal">Phrasal Verbs</button>
      </div>

      <div id="irregularPane" class="subscreen active">
        <div id="irregContent"></div>
        <div class="scorebar"><span>Score:</span> <b id="irregScore">0</b> / <b id="irregTotal">45</b></div>
        <div class="nav">
          <button id="irPrev">⬅️ Previous</button>
          <button id="irNext">➡️ Next</button>
          <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
        </div>
      </div>

      <div id="phrasalPane" class="subscreen">
        <div id="phrasalContent"></div>
        <div class="scorebar"><span>Score:</span> <b id="phrasalScore">0</b> / <b id="phrasalTotal">27</b></div>
        <div class="nav">
          <button id="phPrev">⬅️ Previous</button>
          <button id="phNext">➡️ Next</button>
          <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
        </div>
      </div>
    `;
    screen.dataset.ready = "1";
  }

  // ====== DOM refs
  const tabIrregBtn = document.getElementById("tabIrreg");
  const tabPhrasalBtn = document.getElementById("tabPhrasal");
  const irregularPane = document.getElementById("irregularPane");
  const phrasalPane  = document.getElementById("phrasalPane");

  const irregContent = document.getElementById("irregContent");
  const phrasalContent = document.getElementById("phrasalContent");

  const irScoreEl = document.getElementById("irregScore");
  const phScoreEl = document.getElementById("phrasalScore");
  const irTotalEl = document.getElementById("irregTotal");   // 45
  const phTotalEl = document.getElementById("phrasalTotal"); // 27

  const irPrev = document.getElementById("irPrev");
  const irNext = document.getElementById("irNext");
  const phPrev = document.getElementById("phPrev");
  const phNext = document.getElementById("phNext");

  // ====== Data
  const irregulars = [
    // 45 irregular (вопрос: какая форма простого прошедшего?)
    { q:"go → ?",      options:["goed","went","gone","go"], a:1 },
    { q:"see → ?",     options:["saw","seed","seen","see"], a:0 },
    { q:"come → ?",    options:["comed","comes","came","come"], a:2 },
    { q:"eat → ?",     options:["eated","ate","eaten","eat"], a:1 },
    { q:"write → ?",   options:["writed","writes","wrote","write"], a:2 },
    { q:"run → ?",     options:["ran","runned","run","running"], a:0 },
    { q:"buy → ?",     options:["buyed","buys","bought","been"], a:2 },
    { q:"take → ?",    options:["taked","took","taken","takes"], a:1 },
    { q:"make → ?",    options:["made","maked","makes","making"], a:0 },
    { q:"drink → ?",   options:["drank","drunk","drinked","drinks"], a:0 },
    { q:"choose → ?",  options:["choosed","chose","choose","chosed"], a:1 },
    { q:"fly → ?",     options:["flew","flyed","flies","flown"], a:0 },
    { q:"build → ?",   options:["built","builded","builds","being"], a:0 },
    { q:"sleep → ?",   options:["slept","sleeped","sleep","sleeps"], a:0 },
    { q:"break → ?",   options:["breaked","broken","broke","breaks"], a:2 },
    { q:"begin → ?",   options:["began","begun","begined","begin"], a:0 },
    { q:"find → ?",    options:["found","finded","find","finds"], a:0 },
    { q:"teach → ?",   options:["taught","teached","teachs","teach"], a:0 },
    { q:"think → ?",   options:["thought","thinked","think","thinks"], a:0 },
    { q:"bring → ?",   options:["brought","bringed","brang","brung"], a:0 },
    { q:"feel → ?",    options:["felt","feeled","feel","feels"], a:0 },
    { q:"draw → ?",    options:["drew","drawed","drawn","draw"], a:0 },
    { q:"swim → ?",    options:["swam","swum","swimed","swimming"], a:0 },
    { q:"keep → ?",    options:["kept","keeped","keep","keeps"], a:0 },
    { q:"sell → ?",    options:["sold","selled","sell","sells"], a:0 },
    { q:"send → ?",    options:["sent","sended","send","sends"], a:0 },
    { q:"say → ?",     options:["said","sayed","say","says"], a:0 },
    { q:"meet → ?",    options:["met","meeted","meet","meets"], a:0 },
    { q:"stand → ?",   options:["stood","standed","stand","stands"], a:0 },
    { q:"sit → ?",     options:["sat","sitted","sit","sits"], a:0 },
    { q:"understand → ?", options:["understood","understanded","understand","understands"], a:0 },
    { q:"lose → ?",    options:["lost","loses","loose","losing"], a:0 },
    { q:"cut → ?",     options:["cut","cutted","cuts","cutting"], a:0 },
    { q:"hit → ?",     options:["hit","hitted","hits","hitting"], a:0 },
    { q:"read → ?",    options:["read","red","readed","reads"], a:0 },
    { q:"hurt → ?",    options:["hurt","hurts","hurted","hurting"], a:0 },
    { q:"cost → ?",    options:["cost","costed","costs","costing"], a:0 },
    { q:"light → ?",   options:["lit","lighted","light","lights"], a:0 },
    { q:"grow → ?",    options:["grew","growed","grown","grows"], a:0 },
    { q:"ride → ?",    options:["rode","ridden","rided","rides"], a:0 },
    { q:"wear → ?",    options:["wore","wear","worn","wears"], a:0 },
    { q:"speak → ?",   options:["spoke","speak","spoken","speaks"], a:0 },
    { q:"give → ?",    options:["gave","given","gived","gives"], a:0 },
    { q:"become → ?",  options:["became","becomed","become","becomes"], a:0 },
    { q:"hold → ?",    options:["held","holded","holds","holding"], a:0 },
    { q:"pay → ?",     options:["paid","payed","pays","pay"], a:0 },
  ];

  const phrasals = [
    // 27 phrasal (вопрос: значение)
    { q:'"turn on" means…',      options:["switch on (a device)","run away","get up","go out"], a:0 },
    { q:'"turn off" means…',     options:["switch off","stand up","break in","get down"], a:0 },
    { q:'"wake up" means…',      options:["stop sleeping","go to bed","fall down","look up"], a:0 },
    { q:'"get up" means…',       options:["rise from bed","sit down","fall over","run away"], a:0 },
    { q:'"sit down" means…',     options:["take a seat","stand up","fall down","go away"], a:0 },
    { q:'"stand up" means…',     options:["rise to your feet","sit","fall","jump"], a:0 },
    { q:'"look for" means…',     options:["search","see","watch","find"], a:0 },
    { q:'"look after" means…',   options:["take care of","search","look around","watch"], a:0 },
    { q:'"give up" means…',      options:["stop trying","donate","stand up","go on"], a:0 },
    { q:'"carry on" means…',     options:["continue","stop","move","drop"], a:0 },
    { q:'"put on" means…',       options:["wear","remove","turn","pull"], a:0 },
    { q:'"take off" means…',     options:["remove clothes","put on","land","go away"], a:0 },
    { q:'"come back" means…',    options:["return","arrive","go away","stay"], a:0 },
    { q:'"go out" means…',       options:["leave home","enter","stay","move"], a:0 },
    { q:'"find out" means…',     options:["discover","lose","forget","hide"], a:0 },
    { q:'"turn up" means…',      options:["arrive","decrease","turn off","switch down"], a:0 },
    { q:'"turn down" means…',    options:["refuse","increase","turn up","accept"], a:0 },
    { q:'"pick up" means…',      options:["lift","drop","fall","push"], a:0 },
    { q:'"drop off" means…',     options:["leave","pick up","stay","wake up"], a:0 },
    { q:'"call back" means…',    options:["return a call","hang up","pick up","talk"], a:0 },
    { q:'"look up" means…',      options:["search information","see sky","look down","read"], a:0 },
    { q:'"look down on" means…', options:["disrespect","respect","like","admire"], a:0 },
    { q:'"get on with" means…',  options:["have good relations","fight","ignore","argue"], a:0 },
    { q:'"break up" means…',     options:["end a relationship","start","join","repair"], a:0 },
    { q:'"go on" means…',        options:["continue","stop","finish","turn"], a:0 },
    { q:'"set up" means…',       options:["start","close","delete","break"], a:0 },
    { q:'"bring up" means…',     options:["raise a child","drop","teach","fall"], a:0 },
  ];

  // ====== State & storage
  const LS_KEYS = {
    irIndex: "ib_ir_index",
    phIndex: "ib_ph_index",
    irScore: "ib_ir_score",
    phScore: "ib_ph_score",
  };

  let irIndex  = +(localStorage.getItem(LS_KEYS.irIndex)  ?? 0);
  let phIndex  = +(localStorage.getItem(LS_KEYS.phIndex)  ?? 0);
  let irScore  = +(localStorage.getItem(LS_KEYS.irScore)  ?? 0);
  let phScore  = +(localStorage.getItem(LS_KEYS.phScore)  ?? 0);

  irTotalEl.textContent = irregulars.length;
  phTotalEl.textContent = phrasals.length;
  irScoreEl.textContent = irScore;
  phScoreEl.textContent = phScore;

  // ====== Tabs
  function openIrregular() {
    tabIrregBtn.classList.add("active");
    tabPhrasalBtn.classList.remove("active");
    irregularPane.classList.add("active");
    phrasalPane.classList.remove("active");
    renderIrregular();
  }
  function openPhrasal() {
    tabPhrasalBtn.classList.add("active");
    tabIrregBtn.classList.remove("active");
    phrasalPane.classList.add("active");
    irregularPane.classList.remove("active");
    renderPhrasal();
  }
  tabIrregBtn.onclick = openIrregular;
  tabPhrasalBtn.onclick = openPhrasal;

  // ====== Renderers
  function renderIrregular() {
    // финал?
    if (irIndex >= irregulars.length) {
      irregContent.innerHTML = `
        <div class="final-screen">
          <h3>🎉 Well done!</h3>
          <p>You finished the <b>Irregular Verbs</b> section.</p>
          <p>⭐ Score: <b>${irScore}</b> / ${irregulars.length}</p>
          <div class="nav">
            <button onclick="show('menu')">🏠 Back to Menu</button>
            <button id="gotoPhrasal">🔁 Go to Phrasal Verbs</button>
          </div>
        </div>`;
      const goto = document.getElementById("gotoPhrasal");
      if (goto) goto.onclick = openPhrasal;
      return;
    }

    const q = irregulars[irIndex];
    irregContent.innerHTML = `
      <h3>${irIndex + 1}. ${q.q}</h3>
      <div class="options">
        ${q.options.map((opt,i)=>(
          `<button class="option" data-i="${i}">${opt}</button>`
        )).join("")}
      </div>
      <div class="progress">Question ${irIndex + 1} of ${irregulars.length}</div>
    `;

    irScoreEl.textContent = irScore;

    irregContent.querySelectorAll(".option").forEach(btn=>{
      btn.onclick = () => {
        const i = +btn.dataset.i;
        if (i === q.a) {
          irScore++;
          irScoreEl.textContent = irScore;
          localStorage.setItem(LS_KEYS.irScore, irScore);
          // эффекты
          if (typeof window.popStar === "function") window.popStar();
          try { new Audio("sound/ding.wav").play(); } catch(e){}
        }
        // следующий
        irIndex++;
        localStorage.setItem(LS_KEYS.irIndex, irIndex);
        renderIrregular();
      };
    });
  }

  function renderPhrasal() {
    if (phIndex >= phrasals.length) {
      phrasalContent.innerHTML = `
        <div class="final-screen">
          <h3>🎉 Great job!</h3>
          <p>You finished the <b>Phrasal Verbs</b> section.</p>
          <p>⭐ Score: <b>${phScore}</b> / ${phrasals.length}</p>
          <div class="nav">
            <button onclick="show('menu')">🏠 Back to Menu</button>
            <button id="gotoIrregular">🔁 Go to Irregular Verbs</button>
          </div>
        </div>`;
      const goto = document.getElementById("gotoIrregular");
      if (goto) goto.onclick = openIrregular;
      return;
    }

    const q = phrasals[phIndex];
    phrasalContent.innerHTML = `
      <h3>${phIndex + 1}. ${q.q}</h3>
      <div class="options">
        ${q.options.map((opt,i)=>(
          `<button class="option" data-i="${i}">${opt}</button>`
        )).join("")}
      </div>
      <div class="progress">Question ${phIndex + 1} of ${phrasals.length}</div>
    `;

    phScoreEl.textContent = phScore;

    phrasalContent.querySelectorAll(".option").forEach(btn=>{
      btn.onclick = () => {
        const i = +btn.dataset.i;
        if (i === q.a) {
          phScore++;
          phScoreEl.textContent = phScore;
          localStorage.setItem(LS_KEYS.phScore, phScore);
          if (typeof window.popStar === "function") window.popStar();
          try { new Audio("sound/ding.wav").play(); } catch(e){}
        }
        phIndex++;
        localStorage.setItem(LS_KEYS.phIndex, phIndex);
        renderPhrasal();
      };
    });
  }

  // ====== Prev/Next (ручная навигация)
  irPrev.onclick = () => {
    irIndex = Math.max(0, irIndex - 1);
    localStorage.setItem(LS_KEYS.irIndex, irIndex);
    renderIrregular();
  };
  irNext.onclick = () => {
    irIndex = Math.min(irregulars.length, irIndex + 1);
    localStorage.setItem(LS_KEYS.irIndex, irIndex);
    renderIrregular();
  };

  phPrev.onclick = () => {
    phIndex = Math.max(0, phIndex - 1);
    localStorage.setItem(LS_KEYS.phIndex, phIndex);
    renderPhrasal();
  };
  phNext.onclick = () => {
    phIndex = Math.min(phrasals.length, phIndex + 1);
    localStorage.setItem(LS_KEYS.phIndex, phIndex);
    renderPhrasal();
  };

  // стартовая вкладка — Irregular
  openIrregular();
});
