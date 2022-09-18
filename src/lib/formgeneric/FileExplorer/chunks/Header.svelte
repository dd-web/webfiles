<script>
	// components
	import ToolbarButton from '$lib/shared/ToolbarButton.svelte';
	import ToolbarNewMenu from './ToolbarNewMenu.svelte';
	import HeaderNav from './HeaderNav.svelte';

	// icons
	import ScissorsIcon from '$lib/shared/svg/ScissorsIcon.svelte';
	import CopyIcon from '$lib/shared/svg/CopyIcon.svelte';
	import RenameIcon from '$lib/shared/svg/RenameIcon.svelte';
	import ShareIcon from '$lib/shared/svg/ShareIcon.svelte';
	import TrashIcon from '$lib/shared/svg/TrashIcon.svelte';
	import AngleDown from '$lib/shared/svg/AngleDown.svelte';
	import PlusIcon from '$lib/shared/svg/PlusIcon.svelte';

	export let directory;

	let toolbarNewMenuVisible = false;

	/**
	 * Toggle the "New" menu list
	 */
	const toggleNewMenu = (e) => {
		if (e.detail > 1) {
			e.preventDefault();
		}
		toolbarNewMenuVisible = !toolbarNewMenuVisible;
	};
</script>

<div class="explorer-header">
	<p>{directory.title}</p>
	<ul class="tools">
		<li>
			<ToolbarButton handler={toggleNewMenu} class="flex items-center h-10">
				<div class="new-plus-icon fill-cyan-600 group-active:opacity-50">
					<PlusIcon />
				</div>
				<span class="self-center pl-2 group-active:opacity-50">New</span>
				<div class="new-angle-icon fill-neutral-200 scale-50 group-active:opacity-50">
					<AngleDown class="fill-zinc-600" />
				</div>
			</ToolbarButton>

			<ToolbarNewMenu bind:visible={toolbarNewMenuVisible} />
		</li>
		<i />
		<li>
			<ToolbarButton class="w-10 h-10">
				<ScissorsIcon class="stroke-cyan-600 stroke-2" />
			</ToolbarButton>
		</li>
		<li>
			<ToolbarButton class="w-10 h-10">
				<CopyIcon />
			</ToolbarButton>
		</li>
		<li>
			<ToolbarButton class="w-10 h-10">
				<RenameIcon />
			</ToolbarButton>
		</li>
		<li>
			<ToolbarButton class="w-10 h-10">
				<ShareIcon />
			</ToolbarButton>
		</li>
		<li>
			<ToolbarButton class="w-10 h-10">
				<TrashIcon />
			</ToolbarButton>
		</li>
		<i />
	</ul>

	<HeaderNav {directory} />
</div>

<style lang="postcss">
	div.explorer-header {
		@apply bg-zinc-800 flex flex-col justify-end;
		grid-column: 1 / 3;
		grid-row: 1;

		ul.tools {
			@apply flex gap-4 items-center px-4 py-2;

			li {
				@apply w-auto;
			}

			i {
				@apply w-[1px] h-10 bg-white opacity-10;
			}
		}

		.new-plus-icon {
			@apply w-6 h-6 rounded-full border-zinc-600 border-2 p-1 transition-all;
			@apply grid content-center justify-items-center items-center;
		}

		.new-angle-icon {
			@apply w-8 h-8 p-2 self-center transition-all;
		}
	}
</style>
