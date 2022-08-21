<script>
	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';

	export let file = {
		id: 0,
		files: [],
		title: 'New Folder'
	};

	export let fileIx = 0;
</script>

<div id="file-{fileIx}" class="file">
	<div class="icon">
		<FolderIcon />
	</div>
	<p>{file.title}</p>
</div>

<style lang="postcss">
	.file {
		@apply h-full w-full flex flex-col justify-center items-center transition-all rounded-md;
		@apply hover:bg-black hover:bg-opacity-20;

		.icon {
			@apply h-20 w-20;
		}
	}
</style>
