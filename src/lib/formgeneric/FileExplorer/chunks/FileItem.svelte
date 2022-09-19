<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { fadeScale } from '$root/lib/custom_animations';
	import { autofocusInput } from '$root/lib/custom_actions';

	/** control method imports */
	import { changeDirectory, updateSystemFile } from '$controller/controller';

	/** components */
	import FolderIcon from '$lib/shared/svg/FolderIcon.svelte';

	/** props */
	export let file, index, directory, selected, editAllowed;

	/**
	 * Explorer item source/target drag operation state
	 */
	const source = writable(null);
	const target = writable(null);
	const isDragging = writable(false);
	const isDraggedOver = writable(false);

	$: useDragClass = $source === file.id && $isDragging;
	$: useDropClass = !$isDragging && $target === file.id && $isDraggedOver;
	$: isSelected = [...selected].includes(file.id);

	let editingFilename = false;

	$: {
		if (!editAllowed) {
			editingFilename = false;
		}
	}

	let filenameModified = file.title;

	const dispatch = createEventDispatcher();

	const internalDataType = 'files/systruct';

	const handleSelect = () => {
		dispatch('selectFile', {
			file: file,
			index: index
		});
	};

	const handleSaveChanges = async () => {
		let fileData = { title: filenameModified };

		const result = await updateSystemFile(file.id, fileData);
		console.log('save', result);
	};

	const enableEditing = () => {
		if (!isSelected) return;
		editingFilename = true;
	};

	const onDoubleClick = (id) => {
		console.log('clicked item', id, 'inside directory:', directory);
		changeDirectory('FORWARD', id);
	};

	const onDragOver = (e) => {
		e.preventDefault();
		return false;
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
	in:fadeScale={{ duration: 800 }}
	on:click|stopPropagation={handleSelect}
	on:dblclick={() => onDoubleClick(file.id)}
	on:drop={onDroppedOn}
	on:dragover={onDragOver}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragenter={onDragEnter}
	on:dragleave={onDragLeave}
	draggable={!editingFilename && selected.length <= 1}
	id="file-{index}"
	class="file"
	class:useDragClass
	class:useDropClass
	class:isSelected
	data-value={file.id}
>
	<div class="icon">
		<FolderIcon />
	</div>
	{#if editingFilename}
		<input on:blur={handleSaveChanges} use:autofocusInput bind:value={filenameModified} type="text" />
	{:else}
		<p on:click={enableEditing} class="text-center px-2 overflow-hidden whitespace-nowrap text-ellipsis">
			{file.title}
		</p>
	{/if}
</div>

<style lang="postcss">
	.file {
		@apply h-full w-full flex flex-col justify-center border-sky-100 border-opacity-0 border-2 border-dotted items-center rounded-md transition-all duration-150;
		@apply hover:bg-black hover:bg-opacity-20;

		.icon {
			@apply h-20 w-20;
		}

		input {
			@apply w-auto mx-1 text-black outline-none border-2 border-transparent;
			@apply focus-within:border-sky-400;
			align-self: normal;
		}
	}

	.isSelected {
		@apply bg-white bg-opacity-25;
		@apply hover:bg-opacity-5 hover:bg-white;
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
