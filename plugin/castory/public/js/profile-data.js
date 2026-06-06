/**
 * Castory.ProfileData — profile stats from Storage (Phase 9.1)
 */
(function (global) {
  var Castory = global.Castory || {};

  function playbackMap() {
    return Castory.Storage ? Castory.Storage.getPlaybackMap() : {};
  }

  function formatHours(hours) {
    if (hours < 1) return '<1h';
    return Math.round(hours) + 'h';
  }

  function timeAgo(timestamp) {
    if (!timestamp) return '';
    var ts = timestamp > 1e12 ? timestamp : timestamp * 1000;
    var diff = Math.max(0, Date.now() - ts);
    var mins = Math.floor(diff / 60000);
    if (mins < 60) return Math.max(1, mins) + ' min ago';
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + ' hr' + (hrs === 1 ? '' : 's') + ' ago';
    var days = Math.floor(hrs / 24);
    return days + ' day' + (days === 1 ? '' : 's') + ' ago';
  }

  function resolveEpisode(id) {
    if (!global.CASTORY_MOCK || !CASTORY_MOCK.getEpisodeById) return null;
    return CASTORY_MOCK.getEpisodeById(parseInt(id, 10));
  }

  Castory.ProfileData = {
    timeAgo: timeAgo,

    getStats: function () {
      if (global.CASTORY_MOCK && CASTORY_MOCK._profileSource === 'rest' &&
          CASTORY_MOCK.profile && CASTORY_MOCK.profile.stats) {
        return CASTORY_MOCK.profile.stats;
      }

      var bookmarks = Castory.Storage ? Castory.Storage.getBookmarks().length : 0;
      var playlists = Castory.Playlists ? Castory.Playlists.getAll().length : 0;
      var map = playbackMap();
      var started = Object.keys(map).length;
      var hours = 0;

      Object.keys(map).forEach(function (key) {
        var row = map[key];
        if (row && row.currentTime) hours += row.currentTime / 3600;
      });

      return [
        { label: 'Saved Episodes', value: String(bookmarks) },
        { label: 'Playlists', value: String(playlists) },
        { label: 'Episodes Started', value: String(started) },
        { label: 'Listening Hours', value: formatHours(hours) },
      ];
    },

    getWatchHistory: function (limit) {
      limit = limit || 12;

      if (global.CASTORY_MOCK && CASTORY_MOCK._profileSource === 'rest' &&
          CASTORY_MOCK.profile && CASTORY_MOCK.profile.watchHistory) {
        return CASTORY_MOCK.profile.watchHistory.slice(0, limit);
      }

      var map = playbackMap();
      var rows = [];

      Object.keys(map).forEach(function (key) {
        var row = map[key];
        var ep = resolveEpisode(key);
        if (!ep || !row || !row.duration) return;

        var pct = Math.round((row.currentTime / row.duration) * 100);
        pct = Math.max(0, Math.min(100, pct));

        rows.push({
          id: ep.id,
          title: ep.title,
          creator: ep.creator,
          duration: ep.duration || '',
          progress: pct,
          thumbnail: ep.thumbnail,
          updatedAt: row.updatedAt || 0,
        });
      });

      rows.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
      });

      return rows.slice(0, limit);
    },

    getRecentlyCompleted: function (limit) {
      limit = limit || 8;

      if (global.CASTORY_MOCK && CASTORY_MOCK._profileSource === 'rest' &&
          CASTORY_MOCK.profile && CASTORY_MOCK.profile.recentlyCompleted) {
        return CASTORY_MOCK.profile.recentlyCompleted.slice(0, limit);
      }

      var map = playbackMap();
      var rows = [];

      Object.keys(map).forEach(function (key) {
        var row = map[key];
        var ep = resolveEpisode(key);
        if (!ep || !row || !row.duration) return;

        var pct = (row.currentTime / row.duration) * 100;
        if (pct < 95) return;

        rows.push({
          id: ep.id,
          title: ep.title,
          creator: ep.creator,
          mediaType: ep.mediaType || 'video',
          thumbnail: ep.thumbnail,
          completedAgo: timeAgo(row.updatedAt),
          updatedAt: row.updatedAt || 0,
        });
      });

      rows.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
      });

      return rows.slice(0, limit);
    },

    getAccountStatus: function () {
      if (global.CASTORY_MOCK && CASTORY_MOCK._profileSource === 'rest' &&
          CASTORY_MOCK.profile && CASTORY_MOCK.profile.accountStatus) {
        return CASTORY_MOCK.profile.accountStatus;
      }

      var user = global.CASTORY_MOCK ? CASTORY_MOCK.user : {};
      var cfg = global.castoryConfig || {};

      if (cfg.isLoggedIn && user.joinDate) {
        return {
          plan: user.isPremium ? 'Premium' : 'Free',
          status: 'Active',
          renewal: user.isPremium ? 'Managed by site admin' : '—',
          memberSince: user.joinDate,
        };
      }

      if (global.CASTORY_MOCK && CASTORY_MOCK.profile && CASTORY_MOCK.profile.accountStatus) {
        return CASTORY_MOCK.profile.accountStatus;
      }

      return {
        plan: 'Guest',
        status: 'Preview',
        renewal: '—',
        memberSince: '—',
      };
    },

    applyPayload: function (payload) {
      if (!payload || !global.CASTORY_MOCK) return;

      if (payload.user) {
        Object.assign(CASTORY_MOCK.user, payload.user);
      }

      if (!CASTORY_MOCK.profile) CASTORY_MOCK.profile = {};

      if (Array.isArray(payload.stats)) {
        CASTORY_MOCK.profile.stats = payload.stats;
      }
      if (Array.isArray(payload.watchHistory)) {
        CASTORY_MOCK.profile.watchHistory = payload.watchHistory;
      }
      if (Array.isArray(payload.recentlyCompleted)) {
        CASTORY_MOCK.profile.recentlyCompleted = payload.recentlyCompleted;
      }
      if (payload.accountStatus) {
        CASTORY_MOCK.profile.accountStatus = payload.accountStatus;
      }

      CASTORY_MOCK._profileSource = 'rest';
    },

    saveFields: function (fields) {
      var cfg = global.castoryConfig || {};
      if (!cfg.restUrl || !cfg.isLoggedIn) {
        return Promise.reject(new Error('Login required'));
      }

      var headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
      if (cfg.nonce) headers['X-WP-Nonce'] = cfg.nonce;

      return fetch(cfg.restUrl + 'profile', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify(fields),
      }).then(function (res) {
        if (!res.ok) throw new Error('REST ' + res.status);
        return res.json();
      }).then(function (data) {
        Castory.ProfileData.applyPayload(data);
        global.dispatchEvent(new CustomEvent('castory:profile-ready', { detail: { source: 'save' } }));
        return data;
      });
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
