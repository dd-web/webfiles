import { writable, get } from 'svelte/store';
import { getSystemFiles, getExplorerTemplate } from './system';

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

/** State stores */

/**
 * History of all our navigation steps taken
 *
 * @type {import('svelte/store').Writable<NavLog[]>}
 */
const logs = writable([]);

/**
 *  Most recent navigation step taken
 *
 * @type {import('svelte/store').Writable<NavLog>}
 */
const last = writable(null);

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
 * Makes a copy of the navigation log and returns it
 *
 * @returns {NavLog[]}
 */
function getLogs() {
	let dataCopy = get(logs);
	return [...dataCopy];
}

/**
 * Makes a copy of the most recent navigation and returns it
 *
 * @returns {NavLog}
 */
function getLast() {
	let dataCopy = get(last);
	return dataCopy;
}

/**
 * finds the log with the specified id in the log list, makes a copy and returns it
 *
 * @param {number} num index of the log we want to return
 * @returns {NavLog}
 */
function getLogIndex(num = 0) {
	let dataCopy = get(logs);
	if (typeof num !== 'number') throw new Error('cannot get log with undefined index');
	return [...dataCopy].filter((log) => log.index === num)[0];
}

/**
 * Finds the log with the specified index. if the log direction is of the
 * specified direction, we ignore  it and get the one before it.
 *
 * @param {Direction} direction - ignore this direction of navigation
 */
function lastLogWithoutDirection(direction = 'BACK') {
	let currentAction = get(last);

	const findUntilNot = (index, skip = 0) => {
		if (typeof index !== 'number') return null;
		const checking = getLogIndex(index);

		return checking.direction === direction ? findUntilNot(checking.index - 1, skip + 1) : getLogIndex(index - skip);

		// if (checking.direction === direction) return findUntilNot(checking.index - 1, skip + 1);

		// const offset = getLogIndex(index - skip);
		// return offset;
	};

	const resolvedLog = findUntilNot(currentAction.index, 0);

	return resolvedLog;
}

/**
 * Create a new entry into the navigation log
 *
 * @param {Direction} direction - method of navigation we're using
 * @param {string} to id of the folder we're going into
 * @param {string} from id of the folder we just left
 * @returns {NavLog} the newly created log
 */
function createLog(direction, to, from) {
	if (!directions.includes(direction)) throw new Error('Cannot create navigation log for unknown direction');

	let lastNav = get(last);
	let currentLogs = get(logs);

	let index = !lastNav ? 0 : lastNav.index + 1;

	let newLog = {
		index: index,
		last: index === 0 ? null : index - 1,
		next: index + 1,
		direction: direction,
		to: to,
		from: from,
		at: new Date()[Symbol.toPrimitive]('string')
	};

	let newLogList = lastNav === null ? [newLog] : [...currentLogs, newLog];

	logs.set(newLogList);
	last.set(newLog);

	return newLog;
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

/** defaults */
export const directions = ['FORWARD', 'BACK', 'ROOT', 'SHORTCUT'];

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

/** exports */
export { logs as navigationLog };
export { last as navigationLast };
export { createLog as createNavLog };
export { getLogs as getNavLogs };
export { getLast as getNavLast };
export { getLogIndex as getNavLogIx };
export { lastLogWithoutDirection as getLastLogSkipDir };

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

/** types */

/**
 * @typedef {System.NavDirectionStrings} Direction
 * @typedef {System.NavLog} NavLog
 */
