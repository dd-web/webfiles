import { get } from 'svelte/store';
import {
	getSystemFiles,
	currentDirectory,
	currentDirectoryChildren,
	getExplorerTemplate,
	resyncData,
	loading
} from '$root/stores/system';
import { createNavLog, getNavLast, getNavLogs, getLastLogSkipDir } from '$stores/navigation';
import { create, update } from '$root/supabaseClient';
import { allWhitespaceInbetween } from '$lib/regexlib';

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
	if (!id || id === '$ROOT$' || !typeof id === 'string') {
		let root = getExplorerTemplate();
		return root;
	}

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

	createNavLog(direction, id, currentDir.id);
	setupView(id);
	loading.set(false);

	// let last = getNavLast();
	// let logList = getNavLogs();

	// console.log('last', last);
	// console.log('list', logList);
}

/**
 * Reverses the last navigation made
 *
 * @returns {void}
 */
export function navBack() {
	const log = getLastLogSkipDir('BACK');
	changeDirectory('BACK', log.from);
}

/**
 * Creates a new system file
 *
 * @param {FileType} type
 */
export async function createSystemFile(type, title) {
	const inside = get(currentDirectory);
	const formattedTitle = namespaceFromTitle(title);

	let file = {
		title: formattedTitle,
		child_namespace: 'new-folder',
		parent_namespace: inside.child_namespace,
		file_type: type,
		parent_id: inside.id
	};

	const res = await create(file);
	await resyncData();
}

/**
 * Update an existing system file with specified field values
 * needs field validation
 *
 * @param {string} id of the file we want to update
 * @param {SystemFile} data with the fields updated to what we want them to be
 */
export async function updateSystemFile(id, data) {
	let file = getItem(id);

	for (const field in data) {
		file[field] = data[field];
	}

	const res = await update(file);
	await resyncData();
}

/**
 * Replaces all whitespace in the string with dashes
 * and makes the entire string lower-cased.
 *
 * @param {string} title title of the system file
 * @returns {string}
 */
export function namespaceFromTitle(title = '') {
	const lowercased = title.toLocaleLowerCase();
	const noWhitespace = lowercased.replace(allWhitespaceInbetween, '-');
	return noWhitespace;
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
 * @typedef {System.FileTypeStrings} FileType
 * @typedef {System.NavDirectionStrings} Directions
 */
