<?php
/**
 * Trending Audio — [castory_trending type="audio"]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-three-col trending-audio-page" data-castory-app>

  <button class="mobile-menu-btn" id="mobileMenu" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'castory' ); ?>">☰</button>

  <aside class="sidebar" id="sidebar">
    <div class="logo"><div class="wave-icon"><span></span><span></span><span></span><span></span></div><h2>Castory</h2></div>
    <nav class="nav-menu">
      <a href="<?php echo $u['home']; ?>" class="nav-item"><span>⌂</span> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $u['explore']; ?>" class="nav-item"><span>◈</span> <?php esc_html_e( 'Podcasts', 'castory' ); ?></a>
      <a href="<?php echo $u['trending_audio']; ?>" class="nav-item active"><span>🔥</span> <?php esc_html_e( 'Trending', 'castory' ); ?></a>
      <a href="<?php echo $u['library']; ?>" class="nav-item"><span>▣</span> <?php esc_html_e( 'Library', 'castory' ); ?></a>
      <a href="<?php echo $u['profile']; ?>" class="nav-item"><span>✦</span> <?php esc_html_e( 'Profile', 'castory' ); ?></a>
    </nav>
    <div class="profile-card glass">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="">
      <div><h4>Emma Watson</h4><p><?php esc_html_e( 'Premium Member', 'castory' ); ?></p></div>
      <span>›</span>
    </div>
    <div class="upgrade-card">
      <div class="crown">👑</div>
      <h3><?php esc_html_e( 'Unlock Premium', 'castory' ); ?></h3>
      <p><?php esc_html_e( 'Access exclusive podcasts, ad-free streaming and offline downloads.', 'castory' ); ?></p>
      <button type="button"><?php esc_html_e( 'Upgrade Now', 'castory' ); ?></button>
    </div>
    <div class="mini-player glass">
      <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500" alt="">
      <div class="mini-content"><h4>The AI Revolution</h4><p>Sarah Chen</p><div class="progress"><span></span></div></div>
      <button class="play-mini" type="button">▶</button>
    </div>
    <div class="player-controls">
      <button type="button">🔀</button><button type="button">⏮</button><button type="button" class="play-main">▶</button><button type="button">⏭</button><button type="button">🔁</button>
    </div>
  </aside>

  <main class="main-content">
    <header class="topbar">
      <div class="search-box">
        <span>🔍</span>
        <input type="text" id="searchInput" placeholder="<?php esc_attr_e( 'Search podcasts, episodes, creators...', 'castory' ); ?>" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>">
        <kbd>/</kbd>
      </div>
      <div class="header-actions">
        <button class="notification-btn" type="button">🔔 <span class="badge"></span></button>
        <button class="create-btn" type="button">+ <?php esc_html_e( 'Create', 'castory' ); ?></button>
      </div>
    </header>

    <div class="breadcrumb"><?php esc_html_e( 'Home', 'castory' ); ?> &gt; <?php esc_html_e( 'Trending', 'castory' ); ?> &gt; <?php esc_html_e( 'Audio Episodes', 'castory' ); ?></div>

    <section class="hero glass">
      <div class="hero-content">
        <span class="hero-tag"><?php esc_html_e( '#1 Podcast Discovery Hub', 'castory' ); ?></span>
        <h1><?php esc_html_e( 'Trending Audio Episodes', 'castory' ); ?></h1>
        <p><?php esc_html_e( 'Listen to the most popular and trending audio podcasts right now.', 'castory' ); ?></p>
      </div>
      <div class="hero-visual">
        <div class="waves"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div class="headphones">🎧</div>
      </div>
    </section>

    <section class="episodes-wrapper glass">
      <div class="section-top">
        <div class="filters">
          <button class="pill active" type="button"><?php esc_html_e( 'All', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Technology', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Business', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Health', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Mindset', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Marketing', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Crypto', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Design', 'castory' ); ?></button>
          <button class="pill" type="button"><?php esc_html_e( 'Stories', 'castory' ); ?></button>
        </div>
        <div class="sorting">
          <select id="sortSelect"><option><?php esc_html_e( 'Most Popular', 'castory' ); ?></option><option><?php esc_html_e( 'Latest', 'castory' ); ?></option></select>
          <button type="button">⚙</button>
        </div>
      </div>
      <div class="table-header">
        <span><?php esc_html_e( 'Episode', 'castory' ); ?></span>
        <span><?php esc_html_e( 'Podcast', 'castory' ); ?></span>
        <span><?php esc_html_e( 'Duration', 'castory' ); ?></span>
        <span><?php esc_html_e( 'Published', 'castory' ); ?></span>
        <span><?php esc_html_e( 'Actions', 'castory' ); ?></span>
      </div>
      <div class="episodes-list" id="episodesList"></div>
      <div class="pagination" id="pagination"></div>
    </section>
  </main>

  <aside class="right-sidebar">
    <div class="widget glass">
      <div class="widget-head"><h3><?php esc_html_e( 'Filter Episodes', 'castory' ); ?></h3><a href="#"><?php esc_html_e( 'Clear All', 'castory' ); ?></a></div>
      <h4><?php esc_html_e( 'Duration', 'castory' ); ?></h4>
      <label><input type="radio" checked> <?php esc_html_e( 'All Durations', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Under 20 min', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( '20–40 min', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( '40–60 min', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Over 60 min', 'castory' ); ?></label>
      <h4><?php esc_html_e( 'Published', 'castory' ); ?></h4>
      <label><input type="radio" checked> <?php esc_html_e( 'All Time', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Last 24 Hours', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Last 7 Days', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Last 30 Days', 'castory' ); ?></label>
      <label><input type="radio"> <?php esc_html_e( 'Last 3 Months', 'castory' ); ?></label>
    </div>
    <div class="widget glass">
      <div class="widget-head"><h3><?php esc_html_e( 'Top Audio Podcasts', 'castory' ); ?></h3><a href="#"><?php esc_html_e( 'View All', 'castory' ); ?></a></div>
      <div class="ranking"><span>1</span><img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300" alt=""><div><h5>The Daily Brief</h5><p>8.2M followers</p></div></div>
      <div class="ranking"><span>2</span><img src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300" alt=""><div><h5>Huberman Lab</h5><p>7.4M followers</p></div></div>
      <div class="ranking"><span>3</span><img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" alt=""><div><h5>On Purpose</h5><p>6.7M followers</p></div></div>
    </div>
    <div class="premium-cta">
      <h2><?php esc_html_e( 'Go Premium', 'castory' ); ?></h2>
      <p><?php esc_html_e( 'Unlock exclusive episodes, downloads and ad-free listening.', 'castory' ); ?></p>
      <button type="button"><?php esc_html_e( 'Upgrade Now', 'castory' ); ?></button>
    </div>
  </aside>
</div>
</div>
