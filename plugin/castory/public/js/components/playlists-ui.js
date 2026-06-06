/**
 * Castory.PlaylistsUI — library playlist grid + modals (Phase 9.3)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.PlaylistsUI = {
    _menuDocBound: false,
    _activeId: null,
    _mode: 'create',

    init: function (options) {
      if (!Castory.Playlists) return;
      this.opts = Object.assign({
        grid: '#playlistGrid',
        createBtn: '#newPlaylistBtn',
        headerCreateBtn: '#createPlaylistBtn',
      }, options || {});

      Castory.Playlists.seedDefaults();
      this._bindModal();
      this._bindCreateButtons();
      this.render();

      global.addEventListener('castory:playlists', this.render.bind(this));
      global.addEventListener('castory:playlists-ready', this.render.bind(this));
    },

    render: function () {
      var grid = document.querySelector(this.opts.grid);
      if (!grid || !Castory.Playlists) return;

      var items = Castory.Playlists.getEnrichedAll();
      if (!items.length) {
        grid.innerHTML =
          '<div class="playlist-empty glass">' +
          '<p class="text-muted">No playlists yet. Create one to organize your favorite episodes.</p>' +
          '<button type="button" class="btn btn-primary btn-sm" data-playlist-create>Create Playlist</button></div>';
        var emptyBtn = grid.querySelector('[data-playlist-create]');
        if (emptyBtn) {
          emptyBtn.addEventListener('click', this.openCreate.bind(this));
        }
        return;
      }

      grid.innerHTML = items.map(function (pl) {
        var collage = pl.covers.map(function (url) {
          return '<img src="' + url + '" alt="">';
        }).join('');
        return (
          '<article class="playlist-card glass searchable" data-title="' + pl.name + '" data-playlist-id="' + pl.id + '">' +
          '<button class="playlist-menu-btn" type="button" aria-label="Playlist options" data-id="' + pl.id + '">⋯</button>' +
          '<div class="playlist-dropdown" id="playlistMenu' + pl.id + '">' +
          '<button type="button" data-action="open">Open</button>' +
          '<button type="button" data-action="edit">Edit</button>' +
          '<button type="button" data-action="share">Share</button>' +
          '<button type="button" data-action="delete">Delete</button></div>' +
          '<button type="button" class="playlist-open-btn" data-id="' + pl.id + '" aria-label="Open ' + pl.name + '">' +
          '<div class="playlist-collage">' + collage + '</div>' +
          '<div class="playlist-info"><h4>' + pl.name + '</h4>' +
          '<p>' + pl.episodes + ' episodes · Updated ' + pl.updated + '</p></div></button></article>'
        );
      }).join('');

      this._bindGridEvents(grid);
    },

    _bindGridEvents: function (grid) {
      var self = this;

      Castory.qsa('.playlist-menu-btn', grid).forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var id = btn.getAttribute('data-id');
          var menu = document.getElementById('playlistMenu' + id);
          Castory.qsa('.playlist-dropdown').forEach(function (m) {
            if (m !== menu) m.classList.remove('is-open');
          });
          menu.classList.toggle('is-open');
        });
      });

      Castory.qsa('.playlist-dropdown button', grid).forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var card = btn.closest('[data-playlist-id]');
          var id = card ? card.getAttribute('data-playlist-id') : '';
          var action = btn.getAttribute('data-action');
          self._closeMenus();

          if (action === 'open') self.openDetail(id);
          else if (action === 'edit') self.openEdit(id);
          else if (action === 'share') self.share(id);
          else if (action === 'delete') self.remove(id);
        });
      });

      Castory.qsa('.playlist-open-btn', grid).forEach(function (btn) {
        btn.addEventListener('click', function () {
          self.openDetail(btn.getAttribute('data-id'));
        });
      });

      if (!this._menuDocBound) {
        this._menuDocBound = true;
        document.addEventListener('click', function () {
          self._closeMenus();
        });
      }
    },

    _bindCreateButtons: function () {
      var self = this;
      [this.opts.createBtn, this.opts.headerCreateBtn].forEach(function (sel) {
        var btn = document.querySelector(sel);
        if (btn) btn.addEventListener('click', function () { self.openCreate(); });
      });
    },

    _bindModal: function () {
      var modal = document.getElementById('playlistModal');
      if (!modal) return;

      var self = this;
      var form = document.getElementById('playlistForm');
      var close = function () { self.closeModal(); };

      document.getElementById('playlistModalClose').addEventListener('click', close);
      document.getElementById('playlistModalCancel').addEventListener('click', close);
      document.getElementById('playlistModalBackdrop').addEventListener('click', close);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        self._saveForm();
      });
    },

    openCreate: function () {
      this._mode = 'create';
      this._activeId = null;
      document.getElementById('playlistModalTitle').textContent = 'New Playlist';
      document.getElementById('playlistNameInput').value = '';
      document.getElementById('playlistEpisodePicker').innerHTML =
        '<p class="text-muted" style="font-size:13px">You can add episodes after creating the playlist.</p>';
      this._openModal();
    },

    openEdit: function (id) {
      var pl = Castory.Playlists.getById(id);
      if (!pl) return;
      this._mode = 'edit';
      this._activeId = id;
      document.getElementById('playlistModalTitle').textContent = 'Edit Playlist';
      document.getElementById('playlistNameInput').value = pl.name;
      this._renderEpisodePicker(pl);
      this._openModal();
    },

    openDetail: function (id) {
      var enriched = Castory.Playlists.enrich(Castory.Playlists.getById(id));
      if (!enriched) return;
      this._mode = 'detail';
      this._activeId = id;
      document.getElementById('playlistModalTitle').textContent = enriched.name;

      var episodesHtml = enriched.episodeItems.length
        ? enriched.episodeItems.map(function (ep) {
          var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
          return (
            '<div class="playlist-detail-row">' +
            '<img src="' + ep.thumbnail + '" alt="">' +
            '<div class="playlist-detail-meta"><strong>' + ep.title + '</strong>' +
            '<span class="text-muted">' + ep.creator + ' · ' + ep.duration + '</span></div>' +
            '<div class="playlist-detail-actions">' +
            '<button type="button" class="btn btn-secondary btn-sm castory-quick-play" data-episode-id="' + ep.id + '">Play</button>' +
            '<a href="' + url + '" class="btn btn-secondary btn-sm">Open</a>' +
            '<button type="button" class="btn btn-secondary btn-sm" data-remove-episode="' + ep.id + '">Remove</button>' +
            '</div></div>'
          );
        }).join('')
        : '<p class="text-muted">No episodes in this playlist yet. Edit the playlist to add some.</p>';

      document.getElementById('playlistEpisodePicker').innerHTML =
        '<div class="playlist-detail-list">' + episodesHtml + '</div>' +
        '<div class="playlist-modal-actions">' +
        '<button type="button" class="btn btn-secondary" id="playlistDetailEdit">Edit</button>' +
        '<button type="button" class="btn btn-primary" id="playlistDetailClose">Close</button></div>';

      document.getElementById('playlistNameInput').closest('.form-field').style.display = 'none';
      document.getElementById('playlistModalSave').style.display = 'none';
      document.getElementById('playlistModalCancel').style.display = 'none';

      var self = this;
      var detailClose = document.getElementById('playlistDetailClose');
      if (detailClose) detailClose.addEventListener('click', function () { self.closeModal(); });
      var detailEdit = document.getElementById('playlistDetailEdit');
      if (detailEdit) detailEdit.addEventListener('click', function () {
        self.closeModal();
        self.openEdit(id);
      });

      Castory.qsa('[data-remove-episode]', document.getElementById('playlistEpisodePicker')).forEach(function (btn) {
        btn.addEventListener('click', function () {
          Castory.Playlists.toggleEpisode(id, btn.getAttribute('data-remove-episode'));
          self.openDetail(id);
          self._toast('Playlist updated');
        });
      });

      this._openModal();
    },

    _renderEpisodePicker: function (playlist) {
      var container = document.getElementById('playlistEpisodePicker');
      var ids = {};
      (Castory.Storage.getBookmarks() || []).forEach(function (id) { ids[id] = true; });
      (Castory.Storage.getWatchLater() || []).forEach(function (id) { ids[id] = true; });
      (playlist.episodeIds || []).forEach(function (id) { ids[id] = true; });

      var episodes = Object.keys(ids).map(function (key) {
        return CASTORY_MOCK.getEpisodeById(parseInt(key, 10));
      }).filter(Boolean);

      if (!episodes.length) {
        container.innerHTML = '<p class="text-muted" style="font-size:13px">Bookmark or save episodes first, then add them here.</p>';
        return;
      }

      container.innerHTML = episodes.map(function (ep) {
        var checked = (playlist.episodeIds || []).indexOf(ep.id) !== -1 ? ' checked' : '';
        return (
          '<label class="playlist-picker-row">' +
          '<input type="checkbox" name="playlistEpisode" value="' + ep.id + '"' + checked + '>' +
          '<img src="' + ep.thumbnail + '" alt="">' +
          '<span>' + ep.title + '</span></label>'
        );
      }).join('');
    },

    _saveForm: function () {
      if (this._mode === 'detail') return;

      var name = document.getElementById('playlistNameInput').value.trim();
      if (!name) {
        this._toast('Enter a playlist name');
        return;
      }

      var selected = Castory.qsa('input[name="playlistEpisode"]:checked').map(function (input) {
        return parseInt(input.value, 10);
      });

      if (this._mode === 'create') {
        Castory.Playlists.create(name, selected);
        this._toast('Playlist created');
      } else if (this._activeId) {
        Castory.Playlists.update(this._activeId, { name: name, episodeIds: selected });
        this._toast('Playlist saved');
      }

      this.closeModal();
      this.render();
    },

    remove: function (id) {
      var pl = Castory.Playlists.getById(id);
      if (!pl) return;
      if (!global.confirm('Delete playlist "' + pl.name + '"?')) return;
      Castory.Playlists.remove(id);
      this._toast('Playlist deleted');
      this.render();
    },

    share: function (id) {
      var self = this;
      var pl = Castory.Playlists.getById(id);
      if (!pl) return;
      var text = 'Castory playlist: ' + pl.name + ' (' + (pl.episodeIds || []).length + ' episodes)';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { self._toast('Copied to clipboard'); });
      } else {
        this._toast(text);
      }
    },

    _openModal: function () {
      var modal = document.getElementById('playlistModal');
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    },

    closeModal: function () {
      var modal = document.getElementById('playlistModal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.getElementById('playlistNameInput').closest('.form-field').style.display = '';
      document.getElementById('playlistModalSave').style.display = '';
      document.getElementById('playlistModalCancel').style.display = '';
    },

    _closeMenus: function () {
      Castory.qsa('.playlist-dropdown').forEach(function (m) { m.classList.remove('is-open'); });
    },

    _toast: function (message) {
      var toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('is-visible');
      setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);
