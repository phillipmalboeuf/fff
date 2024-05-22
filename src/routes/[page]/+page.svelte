<script lang="ts">
  import { isTypeHero, isTypeText } from '$lib/clients/content_types'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#each data.page.fields.contenu as item, i}
<section id={item.fields.id}>
  {#if isTypeHero(item)}
  <Hero {item} next={data.page.fields.contenu[i+1]?.fields.id} />
  {:else if isTypeText(item)}
  <Text {item} />
  {/if}
</section>
{/each}