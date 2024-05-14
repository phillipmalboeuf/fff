<script lang="ts">
  import { addItem } from '$lib/services/cart.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>


<ol class="list--nostyle flex">
  <!-- {JSON.stringify(data.items.result.items)} -->
  {#each data.items.result.objects as item}
  <li class="col col--3of12">
    <!-- {#each item.itemData.imageIds.map(id => data.items.result.relatedObjects.find(object => object.id === id)) as image}
    {image.imageData.url}
    {/each} -->
    {item.itemData.name}
    <button onclick={() => addItem({ id: item.itemData.variations[0].id, name: item.itemData.name, price: Number(item.itemData.variations[0].itemVariationData.priceMoney.amount) / 100 }, 1)}>Ajouter au panier</button>
  </li>
  {/each}
</ol>


<style lang="scss">
  ol.list--nostyle {
    padding: $base;

    li {
      text-align: center;
      padding: $base * 0.5;

      button {
        width: 100%;
      }
    }
  }
</style>