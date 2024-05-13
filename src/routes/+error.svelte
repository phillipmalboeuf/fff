<script lang="ts">
	import { page } from '$app/stores'
</script>

<main>
  <h1>{$page.status}</h1>
  <p>{$page.error.message}</p>

  <button onclick={() => history.back()}>Retour</button>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $base;
    min-height: 100vh;
  }
</style>