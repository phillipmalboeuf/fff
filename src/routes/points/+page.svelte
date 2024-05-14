<script lang="ts">

  import type { PageData } from './$types'
  export let data: PageData
</script>


<ol class="list--nostyle flex">
  {#each data.fermes as ferme}
  <li class="col col--3of12">
    {ferme.points.map(point => point.nom)}
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
    }
  }
</style>