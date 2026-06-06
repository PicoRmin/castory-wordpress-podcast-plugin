<?php
/**
 * Per-user playback progress (Phase 9.3).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Stores episode playback positions in user meta.
 */
class User_Progress {

	public const META_KEY = '_castory_playback_progress';

	/**
	 * @return array<string, array{currentTime: float, duration: float, updatedAt: int}>
	 */
	public static function get_map( int $user_id ): array {
		$raw = get_user_meta( $user_id, self::META_KEY, true );
		return is_array( $raw ) ? $raw : array();
	}

	/**
	 * @return array{currentTime: float, duration: float, updatedAt: int}|null
	 */
	public static function get_position( int $user_id, int $episode_id ): ?array {
		$map = self::get_map( $user_id );
		$key = (string) $episode_id;
		return isset( $map[ $key ] ) && is_array( $map[ $key ] ) ? $map[ $key ] : null;
	}

	public static function set_position( int $user_id, int $episode_id, float $current_time, float $duration ): void {
		$map = self::get_map( $user_id );
		$map[ (string) $episode_id ] = array(
			'currentTime' => max( 0, $current_time ),
			'duration'    => max( 0, $duration ),
			'updatedAt'   => time(),
		);
		update_user_meta( $user_id, self::META_KEY, $map );
	}
}
