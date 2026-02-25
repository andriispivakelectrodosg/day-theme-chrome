const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

const DEFAULT_THEMES = {
  0: { from: '#ffecd2', to: '#fcb69f' }, // Sunday — peach-orange
  1: { from: '#667eea', to: '#764ba2' }, // Monday — indigo-purple
  2: { from: '#f093fb', to: '#f5576c' }, // Tuesday — pink-red
  3: { from: '#4facfe', to: '#00f2fe' }, // Wednesday — blue-cyan
  4: { from: '#43e97b', to: '#38f9d7' }, // Thursday — green-teal
  5: { from: '#fa709a', to: '#fee140' }, // Friday — pink-yellow
  6: { from: '#a18cd1', to: '#fbc2eb' }, // Saturday — lavender-pink
};

function applyTheme(themes) {
  const dayIndex = new Date().getDay();
  const theme = themes[dayIndex] || DEFAULT_THEMES[dayIndex];
  document.body.style.background =
    `linear-gradient(135deg, ${theme.from}, ${theme.to})`;
}

function updateDisplay() {
  const now = new Date();
  const dayIndex = now.getDay();

  document.getElementById('day-name').textContent = DAY_NAMES[dayIndex];

  document.getElementById('date').textContent = now.toLocaleDateString(
    undefined, { year: 'numeric', month: 'long', day: 'numeric' }
  );

  document.getElementById('clock').textContent = now.toLocaleTimeString(
    undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  );
}

function init() {
  chrome.storage.sync.get({ themes: DEFAULT_THEMES }, (data) => {
    applyTheme(data.themes);
  });

  updateDisplay();
  setInterval(updateDisplay, 1000);
}

document.addEventListener('DOMContentLoaded', init);
