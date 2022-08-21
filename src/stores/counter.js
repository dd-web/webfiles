import { writable } from 'svelte/store';


/**
 * Counter Store
 * simple number tracker with basic methods
 * @param {Number} initial value for the store to start counting at
 */
export const counterStore = (initial = 0) => {
	const { subscribe, set, update } = writable(initial);
	return {
		subscribe,
		increment: () => update((v) => v + 1),
		decrement: () => update((v) => v - 1),
		reset: () => set(initial)
	};
};


