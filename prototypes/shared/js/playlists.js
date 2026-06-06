/**
 * Castory.Playlists — user playlist CRUD (Phase 9.3)
 */
(function (global) {
  var Castory = global.Castory || {};
  var PLACEHOLDER_COVER = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200';

  Castory.Playlists = {
    getAll: function () {
      if (!Castory.Storage) return [];
      return Castory.Storage.get('playlists', []);
    },

    saveAll: function (list) {
      if (!Castory.Storage) return;
      Castory.Storage.set('playlists', list);
      this._emit();
      if (typeof this.syncRemote === 'function') {
        this.syncRemote(list);
      }
    },

    getById: function (id) {
      return this.getAll().find(function (pl) { return pl.id === id; }) || null;
    },

    enrich: function (pl) {
      if (!pl) return null;
      var episodes = Castory.LibraryData
        ? Castory.LibraryData.getEpisodesByIds(pl.episodeIds || [])
        : [];
      var covers = episodes.slice(0, 4).map(function (ep) { return ep.thumbnail; });
      while (covers.length < 4) covers.push(PLACEHOLDER_COVER);

      var updatedLabel = 'Just now';
      if (pl.updatedAt && Castory.formatRelativeDate) {
        var ts = pl.updatedAt;
        if (ts < 1e12) ts *= 1000;
        updatedLabel = Castory.formatRelativeDate(ts);
      }

      return {
        id: pl.id,
        name: pl.name,
        episodeIds: pl.episodeIds || [],
        episodes: episodes.length,
        episodeItems: episodes,
        covers: covers,
        updated: updatedLabel,
        updatedAt: pl.updatedAt || 0,
        createdAt: pl.createdAt || 0,
      };
    },

    getEnrichedAll: function () {
      return this.getAll()
        .map(this.enrich.bind(this))
        .filter(Boolean)
        .sort(function (a, b) { return b.updatedAt - a.updatedAt; });
    },

    create: function (name, episodeIds) {
      var list = this.getAll();
      var now = Math.floor(Date.now() / 1000);
      var pl = {
        id: 'pl_' + now + '_' + Math.random().toString(36).slice(2, 10),
        name: String(name || '').trim() || 'Untitled Playlist',
        episodeIds: this._normalizeIds(episodeIds),
        createdAt: now,
        updatedAt: now,
      };
      list.push(pl);
      this.saveAll(list);
      return pl;
    },

    update: function (id, patch) {
      var list = this.getAll();
      var updated = null;

      list = list.map(function (pl) {
        if (pl.id !== id) return pl;
        var next = Object.assign({}, pl);
        if (patch.name !== undefined) {
          next.name = String(patch.name).trim() || pl.name;
        }
        if (patch.episodeIds !== undefined) {
          next.episodeIds = Castory.Playlists._normalizeIds(patch.episodeIds);
        }
        next.updatedAt = Math.floor(Date.now() / 1000);
        updated = next;
        return next;
      });

      if (!updated) return null;
      this.saveAll(list);
      return updated;
    },

    remove: function (id) {
      var list = this.getAll().filter(function (pl) { return pl.id !== id; });
      if (list.length === this.getAll().length) return false;
      this.saveAll(list);
      return true;
    },

    toggleEpisode: function (playlistId, episodeId) {
      var pl = this.getById(playlistId);
      if (!pl) return null;
      var ids = (pl.episodeIds || []).slice();
      var id = parseInt(episodeId, 10);
      var idx = ids.indexOf(id);
      if (idx === -1) ids.push(id);
      else ids.splice(idx, 1);
      return this.update(playlistId, { episodeIds: ids });
    },

    seedDefaults: function () {
      if (this.getAll().length) return;
      if (!global.CASTORY_MOCK || !CASTORY_MOCK.library || !CASTORY_MOCK.library.defaultPlaylists) return;

      var now = Math.floor(Date.now() / 1000);
      var list = CASTORY_MOCK.library.defaultPlaylists.map(function (seed, index) {
        return {
          id: 'pl_seed_' + (index + 1),
          name: seed.name,
          episodeIds: Castory.Playlists._normalizeIds(seed.episodeIds),
          createdAt: now - (index * 86400),
          updatedAt: now - (index * 43200),
        };
      });
      Castory.Storage.set('playlists', list);
      this._emit();
    },

    _normalizeIds: function (ids) {
      var map = {};
      (ids || []).forEach(function (raw) {
        var id = parseInt(raw, 10);
        if (id > 0) map[id] = true;
      });
      return Object.keys(map).map(function (k) { return parseInt(k, 10); });
    },

    _emit: function () {
      global.dispatchEvent(new CustomEvent('castory:playlists'));
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
