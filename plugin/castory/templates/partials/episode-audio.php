<?php
/**
 * Episode detail — audio layout partial.
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-three-col detail-layout episode-audio-page" data-castory-app>

  <aside class="sidebar" id="sidebar">
    <button class="mobile-menu-btn" id="menuBtn" type="button" aria-label="<?php esc_attr_e( 'Menu', 'castory' ); ?>">☰</button>
    <div class="logo"><i class="fa-solid fa-wave-square"></i><span>Castory</span></div>
    <nav class="nav-menu detail-nav">
      <a href="<?php echo $u['home']; ?>" class="nav-item"><span>⌂</span> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $u['explore']; ?>" class="nav-item"><span>◈</span> <?php esc_html_e( 'Explore', 'castory' ); ?></a>
      <a href="<?php echo $u['trending_audio']; ?>" class="nav-item"><span>🎧</span> <?php esc_html_e( 'Trending Audio', 'castory' ); ?></a>
      <a href="<?php echo $u['library']; ?>" class="nav-item"><span>📚</span> <?php esc_html_e( 'Library', 'castory' ); ?></a>
    </nav>
    <a href="<?php echo $u['home']; ?>" class="btn btn-secondary back-link"><i class="fa-solid fa-arrow-left"></i> <?php esc_html_e( 'Back', 'castory' ); ?></a>
  </aside>

  <main class="main-content">
    <nav class="breadcrumb" id="breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'castory' ); ?>"></nav>

    <section class="audio-player glass" id="playerSection">
      <div class="player-cover"><img id="coverArt" src="" alt=""></div>
      <div class="player-body">
        <div id="waveformWrap"></div>
        <div class="progress player-progress seek-bar" id="seekBar"><span class="progress-fill" id="progressFill"></span></div>
        <div class="time-row"><span id="currentTime">0:00</span><span id="totalTime">0:00</span></div>
        <div class="player-controls-row">
          <button type="button" class="ctrl-btn" id="skipBack" aria-label="<?php esc_attr_e( 'Skip back 15 seconds', 'castory' ); ?>">↺ 15</button>
          <button type="button" class="ctrl-btn ctrl-btn--main play-btn" id="playBtn" aria-label="<?php esc_attr_e( 'Play', 'castory' ); ?>">▶</button>
          <button type="button" class="ctrl-btn" id="skipForward" aria-label="<?php esc_attr_e( 'Skip forward 30 seconds', 'castory' ); ?>">30 ↻</button>
          <select id="speedSelect" class="speed-select" aria-label="<?php esc_attr_e( 'Playback speed', 'castory' ); ?>">
            <option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option>
          </select>
        </div>
      </div>
    </section>

    <section class="episode-meta glass">
      <h1 id="episodeTitle"></h1>
      <p class="podcast-name" id="podcastName"></p>
      <div class="meta-tags" id="metaTags"></div>
      <p class="episode-desc" id="episodeDesc"></p>
      <div class="action-row">
        <button type="button" class="btn btn-secondary" id="shareBtn"><i class="fa-solid fa-share-nodes"></i> <?php esc_html_e( 'Share', 'castory' ); ?></button>
        <button type="button" class="btn btn-secondary" id="bookmarkBtn"><i class="fa-regular fa-bookmark"></i> <?php esc_html_e( 'Bookmark', 'castory' ); ?></button>
        <button type="button" class="btn btn-secondary" id="downloadBtn"><i class="fa-solid fa-download"></i> <?php esc_html_e( 'Download', 'castory' ); ?></button>
      </div>
    </section>

    <section class="creator-card glass" id="creatorCard"></section>

    <section class="section">
      <div class="section-header"><h2><?php esc_html_e( 'Comments', 'castory' ); ?></h2><span class="text-muted" id="commentCount"></span></div>
      <div id="commentsList"></div>
    </section>
  </main>

  <aside class="right-panel">
    <div class="widget glass"><h3><?php esc_html_e( 'Related Episodes', 'castory' ); ?></h3><div class="related-list" id="relatedList"></div></div>
  </aside>
</div>

<div class="detail-toast" id="detailToast" role="status"></div>
</div>
