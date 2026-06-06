(function () {
  const R = CASTORY_MOCK.routes;
  const slides = CASTORY_MOCK.heroSlides;
  let current = 0;
  let timer = null;
  let activeChipCategory = 'All';

  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDescription');
  const heroImage = document.getElementById('heroImage');
  const heroCategory = document.getElementById('heroCategory');
  const heroDots = document.getElementById('heroDots');
  const heroSection = document.getElementById('heroSection');

  function renderHeroDots() {
    heroDots.innerHTML = '';
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () {
        current = i;
        updateHero();
        restartCarousel();
      });
      heroDots.appendChild(dot);
    });
  }

  function updateHero() {
    const slide = slides[current];
    heroTitle.textContent = slide.title;
    heroDesc.textContent = slide.description;
    heroImage.src = slide.image;
    heroImage.alt = slide.title;
    heroCategory.textContent = slide.category;
    Castory.qsa('.dot', heroDots).forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateHero();
  }

  function startCarousel() {
    timer = setInterval(nextSlide, 5000);
  }

  function stopCarousel() {
    clearInterval(timer);
  }

  function restartCarousel() {
    stopCarousel();
    startCarousel();
  }

  heroSection.addEventListener('mouseenter', stopCarousel);
  heroSection.addEventListener('mouseleave', startCarousel);

  function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    const items = Castory.filterEpisodes(CASTORY_MOCK.getVideoEpisodes(), {
      category: activeChipCategory === 'All' ? undefined : activeChipCategory,
    }).slice(0, 6);

    grid.innerHTML = items.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link">' +
        '<article class="episode-card glass searchable" data-category="' + ep.category + '">' +
        '<div class="thumb"><img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<span class="duration">' + ep.duration + '</span></div>' +
        '<div class="episode-info"><h3>' + ep.title + '</h3><p>' + ep.creator + '</p>' +
        '<div class="meta"><span>' + ep.views + ' views</span><span>' + ep.date + '</span></div></div></article></a>'
      );
    }).join('');
  }

  function renderAudioGrid() {
    const grid = document.getElementById('audioGrid');
    const items = Castory.filterEpisodes(CASTORY_MOCK.getAudioEpisodes(), {
      category: activeChipCategory === 'All' ? undefined : activeChipCategory,
    }).slice(0, 6);

    grid.innerHTML = items.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link">' +
        '<article class="audio-card glass searchable" data-category="' + ep.category + '">' +
        '<img class="audio-thumb" src="' + ep.thumbnail + '" alt="">' +
        '<div class="audio-meta"><h4>' + ep.title + '</h4><p class="text-secondary">' + ep.creator + '</p>' +
        '<span class="audio-duration">' + ep.duration + ' · ' + ep.date + '</span></div></article></a>'
      );
    }).join('');
  }

  function renderNewGrid() {
    const grid = document.getElementById('newGrid');
    const items = Castory.filterEpisodes(CASTORY_MOCK.getNewestEpisodes(6), {
      category: activeChipCategory === 'All' ? undefined : activeChipCategory,
    });

    grid.innerHTML = items.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link">' +
        '<article class="feed-card glass searchable" data-category="' + ep.category + '">' +
        '<img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div><h3>' + ep.title + '</h3><p class="text-secondary">' + ep.category + ' · ' + ep.duration + '</p></div></article></a>'
      );
    }).join('');
  }

  function renderCreators() {
    document.getElementById('creatorsWidget').innerHTML = CASTORY_MOCK.creators.slice(0, 2).map(function (c) {
      return (
        '<div class="creator"><img src="' + c.avatar + '" alt="' + c.name + '">' +
        '<div><h4>' + c.name + '</h4><p class="text-muted">' + c.followers + ' Followers</p></div>' +
        '<button class="follow-btn">Follow</button></div>'
      );
    }).join('');
  }

  function renderTopics() {
    document.getElementById('topicsWidget').innerHTML = CASTORY_MOCK.topics.map(function (t) {
      return '<div class="topic">' + t + '</div>';
    }).join('');
  }

  function applySearch(query) {
    const q = query.toLowerCase().trim();
    Castory.qsa('.searchable').forEach(function (el) {
      const text = el.textContent.toLowerCase();
      el.classList.toggle('is-hidden', q.length > 0 && !text.includes(q));
    });
  }

  function refreshGrids() {
    renderVideoGrid();
    renderAudioGrid();
    renderNewGrid();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Castory.whenReady(function () {
    renderHeroDots();
    updateHero();
    startCarousel();
    renderVideoGrid();
    renderAudioGrid();
    renderNewGrid();
    renderCreators();
    renderTopics();

    Castory.qsa('.follow-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const following = btn.classList.toggle('is-following');
        btn.textContent = following ? 'Following' : 'Follow';
      });
    });

    document.getElementById('notificationBtn').addEventListener('click', function () {
      const badge = this.querySelector('.badge');
      let count = parseInt(badge.textContent, 10);
      if (count > 0) badge.textContent = --count;
    });

    Castory.qsa('.topic').forEach(function (topic) {
      topic.addEventListener('click', function () {
        Castory.qsa('.topic').forEach(function (t) { t.classList.remove('is-active'); });
        topic.classList.add('is-active');
      });
    });

    document.getElementById('searchInput').addEventListener('keyup', Castory.debounce(function (e) {
      applySearch(e.target.value);
    }, 200));

    Castory.qsa('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        Castory.qsa('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeChipCategory = chip.dataset.category || 'All';
        refreshGrids();
      });
    });

    document.getElementById('saveLaterBtn').addEventListener('click', function () {
      this.classList.toggle('is-saved');
      this.textContent = this.classList.contains('is-saved') ? 'Saved ✓' : 'Save Later';
    });

    document.getElementById('createBtn').addEventListener('click', function () {
      document.getElementById('createMenu').classList.toggle('is-open');
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.create-wrap')) {
        document.getElementById('createMenu').classList.remove('is-open');
      }
    });
    });
  });
})();
