import { writable, get } from 'svelte/store';
import { getSystemFiles, currentDirectory, currentDirectoryChildren, loading } from '$root/stores/system';
import { createNavigationLog } from '$stores/navigation';
// import { all } from '$root/supabaseClient';

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

/**
 * Find all the files/folders with the specified parent_id
 *
 * @param {string} id the parent item id
 * @returns {SystemFile[]} folders/files with the supplied parent_id passed
 */
export function getItemChildren(id = '$ROOT$') {
	if (!typeof id === 'string') throw new Error('ID must be of type string.');

	let items = getSystemFiles();
	let found = [...items].filter((file) => file.parent_id === id);

	return found;
}

/**
 * Get a single system file item by it's id
 *
 * @param {string} id identifer of the item we want
 * @returns {SystemFile}
 */
export function getItem(id = '$ROOT') {
	if (!typeof id === 'string') throw new Error('ID must be of type string.');

	let items = getSystemFiles();
	let found = [...items].filter((file) => file.id === id)[0];
	return found;
}

/**
 * Setup the state to view the item with specified id
 *
 * @param {string} id id of the new item to update the view to
 * @returns {void}
 */
export function setupView(id = '$ROOT$') {
	let file = getItem(id);
	let items = getItemChildren(id);

	currentDirectory.set(file);
	currentDirectoryChildren.set(items);
}

/**
 * Update the explorer view to a new item and log the navigation action
 *
 * @param {Directions} direction how  we want to get there
 * @param {string} id of the folder to cd into
 * @returns {void}
 */
export function changeDirectory(direction = 'FORWARD', id = '$ROOT$') {
	loading.set(true);
	let currentDir = get(currentDirectory);
	createNavigationLog(direction, id, currentDir.id);
	setupView(id);
	loading.set(false);
}

/**
 * Recursively walks the branching paths of an object and
 * it's children until it finds what it's looking for, or
 * has searched entirely and has not found it.
 *
 * @param {SystemFile[]} items
 * @param {string} id
 * @returns {SystemFile}
 */
export function findDeep(items, id) {
	if (items instanceof Array) {
		for (const file of items) {
			if (file.id === id) return file;
			const res = findDeep(file?.contains, id);
			if (typeof res === 'object') return res;
		}
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

/**
 * @typedef {System.SystemFile} SystemFile
 * @typedef {System.NavDirectionStrings} Directions
 */
