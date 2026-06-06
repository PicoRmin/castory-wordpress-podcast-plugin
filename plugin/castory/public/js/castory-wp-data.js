/**
 * WordPress REST hydration — replaces CASTORY_MOCK when CPT data exists.
 * Load after castory-wp-bridge.js, before page scripts.
 */
(function (global) {
  if (!global.castoryConfig || !global.castoryConfig.restUrl) {
    global.castoryDataReady = Promise.resolve();
    return;
  }

  var cfg = global.castoryConfig;

  function headers() {
    var h = { Accept: 'application/json' };
    if (cfg.nonce) h['X-WP-Nonce'] = cfg.nonce;
    return h;
  }

  function normalizeEpisode(ep) {
    if (!ep) return ep;
    ep.mediaType = ep.mediaType || 'video';
    ep.viewsCount = ep.viewsCount || ep.views || 0;
    ep.views = ep.viewsFormatted || (global.Castory && Castory.formatViews
      ? Castory.formatViews(ep.viewsCount || ep.views || 0)
      : String(ep.viewsCount || ep.views || 0));
    if (global.Castory && Castory.formatRelativeDate && ep.publishedAt) {
      ep.date = Castory.formatRelativeDate(ep.publishedAt);
    } else if (!ep.date) {
      ep.date = 'Recently';
    }
    if (ep.thumbnailUrl && !ep.thumbnail) ep.thumbnail = ep.thumbnailUrl;
    if (!ep.thumbnail) {
      ep.thumbnail = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800';
    }
    ep.verified = !!ep.verified;
    return ep;
  }

  function mergeEpisodes(items) {
    if (!global.CASTORY_MOCK || !items || !items.length) return false;
    CASTORY_MOCK.episodes = items.map(normalizeEpisode);
    CASTORY_MOCK._source = 'rest';
    return true;
  }

  var WIDGET_KEYS = [
    'heroSlides',
    'exploreHeroSlides',
    'creators',
    'popularCreators',
    'trendingTopicsExplore',
    'discoveryStats',
    'tagCloud',
    'topics',
    'mostFollowedTopics',
  ];

  function mergeWidgets(data) {
    if (!global.CASTORY_MOCK || !data) return false;
    var merged = false;

    WIDGET_KEYS.forEach(function (key) {
      var value = data[key];
      if (!value) return;
      if (Array.isArray(value) && !value.length) return;
      CASTORY_MOCK[key] = value;
      merged = true;
    });

    if (merged) {
      CASTORY_MOCK._widgetsSource = 'rest';
    }
    return merged;
  }

  function fetchEpisodes(params) {
    var qs = new URLSearchParams(params || { per_page: 50, page: 1 });
    return fetch(cfg.restUrl + 'episodes?' + qs.toString(), { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) throw new Error('REST ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && data.items && data.items.length) {
          mergeEpisodes(data.items);
          return true;
        }
        return false;
      });
  }

  function fetchWidgets() {
    return fetch(cfg.restUrl + 'widgets', { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) throw new Error('REST ' + res.status);
        return res.json();
      })
      .then(function (data) {
        return mergeWidgets(data);
      });
  }

  function fetchEpisodeById(id) {
    return fetch(cfg.restUrl + 'episodes/' + id, { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (ep) {
        if (!ep || !global.CASTORY_MOCK) return null;
        normalizeEpisode(ep);
        var exists = CASTORY_MOCK.episodes.some(function (e) { return e.id === ep.id; });
        if (!exists) CASTORY_MOCK.episodes.push(ep);
        return ep;
      });
  }

  function resolveEpisodeId() {
    try {
      var wantId = parseInt(new URLSearchParams(global.location.search).get('id'), 10);
      if (!wantId && cfg.currentEpisodeId) {
        wantId = parseInt(cfg.currentEpisodeId, 10);
      }
      return wantId || 0;
    } catch (e) {
      return cfg.currentEpisodeId ? parseInt(cfg.currentEpisodeId, 10) : 0;
    }
  }

  function maybeFetchQueryEpisode() {
    var wantId = resolveEpisodeId();
    if (!wantId || !global.CASTORY_MOCK) return Promise.resolve();
    if (CASTORY_MOCK.episodes.some(function (e) { return e.id === wantId; })) {
      return Promise.resolve();
    }
    return fetchEpisodeById(wantId);
  }

  global.castoryDataReady = Promise.all([
    fetchEpisodes().catch(function () { return false; }),
    fetchWidgets().catch(function () { return false; }),
  ])
    .then(function () { return maybeFetchQueryEpisode(); })
    .then(function () {
      var usedRest = global.CASTORY_MOCK && CASTORY_MOCK._source === 'rest';
      var usedWidgets = global.CASTORY_MOCK && CASTORY_MOCK._widgetsSource === 'rest';
      global.dispatchEvent(new CustomEvent('castory:data-ready', {
        detail: {
          source: usedRest ? 'rest' : 'mock',
          widgets: usedWidgets ? 'rest' : 'mock',
        },
      }));
      return usedRest || usedWidgets;
    });
})(typeof window !== 'undefined' ? window : globalThis);
