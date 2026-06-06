(function () {
  Castory.whenReady(function () {
  var ep = Castory.EpisodeDetail.getFromQuery(14, 'audio');
  if (!ep) return;

  document.title = ep.title + ' | Castory';

  document.getElementById('breadcrumb').innerHTML =
    '<a href="' + (CASTORY_MOCK.routes.home || '#') + '">Home</a> › ' +
    '<a href="' + (CASTORY_MOCK.routes.trendingAudio || '#') + '">' + ep.podcast + '</a> › ' +
    '<span>' + ep.title + '</span>';

  document.getElementById('coverArt').src = ep.thumbnail;
  document.getElementById('coverArt').alt = ep.title;
  document.getElementById('waveformWrap').innerHTML = Castory.EpisodeDetail.waveformHtml(48, true);
  document.getElementById('episodeTitle').textContent = ep.title;
  document.getElementById('podcastName').textContent = ep.podcast + ' · ' + ep.creator;
  document.getElementById('episodeDesc').textContent = ep.description;
  document.getElementById('metaTags').innerHTML =
    '<span class="meta-tag">' + ep.category + '</span>' +
    '<span class="meta-tag">' + ep.duration + '</span>' +
    '<span class="meta-tag">' + ep.views + ' views</span>' +
    '<span class="meta-tag">' + ep.date + '</span>';

  var totalSeconds = Castory.EpisodeDetail.parseDuration(ep.duration);
  document.getElementById('totalTime').textContent = Castory.EpisodeDetail.formatTime(totalSeconds);

  document.getElementById('mobileLink').href = '../mobile/index.html?id=' + ep.id;

  Castory.EpisodeDetail.bindPlayer({
    playBtn: document.getElementById('playBtn'),
    progressFill: document.getElementById('progressFill'),
    progressBar: document.getElementById('seekBar'),
    currentTimeEl: document.getElementById('currentTime'),
    skipBack: document.getElementById('skipBack'),
    skipForward: document.getElementById('skipForward'),
    waveform: document.querySelector('.waveform'),
    totalSeconds: totalSeconds,
    startAt: Math.floor(totalSeconds * 0.12),
  });

  var creator = CASTORY_MOCK.creators[1] || { name: ep.creator, avatar: ep.thumbnail, followers: '950K' };
  document.getElementById('creatorCard').innerHTML =
    '<img src="' + creator.avatar + '" alt="' + creator.name + '">' +
    '<div class="info"><h3>' + ep.creator + '</h3>' +
    '<p class="text-muted">' + creator.followers + ' followers</p></div>' +
    '<button type="button" class="follow-btn" id="followBtn">Follow</button>';

  document.getElementById('followBtn').addEventListener('click', function () {
    var btn = document.getElementById('followBtn');
    var following = btn.classList.toggle('following');
    btn.textContent = following ? 'Following' : 'Follow';
  });

  document.getElementById('commentsList').innerHTML = ep.comments.map(function (c) {
    return (
      '<article class="comment-card glass">' +
      '<img src="' + c.avatar + '" alt="">' +
      '<div class="comment-body"><strong>' + c.author + '</strong>' +
      '<p>' + c.text + '</p>' +
      '<p class="comment-meta">' + c.timeAgo + ' · ' + c.likes + ' likes</p></div></article>'
    );
  }).join('');
  document.getElementById('commentCount').textContent = ep.comments.length + ' comments';

  Castory.EpisodeDetail.renderRelated(document.getElementById('relatedList'), ep, '../../');

  document.getElementById('shareBtn').addEventListener('click', function () {
    Castory.EpisodeDetail.showToast('Link copied to clipboard');
  });
  document.getElementById('bookmarkBtn').addEventListener('click', function () {
    document.getElementById('bookmarkBtn').classList.toggle('active');
    Castory.EpisodeDetail.showToast('Saved to library');
  });
  document.getElementById('downloadBtn').addEventListener('click', function () {
    Castory.EpisodeDetail.showToast('Download started');
  });

  Castory.Sidebar.init({ menuBtn: document.getElementById('menuBtn'), sidebar: document.getElementById('sidebar') });
  });
})();
