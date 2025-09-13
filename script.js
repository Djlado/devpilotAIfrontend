document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const previewIframe = document.getElementById('preview-iframe');
    const chatHistory = document.getElementById('chat-history');
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');
    const previewBtn = document.getElementById('preview-btn');

    let autoPreviewTimeout; // For debounced auto-preview

    // Function to add message to chat history
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Function to update preview (with error handling)
    function updatePreview() {
        const code = codeEditor.value.trim();
        if (!code) {
            previewIframe.srcdoc = '<p style="color: #00ffff; text-align: center; padding: 20px;">No code to preview. Type or generate some!</p>';
            return;
        }

        try {
            // Wrap in full HTML if no doctype (helps with incomplete Gemini outputs)
            let fullCode = code;
            if (!code.startsWith('<!DOCTYPE')) {
                fullCode = `<!DOCTYPE html><html><head></head><body>${code}</body></html>`;
            }
            previewIframe.srcdoc = fullCode;
        } catch (error) {
            previewIframe.srcdoc = `<p style="color: red; padding: 20px;">Preview Error: ${error.message}. Check your code syntax!</p>`;
            console.error('Preview error:', error);
        }
    }

    // Handle send button click
    sendBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        addMessage(`You: ${prompt}`, 'user-message');
        promptInput.value = '';

        try {
            const response = await fetch('https://devpilotbackend-buf4uq0or-nexorai.vercel.app/api/generate', {
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

            // Auto-update preview after insertion
            updatePreview();
        } catch (error) {
            addMessage(`AI: Error - ${error.message}`, 'ai-message');
        }
    });

    // Handle Enter key in prompt input
    promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });

    // Handle preview button click
    previewBtn.addEventListener('click', () => {
        updatePreview();
    });

    // Auto-preview on code changes (debounced)
    codeEditor.addEventListener('input', () => {
        clearTimeout(autoPreviewTimeout);
        autoPreviewTimeout = setTimeout(updatePreview, 2000); // 2-second delay
    });

    // Initial empty preview
    updatePreview();
});
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
