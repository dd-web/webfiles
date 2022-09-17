import { writable, get } from 'svelte/store';

/**
 * Counter Store
 * simple number tracker with basic methods
 * @param {Number} initial value for the store to start counting at
 */
export const counterStore = (initial = 0) => {
	const counter = writable(initial);

	const { subscribe, set, update } = counter;
	return {
		subscribe,
		increment: () => update((v) => v + 1),
		decrement: () => update((v) => v - 1),
		getAndIncrease: () => {
			let crv = get(counter);
			counter.set(crv + 1);
			return crv;
		},
		reset: () => set(initial)
	};
};
