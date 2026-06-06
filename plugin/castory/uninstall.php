<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package Castory
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'castory_settings' );
delete_option( 'castory_page_ids' );

// Pages created on activation are kept intentionally — content may exist.
// To remove them on uninstall, uncomment:
/*
$page_ids = get_option( 'castory_page_ids', array() );
if ( is_array( $page_ids ) ) {
	foreach ( $page_ids as $post_id ) {
		wp_delete_post( (int) $post_id, true );
	}
}
*/
