<script>
	import FileItem from './FileItem.svelte';

	export let files = [];
</script>

<div class="file-viewer">
	{#each files as file, ix (file.id)}
		<FileItem fileIx={ix} {file} />
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
