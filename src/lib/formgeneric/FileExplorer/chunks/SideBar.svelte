<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { sidebarItems } from '$lib/generics';

	import Toggle from '$lib/shared/Toggle.svelte';
	import AngleDown from '$lib/shared/svg/AngleDown.svelte';

	const sidebarItemList = writable([]);

	onMount(() => {
		$sidebarItemList = sidebarItems();
		console.log('sidebar items:', $sidebarItemList);
	});
</script>

<ul class="sidebar-root">
	{#each $sidebarItemList as item}
		<Toggle startHidden={true}>
			<li class="flex items-center" let:toggle let:extended slot="static">
				<button on:click={toggle} class="p-2 pt-1 w-8 h-8 mr-2">
					<AngleDown class="fill-zinc-600 scale-75 {extended ? 'rotate-0' : '-rotate-90'}" />
				</button>
				<div class="h-4 w-4">
					<svelte:component this={item.icon.src} {...item.icon.props} slot="icon" />
				</div>
				<h2 class="text-sm font-normal p-0 ml-2 pb-1">{item.title}</h2>
			</li>
			<!-- subitems -->
			<ul slot="dynamic" class="flex flex-col text-sm">
				{#each item.contains as subitem}
					<li class="pl-12">
						<button class="py-1 pl-2 flex items-center border-l border-zinc-800">
							<div class="w-4 ">
								<svelte:component this={subitem.icon.src} {...subitem.icon.props} />
							</div>
							<h3 class="text-sm font-normal p-0 ml-2">
								{subitem.title}
							</h3>
						</button>
					</li>
				{:else}
					<p>Empty Folder</p>
				{/each}
			</ul>
		</Toggle>
	{:else}
		<li>Cannot Find File System</li>
	{/each}
</ul>

<style lang="postcss">
	li {
		@apply hover:bg-zinc-800 hover:bg-opacity-50 transition-all duration-100;
	}

	ul.sidebar-root {
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
