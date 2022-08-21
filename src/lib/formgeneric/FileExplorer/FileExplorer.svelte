<script>
	import { writable } from 'svelte/store';
	import { folderTemplate, defaultFolders } from '$lib/generics';

	import SideBar from './chunks/SideBar.svelte';
	import Header from './chunks/Header.svelte';
	import FileViewer from './chunks/FileViewer.svelte';
	import { onMount } from 'svelte';

	const fileList = writable([]);
	const currentLocation = writable({ folder: null, depth: 0 });

	const newId = () => {
		let idList = $fileList.map((f) => f.id);
		return Math.max(...idList) + 1;
	};

	let name = 'david';

	onMount(() => {
		$fileList = defaultFolders();
		console.log('file list:', $fileList);
		let i = newId();
		console.log('i', i);
	});
</script>

<section>
	<Header />
	<SideBar />
	<FileViewer files={$fileList} />
</section>

<style lang="postcss">
	section {
		@apply grid;
		grid-template-columns: 15rem 45fr;
		grid-template-rows: 5rem 45rem;
	}
</style>
