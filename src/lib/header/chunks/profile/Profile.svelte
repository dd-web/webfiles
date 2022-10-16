<script>
	import { currentUser, getUserProfile, currentSession } from '$root/stores/user';
	import { userAuthWindow } from '$root/stores/modals';

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	import UserCircle from '$lib/shared/svg/UserCircle.svelte';

	let loading = false;

	onMount(async () => {
		loading = true;
		await getUserProfile()
			.catch((err) => {
				console.log('err', err);
			})
			.finally(() => {
				loading = false;
			});
	});
</script>

<div>
	{#if !$currentUser}
		<button on:click={() => ($userAuthWindow = true)} class="text-blue-300 hover:underline">Sign in</button>
	{:else}
		<div class="flex items-center">
			<span class="mr-2 text-zinc-400">{$currentUser?.email.split('@')[0]}</span>
			<button on:click={() => dispatch('showdropdown')} class="w-10 block fill-zinc-900 rounded-full bg-zinc-700">
				<UserCircle />
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	div {
		@apply ml-auto mr-2;
	}
</style>
