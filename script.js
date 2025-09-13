/* script.js – DevPilot AI Frontend */

/* Global elements */
const editor = document.getElementById('codeEditor');
const previewBtn = document.getElementById('previewBtn');
const previewFrame = document.getElementById('previewFrame');
const chatForm = document.getElementById('chatForm');
const promptInput = document.getElementById('promptInput');
const chatContainer = document.getElementById('chatContainer');

/* Helper: Append a chat bubble */
function addMessage({ role, text }) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* Preview button – inject editor content into the iframe */
previewBtn.addEventListener('click', () => {
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
});

/* Chat form – simulate AI response (since no backend) */
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  // Show user bubble
  addMessage({ role: 'user', text: prompt });
  promptInput.value = '';
  promptInput.disabled = true;

  // Show loading
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message ai';
  loadingDiv.innerHTML = '<div class="loading"></div> Generating code...';
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Simulate API delay
  setTimeout(() => {
    chatContainer.removeChild(loadingDiv);

    // Generate sample code based on prompt
    let code = generateSampleCode(prompt);
    
    // Show AI response
    addMessage({ role: 'ai', text: code });
    
    // Insert the generated snippet at the cursor position
    insertAtCursor(editor, code);
    
    promptInput.disabled = false;
    promptInput.focus();
  }, 2000);
});

/* Generate sample code based on prompt */
function generateSampleCode(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('button')) {
    return `<button style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Click Me!</button>`;
  } else if (lowerPrompt.includes('navbar') || lowerPrompt.includes('nav')) {
    return `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
  <div style="font-size: 1.5rem; font-weight: bold;">Brand</div>
  <div style="display: flex; gap: 2rem;">
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Home</a>
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">About</a>
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Contact</a>
  </div>
</nav>`;
  } else if (lowerPrompt.includes('card')) {
    return `<div style="max-width: 300px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
  <div style="height: 200px; background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">🎨</div>
  <div style="padding: 1.5rem;">
    <h3 style="margin: 0 0 0.5rem 0; color: #333;">Beautiful Card</h3>
    <p style="color: #666; line-height: 1.6;">This is a sample card component with hover effects and modern styling.</p>
  </div>
</div>`;
  } else {
    return `<!-- Generated code for: ${prompt} -->
<div style="padding: 2rem; background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; border-radius: 12px; text-align: center; font-family: 'Arial', sans-serif;">
  <h2 style="margin: 0 0 1rem 0;">🚀 ${prompt}</h2>
  <p style="margin: 0; opacity: 0.9;">This is a sample implementation. Ask for more specific features!</p>
</div>`;
  }
}

/* Utility: Insert text at current cursor position */
function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  textarea.value = `${before}${text}${after}`;
  const newPos = start + text.length;
  textarea.selectionStart = textarea.selectionEnd = newPos;
  textarea.focus();
}

/* Simple parsers for HTML/CSS/JS extraction */
function extractHTML(src) {
  return src
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();
}

function extractCSS(src) {
  const match = src.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return match ? match[1].trim() : '';
}

function extractJS(src) {
  const match = src.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return match ? match[1].trim() : '';
}

/* Pre-populate the editor with starter code */
editor.value = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .welcome-container {
      text-align: center;
      max-width: 600px;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="welcome-container">
    <h1>Welcome to DevPilot AI</h1>
    <p>Ask the AI for code and watch it appear here!</p>
  </div>
</body>
</html>`;

// Auto-preview on load
previewBtn.click();chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  // Show user bubble
  addMessage({ role: 'user', text: prompt });
  promptInput.value = '';
  promptInput.disabled = true;

  // Show loading
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message ai';
  loadingDiv.innerHTML = '<div class="loading"></div> Generating code...';
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Simulate API delay
  setTimeout(() => {
    chatContainer.removeChild(loadingDiv);

    // Generate sample code based on prompt
    let code = generateSampleCode(prompt);
    
    // Show AI response
    addMessage({ role: 'ai', text: code });
    
    // Insert the generated snippet at the cursor position
    insertAtCursor(editor, code);
    
    promptInput.disabled = false;
    promptInput.focus();
  }, 2000);
});

/* Generate sample code based on prompt */
function generateSampleCode(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('button')) {
    return `<button style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Click Me!</button>`;
  } else if (lowerPrompt.includes('navbar') || lowerPrompt.includes('nav')) {
    return `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
  <div style="font-size: 1.5rem; font-weight: bold;">Brand</div>
  <div style="display: flex; gap: 2rem;">
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Home</a>
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">About</a>
    <a href="#" style="color: white; text-decoration: none; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Contact</a>
  </div>
</nav>`;
  } else if (lowerPrompt.includes('card')) {
    return `<div style="max-width: 300px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
  <div style="height: 200px; background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">🎨</div>
  <div style="padding: 1.5rem;">
    <h3 style="margin: 0 0 0.5rem 0; color: #333;">Beautiful Card</h3>
    <p style="color: #666; line-height: 1.6;">This is a sample card component with hover effects and modern styling.</p>
  </div>
</div>`;
  } else {
    return `<!-- Generated code for: ${prompt} -->
<div style="padding: 2rem; background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; border-radius: 12px; text-align: center; font-family: 'Arial', sans-serif;">
  <h2 style="margin: 0 0 1rem 0;">🚀 ${prompt}</h2>
  <p style="margin: 0; opacity: 0.9;">This is a sample implementation. Ask for more specific features!</p>
</div>`;
  }
}

/* Utility: Insert text at current cursor position */
function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  textarea.value = `${before}${text}${after}`;
  const newPos = start + text.length;
  textarea.selectionStart = textarea.selectionEnd = newPos;
  textarea.focus();
}

/* Simple parsers for HTML/CSS/JS extraction */
function extractHTML(src) {
  return src
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();
}

function extractCSS(src) {
  const match = src.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return match ? match[1].trim() : '';
}

function extractJS(src) {
  const match = src.match(/<script[
