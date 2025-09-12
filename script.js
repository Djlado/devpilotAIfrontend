// Chat system
const chatArea = document.getElementById("chatArea");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const clearChat = document.getElementById("clearChat");

// Code editor + preview
const editor = document.getElementById("editor");
const previewBtn = document.getElementById("previewBtn");
const previewFrame = document.getElementById("preview");

// Add chat message
function addChat(message, from = "user") {
  const msg = document.createElement("div");
  msg.className = from;
  msg.textContent = message;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Send prompt (dummy now, real AI later)
sendBtn.addEventListener("click", () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  addChat("👤 " + prompt, "user");
  promptInput.value = "";

  // Temporary AI response
  setTimeout(() => {
    const fakeCode = `
<!DOCTYPE html>
<html>
<head><title>Hello</title></head>
<body><h1>Hello from AI!</h1></body>
</html>`;
    addChat("🤖 Code generated!", "ai");
    editor.value = fakeCode;
  }, 1000);
});

// Clear chat
clearChat.addEventListener("click", () => {
  chatArea.innerHTML = "";
});

// Preview button
previewBtn.addEventListener("click", () => {
  const content = editor.value;
  previewFrame.srcdoc = content;
});
