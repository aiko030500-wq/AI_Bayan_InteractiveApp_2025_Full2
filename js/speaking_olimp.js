// ==============================
// 🗣️ AI Bayan Speaking Olympiad — A2–B1 (18 texts)
// Без микрофона: ученик печатает перевод, мягкая проверка + ⭐
// Требует window.popStar() из app.js и секцию #speaking в index.html
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("speakingContent");
  const scoreEl = document.getElementById("speakingScore");
  const btnPrev = document.getElementById("sPrev");
  const btnNext = document.getElementById("sNext");
  if (!box) return;

  let i = 0;
  let score = 0;

  // 18 тем × по одному тексту (5–6 предложений)
  const data = [
    {
      topic: "School Life",
      ru: "В нашей школе занятия начинаются в восемь утра. Я обычно прихожу пораньше, чтобы повторить домашнее задание. Мой любимый предмет — английский, потому что мы много говорим и пишем. Учитель даёт полезные советы, как улучшить грамматику и словарный запас. После уроков я присоединяюсь к языковому клубу.",
      en: "At our school the lessons start at eight o’clock in the morning. I usually arrive earlier to review my homework. My favourite subject is English because we speak and write a lot. The teacher gives useful tips on how to improve grammar and vocabulary. After classes I join the language club."
    },
    {
      topic: "Family & Weekend",
      ru: "По выходным мы всей семьёй готовим вместе. Папа делает суп, мама печёт пирог, а я накрываю на стол. Иногда мы смотрим новый фильм и обсуждаем персонажей. Вечером я звоню бабушке и рассказываю о своей неделе. Это помогает нам быть ближе друг к другу.",
      en: "At the weekend our whole family cooks together. Dad makes soup, Mum bakes a pie, and I lay the table. Sometimes we watch a new film and discuss the characters. In the evening I call my grandma and tell her about my week. It helps us stay close to each other."
    },
    {
      topic: "Healthy Habits",
      ru: "Я стараюсь питаться здоровой едой и пить достаточно воды. По будням я делаю зарядку перед школой, а по вечерам хожу на прогулку. Когда устаю, делаю короткий перерыв и дышу глубоко. Такие привычки помогают мне лучше учиться и спать. Я советую друзьям пробовать то же самое.",
      en: "I try to eat healthy food and drink enough water. On weekdays I do some exercise before school and in the evenings I go for a walk. When I get tired, I take a short break and breathe deeply. These habits help me study and sleep better. I recommend my friends to try the same."
    },
    {
      topic: "Travel Plans",
      ru: "Этим летом мы собираемся поехать в горы. Мы хотим ночевать в домике и гулять по лесным тропам. Я возьму лёгкую куртку, удобные кроссовки и термос. Мой брат будет фотографировать природу и животных. Надеюсь, погода будет солнечной и тёплой.",
      en: "This summer we are going to the mountains. We want to stay in a cabin and walk along the forest trails. I will take a light jacket, comfortable trainers and a thermos. My brother will take photos of nature and animals. I hope the weather will be sunny and warm."
    },
    {
      topic: "Technology in Daily Life",
      ru: "Я использую планшет, чтобы читать книги и делать проекты. Онлайн-курсы помогают мне повторять грамматику и слова. Однако я стараюсь не проводить слишком много времени в интернете. Я выключаю уведомления во время учёбы, чтобы не отвлекаться. Баланс очень важен для здоровья и успеха.",
      en: "I use a tablet to read books and do projects. Online courses help me revise grammar and vocabulary. However, I try not to spend too much time on the Internet. I turn off notifications while studying so that I don’t get distracted. Balance is very important for health and success."
    },
    {
      topic: "Friends & Hobbies",
      ru: "Мои друзья любят настольные игры и футбол. По пятницам мы встречаемся во дворе и играем до заката. Если идёт дождь, мы остаёмся дома и рисуем комиксы. Иногда мы делаем совместные задания по искусству. Это развивает фантазию и помогает работать в команде.",
      en: "My friends like board games and football. On Fridays we meet in the yard and play until sunset. If it rains, we stay at home and draw comics. Sometimes we do art projects together. It develops imagination and helps us work as a team."
    },
    {
      topic: "City & Transport",
      ru: "Наш город довольно шумный, но мне нравится его центр. Там есть библиотека, театр и небольшой парк. Я часто еду туда на автобусе, потому что это дёшево и удобно. На остановке я обычно читаю новости или слушаю подкаст. Дорога занимает около двадцати минут.",
      en: "Our city is quite noisy, but I like its centre. There is a library, a theatre and a small park. I often go there by bus because it is cheap and convenient. At the bus stop I usually read the news or listen to a podcast. The trip takes about twenty minutes."
    },
    {
      topic: "Environment",
      ru: "Мы сортируем мусор и сдаём бумагу на переработку. По субботам класс выходит убирать двор школы. Я стараюсь не тратить воду и выключать свет, когда выхожу. Мы обсуждаем экологию на уроках географии. Маленькие шаги тоже имеют значение для природы.",
      en: "We sort rubbish and take paper for recycling. On Saturdays our class goes out to clean the school yard. I try not to waste water and switch off the lights when I leave. We discuss ecology in our geography lessons. Small steps matter for nature as well."
    },
    {
      topic: "Culture & Reading",
      ru: "В прошлом месяце мы посетили музей современного искусства. Я увидел картины местных художников и прочитал их истории. После экскурсии я взял несколько книг в библиотеке. Сейчас читаю роман перед сном по тридцать минут. Это помогает мне расслабиться и учиться новым словам.",
      en: "Last month we visited a museum of modern art. I saw paintings by local artists and read their stories. After the tour I borrowed some books from the library. Now I read a novel for thirty minutes before sleep. It helps me relax and learn new words."
    },
    {
      topic: "Future & Goals",
      ru: "Я мечтаю улучшить английский и путешествовать. В этом году хочу участвовать в олимпиаде и написать проект. Чтобы добиться цели, я составил план на недели. Каждый день я делаю маленький шаг и проверяю прогресс. Я верю, что настойчивость приносит результат.",
      en: "I dream of improving my English and travelling. This year I want to take part in an olympiad and write a project. To reach the goal I have made a weekly plan. Every day I take a small step and check my progress. I believe that persistence brings results."
    },
    {
      topic: "Sports & Health",
      ru: "Я записался в спортивную секцию по плаванию. Тренер объясняет технику и следит за безопасностью. После разминки мы плывём разные дистанции и учимся дышать правильно. Я чувствую больше энергии и лучше сплю. Спорт делает меня спокойнее и сильнее.",
      en: "I have joined a swimming club. The coach explains the technique and watches safety. After the warm-up we swim different distances and learn to breathe correctly. I feel more energy and sleep better. Sport makes me calmer and stronger."
    },
    {
      topic: "Food & Cooking",
      ru: "Я люблю готовить простые блюда дома. На завтрак делаю овсянку с фруктами и орехами. Иногда мы с сестрой печём домашние печенья. Мы читаем рецепт и измеряем ингредиенты вместе. Это весело и вкусно, а кухня остаётся чистой.",
      en: "I like cooking simple meals at home. For breakfast I make porridge with fruit and nuts. Sometimes my sister and I bake homemade cookies. We read the recipe and measure the ingredients together. It is fun and tasty, and the kitchen stays clean."
    },
    {
      topic: "Holidays",
      ru: "Во время каникул я люблю посещать новые места в нашем регионе. Мы ездим на автобусе к озеру и берём маленький пикник. Я делаю фотографии природы и записываю впечатления в дневник. Вечером мы возвращаемся уставшие, но счастливые. Это лучшие моменты моего лета.",
      en: "During the holidays I like visiting new places in our region. We take a bus to the lake and have a small picnic. I take photos of nature and write my impressions in a diary. In the evening we come back tired but happy. These are the best moments of my summer."
    },
    {
      topic: "Daily Routine",
      ru: "Утром я встаю рано и делаю короткую зарядку. Затем я завтракаю и собираю рюкзак. По дороге в школу я слушаю любимые песни. После уроков я делаю домашнее задание и повторяю слова. Перед сном я планирую следующий день.",
      en: "In the morning I get up early and do a short workout. Then I have breakfast and pack my backpack. On the way to school I listen to my favourite songs. After classes I do my homework and revise words. Before sleep I plan the next day."
    },
    {
      topic: "Pets",
      ru: "У нас дома живёт дружелюбная собака. По вечерам я выгуливаю её в парке. Мы играем в мяч и учим простые команды. Я всегда приношу воду и угощения. Забота о питомце учит ответственности и доброте.",
      en: "We have a friendly dog at home. In the evenings I walk it in the park. We play ball and practise simple commands. I always bring water and some treats. Taking care of a pet teaches responsibility and kindness."
    },
    {
      topic: "Weather",
      ru: "Весной погода меняется очень быстро. Утром может быть прохладно, а днём уже тепло и солнечно. Я всегда беру лёгкую куртку на всякий случай. Если идёт дождь, мы остаёмся в помещении и играем настольные игры. Главное — быть готовым к любому дню.",
      en: "In spring the weather changes very quickly. It can be cool in the morning and warm and sunny in the afternoon. I always take a light jacket just in case. If it rains, we stay indoors and play board games. The main thing is to be ready for any day."
    },
    {
      topic: "Helping Others",
      ru: "Наш класс собирает вещи для приюта. Мы приносим книги, игрушки и тёплую одежду. Учитель объясняет, почему важно делиться и поддерживать людей. Каждый делает небольшой вклад, и вместе это большая помощь. Мы гордимся нашим проектом доброты.",
      en: "Our class collects things for a shelter. We bring books, toys and warm clothes. The teacher explains why it is important to share and support people. Everyone makes a small contribution, and together it is great help. We are proud of our kindness project."
    },
    {
      topic: "Exams & Motivation",
      ru: "Перед контрольной я повторяю ключевые темы. Я делаю небольшие карточки со словами и примерами. Также я тренируюсь решать задания с таймером. После каждого блока отдыхаю пять минут. Такой подход помогает сохранять концентрацию и уверенность.",
      en: "Before a test I revise the key topics. I make small flashcards with words and examples. I also practise doing tasks with a timer. After each block I rest for five minutes. This approach helps me keep concentration and confidence."
    }
  ];

  // ---------- helpers ----------
  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/[“”"‘’']/g, "")
      .replace(/[^a-z\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  function levenshtein(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i2 = 1; i2 <= m; i2++) {
      for (let j2 = 1; j2 <= n; j2++) {
        const cost = a[i2 - 1] === b[j2 - 1] ? 0 : 1;
        dp[i2][j2] = Math.min(
          dp[i2 - 1][j2] + 1,
          dp[i2][j2 - 1] + 1,
          dp[i2 - 1][j2 - 1] + cost
        );
      }
    }
    return dp[m][n];
  }

  function similar(a, b) {
    const A = normalize(a);
    const B = normalize(b);
    if (!A || !B) return 0;
    const dist = levenshtein(A, B);
    const maxLen = Math.max(A.length, B.length);
    return 1 - dist / maxLen; // 0..1
  }

  // ---------- UI ----------
  function render() {
    const item = data[i];
    box.innerHTML = `
      <h3>${i + 1}. <span class="topic">${item.topic}</span></h3>
      <div class="ru-text card" style="white-space:pre-wrap">${item.ru}</div>

      <label for="userAnswer" class="mt-2">Translate into English:</label>
      <textarea id="userAnswer" rows="6" class="input-area" placeholder="Type your translation here..."></textarea>

      <div class="actions">
        <button id="checkBtn" class="btn">Check</button>
        <button id="showBtn" class="btn ghost">Show model answer</button>
      </div>

      <div class="model hidden" id="modelBox">
        <div class="en-text">${item.en}</div>
      </div>

      <div class="progress">Task ${i + 1} of ${data.length}</div>
    `;
    scoreEl.textContent = score;

    const checkBtn = document.getElementById("checkBtn");
    const showBtn  = document.getElementById("showBtn");
    const modelBox = document.getElementById("modelBox");
    const user     = document.getElementById("userAnswer");

    showBtn.onclick = () => {
      modelBox.classList.remove("hidden");
    };

    checkBtn.onclick = () => {
      const sim = similar(user.value, item.en);
      // порог мягкий: 0.72 — допускаем небольшие расхождения
      if (sim >= 0.72) {
        score++;
        scoreEl.textContent = score;
        if (window.popStar) popStar();
        nextAuto();
      } else {
        // подсветим и покажем эталон
        user.classList.add("error");
        modelBox.classList.remove("hidden");
        setTimeout(() => user.classList.remove("error"), 600);
      }
    };
  }

  function nextAuto() {
    setTimeout(() => {
      if (i < data.length - 1) {
        i++;
        render();
      } else {
        finish();
      }
    }, 500);
  }

  function finish() {
    box.innerHTML = `
      <h2>🎉 Great job!</h2>
      <p>You completed the Speaking Olympiad.</p>
      <p>⭐ Your total score: <b>${score}</b> / ${data.length}</p>
      <button class="back" onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  btnPrev && btnPrev.addEventListener("click", () => {
    if (i > 0) { i--; render(); }
  });
  btnNext && btnNext.addEventListener("click", () => {
    if (i < data.length - 1) { i++; render(); }
  });

  render();
});
