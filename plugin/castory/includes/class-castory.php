<?php
/**
 * Core plugin class.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Orchestrates plugin bootstrap.
 */
final class Castory {

	/** @var self|null */
	private static ?self $instance = null;

	/** @var Loader */
	private Loader $loader;

	private function __construct() {
		$this->load_dependencies();
		$this->loader = new Loader();
	}

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function load_dependencies(): void {
		require_once CASTORY_PLUGIN_DIR . 'includes/class-loader.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-i18n.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-activator.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-deactivator.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-post-types.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-templates.php';
		require_once CASTORY_PLUGIN_DIR . 'includes/class-rest-api.php';
		require_once CASTORY_PLUGIN_DIR . 'admin/class-admin.php';
		require_once CASTORY_PLUGIN_DIR . 'public/class-public.php';
		require_once CASTORY_PLUGIN_DIR . 'public/class-shortcodes.php';
	}

	public function run(): void {
		register_activation_hook( CASTORY_PLUGIN_FILE, array( Activator::class, 'activate' ) );
		register_deactivation_hook( CASTORY_PLUGIN_FILE, array( Deactivator::class, 'deactivate' ) );

		$this->loader->add_action( 'plugins_loaded', $this, 'load_textdomain' );
		$this->loader->add_action( 'init', new Post_Types(), 'register' );

		$rest = new Rest_Api();
		$this->loader->add_action( 'rest_api_init', $rest, 'register_routes' );

		if ( is_admin() ) {
			$admin = new Admin();
			$this->loader->add_action( 'admin_menu', $admin, 'register_menu' );
			$this->loader->add_action( 'admin_init', $admin, 'register_settings' );
		}

		$public = new Public_Frontend();
		$this->loader->add_action( 'wp_enqueue_scripts', $public, 'enqueue_assets' );

		$shortcodes = new Shortcodes();
		$shortcodes->register();

		$this->loader->run();
	}

	public function load_textdomain(): void {
		I18n::load_plugin_textdomain();
	}
}
