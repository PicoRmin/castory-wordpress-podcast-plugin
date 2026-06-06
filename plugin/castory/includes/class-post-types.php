<?php
/**
 * Custom post types and taxonomies.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers Castory CPTs and taxonomies.
 */
class Post_Types {

	public function register(): void {
		$this->register_episode();
		$this->register_podcast();
		$this->register_taxonomies();
	}

	private function register_episode(): void {
		register_post_type(
			'castory_episode',
			array(
				'labels'              => array(
					'name'          => __( 'Episodes', 'castory' ),
					'singular_name' => __( 'Episode', 'castory' ),
					'add_new_item'  => __( 'Add New Episode', 'castory' ),
					'edit_item'     => __( 'Edit Episode', 'castory' ),
				),
				'public'              => true,
				'has_archive'         => true,
				'rewrite'             => array( 'slug' => 'episode' ),
				'show_in_rest'        => true,
				'menu_icon'           => 'dashicons-microphone',
				'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'custom-fields' ),
				'taxonomies'          => array( 'castory_category', 'castory_topic' ),
				'show_in_menu'        => true,
			)
		);

		$meta_keys = array(
			'_castory_duration'    => 'string',
			'_castory_views'       => 'integer',
			'_castory_media_type'  => 'string',
			'_castory_media_url'   => 'string',
			'_castory_podcast_id'  => 'integer',
			'_castory_published_at'=> 'integer',
			'_castory_thumbnail_url' => 'string',
			'_castory_creator_name'  => 'string',
		);

		foreach ( $meta_keys as $key => $type ) {
			register_post_meta(
				'castory_episode',
				$key,
				array(
					'single'       => true,
					'type'         => $type,
					'show_in_rest' => true,
					'auth_callback'=> static function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}
	}

	private function register_podcast(): void {
		register_post_type(
			'castory_podcast',
			array(
				'labels'       => array(
					'name'          => __( 'Podcasts', 'castory' ),
					'singular_name' => __( 'Podcast', 'castory' ),
					'add_new_item'  => __( 'Add New Podcast', 'castory' ),
				),
				'public'       => true,
				'has_archive'  => true,
				'rewrite'      => array( 'slug' => 'podcast' ),
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-playlist-audio',
				'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
			)
		);

		register_post_meta(
			'castory_podcast',
			'_castory_creator_id',
			array(
				'single'       => true,
				'type'         => 'integer',
				'show_in_rest' => true,
			)
		);
	}

	private function register_taxonomies(): void {
		register_taxonomy(
			'castory_category',
			array( 'castory_episode', 'castory_podcast' ),
			array(
				'labels'       => array(
					'name'          => __( 'Categories', 'castory' ),
					'singular_name' => __( 'Category', 'castory' ),
				),
				'public'       => true,
				'hierarchical' => true,
				'show_in_rest' => true,
				'rewrite'      => array( 'slug' => 'castory-category' ),
			)
		);

		register_taxonomy(
			'castory_topic',
			array( 'castory_episode' ),
			array(
				'labels'       => array(
					'name'          => __( 'Topics', 'castory' ),
					'singular_name' => __( 'Topic', 'castory' ),
				),
				'public'       => true,
				'hierarchical' => false,
				'show_in_rest' => true,
				'rewrite'      => array( 'slug' => 'topic' ),
			)
		);
	}
}
