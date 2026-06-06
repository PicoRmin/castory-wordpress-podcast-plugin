<?php
/**
 * Single castory_episode template — /episode/{slug}/
 *
 * @package Castory
 */

defined( 'ABSPATH' ) || exit;

get_header();

$episode_id = get_the_ID();
$media_type = get_post_meta( $episode_id, '_castory_media_type', true );
if ( ! is_string( $media_type ) || ! in_array( $media_type, array( 'audio', 'video' ), true ) ) {
	$media_type = 'video';
}

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in Templates::render.
echo Templates::render(
	'episode-detail',
	array(
		'episode_id' => $episode_id,
		'media_type' => $media_type,
	)
);

get_footer();
