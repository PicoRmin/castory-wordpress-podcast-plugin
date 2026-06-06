<?php
/**
 * Sample episode importer — seeds CPT from mock catalog on activation.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Imports demo episodes when none exist.
 */
class Sample_Data {

	/**
	 * Import sample episodes if the site has no published castory_episode posts.
	 */
	public static function import_if_empty(): void {
		$existing = wp_count_posts( 'castory_episode' );
		if ( $existing && (int) $existing->publish > 0 ) {
			return;
		}

		self::import();
	}

	public static function backfill_creator_names(): int {
		$updated = 0;

		foreach ( self::get_catalog() as $item ) {
			if ( empty( $item['creator'] ) || empty( $item['title'] ) ) {
				continue;
			}

			$query = new \WP_Query(
				array(
					'post_type'      => 'castory_episode',
					'title'          => $item['title'],
					'posts_per_page' => 1,
					'post_status'    => 'any',
					'fields'         => 'ids',
				)
			);

			if ( ! $query->have_posts() ) {
				continue;
			}

			$post_id = (int) $query->posts[0];
			$current = get_post_meta( $post_id, '_castory_creator_name', true );
			if ( is_string( $current ) && '' !== trim( $current ) ) {
				continue;
			}

			update_post_meta( $post_id, '_castory_creator_name', $item['creator'] );
			++$updated;
		}

		return $updated;
	}

	public static function import(): int {
		$items   = self::get_catalog();
		$created = 0;

		foreach ( $items as $item ) {
			if ( self::episode_exists( $item['title'] ) ) {
				continue;
			}

			$post_id = wp_insert_post(
				array(
					'post_title'   => $item['title'],
					'post_content' => $item['description'],
					'post_excerpt' => wp_trim_words( $item['description'], 30 ),
					'post_status'  => 'publish',
					'post_type'    => 'castory_episode',
					'post_author'  => get_current_user_id() ?: 1,
				),
				true
			);

			if ( is_wp_error( $post_id ) ) {
				continue;
			}

			update_post_meta( $post_id, '_castory_media_type', $item['media_type'] );
			update_post_meta( $post_id, '_castory_duration', $item['duration'] );
			update_post_meta( $post_id, '_castory_views', $item['views'] );
			update_post_meta( $post_id, '_castory_thumbnail_url', $item['thumbnail'] );
			if ( ! empty( $item['creator'] ) ) {
				update_post_meta( $post_id, '_castory_creator_name', $item['creator'] );
			}

			if ( ! empty( $item['category'] ) ) {
				wp_set_object_terms( $post_id, array( $item['category'] ), 'castory_category' );
			}

			++$created;
		}

		return $created;
	}

	private static function episode_exists( string $title ): bool {
		$query = new \WP_Query(
			array(
				'post_type'      => 'castory_episode',
				'title'          => $title,
				'posts_per_page' => 1,
				'post_status'    => 'any',
			)
		);
		return $query->have_posts();
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	private static function get_catalog(): array {
		return array(
			array(
				'title'       => 'The Startup Playbook',
				'description' => 'Frameworks for building and scaling early-stage startups in 2026.',
				'creator'     => 'John Doe',
				'category'    => 'Business',
				'media_type'  => 'video',
				'duration'    => '52:10',
				'views'       => 2100000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
			),
			array(
				'title'       => 'AI Revolution',
				'description' => 'How artificial intelligence is reshaping industries worldwide.',
				'creator'     => 'Lex Friedman',
				'category'    => 'AI',
				'media_type'  => 'video',
				'duration'    => '45:18',
				'views'       => 785000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
			),
			array(
				'title'       => 'Future of SaaS Products',
				'description' => 'Product-led growth strategies for global SaaS companies.',
				'creator'     => 'Emma Watson',
				'category'    => 'Technology',
				'media_type'  => 'video',
				'duration'    => '1:04:20',
				'views'       => 1200000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
			),
			array(
				'title'       => 'Marketing in 2026',
				'description' => 'Modern marketing channels and creator-led distribution.',
				'creator'     => 'Gary Vee',
				'category'    => 'Marketing',
				'media_type'  => 'video',
				'duration'    => '39:12',
				'views'       => 500000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
			),
			array(
				'title'       => 'Design Thinking',
				'description' => 'Human-centered design for digital products.',
				'creator'     => 'Alice Johnson',
				'category'    => 'Design',
				'media_type'  => 'video',
				'duration'    => '50:30',
				'views'       => 300000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
			),
			array(
				'title'       => 'Blockchain Basics',
				'description' => 'Understanding decentralized systems and Web3 fundamentals.',
				'creator'     => 'Vitalik B.',
				'category'    => 'Crypto',
				'media_type'  => 'audio',
				'duration'    => '35:50',
				'views'       => 750000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
			),
			array(
				'title'       => 'Mindset Mastery',
				'description' => 'Mental models for high performance and focus.',
				'creator'     => 'Jamie Clear',
				'category'    => 'Mindset',
				'media_type'  => 'audio',
				'duration'    => '42:00',
				'views'       => 420000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
			),
			array(
				'title'       => 'Health & Longevity',
				'description' => 'Evidence-based habits for long-term wellness.',
				'creator'     => 'Dr. Sarah Chen',
				'category'    => 'Health',
				'media_type'  => 'audio',
				'duration'    => '38:22',
				'views'       => 310000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
			),
			array(
				'title'       => 'Creator Economy 2026',
				'description' => 'Monetization strategies for independent creators.',
				'creator'     => 'Alex Morgan',
				'category'    => 'Business',
				'media_type'  => 'audio',
				'duration'    => '55:05',
				'views'       => 890000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
			),
			array(
				'title'       => 'Deep Work Sessions',
				'description' => 'Focus techniques for knowledge workers.',
				'creator'     => 'Cal Newport',
				'category'    => 'Mindset',
				'media_type'  => 'audio',
				'duration'    => '48:15',
				'views'       => 620000,
				'thumbnail'   => 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
			),
		);
	}
}
