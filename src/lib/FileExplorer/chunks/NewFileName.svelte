<script>
	import { createEventDispatcher } from 'svelte';
	import { autofocusInput, clickOutside } from '$root/lib/custom_actions';
	import { createSystemFile } from '$root/lib/FileExplorer/controller/controller';

	const dispatch = createEventDispatcher();

	let value = '';
	let loading = false;

	const submit = async () => {
		loading = true;
		await createSystemFile('FOLDER', value).then(() => {
			loading = false;
			dispatch('close', 'newFolderTitle');
		});
	};

	const cancel = () => {
		dispatch('close', 'newFolderTitle');
	};
</script>

<form
	on:submit|preventDefault={submit}
	use:clickOutside
	on:outclick={cancel}
	class="bg-zinc-800 flex flex-col p-4 rounded-md"
>
	<label class="mb-2" for="newfile-name">Please enter a title for your new folder</label>
	<input disabled={loading} use:autofocusInput bind:value type="text" name="newfile-name" id="newfile-name" />
	<div class="flex justify-between mt-4">
		<button type="submit" disabled={loading} class="bg-blue-800 hover:bg-blue-600 active:opacity-75">Create</button>
		<button type="button" on:click={cancel} disabled={loading} class="bg-zinc-600 hover:bg-zinc-700 active:opacity-75"
			>Cancel</button
		>
	</div>
</form>

<style>
	input {
		@apply outline-none border-2 rounded-sm text-zinc-900 py-1 px-2;
		@apply focus:border-zinc-500 focus:shadow-sm;
		@apply disabled:border-zinc-700 disabled:text-white;
	}

	button {
		@apply px-3 py-1 border-none block w-auto rounded-md transition-all duration-100;
		@apply disabled:opacity-25 disabled:hover:cursor-not-allowed;
	}
</style>
