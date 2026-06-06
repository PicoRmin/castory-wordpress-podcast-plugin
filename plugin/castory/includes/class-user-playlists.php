<?php
/**
 * Per-user custom playlists (Phase 9.3).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Stores user playlists in user meta.
 */
class User_Playlists {

	public const META_KEY         = '_castory_playlists';
	private const MAX_PLAYLISTS   = 50;
	private const MAX_EPISODES    = 200;
	private const MAX_NAME_LENGTH = 80;

	/**
	 * @return list<array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}>
	 */
	public static function get_all( int $user_id ): array {
		$raw = get_user_meta( $user_id, self::META_KEY, true );
		if ( ! is_array( $raw ) ) {
			return array();
		}
		$list = array();
		foreach ( $raw as $row ) {
			$playlist = self::normalize_playlist( $row );
			if ( null !== $playlist ) {
				$list[] = $playlist;
			}
		}
		return $list;
	}

	/**
	 * @return array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}|null
	 */
	public static function get_by_id( int $user_id, string $playlist_id ): ?array {
		foreach ( self::get_all( $user_id ) as $playlist ) {
			if ( $playlist['id'] === $playlist_id ) {
				return $playlist;
			}
		}
		return null;
	}

	/**
	 * @param list<array<string, mixed>> $playlists Playlist rows.
	 */
	public static function save_all( int $user_id, array $playlists ): void {
		$clean = array();
		foreach ( array_slice( $playlists, 0, self::MAX_PLAYLISTS ) as $row ) {
			$playlist = self::normalize_playlist( $row );
			if ( null !== $playlist ) {
				$clean[] = $playlist;
			}
		}
		update_user_meta( $user_id, self::META_KEY, $clean );
	}

	/**
	 * @param list<int> $episode_ids Episode IDs.
	 * @return array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}
	 */
	public static function create( int $user_id, string $name, array $episode_ids = array() ): array {
		$list = self::get_all( $user_id );
		if ( count( $list ) >= self::MAX_PLAYLISTS ) {
			return array();
		}

		$now      = time();
		$playlist = array(
			'id'          => self::generate_id(),
			'name'        => self::sanitize_name( $name ),
			'episodeIds'  => self::normalize_episode_ids( $episode_ids ),
			'createdAt'   => $now,
			'updatedAt'   => $now,
		);

		$list[] = $playlist;
		self::save_all( $user_id, $list );

		return $playlist;
	}

	/**
	 * @param array{name?: string, episodeIds?: list<int>} $data Patch data.
	 * @return array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}|null
	 */
	public static function update( int $user_id, string $playlist_id, array $data ): ?array {
		$list    = self::get_all( $user_id );
		$updated = null;

		foreach ( $list as $index => $playlist ) {
			if ( $playlist['id'] !== $playlist_id ) {
				continue;
			}

			if ( isset( $data['name'] ) ) {
				$playlist['name'] = self::sanitize_name( (string) $data['name'] );
			}
			if ( isset( $data['episodeIds'] ) && is_array( $data['episodeIds'] ) ) {
				$playlist['episodeIds'] = self::normalize_episode_ids( $data['episodeIds'] );
			}
			$playlist['updatedAt'] = time();
			$list[ $index ]        = $playlist;
			$updated               = $playlist;
			break;
		}

		if ( null === $updated ) {
			return null;
		}

		self::save_all( $user_id, $list );
		return $updated;
	}

	public static function delete( int $user_id, string $playlist_id ): bool {
		$list    = self::get_all( $user_id );
		$initial = count( $list );
		$list    = array_values(
			array_filter(
				$list,
				static function ( array $playlist ) use ( $playlist_id ): bool {
					return $playlist['id'] !== $playlist_id;
				}
			)
		);

		if ( count( $list ) === $initial ) {
			return false;
		}

		self::save_all( $user_id, $list );
		return true;
	}

	/**
	 * @return array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}|null
	 */
	public static function toggle_episode( int $user_id, string $playlist_id, int $episode_id ): ?array {
		$playlist = self::get_by_id( $user_id, $playlist_id );
		if ( null === $playlist ) {
			return null;
		}

		$ids  = $playlist['episodeIds'];
		$idx  = array_search( $episode_id, $ids, true );
		$data = array( 'episodeIds' => $ids );

		if ( false === $idx ) {
			$ids[] = $episode_id;
		} else {
			array_splice( $ids, (int) $idx, 1 );
		}

		$data['episodeIds'] = $ids;
		return self::update( $user_id, $playlist_id, $data );
	}

	private static function generate_id(): string {
		return 'pl_' . wp_generate_password( 12, false, false );
	}

	private static function sanitize_name( string $name ): string {
		$name = sanitize_text_field( $name );
		if ( '' === $name ) {
			$name = __( 'Untitled Playlist', 'castory' );
		}
		return mb_substr( $name, 0, self::MAX_NAME_LENGTH );
	}

	/**
	 * @param mixed $raw Raw playlist row.
	 * @return array{id: string, name: string, episodeIds: list<int>, createdAt: int, updatedAt: int}|null
	 */
	private static function normalize_playlist( $raw ): ?array {
		if ( ! is_array( $raw ) ) {
			return null;
		}

		$id = isset( $raw['id'] ) ? sanitize_key( (string) $raw['id'] ) : '';
		if ( '' === $id || ! preg_match( '/^pl_[a-zA-Z0-9_-]+$/', $id ) ) {
			return null;
		}

		$name = isset( $raw['name'] ) ? self::sanitize_name( (string) $raw['name'] ) : __( 'Untitled Playlist', 'castory' );
		$ids  = isset( $raw['episodeIds'] ) && is_array( $raw['episodeIds'] )
			? self::normalize_episode_ids( $raw['episodeIds'] )
			: array();

		$created = isset( $raw['createdAt'] ) ? absint( $raw['createdAt'] ) : time();
		$updated = isset( $raw['updatedAt'] ) ? absint( $raw['updatedAt'] ) : $created;

		return array(
			'id'         => $id,
			'name'       => $name,
			'episodeIds' => $ids,
			'createdAt'  => $created,
			'updatedAt'  => $updated,
		);
	}

	/**
	 * @param list<int>|mixed $ids Episode IDs.
	 * @return list<int>
	 */
	private static function normalize_episode_ids( $ids ): array {
		if ( ! is_array( $ids ) ) {
			return array();
		}
		$clean = array();
		foreach ( array_slice( $ids, 0, self::MAX_EPISODES ) as $id ) {
			$episode_id = absint( $id );
			if ( $episode_id > 0 ) {
				$clean[] = $episode_id;
			}
		}
		return array_values( array_unique( $clean ) );
	}
}
