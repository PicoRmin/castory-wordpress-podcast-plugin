<?php
/**
 * Template loader for shortcode views.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders PHP templates from templates/ directory.
 */
class Templates {

	/**
	 * @param array<string, mixed> $context Template variables.
	 */
	public static function render( string $name, array $context = array() ): string {
		$file = CASTORY_PLUGIN_DIR . 'templates/' . $name . '.php';
		if ( ! file_exists( $file ) ) {
			return '<!-- Castory: template not found: ' . esc_html( $name ) . ' -->';
		}

		ob_start();
		// phpcs:ignore WordPress.PHP.DontExtract.extract_extract -- scoped template vars.
		extract( $context, EXTR_SKIP );
		include $file;
		return (string) ob_get_clean();
	}

	/**
	 * Resolve Castory page URL by slug key.
	 */
	public static function page_url( string $slug ): string {
		$page_ids = get_option( 'castory_page_ids', array() );
		if ( is_array( $page_ids ) && ! empty( $page_ids[ $slug ] ) ) {
			$url = get_permalink( (int) $page_ids[ $slug ] );
			if ( is_string( $url ) ) {
				return $url;
			}
		}
		return home_url( '/' . $slug . '/' );
	}

	/**
	 * Episode detail URL for a post ID.
	 */
	public static function episode_url( int $episode_id ): string {
		if ( $episode_id > 0 && 'castory_episode' === get_post_type( $episode_id ) ) {
			$permalink = get_permalink( $episode_id );
			if ( is_string( $permalink ) && '' !== $permalink ) {
				return $permalink;
			}
		}
		return add_query_arg( 'id', $episode_id, self::page_url( 'castory-episode' ) );
	}

	/**
	 * Common Castory page URLs for templates.
	 *
	 * @return array<string, string>
	 */
	public static function urls(): array {
		return array(
			'home'           => esc_url( self::page_url( 'castory-home' ) ),
			'explore'        => esc_url( self::page_url( 'castory-explore' ) ),
			'library'        => esc_url( self::page_url( 'castory-library' ) ),
			'profile'        => esc_url( self::page_url( 'castory-profile' ) ),
			'trending_video' => esc_url( self::page_url( 'castory-trending-video' ) ),
			'trending_audio' => esc_url( self::page_url( 'castory-trending-audio' ) ),
			'new_episodes'   => esc_url( self::page_url( 'castory-new-episodes' ) ),
			'episode'        => esc_url( self::page_url( 'castory-episode' ) ),
		);
	}
}
