/**
 * Castory localStorage persistence (Phase 7)
 */
(function (global) {
  var Castory = global.Castory || {};
  var PREFIX = 'castory:';

  Castory.Storage = {
    get: function (key, fallback) {
      try {
        var raw = global.localStorage.getItem(PREFIX + key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        global.localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) { /* quota */ }
    },

    getNowPlaying: function () {
      return this.get('nowPlaying', null);
    },

    setNowPlaying: function (episodeId, progress) {
      this.set('nowPlaying', {
        episodeId: episodeId,
        progress: progress || 0,
        updatedAt: Date.now(),
      });
      if (Castory.GlobalPlayer) Castory.GlobalPlayer.render();
    },

    clearNowPlaying: function () {
      try { global.localStorage.removeItem(PREFIX + 'nowPlaying'); } catch (e) {}
      if (Castory.GlobalPlayer) Castory.GlobalPlayer.render();
    },

    getBookmarks: function () {
      return this.get('bookmarks', []);
    },

    toggleBookmark: function (episodeId) {
      var list = this.getBookmarks();
      var idx = list.indexOf(episodeId);
      if (idx === -1) list.push(episodeId);
      else list.splice(idx, 1);
      this.set('bookmarks', list);
      return idx === -1;
    },

    isBookmarked: function (episodeId) {
      return this.getBookmarks().indexOf(episodeId) !== -1;
    },

    getWatchLater: function () {
      return this.get('watchLater', []);
    },

    toggleWatchLater: function (episodeId) {
      var list = this.getWatchLater();
      var idx = list.indexOf(episodeId);
      if (idx === -1) list.push(episodeId);
      else list.splice(idx, 1);
      this.set('watchLater', list);
      return idx === -1;
    },

    getTheme: function () {
      return this.get('theme', 'dark');
    },

    setTheme: function (theme) {
      this.set('theme', theme);
      this.applyTheme(theme);
    },

    applyTheme: function (theme) {
      var t = theme || this.getTheme();
      document.documentElement.setAttribute('data-theme', t);
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
