<script lang="ts">
  import type { TypeHeroSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  // import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'
  import Icon from './Icon.svelte';

  let { item, next } : {
    item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    next?: string
  } = $props()
</script>

<main class="flex flex--gapped flex--center flex--middle {item.fields.couleur || "Gris"}">
  <h1 class="h1--hero">{item.fields.titre}</h1>

  {#if item.fields.media?.length}
  <figure>
    <Media media={item.fields.media[0]} />
  </figure>
  {/if}

  {#if item.fields.sousTitre}
  <h5 class="h5--mono">{item.fields.sousTitre}</h5>
  {/if}

  <!-- {#if item.fields.lien}
  <nav>
    <Link className="button button--green" link={item.fields.lien} />
  </nav> 
  {/if} -->

  {#if item.fields.fleche && next}
  <a href="#{next}"><Icon i="down" label="Plus" /></a>
  {/if}
</main>

<style lang="scss">
  main {
    padding: $gap;
    text-align: center;
    min-height: 90vh;
    flex-direction: column;

    h1 {
      margin: auto 0;
    }
  }
</style>