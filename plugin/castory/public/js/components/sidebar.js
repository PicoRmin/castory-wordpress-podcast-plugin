/**
 * Mobile sidebar drawer
 */
(function (global) {
  const Castory = global.Castory || {};

  Castory.Sidebar = {
    init: function (options) {
      const opts = options || {};
      const menuBtn = Castory.qs(opts.menuBtn || '#mobileMenu, .mobile-menu-btn, [data-sidebar-toggle]');
      const sidebar = Castory.qs(opts.sidebar || '#sidebar, .sidebar--drawer, .sidebar');
      if (!menuBtn || !sidebar) return;
      if (sidebar.dataset.castorySidebarInit === 'true') return;
      sidebar.dataset.castorySidebarInit = 'true';

      let backdrop = Castory.qs('.sidebar-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
      }

      sidebar.classList.add('sidebar--drawer');

      function open() {
        sidebar.classList.add('sidebar--open');
        backdrop.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
      }

      function close() {
        sidebar.classList.remove('sidebar--open');
        backdrop.classList.remove('is-visible');
        document.body.style.overflow = '';
      }

      function toggle() {
        if (sidebar.classList.contains('sidebar--open')) close();
        else open();
      }

      menuBtn.addEventListener('click', toggle);
      backdrop.addEventListener('click', close);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
