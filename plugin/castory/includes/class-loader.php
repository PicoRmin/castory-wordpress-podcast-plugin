<?php
/**
 * Register WordPress hooks.
 *
 * @package Castory
 */

declare(strict_types=1);

namespace Castory;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Hook loader — collects actions/filters and registers them on run().
 */
class Loader {

	/** @var array<int, array{hook:string, component:object, callback:string, priority:int, accepted_args:int}> */
	private array $actions = array();

	/** @var array<int, array{hook:string, component:object, callback:string, priority:int, accepted_args:int}> */
	private array $filters = array();

	/**
	 * @param object $component Class instance.
	 */
	public function add_action( string $hook, object $component, string $callback, int $priority = 10, int $accepted_args = 1 ): void {
		$this->actions = $this->add( $this->actions, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * @param object $component Class instance.
	 */
	public function add_filter( string $hook, object $component, string $callback, int $priority = 10, int $accepted_args = 1 ): void {
		$this->filters = $this->add( $this->filters, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * @param array<int, array<string, mixed>> $hooks Existing hooks.
	 * @param object                          $component Class instance.
	 * @return array<int, array<string, mixed>>
	 */
	private function add( array $hooks, string $hook, object $component, string $callback, int $priority, int $accepted_args ): array {
		$hooks[] = array(
			'hook'          => $hook,
			'component'     => $component,
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		);
		return $hooks;
	}

	public function run(): void {
		foreach ( $this->filters as $hook ) {
			add_filter(
				$hook['hook'],
				array( $hook['component'], $hook['callback'] ),
				$hook['priority'],
				$hook['accepted_args']
			);
		}

		foreach ( $this->actions as $hook ) {
			add_action(
				$hook['hook'],
				array( $hook['component'], $hook['callback'] ),
				$hook['priority'],
				$hook['accepted_args']
			);
		}
	}
}
