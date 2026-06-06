<?php
/**
 * Profile — [castory_profile]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-three-col profile-page" data-castory-app>

  <aside class="sidebar" id="sidebar">
    <button class="mobile-menu-btn" id="menuBtn" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'castory' ); ?>">☰</button>
    <div class="logo"><i class="fa-solid fa-wave-square"></i><span>Castory</span></div>
    <nav class="nav-menu profile-nav">
      <a href="<?php echo $u['home']; ?>" class="nav-item"><span>⌂</span> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $u['explore']; ?>" class="nav-item"><span>◈</span> <?php esc_html_e( 'Explore', 'castory' ); ?></a>
      <a href="<?php echo $u['library']; ?>" class="nav-item"><span>📚</span> <?php esc_html_e( 'Library', 'castory' ); ?></a>
      <a href="<?php echo $u['profile']; ?>" class="nav-item active"><span>👤</span> <?php esc_html_e( 'Profile', 'castory' ); ?></a>
    </nav>
    <div class="profile-card glass sidebar-profile">
      <img id="sidebarAvatar" src="" alt="">
      <div><h4 id="sidebarName"></h4><p class="text-accent" id="sidebarBadge"></p></div>
    </div>
    <div class="upgrade-card glass sidebar-premium">
      <i class="fa-solid fa-crown premium-icon"></i>
      <h4><?php esc_html_e( 'Premium Active', 'castory' ); ?></h4>
      <p class="text-muted"><?php esc_html_e( 'Unlimited access enabled', 'castory' ); ?></p>
    </div>
  </aside>

  <main class="main-content profile-main">
    <section class="profile-hero">
      <div class="cover-banner"><img id="coverImage" src="" alt=""><div class="cover-overlay"></div></div>
      <div class="profile-hero-body">
        <div class="avatar-ring"><img id="profileAvatar" src="" alt=""></div>
        <div class="profile-identity">
          <h1 id="profileName"></h1>
          <p class="profile-username" id="profileUsername"></p>
          <p class="profile-bio" id="profileBio"></p>
          <div class="profile-meta">
            <span id="profileLocation"><i class="fa-solid fa-location-dot"></i></span>
            <a id="profileWebsite" href="#" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i></a>
            <span id="profileJoin"><i class="fa-solid fa-calendar"></i></span>
          </div>
          <div class="profile-actions">
            <button class="btn btn-primary" type="button" id="editProfileBtn"><?php esc_html_e( 'Edit Profile', 'castory' ); ?></button>
            <button class="btn btn-secondary" type="button" id="shareProfileBtn"><?php esc_html_e( 'Share Profile', 'castory' ); ?></button>
            <button class="btn btn-secondary icon-only" type="button" id="settingsProfileBtn" aria-label="<?php esc_attr_e( 'Settings', 'castory' ); ?>"><i class="fa-solid fa-gear"></i></button>
          </div>
        </div>
      </div>
    </section>

    <div class="stats-row" id="statsRow"></div>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Achievements', 'castory' ); ?></h2></div><div class="achievements-grid" id="achievementsGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Listening Activity', 'castory' ); ?></h2></div><div class="timeline" id="listeningTimeline"></div></section>
    <section class="section">
      <div class="section-header"><h2><?php esc_html_e( 'Favorite Creators', 'castory' ); ?></h2>
        <div class="carousel-controls">
          <button type="button" class="carousel-btn" id="creatorsPrev" aria-label="<?php esc_attr_e( 'Previous', 'castory' ); ?>">‹</button>
          <button type="button" class="carousel-btn" id="creatorsNext" aria-label="<?php esc_attr_e( 'Next', 'castory' ); ?>">›</button>
        </div>
      </div>
      <div class="carousel-wrap"><div class="creators-carousel horizontal-scroll" id="creatorsCarousel"></div></div>
    </section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'My Playlists', 'castory' ); ?></h2><a href="<?php echo $u['library']; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a></div><div class="playlist-grid" id="playlistGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Saved Episodes', 'castory' ); ?></h2></div><div class="saved-scroll horizontal-scroll" id="savedEpisodes"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Watch History', 'castory' ); ?></h2></div><div class="history-grid" id="watchHistory"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Top Categories', 'castory' ); ?></h2></div><div class="categories-grid" id="topCategories"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Recently Completed', 'castory' ); ?></h2></div><div class="completed-list" id="recentlyCompleted"></div></section>
  </main>

  <aside class="right-panel">
    <div class="widget glass"><h3><?php esc_html_e( 'Profile Insights', 'castory' ); ?></h3><div id="insightsWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Following Summary', 'castory' ); ?></h3><div id="followingWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Account Status', 'castory' ); ?></h3><div id="accountWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Storage Usage', 'castory' ); ?></h3><div id="storageWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Listening Activity', 'castory' ); ?></h3><div id="heatmapWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Top Interests', 'castory' ); ?></h3><div id="interestsWidget"></div></div>
  </aside>
</div>

<nav class="bottom-nav" id="bottomNav" aria-label="<?php esc_attr_e( 'Mobile navigation', 'castory' ); ?>"></nav>
<div class="sidebar-backdrop" id="sidebarBackdrop"></div>

<div class="modal" id="actionModal" aria-hidden="true">
  <div class="modal-backdrop" id="modalBackdrop"></div>
  <div class="modal-dialog glass" role="dialog" aria-labelledby="modalTitle">
    <button class="modal-close" type="button" id="modalClose" aria-label="<?php esc_attr_e( 'Close', 'castory' ); ?>">×</button>
    <h3 id="modalTitle"><?php esc_html_e( 'Action', 'castory' ); ?></h3>
    <p id="modalBody" class="text-secondary"><?php esc_html_e( 'This feature will be available in the WordPress plugin.', 'castory' ); ?></p>
    <button class="btn btn-primary" type="button" id="modalOk" style="margin-top:16px"><?php esc_html_e( 'Got it', 'castory' ); ?></button>
  </div>
</div>
</div>
