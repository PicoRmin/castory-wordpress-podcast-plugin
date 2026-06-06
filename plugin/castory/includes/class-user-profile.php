<?php
/**
 * Castory profile fields + computed stats (Phase 9.1).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Profile extras in user meta; core identity from WP user object.
 */
class User_Profile {

	public const META_LOCATION = '_castory_location';
	public const META_WEBSITE  = '_castory_website';
	public const META_COVER    = '_castory_cover_url';

	private const DEFAULT_COVER = 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600';

	/**
	 * @return array{bio: string, location: string, website: string, cover: string}
	 */
	public static function get_fields( int $user_id ): array {
		$user = get_userdata( $user_id );
		$bio  = $user instanceof \WP_User ? (string) $user->description : '';

		return array(
			'bio'      => $bio,
			'location' => (string) get_user_meta( $user_id, self::META_LOCATION, true ),
			'website'  => (string) get_user_meta( $user_id, self::META_WEBSITE, true ),
			'cover'    => self::sanitize_cover( (string) get_user_meta( $user_id, self::META_COVER, true ) ),
		);
	}

	/**
	 * @param array{bio?: string, location?: string, website?: string, cover_url?: string} $data Patch data.
	 */
	public static function update_fields( int $user_id, array $data ): void {
		if ( isset( $data['bio'] ) ) {
			wp_update_user(
				array(
					'ID'          => $user_id,
					'description' => sanitize_textarea_field( (string) $data['bio'] ),
				)
			);
		}

		if ( isset( $data['location'] ) ) {
			update_user_meta( $user_id, self::META_LOCATION, sanitize_text_field( (string) $data['location'] ) );
		}

		if ( isset( $data['website'] ) ) {
			update_user_meta( $user_id, self::META_WEBSITE, self::sanitize_website( (string) $data['website'] ) );
		}

		if ( isset( $data['cover_url'] ) ) {
			update_user_meta( $user_id, self::META_COVER, self::sanitize_cover( (string) $data['cover_url'] ) );
		}
	}

	/**
	 * Full profile payload for REST + frontend hydration.
	 *
	 * @return array<string, mixed>
	 */
	public static function build_payload( int $user_id ): array {
		$user = get_userdata( $user_id );
		if ( ! $user instanceof \WP_User ) {
			return array();
		}

		$fields   = self::get_fields( $user_id );
		$progress = User_Progress::get_map( $user_id );
		$stats    = self::build_stats( $user_id, $progress );

		return array(
			'user'              => self::format_user( $user, $fields ),
			'stats'             => $stats,
			'watchHistory'      => self::build_watch_history( $progress ),
			'recentlyCompleted' => self::build_recently_completed( $progress ),
			'accountStatus'     => self::build_account_status( $user ),
		);
	}

	/**
	 * @param array<string, array{currentTime: float, duration: float, updatedAt: int}> $progress Progress map.
	 * @return list<array{label: string, value: string}>
	 */
	private static function build_stats( int $user_id, array $progress ): array {
		$bookmarks  = count( User_Library::get_bookmarks( $user_id ) );
		$playlists  = count( User_Playlists::get_all( $user_id ) );
		$started    = count( $progress );
		$hours      = 0.0;

		foreach ( $progress as $row ) {
			if ( is_array( $row ) && isset( $row['currentTime'] ) ) {
				$hours += max( 0, (float) $row['currentTime'] ) / 3600;
			}
		}

		return array(
			array(
				'label' => __( 'Saved Episodes', 'castory' ),
				'value' => (string) $bookmarks,
			),
			array(
				'label' => __( 'Playlists', 'castory' ),
				'value' => (string) $playlists,
			),
			array(
				'label' => __( 'Episodes Started', 'castory' ),
				'value' => (string) $started,
			),
			array(
				'label' => __( 'Listening Hours', 'castory' ),
				'value' => self::format_hours( $hours ),
			),
		);
	}

	/**
	 * @param array<string, array{currentTime: float, duration: float, updatedAt: int}> $progress Progress map.
	 * @return list<array<string, mixed>>
	 */
	private static function build_watch_history( array $progress ): array {
		$rows = array();

		foreach ( $progress as $episode_id => $row ) {
			if ( ! is_array( $row ) || empty( $row['duration'] ) ) {
				continue;
			}

			$post = get_post( (int) $episode_id );
			if ( ! $post instanceof \WP_Post || 'castory_episode' !== $post->post_type ) {
				continue;
			}

			$pct = (int) round( ( (float) $row['currentTime'] / (float) $row['duration'] ) * 100 );
			$pct = max( 0, min( 100, $pct ) );

			$rows[] = array(
				'id'        => (int) $episode_id,
				'title'     => get_the_title( $post ),
				'creator'   => self::episode_creator( $post ),
				'duration'  => (string) get_post_meta( $post->ID, '_castory_duration', true ),
				'progress'  => $pct,
				'thumbnail' => self::episode_thumbnail( $post ),
				'updatedAt' => isset( $row['updatedAt'] ) ? (int) $row['updatedAt'] : 0,
			);
		}

		usort(
			$rows,
			static function ( array $a, array $b ): int {
				return $b['updatedAt'] <=> $a['updatedAt'];
			}
		);

		return array_slice( $rows, 0, 12 );
	}

