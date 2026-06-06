/**
 * Episode Detail — shared helpers for audio/video/mobile pages
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.EpisodeDetail = {
    getFromQuery: function (defaultId, mediaType) {
      var params = new URLSearchParams(global.location.search);
      var id = parseInt(params.get('id'), 10) || defaultId;
      var ep = global.CASTORY_MOCK.getEpisodeById(id);
      if (ep && mediaType && ep.mediaType !== mediaType) {
        var folder = ep.mediaType === 'audio' ? 'audio' : 'video';
        global.location.replace('../' + folder + '/index.html?id=' + ep.id);
        return null;
      }
      return ep;
    },

    waveformHtml: function (bars, animated) {
      var count = bars || 48;
      var html = '';
      for (var i = 0; i < count; i++) {
        var h = 20 + Math.floor(Math.random() * 80);
        var anim = animated !== false ? '' : ' style="animation:none;height:' + h + '%"';
        html += '<span' + anim + ' style="height:' + h + '%"></span>';
      }
      return '<div class="waveform waveform--large" aria-hidden="true">' + html + '</div>';
    },

    formatTime: function (seconds) {
      var m = Math.floor(seconds / 60);
      var s = Math.floor(seconds % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    },

    parseDuration: function (str) {
      if (!str) return 0;
      var parts = str.split(':').map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    },

    bindPlayer: function (opts) {
      var playBtn = opts.playBtn;
      var progressEl = opts.progressFill;
      var currentEl = opts.currentTimeEl;
      var totalSeconds = opts.totalSeconds || 0;
      var waveform = opts.waveform;
      var playing = false;
      var current = opts.startAt || 0;
      var timer = null;

      function updateUI() {
        var pct = totalSeconds ? (current / totalSeconds) * 100 : 0;
        if (progressEl) progressEl.style.width = pct + '%';
        if (currentEl) currentEl.textContent = Castory.EpisodeDetail.formatTime(current);
        if (waveform) waveform.classList.toggle('is-playing', playing);
      }

      function tick() {
        current += 1;
        if (current >= totalSeconds) {
          current = totalSeconds;
          stop();
        }
        updateUI();
      }

      function play() {
        playing = true;
        if (playBtn) playBtn.textContent = '⏸';
        if (playBtn) playBtn.setAttribute('aria-label', 'Pause');
        timer = setInterval(tick, 1000);
      }

      function stop() {
        playing = false;
        if (playBtn) playBtn.textContent = '▶';
        if (playBtn) playBtn.setAttribute('aria-label', 'Play');
        clearInterval(timer);
      }

      if (playBtn) {
        playBtn.addEventListener('click', function () {
          if (playing) stop();
          else play();
        });
      }

      if (opts.skipBack) {
        opts.skipBack.addEventListener('click', function () {
          current = Math.max(0, current - 15);
          updateUI();
        });
      }

      if (opts.skipForward) {
        opts.skipForward.addEventListener('click', function () {
          current = Math.min(totalSeconds, current + 30);
          updateUI();
        });
      }

      if (opts.progressBar) {
        opts.progressBar.addEventListener('click', function (e) {
          var rect = opts.progressBar.getBoundingClientRect();
          var pct = (e.clientX - rect.left) / rect.width;
          current = Math.floor(pct * totalSeconds);
          updateUI();
        });
      }

      updateUI();
      return { play: play, stop: stop, getCurrent: function () { return current; } };
    },

    renderRelated: function (container, episode, prefix) {
      if (!container || !episode) return;
      var related = global.CASTORY_MOCK.getRelatedEpisodes(episode, 5);
      var p = prefix || '../../';
      container.innerHTML = related.map(function (ep) {
        var url = global.CASTORY_MOCK.getEpisodeUrl(ep, p);
        return (
          '<a href="' + url + '" class="related-card glass">' +
          '<img src="' + ep.thumbnail + '" alt="">' +
          '<div><h4>' + ep.title + '</h4>' +
          '<p class="text-muted">' + ep.duration + ' · ' + ep.creator + '</p></div></a>'
        );
      }).join('');
    },

    showToast: function (message) {
      var el = document.getElementById('detailToast');
      if (!el) return;
      el.textContent = message;
      el.classList.add('is-visible');
      setTimeout(function () { el.classList.remove('is-visible'); }, 2200);
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
