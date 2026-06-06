/**
 * Global mini-player — persists via localStorage (Phase 7)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.GlobalPlayer = {
    el: null,
    timer: null,
    playing: false,

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
        '<div class="progress player-progress"><span class="progress-fill" id="gpProgress"></span></div></div>' +
        '<button type="button" class="play-btn global-player__play" id="gpPlay" aria-label="Play">▶</button>' +
        '<button type="button" class="global-player__close" id="gpClose" aria-label="Close player">×</button>';
      document.body.appendChild(bar);
      this.el = bar;

      var self = this;
      document.getElementById('gpPlay').addEventListener('click', function () {
        self.togglePlay();
      });
      document.getElementById('gpClose').addEventListener('click', function () {
        Castory.Storage.clearNowPlaying();
        self.stop();
        self.render();
      });

      document.addEventListener('click', function (e) {
        var link = e.target.closest('.episode-card-link, .episode-row-link, .episode-list-link');
        if (!link || !link.href) return;
        var match = link.href.match(/[?&]id=(\d+)/);
        if (match && Castory.Storage) {
          Castory.Storage.setNowPlaying(parseInt(match[1], 10), 0);
        }
      });

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

      this.el.classList.add('is-visible');
      document.body.classList.add('has-global-player');
      document.getElementById('gpThumb').src = ep.thumbnail;
      document.getElementById('gpThumb').alt = ep.title;
      document.getElementById('gpTitle').innerHTML = '<a href="' + url + '">' + ep.title + '</a>';
      document.getElementById('gpProgress').style.width = (state.progress || 0) + '%';
      document.getElementById('gpPlay').textContent = this.playing ? '⏸' : '▶';
    },

    togglePlay: function () {
      this.playing = !this.playing;
      document.getElementById('gpPlay').textContent = this.playing ? '⏸' : '▶';
      var self = this;
      clearInterval(this.timer);
      if (this.playing) {
        this.timer = setInterval(function () {
          var state = Castory.Storage.getNowPlaying();
          if (!state) return;
          state.progress = Math.min(100, (state.progress || 0) + 0.5);
          Castory.Storage.set('nowPlaying', state);
          document.getElementById('gpProgress').style.width = state.progress + '%';
        }, 1000);
      }
    },

    stop: function () {
      this.playing = false;
      clearInterval(this.timer);
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
