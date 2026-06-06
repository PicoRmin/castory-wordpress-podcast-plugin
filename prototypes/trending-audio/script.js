(function () {
  const episodesList = document.getElementById('episodesList');
  const paginationEl = document.getElementById('pagination');
  const searchInput = document.querySelector('.search-box input');
  const sortSelect = document.querySelector('.sorting select');

  let currentCategory = 'All';
  let currentPage = 1;
  const pageSize = 6;
  let currentSort = 'Most Popular';
  let searchQuery = '';
  let durationFilter = 'all';
  let publishedFilter = 'all';

  const episodes = CASTORY_MOCK.getAudioEpisodes();

  function parseDurationMinutes(dur) {
    const parts = dur.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 60 + parts[1];
    return parts[0] * 60 + (parts[1] || 0);
  }

  function applyDurationFilter(list) {
    return list.filter(function (ep) {
      const mins = parseDurationMinutes(ep.duration);
      switch (durationFilter) {
        case 'under20': return mins < 20;
        case '20-40': return mins >= 20 && mins < 40;
        case '40-60': return mins >= 40 && mins <= 60;
        case 'over60': return mins > 60;
        default: return true;
      }
    });
  }

  function applyPublishedFilter(list) {
    const now = Date.now();
    return list.filter(function (ep) {
      const age = now - ep.publishedAt;
      switch (publishedFilter) {
        case '24h': return age <= 86400000;
        case '7d': return age <= 7 * 86400000;
        case '30d': return age <= 30 * 86400000;
        case '90d': return age <= 90 * 86400000;
        default: return true;
      }
    });
  }

  function getFiltered() {
    let list = Castory.filterEpisodes(episodes, {
      category: currentCategory,
      search: searchQuery,
    });
    list = applyDurationFilter(list);
    list = applyPublishedFilter(list);
    return Castory.sortEpisodes(list, currentSort);
  }

  function renderRows() {
    const filtered = getFiltered();
    const paginated = Castory.paginate(filtered, currentPage, pageSize);

    episodesList.innerHTML = paginated.map(function (ep) {
      const podcast = ep.podcast || ep.category;
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-row-link" data-episode-id="' + ep.id + '">' +
        '<div class="episode-row">' +
        '<div class="episode-info"><div class="episode-thumb">' +
        '<img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<button type="button" class="castory-quick-play" aria-label="Play ' + ep.title + '">▶</button></div>' +
        '<div><h3>' + ep.title + '</h3><p class="text-secondary">' + (ep.description || '') + '</p></div></div>' +
        '<div class="podcast-info">' + podcast + (ep.verified ? ' ✓' : '') + '<small>' + ep.creator + '</small></div>' +
        '<div>' + ep.duration + '</div><div>' + ep.date + '</div>' +
        '<div class="actions"><button type="button" class="bookmark-btn castory-bookmark-btn" aria-label="Bookmark">🔖</button>' +
        '<button type="button" aria-label="More options">⋮</button></div></div></a>'
      );
    }).join('');
  }

  function renderPagination() {
    Castory.Pagination.render(paginationEl, {
      currentPage: currentPage,
      totalPages: Castory.getTotalPages(getFiltered().length, pageSize),
      onChange: function (p) {
        currentPage = p;
        renderRows();
        renderPagination();
      },
    });
  }

  function refresh() {
    renderRows();
    renderPagination();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Castory.whenReady(function () {
    Castory.Sidebar.init({ menuBtn: '#mobileMenu', sidebar: '#sidebar' });

    Castory.Filters.initPills('.section-top .pill', {
      group: '.filters',
      onChange: function (label) {
        currentCategory = label;
        currentPage = 1;
        refresh();
      },
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        currentSort = sortSelect.value === 'Latest' ? 'Newest' : 'Most Popular';
        currentPage = 1;
        refresh();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', Castory.debounce(function (e) {
        searchQuery = e.target.value;
        currentPage = 1;
        refresh();
      }, 250));
    }

    Castory.qsa('.widget label').forEach(function (label, index, all) {
      label.addEventListener('click', function () {
        const text = label.textContent.trim();
        if (text.includes('Duration') || text.includes('min') || text === 'All Durations') {
          if (text.includes('Under')) durationFilter = 'under20';
          else if (text.includes('20')) durationFilter = '20-40';
          else if (text.includes('40')) durationFilter = '40-60';
          else if (text.includes('Over')) durationFilter = 'over60';
          else durationFilter = 'all';
        }
        if (text.includes('Last') || text === 'All Time') {
          if (text.includes('24')) publishedFilter = '24h';
          else if (text.includes('7')) publishedFilter = '7d';
          else if (text.includes('30')) publishedFilter = '30d';
          else if (text.includes('3 Months')) publishedFilter = '90d';
          else publishedFilter = 'all';
        }
        currentPage = 1;
        refresh();
      });
    });

    refresh();
    Castory.init({ sidebar: false, nav: true, globalPlayer: true, search: true, notifications: true, hydrateDates: true });
    });
  });
})();
