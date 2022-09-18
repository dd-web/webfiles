import { writable, get } from 'svelte/store';
import { all } from '$root/supabaseClient';
import { getItemChildren } from '$controller/controller';

/** State stores */

/**
 * Loading state for the entirety of our data
 */
export const loading = writable(false);

/**
 * The raw data received from the server - serves as a sort of dictionary
 * for us to copy data from in order to set/update components
 *
 * @note Do not modify this. this is used by many modules
 */
const rawFilesData = writable(null);

/**
 * Our current location in the file explorer. We only have the current
 * item and it's contents available within this state.
 *
 * @type {import('svelte/store').Writable<SystemFile>}
 */
export const currentDirectory = writable({});

/**
 * Current directory children items - where we can modify items without
 * modifying the currentDirectory store
 *
 * @type {import('svelte/store').Writable<SystemFile[]>}
 */
export const currentDirectoryChildren = writable([]);

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/** State manipulation methods */

/**
 * Sets the store value for the list of raw files data from the api
 * @param {SystemFile[]} data - list of file items from the api
 */
export function setSystemFiles(data) {
	rawFilesData.set(data);
}

/**
 * Makes and returns a copy of the raw files data
 * @returns {SystemFile[]}
 */
export function getSystemFiles() {
	let dataCopy = get(rawFilesData);
	return [...dataCopy];
}

/**
 * Fetches the initial data from the server and formats it
 * for the default explorer and sidebar views
 * @returns {void}
 */
export async function init() {
	try {
		loading.set(true);

		const data = await all();
		setSystemFiles(data);

		let defaultDir = get(explorer);
		let rootItems = getItemChildren(defaultDir.id);

		currentDirectory.set(defaultDir);
		currentDirectoryChildren.set(rootItems);

		console.log('default dir', defaultDir);
		console.log('root items', rootItems);
	} catch (error) {
		console.error(error);
	} finally {
		loading.set(false);
	}
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/** Interface defaults */

/**
 * These are 'system' file types - we use them to mimc the interface of a system file
 * so we can handle displaying them the same way as folders are implemented
 */

/** File viewer default */
const explorer = writable({
	id: '$ROOT$',
	title: 'Explorer Home',
	child_namespace: '$ROOT$',
	parent_namespace: null,
	file_type: 'SYSTEM',
	visibility: {
		explorer: false,
		sidebar: false
	}
});

/** Sidebar default */
const sidebar = writable({
	id: '$SIDEBAR$',
	title: 'Sidebar',
	child_namespace: '$SIDEBAR$',
	parent_namespace: null,
	file_type: 'SYSTEM',
	visibility: {
		explorer: false,
		sidebar: false
	}
});

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/** Types */

/**
 * @typedef {System.SystemFile} SystemFile
 */
