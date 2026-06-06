/**
 * Castory.Player — HTML5 audio/video engine (Phase 9.2)
 * Single active media instance; UI bindings are optional and swappable.
 */
(function (global) {
  var Castory = global.Castory || {};

  var DEMO_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  var DEMO_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  Castory.Player = {
    media: null,
    mediaType: null,
    episode: null,
    uiSets: [],
    playing: false,

    resolveSrc: function (episode) {
      if (!episode) return '';
      var url = episode.mediaUrl || episode.media_url || '';
      if (url) return url;
      return episode.mediaType === 'audio' ? DEMO_AUDIO : DEMO_VIDEO;
    },

    ensureMedia: function (type) {
      if (this.media && this.mediaType === type) {
        return this.media;
      }

      this._teardownMedia();

      var tag = type === 'video' ? 'video' : 'audio';
      var el = document.createElement(tag);
      el.preload = 'metadata';
      el.setAttribute('playsinline', 'playsinline');
      if (tag === 'video') {
        el.setAttribute('webkit-playsinline', 'webkit-playsinline');
      }
      document.body.appendChild(el);
      this._wireMediaEvents(el);

      this.media = el;
      this.mediaType = type;
      return el;
    },

    _teardownMedia: function () {
      if (!this.media) return;
      this.media.pause();
      this.media.removeAttribute('src');
      this.media.load();
      this.media.remove();
      this.media = null;
      this.mediaType = null;
      this.playing = false;
    },

    _wireMediaEvents: function (media) {
      var self = this;
      var events = ['play', 'pause', 'ended', 'timeupdate', 'loadedmetadata', 'error'];
      events.forEach(function (name) {
        media.addEventListener(name, function () {
          self._onMediaEvent(name);
        });
      });
    },

    _onMediaEvent: function (name) {
      if (name === 'play') this.playing = true;
      if (name === 'pause' || name === 'ended') this.playing = false;
      if (name === 'ended' && this.episode && Castory.Storage) {
        Castory.Storage.setPlaybackPosition(this.episode.id, 0, this.getDuration());
      }
      if (name === 'timeupdate' || name === 'loadedmetadata' || name === 'play' || name === 'pause') {
        this._syncUI();
        this._persist();
      }
      if (name === 'error') {
        this._syncUI();
        if (Castory.EpisodeDetail && Castory.EpisodeDetail.showToast) {
          Castory.EpisodeDetail.showToast('Unable to load media. Check media URL.');
        }
      }
      this._emit('state');
    },

    _emit: function (type) {
      global.dispatchEvent(new CustomEvent('castory:player', {
        detail: { type: type, state: this.getState() },
      }));
    },

    load: function (episode, options) {
      if (!episode) return null;

      options = options || {};
      var type = episode.mediaType === 'video' ? 'video' : 'audio';
      var media = this.ensureMedia(type);
      var src = this.resolveSrc(episode);
      var sameEpisode = this.episode && this.episode.id === episode.id;

      if (!sameEpisode || media.getAttribute('data-src') !== src) {
        media.src = src;
        media.setAttribute('data-src', src);
        media.load();
      }

      this.episode = episode;

      if (options.container && type === 'video') {
        options.container.innerHTML = '';
        media.className = 'castory-video-inline';
        media.removeAttribute('aria-hidden');
        options.container.appendChild(media);
        if (options.stageEl) options.stageEl.classList.add('is-playing');
      } else {
        media.className = 'castory-media-hidden';
        media.setAttribute('aria-hidden', 'true');
      }

      if (options.ui) {
        this.bindUI(options.ui);
      }

      var resumeAt = options.startAt;
      if (resumeAt == null && options.resume !== false && Castory.Storage) {
        resumeAt = Castory.Storage.getPlaybackPosition(episode.id);
      }
      if (resumeAt > 0) {
        var applySeek = function () {
          if (media.readyState >= 1) {
            media.currentTime = Math.min(resumeAt, media.duration || resumeAt);
          }
        };
        if (media.readyState >= 1) applySeek();
        else media.addEventListener('loadedmetadata', applySeek, { once: true });
      }

      if (options.autoplay) {
        var self = this;
        media.addEventListener('loadedmetadata', function () {
          self.play().catch(function () { /* autoplay blocked */ });
        }, { once: true });
      }

      if (Castory.Storage) {
        Castory.Storage.setNowPlaying(episode.id, media.currentTime || 0, this.getDuration());
      }

      this._syncUI();
      return this;
    },

    bindUI: function (ui) {
      if (!ui || ui._castoryPlayerBound) return this;
      ui._castoryPlayerBound = true;
      if (this.uiSets.indexOf(ui) === -1) this.uiSets.push(ui);

      var self = this;

      if (ui.playBtn) {
        ui.playBtn.addEventListener('click', function () {
          self.toggle();
        });
      }

      if (ui.skipBack) {
        ui.skipBack.addEventListener('click', function () {
          self.skip(-15);
        });
      }

      if (ui.skipForward) {
        ui.skipForward.addEventListener('click', function () {
          self.skip(30);
        });
      }

      if (ui.progressBar) {
        ui.progressBar.addEventListener('click', function (e) {
          var rect = ui.progressBar.getBoundingClientRect();
          var pct = (e.clientX - rect.left) / rect.width;
          self.seekPercent(pct);
        });
      }

      if (ui.speedSelect) {
        ui.speedSelect.addEventListener('change', function () {
          self.setRate(parseFloat(ui.speedSelect.value, 10) || 1);
        });
      }

      if (ui.volumeBtn) {
        ui.volumeBtn.addEventListener('click', function () {
          self.toggleMute();
        });
      }

      if (ui.fullscreenBtn) {
        ui.fullscreenBtn.addEventListener('click', function () {
          self.requestFullscreen(ui.fullscreenTarget || ui.stageEl);
        });
      }

      this._syncUI();
      return this;
    },

    attachUI: function (episode, opts) {
      opts = opts || {};
      var ui = {
        playBtn: opts.playBtn,
        progressFill: opts.progressFill,
        progressBar: opts.progressBar,
        currentTimeEl: opts.currentTimeEl,
        totalTimeEl: opts.totalTimeEl,
        waveform: opts.waveform,
        skipBack: opts.skipBack,
        skipForward: opts.skipForward,
        speedSelect: opts.speedSelect,
        volumeBtn: opts.volumeBtn,
        fullscreenBtn: opts.fullscreenBtn,
        fullscreenTarget: opts.fullscreenTarget,
        stageEl: opts.stageEl,
      };

      return this.load(episode, {
        ui: ui,
        startAt: opts.startAt,
        resume: opts.resume !== false,
        container: opts.videoContainer,
        stageEl: opts.stageEl,
        autoplay: opts.autoplay,
      });
    },

    play: function () {
      if (!this.media) return Promise.resolve();
      var self = this;
      return this.media.play().then(function () {
        self.playing = true;
        self._syncUI();
        self._persist();
        self._emit('play');
      });
    },

    pause: function () {
      if (!this.media) return;
      this.media.pause();
      this.playing = false;
      this._syncUI();
      this._persist();
      this._emit('pause');
    },

    toggle: function () {
      if (!this.media) return Promise.resolve();
      if (this.media.paused) return this.play();
      this.pause();
      return Promise.resolve();
    },

    skip: function (deltaSeconds) {
      if (!this.media) return;
      var next = Math.max(0, Math.min(this.getDuration(), this.media.currentTime + deltaSeconds));
      this.media.currentTime = next;
      this._syncUI();
      this._persist();
    },

    seek: function (seconds) {
      if (!this.media) return;
      this.media.currentTime = Math.max(0, Math.min(this.getDuration(), seconds));
      this._syncUI();
      this._persist();
    },

    seekPercent: function (pct) {
      var duration = this.getDuration();
      if (!duration) return;
      this.seek(pct * duration);
    },

    seekToChapter: function (timeLabel) {
      if (!timeLabel || !Castory.EpisodeDetail) return;
      var seconds = Castory.EpisodeDetail.parseDuration(String(timeLabel));
      if (seconds > 0) this.seek(seconds);
    },

    setRate: function (rate) {
      if (!this.media) return;
      this.media.playbackRate = rate;
      this.uiSets.forEach(function (ui) {
        if (ui.speedSelect) ui.speedSelect.value = String(rate);
      });
    },

    toggleMute: function () {
      if (!this.media) return;
      this.media.muted = !this.media.muted;
      this._syncUI();
    },

    requestFullscreen: function (target) {
      var el = target || this.media;
      if (!el || !el.requestFullscreen) {
        if (Castory.EpisodeDetail) Castory.EpisodeDetail.showToast('Fullscreen not supported');
        return;
      }
      el.requestFullscreen().catch(function () {});
    },

    getDuration: function () {
      if (!this.media || !isFinite(this.media.duration)) {
        if (this.episode && Castory.EpisodeDetail) {
          return Castory.EpisodeDetail.parseDuration(this.episode.duration);
        }
        return 0;
      }
      return this.media.duration;
    },

    getCurrentTime: function () {
      return this.media ? this.media.currentTime : 0;
    },

    getState: function () {
      var duration = this.getDuration();
      var current = this.getCurrentTime();
      return {
        episodeId: this.episode ? this.episode.id : null,
        episode: this.episode,
        mediaType: this.mediaType,
        playing: this.media ? !this.media.paused : false,
        currentTime: current,
        duration: duration,
        progress: duration ? (current / duration) * 100 : 0,
        muted: this.media ? this.media.muted : false,
        playbackRate: this.media ? this.media.playbackRate : 1,
        src: this.media ? this.media.currentSrc : '',
      };
    },

    _syncUI: function () {
      var self = this;
      var duration = this.getDuration();
      var current = this.getCurrentTime();
      var pct = duration ? (current / duration) * 100 : 0;
      var playing = this.media && !this.media.paused;

      this.uiSets.forEach(function (ui) {
        if (ui.progressFill) ui.progressFill.style.width = pct + '%';
        if (ui.currentTimeEl && Castory.EpisodeDetail) {
          ui.currentTimeEl.textContent = Castory.EpisodeDetail.formatTime(current);
        }
        if (ui.totalTimeEl && Castory.EpisodeDetail) {
          ui.totalTimeEl.textContent = Castory.EpisodeDetail.formatTime(duration);
        }
        if (ui.playBtn) {
          ui.playBtn.textContent = playing ? '⏸' : '▶';
          ui.playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
        }
        if (ui.waveform) ui.waveform.classList.toggle('is-playing', playing);
        if (ui.stageEl) ui.stageEl.classList.toggle('is-playing', playing);
        if (ui.volumeBtn && self.media) {
          var icon = ui.volumeBtn.querySelector('i');
          if (icon) {
            icon.className = self.media.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
          }
        }
      });
    },

    _persist: function () {
      if (!this.episode || !Castory.Storage) return;
      var current = this.getCurrentTime();
      var duration = this.getDuration();
      Castory.Storage.setPlaybackPosition(this.episode.id, current, duration);
      Castory.Storage.setNowPlaying(this.episode.id, current, duration);
    },

    stop: function () {
      this.pause();
      if (Castory.Storage) Castory.Storage.clearNowPlaying();
    },

    destroy: function () {
      this.uiSets = [];
      this.episode = null;
      this._teardownMedia();
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
