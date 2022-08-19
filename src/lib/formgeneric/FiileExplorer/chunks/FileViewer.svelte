<script>
	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';

	export let files = [];
</script>

<div class="file-viewer">
	{#each files as file, ix (file.id)}
		<div class="file">
			<FolderIcon />
			<p>{file.title}</p>
		</div>
	{/each}
</div>

<style lang="postcss">
	div.file-viewer {
		@apply grid grid-flow-dense justify-items-center gap-2 pt-8;
		@apply bg-zinc-800 shadow-inner border border-zinc-900;
		grid-template-columns: repeat(auto-fill, minmax(5rem, 10rem));
		grid-template-rows: repeat(auto-fill, minmax(5rem, 10rem));
		grid-column: 2;
		grid-row: 2;
	}

	.file {
		@apply h-24 w-24 bg-transparent;

		p {
			@apply text-center;
		}
	}
</style>
