/**
 * Global mini-player — wired to Castory.Player (Phase 9.2)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.GlobalPlayer = {
    el: null,

    init: function () {
      if (this.el) return;
      var bar = document.createElement('div');
      bar.className = 'global-player';
      bar.id = 'globalPlayer';
      bar.setAttribute('aria-label', 'Now playing');
      bar.innerHTML =
        '<img class="global-player__thumb" src="" alt="" id="gpThumb">' +
        '<div class="global-player__info">' +
        '<p class="global-player__title" id="gpTitle"></p>' +
        '<div class="progress player-progress global-player__seek" id="gpSeek"><span class="progress-fill" id="gpProgress"></span></div></div>' +
        '<button type="button" class="play-btn global-player__play" id="gpPlay" aria-label="Play">▶</button>' +
        '<button type="button" class="global-player__close" id="gpClose" aria-label="Close player">×</button>';
      document.body.appendChild(bar);
      this.el = bar;

      var self = this;

      if (Castory.Player) {
        Castory.Player.bindUI({
          progressFill: document.getElementById('gpProgress'),
          progressBar: document.getElementById('gpSeek'),
        });
      }

      document.getElementById('gpPlay').addEventListener('click', function () {
        self.onPlayClick();
      });

      document.getElementById('gpClose').addEventListener('click', function () {
        if (Castory.Player) Castory.Player.stop();
        Castory.Storage.clearNowPlaying();
        self.render();
      });

      document.addEventListener('click', function (e) {
        var link = e.target.closest('.episode-card-link, .episode-row-link, .episode-list-link');
        if (!link || !link.href || !Castory.Storage) return;
        var id = self.extractEpisodeId(link.href);
        if (id) Castory.Storage.setNowPlaying(id, 0, 0);
      });

      global.addEventListener('castory:player', function () {
        self.render();
      });

      this.render();
    },

    extractEpisodeId: function (href) {
      var match = href.match(/[?&]id=(\d+)/);
      if (match) return parseInt(match[1], 10);
      if (!global.CASTORY_MOCK || !CASTORY_MOCK.episodes) return 0;
      for (var i = 0; i < CASTORY_MOCK.episodes.length; i++) {
        var ep = CASTORY_MOCK.episodes[i];
        if (ep.permalink && href.indexOf(ep.permalink) !== -1) return ep.id;
      }
      return 0;
    },

    onPlayClick: function () {
      if (!Castory.Storage || !Castory.Player || !global.CASTORY_MOCK) return;
      var state = Castory.Storage.getNowPlaying();
      if (!state) return;

      var ep = CASTORY_MOCK.getEpisodeById(state.episodeId);
      if (!ep) return;

      if (!Castory.Player.episode || Castory.Player.episode.id !== ep.id) {
        Castory.Player.load(ep, { resume: true });
      }
      Castory.Player.toggle();
      this.render();
    },

    render: function () {
      if (!this.el || !Castory.Storage) return;
      var state = Castory.Storage.getNowPlaying();
      if (!state || !global.CASTORY_MOCK) {
        this.el.classList.remove('is-visible');
        document.body.classList.remove('has-global-player');
        return;
      }

      var ep = CASTORY_MOCK.getEpisodeById(state.episodeId);
      if (!ep) {
        Castory.Storage.clearNowPlaying();
        return;
      }

      var prefix = Castory.Nav ? Castory.Nav.getPathPrefix() : '../';
      var url = CASTORY_MOCK.getEpisodeUrl(ep, prefix);
      var playerState = Castory.Player ? Castory.Player.getState() : null;
      var progress = playerState && playerState.episodeId === ep.id
        ? playerState.progress
        : (state.progress || 0);

      this.el.classList.add('is-visible');
      document.body.classList.add('has-global-player');
      document.getElementById('gpThumb').src = ep.thumbnail;
      document.getElementById('gpThumb').alt = ep.title;
      document.getElementById('gpTitle').innerHTML = '<a href="' + url + '">' + ep.title + '</a>';
      document.getElementById('gpProgress').style.width = progress + '%';

      var playing = playerState && playerState.episodeId === ep.id && playerState.playing;
      document.getElementById('gpPlay').textContent = playing ? '⏸' : '▶';
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
