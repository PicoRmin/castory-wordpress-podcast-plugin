<?php
/**
 * Episode detail — video layout partial.
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="detail-shell episode-video-page" data-castory-app>

  <header class="detail-header">
    <a href="<?php echo $u['trending_video']; ?>" class="back-btn"><i class="fa-solid fa-arrow-left"></i> <?php esc_html_e( 'Back', 'castory' ); ?></a>
    <nav class="breadcrumb" id="breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'castory' ); ?>"></nav>
    <div class="header-actions">
      <button type="button" class="icon-btn" id="shareBtn" aria-label="<?php esc_attr_e( 'Share', 'castory' ); ?>"><i class="fa-solid fa-share-nodes"></i></button>
      <button type="button" class="icon-btn" id="bookmarkBtn" aria-label="<?php esc_attr_e( 'Bookmark', 'castory' ); ?>"><i class="fa-regular fa-bookmark"></i></button>
    </div>
  </header>

  <section class="video-stage glass" id="videoStage">
    <img id="videoPoster" src="" alt="">
    <div class="video-overlay" id="videoOverlay">
      <button type="button" class="play-large" id="videoPlayBtn" aria-label="<?php esc_attr_e( 'Play video', 'castory' ); ?>">▶</button>
    </div>
    <div class="video-controls">
      <div class="progress player-progress seek-bar" id="seekBar"><span class="progress-fill" id="progressFill"></span></div>
      <div class="controls-bottom">
        <button type="button" class="ctrl-sm" id="videoPlaySmall">▶</button>
        <span id="currentTime">0:00</span><span class="sep">/</span><span id="totalTime">0:00</span>
        <span class="spacer"></span>
        <button type="button" class="ctrl-sm" id="volumeBtn" aria-label="<?php esc_attr_e( 'Volume', 'castory' ); ?>"><i class="fa-solid fa-volume-high"></i></button>
        <button type="button" class="ctrl-sm" id="fullscreenBtn" aria-label="<?php esc_attr_e( 'Fullscreen', 'castory' ); ?>"><i class="fa-solid fa-expand"></i></button>
      </div>
    </div>
  </section>

  <div class="detail-grid">
    <main class="detail-main">
      <section class="episode-header">
        <h1 id="episodeTitle"></h1>
        <div class="creator-row" id="creatorRow"></div>
        <div class="meta-tags" id="metaTags"></div>
        <p class="episode-desc" id="episodeDesc"></p>
        <button type="button" class="btn btn-secondary" id="downloadBtn"><i class="fa-solid fa-download"></i> <?php esc_html_e( 'Download', 'castory' ); ?></button>
      </section>
      <section class="section"><h2><?php esc_html_e( 'Chapters', 'castory' ); ?></h2><div class="chapters-list" id="chaptersList"></div></section>
      <section class="section transcript-section">
        <button type="button" class="transcript-toggle" id="transcriptToggle" aria-expanded="false">
          <h2><?php esc_html_e( 'Transcript', 'castory' ); ?></h2><i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="transcript-body" id="transcriptBody" hidden></div>
      </section>
    </main>
    <aside class="detail-aside">
      <h2><?php esc_html_e( 'Related Videos', 'castory' ); ?></h2>
      <div class="related-grid" id="relatedGrid"></div>
    </aside>
  </div>
</div>

<div class="detail-toast" id="detailToast" role="status"></div>
</div>
