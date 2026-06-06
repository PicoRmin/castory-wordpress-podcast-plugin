<?php
/**
 * Shortcode registration.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers [castory_*] shortcodes.
 */
class Shortcodes {

	public function register(): void {
		add_shortcode( 'castory_home', array( $this, 'home' ) );
		add_shortcode( 'castory_explore', array( $this, 'explore' ) );
		add_shortcode( 'castory_library', array( $this, 'library' ) );
		add_shortcode( 'castory_profile', array( $this, 'profile' ) );
		add_shortcode( 'castory_trending', array( $this, 'trending' ) );
		add_shortcode( 'castory_new_episodes', array( $this, 'new_episodes' ) );
		add_shortcode( 'castory_episode', array( $this, 'episode' ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function home( $atts = array() ): string {
		Public_Frontend::register_view( 'home' );
		return Templates::render( 'home', $this->parse_atts( $atts ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function explore( $atts = array() ): string {
		Public_Frontend::register_view( 'explore' );
		return Templates::render( 'explore', $this->parse_atts( $atts ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function library( $atts = array() ): string {
		Public_Frontend::register_view( 'library' );
		return Templates::render( 'library', $this->parse_atts( $atts ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function profile( $atts = array() ): string {
		Public_Frontend::register_view( 'profile' );
		return Templates::render( 'profile', $this->parse_atts( $atts ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function trending( $atts = array() ): string {
		$atts = shortcode_atts(
			array( 'type' => 'video' ),
			$this->parse_atts( $atts ),
			'castory_trending'
		);

		$type = 'audio' === $atts['type'] ? 'audio' : 'video';
		$view = 'audio' === $type ? 'trending-audio' : 'trending-video';
		Public_Frontend::register_view( $view );

		return Templates::render(
			$view,
			array(
				'media_type' => $type,
			)
		);
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function new_episodes( $atts = array() ): string {
		Public_Frontend::register_view( 'new-episodes' );
		return Templates::render( 'new-episodes', $this->parse_atts( $atts ) );
	}

	/**
	 * @param array<string, string>|string $atts Shortcode attributes.
	 */
	public function episode( $atts = array() ): string {
		$atts = shortcode_atts(
			array(
				'id' => 0,
			),
			$this->parse_atts( $atts ),
			'castory_episode'
		);

		Public_Frontend::register_view( 'episode' );

		$episode_id = absint( $atts['id'] );
		if ( ! $episode_id && is_singular( 'castory_episode' ) ) {
			$episode_id = get_queried_object_id();
		}
		if ( ! $episode_id && isset( $_GET['id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$episode_id = absint( $_GET['id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		$media_type = 'video';
		if ( $episode_id ) {
			$meta = get_post_meta( $episode_id, '_castory_media_type', true );
			if ( is_string( $meta ) && in_array( $meta, array( 'audio', 'video' ), true ) ) {
				$media_type = $meta;
			}
		}

		Public_Frontend::$episode_media = $media_type;

		return Templates::render(
			'episode-detail',
			array(
				'episode_id' => $episode_id,
				'media_type' => $media_type,
			)
		);
	}

	/**
	 * @param array<string, string>|string $atts Raw attributes.
	 * @return array<string, string>
	 */
	private function parse_atts( $atts ): array {
		if ( is_string( $atts ) ) {
			return array();
		}
		return is_array( $atts ) ? $atts : array();
	}
}
