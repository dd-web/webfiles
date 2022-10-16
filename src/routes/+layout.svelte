<script>
	import '../app.css';
	import { currentUser, getUserProfile } from '$root/stores/user';
	import { newFolderTitle, userAuthWindow } from '$root/stores/modals';
	import { onMount } from 'svelte';

	import Header from '$lib/header/Header.svelte';
	import Footer from '$root/lib/footer/Footer.svelte';
	import Modal from '$root/lib/shared/Modal.svelte';
	import UserAuth from '$root/lib/Auth/UserAuth.svelte';
	import NewFileName from '$root/lib/FileExplorer/chunks/NewFileName.svelte';
</script>

{#if $newFolderTitle}
	<Modal>
		<NewFileName on:close={() => ($newFolderTitle = false)} />
	</Modal>
{/if}

{#if $userAuthWindow}
	<Modal>
		<UserAuth on:close={() => ($userAuthWindow = false)} />
	</Modal>
{/if}

<Header />
<main>
	<slot />
</main>
<Footer />

<style lang="postcss">
	main {
		@apply max-w-7xl mx-auto w-full bg-neutral-800 my-4 p-1;
	}
</style>
