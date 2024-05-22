<script lang="ts">
  import Page from './[page]/+page.svelte'

	import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


<section>
	<h1 class="h1--hero">Toujours de saison</h1>
	<h1 class="h1--custom">Ipsum dolor sit amet</h1>
	<h2 class="h2--custom">Consectetur elit Aliquam dapibus</h2>
	<h1>Efficitur sapien pretium pellentesque curabitur sed</h1>
	<h2>Posuere nulla aenean ultricies erat sed ligula cursus dictum curabitur tempus, enim quis sagittis mollis</h2>
	<h3>Ectus turpis posuere tortor, a tempor lectus sapien vel orci. Etiam rhoncus vehicula urna, sit amet semper turpis fringilla ac. Aenean consectetur nisl id massa vestibulum dignissim</h3>
	<h4>Ut convallis magna ut mollis auctor. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque imperdiet pulvinar volutpat. Nunc posuere id mauris eu feugiat.</h4>
	<h5>Donec eu convallis ante, ac mattis elit. Nullam et ultrices libero, id sagittis risus. Sed molestie velit a metus egestas pulvinar. Phasellus pellentesque urna quis imperdiet tincidunt. Etiam viverra ipsum consectetur elementum porttitor.</h5>
	<h6>Aenean sed lorem mattis, sagittis velit eu, pharetra quam. Nunc gravida, ligula eget interdum pellentesque, dolor turpis rutrum tellus, eu blandit purus orci pharetra justo. Sed et laoreet purus, in facilisis tellus. Aliquam eleifend elementum ligula in rhoncus.</h6>

	<p>Duis et elementum sem, sit amet eleifend mi. Donec rutrum nisi nisi, in vehicula orci interdum at. Praesent
	commodo magna tempor venenatis lacinia. Suspendisse potenti. Nullam tincidunt ac nulla non cursus.</p>

	<h4 class="h4--mono">Donec maximus dictum eros, at pulvinar nulla consectetur non. Sed laoreet id diam quis ultrices.</h4>
	<h5 class="h5--mono">Donec eu convallis ante, ac mattis elit. Nullam et ultrices libero, id sagittis risus. Sed molestie velit a metus egestas pulvinar. Phasellus pellentesque urna quis imperdiet tincidunt. Etiam viverra ipsum consectetur elementum porttitor.</h5>
	<h6 class="h6--mono">Aenean sed lorem mattis, sagittis velit eu, pharetra quam. Nunc gravida, ligula eget interdum pellentesque, dolor turpis rutrum tellus, eu blandit purus orci pharetra justo. Sed et laoreet purus, in facilisis tellus. Aliquam eleifend elementum ligula in rhoncus.</h6>

	<small>Aenean sed lorem mattis, sagittis velit eu, pharetra quam. Nunc gravida, ligula eget interdum pellentesque, dolor turpis rutrum tellus, eu blandit purus orci pharetra justo. Sed et laoreet purus, in facilisis tellus. Aliquam eleifend elementum ligula in rhoncus.</small>
	</section>


<Page {data} />

<style lang="scss">
	section {
		max-width: $max * 0.75;
		margin: $gap auto;

		display: flex;
		flex-direction: column;
		gap: $gap;
	}
</style>
