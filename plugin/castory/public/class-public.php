<?php
/**
 * Frontend assets and body classes.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Public-facing functionality.
 */
class Public_Frontend {

	/** @var array<string, true> Views enqueued on current request. */
	public static array $active_views = array();

	public function enqueue_assets(): void {
		$this->detect_shortcodes_in_content();

		if ( empty( self::$active_views ) && ! $this->is_castory_context() ) {
			return;
		}

		wp_enqueue_style(
			'castory-fonts',
			'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
			array(),
			null
		);

		wp_enqueue_style(
			'castory-fontawesome',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
			array(),
			'6.5.1'
		);

		wp_enqueue_style(
			'castory-design-system',
			CASTORY_PLUGIN_URL . 'public/css/castory.css',
			array( 'castory-fonts' ),
			CASTORY_VERSION
		);

		$this->enqueue_core_scripts();

		foreach ( array_keys( self::$active_views ) as $view ) {
			$this->enqueue_view_assets( $view );
		}

		wp_localize_script(
			'castory-mock-data',
			'castoryConfig',
			array(
				'restUrl'   => esc_url_raw( rest_url( 'castory/v1/' ) ),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'pluginUrl' => CASTORY_PLUGIN_URL,
				'pageUrls'  => $this->get_page_urls(),
				'isLoggedIn'=> is_user_logged_in(),
			)
		);
	}

	private function is_castory_context(): bool {
		if ( is_singular( array( 'castory_episode', 'castory_podcast' ) ) ) {
			return true;
		}
		if ( is_post_type_archive( array( 'castory_episode', 'castory_podcast' ) ) ) {
			return true;
		}
		return false;
	}

	private function enqueue_core_scripts(): void {
		$deps = array();
		$base = CASTORY_PLUGIN_URL . 'public/js/';

		wp_enqueue_script( 'castory-utils', $base . 'utils.js', array(), CASTORY_VERSION, true );
		$deps[] = 'castory-utils';

		wp_enqueue_script( 'castory-storage', $base . 'storage.js', $deps, CASTORY_VERSION, true );
		$deps[] = 'castory-storage';

		wp_enqueue_script( 'castory-mock-data', $base . 'mock-data.js', $deps, CASTORY_VERSION, true );
		$deps[] = 'castory-mock-data';

		wp_enqueue_script( 'castory-wp-bridge', $base . 'castory-wp-bridge.js', array( 'castory-mock-data' ), CASTORY_VERSION, true );
		$deps[] = 'castory-wp-bridge';

		wp_enqueue_script( 'castory-nav', $base . 'components/nav.js', $deps, CASTORY_VERSION, true );
		wp_enqueue_script( 'castory-global-player', $base . 'components/global-player.js', $deps, CASTORY_VERSION, true );
		wp_enqueue_script( 'castory-notifications', $base . 'components/notifications.js', $deps, CASTORY_VERSION, true );
		wp_enqueue_script( 'castory-search', $base . 'components/search.js', $deps, CASTORY_VERSION, true );
		$deps = array_merge( $deps, array( 'castory-nav', 'castory-global-player', 'castory-notifications', 'castory-search' ) );

		wp_enqueue_script( 'castory-bootstrap', $base . 'castory.js', $deps, CASTORY_VERSION, true );
	}

