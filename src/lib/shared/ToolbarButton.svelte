<script>
	export let handler = () => {};
</script>

<button on:click={handler} type="button" class="{$$props.class} group">
	<slot />
</button>

<style>
	button {
		@apply fill-zinc-400 rounded-lg transition-all duration-100 p-[0.625rem];
		@apply hover:fill-zinc-400 hover:bg-zinc-900 hover:bg-opacity-40;
		@apply active:bg-zinc-900 active:bg-opacity-75;
	}
</style>
