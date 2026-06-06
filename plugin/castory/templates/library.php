<?php
/**
 * Library — [castory_library]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-three-col library-page" data-castory-app>

  <aside class="sidebar" id="sidebar">
    <button class="mobile-menu-btn" id="menuBtn" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'castory' ); ?>">☰</button>
    <div class="logo"><i class="fa-solid fa-wave-square"></i><span>Castory</span></div>
    <nav class="nav-menu library-nav">
      <a href="<?php echo $u['home']; ?>" class="nav-item"><span>⌂</span> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $u['explore']; ?>" class="nav-item"><span>◈</span> <?php esc_html_e( 'Explore', 'castory' ); ?></a>
      <a href="<?php echo $u['trending_video']; ?>" class="nav-item"><span>▶</span> <?php esc_html_e( 'Video', 'castory' ); ?></a>
      <a href="<?php echo $u['trending_audio']; ?>" class="nav-item"><span>🎧</span> <?php esc_html_e( 'Audio', 'castory' ); ?></a>
      <a href="<?php echo $u['library']; ?>" class="nav-item active"><span>📚</span> <?php esc_html_e( 'My Library', 'castory' ); ?></a>
      <a href="<?php echo $u['profile']; ?>" class="nav-item"><span>👤</span> <?php esc_html_e( 'Profile', 'castory' ); ?></a>
    </nav>
    <div class="profile-card glass sidebar-profile">
      <img id="userAvatar" src="" alt="">
      <div>
        <h4 id="userName"></h4>
        <p class="text-accent" id="userBadge"></p>
        <p class="user-stats text-muted" id="userStats"></p>
      </div>
    </div>
    <div class="sidebar-footer">
      <button type="button" class="sidebar-action" id="settingsBtn"><i class="fa-solid fa-gear"></i> <?php esc_html_e( 'Settings', 'castory' ); ?></button>
      <button type="button" class="sidebar-action" id="sidebarNotifBtn"><i class="fa-solid fa-bell"></i> <?php esc_html_e( 'Notifications', 'castory' ); ?></button>
      <button type="button" class="sidebar-action sidebar-action--muted" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i> <?php esc_html_e( 'Logout', 'castory' ); ?></button>
    </div>
  </aside>

  <main class="main-content">
    <header class="topbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" id="searchInput" placeholder="<?php esc_attr_e( 'Search your library...', 'castory' ); ?>" aria-label="<?php esc_attr_e( 'Search library', 'castory' ); ?>">
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary btn-sm" type="button" id="createPlaylistBtn"><?php esc_html_e( 'Create Playlist', 'castory' ); ?></button>
        <button class="btn btn-secondary btn-sm hide-tablet" type="button" id="importBtn"><?php esc_html_e( 'Import Podcasts', 'castory' ); ?></button>
        <button class="btn btn-secondary btn-sm hide-tablet" type="button" id="downloadsBtn"><?php esc_html_e( 'Manage Downloads', 'castory' ); ?></button>
        <button class="icon-btn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>"><i class="fa-solid fa-bell"></i><span class="badge">2</span></button>
      </div>
    </header>

    <nav class="breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'castory' ); ?>">
      <a href="<?php echo $u['home']; ?>"><?php esc_html_e( 'Home', 'castory' ); ?></a> › <span><?php esc_html_e( 'Library', 'castory' ); ?></span>
    </nav>

    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Stats Overview', 'castory' ); ?></h2></div><div class="stats-grid" id="statsGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Continue Listening', 'castory' ); ?></h2><a href="<?php echo $u['trending_audio']; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a></div><div class="continue-scroll horizontal-scroll" id="continueListening"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Continue Watching', 'castory' ); ?></h2><a href="<?php echo $u['trending_video']; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a></div><div class="continue-scroll horizontal-scroll" id="continueWatching"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'My Playlists', 'castory' ); ?></h2><button class="text-link" type="button" id="newPlaylistBtn">+ <?php esc_html_e( 'New Playlist', 'castory' ); ?></button></div><div class="playlist-grid" id="playlistGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Downloaded Content', 'castory' ); ?></h2></div><div class="download-list" id="downloadList"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Saved For Later', 'castory' ); ?></h2></div><div class="saved-grid" id="savedGrid"></div></section>
  </main>

  <aside class="right-panel">
    <div class="widget glass"><h3><?php esc_html_e( 'Recent Activity', 'castory' ); ?></h3><div id="recentActivity"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Storage Usage', 'castory' ); ?></h3><div id="storageWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Watchlist Summary', 'castory' ); ?></h3><div id="watchlistWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Listening Insights', 'castory' ); ?></h3><div id="insightsWidget"></div></div>
  </aside>
</div>

<nav class="bottom-nav" id="bottomNav" aria-label="<?php esc_attr_e( 'Mobile navigation', 'castory' ); ?>"></nav>
<div class="sidebar-backdrop" id="sidebarBackdrop"></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<div class="playlist-modal" id="playlistModal" aria-hidden="true">
  <div class="playlist-modal-backdrop" id="playlistModalBackdrop"></div>
  <div class="playlist-modal-dialog glass" role="dialog" aria-labelledby="playlistModalTitle">
    <button type="button" class="modal-close" id="playlistModalClose" aria-label="<?php esc_attr_e( 'Close', 'castory' ); ?>">×</button>
    <h3 id="playlistModalTitle"><?php esc_html_e( 'New Playlist', 'castory' ); ?></h3>
    <form id="playlistForm">
      <div class="form-field">
        <label for="playlistNameInput"><?php esc_html_e( 'Name', 'castory' ); ?></label>
        <input type="text" id="playlistNameInput" maxlength="80" required placeholder="<?php esc_attr_e( 'My playlist', 'castory' ); ?>">
      </div>
      <div id="playlistEpisodePicker" class="playlist-episode-picker"></div>
      <div class="playlist-modal-actions">
        <button type="button" class="btn btn-secondary" id="playlistModalCancel"><?php esc_html_e( 'Cancel', 'castory' ); ?></button>
        <button type="submit" class="btn btn-primary" id="playlistModalSave"><?php esc_html_e( 'Save', 'castory' ); ?></button>
      </div>
    </form>
  </div>
</div>
</div>