	/**
	 * @param array<string, array{currentTime: float, duration: float, updatedAt: int}> $progress Progress map.
	 * @return list<array<string, mixed>>
	 */
	private static function build_recently_completed( array $progress ): array {
		$rows = array();

		foreach ( $progress as $episode_id => $row ) {
			if ( ! is_array( $row ) || empty( $row['duration'] ) ) {
				continue;
			}

			$pct = ( (float) $row['currentTime'] / (float) $row['duration'] ) * 100;
			if ( $pct < 95 ) {
				continue;
			}

			$post = get_post( (int) $episode_id );
			if ( ! $post instanceof \WP_Post || 'castory_episode' !== $post->post_type ) {
				continue;
			}

			$rows[] = array(
				'id'           => (int) $episode_id,
				'title'        => get_the_title( $post ),
				'creator'      => self::episode_creator( $post ),
				'mediaType'    => get_post_meta( $post->ID, '_castory_media_type', true ) ?: 'video',
				'thumbnail'    => self::episode_thumbnail( $post ),
				'completedAgo' => self::time_ago( isset( $row['updatedAt'] ) ? (int) $row['updatedAt'] : time() ),
				'updatedAt'    => isset( $row['updatedAt'] ) ? (int) $row['updatedAt'] : 0,
			);
		}

		usort(
			$rows,
			static function ( array $a, array $b ): int {
				return $b['updatedAt'] <=> $a['updatedAt'];
			}
		);

		return array_slice( $rows, 0, 8 );
	}

	/**
	 * @param array{bio: string, location: string, website: string, cover: string} $fields Profile fields.
	 * @return array<string, mixed>
	 */
	private static function format_user( \WP_User $user, array $fields ): array {
		$avatar = get_avatar_url(
			$user->ID,
			array(
				'size' => 300,
			)
		);

		$registered = $user->user_registered ? strtotime( $user->user_registered . ' UTC' ) : false;
		$is_premium = user_can( $user, 'manage_options' ) || in_array( 'castory_premium', (array) $user->roles, true );

		return array(
			'id'        => $user->ID,
			'name'      => $user->display_name ?: $user->user_login,
			'username'  => '@' . $user->user_login,
			'avatar'    => $avatar ?: '',
			'bio'       => $fields['bio'],
			'location'  => $fields['location'],
			'website'   => $fields['website'],
			'joinDate'  => $registered ? gmdate( 'F Y', $registered ) : '',
			'cover'     => $fields['cover'] ?: self::DEFAULT_COVER,
			'badge'     => $is_premium ? __( 'Premium Member', 'castory' ) : __( 'Member', 'castory' ),
			'isPremium' => $is_premium,
			'verified'  => user_can( $user, 'edit_posts' ),
		);
	}

	/**
	 * @return array{plan: string, status: string, renewal: string, memberSince: string}
	 */
	private static function build_account_status( \WP_User $user ): array {
		$registered = $user->user_registered ? strtotime( $user->user_registered . ' UTC' ) : false;
		$is_premium = user_can( $user, 'manage_options' ) || in_array( 'castory_premium', (array) $user->roles, true );

		return array(
			'plan'        => $is_premium ? __( 'Premium', 'castory' ) : __( 'Free', 'castory' ),
			'status'      => __( 'Active', 'castory' ),
			'renewal'     => $is_premium ? __( 'Managed by site admin', 'castory' ) : '—',
			'memberSince' => $registered ? gmdate( 'F Y', $registered ) : '',
		);
	}

	private static function episode_creator( \WP_Post $post ): string {
		$creator_meta = get_post_meta( $post->ID, '_castory_creator_name', true );
		if ( is_string( $creator_meta ) && '' !== trim( $creator_meta ) ) {
			return trim( $creator_meta );
		}
		return get_the_author_meta( 'display_name', (int) $post->post_author );
	}

	private static function episode_thumbnail( \WP_Post $post ): string {
		$thumb = get_the_post_thumbnail_url( $post, 'medium' );
		if ( $thumb ) {
			return $thumb;
		}
		$meta = get_post_meta( $post->ID, '_castory_thumbnail_url', true );
		return is_string( $meta ) && '' !== $meta ? $meta : '';
	}

	private static function format_hours( float $hours ): string {
		if ( $hours < 1 ) {
			return '<1h';
		}
		return (string) (int) round( $hours ) . 'h';
	}

	private static function time_ago( int $timestamp ): string {
		$diff = max( 0, time() - $timestamp );
		if ( $diff < HOUR_IN_SECONDS ) {
			$mins = max( 1, (int) floor( $diff / MINUTE_IN_SECONDS ) );
			/* translators: %d: minutes */
			return sprintf( _n( '%d min ago', '%d mins ago', $mins, 'castory' ), $mins );
		}
		if ( $diff < DAY_IN_SECONDS ) {
			$hrs = max( 1, (int) floor( $diff / HOUR_IN_SECONDS ) );
			/* translators: %d: hours */
			return sprintf( _n( '%d hr ago', '%d hrs ago', $hrs, 'castory' ), $hrs );
		}
		$days = max( 1, (int) floor( $diff / DAY_IN_SECONDS ) );
		/* translators: %d: days */
		return sprintf( _n( '%d day ago', '%d days ago', $days, 'castory' ), $days );
	}

	private static function sanitize_website( string $url ): string {
		$url = trim( $url );
		if ( '' === $url ) {
			return '';
		}
		if ( ! preg_match( '#^https?://#i', $url ) ) {
			$url = 'https://' . $url;
		}
		return esc_url_raw( $url );
	}

	private static function sanitize_cover( string $url ): string {
		$url = trim( $url );
		if ( '' === $url ) {
			return '';
		}
		return esc_url_raw( $url );
	}
}
