    // ==============================
// 📘 AI Bayan General English Trainer — 2025
// Includes: Irregular Verbs + Phrasal Verbs
// ==============================

// ---------- IRREGULAR VERBS ----------
function initIrregularsTrainer() {
  const data = [
    ["be", "was/were", "been", "быть"],
    ["begin", "began", "begun", "начинать"],
    ["break", "broke", "broken", "ломать"],
    ["bring", "brought", "brought", "приносить"],
    ["buy", "bought", "bought", "покупать"],
    ["choose", "chose", "chosen", "выбирать"],
    ["come", "came", "come", "приходить"],
    ["do", "did", "done", "делать"],
    ["drink", "drank", "drunk", "пить"],
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
    ["put", "put", "put", "класть"],
    ["read", "read", "read", "читать"],
    ["run", "ran", "run", "бежать"],
    ["say", "said", "said", "говорить"],
    ["see", "saw", "seen", "видеть"],
    ["sell", "sold", "sold", "продавать"],
    ["send", "sent", "sent", "отправлять"],
    ["sing", "sang", "sung", "петь"],
    ["sit", "sat", "sat", "сидеть"],
    ["sleep", "slept", "slept", "спать"],
    ["speak", "spoke", "spoken", "говорить"],
    ["stand", "stood", "stood", "стоять"],
    ["swim", "swam", "swum", "плавать"],
    ["take", "took", "taken", "брать"],
    ["teach", "taught", "taught", "учить"],
    ["tell", "told", "told", "рассказывать"],
    ["think", "thought", "thought", "думать"],
    ["write", "wrote", "written", "писать"]
  ];

  const content = document.getElementById("irregularsContent");
  if (!content) return;
  let i = 0;
  content.innerHTML = buildCard(i);

  function buildCard(i) {
    const [v1, v2, v3, tr] = data[i];
    return `
      <h3>${i + 1}. ${v1}</h3>
      <p><b>Past Simple:</b> ${v2}</p>
      <p><b>Past Participle:</b> ${v3}</p>
      <p><i>Translation:</i> ${tr}</p>
      <div class="progress">Word ${i + 1} of ${data.length}</div>
    `;
  }

  document.getElementById("irPrev").onclick = () => {
    if (i > 0) { i--; content.innerHTML = buildCard(i); }
  };
  document.getElementById("irNext").onclick = () => {
    if (i < data.length - 1) { i++; content.innerHTML = buildCard(i); }
  };
}

// ---------- PHRASAL VERBS ----------
function initPhrasalVerbsTrainer() {
  const data = [
    ["look after", "to take care of someone or something", "заботиться о ком-то / чем-то"],
    ["turn on", "to start a machine or light", "включать"],
    ["turn off", "to stop a machine or light", "выключать"],
    ["wake up", "to stop sleeping", "просыпаться"],
    ["get up", "to rise from bed", "вставать"],
    ["put on", "to dress or wear something", "надевать"],
    ["take off", "to remove clothes or depart", "снимать (одежду), взлетать"],
    ["look for", "to search for", "искать"],
    ["give up", "to stop doing something", "сдаваться, бросать"],
    ["go out", "to leave home for social activity", "выходить гулять"],
    ["come back", "to return", "возвращаться"],
    ["run out of", "to finish the supply of something", "закончиться"],
    ["look forward to", "to await something with pleasure", "с нетерпением ждать"],
    ["find out", "to discover", "узнать"],
    ["set up", "to arrange or organize", "организовать, настроить"],
    ["fill in", "to complete a form", "заполнить"],
    ["take care of", "to protect or look after", "заботиться"],
    ["throw away", "to discard", "выбрасывать"],
    ["turn down", "to reduce volume or reject", "убавить, отклонить"],
    ["turn up", "to increase volume or appear", "прибавить, появиться"],
    ["get on with", "to have a good relationship", "ладить"],
    ["come in", "to enter", "входить"],
    ["carry on", "to continue", "продолжать"],
    ["check in", "to register (hotel/airport)", "зарегистрироваться"],
    ["check out", "to leave after paying", "выписаться"],
    ["break down", "to stop working (machine)", "сломаться"],
    ["pick up", "to collect or lift", "подбирать"]
  ];

  const content = document.getElementById("phrasalVerbsContent");
  if (!content) return;
  let i = 0;
  content.innerHTML = buildCard(i);

  function buildCard(i) {
    const [verb, def, tr] = data[i];
    return `
      <h3>${i + 1}. ${verb}</h3>
      <p><b>Meaning:</b> ${def}</p>
      <p><i>Translation:</i> ${tr}</p>
      <div class="progress">Verb ${i + 1} of ${data.length}</div>
    `;
  }

  document.getElementById("phPrev").onclick = () => {
    if (i > 0) { i--; content.innerHTML = buildCard(i); }
  };
  document.getElementById("phNext").onclick = () => {
    if (i < data.length - 1) { i++; content.innerHTML = buildCard(i); }
  };
}

// ---------- AUTO-INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("irregularsContent")) initIrregularsTrainer();
  if (document.getElementById("phrasalVerbsContent")) initPhrasalVerbsTrainer();
});
      
