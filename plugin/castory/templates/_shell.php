<?php
/**
 * Generic Castory view shell — used until full template port.
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

/** @var string $view_id DOM / CSS hook */
/** @var string $view_title Heading */
$view_id    = $view_id ?? 'castory-view';
$view_title = $view_title ?? __( 'Castory', 'castory' );
?>
<div class="castory-root">
  <div class="castory-app-shell app-three-col <?php echo esc_attr( $view_id ); ?>" data-castory-app>
    <main class="main-content" style="padding: var(--space-8);">
      <header class="topbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" id="searchInput" placeholder="<?php esc_attr_e( 'Search...', 'castory' ); ?>" aria-label="<?php esc_attr_e( 'Search', 'castory' ); ?>">
        </div>
        <div class="header-actions">
          <button class="icon-btn" type="button" aria-label="<?php esc_attr_e( 'Notifications', 'castory' ); ?>">
            <i class="fa-solid fa-bell"></i>
          </button>
        </div>
      </header>
      <h1 class="text-page-title"><?php echo esc_html( $view_title ); ?></h1>
      <p class="text-secondary"><?php esc_html_e( 'Castory WordPress plugin — UI rendering with mock data. Full template port continues in Phase 8.4.', 'castory' ); ?></p>
      <div id="castoryViewMount" data-castory-view="<?php echo esc_attr( $view_id ); ?>"></div>
    </main>
  </div>
</div>
