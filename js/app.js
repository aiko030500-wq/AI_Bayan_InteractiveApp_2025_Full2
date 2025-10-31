// ==============================
// 🤖 AI Bayan 2025 — Core Wiring + Teacher Journal by Sections
// ==============================

// 🎯 PINы
const STUDENT_PIN = "2361";
const TEACHER_PIN = "9996";

// 📱 Переключение экранов
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

// 🌟 Анимация звезды (глобальная)
window.popStar = function (x = null, y = null) {
  const star = document.createElement("div");
  star.textContent = "⭐";
  Object.assign(star.style, {
    position: "fixed",
    left: x ? `${x}px` : `${Math.random() * 90 + 5}%`,
    top: y ? `${y}px` : `${Math.random() * 80 + 10}%`,
    fontSize: `${26 + Math.random() * 18}px`,
    animation: "flyStar 1s ease-out forwards",
    zIndex: 9999,
    pointerEvents: "none"
  });
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
};

// ==============================
// 👩‍🏫 Teacher Journal (по разделам)
// ==============================

/*
Структура хранения:
localStorage["aiBayanStudents"] = {
  "ИмяУченика": {
    Grammar: 0, Vocabulary: 0, Listening: 0, Reading: 0,
    General: 0, Irregular: 0, Phrasal: 0, Speaking: 0,
    total: 0, date: "дата"
  }, ...
}
*/

function _blankStudent() {
  return {
    Grammar: 0, Vocabulary: 0, Listening: 0, Reading: 0,
    General: 0, Irregular: 0, Phrasal: 0, Speaking: 0,
    total: 0, date: new Date().toLocaleString()
  };
}

function saveStudentProgress(name, section, points = 1) {
  const all = JSON.parse(localStorage.getItem("aiBayanStudents") || "{}");
  if (!all[name]) all[name] = _blankStudent();
  all[name][section] += points;
  all[name].total += points;
  all[name].date = new Date().toLocaleString();
  localStorage.setItem("aiBayanStudents", JSON.stringify(all));
  _updateGlobalScoreOnMenu(name); // обновить общий прогресс в меню
}

// вызывать в тестах при правильном ответе
window.addScore = function(section, points = 1) {
  const name = localStorage.getItem("studentName") || "Unknown";
  saveStudentProgress(name, section, points);
};

// отрисовка журнала учителя
function showTeacherJournal() {
  const table = document.querySelector("#journalTable tbody");
  const all = JSON.parse(localStorage.getItem("aiBayanStudents") || "{}");
  const rows = Object.entries(all).map(([name, d]) => `
    <tr>
      <td>${name}</td>
      <td>${d.Grammar || 0}</td>
      <td>${d.Vocabulary || 0}</td>
      <td>${d.Listening || 0}</td>
      <td>${d.Reading || 0}</td>
      <td>${d.General || 0}</td>
      <td>${d.Irregular || 0}</td>
      <td>${d.Phrasal || 0}</td>
      <td>${d.Speaking || 0}</td>
      <td><b>${d.total || 0}</b></td>
      <td>${d.date || ""}</td>
    </tr>
  `).join("");
  table.innerHTML = rows || `<tr><td colspan="11" style="text-align:center;opacity:.7">No data yet</td></tr>`;
  show("teacherJournal");
}

// показать общий счёт в меню
function _updateGlobalScoreOnMenu(name) {
  const el = document.getElementById("globalScore");
  if (!el) return;
  const all = JSON.parse(localStorage.getItem("aiBayanStudents") || "{}");
  const total = all[name]?.total || 0;
  el.textContent = total;
}

// ==============================
// 🔐 Логин
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const name = (document.getElementById("nameInput")?.value || "").trim();
      const pin  = (document.getElementById("pinInput")?.value || "").trim();
      if (!name || !pin) {
        alert("Please enter your name and PIN code.");
        return;
      }
      if (pin === STUDENT_PIN) {
        localStorage.setItem("studentName", name);
        // инициализируем запись при первом входе
        const all = JSON.parse(localStorage.getItem("aiBayanStudents") || "{}");
        if (!all[name]) localStorage.setItem("aiBayanStudents", JSON.stringify({...all, [name]: _blankStudent()}));
        _updateGlobalScoreOnMenu(name);
        show("menu");
      } else if (pin === TEACHER_PIN) {
        showTeacherJournal();
      } else {
        alert("❌ Wrong PIN. Try again.");
      }
    });
  }

  // кнопки меню — автозапуск разделов при наличии функций
  document.querySelectorAll("#menu button[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      show(target);
      if (target === "olimp"     && typeof showOlimpQuestion  === "function") showOlimpQuestion();
      if (target === "vocab"     && typeof showVocab          === "function") showVocab();
      if (target === "listening" && typeof showListening      === "function") showListening();
      if (target === "reading"   && typeof showReading        === "function") showReading();
      if (target === "general"   && typeof showGeneral        === "function") showGeneral(); // если есть
      if (target === "irregulars_trainer" && typeof openIrregularsTrainer === "function") openIrregularsTrainer();
    });
  });

  // восстановить общий балл в меню, если имя уже было сохранено
  const savedName = localStorage.getItem("studentName");
  if (savedName) _updateGlobalScoreOnMenu(savedName);
});
