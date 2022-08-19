<script>
	import ScissorsIcon from '$lib/shared/svg/ScissorsIcon.svelte';
	import CopyIcon from '$lib/shared/svg/CopyIcon.svelte';
	import RenameIcon from '$lib/shared/svg/RenameIcon.svelte';
	import ShareIcon from '$lib/shared/svg/ShareIcon.svelte';
	import TrashIcon from '$lib/shared/svg/TrashIcon.svelte';
	import AngleDown from '$lib/shared/svg/AngleDown.svelte';
	import PlusIcon from '$lib/shared/svg/PlusIcon.svelte';

	import IconButton from '$lib/shared/IconButton.svelte';
</script>

<div class="explorer-head">
	<ul class="tools">
		<li>
			<IconButton class="flex items-center h-10">
				<div class="new-plus-icon fill-cyan-600">
					<PlusIcon />
				</div>
				<span class="self-center pl-2">New</span>
				<div class="new-angle-icon fill-neutral-200 scale-50">
					<AngleDown />
				</div>
			</IconButton>
		</li>
		<i />
		<li>
			<IconButton class="w-10 h-10">
				<ScissorsIcon class="stroke-cyan-600 stroke-2" />
			</IconButton>
		</li>
		<li>
			<IconButton class="w-10 h-10">
				<CopyIcon class="fill-inherit pointer-events-none" />
			</IconButton>
		</li>
		<li>
			<IconButton class="w-10 h-10">
				<RenameIcon class="fill-inherit pointer-events-none" />
			</IconButton>
		</li>
		<li>
			<IconButton class="w-10 h-10">
				<ShareIcon class="fill-inherit pointer-events-none" />
			</IconButton>
		</li>
		<li>
			<IconButton class="w-10 h-10">
				<TrashIcon class="fill-inherit pointer-events-none" />
			</IconButton>
		</li>
		<i />
	</ul>
</div>

<style lang="postcss">
	div.explorer-head {
		@apply bg-zinc-800;
		grid-column: 1 / 3;
		grid-row: 1;
	}

	ul.tools {
		@apply flex gap-4 items-center h-full px-4;

		li {
			@apply w-auto;
		}

		i {
			@apply w-[1px] h-10 bg-white opacity-10;
		}
	}

	.new-plus-icon {
		@apply w-6 h-6 rounded-full border-zinc-600 border-2 p-1 grid content-center justify-items-center items-center;
	}

	.new-angle-icon {
		@apply w-8 h-8 p-2 self-center;
	}
</style>
