(function () {
  Castory.whenReady(function () {
  var R = CASTORY_MOCK.routes;
  var user = CASTORY_MOCK.user;
  var PROF = CASTORY_MOCK.profile;
  var LIB = CASTORY_MOCK.library;

  function notify(msg) {
    if (Castory.Notifications && Castory.Notifications.push) {
      Castory.Notifications.push({ title: 'Profile', body: msg });
      return;
    }
    if (global.console) console.info(msg);
  }

  function openModal(title, body) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = body || 'This feature will be available in the WordPress plugin.';
    document.getElementById('actionModal').classList.add('is-open');
    document.getElementById('actionModal').setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    document.getElementById('actionModal').classList.remove('is-open');
    document.getElementById('actionModal').setAttribute('aria-hidden', 'true');
    document.getElementById('modalOk').textContent = 'Got it';
  }

  function initHero() {
    document.getElementById('coverImage').src = user.cover;
    document.getElementById('coverImage').alt = user.name + ' cover';
    document.getElementById('profileAvatar').src = user.avatar;
    document.getElementById('profileAvatar').alt = user.name;

    var nameHtml = user.name;
    if (user.verified) {
      nameHtml += ' <i class="fa-solid fa-circle-check verified-badge" title="Verified"></i>';
    }
    document.getElementById('profileName').innerHTML = nameHtml;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileBio').textContent = user.bio || '';

    var locationEl = document.getElementById('profileLocation');
    if (user.location) {
      locationEl.innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + user.location;
      locationEl.style.display = '';
    } else {
      locationEl.style.display = 'none';
    }

    var websiteEl = document.getElementById('profileWebsite');
    if (user.website) {
      var href = user.website.indexOf('http') === 0 ? user.website : 'https://' + user.website;
      websiteEl.href = href;
      websiteEl.innerHTML = '<i class="fa-solid fa-link"></i> ' + user.website.replace(/^https?:\/\//, '');
      websiteEl.style.display = '';
    } else {
      websiteEl.style.display = 'none';
    }

    document.getElementById('profileJoin').innerHTML =
      '<i class="fa-solid fa-calendar"></i> Joined ' + (user.joinDate || 'Recently');

    document.getElementById('sidebarAvatar').src = user.avatar;
    document.getElementById('sidebarAvatar').alt = user.name;
    document.getElementById('sidebarName').textContent = user.name;
    document.getElementById('sidebarBadge').textContent = user.badge || 'Member';

    var premiumCard = document.querySelector('.sidebar-premium');
    if (premiumCard) {
      premiumCard.style.display = user.isPremium ? '' : 'none';
    }
  }

  function profileData() {
    return Castory.ProfileData || null;
  }

  function renderStats() {
    var stats = profileData() ? profileData().getStats() : PROF.stats;
    document.getElementById('statsRow').innerHTML = stats.map(function (s) {
      return (
        '<article class="profile-stat glass">' +
        '<p class="value">' + s.value + '</p>' +
        '<p class="label">' + s.label + '</p></article>'
      );
    }).join('');
  }

  function renderAchievements() {
    document.getElementById('achievementsGrid').innerHTML = PROF.achievements.map(function (a) {
      return (
        '<article class="achievement-card theme-' + a.theme + ' glass">' +
        '<span class="ach-icon">' + a.icon + '</span>' +
        '<h4>' + a.title + '</h4>' +
        '<p>' + a.desc + '</p></article>'
      );
    }).join('');
  }

  function renderTimeline() {
    document.getElementById('listeningTimeline').innerHTML = PROF.listeningTimeline.map(function (item) {
      return (
        '<article class="timeline-item glass">' +
        '<span class="timeline-icon">' + item.icon + '</span>' +
        '<div class="timeline-body"><h4>' + item.title + '</h4><p>' + item.detail + '</p></div>' +
        '<span class="timeline-time">' + item.timeAgo + '</span></article>'
      );
    }).join('');
  }

  function renderCreators() {
    document.getElementById('creatorsCarousel').innerHTML = PROF.favoriteCreators.map(function (c) {
      return (
        '<article class="creator-carousel-card glass">' +
        '<img src="' + c.avatar + '" alt="' + c.name + '">' +
        '<h4>' + c.name + (c.verified ? ' ✓' : '') + '</h4>' +
        '<p class="text-muted">' + c.followers + '</p>' +
        '<span class="category-tag">' + c.category + '</span></article>'
      );
    }).join('');
  }

  function initCarousel() {
    var el = document.getElementById('creatorsCarousel');
    document.getElementById('creatorsPrev').addEventListener('click', function () {
      el.scrollBy({ left: -200, behavior: 'smooth' });
    });
    document.getElementById('creatorsNext').addEventListener('click', function () {
      el.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

  function renderPlaylists() {
    var items = Castory.Playlists ? Castory.Playlists.getEnrichedAll().slice(0, 4) : LIB.playlists;
    var grid = document.getElementById('playlistGrid');

    if (Castory.Playlists && Castory.Playlists.getAll().length) {
      grid.innerHTML = items.map(function (pl) {
        var collage = pl.covers.map(function (url) {
          return '<img src="' + url + '" alt="">';
        }).join('');
        return (
          '<a href="../library/index.html" class="playlist-card-link">' +
          '<article class="playlist-card glass">' +
          '<div class="playlist-collage">' + collage + '</div>' +
          '<div class="playlist-info"><h4>' + pl.name + '</h4>' +
          '<p>' + pl.episodes + ' episodes · Updated ' + pl.updated + '</p></div></article></a>'
        );
      }).join('');
      return;
    }

    grid.innerHTML = LIB.playlists.map(function (pl) {
      var collage = pl.covers.map(function (url) {
        return '<img src="' + url + '" alt="">';
      }).join('');
      return (
        '<article class="playlist-card glass">' +
        '<div class="playlist-collage">' + collage + '</div>' +
        '<div class="playlist-info"><h4>' + pl.name + '</h4>' +
        '<p>' + pl.episodes + ' episodes · ' + pl.updated + '</p></div></article>'
      );
    }).join('');
  }

  function renderSaved() {
    var episodes = Castory.LibraryData ? Castory.LibraryData.getBookmarkedEpisodes() : [];
    var container = document.getElementById('savedEpisodes');

    if (!episodes.length) {
      container.innerHTML = '<p class="text-muted" style="padding:12px">' +
        (Castory.LibraryData ? Castory.LibraryData.emptyMessage('bookmarks') : 'No bookmarks yet.') + '</p>';
      return;
    }

    container.innerHTML = episodes.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      var badge = ep.mediaType === 'video'
        ? '<span class="badge-video">Video</span>'
        : '<span class="badge-audio">Audio</span>';
      return (
        '<a href="' + url + '" class="episode-card-link" data-episode-id="' + ep.id + '">' +
        '<article class="saved-card glass">' +
        '<img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div class="saved-body">' + badge +
        '<h4>' + ep.title + '</h4>' +
        '<p class="text-muted">' + ep.creator + ' · ' + ep.duration + '</p></div></article></a>'
      );
    }).join('');
  }

  function renderWatchHistory() {
    var items = profileData() ? profileData().getWatchHistory() : PROF.watchHistory;
    var container = document.getElementById('watchHistory');

    if (!items.length) {
      container.innerHTML = '<p class="text-muted" style="padding:12px">No watch history yet. Play an episode to see progress here.</p>';
      return;
    }

    container.innerHTML = items.map(function (item) {
      return (
        '<article class="history-card glass">' +
        '<div class="thumb"><img src="' + item.thumbnail + '" alt="' + item.title + '"></div>' +
        '<div class="card-body"><h4>' + item.title + '</h4>' +
        '<p class="creator">' + item.creator + ' · ' + item.duration + '</p>' +
        '<div class="progress player-progress"><span class="progress-fill" style="width:' + item.progress + '%"></span></div>' +
        '<p class="text-muted" style="font-size:13px;margin-top:8px">' + item.progress + '% watched</p></div></article>'
      );
    }).join('');
  }

  function renderTopCategories() {
    document.getElementById('topCategories').innerHTML = PROF.topCategories.map(function (cat) {
      return (
        '<article class="category-card glass" style="background:' + cat.gradient + '">' +
        '<h4>' + cat.name + '</h4>' +
        '<p>' + cat.episodes + ' episodes</p></article>'
      );
    }).join('');
  }

  function renderRecentlyCompleted() {
    var items = profileData() ? profileData().getRecentlyCompleted() : PROF.recentlyCompleted;
    var container = document.getElementById('recentlyCompleted');

    if (!items.length) {
      container.innerHTML = '<p class="text-muted" style="padding:12px">Complete an episode (95%+) to see it here.</p>';
      return;
    }

    container.innerHTML = items.map(function (item) {
      var badge = item.mediaType === 'video'
        ? '<span class="badge-video">Video</span>'
        : '<span class="badge-audio">Audio</span>';
      return (
        '<article class="completed-item glass">' +
        '<img src="' + item.thumbnail + '" alt="' + item.title + '">' +
        '<div class="info">' + badge +
        '<h4>' + item.title + '</h4>' +
        '<p>' + item.creator + '</p></div>' +
        '<span class="time">' + item.completedAgo + '</span></article>'
      );
    }).join('');
  }

  function renderInsights() {
    var ins = PROF.insights;
    var data = ins.weeklyGrowth;
    var max = Math.max.apply(null, data);
    var w = 280;
    var h = 60;
    var step = w / (data.length - 1);
    var points = data.map(function (v, i) {
      var x = i * step;
      var y = h - (v / max) * h;
      return x + ',' + y;
    }).join(' ');
    var areaPoints = '0,' + h + ' ' + points + ' ' + w + ',' + h;

    document.getElementById('insightsWidget').innerHTML =
      '<div class="insight-metrics">' +
      '<div class="insight-metric"><p class="val">' + ins.engagementRate + '</p><p class="lbl">Engagement</p></div>' +
      '<div class="insight-metric"><p class="val">' + ins.avgSession + '</p><p class="lbl">Avg Session</p></div></div>' +
      '<p class="text-muted" style="font-size:13px;margin-bottom:4px">Follower growth</p>' +
      '<svg class="line-chart" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' +
      '<defs><linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#3B82F6"/></linearGradient>' +
      '<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#7C3AED" stop-opacity="0.4"/><stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/></linearGradient></defs>' +
      '<polygon class="chart-area" points="' + areaPoints + '"/>' +
      '<polyline points="' + points + '"/></svg>';
  }

  function renderFollowing() {
    var f = PROF.followingSummary;
    document.getElementById('followingWidget').innerHTML =
      '<div class="following-grid">' +
      '<div><p class="val">' + f.creators + '</p><p class="lbl">Creators</p></div>' +
      '<div><p class="val">' + f.podcasts + '</p><p class="lbl">Podcasts</p></div>' +
      '<div><p class="val">' + f.topics + '</p><p class="lbl">Topics</p></div></div>';
  }

  function renderAccount() {
    var a = profileData() ? profileData().getAccountStatus() : PROF.accountStatus;
    document.getElementById('accountWidget').innerHTML =
      '<div class="account-row"><span>Plan</span><strong>' + a.plan + '</strong></div>' +
      '<div class="account-row"><span>Status</span><span class="status-active">' + a.status + '</span></div>' +
      '<div class="account-row"><span>Renewal</span><span>' + a.renewal + '</span></div>' +
      '<div class="account-row"><span>Member since</span><span>' + a.memberSince + '</span></div>';
  }

  function renderStorage() {
    var s = LIB.storage;
    document.getElementById('storageWidget').innerHTML =
      '<div class="storage-header" style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:13px">' +
      '<span>' + s.usedLabel + ' used</span><span>' + s.totalLabel + '</span></div>' +
      '<div class="progress-bar"><div class="progress-bar__fill" style="width:' + s.usedPercent + '%"></div></div>' +
      '<p class="text-muted" style="font-size:13px;margin-top:8px">' + s.usedPercent + '% of storage used</p>';
  }

  function renderHeatmap() {
    var levels = PROF.heatmapLevels;
    var cells = levels.map(function (level) {
      var cls = level > 0 ? ' heatmap-cell--' + level : '';
      return '<div class="heatmap-cell' + cls + '" title="Activity level ' + level + '"></div>';
    }).join('');

    document.getElementById('heatmapWidget').innerHTML =
      '<div class="heatmap-wrap"><div class="heatmap">' + cells + '</div></div>' +
      '<p class="text-muted" style="font-size:12px;margin-top:8px">Last 12 weeks</p>';
  }

  function renderInterests() {
    document.getElementById('interestsWidget').innerHTML = PROF.topInterests.map(function (t) {
      return (
        '<div class="interest-row">' +
        '<div class="interest-row-header"><span>' + t.name + '</span><span>' + t.percent + '%</span></div>' +
        '<div class="progress-bar"><div class="progress-bar__fill" style="width:' + t.percent + '%"></div></div></div>'
      );
    }).join('');
  }

  function renderBottomNav() {
    var items = [
      { label: 'Home', href: R.home, icon: '🏠' },
      { label: 'Explore', href: R.explore, icon: '◈' },
      { label: 'Library', href: R.library, icon: '📚' },
      { label: 'Profile', href: 'index.html', icon: '👤', active: true },
    ];
    document.getElementById('bottomNav').innerHTML = items.map(function (item) {
      return '<a href="' + item.href + '"' + (item.active ? ' class="active"' : '') + '>' +
        '<span>' + item.icon + '</span>' + item.label + '</a>';
    }).join('');
  }

  function openEditProfileModal() {
    var modal = document.getElementById('actionModal');
    var titleEl = document.getElementById('modalTitle');
    var bodyEl = document.getElementById('modalBody');
    var okBtn = document.getElementById('modalOk');

    titleEl.textContent = 'Edit Profile';
    bodyEl.innerHTML =
      '<form id="editProfileForm" class="profile-edit-form">' +
      '<div class="form-field"><label for="editBio">Bio</label>' +
      '<textarea id="editBio" rows="3" maxlength="500">' + (user.bio || '') + '</textarea></div>' +
      '<div class="form-field"><label for="editLocation">Location</label>' +
      '<input type="text" id="editLocation" maxlength="120" value="' + (user.location || '') + '"></div>' +
      '<div class="form-field"><label for="editWebsite">Website</label>' +
      '<input type="text" id="editWebsite" maxlength="200" value="' + (user.website || '') + '"></div>' +
      '<div class="form-field"><label for="editCover">Cover image URL</label>' +
      '<input type="url" id="editCover" maxlength="500" value="' + (user.cover || '') + '"></div>' +
      '</form>';

    okBtn.textContent = Castory.ProfileData && global.castoryConfig && castoryConfig.isLoggedIn
      ? 'Save Changes'
      : 'Got it';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function handleModalOk() {
    if (!Castory.ProfileData || !global.castoryConfig || !castoryConfig.isLoggedIn) {
      closeModal();
      return;
    }

    var form = document.getElementById('editProfileForm');
    if (!form) {
      closeModal();
      return;
    }

    var okBtn = document.getElementById('modalOk');
    okBtn.disabled = true;

    Castory.ProfileData.saveFields({
      bio: document.getElementById('editBio').value,
      location: document.getElementById('editLocation').value,
      website: document.getElementById('editWebsite').value,
      cover_url: document.getElementById('editCover').value,
    }).then(function () {
      user = CASTORY_MOCK.user;
      initHero();
      renderAccount();
      closeModal();
      notify('Profile updated');
    }).catch(function () {
      notify('Could not save profile');
    }).finally(function () {
      okBtn.disabled = false;
      okBtn.textContent = 'Save Changes';
    });
  }

  function initModals() {
    document.getElementById('editProfileBtn').addEventListener('click', openEditProfileModal);
    document.getElementById('shareProfileBtn').addEventListener('click', function () {
      openModal('Share Profile', 'Profile link copied to clipboard (simulation).');
    });
    document.getElementById('settingsProfileBtn').addEventListener('click', function () {
      openModal('Settings', 'Manage account preferences and privacy.');
    });
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOk').addEventListener('click', handleModalOk);
    document.getElementById('modalBackdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function refreshDynamicSections() {
    user = CASTORY_MOCK.user;
    initHero();
    renderStats();
    renderWatchHistory();
    renderRecentlyCompleted();
    renderAccount();
    renderPlaylists();
    renderSaved();
  }

  initHero();
  renderStats();
  renderAchievements();
  renderTimeline();
  renderCreators();
  initCarousel();
  renderPlaylists();
  renderSaved();
  renderWatchHistory();
  renderTopCategories();
  renderRecentlyCompleted();
  renderInsights();
  renderFollowing();
  renderAccount();
  renderStorage();
  renderHeatmap();
  renderInterests();
  renderBottomNav();
  initModals();

  Castory.Sidebar.init({
    menuBtn: document.getElementById('menuBtn'),
    sidebar: document.getElementById('sidebar'),
    backdrop: document.getElementById('sidebarBackdrop'),
  });

  window.addEventListener('castory:playlists', function () {
    renderPlaylists();
    renderStats();
  });

  window.addEventListener('castory:library', function () {
    renderSaved();
    renderStats();
  });

  window.addEventListener('castory:playback', function () {
    renderWatchHistory();
    renderRecentlyCompleted();
    renderStats();
  });

  window.addEventListener('castory:profile-ready', function () {
    refreshDynamicSections();
  });
  });
})();
