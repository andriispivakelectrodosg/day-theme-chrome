const DEFAULT_THEMES = {
  '0': { from: '#ffecd2', to: '#fcb69f' },
  '1': { from: '#667eea', to: '#764ba2' },
  '2': { from: '#f093fb', to: '#f5576c' },
  '3': { from: '#4facfe', to: '#00f2fe' },
  '4': { from: '#43e97b', to: '#38f9d7' },
  '5': { from: '#fa709a', to: '#fee140' },
  '6': { from: '#a18cd1', to: '#fbc2eb' },
};

let lastAppliedDay = null;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function applyBrowserTheme(themes) {
  const dayKey = String(new Date().getDay());
  const theme = themes[dayKey] || DEFAULT_THEMES[dayKey];

  chrome.theme.update({
    colors: {
      frame: hexToRgb(theme.from),
      toolbar: hexToRgb(theme.to),
      tab_text: [255, 255, 255],
      bookmark_text: [255, 255, 255],
      tab_background_text: [255, 255, 255],
    },
  });

  lastAppliedDay = dayKey;
}

function loadAndApply() {
  chrome.storage.sync.get({ themes: DEFAULT_THEMES }, (data) => {
    applyBrowserTheme(data.themes);
  });
}

function setupAlarm() {
  chrome.alarms.create('dayChange', { periodInMinutes: 60 });
}

chrome.runtime.onInstalled.addListener(() => {
  loadAndApply();
  setupAlarm();
});

chrome.runtime.onStartup.addListener(() => {
  loadAndApply();
  setupAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dayChange') {
    const currentDay = String(new Date().getDay());
    if (currentDay !== lastAppliedDay) {
      loadAndApply();
    }
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.themes) {
    applyBrowserTheme(changes.themes.newValue);
  }
});
