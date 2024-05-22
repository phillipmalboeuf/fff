<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  // import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'
  import Gallery from './Gallery.svelte';
  import Rich from './Rich.svelte';

  let { item } : {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section class="flex flex--gapped">
  <main class="flex flex--gapped flex--column {item.fields.couleur}">
    <h2>{item.fields.titre}</h2>

    {#if item.fields.sousTitre}
    <h5 class="h5--mono">{item.fields.sousTitre}</h5>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.lien}
    <nav>
      <Link class="button button--grey" link={item.fields.lien} />
    </nav> 
    {/if}
  </main>

  {#if item.fields.media}
  <figure>
    <Gallery media={item.fields.media} />
  </figure>
  {/if}
  <!-- <hr>
  

  {#if item.fields.title}
  <h3 class="col col--6of12 col--mobile--12of12">{item.fields.title}</h3>
  {/if}

  {#if item.fields.body}
  <main class="col col--6of12 col--mobile--12of12 flex flex--gapped">
    <Document body={item.fields.body} />
  </main>
  {/if}

  {#if item.fields.buttons}
  <nav>
    {#each item.fields.buttons as button}
    <Link class="button button--green" link={button} />
    {/each}
  </nav>
  {/if} -->
</section>

<style lang="scss">
  main {
    padding: $gap;
  }

  figure {
    :global(img),
    :global(video) {
      max-height: 66vh;
    }
  }
</style>