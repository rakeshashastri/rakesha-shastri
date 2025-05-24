(function () {
  'use strict';

  var path = window.location.pathname;
  var isWork = path.includes('work');
  var isWriting = path.includes('writing');
  var isIndex = !isWork && !isWriting;

  // Determine relative base path based on page depth
  var basePath = '';
  if (path.includes('writing/posts/')) {
    basePath = '../../';
  } else if (path.includes('writing')) {
    basePath = '../';
  }

  function renderHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;

    el.innerHTML =
      '<a class="skip-link" href="#main-content">Skip to main content</a>' +
      '<header class="site-nav" role="banner">' +
      '  <nav aria-label="Main navigation">' +
      '    <a href="' + basePath + 'index.html" class="nav-name"' + (isIndex ? ' aria-current="page"' : '') + '>Rakesha Shastri</a>' +
      '    <div class="nav-right">' +
      '      <ul class="nav-links" role="list">' +
      '        <li><a href="' + basePath + 'writing/index.html"' + (isWriting ? ' aria-current="page"' : '') + '>Writing</a></li>' +
      '        <li><a href="' + basePath + 'work.html"' + (isWork ? ' aria-current="page"' : '') + '>Work</a></li>' +
      '      </ul>' +
      '      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to dark mode">' +
      '        <svg class="icon theme-icon-light" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-moon"></use></svg>' +
      '        <svg class="icon theme-icon-dark" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-sun"></use></svg>' +
      '      </button>' +
      '    </div>' +
      '  </nav>' +
      '</header>';
  }

  function initThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function getEffectiveTheme() {
      var attr = document.documentElement.getAttribute('data-theme');
      if (attr) return attr;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateLabel() {
      var current = getEffectiveTheme();
      toggle.setAttribute('aria-label',
        current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    toggle.addEventListener('click', function () {
      var next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateLabel();
    });

    updateLabel();
  }

  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;

    var year = new Date().getFullYear();
    el.innerHTML =
      '<footer class="site-footer" role="contentinfo">' +
      '  <div class="site-footer-inner">' +
      '    <div class="footer-links">' +
      '      <a href="https://x.com/rakeshashastri" target="_blank" rel="noopener noreferrer" aria-label="X">' +
      '        <svg class="icon" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-x"></use></svg>' +
      '      </a>' +
      '      <a href="https://github.com/rakeshashastri" target="_blank" rel="noopener noreferrer" aria-label="GitHub">' +
      '        <svg class="icon" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-github"></use></svg>' +
      '      </a>' +
      '      <a href="https://www.linkedin.com/in/rakeshashastri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' +
      '        <svg class="icon" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-linkedin"></use></svg>' +
      '      </a>' +
      '      <a href="https://stackoverflow.com/users/7734643/rakesha-shastri" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow">' +
      '        <svg class="icon" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-stackoverflow"></use></svg>' +
      '      </a>' +
      '      <a href="mailto:rakesha.shastri13@gmail.com" aria-label="Email">' +
      '        <svg class="icon" aria-hidden="true"><use href="' + basePath + 'assets/icons.svg#icon-email"></use></svg>' +
      '      </a>' +
      '    </div>' +
      '    <p>&copy; ' + year + ' Rakesha Shastri</p>' +
      '  </div>' +
      '</footer>';
  }

  renderHeader();
  initThemeToggle();
  renderFooter();
})();
