/**
 * WordPress profile sync — hydrate CASTORY_MOCK.user + computed widgets (Phase 9.1)
 */
(function (global) {
  if (!global.castoryConfig || !global.castoryConfig.restUrl) return;
  if (!global.Castory || !Castory.ProfileData) return;

  var cfg = global.castoryConfig;

  function headers() {
    var h = { Accept: 'application/json' };
    if (cfg.nonce) h['X-WP-Nonce'] = cfg.nonce;
    return h;
  }

  function fetchProfile() {
    if (!cfg.isLoggedIn) {
      global.dispatchEvent(new CustomEvent('castory:profile-ready', { detail: { source: 'guest' } }));
      return Promise.resolve(null);
    }

    return fetch(cfg.restUrl + 'profile', { credentials: 'same-origin', headers: headers() })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (data) {
          Castory.ProfileData.applyPayload(data);
        }
        global.dispatchEvent(new CustomEvent('castory:profile-ready', {
          detail: { source: data ? 'rest' : 'mock' },
        }));
        return data;
      })
      .catch(function () {
        global.dispatchEvent(new CustomEvent('castory:profile-ready', { detail: { source: 'error' } }));
        return null;
      });
  }

  function chainAfterUserData() {
    var base = global.castoryDataReady;
    if (base && typeof base.then === 'function') {
      global.castoryDataReady = base.then(function () {
        return fetchProfile();
      });
    } else {
      fetchProfile();
    }
  }

  chainAfterUserData();
})(typeof window !== 'undefined' ? window : globalThis);
