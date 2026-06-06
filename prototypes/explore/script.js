(function () {
  Castory.whenReady(function () {
  var R = CASTORY_MOCK.routes;
  var slides = CASTORY_MOCK.exploreHeroSlides;
  var currentSlide = 0;
  var timer = null;
  var activeCategory = 'Technology';
  var activeTopicId = null;
  var searchQuery = '';

  var heroTitle = document.getElementById('heroTitle');
  var heroDesc = document.getElementById('heroDesc');
  var heroImage = document.getElementById('heroImage');
  var heroAvatars = document.getElementById('heroAvatars');
  var heroDots = document.getElementById('heroDots');
  var exploreHero = document.getElementById('exploreHero');

  function waveformHtml() {
    var bars = '';
    for (var i = 0; i < 12; i++) {
      bars += '<span style="height:' + (30 + Math.random() * 70) + '%"></span>';
    }
    return '<div class="waveform" aria-hidden="true">' + bars + '</div>';
  }

  function filterOpts() {
    return {
      category: activeCategory === 'All' ? undefined : activeCategory,
      search: searchQuery || undefined,
    };
  }

  function renderHeroDots() {
    heroDots.innerHTML = '';
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === currentSlide ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () {
        currentSlide = i;
        updateHero();
        restartCarousel();
      });
      heroDots.appendChild(dot);
    });
  }

  function updateHero() {
    var slide = slides[currentSlide];
    heroTitle.textContent = slide.title;
    heroDesc.textContent = slide.description;
    heroImage.src = slide.image;
    heroImage.alt = slide.title;

    heroAvatars.innerHTML = slide.creators.map(function (id) {
      var c = CASTORY_MOCK.getCreatorById(id);
      if (!c) return '';
      return '<img src="' + c.avatar + '" alt="' + c.name + '" title="' + c.name + '">';
    }).join('');

    Castory.qsa('.dot', heroDots).forEach(function (d, i) {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateHero();
  }

  function startCarousel() {
    timer = setInterval(nextSlide, 6000);
  }

  function stopCarousel() {
    clearInterval(timer);
  }

  function restartCarousel() {
    stopCarousel();
    startCarousel();
  }

  function renderTopics() {
    var grid = document.getElementById('topicGrid');
    grid.innerHTML = CASTORY_MOCK.trendingTopicsExplore.map(function (topic) {
      var active = activeTopicId === topic.id ? ' is-active' : '';
      return (
        '<article class="topic-card glass searchable' + active + '" data-topic-id="' + topic.id + '" ' +
        'data-filter-category="' + topic.filterCategory + '" style="background:' + topic.gradient + '">' +
        '<span class="topic-icon">' + topic.icon + '</span>' +
        '<div><h3>' + topic.title + '</h3><p>' + topic.episodeCount + ' episodes</p></div></article>'
      );
    }).join('');

    Castory.qsa('.topic-card', grid).forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-topic-id');
        var cat = card.getAttribute('data-filter-category');
        activeTopicId = activeTopicId === id ? null : id;
        activeCategory = activeTopicId ? cat : 'Technology';
        syncCategoryPills();
        renderAllSections();
        Castory.qsa('.topic-card', grid).forEach(function (c) {
          c.classList.toggle('is-active', c.getAttribute('data-topic-id') === activeTopicId);
        });
      });
    });
  }

  function syncCategoryPills() {
    Castory.qsa('#categoryBar .pill').forEach(function (pill) {
      pill.classList.toggle('active', pill.getAttribute('data-category') === activeCategory);
    });
  }

  function renderCreators() {
    var scroll = document.getElementById('creatorsScroll');
    scroll.innerHTML = CASTORY_MOCK.popularCreators.map(function (c) {
      return (
        '<article class="creator-card glass searchable" data-category="' + c.category + '">' +
        '<img src="' + c.avatar + '" alt="' + c.name + '">' +
        '<h4>' + c.name + (c.verified ? ' <span class="verified">✓</span>' : '') + '</h4>' +
        '<p class="text-muted">' + c.followers + ' followers</p>' +
        '<span class="category-tag">' + c.category + '</span>' +
        '<button class="follow-btn" type="button">Follow</button></article>'
      );
    }).join('');

    Castory.qsa('.follow-btn', scroll).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var following = btn.classList.toggle('following');
        btn.textContent = following ? 'Following' : 'Follow';
      });
    });
  }

  function renderVideoGrid() {
    var grid = document.getElementById('videoGrid');
    var items = Castory.filterEpisodes(CASTORY_MOCK.getVideoEpisodes(), filterOpts()).slice(0, 4);
    grid.innerHTML = items.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link">' +
        '<article class="episode-card glass searchable" data-category="' + ep.category + '">' +
        '<div class="thumb"><img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<span class="duration">' + ep.duration + '</span></div>' +
        '<div class="episode-info"><h3>' + ep.title + '</h3><p>' + ep.creator + '</p>' +
        '<div class="meta"><span>' + ep.views + ' views</span></div></div></article></a>'
      );
    }).join('');
  }

  function renderAudioList() {
    var list = document.getElementById('audioList');
    var items = Castory.filterEpisodes(CASTORY_MOCK.getAudioEpisodes(), filterOpts()).slice(0, 5);
    list.innerHTML = items.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-row-link">' +
        '<article class="audio-explore-row glass searchable" data-category="' + ep.category + '">' +
        '<button class="play-btn" type="button" aria-label="Play ' + ep.title + '">▶</button>' +
        waveformHtml() +
        '<div class="audio-info"><h4>' + ep.title + '</h4>' +
        '<p class="text-muted">' + (ep.podcast || ep.creator) + '</p></div>' +
        '<span class="duration-badge">' + ep.duration + '</span></article></a>'
      );
    }).join('');
  }

  function renderRecommended() {
    var grid = document.getElementById('recommendedGrid');
    var items = Castory.filterEpisodes(CASTORY_MOCK.getRecommendedEpisodes(8), filterOpts()).slice(0, 6);
    grid.innerHTML = items.map(function (ep) {
      var badge = ep.mediaType === 'video'
        ? '<span class="badge-video">Video</span>'
        : '<span class="badge-audio">Audio</span>';
      return (
        '<a href="' + CASTORY_MOCK.getEpisodeUrl(ep, '../') + '" class="episode-card-link">' +
        '<article class="recommended-card glass searchable" data-category="' + ep.category + '">' +
        '<img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div class="rec-meta"><div>' + badge + '</div><h4>' + ep.title + '</h4>' +
        '<p class="text-muted">' + ep.creator + ' · ' + ep.duration + '</p></div></article></a>'
      );
    }).join('');
  }

  function renderTopCreators() {
    document.getElementById('topCreatorsWidget').innerHTML = CASTORY_MOCK.topPodcasts.slice(0, 5).map(function (p) {
      return (
        '<div class="ranking-item">' +
        '<span class="rank">' + p.rank + '</span>' +
        '<img src="' + p.artwork + '" alt="' + p.name + '">' +
        '<div class="rank-info"><h4>' + p.name + '</h4><p>' + p.followers + '</p></div></div>'
      );
    }).join('');
  }

  function renderTagCloud() {
    document.getElementById('tagCloud').innerHTML = CASTORY_MOCK.tagCloud.map(function (tag) {
      return '<button type="button" class="tag-pill">' + tag + '</button>';
    }).join('');

    Castory.qsa('.tag-pill', document.getElementById('tagCloud')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        searchQuery = btn.textContent;
        document.getElementById('searchInput').value = searchQuery;
        renderAllSections();
      });
    });
  }

  function renderDiscoveryStats() {
    document.getElementById('discoveryStats').innerHTML = CASTORY_MOCK.discoveryStats.map(function (s) {
      return (
        '<div class="stat-card">' +
        '<span class="stat-icon">' + s.icon + '</span>' +
        '<div><p class="text-muted">' + s.label + '</p>' +
        '<p class="stat-value">' + s.value + ' <span class="stat-trend">' + s.trend + '</span></p></div></div>'
      );
    }).join('');
  }

  function renderFollowedTopics() {
    document.getElementById('followedTopics').innerHTML = CASTORY_MOCK.mostFollowedTopics.map(function (t) {
      return (
        '<div class="progress-topic">' +
        '<div class="progress-topic-header"><span>' + t.name + '</span><span>' + t.percent + '%</span></div>' +
        '<div class="progress-bar"><div class="progress-bar-fill" style="width:' + t.percent + '%"></div></div></div>'
      );
    }).join('');
  }

  function renderBottomNav() {
    var nav = document.getElementById('bottomNav');
    var items = [
      { label: 'Home', href: R.home, icon: '🏠', route: 'home' },
      { label: 'Explore', href: 'index.html', icon: '◈', route: 'explore', active: true },
      { label: 'Library', href: R.library, icon: '📚', route: 'library' },
      { label: 'Profile', href: R.profile, icon: '👤', route: 'profile' },
    ];
    nav.innerHTML = items.map(function (item) {
      return '<a href="' + item.href + '"' + (item.active ? ' class="active"' : '') + '>' +
        '<span>' + item.icon + '</span>' + item.label + '</a>';
    }).join('');
  }

  function renderAllSections() {
    renderVideoGrid();
    renderAudioList();
    renderRecommended();
    applySearchVisibility();
  }

  function applySearchVisibility() {
    if (!searchQuery) return;
    var q = searchQuery.toLowerCase();
    Castory.qsa('.searchable').forEach(function (el) {
      var text = el.textContent.toLowerCase();
      el.style.display = text.indexOf(q) !== -1 ? '' : 'none';
    });
  }

  function initCategoryBar() {
    Castory.Filters.initPills('#categoryBar .pill', {
      onChange: function (value) {
        activeCategory = value;
        activeTopicId = null;
        Castory.qsa('.topic-card').forEach(function (c) { c.classList.remove('is-active'); });
        renderAllSections();
      },
    });
  }

  function initSearch() {
    var input = document.getElementById('searchInput');
    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) {
      searchQuery = params.get('q');
      input.value = searchQuery;
      renderAllSections();
    }
    input.addEventListener('input', Castory.debounce(function () {
      searchQuery = input.value.trim();
      renderAllSections();
    }, 250));
  }

  function initCreateMenu() {
    var btn = document.getElementById('createBtn');
    var menu = document.getElementById('createMenu');
    btn.addEventListener('click', function () {
      menu.classList.toggle('is-open');
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
      }
    });
  }

  exploreHero.addEventListener('mouseenter', stopCarousel);
  exploreHero.addEventListener('mouseleave', startCarousel);

  renderHeroDots();
  updateHero();
  startCarousel();
  renderTopics();
  renderCreators();
  renderAllSections();
  renderTopCreators();
  renderTagCloud();
  renderDiscoveryStats();
  renderFollowedTopics();
  renderBottomNav();
  initCategoryBar();
  initSearch();
  initCreateMenu();

  Castory.Sidebar.init({
    menuBtn: document.getElementById('menuBtn'),
    sidebar: document.getElementById('sidebar'),
    backdrop: document.getElementById('sidebarBackdrop'),
  });
  });
})();
