<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Gallery from './Gallery.svelte'
  import Rich from './Rich.svelte'

  let { item } : {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section class="flex{item.fields.box ? ' flex--tight_gapped' : ''}" class:centre={item.fields.centre} class:box={item.fields.box}>
  {#if item.fields.media}
  <figure class="{item.fields.couleur} {(item.fields.box || item.fields.centre) ? ' col col--6of12 col--mobile--12of12' : ''}">
    <Gallery media={item.fields.media} />
  </figure>
  {/if}

  <main class="flex flex--gapped {item.fields.couleur} {((item.fields.box || item.fields.centre) && item.fields.media?.length) ? ' col col--6of12 col--mobile--12of12' : ''}" class:flex--column={item.fields.centre}>
    <div class="flex flex--gapped flex--column col col--6of12 col--mobile--12of12">
      {#if item.fields.titre && !item.fields.sansTitre}<h2 class:h2--custom={item.fields.centre} class:h3--custom={item.fields.box}>{item.fields.titre}</h2>{/if}

      {#if item.fields.sousTitre}
      <h5 class="h5--mono">{item.fields.sousTitre}</h5>
      {/if}
    </div>

    <div class="flex flex--gapped flex--column col col--6of12 col--mobile--12of12">
      {#if item.fields.corps}
      <Rich body={item.fields.corps} />
      {/if}

      {#if item.fields.lien}
      <nav class="flex flex--tight_gapped">
        <Link className="button button--{item.fields.couleur === 'Gris' ? 'beige' : 'grey'}" link={item.fields.lien} />
      </nav> 
      {/if}
    </div>
  </main>
</section>

<style lang="scss">
  section {

    main {
      padding: ($gap * 2);
    }

    figure {
      :global(img),
      :global(video) {
        max-height: 66vh;
      }
    }

    &.centre {
      text-align: center;
      justify-content: center;

      main {
        align-items: center;
        justify-content: center;
        min-height: 66vh;

        > div {
          width: 100%;
          align-items: center;
          max-width: $max * 0.75;

          &:first-of-type {
            max-width: $max;
          }
        }
      }

      figure {
        order: 99;
      }

      nav {
        width: auto;
      }
    }

    &.box {
      padding: ($gap * 2);
      align-items: stretch;

      figure,
      main {
        border-radius: $radius * 0.5;
        overflow: hidden;
      }

      figure {
        order: 99;
      }

      main {
        padding: $gap;
        justify-content: space-between;

        > div {
          width: 100%;

          &:first-of-type {
            text-align: center;
            align-items: center;
            margin-bottom: auto;
          }

          &:last-of-type {
            margin-top: auto;
          }
        }

        nav {
          justify-content: center;
          margin-top: $gap;
        }
      }
    }
  }
  
</style>