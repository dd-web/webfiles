<script>
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
</script>

<Header />
<main>
	<slot />
</main>

<style lang="postcss">
	main {
		@apply max-w-7xl mx-auto bg-neutral-800 my-4 h-full px-4 py-2;
	}
</style>
