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

    setNowPlaying: function (episodeId, currentTime, duration) {
      var time = typeof currentTime === 'number' ? currentTime : 0;
      var dur = typeof duration === 'number' ? duration : 0;
      var progress = dur > 0 ? (time / dur) * 100 : (typeof currentTime === 'number' && currentTime <= 100 ? currentTime : 0);

      this.set('nowPlaying', {
        episodeId: episodeId,
        currentTime: time,
        duration: dur,
        progress: progress,
        updatedAt: Date.now(),
      });
      if (Castory.GlobalPlayer) Castory.GlobalPlayer.render();
    },

    getPlaybackMap: function () {
      return this.get('playback', {});
    },

    getPlaybackPosition: function (episodeId) {
      var map = this.getPlaybackMap();
      var row = map[episodeId];
      return row && typeof row.currentTime === 'number' ? row.currentTime : 0;
    },

    setPlaybackPosition: function (episodeId, currentTime, duration) {
      var map = this.getPlaybackMap();
      map[String(episodeId)] = {
        currentTime: currentTime || 0,
        duration: duration || 0,
        updatedAt: Date.now(),
      };
      this.set('playback', map);
      global.dispatchEvent(new CustomEvent('castory:playback'));
      if (Castory.Storage.syncProgressRemote) {
        Castory.Storage.syncProgressRemote(episodeId, currentTime, duration);
      }
    },

    clearNowPlaying: function () {
      try { global.localStorage.removeItem(PREFIX + 'nowPlaying'); } catch (e) {}
      if (Castory.GlobalPlayer) Castory.GlobalPlayer.render();
    },

    getBookmarks: function () {
      return this._normalizeIdList(this.get('bookmarks', []));
    },

    toggleBookmark: function (episodeId) {
      var id = parseInt(episodeId, 10);
      if (!id) return false;
      var list = this.getBookmarks();
      var idx = list.indexOf(id);
      var added;
      if (idx === -1) {
        list.push(id);
        added = true;
      } else {
        list.splice(idx, 1);
        added = false;
      }
      this.set('bookmarks', list);
      this._emitLibrary('bookmark', id, added);
      return added;
    },

    isBookmarked: function (episodeId) {
      var id = parseInt(episodeId, 10);
      return this.getBookmarks().indexOf(id) !== -1;
    },

    getWatchLater: function () {
      return this._normalizeIdList(this.get('watchLater', []));
    },

    toggleWatchLater: function (episodeId) {
      var id = parseInt(episodeId, 10);
      if (!id) return false;
      var list = this.getWatchLater();
      var idx = list.indexOf(id);
      var added;
      if (idx === -1) {
        list.push(id);
        added = true;
      } else {
        list.splice(idx, 1);
        added = false;
      }
      this.set('watchLater', list);
      this._emitLibrary('watchLater', id, added);
      return added;
    },

    isWatchLater: function (episodeId) {
      var id = parseInt(episodeId, 10);
      return this.getWatchLater().indexOf(id) !== -1;
    },

    _normalizeIdList: function (list) {
      var map = {};
      (list || []).forEach(function (x) {
        var id = parseInt(x, 10);
        if (id > 0) map[id] = true;
      });
      return Object.keys(map).map(function (k) { return parseInt(k, 10); });
    },

    _emitLibrary: function (type, episodeId, added) {
      if (this.syncLibraryRemote) {
        this.syncLibraryRemote(type, episodeId);
      }
      global.dispatchEvent(new CustomEvent('castory:library', {
        detail: { type: type, episodeId: episodeId, added: added },
      }));
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
