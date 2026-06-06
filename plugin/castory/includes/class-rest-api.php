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

		register_rest_route(
			'castory/v1',
			'/widgets',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_widgets' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'castory/v1',
			'/creators',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_creators' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'limit' => array(
						'type'    => 'integer',
						'default' => 8,
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/trending',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_trending' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'media_type' => array(
						'type'    => 'string',
						'default' => 'all',
						'enum'    => array( 'audio', 'video', 'all' ),
					),
					'limit'      => array(
						'type'    => 'integer',
						'default' => 12,
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
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_widgets( \WP_REST_Request $request ): \WP_REST_Response {
		return new \WP_REST_Response( Widget_Data::get_widgets(), 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_creators( \WP_REST_Request $request ): \WP_REST_Response {
		$limit = min( 20, max( 1, (int) $request->get_param( 'limit' ) ) );
		return new \WP_REST_Response(
			array(
				'items' => Widget_Data::get_creators( $limit ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_trending( \WP_REST_Request $request ): \WP_REST_Response {
		$media_type = (string) $request->get_param( 'media_type' );
		$limit      = min( 50, max( 1, (int) $request->get_param( 'limit' ) ) );
		$items      = Widget_Data::get_trending( $media_type, $limit );

		return new \WP_REST_Response(
			array(
				'items' => $items,
			),
			200
		);
	}

	/**
	 * Public formatter for other Castory classes.
	 *
	 * @return array<string, mixed>
	 */
	public function format_episode_public( \WP_Post $post ): array {
		return $this->format_episode( $post );
	}

	/**
	 * @return array<string, mixed>
	 */
	private function format_episode( \WP_Post $post ): array {
		$thumb = get_the_post_thumbnail_url( $post, 'medium' );
		if ( ! $thumb ) {
			$thumb = get_post_meta( $post->ID, '_castory_thumbnail_url', true ) ?: '';
		}
		$terms     = wp_get_post_terms( $post->ID, 'castory_category', array( 'fields' => 'names' ) );
		$views     = (int) get_post_meta( $post->ID, '_castory_views', true );
		$published = strtotime( $post->post_date_gmt . ' GMT' ) * 1000;

		$creator_meta = get_post_meta( $post->ID, '_castory_creator_name', true );
		$creator      = is_string( $creator_meta ) && '' !== trim( $creator_meta )
			? trim( $creator_meta )
			: get_the_author_meta( 'display_name', (int) $post->post_author );

		return array(
			'id'              => $post->ID,
			'title'           => get_the_title( $post ),
			'description'     => get_the_excerpt( $post ) ?: wp_trim_words( wp_strip_all_tags( $post->post_content ), 40 ),
			'creator'         => $creator,
			'category'        => is_array( $terms ) && ! empty( $terms ) ? (string) $terms[0] : '',
			'mediaType'       => get_post_meta( $post->ID, '_castory_media_type', true ) ?: 'video',
			'duration'        => get_post_meta( $post->ID, '_castory_duration', true ) ?: '',
			'views'           => $views,
			'viewsCount'      => $views,
			'viewsFormatted'  => self::format_views( $views ),
			'thumbnail'       => $thumb,
			'thumbnailUrl'    => $thumb,
			'mediaUrl'        => get_post_meta( $post->ID, '_castory_media_url', true ) ?: '',
			'publishedAt'     => $published,
			'verified'        => false,
			'permalink'       => get_permalink( $post ),
		);
	}

	private static function format_views( int $count ): string {
		if ( $count >= 1000000 ) {
			return rtrim( rtrim( number_format( $count / 1000000, 1 ), '0' ), '.' ) . 'M';
		}
		if ( $count >= 1000 ) {
			return (string) (int) round( $count / 1000 ) . 'K';
		}
		return (string) $count;
	}
}
