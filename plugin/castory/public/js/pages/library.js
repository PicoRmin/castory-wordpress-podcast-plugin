(function () {
  Castory.whenReady(function () {
  var R = CASTORY_MOCK.routes;
  var LIB = CASTORY_MOCK.library;
  var user = CASTORY_MOCK.user;
  var searchQuery = '';

  function waveformHtml() {
    var bars = '';
    for (var i = 0; i < 10; i++) {
      bars += '<span style="height:' + (25 + Math.random() * 75) + '%"></span>';
    }
    return '<div class="waveform" aria-hidden="true">' + bars + '</div>';
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function initUserProfile() {
    document.getElementById('userAvatar').src = user.avatar;
    document.getElementById('userAvatar').alt = user.name;
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userBadge').textContent = user.badge;
    document.getElementById('userStats').textContent =
      user.following + ' Following · ' +
      formatCount(user.followers) + ' Followers · ' +
      user.episodesCount + ' Episodes';
  }

  function formatCount(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function renderStats() {
    document.getElementById('statsGrid').innerHTML = LIB.stats.map(function (s) {
      var trendClass = s.trendUp === null ? 'neutral' : (s.trendUp ? 'up' : '');
      return (
        '<article class="lib-stat-card glass searchable">' +
        '<span class="stat-icon">' + s.icon + '</span>' +
        '<p class="stat-value">' + s.value + '</p>' +
        '<p class="stat-label">' + s.label + '</p>' +
        '<p class="stat-trend ' + trendClass + '">' + s.trend + '</p></article>'
      );
    }).join('');
  }

  function renderContinueListening() {
    var items = Castory.LibraryData ? Castory.LibraryData.getContinueItems('audio') : [];
    var container = document.getElementById('continueListening');

    if (!items.length) {
      container.innerHTML = '<p class="text-muted empty-state">' +
        (Castory.LibraryData ? Castory.LibraryData.emptyMessage('continue') : 'No items yet.') + '</p>';
      return;
    }

    container.innerHTML = items.map(function (item) {
      var ep = item.ep;
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link" data-episode-id="' + ep.id + '">' +
        '<article class="continue-card glass searchable" data-title="' + ep.title + '">' +
        '<div class="continue-card-header">' +
        '<button class="play-btn listen-play castory-quick-play" type="button" aria-label="Play ' + ep.title + '">▶</button>' +
        '<img src="' + ep.thumbnail + '" alt="">' +
        '<div><h4>' + ep.title + '</h4><p class="meta">' + (ep.podcast || ep.creator) + ' · ' + ep.duration + '</p></div></div>' +
        waveformHtml() +
        '<div class="progress player-progress"><span class="progress-fill" style="width:' + item.progress + '%"></span></div>' +
        '<p class="meta">' + item.progress + '% complete</p></article></a>'
      );
    }).join('');
  }

  function renderContinueWatching() {
    var items = Castory.LibraryData ? Castory.LibraryData.getContinueItems('video') : [];
    var container = document.getElementById('continueWatching');

    if (!items.length) {
      container.innerHTML = '<p class="text-muted empty-state">' +
        (Castory.LibraryData ? Castory.LibraryData.emptyMessage('continue') : 'No items yet.') + '</p>';
      return;
    }

    container.innerHTML = items.map(function (item) {
      var ep = item.ep;
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link" data-episode-id="' + ep.id + '">' +
        '<article class="watch-card glass searchable" data-title="' + ep.title + '">' +
        '<div class="thumb"><img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<button type="button" class="castory-quick-play" aria-label="Play" style="position:absolute;inset:0;margin:auto;width:48px;height:48px;border-radius:50%;border:none;background:rgba(124,58,237,.9);color:#fff">▶</button>' +
        '<span class="duration">' + ep.duration + '</span></div>' +
        '<div class="card-body"><h4>' + ep.title + '</h4>' +
        '<p class="creator">' + ep.creator + '</p>' +
        '<div class="progress player-progress"><span class="progress-fill" style="width:' + item.progress + '%"></span></div>' +
        '<p class="meta">' + item.progress + '% watched</p></div></article></a>'
      );
    }).join('');
  }

  function renderPlaylists() {
    if (Castory.PlaylistsUI) {
      Castory.PlaylistsUI.render();
    }
  }

  function renderDownloads() {
    document.getElementById('downloadList').innerHTML = LIB.downloaded.map(function (item) {
      var icon = item.mediaType === 'audio' ? '🎧' : '▶';
      return (
        '<article class="download-row glass searchable" data-title="' + item.title + '">' +
        '<div class="media-icon ' + item.mediaType + '">' + icon + '</div>' +
        '<div class="download-info"><h4>' + item.title + '</h4>' +
        '<p class="download-meta">' + item.duration + ' · ' + item.fileSize + '</p></div>' +
        '<span class="download-label">' + item.label + '</span></article>'
      );
    }).join('');
  }

  function renderSaved() {
    var episodes = Castory.LibraryData ? Castory.LibraryData.getWatchLaterEpisodes() : [];
    var grid = document.getElementById('savedGrid');

    if (!episodes.length) {
      grid.innerHTML = '<p class="text-muted empty-state">' +
        (Castory.LibraryData ? Castory.LibraryData.emptyMessage('watchLater') : 'No saved episodes.') + '</p>';
      return;
    }

    grid.innerHTML = episodes.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      var badge = ep.mediaType === 'video'
        ? '<span class="badge-video">Video</span>'
        : '<span class="badge-audio">Audio</span>';
      return (
        '<a href="' + url + '" class="episode-card-link" data-episode-id="' + ep.id + '">' +
        '<article class="saved-card glass searchable" data-title="' + ep.title + '">' +
        '<img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div><div>' + badge + '</div><h4>' + ep.title + '</h4>' +
        '<p class="creator">' + ep.creator + '</p>' +
        '<span class="duration">' + ep.duration + '</span></div></article></a>'
      );
    }).join('');
  }

  function renderRecentActivity() {
    document.getElementById('recentActivity').innerHTML = LIB.recentActivity.map(function (a) {
      return (
        '<div class="activity-item">' +
        '<span class="activity-dot ' + a.type + '"></span>' +
        '<div class="activity-body"><p>' + a.title + '</p>' +
        (a.completion ? '<span>' + a.completion + '% · </span>' : '') +
        '<span>' + a.timeAgo + '</span></div></div>'
      );
    }).join('');
  }

  function renderStorage() {
    var s = LIB.storage;
    var breakdown = s.breakdown.map(function (b) {
      return (
        '<div class="storage-row">' +
        '<label>' + b.label + '</label>' +
        '<div class="progress-bar"><div class="progress-bar__fill" style="width:' + b.percent + '%;background:' + b.color + '"></div></div>' +
        '<span>' + b.percent + '%</span></div>'
      );
    }).join('');

    document.getElementById('storageWidget').innerHTML =
      '<div class="storage-header"><span>' + s.usedLabel + ' used</span><span>' + s.totalLabel + ' total</span></div>' +
      '<div class="progress-bar"><div class="progress-bar__fill" style="width:' + s.usedPercent + '%"></div></div>' +
      '<p class="text-muted" style="margin-top:8px;font-size:13px">' + s.usedPercent + '% of storage used</p>' +
      '<div class="storage-breakdown">' + breakdown + '</div>';
  }

  function renderWatchlist() {
    var saved = Castory.Storage ? Castory.Storage.getWatchLater().length : 0;
    var unfinished = Castory.LibraryData ? Castory.LibraryData.getContinueItems().length : 0;
    document.getElementById('watchlistWidget').innerHTML =
      '<div class="watchlist-stats">' +
      '<div class="watchlist-stat"><p class="value">' + saved + '</p><p class="label">Saved</p></div>' +
      '<div class="watchlist-stat"><p class="value">' + unfinished + '</p><p class="label">Unfinished</p></div>' +
      '<div class="watchlist-stat"><p class="value">' + (Castory.Storage ? Castory.Storage.getBookmarks().length : 0) + '</p><p class="label">Bookmarks</p></div></div>' +
      '<button class="btn btn-primary" type="button" style="width:100%" id="watchlistCta">View Saved</button>';
    document.getElementById('watchlistCta').addEventListener('click', function () {
      var section = document.getElementById('savedGrid');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderInsights() {
    var ins = LIB.listeningInsights;
    var maxHours = Math.max.apply(null, ins.weeklyHours);
    var bars = ins.weeklyHours.map(function (h, i) {
      var height = Math.round((h / maxHours) * 100);
      return '<div class="bar-chart__bar" style="height:' + height + '%" title="' + ins.weekLabels[i] + ': ' + h + 'h" role="img" aria-label="' + ins.weekLabels[i] + ' ' + h + ' hours"></div>';
    }).join('');

    var categories = ins.topCategories.map(function (c) {
      return '<div class="category-row"><span>' + c.name + '</span><span>' + c.hours + 'h</span></div>';
    }).join('');

    var leaders = ins.topCreators.map(function (c, i) {
      return (
        '<div class="leader-row">' +
        '<span class="rank">' + (i + 1) + '</span>' +
        '<img src="' + c.avatar + '" alt="' + c.name + '">' +
        '<span class="name">' + c.name + '</span>' +
        '<span>' + c.hours + 'h</span></div>'
      );
    }).join('');

    document.getElementById('insightsWidget').innerHTML =
      '<p class="text-muted" style="font-size:13px;margin-bottom:8px">Weekly listening (hours)</p>' +
      '<div class="insights-chart"><div class="bar-chart">' + bars + '</div></div>' +
      '<p class="text-muted" style="font-size:13px;margin:16px 0 8px">Top Categories</p>' + categories +
      '<p class="text-muted" style="font-size:13px;margin:16px 0 8px">Top Creators</p>' + leaders;
  }

  function renderBottomNav() {
    var items = [
      { label: 'Home', href: R.home, icon: '🏠' },
      { label: 'Explore', href: R.explore, icon: '◈' },
      { label: 'Library', href: 'index.html', icon: '📚', active: true },
      { label: 'Profile', href: R.profile, icon: '👤' },
    ];
    document.getElementById('bottomNav').innerHTML = items.map(function (item) {
      return '<a href="' + item.href + '"' + (item.active ? ' class="active"' : '') + '>' +
        '<span>' + item.icon + '</span>' + item.label + '</a>';
    }).join('');
  }

  function applySearch() {
    if (!searchQuery) {
      Castory.qsa('.searchable').forEach(function (el) { el.style.display = ''; });
      return;
    }
    var q = searchQuery.toLowerCase();
    Castory.qsa('.searchable').forEach(function (el) {
      var title = el.getAttribute('data-title') || el.textContent;
      el.style.display = title.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
    });
  }

  function initSearch() {
    document.getElementById('searchInput').addEventListener('input', Castory.debounce(function (e) {
      searchQuery = e.target.value.trim();
      applySearch();
    }, 200));
  }

  function initHeaderActions() {
    document.getElementById('importBtn').addEventListener('click', function () {
      showToast('Import Podcasts — coming soon');
    });
    document.getElementById('downloadsBtn').addEventListener('click', function () {
      showToast('Manage Downloads — coming soon');
    });
  }

  function initSidebarActions() {
    document.getElementById('settingsBtn').addEventListener('click', function () {
      showToast('Settings — coming soon');
    });
    document.getElementById('sidebarNotifBtn').addEventListener('click', function () {
      showToast('Notifications — coming soon');
    });
    document.getElementById('logoutBtn').addEventListener('click', function () {
      showToast('Logged out (simulation)');
    });
  }

  initUserProfile();
  renderStats();
  renderContinueListening();
  renderContinueWatching();
  renderPlaylists();
  renderDownloads();
  renderSaved();
  renderRecentActivity();
  renderStorage();
  renderWatchlist();
  renderInsights();
  renderBottomNav();
  initSearch();
  initHeaderActions();
  initSidebarActions();

  if (Castory.PlaylistsUI) {
    Castory.PlaylistsUI.init();
  }

  Castory.Sidebar.init({
    menuBtn: document.getElementById('menuBtn'),
    sidebar: document.getElementById('sidebar'),
    backdrop: document.getElementById('sidebarBackdrop'),
  });

  window.addEventListener('castory:playlists', function () {
    renderPlaylists();
    renderWatchlist();
  });

  window.addEventListener('castory:library', function () {
    renderSaved();
    renderWatchlist();
  });

  window.addEventListener('castory:player', function () {
    renderContinueListening();
    renderContinueWatching();
    renderWatchlist();
  });
  });
})();
