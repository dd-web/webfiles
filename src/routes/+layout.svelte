<script>
	import '../app.css';
	import { currentUser, getUserProfile } from '$root/stores/user';
	import { onMount } from 'svelte';

	import Header from '$lib/header/Header.svelte';
	import Footer from '$root/lib/footer/Footer.svelte';
	import Modal from '$root/lib/shared/Modal.svelte';
	import UserAuth from '$root/lib/Auth/UserAuth.svelte';
</script>

<!-- <Modal>
	<UserAuth />
</Modal> -->

<Header />
<main>
	<slot />
</main>
<Footer />

<style lang="postcss">
	main {
		@apply max-w-7xl mx-auto bg-neutral-800 my-4 h-full p-1;
	}
</style>
