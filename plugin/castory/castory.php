<?php
/**
 * Plugin Name:       Castory Podcast
 * Plugin URI:        https://castory.app
 * Description:       Premium podcast and video streaming platform for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Castory
 * Text Domain:       castory
 * Domain Path:       /languages
 *
 * @package Castory
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CASTORY_VERSION', '1.0.0' );
define( 'CASTORY_PLUGIN_FILE', __FILE__ );
define( 'CASTORY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CASTORY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CASTORY_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

require_once CASTORY_PLUGIN_DIR . 'includes/class-castory.php';

/**
 * Main plugin instance.
 *
 * @return \Castory\Castory
 */
function castory(): \Castory\Castory {
	return \Castory\Castory::instance();
}

castory()->run();
