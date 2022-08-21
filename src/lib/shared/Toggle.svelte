<script>
	import { slide } from 'svelte/transition';

	export let startHidden = false;

	let extended = true;

	if (startHidden) {
		extended = false;
	}

	export const toggle = (e) => {
		if (e.detail > 1) {
			e.preventDefault();
		}
		extended = !extended;
	};
</script>

<slot name="static" {toggle} {extended}>
	<p>static content required</p>
</slot>

{#if extended}
	<div transition:slide|local={{ duration: 300 }}>
		<slot name="dynamic" />

		<slot />
	</div>
{/if}
