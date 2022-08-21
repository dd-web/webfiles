<script>
	import ArrowDown from '$lib/shared/svg/ArrowDown.svelte';
	import AngleDown from '$lib/shared/svg/AngleDown.svelte';
	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';

	let currentLocation = 'some folder';
</script>

<div class="tool-nav">
	<button class="h-8 w-8 p-2">
		<ArrowDown class="rotate-90 h-full w-full" />
	</button>
	<button disabled class="h-8 w-8 p-2">
		<ArrowDown class="-rotate-90 h-full w-full" />
	</button>
	<div class="location">
		<div class="h-4 w-4">
			<FolderIcon />
		</div>
		<div class="seperate-arrow">
			<AngleDown class="-rotate-90" />
		</div>
		<span>
			{currentLocation}
		</span>
	</div>
</div>

<style lang="postcss">
	div.tool-nav {
		@apply flex items-center px-4 py-2;
		@apply bg-zinc-900 bg-opacity-75;
	}

	button {
		@apply fill-zinc-400 rounded-sm transition-all grid justify-items-center justify-center;
		@apply hover:bg-zinc-700 hover:bg-opacity-40;
		@apply active:opacity-50;
		@apply disabled:opacity-25 disabled:cursor-not-allowed;
	}

	div.location {
		@apply flex items-center px-2 py-1;
		@apply border border-zinc-600 border-opacity-30 w-full;

		span {
			@apply text-sm mb-1;
		}

		div.seperate-arrow {
			@apply h-full w-[0.375rem] fill-zinc-400 mx-2;
		}
	}
</style>
