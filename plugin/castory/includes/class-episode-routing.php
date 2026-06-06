<?php
/**
 * Native episode permalinks (/episode/{slug}/) and legacy URL redirects.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Routes single castory_episode CPT to Castory UI templates.
 */
class Episode_Routing {

	public function register(): void {
		add_filter( 'single_template', array( $this, 'single_template' ) );
		add_action( 'template_redirect', array( $this, 'redirect_legacy_episode_url' ) );
	}

	/**
	 * @param string $template Theme template path.
	 */
	public function single_template( string $template ): string {
		if ( ! is_singular( 'castory_episode' ) ) {
			return $template;
		}

		$file = CASTORY_PLUGIN_DIR . 'templates/single-episode.php';
		return file_exists( $file ) ? $file : $template;
	}

	/**
	 * Redirect /castory-episode/?id=123 → /episode/slug/.
	 */
	public function redirect_legacy_episode_url(): void {
		if ( ! is_singular( 'page' ) || empty( $_GET['id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}

		$page_ids = get_option( 'castory_page_ids', array() );
		if ( ! is_array( $page_ids ) || empty( $page_ids['castory-episode'] ) ) {
			return;
		}

		if ( get_queried_object_id() !== (int) $page_ids['castory-episode'] ) {
			return;
		}

		$episode_id = absint( $_GET['id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! $episode_id || 'castory_episode' !== get_post_type( $episode_id ) ) {
			return;
		}

		$permalink = get_permalink( $episode_id );
		if ( ! is_string( $permalink ) || '' === $permalink ) {
			return;
		}

		wp_safe_redirect( $permalink, 301 );
		exit;
	}
}
