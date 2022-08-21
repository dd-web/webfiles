<script>
	import { clickOutside } from '$lib/custom_actions';
	import { slide } from 'svelte/transition';

	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';

	export let visible;

	const handleOutClick = () => {
		visible = false;
	};

	const handleNewFolder = () => {
		console.log('make new folder');
	};
</script>

{#if visible}
	<ul use:clickOutside on:outclick={handleOutClick} transition:slide|local={{ duration: 300 }}>
		<li>
			<button on:click={handleNewFolder} class="group">
				<div class="icon group-active:opacity-50">
					<FolderIcon />
				</div>
				<span class="group-active:opacity-50">Folder</span>
			</button>
		</li>
		<li>
			<button class="group">
				<div class="icon group-active:opacity-50">
					<FolderIcon />
				</div>
				<span class="group-active:opacity-50">Folder with a longer name</span>
			</button>
		</li>
	</ul>
{/if}

<style lang="postcss">
	ul {
		@apply absolute bg-zinc-800 p-2 rounded-md border-2 border-zinc-600 border-opacity-50 z-10;

		li {
			button {
				@apply flex items-center py-2 px-4 rounded-md w-full transition-all;
				@apply hover:bg-zinc-900 hover:bg-opacity-50;
				@apply active:bg-zinc-900 active:bg-opacity-75;

				.icon {
					@apply h-4 w-4 transition-all;
				}

				span {
					@apply ml-2;
				}
			}
		}
	}
</style>
