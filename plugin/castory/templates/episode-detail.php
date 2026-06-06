<?php
/**
 * Episode detail — [castory_episode id="123"]
 *
 * @package Castory
 * @var int    $episode_id  Episode post ID.
 * @var string $media_type  audio|video
 */

defined( 'ABSPATH' ) || exit;

$episode_id = isset( $episode_id ) ? absint( $episode_id ) : 0;
if ( ! $episode_id && isset( $_GET['id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$episode_id = absint( $_GET['id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
}

$media_type = isset( $media_type ) ? sanitize_key( (string) $media_type ) : 'video';
if ( $episode_id ) {
	$meta = get_post_meta( $episode_id, '_castory_media_type', true );
	if ( is_string( $meta ) && in_array( $meta, array( 'audio', 'video' ), true ) ) {
		$media_type = $meta;
	}
}

if ( 'audio' === $media_type ) {
	include CASTORY_PLUGIN_DIR . 'templates/partials/episode-audio.php';
} else {
	include CASTORY_PLUGIN_DIR . 'templates/partials/episode-video.php';
}
