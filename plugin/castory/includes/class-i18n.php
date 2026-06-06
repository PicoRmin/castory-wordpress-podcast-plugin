<?php
/**
 * Internationalization.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load plugin text domain.
 */
class I18n {

	public static function load_plugin_textdomain(): void {
		load_plugin_textdomain(
			'castory',
			false,
			dirname( CASTORY_PLUGIN_BASENAME ) . '/languages/'
		);
	}
}
