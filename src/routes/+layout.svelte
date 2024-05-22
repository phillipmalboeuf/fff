<script lang="ts">
	import '../styles/styles.scss'

	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	import { page } from '$app/stores'

	import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.title}</title>
	<meta name="description" content={$page.data.page.fields.description} />
	{/if}
</svelte:head>

<div class="{$page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {$page.url.pathname.replaceAll('/', '-')}">
	<Header primaire={data.primaire} secondaire={data.secondaire} />

	<main>
		<slot />
	</main>

	<Footer footer={data.footer} tertiaire={data.tertiaire} />
</div>

<style lang="scss">
	main {
		min-height: 100vh;
	}
</style>
