// Grab DOM elements
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

// Function to add messages to chat
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerText = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  input.value = "";

  try {
    const response = await fetch("https://devai-qzvo7xodt-nexorai.vercel.app/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    addMessage("bot", data.code || "No reply from server");
  } catch (err) {
    console.error("Error:", err);
    addMessage("bot", "⚠️ Error: Could not reach server.");
  }
});
