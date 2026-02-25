const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

const DEFAULT_THEMES = {
  0: { from: '#ffecd2', to: '#fcb69f' },
  1: { from: '#667eea', to: '#764ba2' },
  2: { from: '#f093fb', to: '#f5576c' },
  3: { from: '#4facfe', to: '#00f2fe' },
  4: { from: '#43e97b', to: '#38f9d7' },
  5: { from: '#fa709a', to: '#fee140' },
  6: { from: '#a18cd1', to: '#fbc2eb' },
};

let themes = {};

function showStatus(msg) {
  const el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 1500);
}

function save() {
  chrome.storage.sync.set({ themes }, () => {
    showStatus('Saved');
  });
}

function buildUI() {
  const container = document.getElementById('settings');
  container.innerHTML = '';
  const today = new Date().getDay();

  for (let i = 0; i < 7; i++) {
    const theme = themes[i] || DEFAULT_THEMES[i];

    const row = document.createElement('div');
    row.className = 'day-row' + (i === today ? ' today' : '');

    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = DAY_NAMES[i];
    if (i === today) {
      const marker = document.createElement('span');
      marker.className = 'marker';
      marker.textContent = '(today)';
      label.appendChild(marker);
    }

    const colorGroup = document.createElement('div');
    colorGroup.className = 'color-group';

    const fromLabel = document.createElement('label');
    fromLabel.textContent = 'From';
    const fromInput = document.createElement('input');
    fromInput.type = 'color';
    fromInput.value = theme.from;
    fromInput.dataset.day = i;
    fromInput.dataset.end = 'from';

    const toLabel = document.createElement('label');
    toLabel.textContent = 'To';
    const toInput = document.createElement('input');
    toInput.type = 'color';
    toInput.value = theme.to;
    toInput.dataset.day = i;
    toInput.dataset.end = 'to';

    const preview = document.createElement('div');
    preview.className = 'preview';
    preview.id = `preview-${i}`;
    preview.style.background = `linear-gradient(135deg, ${theme.from}, ${theme.to})`;

    function onChange(e) {
      const day = e.target.dataset.day;
      const end = e.target.dataset.end;
      if (!themes[day]) {
        themes[day] = { ...DEFAULT_THEMES[day] };
      }
      themes[day][end] = e.target.value;
      preview.style.background =
        `linear-gradient(135deg, ${themes[day].from}, ${themes[day].to})`;
      save();
    }

    fromInput.addEventListener('input', onChange);
    toInput.addEventListener('input', onChange);

    colorGroup.appendChild(fromLabel);
    colorGroup.appendChild(fromInput);
    colorGroup.appendChild(toLabel);
    colorGroup.appendChild(toInput);
    colorGroup.appendChild(preview);

    row.appendChild(label);
    row.appendChild(colorGroup);
    container.appendChild(row);
  }
}

document.getElementById('reset').addEventListener('click', () => {
  themes = JSON.parse(JSON.stringify(DEFAULT_THEMES));
  chrome.storage.sync.set({ themes }, () => {
    buildUI();
    showStatus('Reset to defaults');
  });
});

chrome.storage.sync.get({ themes: DEFAULT_THEMES }, (data) => {
  themes = data.themes;
  buildUI();
});
