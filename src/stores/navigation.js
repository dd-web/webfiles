import { writable, get } from 'svelte/store';
import { getSystemFiles } from './system';

/** History of all our navigation steps taken */
const log = writable([]);

/** Most recent navigation step taken */
const last = writable(null);

/**
 * Create a new entry into the navigation log
 *
 * @param {Direction} direction - method of navigation we're using
 * @param {string} to id of the folder we're going into
 * @param {string} from id of the folder we just left
 * @returns {NavigationLog} the newly created log
 */
function createLog(direction, to, from) {
	if (!directions.includes(direction)) throw new Error('Cannot create navigation log for unknown direction');

	let lastNav = get(last);
	let currentLogs = get(log);

	let newLog = {
		index: lastNav && lastNav?.index ? lastNav.index + 1 : 0,
		direction: direction,
		to: to,
		from: from,
		at: new Date()
	};

	log.set([...currentLogs, lastNav]);
	last.set(newLog);

	return newLog;
}

export { log as navigationLog };
export { last as navigationLast };
export { createLog as createNavigationLog };

export const directions = ['FORWARD', 'BACK', 'ROOT', 'SHORTCUT'];

/**
 * @typedef {System.NavDirectionStrings} Direction
 * @typedef {System.ActionLog} NavigationLog
 */
