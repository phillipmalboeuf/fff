<script lang="ts">
	import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

	import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Cart from './Cart.svelte'
  import Icon from './Icon.svelte'

	let { primaire, secondaire }: {
    primaire: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
    secondaire: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
  } = $props()
</script>

{#snippet more()}
<Icon label="Plus" i="down" />
{/snippet}

<header>
	<nav class="flex flex--tight_gapped">
		{#each primaire.fields.liens as link}
		<div>
			<Link className="button" {link} more={link.fields.sousLiens?.length && more} />

			{#if link.fields.sousLiens?.length}
			<nav>
				{#each link.fields.sousLiens as sousLink}
				<Link link={sousLink} />
				{/each}
			</nav>
			{/if}
		</div>
    {/each}
	</nav>

	<a href="/">
		<Icon i="logo" label="Fermières et fermiers de famille" />
	</a>

	<nav class="flex flex--tight_gapped">
		{#each secondaire.fields.liens as link}
		<div>
			<Link className="button" {link} more={link.fields.sousLiens?.length && more} />

			{#if link.fields.sousLiens?.length}
			<nav>
				{#each link.fields.sousLiens as sousLink}
				<Link link={sousLink} />
				{/each}
			</nav>
			{/if}
		</div>
    {/each}
		<Cart />
	</nav>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		padding: $base;
		pointer-events: none;
		z-index: 666;

		display: flex;

		:global(a),
		:global(button) {
			pointer-events: all;
		}

		nav {

			div {
				position: relative;

				> nav {
					position: absolute;
					z-index: -1;
					top: 100%;
					left: 0;
					min-width: $base * 8;
					padding-top: $base * 0.25;

					opacity: 0;
					transform: translateY($base * -0.5);
					transition: opacity 333ms, transform 333ms;
					visibility: hidden;
					pointer-events: all;

					:global(a) {
						display: block;
						background-color: $white;
						border-radius: $radius * 0.5;
						padding: $base * 0.5;

						&:not(:last-child) {
							border-bottom-left-radius: 0;
							border-bottom-right-radius: 0;
						}

						&:not(:first-child) {
							border-top-left-radius: 0;
							border-top-right-radius: 0;
							padding-top: 0;
						}
					}
				}

				&:hover {
					> nav {
						opacity: 1;
						transform: translateY(0);
						visibility: visible;
					}
				}
			}

			&:last-child {
				justify-content: flex-end;
			}
		}
	}
</style>
