document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const previewIframe = document.getElementById('preview-iframe');
    const chatHistory = document.getElementById('chat-history');
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');
    const previewBtn = document.getElementById('preview-btn');

    // Function to add message to chat history
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Handle send button click
    sendBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        addMessage(`You: ${prompt}`, 'user-message');
        promptInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) throw new Error('Failed to generate code');

            const data = await response.json();
            const code = data.code;

            // Insert code into editor (append to existing code)
            codeEditor.value += (codeEditor.value ? '\n\n' : '') + code;

            addMessage(`AI: Generated and inserted code.`, 'ai-message');
        } catch (error) {
            addMessage(`AI: Error - ${error.message}`, 'ai-message');
        }
    });

    // Handle preview button click
    previewBtn.addEventListener('click', () => {
        previewIframe.srcdoc = codeEditor.value;
    });
});
    addMessage("bot", data.code || "No reply from server");
  } catch (err) {
    console.error("Error:", err);
    addMessage("bot", "⚠️ Error: Could not reach server.");
  }
});
