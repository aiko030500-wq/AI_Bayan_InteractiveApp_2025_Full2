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
    const msg = chatInput.value.trim();
    if (!msg) return;
    chatMessages.innerHTML += `<div class='user-msg'>${msg}</div>`;
    chatInput.value = "";
    chatMessages.innerHTML += `<div class='ai-msg'>🤖 Hello! I'm Bayan, your English buddy!</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
});
