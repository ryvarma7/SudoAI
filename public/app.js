// app.js - frontend JS with session memory + typing animation
const form = document.getElementById('askForm');
const queryEl = document.getElementById('query');
const responseArea = document.getElementById('responseArea');
const sendBtn = document.getElementById('sendBtn');

let conversation = JSON.parse(sessionStorage.getItem('conversation') || '[]');
renderConversation();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = queryEl.value.trim();
  if (!q) return;

  conversation.push({ role: 'user', text: q });
  conversation.push({ role: 'ai', thinking: true });
  saveAndRender();
  responseArea.lastElementChild?.scrollIntoView({ behavior: 'smooth' });

  sendBtn.disabled = true;
  form.classList.add('loading');
  queryEl.value = '';

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: q })
    });

    if (!res.ok) throw new Error(await res.text() || 'Server error');
    const data = await res.json();

    const text = (data?.candidates?.[0]?.content?.parts?.[0]?.text) || data?.text || JSON.stringify(data, null, 2);

    conversation.pop();
    conversation.push({ role: 'ai', text });
    saveAndRender(true);
  } catch (err) {
    conversation.pop();
    conversation.push({ role: 'ai', text: 'Error: ' + err.message });
    saveAndRender();
  } finally {
    sendBtn.disabled = false;
    form.classList.remove('loading');
  }
});

function saveAndRender(animateLast = false) {
  sessionStorage.setItem('conversation', JSON.stringify(conversation));
  renderConversation(animateLast);
}

function renderConversation(animateLast = false) {
  if (conversation.length === 0) {
    responseArea.innerHTML = `<div class="placeholder">Any Help needed</div>`;
    return;
  }

  responseArea.innerHTML = '';
  conversation.forEach((msg, i) => {
    const div = document.createElement('div');
    div.className = msg.role;

    if (msg.thinking) {
      div.classList.add('thinking');
      div.innerHTML = '<span></span><span></span><span></span>';
    } else if (animateLast && i === conversation.length - 1 && msg.role === 'ai') {
      typeText(div, msg.text, () => {
        div.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    } else {
      div.textContent = msg.text;
    }

    responseArea.appendChild(div);
  });
  if (!animateLast) {
    responseArea.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

function typeText(element, text, onComplete) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 15);
    } else if (onComplete) {
      onComplete();
    }
  }
  type();
}
