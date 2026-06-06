<?php
/**
 * Widget / hero / creator data derived from CPT and taxonomies.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Builds frontend widget payloads matching CASTORY_MOCK shape.
 */
class Widget_Data {

	/** @var array<string, array{icon: string, gradient: string, id: string}> */
	private const TOPIC_META = array(
		'AI'               => array( 'icon' => '🤖', 'gradient' => 'linear-gradient(135deg, #7C3AED, #3B82F6)', 'id' => 'ai' ),
		'Business'         => array( 'icon' => '💡', 'gradient' => 'linear-gradient(135deg, #8B5CF6, #6366F1)', 'id' => 'creator-economy' ),
		'Technology'       => array( 'icon' => '⚡', 'gradient' => 'linear-gradient(135deg, #3B82F6, #06B6D4)', 'id' => 'productivity' ),
		'Marketing'        => array( 'icon' => '📣', 'gradient' => 'linear-gradient(135deg, #F59E0B, #EF4444)', 'id' => 'marketing' ),
		'Health'           => array( 'icon' => '🧘', 'gradient' => 'linear-gradient(135deg, #22C55E, #14B8A6)', 'id' => 'wellness' ),
		'Mindset'          => array( 'icon' => '⚡', 'gradient' => 'linear-gradient(135deg, #3B82F6, #06B6D4)', 'id' => 'productivity' ),
		'Design'           => array( 'icon' => '✨', 'gradient' => 'linear-gradient(135deg, #9333EA, #EC4899)', 'id' => 'design' ),
		'Crypto'           => array( 'icon' => '🔗', 'gradient' => 'linear-gradient(135deg, #6366F1, #A855F7)', 'id' => 'web3' ),
		'Startups'         => array( 'icon' => '🚀', 'gradient' => 'linear-gradient(135deg, #9333EA, #EC4899)', 'id' => 'startups' ),
	);

