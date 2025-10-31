// ==============================
// 🧠 AI Bayan Vocabulary Olympiad — B1 Level
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const vocabContent = document.getElementById("vocabContent");
  const vocabScore = document.getElementById("vocabScore");
  const btnPrev = document.getElementById("vPrev");
  const btnNext = document.getElementById("vNext");

  if (!vocabContent) return;

  let current = 0;
  let score = 0;

  const vocabData = [
    // 1. Education
    { topic:"Education", q:"curriculum", options:["учебный план","ученик","классная комната","расписание"], a:0 },
    { topic:"Education", q:"assignment", options:["задание","учитель","тест","праздник"], a:0 },
    { topic:"Education", q:"graduate", options:["выпускник","новичок","завуч","одноклассник"], a:0 },
    { topic:"Education", q:"scholarship", options:["стипендия","домашнее задание","класс","партнёрство"], a:0 },

    // 2. Environment
    { topic:"Environment", q:"pollution", options:["загрязнение","цветение","освежение","растительность"], a:0 },
    { topic:"Environment", q:"recycle", options:["перерабатывать","сохранять","загрязнять","выбрасывать"], a:0 },
    { topic:"Environment", q:"climate change", options:["изменение климата","экосистема","жара","снегопад"], a:0 },
    { topic:"Environment", q:"renewable energy", options:["возобновляемая энергия","нефть","уголь","топливо"], a:0 },

    // 3. Health
    { topic:"Health", q:"disease", options:["болезнь","еда","спорт","отдых"], a:0 },
    { topic:"Health", q:"treatment", options:["лечение","прогулка","болезнь","сон"], a:0 },
    { topic:"Health", q:"injury", options:["травма","витамин","спортсмен","аппетит"], a:0 },
    { topic:"Health", q:"nutrition", options:["питание","упражнение","больница","сон"], a:0 },

    // 4. Technology
    { topic:"Technology", q:"device", options:["устройство","кабель","магазин","завод"], a:0 },
    { topic:"Technology", q:"artificial intelligence", options:["искусственный интеллект","компьютерная игра","веб-сайт","робот"], a:0 },
    { topic:"Technology", q:"software", options:["программное обеспечение","железо","экран","провод"], a:0 },
    { topic:"Technology", q:"cybersecurity", options:["кибербезопасность","интернет-магазин","сеть","программа"], a:0 },

    // 5. Communication
    { topic:"Communication", q:"conversation", options:["разговор","речь","жест","язык"], a:0 },
    { topic:"Communication", q:"message", options:["сообщение","песня","текст","письмо"], a:0 },
    { topic:"Communication", q:"expression", options:["выражение","эмоция","обсуждение","тема"], a:0 },
    { topic:"Communication", q:"listener", options:["слушатель","оратор","певец","зритель"], a:0 },

    // 6. Emotions
    { topic:"Emotions", q:"anxious", options:["взволнованный","радостный","спокойный","уставший"], a:0 },
    { topic:"Emotions", q:"grateful", options:["благодарный","злой","скучный","гордый"], a:0 },
    { topic:"Emotions", q:"embarrassed", options:["смущённый","счастливый","удивлённый","раздражённый"], a:0 },
    { topic:"Emotions", q:"confident", options:["уверенный","робкий","нервный","грустный"], a:0 },

    // 7. Work & Career
    { topic:"Work & Career", q:"promotion", options:["повышение","работа","конференция","проект"], a:0 },
    { topic:"Work & Career", q:"interview", options:["собеседование","отпуск","обед","доклад"], a:0 },
    { topic:"Work & Career", q:"salary", options:["зарплата","график","офис","задача"], a:0 },
    { topic:"Work & Career", q:"employer", options:["работодатель","работник","коллега","директор"], a:0 },

    // 8. Society
    { topic:"Society", q:"volunteer", options:["доброволец","полицейский","друг","ученик"], a:0 },
    { topic:"Society", q:"equality", options:["равенство","разделение","богатство","беспорядок"], a:0 },
    { topic:"Society", q:"citizen", options:["гражданин","посетитель","турист","путешественник"], a:0 },
    { topic:"Society", q:"charity", options:["благотворительность","налог","магазин","бизнес"], a:0 },

    // 9. Travel
    { topic:"Travel", q:"destination", options:["пункт назначения","аэропорт","багаж","турист"], a:0 },
    { topic:"Travel", q:"luggage", options:["багаж","билет","такси","путь"], a:0 },
    { topic:"Travel", q:"sightseeing", options:["осмотр достопримечательностей","поход","плавание","отдых"], a:0 },
    { topic:"Travel", q:"journey", options:["путешествие","город","местность","отель"], a:0 },

    // 10. Culture
    { topic:"Culture", q:"tradition", options:["традиция","праздник","обычай","журнал"], a:0 },
    { topic:"Culture", q:"festival", options:["фестиваль","концерт","музей","картина"], a:0 },
    { topic:"Culture", q:"heritage", options:["наследие","нация","история","язык"], a:0 },
    { topic:"Culture", q:"custom", options:["обычай","наряд","закон","событие"], a:0 },

    // 11. Media
    { topic:"Media", q:"headline", options:["заголовок","новость","газета","интервью"], a:0 },
    { topic:"Media", q:"journalist", options:["журналист","фотограф","редактор","репортёр"], a:0 },
    { topic:"Media", q:"broadcast", options:["трансляция","сериал","канал","передача"], a:0 },
    { topic:"Media", q:"advertisement", options:["реклама","газета","новость","программа"], a:0 },

    // 12. Nature
    { topic:"Nature", q:"wildlife", options:["дикая природа","река","гора","пустыня"], a:0 },
    { topic:"Nature", q:"habitat", options:["среда обитания","территория","страна","город"], a:0 },
    { topic:"Nature", q:"species", options:["виды","животные","растения","живопись"], a:0 },
    { topic:"Nature", q:"forest", options:["лес","луга","река","гора"], a:0 },

    // 13. Science
    { topic:"Science", q:"experiment", options:["эксперимент","наблюдение","открытие","исследование"], a:0 },
    { topic:"Science", q:"laboratory", options:["лаборатория","учебник","школа","учёный"], a:0 },
    { topic:"Science", q:"theory", options:["теория","идея","мысль","проект"], a:0 },
    { topic:"Science", q:"research", options:["исследование","результат","открытие","тест"], a:0 },

    // 14. Art
    { topic:"Art", q:"painting", options:["картина","музыка","театр","фильм"], a:0 },
    { topic:"Art", q:"sculpture", options:["скульптура","музей","выставка","архитектура"], a:0 },
    { topic:"Art", q:"artist", options:["художник","писатель","танцор","режиссёр"], a:0 },
    { topic:"Art", q:"gallery", options:["галерея","театр","музей","концерт"], a:0 },

    // 15. Sports
    { topic:"Sports", q:"competition", options:["соревнование","игра","турнир","победа"], a:0 },
    { topic:"Sports", q:"athlete", options:["спортсмен","тренер","фанат","игрок"], a:0 },
    { topic:"Sports", q:"champion", options:["чемпион","игрок","лидер","победитель"], a:0 },
    { topic:"Sports", q:"trophy", options:["трофей","кубок","медаль","приз"], a:0 },

    // 16. Food & Diet
    { topic:"Food & Diet", q:"nutrition", options:["питание","еда","рецепт","блюдо"], a:0 },
    { topic:"Food & Diet", q:"ingredient", options:["ингредиент","салат","меню","вилка"], a:0 },
    { topic:"Food & Diet", q:"delicious", options:["вкусный","солёный","горький","холодный"], a:0 },
    { topic:"Food & Diet", q:"balanced diet", options:["сбалансированное питание","постная еда","фастфуд","вегетарианство"], a:0 },

    // 17. Home & Lifestyle
    { topic:"Home & Lifestyle", q:"furniture", options:["мебель","ковёр","декор","пол"], a:0 },
    { topic:"Home & Lifestyle", q:"neighbourhood", options:["район","улица","город","дом"], a:0 },
    { topic:"Home & Lifestyle", q:"comfortable", options:["удобный","чистый","большой","яркий"], a:0 },
    { topic:"Home & Lifestyle", q:"routine", options:["распорядок","отдых","сон","праздник"], a:0 },

    // 18. Time & Future
    { topic:"Time & Future", q:"schedule", options:["расписание","встреча","календарь","время"], a:0 },
    { topic:"Time & Future", q:"deadline", options:["крайний срок","начало","день","план"], a:0 },
    { topic:"Time & Future", q:"goal", options:["цель","мечта","задача","путь"], a:0 },
    { topic:"Time & Future", q:"predict", options:["предсказывать","планировать","ожидать","предлагать"], a:0 },
  ];

  function showVocabQuestion() {
    const q = vocabData[current];
    vocabContent.innerHTML = `
      <h3>Topic: ${q.topic}</h3>
      <p class="question"><b>${current + 1}. ${q.q}</b></p>
      <div class="options">
        ${q.options.map((opt, i) => `<button class="option" data-i="${i}">${opt}</button>`).join("")}
      </div>
      <div class="progress">Question ${current + 1} of ${vocabData.length}</div>
    `;
    vocabScore.textContent = score;

    document.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.i);
        if (index === q.a) {
          score++;
          vocabScore.textContent = score;
          popStar();
        }
        setTimeout(() => {
          if (current < vocabData.length - 1) {
            current++;
            showVocabQuestion();
          } else {
            showFinish();
          }
        }, 400);
      });
    });
  }

  function showFinish() {
    vocabContent.innerHTML = `
      <h2>🎉 Excellent!</h2>
      <p>You completed the Vocabulary Olympiad.</p>
      <p>⭐ Your total score: <b>${score}</b> / ${vocabData.length}</p>
      <button onclick="show('menu')">🏠 Back to Menu</button>
    `;
  }

  btnNext.addEventListener("click", () => {
    if (current < vocabData.length - 1) {
      current++;
      showVocabQuestion();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showVocabQuestion();
    }
  });

  showVocabQuestion();
});
