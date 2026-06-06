<?php
/**
 * Explore — [castory_explore]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

$url_home    = esc_url( Templates::page_url( 'castory-home' ) );
$url_explore = esc_url( Templates::page_url( 'castory-explore' ) );
$url_trend_v = esc_url( Templates::page_url( 'castory-trending-video' ) );
$url_trend_a = esc_url( Templates::page_url( 'castory-trending-audio' ) );
$url_library = esc_url( Templates::page_url( 'castory-library' ) );
$url_profile = esc_url( Templates::page_url( 'castory-profile' ) );
?>
<div class="castory-root">
<div class="app-three-col explore-page" data-castory-app>

  <aside class="sidebar" id="sidebar">
    <button class="mobile-menu-btn" id="menuBtn" type="button" aria-label="<?php esc_attr_e( 'Open menu', 'castory' ); ?>">☰</button>
    <div class="logo"><i class="fa-solid fa-wave-square"></i><span>Castory</span></div>
    <nav class="nav-menu explore-nav">
      <a href="<?php echo $url_home; ?>" class="nav-item"><span>⌂</span> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $url_explore; ?>" class="nav-item active"><span>◈</span> <?php esc_html_e( 'Explore', 'castory' ); ?></a>
      <a href="<?php echo $url_trend_v; ?>" class="nav-item"><span>▶</span> <?php esc_html_e( 'Video', 'castory' ); ?></a>
      <a href="<?php echo $url_trend_a; ?>" class="nav-item"><span>🎧</span> <?php esc_html_e( 'Audio', 'castory' ); ?></a>
      <a href="<?php echo $url_library; ?>" class="nav-item"><span>📚</span> <?php esc_html_e( 'Library', 'castory' ); ?></a>
      <a href="<?php echo $url_profile; ?>" class="nav-item"><span>👤</span> <?php esc_html_e( 'Profile', 'castory' ); ?></a>
    </nav>
  </aside>

  <main class="main-content">
    <header class="topbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" id="searchInput" placeholder="<?php esc_attr_e( 'Search podcasts, creators, topics...', 'castory' ); ?>" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>">
      </div>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>"><i class="fa-solid fa-bell"></i><span class="badge">5</span></button>
        <div class="create-wrap">
          <button class="create-btn" id="createBtn" type="button"><i class="fa-solid fa-plus"></i> <?php esc_html_e( 'Create', 'castory' ); ?></button>
          <div class="create-menu" id="createMenu">
            <button type="button"><?php esc_html_e( 'New Episode', 'castory' ); ?></button>
          </div>
        </div>
      </div>
    </header>

    <nav class="breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'castory' ); ?>">
      <a href="<?php echo $url_home; ?>"><?php esc_html_e( 'Home', 'castory' ); ?></a> › <span><?php esc_html_e( 'Explore', 'castory' ); ?></span>
    </nav>

    <div class="filter-pills category-bar" id="categoryBar">
      <button class="pill" type="button" data-category="All"><?php esc_html_e( 'All', 'castory' ); ?></button>
      <button class="pill active" type="button" data-category="Technology"><?php esc_html_e( 'Technology', 'castory' ); ?></button>
      <button class="pill" type="button" data-category="Business"><?php esc_html_e( 'Business', 'castory' ); ?></button>
      <button class="pill" type="button" data-category="AI">AI</button>
    </div>

    <section class="explore-hero glass" id="exploreHero">
      <div class="explore-hero-content">
        <span class="featured-badge"><?php esc_html_e( 'FEATURED', 'castory' ); ?></span>
        <h1 id="heroTitle"><?php esc_html_e( 'Discover New Voices', 'castory' ); ?></h1>
        <p id="heroDesc"><?php esc_html_e( 'Explore emerging podcasters and fresh perspectives.', 'castory' ); ?></p>
        <div class="avatar-stack" id="heroAvatars"></div>
        <div class="indicators" id="heroDots"></div>
      </div>
      <div class="explore-hero-visual">
        <img id="heroImage" src="" alt="">
      </div>
    </section>

    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Trending Topics', 'castory' ); ?></h2></div><div class="topic-grid" id="topicGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Popular Creators', 'castory' ); ?></h2></div><div class="creators-scroll horizontal-scroll" id="creatorsScroll"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Popular Video Episodes', 'castory' ); ?></h2></div><div class="episode-grid" id="videoGrid"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Explore Audio Episodes', 'castory' ); ?></h2></div><div class="audio-explore-list" id="audioList"></div></section>
    <section class="section"><div class="section-header"><h2><?php esc_html_e( 'Recommended For You', 'castory' ); ?></h2></div><div class="recommended-grid" id="recommendedGrid"></div></section>
  </main>

  <aside class="right-panel">
    <div class="widget glass"><h3><?php esc_html_e( 'Top Creators', 'castory' ); ?></h3><div id="topCreatorsWidget"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Trending Topics', 'castory' ); ?></h3><div class="tag-cloud" id="tagCloud"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Discovery Stats', 'castory' ); ?></h3><div id="discoveryStats"></div></div>
    <div class="widget glass"><h3><?php esc_html_e( 'Most Followed Topics', 'castory' ); ?></h3><div id="followedTopics"></div></div>
  </aside>
</div>

<nav class="bottom-nav" id="bottomNav" aria-label="<?php esc_attr_e( 'Mobile navigation', 'castory' ); ?>"></nav>
<div class="sidebar-backdrop" id="sidebarBackdrop"></div>
</div>
