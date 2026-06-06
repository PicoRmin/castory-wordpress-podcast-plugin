<?php
/**
 * Home page template — [castory_home]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

$url_home     = esc_url( Templates::page_url( 'castory-home' ) );
$url_explore  = esc_url( Templates::page_url( 'castory-explore' ) );
$url_trend_v  = esc_url( Templates::page_url( 'castory-trending-video' ) );
$url_trend_a  = esc_url( Templates::page_url( 'castory-trending-audio' ) );
$url_new      = esc_url( Templates::page_url( 'castory-new-episodes' ) );
$url_library  = esc_url( Templates::page_url( 'castory-library' ) );
$url_profile  = esc_url( Templates::page_url( 'castory-profile' ) );
?>
<div class="castory-root">
<div class="app-three-col castory-home" data-castory-app>

  <aside class="sidebar">
    <div class="logo">
      <i class="fa-solid fa-wave-square"></i>
      <span>Castory</span>
    </div>
    <nav class="nav">
      <a href="<?php echo $url_home; ?>" class="nav-link active"><i class="fa-solid fa-house"></i> <?php esc_html_e( 'Home', 'castory' ); ?></a>
      <a href="<?php echo $url_explore; ?>" class="nav-link"><i class="fa-solid fa-compass"></i> <?php esc_html_e( 'Explore', 'castory' ); ?></a>
      <a href="<?php echo $url_trend_v; ?>" class="nav-link"><i class="fa-solid fa-fire"></i> <?php esc_html_e( 'Trending', 'castory' ); ?></a>
      <a href="<?php echo $url_library; ?>" class="nav-link"><i class="fa-solid fa-bookmark"></i> <?php esc_html_e( 'Library', 'castory' ); ?></a>
      <a href="<?php echo $url_profile; ?>" class="nav-link"><i class="fa-solid fa-user"></i> <?php esc_html_e( 'Profile', 'castory' ); ?></a>
    </nav>
    <div class="profile-card glass">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="">
      <div>
        <h4>Emma Watson</h4>
        <p class="text-accent"><?php esc_html_e( 'Premium Member', 'castory' ); ?></p>
      </div>
    </div>
    <div class="upgrade-card glass">
      <div class="premium-icon"><i class="fa-solid fa-crown"></i></div>
      <h3><?php esc_html_e( 'Upgrade Pro', 'castory' ); ?></h3>
      <p class="text-secondary"><?php esc_html_e( 'Unlimited downloads and exclusive content.', 'castory' ); ?></p>
      <button class="btn btn-primary" type="button" style="width:100%;margin-top:12px"><?php esc_html_e( 'Upgrade', 'castory' ); ?></button>
    </div>
  </aside>

  <main class="content main-content">
    <header class="topbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="<?php esc_attr_e( 'Search podcasts...', 'castory' ); ?>" id="searchInput" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>">
      </div>
      <div class="header-actions">
        <button class="icon-btn" id="notificationBtn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>">
          <i class="fa-solid fa-bell"></i>
          <span class="badge">3</span>
        </button>
        <div class="create-wrap">
          <button class="create-btn" id="createBtn" type="button"><i class="fa-solid fa-plus"></i> <?php esc_html_e( 'Create', 'castory' ); ?></button>
          <div class="create-menu" id="createMenu">
            <button type="button"><?php esc_html_e( 'New Episode', 'castory' ); ?></button>
            <button type="button"><?php esc_html_e( 'New Podcast', 'castory' ); ?></button>
            <button type="button"><?php esc_html_e( 'Upload Video', 'castory' ); ?></button>
          </div>
        </div>
      </div>
    </header>

    <div class="chips">
      <button class="chip active" type="button" data-category="All"><?php esc_html_e( 'All', 'castory' ); ?></button>
      <button class="chip" type="button" data-category="Technology"><?php esc_html_e( 'Technology', 'castory' ); ?></button>
      <button class="chip" type="button" data-category="Business"><?php esc_html_e( 'Business', 'castory' ); ?></button>
      <button class="chip" type="button" data-category="AI">AI</button>
      <button class="chip" type="button" data-category="Marketing"><?php esc_html_e( 'Marketing', 'castory' ); ?></button>
      <button class="chip" type="button" data-category="Startups"><?php esc_html_e( 'Startups', 'castory' ); ?></button>
      <button class="chip" type="button" data-category="Design"><?php esc_html_e( 'Design', 'castory' ); ?></button>
    </div>

    <section class="hero glass" id="heroSection">
      <div class="hero-overlay"></div>
      <img id="heroImage" src="" alt="">
      <div class="hero-content">
        <span class="featured-badge"><?php esc_html_e( 'FEATURED', 'castory' ); ?></span>
        <span class="hero-category" id="heroCategory"><?php esc_html_e( 'Technology', 'castory' ); ?></span>
        <h1 id="heroTitle"><?php esc_html_e( 'Future of Artificial Intelligence', 'castory' ); ?></h1>
        <p id="heroDescription"><?php esc_html_e( 'Discover how AI is reshaping business, creativity and humanity.', 'castory' ); ?></p>
        <div class="hero-actions">
          <button class="primary-btn" type="button"><?php esc_html_e( 'Watch Now', 'castory' ); ?></button>
          <button class="secondary-btn save-later" id="saveLaterBtn" type="button"><?php esc_html_e( 'Save Later', 'castory' ); ?></button>
        </div>
        <div class="indicators" id="heroDots"></div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2><?php esc_html_e( 'Trending Video Episodes', 'castory' ); ?></h2>
        <a href="<?php echo $url_trend_v; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a>
      </div>
      <div class="episode-grid horizontal-scroll" id="videoGrid"></div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2><?php esc_html_e( 'Trending Audio Episodes', 'castory' ); ?></h2>
        <a href="<?php echo $url_trend_a; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a>
      </div>
      <div class="audio-grid grid-3" id="audioGrid"></div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2><?php esc_html_e( 'New Episodes', 'castory' ); ?></h2>
        <a href="<?php echo $url_new; ?>"><?php esc_html_e( 'View All', 'castory' ); ?></a>
      </div>
      <div class="new-grid" id="newGrid"></div>
    </section>
  </main>

  <aside class="rightbar right-panel">
    <div class="widget glass">
      <h3><?php esc_html_e( 'Top Creators', 'castory' ); ?></h3>
      <div id="creatorsWidget"></div>
    </div>
    <div class="widget glass">
      <h3><?php esc_html_e( 'Trending Topics', 'castory' ); ?></h3>
      <div id="topicsWidget"></div>
    </div>
  </aside>
</div>

<nav class="mobile-nav bottom-nav">
  <a href="<?php echo $url_home; ?>" class="active" aria-label="<?php esc_attr_e( 'Home', 'castory' ); ?>"><i class="fa-solid fa-house"></i></a>
  <a href="<?php echo $url_trend_v; ?>" aria-label="<?php esc_attr_e( 'Trending', 'castory' ); ?>"><i class="fa-solid fa-fire"></i></a>
  <a href="<?php echo $url_new; ?>" aria-label="<?php esc_attr_e( 'Episodes', 'castory' ); ?>"><i class="fa-solid fa-podcast"></i></a>
  <a href="<?php echo $url_profile; ?>" aria-label="<?php esc_attr_e( 'Profile', 'castory' ); ?>"><i class="fa-solid fa-user"></i></a>
</nav>

<button class="floating-btn" type="button" aria-label="<?php esc_attr_e( 'Create', 'castory' ); ?>"><i class="fa-solid fa-plus"></i></button>
</div>
