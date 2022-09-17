<script>
	import { fileSystemState } from '$stores/filesystem';
	import { onMount } from 'svelte';
	import FileItem from './FileItem.svelte';

	onMount(() => {});
</script>

<div class="file-viewer">
	{#each $fileSystemState.contains as file, ix (file.id)}
		{#if file.show_in_explorer}
			<FileItem fileIx={ix} {file} />
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
