<script lang="ts">

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<!-- {#each data.page.fields.contenu as item}
{JSON.stringify(item)}
{/each} -->