import { writable, get } from 'svelte/store';

/** State stores */

/**
 * When creating a new folder it's easier to generate the namespace
 * attached to it if you already have the folder name, instead of
 * recursively updating each childs namespace later down the line which
 * may have changes and become out of sync.
 */
export const newFolderTitle = writable(false);

/**
 * User registration and authentication functionality
 */
export const userAuth = writable(false);
