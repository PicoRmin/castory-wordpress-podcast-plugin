/**
 * WordPress library sync — bookmarks & watch later (Phase 9.3)
 */
(function (global) {
  if (!global.castoryConfig || !global.castoryConfig.restUrl) return;
  if (!global.Castory || !Castory.Storage) return;

  var cfg = global.castoryConfig;
  var syncTimer = null;

  function headers() {
    var h = { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (cfg.nonce) h['X-WP-Nonce'] = cfg.nonce;
    return h;
  }

  function normalizeIds(list) {
    var map = {};
    (list || []).forEach(function (id) {
      id = parseInt(id, 10);
      if (id > 0) map[id] = true;
    });
    return Object.keys(map).map(function (k) { return parseInt(k, 10); });
  }

  function mergeLists(local, remote) {
    var map = {};
    normalizeIds(local).concat(normalizeIds(remote)).forEach(function (id) {
      map[id] = true;
    });
    return Object.keys(map).map(function (k) { return parseInt(k, 10); });
  }

  function listsEqual(a, b) {
    var aa = normalizeIds(a).sort(function (x, y) { return x - y; });
    var bb = normalizeIds(b).sort(function (x, y) { return x - y; });
    if (aa.length !== bb.length) return false;
    for (var i = 0; i < aa.length; i++) {
      if (aa[i] !== bb[i]) return false;
    }
    return true;
  }

  function applyLibrary(data) {
    if (!data) return;
    if (Array.isArray(data.bookmarks)) {
      Castory.Storage.set('bookmarks', normalizeIds(data.bookmarks));
    }
    if (Array.isArray(data.watchLater)) {
      Castory.Storage.set('watchLater', normalizeIds(data.watchLater));
    }
    global.dispatchEvent(new CustomEvent('castory:library-ready'));
  }

  function pushFullLibrary(bookmarks, watchLater) {
    if (!cfg.isLoggedIn) return Promise.resolve();
    return fetch(cfg.restUrl + 'library', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: headers(),
      body: JSON.stringify({
        bookmarks: bookmarks,
        watchLater: watchLater,
      }),
    }).catch(function () { return null; });
  }

  function fetchLibrary() {
    if (!cfg.isLoggedIn) {
      global.dispatchEvent(new CustomEvent('castory:library-ready'));
      return Promise.resolve();
    }

    return fetch(cfg.restUrl + 'library', { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (!data) {
          global.dispatchEvent(new CustomEvent('castory:library-ready'));
          return null;
        }

        var localBookmarks = Castory.Storage.getBookmarks();
        var localWatch = Castory.Storage.getWatchLater();
        var mergedBookmarks = mergeLists(localBookmarks, data.bookmarks);
        var mergedWatch = mergeLists(localWatch, data.watchLater);

        applyLibrary({ bookmarks: mergedBookmarks, watchLater: mergedWatch });

        if (!listsEqual(mergedBookmarks, data.bookmarks) || !listsEqual(mergedWatch, data.watchLater)) {
          return pushFullLibrary(mergedBookmarks, mergedWatch);
        }
        return null;
      })
      .catch(function () {
        global.dispatchEvent(new CustomEvent('castory:library-ready'));
        return null;
      });
  }

  function pushToggle(type, episodeId) {
    if (!cfg.isLoggedIn || !episodeId) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      var path = type === 'bookmark' ? 'library/bookmark' : 'library/watch-later';
      fetch(cfg.restUrl + path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: headers(),
        body: JSON.stringify({ episode_id: episodeId }),
      }).catch(function () { return null; });
    }, 400);
  }

  Castory.Storage.syncLibraryRemote = function (type, episodeId) {
    pushToggle(type, episodeId);
  };

  if (global.castoryDataReady && typeof global.castoryDataReady.then === 'function') {
    global.castoryDataReady = global.castoryDataReady.then(function () {
      return fetchLibrary();
    });
  } else {
    fetchLibrary();
  }
})(typeof window !== 'undefined' ? window : globalThis);
