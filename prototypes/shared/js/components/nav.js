/**
 * Navigation active-state sync (Phase 7)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.Nav = {
    getRoute: function () {
      var path = (global.location.pathname || '').replace(/\\/g, '/').toLowerCase();
      var href = (global.location.href || '').toLowerCase();

      if (path.indexOf('/episode-detail/') !== -1) return 'episode';
      if (path.indexOf('/explore/') !== -1) return 'explore';
      if (path.indexOf('/library/') !== -1) return 'library';
      if (path.indexOf('/profile/') !== -1) return 'profile';
      if (path.indexOf('/trending-video/') !== -1 ||
          path.indexOf('/trending-audio/') !== -1 ||
          path.indexOf('/new-episodes/') !== -1) return 'trending';
      if (path.indexOf('/home/') !== -1 || /\/home\/index\.html$/i.test(path)) return 'home';
      if (href.indexOf('/prototypes/home') !== -1 && !path.indexOf('/episode')) return 'home';
      return null;
    },

    syncActive: function () {
      var route = this.getRoute();
      if (!route) return;

      var selectors = '.nav-item, .nav-link, .bottom-nav a, .mobile-nav a, .bottom-tabs a';
      Castory.qsa(selectors).forEach(function (el) {
        el.classList.remove('active');
        var link = (el.getAttribute('href') || '').toLowerCase();
        if (!link || link === '#') return;

        var isActive = false;
        if (route === 'home' && (link.indexOf('home/index') !== -1 || link === 'index.html')) isActive = true;
        if (route === 'explore' && link.indexOf('explore') !== -1) isActive = true;
        if (route === 'library' && link.indexOf('library') !== -1) isActive = true;
        if (route === 'profile' && link.indexOf('profile') !== -1) isActive = true;
        if (route === 'trending' && (
          link.indexOf('trending-video') !== -1 ||
          link.indexOf('trending-audio') !== -1 ||
          link.indexOf('new-episodes') !== -1
        )) isActive = true;

        if (isActive) el.classList.add('active');
      });
    },

    getPathPrefix: function () {
      var path = (global.location.pathname || '').replace(/\\/g, '/');
      var depth = (path.match(/\//g) || []).length;
      if (path.indexOf('/episode-detail/') !== -1) return '../../';
      if (path.indexOf('/prototypes/') !== -1) {
        var after = path.split('/prototypes/')[1] || '';
        var segments = after.split('/').filter(Boolean);
        if (segments.length <= 1) return '../';
        return '../'.repeat(segments.length - 1);
      }
      return '../';
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
