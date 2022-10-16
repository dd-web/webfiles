<script>
	import Nav from '$lib/header/chunks/nav/Nav.svelte';
	import Profile from './chunks/profile/Profile.svelte';
	import Dropdown from './chunks/profile/chunks/Dropdown.svelte';

	let dropdownVisible = false;

	const dropdownHandler = () => {
		console.log('got to handler', dropdownVisible);
		dropdownVisible = true;
	};
</script>

<header>
	<Nav />
	<Profile on:showdropdown={dropdownHandler} />
	<Dropdown bind:visible={dropdownVisible} />
</header>

<style lang="postcss">
	header {
		@apply relative flex justify-between items-center px-4 py-2 bg-zinc-800 drop-shadow-md;
	}
</style>
