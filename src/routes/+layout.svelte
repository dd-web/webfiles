<script>
	import '../app.css';
	import Nav from '../lib/nav/Nav.svelte';
</script>

<Nav />
<main>
	<slot />
</main>

<style>
	main {
		@apply max-w-7xl mx-auto bg-neutral-800;
	}
</style>
