<script>
	import { onMount, onDestroy } from 'svelte';

	import { folderTemplate, rootDefault, internalRoot } from '$lib/generics';
	import { fileSystemState } from '$stores/filesystem';

	import SideBar from './chunks/SideBar.svelte';
	import Header from './chunks/Header.svelte';
	import FileViewer from './chunks/FileViewer.svelte';

	const unsubscribeHistory = fileSystemState.history((logs) => {
		console.log('history stack', logs);
	});

	onMount(() => {});

	onDestroy(unsubscribeHistory);
</script>

<section>
	<Header />
	<SideBar />
	<FileViewer />
</section>

<style lang="postcss">
	section {
		@apply grid;
		grid-template-columns: 15rem 45fr;
		grid-template-rows: 7.5rem 45rem;
	}
</style>
