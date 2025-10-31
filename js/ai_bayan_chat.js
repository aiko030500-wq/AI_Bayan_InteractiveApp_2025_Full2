document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("aiBayanBtn");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  btn.onclick = () => chatBox.classList.toggle("hidden");
  closeChat.onclick = () => chatBox.classList.add("hidden");

  sendBtn.onclick = () => {
    const msg = chatInput.value.trim

    document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("aiBayanBtn");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  // показать / скрыть окно
  btn.onclick = () => chatBox.classList.toggle("hidden");
  closeChat.onclick = () => chatBox.classList.add("hidden");

  // обработка отправки
  sendBtn.onclick = sendMessage;
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  }

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    chatMessages.innerHTML += `<div class='user-msg'>🧑‍🎓 ${msg}</div>`;
    chatInput.value = "";

    setTimeout(() => {
      const reply = getBayanReply(msg);
      chatMessages.innerHTML += `<div class='ai-msg'>🤖 ${reply}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
  }

  function getBayanReply(text) {
    text = text.toLowerCase();
    if (text.includes("grammar")) return "Let's practice some grammar together!";
    if (text.includes("vocab")) return "Sure! I can help you with new words!";
    if (text.includes("hello") || text.includes("hi")) return "Hello! I'm AI Bayan, your English Buddy!";
    if (text.includes("help")) return "You can ask me about Grammar, Vocabulary, or Olympiad tasks!";
    return "Interesting! Could you tell me more?";
  }
});
