import { writable, get } from 'svelte/store';

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

/** History of all our actions throughout the session */
const logs = writable([]);

/** Most recent action */
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
 *
 * @param {Action} type
 * @param {*} details
 */
export function createLog(type, details) {
	if (!actions.includes(type)) throw new Error('Cannot create action log for unknown action');

	let lastAction = get(last);
	let currentLogs = get(logs);

	let index = !lastAction ? 0 : lastAction.index + 1;

	let newLog = {
		index: index,
		last: index - 1,
		next: index + 1,
		action: type,
		at: new Date()[Symbol.toPrimitive]('string'),
		details: details
	};

	let newLogList = lastAction === null ? [] : [...currentLogs, lastAction];

	currentLogs.set(newLogList);
	lastAction.set(newLog);

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

export const actions = ['CREATE', 'UPDATE', 'DELETE'];

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

/** exports  */

export { logs as actionLog };
export { last as actionLast };

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
 * @typedef {System.ActionTypeStrings} Action
 */
