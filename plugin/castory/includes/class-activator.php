<?php
/**
 * Plugin activation.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Runs on plugin activation.
 */
class Activator {

	public static function activate(): void {
		require_once CASTORY_PLUGIN_DIR . 'includes/class-post-types.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-sample-data.php';
		( new Post_Types() )->register();

		self::create_default_pages();
		self::seed_default_options();
		Sample_Data::import_if_empty();
		Sample_Data::backfill_creator_names();
		Sample_Data::backfill_media_urls();

		flush_rewrite_rules();
	}

	/**
	 * Create WordPress pages with shortcodes if they do not exist.
	 *
	 * @see docs/IA.md
	 */
	private static function create_default_pages(): void {
		$pages = array(
			'castory-home'           => array(
				'title'     => 'Castory Home',
				'shortcode' => '[castory_home]',
			),
			'castory-explore'        => array(
				'title'     => 'Explore',
				'shortcode' => '[castory_explore]',
			),
			'castory-library'        => array(
				'title'     => 'Library',
				'shortcode' => '[castory_library]',
			),
			'castory-profile'        => array(
				'title'     => 'Profile',
				'shortcode' => '[castory_profile]',
			),
			'castory-trending-video' => array(
				'title'     => 'Trending Video',
				'shortcode' => '[castory_trending type="video"]',
			),
			'castory-trending-audio' => array(
				'title'     => 'Trending Audio',
				'shortcode' => '[castory_trending type="audio"]',
			),
			'castory-new-episodes'   => array(
				'title'     => 'New Episodes',
				'shortcode' => '[castory_new_episodes]',
			),
			'castory-episode'        => array(
				'title'     => 'Episode',
				'shortcode' => '[castory_episode]',
			),
		);

		$page_ids = get_option( 'castory_page_ids', array() );
		if ( ! is_array( $page_ids ) ) {
			$page_ids = array();
		}

		foreach ( $pages as $slug => $data ) {
			$existing = get_page_by_path( $slug );
			if ( $existing instanceof \WP_Post ) {
				$page_ids[ $slug ] = (int) $existing->ID;
				continue;
			}

			$post_id = wp_insert_post(
				array(
					'post_title'   => $data['title'],
					'post_name'    => $slug,
					'post_content' => $data['shortcode'],
					'post_status'  => 'publish',
					'post_type'    => 'page',
					'post_author'  => get_current_user_id() ?: 1,
				),
				true
			);

			if ( ! is_wp_error( $post_id ) ) {
				$page_ids[ $slug ] = (int) $post_id;
			}
		}

		update_option( 'castory_page_ids', $page_ids, false );
	}

	private static function seed_default_options(): void {
		if ( false === get_option( 'castory_settings' ) ) {
			update_option(
				'castory_settings',
				array(
					'brand_name'   => 'Castory',
					'episodes_per_page' => 12,
					'enable_global_player' => true,
				),
				false
			);
		}
	}
}
