// script.js – Plain-JS Front-end
// Global elements
const editor = document.getElementById('codeEditor');
const previewBtn = document.getElementById('previewBtn');
const previewFrame = document.getElementById('previewFrame');
const chatForm = document.getElementById('chatForm');
const promptInput = document.getElementById('promptInput');
const chatContainer = document.getElementById('chatContainer');
const editorPanel = document.querySelector('.editor-panel');
const previewPanel = document.querySelector('.preview-panel');

/* ----------------------------------------------------------------
   Helper: Append a chat bubble
   ---------------------------------------------------------------- */
function addMessage({ role, text }) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* ----------------------------------------------------------------
   1️⃣ Preview button – Toggle editor/preview views
   ---------------------------------------------------------------- */
previewBtn.addEventListener('click', () => {
  const isPreviewing = previewFrame.style.display !== 'none';

  if (!isPreviewing) {
    // Show preview
    const userCode = editor.value;
    const doc = `
      <html>
        <head>
          <style>${extractCSS(userCode)}</style>
        </head>
        <body>
          ${extractHTML(userCode)}
          <script>${extractJS(userCode)}<\/script>
        </body>
      </html>`;
    previewFrame.srcdoc = doc;
    editorPanel.style.display = 'none';
    previewPanel.style.display = 'flex';
    previewFrame.style.display = 'block';
    previewBtn.textContent = '📝 Code Editor';
  } else {
    // Show editor
    editorPanel.style.display = 'flex';
    previewPanel.style.display = 'none';
    previewFrame.style.display = 'none';
    previewBtn.textContent = '▶︎ Live Preview';
  }
});

/* ----------------------------------------------------------------
   2️⃣ Chat form – send prompt to backend, insert resulting code
   ---------------------------------------------------------------- */
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  // Show user bubble
  addMessage({ role: 'user', text: prompt });
  promptInput.value = '';
  promptInput.disabled = true;

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error(`Server ${res.status}`);

    const { code } = await res.json();

    // Show AI bubble (code can be multiline)
    addMessage({ role: 'ai', text: code });

    // Insert the generated snippet at the cursor position
    insertAtCursor(editor, code);
  } catch (err) {
    console.error(err);
    addMessage({ role: 'ai', text: `❗️ Error: ${err.message}` });
  } finally {
    promptInput.disabled = false;
    promptInput.focus();
  }
});

/* ----------------------------------------------------------------
   Utility: Insert text at current cursor position in <textarea>
   ---------------------------------------------------------------- */
function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  textarea.value = `${before}${text}${after}`;
  // put cursor after inserted text
  const newPos = start + text.length;
  textarea.selectionStart = textarea.selectionEnd = newPos;
  textarea.focus();
}

/* ----------------------------------------------------------------
   Simple parsers – split a mixed HTML/CSS/JS block into its parts.
   This is very tolerant; you can improve it later.
   ---------------------------------------------------------------- */
function extractHTML(src) {
  // Anything outside <style> or <script> is assumed HTML
  return src
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();
}
function extractCSS(src) {
  const match = src.match(/<style[\s\S]?>([\s\S]?)<\/style>/i);
  return match ? match[1].trim() : '';
}
function extractJS(src) {
  const match = src.match(/<script[\s\S]?>([\s\S]?)<\/script>/i);
  return match ? match[1].trim() : '';
}

/* ----------------------------------------------------------------
   Optional: pre-populate the editor with a starter skeleton
   ---------------------------------------------------------------- */
editor.value = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background:#111; color:#eee; }
  </style>
</head>
<body>
  <h1>Welcome to DevPilot AI</h1>
  <p>Ask the AI for code and watch it appear here!</p>
</body>
</html>`;
    </html>`;
  previewFrame.srcdoc = doc;
});

/* ----------------------------------------------------------------
   2️⃣ Chat form – send prompt to backend, insert resulting code
   ---------------------------------------------------------------- */
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  // Show user bubble
  addMessage({ role: 'user', text: prompt });
  promptInput.value = '';
  promptInput.disabled = true;

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error(`Server ${res.status}`);

    const { code } = await res.json();

    // Show AI bubble (code can be multiline)
    addMessage({ role: 'ai', text: code });

    // Insert the generated snippet at the cursor position
    insertAtCursor(editor, code);
  } catch (err) {
    console.error(err);
    addMessage({ role: 'ai', text: `❗️ Error: ${err.message}` });
  } finally {
    promptInput.disabled = false;
    promptInput.focus();
  }
});

/* ----------------------------------------------------------------
   Utility: Insert text at current cursor position in <textarea>
   ---------------------------------------------------------------- */
function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  textarea.value = `${before}${text}${after}`;
  // put cursor after inserted text
  const newPos = start + text.length;
  textarea.selectionStart = textarea.selectionEnd = newPos;
  textarea.focus();
}

/* ----------------------------------------------------------------
   Simple parsers – split a mixed HTML/CSS/JS block into its parts.
   This is *very* tolerant; you can improve it later.
   ---------------------------------------------------------------- */
function extractHTML(src) {
  // Anything outside <style> or <script> is assumed HTML
  return src
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();
}
function extractCSS(src) {
  const match = src.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/i);
  return match ? match[1].trim() : '';
}
function extractJS(src) {
  const match = src.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/i);
  return match ? match[1].trim() : '';
}

/* ----------------------------------------------------------------
   Optional: pre‑populate the editor with a starter skeleton
   ---------------------------------------------------------------- */
editor.value = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; background:#111; color:#eee; }
  </style>
</head>
<body>
  <h1>Welcome to DevPilot AI</h1>
  <p>Ask the AI for code and watch it appear here!</p>
</body>
</html>`;
