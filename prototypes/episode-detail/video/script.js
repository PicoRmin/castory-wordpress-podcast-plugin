(function () {
  Castory.whenReady(function () {
  var ep = Castory.EpisodeDetail.getFromQuery(2, 'video');
  if (!ep) return;

  document.title = ep.title + ' | Castory';

  document.getElementById('breadcrumb').innerHTML =
    '<a href="' + (CASTORY_MOCK.routes.home || '#') + '">Home</a> › ' +
    '<a href="' + (CASTORY_MOCK.routes.trendingVideo || '#') + '">Trending</a> › ' +
    '<span>Video</span> › <span>' + ep.title + '</span>';

  document.getElementById('videoPoster').src = ep.thumbnail;
  document.getElementById('episodeTitle').textContent = ep.title;
  document.getElementById('episodeDesc').textContent = ep.description;
  document.getElementById('metaTags').innerHTML =
    '<span class="meta-tag">' + ep.category + '</span>' +
    '<span class="meta-tag">' + ep.duration + '</span>' +
    '<span class="meta-tag">' + ep.views + ' views</span>' +
    '<span class="meta-tag">' + ep.date + '</span>';

  document.getElementById('mobileLink').href = '../mobile/index.html?id=' + ep.id;

  var stage = document.getElementById('videoStage');
  var videoMount = document.createElement('div');
  videoMount.className = 'video-mount';
  videoMount.id = 'videoMount';
  stage.insertBefore(videoMount, stage.querySelector('.video-overlay'));

  Castory.EpisodeDetail.bindPlayer({
    episode: ep,
    playBtn: document.getElementById('videoPlayBtn'),
    progressFill: document.getElementById('progressFill'),
    progressBar: document.getElementById('seekBar'),
    currentTimeEl: document.getElementById('currentTime'),
    totalTimeEl: document.getElementById('totalTime'),
    volumeBtn: document.getElementById('volumeBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    fullscreenTarget: stage,
    videoContainer: videoMount,
    stageEl: stage,
    resume: true,
  });

  document.getElementById('videoPlaySmall').addEventListener('click', function () {
    document.getElementById('videoPlayBtn').click();
  });

  document.getElementById('creatorRow').innerHTML =
    '<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="">' +
    '<div><strong>' + ep.creator + '</strong>' +
    (ep.verified ? ' <span class="verified">✓</span>' : '') +
    '<p class="text-muted">' + ep.podcast + '</p></div>' +
    '<button type="button" class="follow-btn" id="followBtn">Follow</button>';

  document.getElementById('followBtn').addEventListener('click', function () {
    var btn = document.getElementById('followBtn');
    btn.classList.toggle('following');
    btn.textContent = btn.classList.contains('following') ? 'Following' : 'Follow';
  });

  if (ep.chapters && ep.chapters.length) {
    document.getElementById('chaptersList').innerHTML = ep.chapters.map(function (ch, i) {
      return (
        '<div class="chapter-row' + (i === 0 ? ' active' : '') + '" data-time="' + ch.time + '">' +
        '<span class="time">' + ch.time + '</span><span>' + ch.title + '</span></div>'
      );
    }).join('');

    Castory.qsa('.chapter-row').forEach(function (row) {
      row.addEventListener('click', function () {
        Castory.qsa('.chapter-row').forEach(function (r) { r.classList.remove('active'); });
        row.classList.add('active');
        if (Castory.Player) {
          Castory.Player.seekToChapter(row.getAttribute('data-time'));
        }
      });
    });
  } else {
    document.getElementById('chaptersList').innerHTML = '<p class="text-muted">No chapters available.</p>';
  }

  document.getElementById('transcriptBody').textContent = ep.transcript || 'Transcript not available for this episode.';
  document.getElementById('transcriptToggle').addEventListener('click', function () {
    var open = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', open ? 'false' : 'true');
    document.getElementById('transcriptBody').hidden = open;
  });

  var related = CASTORY_MOCK.getRelatedEpisodes(ep, 4);
  document.getElementById('relatedGrid').innerHTML = related.map(function (rel) {
    var url = CASTORY_MOCK.getEpisodeUrl(rel, '../../');
    return (
      '<a href="' + url + '" class="related-video-card glass">' +
      '<img src="' + rel.thumbnail + '" alt="">' +
      '<div class="body"><h4>' + rel.title + '</h4>' +
      '<p class="text-muted">' + rel.creator + ' · ' + rel.duration + '</p></div></a>'
    );
  }).join('');

  document.getElementById('shareBtn').addEventListener('click', function () {
    Castory.EpisodeDetail.showToast('Link copied');
  });
  if (Castory.LibraryActions) {
    Castory.LibraryActions.bindEpisode(ep, { bookmarkBtn: document.getElementById('bookmarkBtn') });
  }
  document.getElementById('downloadBtn').addEventListener('click', function () {
    var url = Castory.Player.resolveSrc(ep);
    if (url) window.open(url, '_blank');
    else Castory.EpisodeDetail.showToast('Download unavailable');
  });
  });
})();
