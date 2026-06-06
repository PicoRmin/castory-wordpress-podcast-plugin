(function () {
  const categoryPills = document.getElementById('categoryPills');
  const episodeGrid = document.getElementById('episodeGrid');
  const sortSelect = document.getElementById('sortSelect');
  const mobileSort = document.getElementById('mobileSort');
  const paginationEl = document.getElementById('pagination');
  const episodeCount = document.getElementById('episodeCount');
  const searchInput = document.querySelector('.search-box input');

  let currentCategory = 'All';
  let currentPage = 1;
  const pageSize = 8;
  let currentSort = 'Most Popular';
  let searchQuery = '';

  const episodes = CASTORY_MOCK.getVideoEpisodes();

  function getFiltered() {
    let list = Castory.filterEpisodes(episodes, {
      category: currentCategory,
      search: searchQuery,
    });
    return Castory.sortEpisodes(list, currentSort);
  }

  function renderCategoryPills() {
    categoryPills.innerHTML = '';
    CASTORY_MOCK.categories.forEach(function (cat) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'category-pill pill' + (cat === currentCategory ? ' active' : '');
      pill.textContent = cat;
      pill.addEventListener('click', function () {
        currentCategory = cat;
        currentPage = 1;
        renderCategoryPills();
        renderEpisodes();
        renderPagination();
      });
      categoryPills.appendChild(pill);
    });
  }

  function renderEpisodes() {
    const filtered = getFiltered();
    const paginated = Castory.paginate(filtered, currentPage, pageSize);

    episodeGrid.innerHTML = paginated.map(function (ep) {
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-card-link">' +
        '<article class="episode-card video-card">' +
        '<div class="thumbnail thumb"><img src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div class="play-overlay"><div class="play-circle play-btn">▶</div></div>' +
        '<span class="duration">' + ep.duration + '</span></div>' +
        '<div class="card-content episode-info"><h3 class="card-title line-clamp-2">' + ep.title + '</h3>' +
        '<div class="creator">' + ep.creator + (ep.verified ? ' <span class="verified">✔</span>' : '') + '</div>' +
        '<div class="meta text-muted">' + ep.views + ' views • ' + ep.date + '</div></div></article></a>'
      );
    }).join('');

    if (episodeCount) episodeCount.textContent = filtered.length + ' Episodes';
  }

  function renderPagination() {
    const total = Castory.getTotalPages(getFiltered().length, pageSize);
    Castory.Pagination.render(paginationEl, {
      currentPage: currentPage,
      totalPages: total,
      onChange: function (p) {
        currentPage = p;
        renderEpisodes();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  }

  function bindSort(select) {
    if (!select) return;
    select.addEventListener('change', function (e) {
      currentSort = e.target.value.trim();
      currentPage = 1;
      renderEpisodes();
      renderPagination();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Castory.whenReady(function () {
    renderCategoryPills();
    renderEpisodes();
    renderPagination();
    bindSort(sortSelect);
    bindSort(mobileSort);

    if (searchInput) {
      searchInput.addEventListener('input', Castory.debounce(function (e) {
        searchQuery = e.target.value;
        currentPage = 1;
        renderEpisodes();
        renderPagination();
      }, 250));
    }

    Castory.init({ sidebar: false, nav: true, globalPlayer: true, search: true, notifications: true });
    });
  });
})();
