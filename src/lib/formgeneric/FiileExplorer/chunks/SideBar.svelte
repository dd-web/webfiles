<ul>
	{#each Array(100) as item}
		<li>{item} Folder or soemthing</li>
	{/each}
	<li>Folder or soemthing</li>
	<li>Folder or soemthing</li>
	<li>Folder or soemthing</li>
</ul>

<style lang="postcss">
	ul {
		@apply bg-zinc-900 overflow-y-scroll;
		grid-column: 1;
		grid-row: 2;
	}

	ul::-webkit-scrollbar {
		@apply w-4;
	}

	ul::-webkit-scrollbar-track {
		@apply bg-neutral-800;
	}

	ul::-webkit-scrollbar-thumb {
		@apply bg-zinc-700 bg-opacity-40 rounded-sm;
	}

	ul::-webkit-scrollbar-thumb:hover {
		@apply bg-opacity-70;
	}

	ul::-webkit-scrollbar-thumb:active {
		@apply bg-opacity-50;
	}
</style>
