<script>
	import { clickOutside } from '$lib/custom_actions';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let form, loading;
	export let submit = () => {},
		signup = () => {};
</script>

<form
	use:clickOutside
	on:outclick={() => dispatch('cancel')}
	on:submit|preventDefault={submit}
	disabled={loading}
	class="bg-neutral-800 border border-zinc-600 rounded-md flex flex-col p-4 max-w-xs w-full"
>
	{#if loading}
		<div>
			<p>Loading...</p>
		</div>
	{:else}
		<div class="pt-4 mb-16 text-center">
			<h1 class="text-3xl font-bold text-center">Login</h1>
			<p>
				Not a member? <button on:click={signup} type="button" class="text-blue-300 hover:underline">Register</button>
			</p>
		</div>
		<!-- email -->
		<div class="flex flex-col">
			<label for="email">Email</label>
			<input bind:value={form.email} autocomplete="email" required type="text" name="email" id="email" />
		</div>
		<!-- password -->
		<div class="flex flex-col mt-4">
			<label for="password">Password</label>
			<input
				bind:value={form.password}
				autocomplete="current-password"
				required
				class="invalid:border-red-600 border-transparent"
				type="password"
				name="password"
				id="password"
			/>
		</div>

		<!-- buttons  -->
		<div class="flex justify-between items-center px-2 mt-12">
			<button type="submit" class="bg-blue-800 hover:bg-blue-600 active:opacity-75">Login</button>
			<button type="button" on:click={() => dispatch('cancel')} class="bg-zinc-600 hover:bg-zinc-700 active:opacity-75"
				>Cancel</button
			>
		</div>
	{/if}
</form>

<style>
	form > div > input {
		@apply mt-2 py-1 px-2 text-zinc-900;
	}

	input {
		@apply outline-none border-2 rounded-sm;
		@apply focus:border-zinc-500 focus:shadow-sm;
	}

	form > div > button {
		@apply px-6 py-2 border-none block w-auto rounded-md transition-all duration-100;
	}
</style>
