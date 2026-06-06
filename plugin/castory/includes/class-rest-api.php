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

		register_rest_route(
			'castory/v1',
			'/progress',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_progress' ),
					'permission_callback' => array( $this, 'progress_read_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_progress' ),
					'permission_callback' => array( $this, 'progress_write_permission' ),
					'args'                => array(
						'episode_id'   => array(
							'type'     => 'integer',
							'required' => true,
						),
						'current_time' => array(
							'type'     => 'number',
							'required' => true,
						),
						'duration'     => array(
							'type'     => 'number',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/library',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_library' ),
					'permission_callback' => array( $this, 'library_read_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_library' ),
					'permission_callback' => array( $this, 'library_write_permission' ),
					'args'                => array(
						'bookmarks'  => array(
							'type'  => 'array',
							'items' => array( 'type' => 'integer' ),
						),
						'watchLater' => array(
							'type'  => 'array',
							'items' => array( 'type' => 'integer' ),
						),
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/library/bookmark',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'toggle_bookmark' ),
				'permission_callback' => array( $this, 'library_write_permission' ),
				'args'                => array(
					'episode_id' => array(
						'type'     => 'integer',
						'required' => true,
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/library/watch-later',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'toggle_watch_later' ),
				'permission_callback' => array( $this, 'library_write_permission' ),
				'args'                => array(
					'episode_id' => array(
						'type'     => 'integer',
						'required' => true,
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/playlists',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_playlists' ),
					'permission_callback' => array( $this, 'library_read_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_playlists' ),
					'permission_callback' => array( $this, 'library_write_permission' ),
					'args'                => array(
						'items' => array(
							'type'  => 'array',
							'items' => array( 'type' => 'object' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_playlist' ),
					'permission_callback' => array( $this, 'library_write_permission' ),
					'args'                => array(
						'name'        => array(
							'type'     => 'string',
							'required' => true,
						),
						'episode_ids' => array(
							'type'  => 'array',
							'items' => array( 'type' => 'integer' ),
						),
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/playlists/(?P<id>pl_[a-zA-Z0-9_-]+)',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_playlist' ),
					'permission_callback' => array( $this, 'library_read_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_playlist' ),
					'permission_callback' => array( $this, 'library_write_permission' ),
					'args'                => array(
						'name'        => array( 'type' => 'string' ),
						'episode_ids' => array(
							'type'  => 'array',
							'items' => array( 'type' => 'integer' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_playlist' ),
					'permission_callback' => array( $this, 'library_write_permission' ),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/profile',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_profile' ),
					'permission_callback' => array( $this, 'profile_read_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_profile' ),
					'permission_callback' => array( $this, 'profile_write_permission' ),
					'args'                => array(
						'bio'       => array( 'type' => 'string' ),
						'location'  => array( 'type' => 'string' ),
						'website'   => array( 'type' => 'string' ),
						'cover_url' => array( 'type' => 'string' ),
					),
				),
			)
		);

		register_rest_route(
			'castory/v1',
			'/playlists/(?P<id>pl_[a-zA-Z0-9_-]+)/episodes',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'toggle_playlist_episode' ),
				'permission_callback' => array( $this, 'library_write_permission' ),
				'args'                => array(
					'episode_id' => array(
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

	public function profile_read_permission(): bool {
		return is_user_logged_in();
	}

	public function profile_write_permission(): bool {
		return is_user_logged_in();
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_profile( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		return new \WP_REST_Response( User_Profile::build_payload( $user_id ), 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function save_profile( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$data = array();
		foreach ( array( 'bio', 'location', 'website', 'cover_url' ) as $key ) {
			if ( null !== $request->get_param( $key ) ) {
				$data[ $key ] = (string) $request->get_param( $key );
			}
		}

		if ( empty( $data ) ) {
			return new \WP_Error( 'castory_invalid', __( 'No profile fields provided.', 'castory' ), array( 'status' => 400 ) );
		}

		User_Profile::update_fields( $user_id, $data );

		return new \WP_REST_Response( User_Profile::build_payload( $user_id ), 200 );
	}

	public function progress_read_permission(): bool {
		return is_user_logged_in();
	}

	public function progress_write_permission(): bool {
		return is_user_logged_in();
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_progress( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		return new \WP_REST_Response(
			array(
				'items' => User_Progress::get_map( $user_id ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function save_progress( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$episode_id = absint( $request->get_param( 'episode_id' ) );
		$post       = get_post( $episode_id );
		if ( ! $post instanceof \WP_Post || 'castory_episode' !== $post->post_type ) {
			return new \WP_Error( 'castory_not_found', __( 'Episode not found.', 'castory' ), array( 'status' => 404 ) );
		}

		User_Progress::set_position(
			$user_id,
			$episode_id,
			(float) $request->get_param( 'current_time' ),
			(float) $request->get_param( 'duration' )
		);

		return new \WP_REST_Response(
			array(
				'saved'      => true,
				'episode_id' => $episode_id,
			),
			200
		);
	}

	public function library_read_permission(): bool {
		return is_user_logged_in();
	}

	public function library_write_permission(): bool {
		return is_user_logged_in();
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_library( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		return new \WP_REST_Response( User_Library::get_all( $user_id ), 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function save_library( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$bookmarks  = $request->get_param( 'bookmarks' );
		$watch_later = $request->get_param( 'watchLater' );

		if ( is_array( $bookmarks ) ) {
			$valid = $this->filter_valid_episode_ids( $bookmarks );
			User_Library::set_bookmarks( $user_id, $valid );
		}

		if ( is_array( $watch_later ) ) {
			$valid = $this->filter_valid_episode_ids( $watch_later );
			User_Library::set_watch_later( $user_id, $valid );
		}

		return new \WP_REST_Response( User_Library::get_all( $user_id ), 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function toggle_bookmark( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$episode_id = absint( $request->get_param( 'episode_id' ) );
		if ( ! $this->episode_exists( $episode_id ) ) {
			return new \WP_Error( 'castory_not_found', __( 'Episode not found.', 'castory' ), array( 'status' => 404 ) );
		}

		$added = User_Library::toggle_bookmark( $user_id, $episode_id );

		return new \WP_REST_Response(
			array(
				'added'      => $added,
				'episode_id' => $episode_id,
				'bookmarks'  => User_Library::get_bookmarks( $user_id ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function toggle_watch_later( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$episode_id = absint( $request->get_param( 'episode_id' ) );
		if ( ! $this->episode_exists( $episode_id ) ) {
			return new \WP_Error( 'castory_not_found', __( 'Episode not found.', 'castory' ), array( 'status' => 404 ) );
		}

		$added = User_Library::toggle_watch_later( $user_id, $episode_id );

		return new \WP_REST_Response(
			array(
				'added'      => $added,
				'episode_id' => $episode_id,
				'watchLater' => User_Library::get_watch_later( $user_id ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_playlists( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		return new \WP_REST_Response(
			array(
				'items' => User_Playlists::get_all( $user_id ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function get_playlist( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$playlist = User_Playlists::get_by_id( $user_id, (string) $request->get_param( 'id' ) );
		if ( null === $playlist ) {
			return new \WP_Error( 'castory_not_found', __( 'Playlist not found.', 'castory' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( $playlist, 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function save_playlists( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$items = $request->get_param( 'items' );
		if ( ! is_array( $items ) ) {
			return new \WP_Error( 'castory_invalid', __( 'Invalid playlist payload.', 'castory' ), array( 'status' => 400 ) );
		}

		$clean = array();
		foreach ( $items as $row ) {
			if ( ! is_array( $row ) ) {
				continue;
			}
			if ( isset( $row['episodeIds'] ) && is_array( $row['episodeIds'] ) ) {
				$row['episodeIds'] = $this->filter_valid_episode_ids( $row['episodeIds'] );
			}
			$clean[] = $row;
		}

		User_Playlists::save_all( $user_id, $clean );

		return new \WP_REST_Response(
			array(
				'items' => User_Playlists::get_all( $user_id ),
			),
			200
		);
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function create_playlist( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		if ( count( User_Playlists::get_all( $user_id ) ) >= 50 ) {
			return new \WP_Error( 'castory_limit', __( 'Playlist limit reached.', 'castory' ), array( 'status' => 400 ) );
		}

		$episode_ids = $this->filter_valid_episode_ids( (array) $request->get_param( 'episode_ids' ) );
		$playlist    = User_Playlists::create( $user_id, (string) $request->get_param( 'name' ), $episode_ids );

		if ( empty( $playlist ) ) {
			return new \WP_Error( 'castory_create_failed', __( 'Could not create playlist.', 'castory' ), array( 'status' => 500 ) );
		}

		return new \WP_REST_Response( $playlist, 201 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function update_playlist( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$data = array();
		if ( null !== $request->get_param( 'name' ) ) {
			$data['name'] = (string) $request->get_param( 'name' );
		}
		if ( is_array( $request->get_param( 'episode_ids' ) ) ) {
			$data['episodeIds'] = $this->filter_valid_episode_ids( (array) $request->get_param( 'episode_ids' ) );
		}

		$playlist = User_Playlists::update( $user_id, (string) $request->get_param( 'id' ), $data );
		if ( null === $playlist ) {
			return new \WP_Error( 'castory_not_found', __( 'Playlist not found.', 'castory' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( $playlist, 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function delete_playlist( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$deleted = User_Playlists::delete( $user_id, (string) $request->get_param( 'id' ) );
		if ( ! $deleted ) {
			return new \WP_Error( 'castory_not_found', __( 'Playlist not found.', 'castory' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( array( 'deleted' => true ), 200 );
	}

	/**
	 * @param \WP_REST_Request $request Request object.
	 */
	public function toggle_playlist_episode( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return new \WP_Error( 'castory_unauthorized', __( 'Login required.', 'castory' ), array( 'status' => 401 ) );
		}

		$episode_id = absint( $request->get_param( 'episode_id' ) );
		if ( ! $this->episode_exists( $episode_id ) ) {
			return new \WP_Error( 'castory_not_found', __( 'Episode not found.', 'castory' ), array( 'status' => 404 ) );
		}

		$playlist = User_Playlists::toggle_episode( $user_id, (string) $request->get_param( 'id' ), $episode_id );
		if ( null === $playlist ) {
			return new \WP_Error( 'castory_not_found', __( 'Playlist not found.', 'castory' ), array( 'status' => 404 ) );
		}

		return new \WP_REST_Response( $playlist, 200 );
	}

	/**
	 * @param list<int>|mixed $ids Episode IDs.
	 * @return list<int>
	 */
	private function filter_valid_episode_ids( $ids ): array {
		if ( ! is_array( $ids ) ) {
			return array();
		}
		$valid = array();
		foreach ( $ids as $id ) {
			$episode_id = absint( $id );
			if ( $episode_id && $this->episode_exists( $episode_id ) ) {
				$valid[] = $episode_id;
			}
		}
		return array_values( array_unique( $valid ) );
	}

	private function episode_exists( int $episode_id ): bool {
		$post = get_post( $episode_id );
		return $post instanceof \WP_Post && 'castory_episode' === $post->post_type;
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
