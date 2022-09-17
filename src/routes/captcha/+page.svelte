<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	/* Element References */
	let canvasContainer, canvas;

	const containerXY = writable({ x: 0, y: 0 });
	const constrainBy = 50; // in px'

	/**
	 * @param {Number} min - minimum constraint
	 * @param {Number} max - maximum constraint
	 */
	function randomNumBetween(min = 0, max = 100) {
		let lower = parseFloat(min),
			upper = parseFloat(max);
		return Math.floor(Math.random() * (upper - lower + 1) + lower);
	}

	/**
	 *
	 * @param context
	 */
	function generatePoint(context) {
		let constrainX = { h: $containerXY.x - constrainBy, l: 1 + constrainBy };
		let constrainY = { h: $containerXY.y - constrainBy, l: 1 + constrainBy };

		let x_1 = randomNumBetween(constrainX.l, constrainX.h);
		let x_2 = randomNumBetween(constrainX.l, constrainX.h);
		let y_1 = randomNumBetween(constrainY.l, constrainY.h);
		let y_2 = randomNumBetween(constrainY.l, constrainY.h);

		context.fillStyle = 'black';
		context.fillRect(x_1, y_1, 10, 10);
	}

	onMount(() => {
		// get final computed dimensions of canvas container for resize
		containerXY.set({
			x: canvasContainer.offsetWidth,
			y: canvasContainer.offsetHeight
		});

		console.log('contXY', $containerXY);

		if (canvas.getContext) {
			const ctx = canvas.getContext('2d');
			let frame;

			(function loop() {
				frame = requestAnimationFrame(loop);

				let gradient_1 = ctx.createLinearGradient(0, 0, 0, $containerXY.y);

				gradient_1.addColorStop(0, '#58D3F4');
				gradient_1.addColorStop(1, '#A34ECA');

				ctx.fillStyle = gradient_1;
				ctx.fillRect(0, 0, $containerXY.x, $containerXY.y);
				generatePoint(ctx);
			})();

			return () => {
				cancelAnimationFrame(frame);
			};
		}
	});
</script>

<div class="min-h-[20rem]" bind:this={canvasContainer}>
	<canvas height={$containerXY.y} width={$containerXY.x} bind:this={canvas}>Your browser does not support Canvas</canvas
	>
</div>
