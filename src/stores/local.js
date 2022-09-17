import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const localStore = (key, initial) => {
	const toString = (value) => JSON.stringify(value, null, 2);
	const toObj = JSON.parse;

	let saved = {};

	if (browser) {
		if (!localStorage.getItem(key)) {
			localStorage.setItem(key, toString(initial));
		}
		saved = toObj(localStorage.getItem(key));
	}

	const { subscribe, set, update } = writable(saved);

	return {
		subscribe,
		set: (value) => {
			if (!value) return;
			return set(value);
		},
		update,
		remove: () => {
			localStorage.removeItem(key);
		}
	};
};
