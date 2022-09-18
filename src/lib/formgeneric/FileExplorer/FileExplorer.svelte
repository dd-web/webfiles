<script>
	import { onMount, onDestroy } from 'svelte';
	import { currentDirectory, currentDirectoryChildren, init } from '$root/stores/system';

	import SideBar from './chunks/SideBar.svelte';
	import Header from './chunks/Header.svelte';
	import FileViewer from './chunks/FileViewer.svelte';

	// const unsubscribeHistory = fileSystemState.history((logs) => {
	// 	console.log('history stack', logs);
	// });

	onMount(async () => {
		await init();
	});

	// onDestroy(unsubscribeHistory);
</script>

<section>
	<Header />
	<SideBar />
	<FileViewer files={$currentDirectoryChildren} directory={$currentDirectory} />
</section>

<style lang="postcss">
	section {
		@apply grid;
		grid-template-columns: 15rem 45fr;
		grid-template-rows: 7.5rem 45rem;
	}
</style>
