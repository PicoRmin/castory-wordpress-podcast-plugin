<?php
/**
 * Plugin deactivation.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Runs on plugin deactivation.
 */
class Deactivator {

	public static function deactivate(): void {
		flush_rewrite_rules();
	}
}
