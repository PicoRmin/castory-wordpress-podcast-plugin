/**
 * WordPress playback progress — REST sync for logged-in users (Phase 9.3).
 */
(function (global) {
  if (!global.castoryConfig || !global.castoryConfig.restUrl) return;

  var cfg = global.castoryConfig;
  var syncTimer = null;

  function headers() {
    var h = { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (cfg.nonce) h['X-WP-Nonce'] = cfg.nonce;
    return h;
  }

  function mergeRemoteProgress(items) {
    if (!items || !global.Castory || !Castory.Storage) return;
    var map = Castory.Storage.getPlaybackMap();
    Object.keys(items).forEach(function (key) {
      var row = items[key];
      if (!row || typeof row.currentTime !== 'number') return;
      var local = map[key];
      if (!local || !local.updatedAt || (row.updatedAt * 1000) > local.updatedAt) {
        map[key] = {
          currentTime: row.currentTime,
          duration: row.duration || 0,
          updatedAt: row.updatedAt ? row.updatedAt * 1000 : Date.now(),
        };
      }
    });
    Castory.Storage.set('playback', map);
  }

  function fetchProgress() {
    if (!cfg.isLoggedIn) return Promise.resolve();
    return fetch(cfg.restUrl + 'progress', { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (data && data.items) mergeRemoteProgress(data.items);
      })
      .catch(function () { return null; });
  }

  function pushProgress(episodeId, currentTime, duration) {
    if (!cfg.isLoggedIn || !episodeId) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      fetch(cfg.restUrl + 'progress', {
        method: 'POST',
        credentials: 'same-origin',
        headers: headers(),
        body: JSON.stringify({
          episode_id: episodeId,
          current_time: currentTime,
          duration: duration,
        }),
      }).catch(function () { return null; });
    }, 800);
  }

  if (global.Castory && Castory.Storage) {
    Castory.Storage.syncProgressRemote = pushProgress;
  }

  global.addEventListener('castory:player', function (e) {
    var state = e.detail && e.detail.state;
    if (!state || !state.episodeId) return;
    pushProgress(state.episodeId, state.currentTime, state.duration);
  });

  if (global.castoryDataReady && typeof global.castoryDataReady.then === 'function') {
    global.castoryDataReady = global.castoryDataReady.then(function () {
      return fetchProgress();
    });
  } else {
    fetchProgress();
  }
})(typeof window !== 'undefined' ? window : globalThis);
