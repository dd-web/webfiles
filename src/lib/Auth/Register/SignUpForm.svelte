<script>
	export let form, loading;
	export let submit = () => {},
		signin = () => {};
</script>

<form
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
			<h1 class="text-3xl font-bold text-center">Register</h1>
			<p>
				Already have an account? <button on:click={signin} type="button" class="text-blue-300 hover:underline"
					>Sign Up</button
				>
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
				autocomplete="new-password"
				required
				class="invalid:border-red-600 border-transparent"
				type="password"
				name="password"
				id="password"
			/>
		</div>

		<div class="flex flex-col mt-4">
			<label for="password-confirmation">Confirm Password</label>
			<input
				bind:value={form.passwordConfirmation}
				autocomplete="new-password"
				required
				class="invalid:border-red-600 border-transparent"
				type="password"
				name="password-confirmation"
				id="password-confirmation"
			/>
		</div>

		<!-- buttons  -->
		<div class=" mt-12">
			<button class="bg-blue-800 hover:bg-blue-600 active:opacity-75 w-full">Register</button>
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
		@apply py-2 border-none block rounded-md transition-all duration-100;
	}
</style>
