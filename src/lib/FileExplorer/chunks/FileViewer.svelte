<script>
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	// components
	import FileItem from './FileItem.svelte';

	export let files = [];
	export let directory;

	/** selected file/folder/item id  */
	const selected = writable([]);
	/** overall editing mode - if false no editing is allowed and edit states will be reverted */
	const allowEditing = writable(false);

	/**
	 * Update selected store with id of the clicked item
	 * @param {string} id
	 */
	const updateSelected = (e) => {
		$allowEditing = true;
		$selected = [...$selected, e.detail.file.id];
	};

	/**
	 * Update selected store with nothing selected
	 */
	const clearSelected = () => {
		$allowEditing = false;
		$selected = [];
	};

	onMount(() => {});
</script>

<div on:click={clearSelected} class="file-viewer">
	{#each files as file, index (file.id)}
		{#if file.show_in_explorer}
			<FileItem
				{index}
				{file}
				{directory}
				selected={$selected}
				on:selectFile={updateSelected}
				editAllowed={$allowEditing}
			/>
		{/if}
	{/each}
</div>

<style lang="postcss">
	div.file-viewer {
		@apply grid grid-flow-dense justify-items-center gap-8 p-8;
		@apply bg-zinc-800 shadow-inner border border-zinc-900;
		grid-template-columns: repeat(auto-fill, minmax(5rem, 8rem));
		grid-template-rows: repeat(auto-fill, minmax(5rem, 8rem));
		grid-column: 2;
		grid-row: 2;
	}
</style>
