/**
 * Castory core bootstrap
 * Load order: utils → storage → mock-data → components → castory.js
 */
(function (global) {
  const Castory = global.Castory || {};
  var _autoBooted = false;

  Castory.init = function (options) {
    const opts = Object.assign({
      sidebar: true,
      nav: true,
      globalPlayer: true,
      search: true,
      notifications: true,
      lazyImages: true,
      hydrateDates: false,
    }, options || {});

    if (Castory.Storage) Castory.Storage.applyTheme();

    if (opts.sidebar !== false && Castory.Sidebar) {
      Castory.Sidebar.init(opts.sidebar === true ? {} : opts.sidebar);
    }

    if (opts.nav !== false && Castory.Nav) {
      Castory.Nav.syncActive();
    }

    if (opts.globalPlayer !== false && Castory.GlobalPlayer) {
      Castory.GlobalPlayer.init();
    }

    if (opts.search !== false && Castory.Search) {
      Castory.Search.init(typeof opts.search === 'object' ? opts.search : {});
    }

    if (opts.notifications !== false && Castory.Notifications) {
      Castory.Notifications.init();
    }

    if (opts.lazyImages !== false) {
      Castory.lazyLoadImages();
    }

    if (opts.hydrateDates && global.CASTORY_MOCK) {
      CASTORY_MOCK.episodes.forEach(function (ep) {
        ep.date = Castory.formatRelativeDate(ep.publishedAt);
      });
    }

    document.documentElement.setAttribute('data-castory-ready', 'true');
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      if (_autoBooted) return;
      if (document.body && document.body.hasAttribute('data-castory-app')) {
        Castory.init();
        _autoBooted = true;
      }
    });
  }

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