	private function enqueue_view_assets( string $view ): void {
		$base = CASTORY_PLUGIN_URL . 'public/js/pages/';
		$css  = CASTORY_PLUGIN_URL . 'public/css/pages/';

		$map = array(
			'home'           => array( 'js' => 'home.js', 'css' => 'home.css' ),
			'explore'        => array( 'js' => 'explore.js', 'css' => 'explore.css' ),
			'library'        => array( 'js' => 'library.js', 'css' => 'library.css' ),
			'profile'        => array( 'js' => 'profile.js', 'css' => 'profile.css' ),
			'trending-video' => array( 'js' => 'trending-video.js', 'css' => 'trending-video.css' ),
			'trending-audio' => array( 'js' => 'trending-audio.js', 'css' => 'trending-audio.css' ),
			'new-episodes'   => array( 'js' => 'new-episodes.js', 'css' => 'new-episodes.css' ),
			'episode'        => array( 'js' => 'episode-detail.js', 'css' => 'episode-detail.css' ),
		);

		if ( ! isset( $map[ $view ] ) ) {
			return;
		}

		$handle = 'castory-page-' . $view;

		if ( file_exists( CASTORY_PLUGIN_DIR . 'public/css/pages/' . $map[ $view ]['css'] ) ) {
			wp_enqueue_style(
				$handle,
				$css . $map[ $view ]['css'],
				array( 'castory-design-system' ),
				CASTORY_VERSION
			);
		}

		$extra_deps = array( 'castory-bootstrap' );
		if ( in_array( $view, array( 'explore', 'library', 'profile', 'new-episodes', 'trending-audio' ), true ) ) {
			wp_enqueue_script( 'castory-sidebar', CASTORY_PLUGIN_URL . 'public/js/components/sidebar.js', array( 'castory-utils' ), CASTORY_VERSION, true );
			$extra_deps[] = 'castory-sidebar';
		}
		if ( in_array( $view, array( 'explore', 'new-episodes', 'trending-video', 'trending-audio' ), true ) ) {
			wp_enqueue_script( 'castory-filters', CASTORY_PLUGIN_URL . 'public/js/components/filters.js', array( 'castory-utils' ), CASTORY_VERSION, true );
			wp_enqueue_script( 'castory-pagination', CASTORY_PLUGIN_URL . 'public/js/components/pagination.js', array( 'castory-utils' ), CASTORY_VERSION, true );
			$extra_deps[] = 'castory-filters';
			$extra_deps[] = 'castory-pagination';
		}
		if ( 'episode' === $view ) {
			wp_enqueue_script( 'castory-episode-detail', CASTORY_PLUGIN_URL . 'public/js/episode-detail.js', array( 'castory-utils', 'castory-mock-data' ), CASTORY_VERSION, true );
			$extra_deps[] = 'castory-episode-detail';
		}

		if ( file_exists( CASTORY_PLUGIN_DIR . 'public/js/pages/' . $map[ $view ]['js'] ) ) {
			wp_enqueue_script(
				$handle,
				$base . $map[ $view ]['js'],
				array_unique( $extra_deps ),
				CASTORY_VERSION,
				true
			);
		}
	}

	/**
	 * @return array<string, string>
	 */
	private function get_page_urls(): array {
		$slugs = array(
			'home'           => 'castory-home',
			'explore'        => 'castory-explore',
			'library'        => 'castory-library',
			'profile'        => 'castory-profile',
			'trending-video' => 'castory-trending-video',
			'trending-audio' => 'castory-trending-audio',
			'new-episodes'   => 'castory-new-episodes',
			'episode'        => 'castory-episode',
		);

		$urls = array();
		foreach ( $slugs as $key => $slug ) {
			$urls[ $key ] = Templates::page_url( $slug );
		}
		return $urls;
	}

	/**
	 * Mark a view as active for asset loading.
	 */
	public static function register_view( string $view ): void {
		self::$active_views[ $view ] = true;
	}

	/**
	 * Detect shortcodes in post content before enqueue (shortcodes run after wp_enqueue_scripts).
	 */
	private function detect_shortcodes_in_content(): void {
		if ( ! is_singular() ) {
			return;
		}

		global $post;
		if ( ! $post instanceof \WP_Post ) {
			return;
		}

		$content = $post->post_content;
		$map     = array(
			'castory_home'         => 'home',
			'castory_explore'      => 'explore',
			'castory_library'      => 'library',
			'castory_profile'      => 'profile',
			'castory_new_episodes' => 'new-episodes',
			'castory_episode'      => 'episode',
		);

		foreach ( $map as $tag => $view ) {
			if ( has_shortcode( $content, $tag ) ) {
				self::register_view( $view );
			}
		}

		if ( has_shortcode( $content, 'castory_trending' ) ) {
			if ( preg_match( '/\[castory_trending[^\]]*type=["\']audio["\']/', $content ) ) {
				self::register_view( 'trending-audio' );
			} else {
				self::register_view( 'trending-video' );
			}
		}
	}
}
