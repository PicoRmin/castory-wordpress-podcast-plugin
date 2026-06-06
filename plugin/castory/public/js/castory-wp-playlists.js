/**
 * WordPress playlist sync (Phase 9.3)
 */
(function (global) {
  if (!global.castoryConfig || !global.castoryConfig.restUrl) return;
  if (!global.Castory || !Castory.Playlists) return;

  var cfg = global.castoryConfig;
  var syncTimer = null;

  function headers() {
    var h = { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (cfg.nonce) h['X-WP-Nonce'] = cfg.nonce;
    return h;
  }

  function normalizeList(items) {
    return (items || []).map(function (pl) {
      return {
        id: pl.id,
        name: pl.name,
        episodeIds: (pl.episodeIds || []).map(function (id) { return parseInt(id, 10); }).filter(Boolean),
        createdAt: pl.createdAt || 0,
        updatedAt: pl.updatedAt || 0,
      };
    });
  }

  function mergePlaylists(local, remote) {
    var map = {};
    normalizeList(local).concat(normalizeList(remote)).forEach(function (pl) {
      if (!pl.id) return;
      var existing = map[pl.id];
      if (!existing || (pl.updatedAt || 0) >= (existing.updatedAt || 0)) {
        map[pl.id] = pl;
      }
    });
    return Object.keys(map).map(function (key) { return map[key]; })
      .sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
  }

  function listsEqual(a, b) {
    return JSON.stringify(normalizeList(a)) === JSON.stringify(normalizeList(b));
  }

  function applyPlaylists(items) {
    Castory.Storage.set('playlists', normalizeList(items));
    global.dispatchEvent(new CustomEvent('castory:playlists-ready'));
    global.dispatchEvent(new CustomEvent('castory:playlists'));
  }

  function pushAll(items) {
    if (!cfg.isLoggedIn) return Promise.resolve();
    return fetch(cfg.restUrl + 'playlists', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: headers(),
      body: JSON.stringify({ items: normalizeList(items) }),
    }).catch(function () { return null; });
  }

  function fetchPlaylists() {
    if (!cfg.isLoggedIn) {
      global.dispatchEvent(new CustomEvent('castory:playlists-ready'));
      return Promise.resolve();
    }

    return fetch(cfg.restUrl + 'playlists', { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.items)) {
          global.dispatchEvent(new CustomEvent('castory:playlists-ready'));
          return null;
        }

        var merged = mergePlaylists(Castory.Playlists.getAll(), data.items);
        applyPlaylists(merged);

        if (!listsEqual(merged, data.items)) {
          return pushAll(merged);
        }
        return null;
      })
      .catch(function () {
        global.dispatchEvent(new CustomEvent('castory:playlists-ready'));
        return null;
      });
  }

  Castory.Playlists.syncRemote = function (list) {
    if (!cfg.isLoggedIn) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      pushAll(list || Castory.Playlists.getAll());
    }, 600);
  };

  if (global.castoryDataReady && typeof global.castoryDataReady.then === 'function') {
    global.castoryDataReady = global.castoryDataReady.then(function () {
      return fetchPlaylists();
    });
  } else {
    fetchPlaylists();
  }
})(typeof window !== 'undefined' ? window : globalThis);
