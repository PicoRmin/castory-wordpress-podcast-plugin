/**
 * Castory.LibraryActions — bookmark & watch-later UI (Phase 9.3)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.LibraryActions = {
    init: function () {
      if (this._bound) return;
      this._bound = true;
      var self = this;

      document.addEventListener('click', function (e) {
        var bookmarkBtn = e.target.closest('.castory-bookmark-btn, .bookmark-btn, .episode-list-link .bookmark');
        if (bookmarkBtn) {
          e.preventDefault();
          e.stopPropagation();
          self._toggle(bookmarkBtn, 'bookmark');
          return;
        }

        var watchBtn = e.target.closest('.castory-watch-later-btn, .save-later');
        if (watchBtn) {
          e.preventDefault();
          e.stopPropagation();
          self._toggle(watchBtn, 'watchLater');
        }
      });

      global.addEventListener('castory:library', function () {
        self.refreshAll();
      });

      global.addEventListener('castory:library-ready', function () {
        self.refreshAll();
      });

      self.refreshAll();
    },

    extractEpisodeId: function (el) {
      if (!el) return 0;
      var id = parseInt(el.getAttribute('data-episode-id'), 10);
      if (id) return id;

      var link = el.closest('[data-episode-id]');
      if (link) return parseInt(link.getAttribute('data-episode-id'), 10) || 0;

      return 0;
    },

    _toggle: function (btn, type) {
      if (!Castory.Storage) return;
      var id = this.extractEpisodeId(btn);
      if (!id) return;

      var added;
      if (type === 'bookmark') {
        added = Castory.Storage.toggleBookmark(id);
        this._toast(added ? 'Bookmarked' : 'Bookmark removed');
      } else {
        added = Castory.Storage.toggleWatchLater(id);
        this._toast(added ? 'Saved for later' : 'Removed from watch later');
      }

      this.refreshButton(btn, type, id);
    },

    refreshButton: function (btn, type, episodeId) {
      if (!btn || !Castory.Storage) return;
      var id = episodeId || this.extractEpisodeId(btn);
      if (!id) return;

      if (type === 'bookmark' || btn.classList.contains('castory-bookmark-btn') || btn.classList.contains('bookmark-btn') || btn.classList.contains('bookmark')) {
        var bookmarked = Castory.Storage.isBookmarked(id);
        btn.classList.toggle('is-bookmarked', bookmarked);
        btn.classList.toggle('active', bookmarked);
        var icon = btn.querySelector('i');
        if (icon && icon.classList.contains('fa-regular')) {
          icon.classList.toggle('fa-regular', !bookmarked);
          icon.classList.toggle('fa-solid', bookmarked);
        }
      }

      if (type === 'watchLater' || btn.classList.contains('castory-watch-later-btn') || btn.classList.contains('save-later')) {
        var saved = Castory.Storage.isWatchLater(id);
        btn.classList.toggle('is-saved', saved);
        if (btn.classList.contains('save-later')) {
          btn.textContent = saved ? 'Saved ✓' : 'Save Later';
        }
      }
    },

    refreshAll: function () {
      var self = this;
      Castory.qsa('.castory-bookmark-btn, .bookmark-btn, .episode-list-link .bookmark, .castory-watch-later-btn, .save-later').forEach(function (btn) {
        var id = self.extractEpisodeId(btn);
        if (!id) return;
        self.refreshButton(btn, 'bookmark', id);
        self.refreshButton(btn, 'watchLater', id);
      });

      Castory.qsa('#bookmarkBtn[data-episode-id]').forEach(function (btn) {
        self.refreshButton(btn, 'bookmark');
      });
    },

    bindEpisode: function (ep, options) {
      if (!ep) return;
      options = options || {};

      if (options.bookmarkBtn) {
        options.bookmarkBtn.setAttribute('data-episode-id', ep.id);
        options.bookmarkBtn.classList.add('castory-bookmark-btn');
        this.refreshButton(options.bookmarkBtn, 'bookmark', ep.id);
      }

      if (options.watchLaterBtn) {
        options.watchLaterBtn.setAttribute('data-episode-id', ep.id);
        options.watchLaterBtn.classList.add('castory-watch-later-btn');
        this.refreshButton(options.watchLaterBtn, 'watchLater', ep.id);
      }
    },

    _toast: function (message) {
      if (Castory.EpisodeDetail && Castory.EpisodeDetail.showToast) {
        Castory.EpisodeDetail.showToast(message);
        return;
      }
      var toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = message;
        toast.classList.add('is-visible');
        setTimeout(function () {
          toast.classList.remove('is-visible');
        }, 2400);
      }
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
