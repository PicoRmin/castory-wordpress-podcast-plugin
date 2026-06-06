/**
 * Castory.QuickPlay — play episodes from grid/list without opening detail page (Phase 9.3)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.QuickPlay = {
    init: function () {
      if (this._bound) return;
      this._bound = true;
      var self = this;

      document.addEventListener('click', function (e) {
        if (e.target.closest('.castory-quick-play')) {
          e.preventDefault();
          e.stopPropagation();
          var link = e.target.closest('[data-episode-id], .episode-card-link, .episode-list-link, .episode-row-link');
          if (link) self.playFromLink(link);
          return;
        }

        var rowPlay = e.target.closest('.episode-row-link .episode-thumb button, .episode-list-link .list-actions .play-btn');
        if (rowPlay) {
          e.preventDefault();
          e.stopPropagation();
          var parent = rowPlay.closest('.episode-row-link, .episode-list-link');
          if (parent) self.playFromLink(parent);
        }
      });
    },

    extractEpisodeId: function (link) {
      if (!link) return 0;
      var id = parseInt(link.getAttribute('data-episode-id'), 10);
      if (id) return id;

      var href = link.getAttribute('href') || '';
      var match = href.match(/[?&]id=(\d+)/);
      if (match) return parseInt(match[1], 10);

      if (global.CASTORY_MOCK && CASTORY_MOCK.episodes) {
        for (var i = 0; i < CASTORY_MOCK.episodes.length; i++) {
          var ep = CASTORY_MOCK.episodes[i];
          if (ep.permalink && href.indexOf(ep.permalink) !== -1) return ep.id;
        }
      }
      return 0;
    },

    playEpisode: function (ep) {
      if (!ep || !Castory.Player) return;
      Castory.Player.load(ep, { resume: true });
      Castory.Player.play().catch(function () { /* gesture required */ });
    },

    playFromLink: function (link) {
      var id = this.extractEpisodeId(link);
      if (!id || !global.CASTORY_MOCK) return;
      var ep = CASTORY_MOCK.getEpisodeById(id);
      if (!ep) return;
      this.playEpisode(ep);
    },

    buttonHtml: function (extraClass) {
      var cls = 'castory-quick-play' + (extraClass ? ' ' + extraClass : '');
      return '<button type="button" class="' + cls + '" aria-label="Play episode"><i class="fa-solid fa-play"></i></button>';
    },

    linkAttrs: function (ep) {
      return ' data-episode-id="' + ep.id + '"';
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
