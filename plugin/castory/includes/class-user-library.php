<?php
/**
 * Per-user bookmarks and watch-later lists (Phase 9.3).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Stores bookmark / watch-later episode IDs in user meta.
 */
class User_Library {

	public const META_BOOKMARKS   = '_castory_bookmarks';
	public const META_WATCH_LATER = '_castory_watch_later';

	/**
	 * @return list<int>
	 */
	public static function get_bookmarks( int $user_id ): array {
		return self::normalize_ids( get_user_meta( $user_id, self::META_BOOKMARKS, true ) );
	}

	/**
	 * @return list<int>
	 */
	public static function get_watch_later( int $user_id ): array {
		return self::normalize_ids( get_user_meta( $user_id, self::META_WATCH_LATER, true ) );
	}

	/**
	 * @param list<int> $ids Episode IDs.
	 */
	public static function set_bookmarks( int $user_id, array $ids ): void {
		update_user_meta( $user_id, self::META_BOOKMARKS, self::normalize_ids( $ids ) );
	}

	/**
	 * @param list<int> $ids Episode IDs.
	 */
	public static function set_watch_later( int $user_id, array $ids ): void {
		update_user_meta( $user_id, self::META_WATCH_LATER, self::normalize_ids( $ids ) );
	}

	public static function toggle_bookmark( int $user_id, int $episode_id ): bool {
		$list = self::get_bookmarks( $user_id );
		$idx  = array_search( $episode_id, $list, true );
		if ( false === $idx ) {
			$list[] = $episode_id;
			self::set_bookmarks( $user_id, $list );
			return true;
		}
		array_splice( $list, (int) $idx, 1 );
		self::set_bookmarks( $user_id, $list );
		return false;
	}

	public static function toggle_watch_later( int $user_id, int $episode_id ): bool {
		$list = self::get_watch_later( $user_id );
		$idx  = array_search( $episode_id, $list, true );
		if ( false === $idx ) {
			$list[] = $episode_id;
			self::set_watch_later( $user_id, $list );
			return true;
		}
		array_splice( $list, (int) $idx, 1 );
		self::set_watch_later( $user_id, $list );
		return false;
	}

	/**
	 * @return array{bookmarks: list<int>, watchLater: list<int>}
	 */
	public static function get_all( int $user_id ): array {
		return array(
			'bookmarks'  => self::get_bookmarks( $user_id ),
			'watchLater' => self::get_watch_later( $user_id ),
		);
	}

	/**
	 * @param mixed $raw Raw user meta.
	 * @return list<int>
	 */
	private static function normalize_ids( $raw ): array {
		if ( ! is_array( $raw ) ) {
			return array();
		}
		$ids = array_map( 'absint', $raw );
		$ids = array_filter( $ids );
		return array_values( array_unique( $ids ) );
	}
}
