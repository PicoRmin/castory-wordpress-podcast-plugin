/**
 * WordPress bridge — patches CASTORY_MOCK routes from castoryConfig.
 */
(function (global) {
  if (!global.castoryConfig || !global.CASTORY_MOCK) return;

  var u = global.castoryConfig.pageUrls || {};
  var routes = CASTORY_MOCK.routes || {};

  if (u.home) routes.home = u.home;
  if (u.explore) routes.explore = u.explore;
  if (u.library) routes.library = u.library;
  if (u.profile) routes.profile = u.profile;
  if (u['trending-video']) routes.trendingVideo = u['trending-video'];
  if (u['trending-audio']) routes.trendingAudio = u['trending-audio'];
  if (u['new-episodes']) routes.newEpisodes = u['new-episodes'];

  CASTORY_MOCK.routes = routes;

  if (CASTORY_MOCK.getEpisodeUrl) {
    var original = CASTORY_MOCK.getEpisodeUrl;
    var episodeBase = u.episode || '';

    CASTORY_MOCK.getEpisodeUrl = function (episode, prefix) {
      if (!episode || !episode.id) return original(episode, prefix);

      if (episode.permalink) {
        return episode.permalink;
      }

      if (global.castoryConfig && global.castoryConfig.usePermalinks) {
        var list = CASTORY_MOCK.episodes || [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === episode.id && list[i].permalink) {
            return list[i].permalink;
          }
        }
      }

      if (episodeBase) {
        var sep = episodeBase.indexOf('?') === -1 ? '?' : '&';
        return episodeBase + sep + 'id=' + episode.id;
      }

      return original(episode, prefix);
    };
  }

  if (global.Castory && Castory.Search && u.explore) {
    Castory.Search.redirect = function (query) {
      global.location.href = u.explore + (u.explore.indexOf('?') === -1 ? '?' : '&') + 'q=' + encodeURIComponent(query);
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
