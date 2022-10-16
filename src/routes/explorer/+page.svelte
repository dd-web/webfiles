<script>
	import FileExplorer from '$root/lib/FileExplorer/FileExplorer.svelte';
	import { authUser } from '$stores/user';

	const handleLogin = async () => {
		const res = await authUser('devduncan89@gmail.com', 'none');
	};

	export let data;
</script>

<h1 class="text-center">{data?.title}</h1>

<FileExplorer />
