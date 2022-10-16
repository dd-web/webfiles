<script>
	import { currentUser, getUserProfile, currentSession } from '$root/stores/user';
	import { catchError } from '$root/lib/helpers/utils';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(async () => {
		loading = true;
		await getUserProfile()
			.catch(catchError)
			.finally(() => {
				loading = false;
			});
	});
</script>

<div>
	{#if !$currentUser}
		<a href="/login">Sign in</a>
	{:else}
		<span>{$currentUser?.email}</span>
		<span />
	{/if}
</div>

<style lang="postcss">
	div {
		@apply ml-auto mr-2;

		a {
			@apply text-blue-300 no-underline;
			@apply hover:underline;
		}
	}
</style>
