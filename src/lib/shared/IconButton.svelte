<script>
	let isHovered = false;
	$: console.log('is hovered:', isHovered);

	const hoverOn = () => {
		isHovered = true;
	};

	const hoverOff = () => {
		isHovered = false;
	};
</script>

<button on:mouseenter={hoverOn} on:mouseout={hoverOff} on:blur={() => {}} class={$$props.class}>
	<slot />
</button>

<style>
	button {
		@apply fill-zinc-400 rounded-lg transition-colors duration-100 p-[0.625rem];
		@apply hover:fill-zinc-400 hover:bg-zinc-900 hover:bg-opacity-40;
	}

	.isHovered {
		@apply bg-zinc-900 bg-opacity-10;
	}
</style>