	/**
	 * @return array<string, mixed>
	 */
	public static function get_widgets(): array {
		$creators        = self::get_creators( 8 );
		$popular         = array_slice( $creators, 0, 6 );
		$hero_episodes   = self::get_top_episodes( 3 );
		$explore_episodes = self::get_top_episodes( 3 );
		$creator_ids     = array_map(
			static function ( array $c ): int {
				return (int) $c['id'];
			},
			array_slice( $creators, 0, 4 )
		);

		return array(
			'heroSlides'            => self::episodes_to_hero_slides( $hero_episodes ),
			'exploreHeroSlides'     => self::episodes_to_explore_slides( $explore_episodes, $creator_ids ),
			'creators'              => array_slice( $creators, 0, 4 ),
			'popularCreators'       => $popular,
			'trendingTopicsExplore' => self::get_trending_topics(),
			'discoveryStats'        => self::get_discovery_stats(),
			'tagCloud'              => self::get_tag_cloud(),
			'topics'                => self::get_home_topics(),
			'mostFollowedTopics'    => self::get_most_followed_topics(),
		);
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	public static function get_creators( int $limit = 8 ): array {
		$episodes = self::query_episodes(
			array(
				'posts_per_page' => 100,
				'orderby'        => 'meta_value_num',
				'meta_key'       => '_castory_views',
				'order'          => 'DESC',
			)
		);

		/** @var array<string, array<string, mixed>> $map */
		$map = array();

		foreach ( $episodes as $post ) {
			$name = self::get_creator_name( $post );
			if ( '' === $name ) {
				continue;
			}

			$key = strtolower( $name );
			if ( ! isset( $map[ $key ] ) ) {
				$map[ $key ] = array(
					'name'            => $name,
					'episode_count'   => 0,
					'total_views'     => 0,
					'category_counts' => array(),
					'avatar'          => '',
				);
			}

			$views    = (int) get_post_meta( $post->ID, '_castory_views', true );
			$terms    = wp_get_post_terms( $post->ID, 'castory_category', array( 'fields' => 'names' ) );
			$category = is_array( $terms ) && ! empty( $terms ) ? (string) $terms[0] : '';

			$map[ $key ]['episode_count']++;
			$map[ $key ]['total_views'] += $views;

			if ( $category ) {
				$map[ $key ]['category_counts'][ $category ] = ( $map[ $key ]['category_counts'][ $category ] ?? 0 ) + 1;
			}

			if ( ! $map[ $key ]['avatar'] ) {
				$thumb = get_the_post_thumbnail_url( $post, 'thumbnail' );
				if ( ! $thumb ) {
					$thumb = get_post_meta( $post->ID, '_castory_thumbnail_url', true ) ?: '';
				}
				$map[ $key ]['avatar'] = is_string( $thumb ) ? $thumb : '';
			}
		}

		$items = array_values( $map );
		usort(
			$items,
			static function ( array $a, array $b ): int {
				return $b['total_views'] <=> $a['total_views'];
			}
		);

		$out   = array();
		$index = 1;
		foreach ( array_slice( $items, 0, $limit ) as $row ) {
			$category = '';
			if ( ! empty( $row['category_counts'] ) ) {
				arsort( $row['category_counts'] );
				$category = (string) array_key_first( $row['category_counts'] );
			}

			$followers_count = max( 1000, (int) round( $row['total_views'] / 4 ) );
			$out[]           = array(
				'id'              => $index,
				'name'            => $row['name'],
				'followers'       => self::format_followers( $followers_count ),
				'followersCount'  => $followers_count,
				'avatar'          => $row['avatar'] ?: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
				'category'        => $category ?: 'Podcast',
				'verified'        => $row['total_views'] >= 500000,
				'episodeCount'    => (int) $row['episode_count'],
			);
			++$index;
		}

		return $out;
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	public static function get_trending( string $media_type = 'all', int $limit = 12 ): array {
		$args = array(
			'posts_per_page' => min( 50, max( 1, $limit ) ),
			'orderby'        => 'meta_value_num',
			'meta_key'       => '_castory_views',
			'order'          => 'DESC',
		);

		if ( in_array( $media_type, array( 'audio', 'video' ), true ) ) {
			$args['meta_query'] = array(
				array(
					'key'   => '_castory_media_type',
					'value' => $media_type,
				),
			);
		}

		$posts = self::query_episodes( $args );
		$api   = new Rest_Api();

		$items = array();
		foreach ( $posts as $post ) {
			$items[] = $api->format_episode_public( $post );
		}

		return $items;
	}

	/**
	 * @param array<string, mixed> $args WP_Query args.
	 * @return array<int, \WP_Post>
	 */
	private static function query_episodes( array $args ): array {
		$query = new \WP_Query(
			array_merge(
				array(
					'post_type'      => 'castory_episode',
					'post_status'    => 'publish',
					'posts_per_page' => 12,
					'no_found_rows'  => true,
				),
				$args
			)
		);

		$posts = array();
		foreach ( $query->posts as $post ) {
			if ( $post instanceof \WP_Post ) {
				$posts[] = $post;
			}
		}
		return $posts;
	}

	/**
	 * @param array<int, \WP_Post> $posts Episode posts.
	 * @return array<int, array<string, string>>
	 */
	private static function episodes_to_hero_slides( array $posts ): array {
		$slides = array();
		foreach ( $posts as $post ) {
			$terms    = wp_get_post_terms( $post->ID, 'castory_category', array( 'fields' => 'names' ) );
			$category = is_array( $terms ) && ! empty( $terms ) ? (string) $terms[0] : 'Podcast';
			$thumb    = get_the_post_thumbnail_url( $post, 'large' );
			if ( ! $thumb ) {
				$thumb = get_post_meta( $post->ID, '_castory_thumbnail_url', true ) ?: '';
			}

			$slides[] = array(
				'title'       => get_the_title( $post ),
				'category'    => $category,
				'description' => get_the_excerpt( $post ) ?: wp_trim_words( wp_strip_all_tags( $post->post_content ), 24 ),
				'image'       => is_string( $thumb ) && $thumb ? $thumb : 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600',
			);
		}
		return $slides;
	}

	/**
	 * @param array<int, \WP_Post> $posts Episode posts.
	 * @param array<int, int>      $creator_ids Creator IDs for avatar strip.
	 * @return array<int, array<string, mixed>>
	 */
	private static function episodes_to_explore_slides( array $posts, array $creator_ids ): array {
		$slides = array();
		foreach ( $posts as $post ) {
			$thumb = get_the_post_thumbnail_url( $post, 'medium_large' );
			if ( ! $thumb ) {
				$thumb = get_post_meta( $post->ID, '_castory_thumbnail_url', true ) ?: '';
			}

			$slides[] = array(
				'title'       => get_the_title( $post ),
				'description' => get_the_excerpt( $post ) ?: wp_trim_words( wp_strip_all_tags( $post->post_content ), 28 ),
				'image'       => is_string( $thumb ) && $thumb ? $thumb : 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900',
				'creators'    => $creator_ids,
			);
		}
		return $slides;
	}

	/**
	 * @return array<int, \WP_Post>
	 */
	private static function get_top_episodes( int $limit ): array {
		return self::query_episodes(
			array(
				'posts_per_page' => $limit,
				'orderby'        => 'meta_value_num',
				'meta_key'       => '_castory_views',
				'order'          => 'DESC',
			)
		);
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	private static function get_trending_topics(): array {
		$terms = get_terms(
			array(
				'taxonomy'   => 'castory_category',
				'hide_empty' => true,
				'number'     => 8,
				'orderby'    => 'count',
				'order'      => 'DESC',
			)
		);

		if ( is_wp_error( $terms ) || ! is_array( $terms ) ) {
			return array();
		}

		$topics = array();
		foreach ( $terms as $term ) {
			if ( ! $term instanceof \WP_Term ) {
				continue;
			}

			$meta = self::TOPIC_META[ $term->name ] ?? array(
				'icon'     => '🎧',
				'gradient' => 'linear-gradient(135deg, #6366F1, #A855F7)',
				'id'       => sanitize_title( $term->name ),
			);

			$topics[] = array(
				'id'             => $meta['id'],
				'title'          => $term->name,
				'episodeCount'   => (int) $term->count,
				'icon'           => $meta['icon'],
				'filterCategory' => $term->name,
				'gradient'       => $meta['gradient'],
			);
		}

		return $topics;
	}

	/**
	 * @return array<int, array<string, string>>
	 */
	private static function get_discovery_stats(): array {
		$episode_count = (int) wp_count_posts( 'castory_episode' )->publish;
		$creators      = self::get_creators( 50 );
		$topics        = wp_count_terms( array( 'taxonomy' => 'castory_category', 'hide_empty' => true ) );

		return array(
			array(
				'label' => __( 'Episodes Discovered', 'castory' ),
				'value' => self::format_compact( $episode_count ),
				'trend' => $episode_count > 0 ? '+' . min( 99, $episode_count ) . '%' : '—',
				'icon'  => '🎧',
			),
			array(
				'label' => __( 'New Creators', 'castory' ),
				'value' => (string) count( $creators ),
				'trend' => count( $creators ) > 0 ? '+' . count( $creators ) : '—',
				'icon'  => '✨',
			),
			array(
				'label' => __( 'Topics Trending', 'castory' ),
				'value' => is_numeric( $topics ) ? (string) (int) $topics : '0',
				'trend' => is_numeric( $topics ) && (int) $topics > 0 ? '+' . (int) $topics : '—',
				'icon'  => '🔥',
			),
		);
	}

	/**
	 * @return array<int, string>
	 */
	private static function get_tag_cloud(): array {
		$terms = get_terms(
			array(
				'taxonomy'   => 'castory_topic',
				'hide_empty' => false,
				'number'     => 12,
			)
		);

		if ( is_wp_error( $terms ) || ! is_array( $terms ) || empty( $terms ) ) {
			$terms = get_terms(
				array(
					'taxonomy'   => 'castory_category',
					'hide_empty' => true,
					'number'     => 12,
				)
			);
		}

		if ( is_wp_error( $terms ) || ! is_array( $terms ) ) {
			return array();
		}

		$tags = array();
		foreach ( $terms as $term ) {
			if ( $term instanceof \WP_Term ) {
				$tags[] = $term->name;
			}
		}
		return $tags;
	}

	/**
	 * @return array<int, string>
	 */
	private static function get_home_topics(): array {
		$cloud = self::get_tag_cloud();
		if ( empty( $cloud ) ) {
			$cloud = array( 'Artificial Intelligence', 'Startup Funding', 'Product Design', 'Creator Economy' );
		}

		return array_map(
			static function ( string $name ): string {
				return '# ' . $name;
			},
			array_slice( $cloud, 0, 4 )
		);
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	private static function get_most_followed_topics(): array {
		$topics = self::get_trending_topics();
		if ( empty( $topics ) ) {
			return array();
		}

		$max = max( 1, (int) $topics[0]['episodeCount'] );
		$out = array();
		foreach ( array_slice( $topics, 0, 5 ) as $topic ) {
			$out[] = array(
				'name'    => $topic['title'],
				'percent' => (int) round( ( (int) $topic['episodeCount'] / $max ) * 100 ),
			);
		}
		return $out;
	}

	private static function get_creator_name( \WP_Post $post ): string {
		$meta = get_post_meta( $post->ID, '_castory_creator_name', true );
		if ( is_string( $meta ) && '' !== trim( $meta ) ) {
			return trim( $meta );
		}
		return (string) get_the_author_meta( 'display_name', (int) $post->post_author );
	}

	private static function format_followers( int $count ): string {
		if ( $count >= 1000000 ) {
			return rtrim( rtrim( number_format( $count / 1000000, 1 ), '0' ), '.' ) . 'M';
		}
		if ( $count >= 1000 ) {
			return (string) (int) round( $count / 1000 ) . 'K';
		}
		return (string) $count;
	}

	private static function format_compact( int $count ): string {
		if ( $count >= 1000 ) {
			return rtrim( rtrim( number_format( $count / 1000, 1 ), '0' ), '.' ) . 'K';
		}
		return (string) $count;
	}
}
