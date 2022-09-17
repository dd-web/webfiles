<script>
	import { writable } from 'svelte/store';
	import { fileSystemState } from '$stores/filesystem';
	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';
	import { onMount, onDestroy } from 'svelte';

	/**
	 * Explorer item source/target drag operation state
	 */
	const source = writable(null);
	const target = writable(null);
	const isDragging = writable(false);
	const isDraggedOver = writable(false);

	$: useDragClass = $source === file.id && $isDragging;
	$: useDropClass = !$isDragging && $target === file.id && $isDraggedOver;

	const internalDataType = 'apsys/systruct';

	/** Props */

	/**
	 * File - a single item contained in the virtual 'hard drive' filesystem
	 * which may have contents of it's own
	 */
	export let file = {
		id: 0,
		files: [],
		title: 'New Folder'
	};

	const onClick = (id) => {
		fileSystemState.cd(id);
	};

	/**
	 * Index of the current file
	 */
	export let fileIx = 0;

	const onDragOver = (e) => {
		e.preventDefault();
		return false;
		// target.set(file.id);
		// isDraggedOver.set(true);
		// console.log('source', $source);
		// console.log('isDragging', $isDragging);
		// console.log('useDragClass', useDragClass);
		// console.log('file.id', file.id);
		// e.preventDefault();
	};

	const onDragEnter = (e) => {
		if ($target !== file.id) {
			$target = file.id;
		}

		if (!$isDraggedOver) {
			$isDraggedOver = true;
		}
	};

	const onDragLeave = (e) => {
		$target = null;
		$isDraggedOver = false;
	};

	/**
	 * Drop zone handler
	 * this is a receiver for the currently dragged item to be dropped into
	 */
	const onDroppedOn = (e) => {
		isDragging.set(false);
		let data = e.dataTransfer.getData(internalDataType);
		console.log('to be moved:', data, 'to: ', $target);
		source.set(null);
		target.set(null);
		isDraggedOver.set(false);
		e.preventDefault();
	};

	const onDragEnd = (e) => {
		source.set(null);
		target.set(null);
		isDragging.set(false);
		isDraggedOver.set(false);
	};

	const onDragStart = (e) => {
		console.log('drag started');
		source.set(file.id);
		isDragging.set(true);
		e.dataTransfer.setData(internalDataType, e.target.dataset.value);
		e.dataTransfer.effectAllowed = 'move';
	};

	onMount(() => {});
</script>

<div
	on:click={() => onClick(file.id)}
	on:drop={onDroppedOn}
	on:dragover={onDragOver}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragenter={onDragEnter}
	on:dragleave={onDragLeave}
	draggable="true"
	id="file-{fileIx}"
	class="file"
	class:useDragClass
	class:useDropClass
	data-value={file.id}
>
	<div class="icon">
		<FolderIcon />
	</div>
	<p class="text-center">{file.title}</p>
</div>

<style lang="postcss">
	.file {
		@apply h-full w-full flex flex-col justify-center border-sky-100 border-opacity-0 border-2 border-dotted items-center rounded-md transition-all duration-200;
		@apply hover:bg-black hover:bg-opacity-20;

		.icon {
			@apply h-20 w-20;
		}
	}

	.useDragClass {
		@apply opacity-40;
		filter: saturate(0.5) blur(1px);
	}

	.useDropClass {
		@apply border-2 border-dotted backdrop-blur-2xl border-sky-100 border-opacity-20;
		@apply bg-zinc-600 bg-opacity-20;

		.icon {
			@apply pointer-events-none;
		}

		p {
			@apply pointer-events-none text-center;
		}
	}
</style>
