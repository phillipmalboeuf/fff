<script lang="ts">
  import type { Asset } from 'contentful'
  import Media from './Media.svelte'
  import Slider from './Slider.svelte'

  let { media }: { media: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>[] } = $props()
</script>

{#if media}
{#if media.length > 1}
<Slider dots={media.length}>
  <ol class="list--nostyle slider__container">
    {#each media as m}
    <li class="slide">
      <Media media={m} />
    </li>
    {/each}
  </ol>
</Slider>
{:else}
<Media media={media[0]} />
{/if}
{/if}