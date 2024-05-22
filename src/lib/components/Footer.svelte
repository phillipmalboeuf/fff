<script lang="ts">
	import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

	import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Icon from './Icon.svelte'
  import Text from './Text.svelte'

	let { footer, tertiaire }: {
    footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
    tertiaire: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">,
  } = $props()
</script>

<footer class="flex flex--gapped">
	<nav class="col {footer.fields.popup ? 'col--8of12' : 'col--12of12'} flex flex--gapped">
		{#each footer.fields.liens as link}
    <div class="col col--3of12">
      <Link {link} className="h5 h5--custom" /><br>

      {#if link.fields.sousLiens?.length}
      {#each link.fields.sousLiens as sousLink}
      <Link link={sousLink} /><br>
      {/each}
      {/if}
    </div>
    {/each}
	</nav>

  {#if footer.fields.popup}
  <aside class="col col--4of12">
    <Text item={footer.fields.popup} />
  </aside>
  {/if}

	<a href="/" class="col col--2of12">
		<Icon i="logo-square" label="Fermières et fermiers de famille" />
	</a>

	<nav class="flex flex--gapped">
		{#each tertiaire.fields.liens as link}
    <Link {link} />
    {/each}
    <a href="https://caserne.com" target="_blank" rel="external">Site Web par Caserne</a>
	</nav>
</footer>

<style lang="scss">
	footer {
		padding: $base;

    nav {

      :global(.h5) {
        display: block;
      }

      > div {
        &:last-of-type {
          margin-left: auto;
        }
      }

      &:last-of-type {
        flex: 1;
        align-self: flex-end;

        a {
          &:last-of-type {
            margin-left: auto;
          }
        }
      }
    }
	}
</style>
