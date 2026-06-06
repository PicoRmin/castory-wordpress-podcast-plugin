<?php
/**
 * Admin settings and episode meta boxes (Phase 8.6 foundation).
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WordPress admin integration.
 */
class Admin {

	public function register_menu(): void {
		add_menu_page(
			__( 'Castory', 'castory' ),
			__( 'Castory', 'castory' ),
			'manage_options',
			'castory',
			array( $this, 'render_settings_page' ),
			'dashicons-microphone',
			58
		);

		add_submenu_page(
			'castory',
			__( 'Settings', 'castory' ),
			__( 'Settings', 'castory' ),
			'manage_options',
			'castory',
			array( $this, 'render_settings_page' )
		);
	}

	public function register_settings(): void {
		register_setting(
			'castory_settings_group',
			'castory_settings',
			array(
				'type'              => 'array',
				'sanitize_callback' => array( $this, 'sanitize_settings' ),
				'default'           => array(
					'brand_name'           => 'Castory',
					'episodes_per_page'    => 12,
					'enable_global_player' => true,
				),
			)
		);

		add_settings_section(
			'castory_general',
			__( 'General', 'castory' ),
			static function (): void {
				echo '<p>' . esc_html__( 'Configure Castory podcast platform settings.', 'castory' ) . '</p>';
			},
			'castory'
		);

		add_settings_field(
			'brand_name',
			__( 'Brand name', 'castory' ),
			array( $this, 'field_brand_name' ),
			'castory',
			'castory_general'
		);

		add_settings_field(
			'episodes_per_page',
			__( 'Episodes per page', 'castory' ),
			array( $this, 'field_episodes_per_page' ),
			'castory',
			'castory_general'
		);

		add_action( 'add_meta_boxes', array( $this, 'register_episode_meta_box' ) );
		add_action( 'save_post_castory_episode', array( $this, 'save_episode_meta' ) );
	}

	/**
	 * @param array<string, mixed>|mixed $input Raw settings.
	 * @return array<string, mixed>
	 */
	public function sanitize_settings( $input ): array {
		if ( ! is_array( $input ) ) {
			return array();
		}

		return array(
			'brand_name'           => sanitize_text_field( (string) ( $input['brand_name'] ?? 'Castory' ) ),
			'episodes_per_page'    => max( 1, (int) ( $input['episodes_per_page'] ?? 12 ) ),
			'enable_global_player' => ! empty( $input['enable_global_player'] ),
		);
	}

	public function field_brand_name(): void {
		$settings = get_option( 'castory_settings', array() );
		$value    = esc_attr( (string) ( $settings['brand_name'] ?? 'Castory' ) );
		echo '<input type="text" name="castory_settings[brand_name]" value="' . $value . '" class="regular-text" />';
	}

	public function field_episodes_per_page(): void {
		$settings = get_option( 'castory_settings', array() );
		$value    = (int) ( $settings['episodes_per_page'] ?? 12 );
		echo '<input type="number" min="1" max="100" name="castory_settings[episodes_per_page]" value="' . esc_attr( (string) $value ) . '" />';
	}

	public function render_settings_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$page_ids = get_option( 'castory_page_ids', array() );
		?>
		<div class="wrap">
			<h1><?php echo esc_html__( 'Castory Settings', 'castory' ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( 'castory_settings_group' );
				do_settings_sections( 'castory' );
				submit_button();
				?>
			</form>
			<?php if ( is_array( $page_ids ) && ! empty( $page_ids ) ) : ?>
				<h2><?php esc_html_e( 'Castory Pages', 'castory' ); ?></h2>
				<ul>
					<?php foreach ( $page_ids as $slug => $id ) : ?>
						<li>
							<strong><?php echo esc_html( (string) $slug ); ?>:</strong>
							<a href="<?php echo esc_url( get_permalink( (int) $id ) ); ?>"><?php esc_html_e( 'View', 'castory' ); ?></a>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</div>
		<?php
	}

	public function register_episode_meta_box(): void {
		add_meta_box(
			'castory_episode_details',
			__( 'Episode Details', 'castory' ),
			array( $this, 'render_episode_meta_box' ),
			'castory_episode',
			'normal',
			'high'
		);
	}

	/**
	 * @param \WP_Post $post Current post.
	 */
	public function render_episode_meta_box( \WP_Post $post ): void {
		wp_nonce_field( 'castory_save_episode_meta', 'castory_episode_meta_nonce' );

		$duration   = get_post_meta( $post->ID, '_castory_duration', true );
		$views      = get_post_meta( $post->ID, '_castory_views', true );
		$media_type = get_post_meta( $post->ID, '_castory_media_type', true ) ?: 'video';
		$media_url  = get_post_meta( $post->ID, '_castory_media_url', true );
		?>
		<p>
			<label for="castory_media_type"><strong><? esc_html_e( 'Media type', 'castory' ); ?></strong></label><br />
			<select name="castory_media_type" id="castory_media_type">
				<option value="video" <?php selected( $media_type, 'video' ); ?>><? esc_html_e( 'Video', 'castory' ); ?></option>
				<option value="audio" <?php selected( $media_type, 'audio' ); ?>><? esc_html_e( 'Audio', 'castory' ); ?></option>
			</select>
		</p>
		<p>
			<label for="castory_duration"><strong><? esc_html_e( 'Duration', 'castory' ); ?></strong></label><br />
			<input type="text" name="castory_duration" id="castory_duration" value="<?php echo esc_attr( (string) $duration ); ?>" placeholder="45:18" class="regular-text" />
		</p>
		<p>
			<label for="castory_views"><strong><? esc_html_e( 'Views', 'castory' ); ?></strong></label><br />
			<input type="number" name="castory_views" id="castory_views" value="<?php echo esc_attr( (string) $views ); ?>" min="0" />
		</p>
		<p>
			<label for="castory_media_url"><strong><? esc_html_e( 'Media URL', 'castory' ); ?></strong></label><br />
			<input type="url" name="castory_media_url" id="castory_media_url" value="<?php echo esc_url( (string) $media_url ); ?>" class="large-text" />
		</p>
		<?php
	}

	/**
	 * @param int $post_id Post ID.
	 */
	public function save_episode_meta( int $post_id ): void {
		if ( ! isset( $_POST['castory_episode_meta_nonce'] ) ||
			! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['castory_episode_meta_nonce'] ) ), 'castory_save_episode_meta' ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$media_type = isset( $_POST['castory_media_type'] ) ? sanitize_text_field( wp_unslash( $_POST['castory_media_type'] ) ) : 'video';
		$duration   = isset( $_POST['castory_duration'] ) ? sanitize_text_field( wp_unslash( $_POST['castory_duration'] ) ) : '';
		$views      = isset( $_POST['castory_views'] ) ? absint( $_POST['castory_views'] ) : 0;
		$media_url  = isset( $_POST['castory_media_url'] ) ? esc_url_raw( wp_unslash( $_POST['castory_media_url'] ) ) : '';

		update_post_meta( $post_id, '_castory_media_type', in_array( $media_type, array( 'audio', 'video' ), true ) ? $media_type : 'video' );
		update_post_meta( $post_id, '_castory_duration', $duration );
		update_post_meta( $post_id, '_castory_views', $views );
		update_post_meta( $post_id, '_castory_media_url', $media_url );
	}
}
