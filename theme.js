(() => {
  const storageKey = 'personal-site-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  let toggle;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // 存储不可用时，仍然可以切换当前页面的主题。
  }

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '切换浅色' : '切换深色';
    }
  }

  // 在样式加载前应用主题，避免刷新时先闪现浅色背景。
  applyTheme();

  document.addEventListener('DOMContentLoaded', () => {
    toggle = document.getElementById('theme-toggle');
    applyTheme();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // 主题已在当前页面生效，无需依赖存储成功。
      }
    });
  });

  systemTheme.addEventListener('change', () => {
    if (preference === null) applyTheme();
  });
})();
