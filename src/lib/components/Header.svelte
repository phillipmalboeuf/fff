<script lang="ts">
	import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

	import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Cart from './Cart.svelte'
  import Icon from './Icon.svelte'

	export let primaire: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
	export let secondaire: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header>
	<nav class="flex flex--tight_gapped">
		{#each primaire.fields.liens as link}
    <Link class="button" {link} />
    {/each}
	</nav>

	<a href="/">
		<Icon i="logo" label="Fermières et fermiers de famille" />
	</a>

	<nav class="flex flex--tight_gapped">
		{#each secondaire.fields.liens as link}
    <Link class="button" {link} />
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

			&:last-child {
				justify-content: flex-end;
			}
		}
	}
</style>
