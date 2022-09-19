import { elasticOut, quintOut } from 'svelte/easing';

export function fadeScale(node, { duration }) {
	return {
		duration,
		css: (t) => {
			const eased = elasticOut(t);
			const opa = quintOut(t);

			return `
        transform: scale(${eased});
        opacity: ${opa};`;
		}
	};
}
