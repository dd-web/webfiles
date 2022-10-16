import { writable, get } from 'svelte/store';
import { allUserFiles, allSystemFiles } from '$root/supabaseClient';
import { getItemChildren, getItem } from '$root/lib/FileExplorer/controller/controller';

/** State stores */

/**
 * Loading state for the entirety of our data
 */
export const loading = writable(false);

/**
 * Editing state is on only while user is actively in an explicit edit mode
 * on any of the internal components
 */
export const editing = writable(false);

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
 *
 * @param {SystemFile[]} data - list of file items from the api
 */
export function setSystemFiles(data) {
	rawFilesData.set(data);
}

/**
 * Makes and returns a copy of the raw files data
 *
 * @returns {SystemFile[]}
 */
export function getSystemFiles() {
	let dataCopy = get(rawFilesData);
	return [...dataCopy];
}

/**
 * makes and returns a copy of the root system state
 *
 * @returns {SystemFile}
 */
export function getExplorerTemplate() {
	let template = get(explorer);
	return template;
}

/**
 * Fetches the initial data from the server and formats it
 * for the default explorer and sidebar views
 *
 * @returns {void}
 */
export async function init() {
	try {
		loading.set(true);

		let defaultDir = getExplorerTemplate();
		currentDirectory.set(defaultDir);

		await resyncData();

		// const data = await allUserFiles();
		// console.log('all USER files', data);

		// const allSysFiles = await allSystemFiles();
		// console.log('all SYS files', allSysFiles);

		// setSystemFiles(data);

		// let rootItems = getItemChildren(defaultDir.id);

		// currentDirectoryChildren.set(rootItems);
	} catch (error) {
		console.error(error);
	} finally {
		loading.set(false);
	}
}

/**
 * Ensures the data in current directory/children is up to date
 * on the view.
 *
 * this needs to be updated to modify the data of each child item instead
 * of replacing all of it - it's causing the order of items to change after
 * updating an item.
 * @returns {void}
 */
export async function resyncData() {
	try {
		loading.set(true);

		const userFiles = await allUserFiles();
		const allSysFiles = await allSystemFiles();

		if (!userFiles || !allSysFiles) throw new Error('Could not contact server');

		let aggregate = [...userFiles, ...allSysFiles];

		setSystemFiles(aggregate);

		let insideDir = get(currentDirectory);
		let updatedDir = getItem(insideDir.id);
		currentDirectory.set(updatedDir);

		let rootItems = getItemChildren(updatedDir.id);
		currentDirectoryChildren.set(rootItems);
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
