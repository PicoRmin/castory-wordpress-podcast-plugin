/**
 * Global search → Explore with query (Phase 7)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.Search = {
    init: function (options) {
      var opts = options || {};
      var inputs = Castory.qsa(opts.selector || '.search-box input, #searchInput, [data-global-search]');
      var self = this;

      inputs.forEach(function (input) {
        input.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter') return;
          var q = input.value.trim();
          if (!q) return;
          self.redirect(q);
        });
      });

      var params = new URLSearchParams(global.location.search);
      var q = params.get('q');
      if (q && global.location.pathname.indexOf('/explore/') !== -1) {
        inputs.forEach(function (input) {
          input.value = q;
        });
      }
    },

    redirect: function (query) {
      var prefix = Castory.Nav ? Castory.Nav.getPathPrefix() : '../';
      var url = prefix + 'explore/index.html?q=' + encodeURIComponent(query);
      global.location.href = url;
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
