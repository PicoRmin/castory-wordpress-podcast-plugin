(function () {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10) || 14;
  var ep = CASTORY_MOCK.getEpisodeById(id);
  if (!ep) {
    document.getElementById('mobileMain').innerHTML = '<p>Episode not found.</p>';
    return;
  }

  document.title = ep.title + ' | Castory';
  document.getElementById('headerTitle').textContent = ep.title;
  document.getElementById('miniThumb').src = ep.thumbnail;
  document.getElementById('miniTitle').textContent = ep.title;

  var main = document.getElementById('mobileMain');
  var isVideo = ep.mediaType === 'video';

  if (isVideo) {
    main.innerHTML =
      '<article class="mobile-hero">' +
      '<div class="mobile-video-wrap glass">' +
      '<img src="' + ep.thumbnail + '" alt="">' +
      '<div class="play-center"><button type="button" class="play-btn play-large-mobile" id="heroPlay">▶</button></div></div>' +
      '<h1>' + ep.title + '</h1>' +
      '<p class="creator">' + ep.creator + ' · ' + ep.podcast + '</p>' +
      '<div class="mobile-meta">' +
      '<span class="mobile-tag">' + ep.duration + '</span>' +
      '<span class="mobile-tag">' + ep.views + ' views</span></div>' +
      '<p class="mobile-desc">' + ep.description + '</p></article>';
  } else {
    main.innerHTML =
      '<article class="mobile-hero">' +
      '<img class="mobile-audio-art" src="' + ep.thumbnail + '" alt="">' +
      Castory.EpisodeDetail.waveformHtml(32, true) +
      '<h1>' + ep.title + '</h1>' +
      '<p class="creator">' + ep.creator + ' · ' + ep.podcast + '</p>' +
      '<div class="mobile-meta">' +
      '<span class="mobile-tag badge-audio">Audio</span>' +
      '<span class="mobile-tag">' + ep.duration + '</span></div>' +
      '<p class="mobile-desc">' + ep.description + '</p></article>';
  }

  var totalSeconds = Castory.EpisodeDetail.parseDuration(ep.duration);
  var player = Castory.EpisodeDetail.bindPlayer({
    playBtn: document.getElementById('miniPlay'),
    progressFill: document.getElementById('miniProgress'),
    totalSeconds: totalSeconds,
    startAt: Math.floor(totalSeconds * 0.08),
  });

  function buildFsContent() {
    var fs = document.getElementById('fsContent');
    var fc = document.getElementById('fsControls');
    if (isVideo) {
      fs.innerHTML = '<img class="fs-video" src="' + ep.thumbnail + '" alt="">';
      fc.innerHTML =
        '<div class="progress player-progress seek-bar" id="fsSeek"><span class="progress-fill" id="fsProgress"></span></div>' +
        '<div class="player-controls-row">' +
        '<button type="button" class="play-btn" id="fsPlay">▶</button></div>';
    } else {
      fs.innerHTML =
        '<img src="' + ep.thumbnail + '" alt="" style="max-width:280px;border-radius:16px">' +
        Castory.EpisodeDetail.waveformHtml(40, true);
      fc.innerHTML =
        '<div class="progress player-progress" id="fsSeek"><span class="progress-fill" id="fsProgress"></span></div>' +
        '<div class="player-controls-row">' +
        '<button type="button" class="ctrl-btn" id="fsBack">↺ 15</button>' +
        '<button type="button" class="play-btn" id="fsPlay">▶</button>' +
        '<button type="button" class="ctrl-btn" id="fsFwd">30 ↻</button></div>';
    }

    Castory.EpisodeDetail.bindPlayer({
      playBtn: document.getElementById('fsPlay'),
      progressFill: document.getElementById('fsProgress'),
      progressBar: document.getElementById('fsSeek'),
      skipBack: document.getElementById('fsBack'),
      skipForward: document.getElementById('fsFwd'),
      totalSeconds: totalSeconds,
    });
  }

  function openFullscreen() {
    buildFsContent();
    document.getElementById('fullscreenPlayer').classList.add('is-open');
    document.getElementById('fullscreenPlayer').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeFullscreen() {
    document.getElementById('fullscreenPlayer').classList.remove('is-open');
    document.getElementById('fullscreenPlayer').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('expandBtn').addEventListener('click', openFullscreen);
  document.getElementById('fsClose').addEventListener('click', closeFullscreen);

  var heroPlay = document.getElementById('heroPlay');
  if (heroPlay) {
    heroPlay.addEventListener('click', openFullscreen);
  }

  document.getElementById('backBtn').addEventListener('click', function () {
    if (document.referrer) history.back();
    else window.location.href = isVideo
      ? '../../trending-video/index.html'
      : '../../trending-audio/index.html';
  });

  var related = CASTORY_MOCK.getRelatedEpisodes(ep, 8);
  document.getElementById('relatedScroll').innerHTML = related.map(function (rel) {
    var url = './index.html?id=' + rel.id;
    return (
      '<a href="' + url + '" class="related-chip">' +
      '<img src="' + rel.thumbnail + '" alt="">' +
      '<div class="chip-body"><h4>' + rel.title + '</h4>' +
      '<p class="text-muted">' + rel.duration + '</p></div></a>'
    );
  }).join('');

  document.getElementById('shareBtn').addEventListener('click', function () {
    Castory.EpisodeDetail.showToast('Shared');
  });
  document.getElementById('bookmarkBtn').addEventListener('click', function () {
    Castory.EpisodeDetail.showToast('Bookmarked');
  });
})();
