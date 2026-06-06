/**
 * Castory.LibraryData — resolve episodes from Storage lists (Phase 9.3)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.LibraryData = {
    getEpisodesByIds: function (ids) {
      if (!global.CASTORY_MOCK || !ids || !ids.length) return [];
      return ids.map(function (id) {
        return CASTORY_MOCK.getEpisodeById(parseInt(id, 10));
      }).filter(Boolean);
    },

    getBookmarkedEpisodes: function () {
      if (!Castory.Storage) return [];
      return this.getEpisodesByIds(Castory.Storage.getBookmarks());
    },

    getWatchLaterEpisodes: function () {
      if (!Castory.Storage) return [];
      return this.getEpisodesByIds(Castory.Storage.getWatchLater());
    },

    getContinueItems: function (mediaType) {
      if (!Castory.Storage || !global.CASTORY_MOCK) return [];
      var map = Castory.Storage.getPlaybackMap();
      var items = [];

      Object.keys(map).forEach(function (key) {
        var row = map[key];
        var ep = CASTORY_MOCK.getEpisodeById(parseInt(key, 10));
        if (!ep || !row || !row.duration) return;
        if (mediaType && ep.mediaType !== mediaType) return;

        var pct = Math.round((row.currentTime / row.duration) * 100);
        if (pct < 2 || pct >= 95) return;

        items.push({
          ep: ep,
          progress: pct,
          updatedAt: row.updatedAt || 0,
        });
      });

      items.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
      });

      return items;
    },

    emptyMessage: function (kind) {
      if (kind === 'bookmarks') {
        return 'No bookmarked episodes yet. Tap the bookmark icon on any episode.';
      }
      if (kind === 'watchLater') {
        return 'Nothing saved for later. Use Save Later on the home hero or episode cards.';
      }
      if (kind === 'continue') {
        return 'Start listening or watching — your progress will appear here.';
      }
      return 'No items yet.';
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
