(function () {
  const episodeList = document.getElementById('episodeList');
  const paginationEl = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');

  let currentPage = 1;
  const pageSize = 8;
  let mediaFilter = 'all';
  let categoryFilter = 'all';
  let searchQuery = '';

  function getFiltered() {
    let list = CASTORY_MOCK.getNewestEpisodes(50);

    if (mediaFilter !== 'all') {
      list = list.filter(function (ep) { return ep.mediaType === mediaFilter; });
    }
    if (categoryFilter !== 'all') {
      list = list.filter(function (ep) { return ep.category === categoryFilter; });
    }
    if (searchQuery) {
      list = Castory.filterEpisodes(list, { search: searchQuery });
    }
    return list;
  }

  function renderList() {
    const filtered = getFiltered();
    const pageItems = Castory.paginate(filtered, currentPage, pageSize);

    episodeList.innerHTML = pageItems.map(function (ep) {
      const badge = ep.mediaType === 'video'
        ? '<span class="badge-video">Video</span>'
        : '<span class="badge-audio">Audio</span>';
      var url = CASTORY_MOCK.getEpisodeUrl(ep, '../');
      return (
        '<a href="' + url + '" class="episode-list-link">' +
        '<article class="episode-list-row glass-card">' +
        '<img class="list-thumb" src="' + ep.thumbnail + '" alt="' + ep.title + '">' +
        '<div class="list-info"><h3>' + ep.title + '</h3>' +
        '<p class="text-secondary">' + ep.creator + (ep.verified ? ' <span class="verified">✔</span>' : '') + '</p>' +
        '<div class="meta">' + badge + ' <span>' + ep.duration + '</span> <span>' + ep.date + '</span></div></div>' +
        '<div class="list-actions">' +
        '<button type="button" class="bookmark" aria-label="Bookmark">★</button>' +
        '<button type="button" class="play-btn" aria-label="Play">▶</button>' +
        '<button type="button" class="more" aria-label="More">⋮</button></div></article></a>'
      );
    }).join('');

    Castory.qsa('.bookmark', episodeList).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('is-bookmarked');
      });
    });
    Castory.qsa('.play-btn', episodeList).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('is-playing');
      });
    });
  }

  function renderPagination() {
    Castory.Pagination.render(paginationEl, {
      currentPage: currentPage,
      totalPages: Castory.getTotalPages(getFiltered().length, pageSize),
      onChange: function (p) {
        currentPage = p;
        renderList();
        renderPagination();
      },
    });
  }

  function refresh() {
    renderList();
    renderPagination();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Castory.Sidebar.init({ menuBtn: '#mobileMenu', sidebar: '#sidebar' });

    document.getElementById('creatorsSide').innerHTML = CASTORY_MOCK.creators.slice(0, 2).map(function (c) {
      return '<div class="creator" style="margin-top:12px"><img src="' + c.avatar + '" alt="" class="avatar-small">' +
        '<p>' + c.name + ' <span class="text-muted">' + c.followers + '</span></p></div>';
    }).join('');

    Castory.qsa('#filterPills .pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        Castory.qsa('#filterPills .pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        const f = pill.dataset.filter;
        if (f === 'video' || f === 'audio') {
          mediaFilter = f;
          categoryFilter = 'all';
        } else if (f === 'all') {
          mediaFilter = 'all';
          categoryFilter = 'all';
        } else {
          categoryFilter = f;
          mediaFilter = 'all';
        }
        currentPage = 1;
        refresh();
      });
    });

    Castory.qsa('input[name="type"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        mediaFilter = radio.value;
        currentPage = 1;
        refresh();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', Castory.debounce(function (e) {
        searchQuery = e.target.value;
        currentPage = 1;
        refresh();
      }, 250));
    }

    document.getElementById('subscribe-btn').addEventListener('click', function () {
      const email = document.getElementById('newsletter-email').value;
      const msg = document.getElementById('newsletter-msg');
      if (/^\S+@\S+\.\S+$/.test(email)) {
        msg.textContent = 'Subscribed!';
        msg.style.color = 'var(--color-success)';
      } else {
        msg.textContent = 'Invalid email';
        msg.style.color = '#F87171';
      }
    });

    refresh();
  });
})();
