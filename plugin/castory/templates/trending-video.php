<?php
/**
 * Trending Video — [castory_trending type="video"]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-layout trending-video-page" data-castory-app>

  <aside class="sidebar">
    <div class="logo"><div class="logo-icon">🎙</div><span>Castory</span></div>
    <nav class="sidebar-nav">
      <a href="<?php echo $u['home']; ?>" class="nav-item"><span>🏠</span><span><?php esc_html_e( 'Home', 'castory' ); ?></span></a>
      <a href="<?php echo $u['trending_video']; ?>" class="nav-item active"><span>🔥</span><span><?php esc_html_e( 'Trending', 'castory' ); ?></span></a>
      <a href="<?php echo $u['library']; ?>" class="nav-item"><span>📚</span><span><?php esc_html_e( 'Library', 'castory' ); ?></span></a>
      <a href="<?php echo $u['new_episodes']; ?>" class="nav-item"><span>🎧</span><span><?php esc_html_e( 'New Episodes', 'castory' ); ?></span></a>
      <a href="<?php echo $u['profile']; ?>" class="nav-item"><span>👤</span><span><?php esc_html_e( 'Profile', 'castory' ); ?></span></a>
    </nav>
    <div class="sidebar-bottom">
      <div class="profile-card">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="">
        <div><h4>Emma Watson</h4><p><?php esc_html_e( 'Premium Member', 'castory' ); ?></p></div>
        <span>›</span>
      </div>
      <div class="upgrade-card">
        <div class="upgrade-icon">👑</div>
        <h3><?php esc_html_e( 'Upgrade to Premium', 'castory' ); ?></h3>
        <p><?php esc_html_e( 'Unlock exclusive content, ad-free experience and more.', 'castory' ); ?></p>
        <button class="upgrade-btn" type="button"><?php esc_html_e( 'Upgrade Now', 'castory' ); ?></button>
      </div>
    </div>
    <div class="mini-player">
      <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600" alt="">
      <div class="player-info">
        <h5>AI Revolution</h5><p>Lex Friedman</p>
        <div class="player-progress"><div class="player-progress-fill"></div></div>
      </div>
      <div class="player-controls">
        <button type="button">⏮</button>
        <button type="button" class="play-btn">▶</button>
        <button type="button">⏭</button>
      </div>
    </div>
  </aside>

  <main class="main-content">
    <header class="mobile-header hide-desktop">
      <button type="button">←</button>
      <div><button type="button">📺</button><button type="button">🔍</button></div>
    </header>

    <header class="header hide-mobile">
      <div class="search-box">
        <span>🔍</span>
        <input type="text" id="searchInput" placeholder="<?php esc_attr_e( 'Search podcasts, episodes, creators...', 'castory' ); ?>" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>">
      </div>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>">🔔</button>
        <button class="create-btn" type="button">+ <?php esc_html_e( 'Create', 'castory' ); ?></button>
      </div>
    </header>

    <div class="breadcrumb hide-mobile">
      <?php esc_html_e( 'Home', 'castory' ); ?> <span>›</span> <?php esc_html_e( 'Trending', 'castory' ); ?> <span>›</span> <?php esc_html_e( 'Video Episodes', 'castory' ); ?>
    </div>

    <section class="hero">
      <div class="hero-content">
        <span class="hero-tag"><?php esc_html_e( 'Trending Now', 'castory' ); ?></span>
        <h1><?php esc_html_e( 'Trending Video Episodes', 'castory' ); ?></h1>
        <p><?php esc_html_e( 'Watch the most popular and trending video podcasts right now.', 'castory' ); ?></p>
      </div>
      <div class="hero-visual">
        <div class="hero-glow"></div>
        <div class="video-card"><div class="video-screen">▶</div></div>
        <div class="floating floating-1"></div>
        <div class="floating floating-2"></div>
      </div>
    </section>

    <section class="mobile-page-title hide-desktop">
      <h1><?php esc_html_e( 'Trending Video Episodes', 'castory' ); ?></h1>
      <p><?php esc_html_e( 'Discover the most popular video podcasts right now.', 'castory' ); ?></p>
    </section>

    <section class="filters">
      <div class="category-pills" id="categoryPills"></div>
      <div class="filter-actions">
        <select id="sortSelect">
          <option><?php esc_html_e( 'Most Popular', 'castory' ); ?></option>
          <option><?php esc_html_e( 'Newest', 'castory' ); ?></option>
          <option><?php esc_html_e( 'Oldest', 'castory' ); ?></option>
        </select>
        <button class="filter-btn" type="button">⚙ <?php esc_html_e( 'Filters', 'castory' ); ?></button>
      </div>
    </section>

    <section class="mobile-sort hide-desktop">
      <select id="mobileSort">
        <option><?php esc_html_e( 'Most Popular', 'castory' ); ?></option>
        <option><?php esc_html_e( 'Newest', 'castory' ); ?></option>
      </select>
      <span id="episodeCount">0 <?php esc_html_e( 'Episodes', 'castory' ); ?></span>
    </section>

    <section class="episode-grid" id="episodeGrid"></section>
    <div class="pagination" id="pagination"></div>
  </main>
</div>

<nav class="bottom-nav">
  <a href="<?php echo $u['home']; ?>"><span>🏠</span><span><?php esc_html_e( 'Home', 'castory' ); ?></span></a>
  <a href="<?php echo $u['trending_video']; ?>" class="active"><span>🔥</span><span><?php esc_html_e( 'Trending', 'castory' ); ?></span></a>
  <a href="<?php echo $u['library']; ?>"><span>📚</span><span><?php esc_html_e( 'Library', 'castory' ); ?></span></a>
  <a href="<?php echo $u['profile']; ?>"><span>👤</span><span><?php esc_html_e( 'Profile', 'castory' ); ?></span></a>
</nav>
</div>
