<?php
/**
 * New Episodes — [castory_new_episodes]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

require CASTORY_PLUGIN_DIR . 'templates/partials/urls.php';
?>
<div class="castory-root">
<div class="app-three-col new-episodes-page" data-castory-app>

  <aside class="sidebar left-sidebar" id="sidebar">
    <button class="mobile-menu-btn" id="mobileMenu" type="button" aria-label="<?php esc_attr_e( 'Menu', 'castory' ); ?>">☰</button>
    <div class="logo"><span class="logo-icon">🎙</span><span>Castory</span></div>
    <div class="profile-card glass-card">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="" class="avatar">
      <div><h4>Jane Doe <span class="premium-badge"><?php esc_html_e( 'Premium', 'castory' ); ?></span></h4></div>
    </div>
    <nav class="nav-menu">
      <ul>
        <li><a href="<?php echo $u['home']; ?>"><?php esc_html_e( 'Home', 'castory' ); ?></a></li>
        <li><a href="<?php echo $u['trending_video']; ?>"><?php esc_html_e( 'Trending', 'castory' ); ?></a></li>
        <li><a href="<?php echo $u['new_episodes']; ?>" class="active"><?php esc_html_e( 'New Episodes', 'castory' ); ?></a></li>
        <li><a href="<?php echo $u['library']; ?>"><?php esc_html_e( 'Library', 'castory' ); ?></a></li>
        <li><a href="<?php echo $u['profile']; ?>"><?php esc_html_e( 'Profile', 'castory' ); ?></a></li>
      </ul>
    </nav>
    <div class="upgrade-card glass-card gradient-card">
      <h4><?php esc_html_e( 'Upgrade to Pro', 'castory' ); ?></h4>
      <p class="text-secondary"><?php esc_html_e( 'Unlock premium features', 'castory' ); ?></p>
      <button class="btn btn-primary" type="button" style="width:100%;margin-top:12px"><?php esc_html_e( 'Upgrade', 'castory' ); ?></button>
    </div>
    <div class="mini-player glass-card">
      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200" alt="" class="player-thumb">
      <div class="player-info"><p class="title">AI Revolution</p><p class="author text-muted">TechTalk</p></div>
      <button class="play-btn" type="button" aria-label="<?php esc_attr_e( 'Play', 'castory' ); ?>">▶</button>
    </div>
  </aside>

  <main class="main-content">
    <header class="topbar hide-mobile">
      <div class="search-box"><span>🔍</span><input type="text" placeholder="<?php esc_attr_e( 'Search episodes...', 'castory' ); ?>" id="searchInput" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>"></div>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>">🔔</button>
        <button class="create-btn" type="button">+ <?php esc_html_e( 'Create', 'castory' ); ?></button>
      </div>
    </header>

    <section class="hero">
      <div class="hero-text">
        <h1><?php esc_html_e( 'New Episodes', 'castory' ); ?></h1>
        <p class="text-secondary"><?php esc_html_e( 'Discover the latest podcasts across all topics.', 'castory' ); ?></p>
      </div>
      <div class="hero-illustration">
        <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400" alt="">
      </div>
    </section>

    <div class="filter-pills" id="filterPills">
      <button class="pill active" type="button" data-filter="all"><?php esc_html_e( 'All', 'castory' ); ?></button>
      <button class="pill" type="button" data-filter="video"><?php esc_html_e( 'Video', 'castory' ); ?></button>
      <button class="pill" type="button" data-filter="audio"><?php esc_html_e( 'Audio', 'castory' ); ?></button>
      <button class="pill" type="button" data-filter="Technology"><?php esc_html_e( 'Technology', 'castory' ); ?></button>
      <button class="pill" type="button" data-filter="Business"><?php esc_html_e( 'Business', 'castory' ); ?></button>
      <button class="pill" type="button" data-filter="AI">AI</button>
      <button class="pill" type="button" data-filter="Design"><?php esc_html_e( 'Design', 'castory' ); ?></button>
    </div>

    <section class="episode-list" id="episodeList"></section>
    <div class="pagination" id="pagination"></div>
  </main>

  <aside class="sidebar right-sidebar right-panel">
    <div class="filter-widget glass-card">
      <h4><?php esc_html_e( 'Filter Episodes', 'castory' ); ?></h4>
      <div style="margin-top:12px">
        <strong><?php esc_html_e( 'Type', 'castory' ); ?></strong>
        <label><input type="radio" name="type" value="all" checked> <?php esc_html_e( 'All', 'castory' ); ?></label>
        <label><input type="radio" name="type" value="audio"> <?php esc_html_e( 'Audio', 'castory' ); ?></label>
        <label><input type="radio" name="type" value="video"> <?php esc_html_e( 'Video', 'castory' ); ?></label>
      </div>
    </div>
    <div class="top-creators glass-card"><h4><?php esc_html_e( 'Top Creators', 'castory' ); ?></h4><div id="creatorsSide"></div></div>
    <div class="newsletter glass-card gradient-card">
      <h4><?php esc_html_e( 'Subscribe to our newsletter', 'castory' ); ?></h4>
      <input type="email" placeholder="<?php esc_attr_e( 'Enter your email', 'castory' ); ?>" id="newsletter-email">
      <button id="subscribe-btn" class="btn btn-primary" type="button" style="width:100%;margin-top:12px"><?php esc_html_e( 'Subscribe', 'castory' ); ?></button>
      <p id="newsletter-msg" class="text-muted" style="margin-top:8px"></p>
    </div>
  </aside>
</div>

<nav class="bottom-nav show-mobile">
  <a href="<?php echo $u['home']; ?>"><span>🏠</span><span><?php esc_html_e( 'Home', 'castory' ); ?></span></a>
  <a href="<?php echo $u['trending_video']; ?>"><span>🔥</span><span><?php esc_html_e( 'Trending', 'castory' ); ?></span></a>
  <a href="<?php echo $u['new_episodes']; ?>" class="active"><span>🎧</span><span><?php esc_html_e( 'New', 'castory' ); ?></span></a>
  <a href="<?php echo $u['profile']; ?>"><span>👤</span><span><?php esc_html_e( 'Profile', 'castory' ); ?></span></a>
</nav>
</div>
