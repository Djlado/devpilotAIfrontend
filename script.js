// script.js

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userPrompt = document.getElementById("userInput").value;

  if (!userPrompt) {
    alert("Please enter a prompt!");
    return;
  }

  try {
    // Send request to backend
    const response = await fetch("https://devai-qzvo7xodt-nexorai.vercel.app/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: userPrompt })
    });

    const data = await response.json();

    // Show AI output in editor
    document.getElementById("editor").value = data.reply || "No response from AI.";
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check console.");
  }
});
