import { writable, get } from 'svelte/store';
import { rootDefault, internalRoot } from '../lib/generics';
import { browser } from '$app/env';
import { localStore } from './local';

export const localStorageFiles = localStore('filesys', rootDefault);

const systemState = (initial = []) => {
	if (initial === {}) initial = [];

	console.log('initial', initial);

	/**
	 * The overall state of the structure
	 */
	const currentState = writable(initial);

	/**
	 * This is setup to mimic a system file so the root can display correctly
	 */
	const currentFolder = writable({
		id: null,
		title: 'Root',
		child_namespace: '$ROOT$',
		parent_namespace: null,
		file_type: 'SYSTEM',
		show_on_sidebar: false,
		show_in_explorer: false,
		contains: initial
	});

	/**
	 * Keeps track of where the user has been
	 */
	const history = writable([]);

	/**
	 * The most recent navigation action log. when a new navigation/action occurs,
	 * replace this and append it to the history stack.
	 */
	const lastNavStep = writable({
		step: 0,
		direction: 'neutral',
		time: new Date(),
		location: null
	});

	/**
	 * Adds a log to the component navigation history
	 *
	 * @param {String} to id of the system file we're moving to
	 */
	const addForwardHistory = (to) => {
		let historyStack = get(history);
		let prevHistory = get(lastNavStep);

		let newHistory = {
			step: prevHistory.step + 1,
			location: to,
			time: new Date(),
			direction: 'forward'
		};

		history.set([...historyStack, prevHistory]);
		lastNavStep.set(newHistory);
	};

	/**
	 * Returns root as a mimic of a system file so we don't need
	 * to do a bunch of checks to get it to display properly
	 *
	 * @returns {SystemFile}
	 */
	const getFormattedRoot = () => {
		return {
			id: null,
			title: 'Root',
			child_namespace: '$ROOT$',
			parent_namespace: null,
			file_type: 'SYSTEM',
			show_on_sidebar: false,
			show_in_explorer: false,
			contains: get(currentState)
		};
	};

	/**
	 * Find the system item with the given id
	 *
	 * @param {SystemFile[]} items
	 * @param {String} id
	 * @returns {SystemFile}
	 */
	const searchContains = (items, id) => {
		if (items instanceof Array) {
			for (const file of items) {
				if (file.id === id) return file;
				const res = searchContains(file?.contains, id);
				if (typeof res === 'object') return res;
			}
		}
	};

	/** Change the currently viewed directory */
	const changeDirectory = (id) => {
		const folder = searchContains(get(currentState), id);

		if (folder && folder?.id === id) {
			addForwardHistory(id);
			currentFolder.set(folder);
		}
	};

	return {
		subscribe: currentFolder.subscribe,
		set: currentFolder.set,
		update: currentFolder.update,
		cd: changeDirectory,
		history: history.subscribe
	};
};

// const saved = get(localStorageFiles);

export const fileSystemState = systemState(get(localStorageFiles));

/**
 * @typedef {object} SystemFile
 * @property {string} id unique id we can use to refer to this item
 * @property {string} title user friendly name for this item
 * @property {string} child_namespace a uniquely generated namespace for the folders contents (if it can have)
 * @property {string} parent_namespace parents namespace value
 * @property {string} file_type type of object this is
 * @property {boolean} show_on_sidebar should this item show up on the sidebar?
 * @property {boolean} show_in_explorer should this item show up in the explorer?
 * @property {SystemFile[]} contains files/folder inside this item (null if none)
 */
