<?php
/**
 * REST API endpoints (Phase 8.5 foundation).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers /wp-json/castory/v1/* routes.
 */
class Rest_Api {

	public function register_routes(): void {
		register_rest_route(
			'castory/v1',
			'/episodes',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_episodes' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'page'       => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'per_page'   => array(
						'type'    => 'integer',
						'default' => 12,
					),
					'media_type' => array(
						'type' => 'string',
						'enum' => array( 'audio', 'video', 'all' ),
					),
					'category'   => array( 'type' => 'string' ),
					'search'     => array( 'type' => 'string' ),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/episodes/(?P<id>\d+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_episode' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'id' => array(
						'type'     => 'integer',
						'required' => true,
					),
				),
			)
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_episodes( \WP_REST_Request $request ): \WP_REST_Response {
		$page       = max( 1, (int) $request->get_param( 'page' ) );
		$per_page   = min( 50, max( 1, (int) $request->get_param( 'per_page' ) ) );
		$media_type = (string) $request->get_param( 'media_type' );
		$category   = sanitize_text_field( (string) $request->get_param( 'category' ) );
		$search     = sanitize_text_field( (string) $request->get_param( 'search' ) );

		$args = array(
			'post_type'      => 'castory_episode',
			'post_status'    => 'publish',
			'posts_per_page' => $per_page,
			'paged'          => $page,
		);

		if ( $search ) {
			$args['s'] = $search;
		}

		if ( $category && 'All' !== $category ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'castory_category',
					'field'    => 'name',
					'terms'    => $category,
				),
			);
		}

		if ( in_array( $media_type, array( 'audio', 'video' ), true ) ) {
			$args['meta_query'] = array(
				array(
					'key'   => '_castory_media_type',
					'value' => $media_type,
				),
			);
		}

		$query = new \WP_Query( $args );
		$items = array();

		foreach ( $query->posts as $post ) {
			if ( $post instanceof \WP_Post ) {
				$items[] = $this->format_episode( $post );
			}
		}

		return new \WP_REST_Response(
			array(
				'items'       => $items,
				'total'       => (int) $query->found_posts,
				'total_pages' => (int) $query->max_num_pages,
				'page'        => $page,
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_episode( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$post = get_post( (int) $request->get_param( 'id' ) );
		if ( ! $post instanceof \WP_Post || 'castory_episode' !== $post->post_type ) {
			return new \WP_Error( 'castory_not_found', __( 'Episode not found.', 'castory' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( $this->format_episode( $post ), 200 );
	}

	/**
	 * @return array<string, mixed>
	 */
	private function format_episode( \WP_Post $post ): array {
		$thumb = get_the_post_thumbnail_url( $post, 'medium' );
		$terms = wp_get_post_terms( $post->ID, 'castory_category', array( 'fields' => 'names' ) );

		return array(
			'id'          => $post->ID,
			'title'       => get_the_title( $post ),
			'description' => get_the_excerpt( $post ),
			'creator'     => get_the_author_meta( 'display_name', (int) $post->post_author ),
			'category'    => is_array( $terms ) && ! empty( $terms ) ? (string) $terms[0] : '',
			'mediaType'   => get_post_meta( $post->ID, '_castory_media_type', true ) ?: 'video',
			'duration'    => get_post_meta( $post->ID, '_castory_duration', true ) ?: '',
			'views'       => (int) get_post_meta( $post->ID, '_castory_views', true ),
			'viewsCount'  => (int) get_post_meta( $post->ID, '_castory_views', true ),
			'thumbnail'   => $thumb ?: '',
			'mediaUrl'    => get_post_meta( $post->ID, '_castory_media_url', true ) ?: '',
			'publishedAt' => strtotime( $post->post_date_gmt . ' GMT' ) * 1000,
			'permalink'   => get_permalink( $post ),
		);
	}
}
