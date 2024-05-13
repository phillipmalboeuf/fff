<script lang="ts">
  import { addItem } from '$lib/services/cart.svelte'

  import type { PageData } from './$types'
  export let data: PageData

  console.log(data.plans.subscriptionPlanData)
</script>


<ol class="list--nostyle flex">
  {#each data.items.result.objects as item}
  <li class="col col--3of12">
    {item.itemData.name}
    {item.itemData.variations.map(v => v.id)}
    <button onclick={() => false}>S'abonner</button>
  </li>
  {/each}
</ol>


<style lang="scss">
  ol.list--nostyle {
    padding: $base;
    padding-top: $base * 4;

    li {
      text-align: center;
      padding: $base * 0.5;

      button {
        width: 100%;
      }
    }
  }
</style>