<?php
/**
 * Episode detail — [castory_episode id="123"]
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

/** @var int $episode_id */
$episode_id = isset( $episode_id ) ? absint( $episode_id ) : 0;
if ( ! $episode_id && isset( $_GET['id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$episode_id = absint( $_GET['id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
}
?>
<div class="castory-root">
  <div class="castory-episode-detail" data-castory-app data-episode-id="<?php echo esc_attr( (string) $episode_id ); ?>">
    <main class="main-content" style="padding: var(--space-8);">
      <nav class="breadcrumb" id="breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'castory' ); ?>"></nav>
      <div id="episodeDetailMount" data-episode-id="<?php echo esc_attr( (string) $episode_id ); ?>"></div>
      <p class="text-muted"><?php esc_html_e( 'Episode detail template — full UI port in Phase 8.4.', 'castory' ); ?></p>
    </main>
  </div>
</div>
