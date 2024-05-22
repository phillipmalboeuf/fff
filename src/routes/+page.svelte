<script lang="ts">
  import Page from './[page]/+page.svelte'

	import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<Page {data} />

<style lang="scss">
</style>
