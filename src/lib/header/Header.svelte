<script>
	import Nav from '$lib/header/chunks/nav/Nav.svelte';
	import Profile from './chunks/profile/Profile.svelte';
</script>

<header>
	<Nav />
	<Profile />
</header>

<style lang="postcss">
	header {
		@apply flex justify-between items-center p-4 bg-zinc-800 drop-shadow-md;
	}
</style>
