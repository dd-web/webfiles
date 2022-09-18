import { writable, get } from 'svelte/store';

/** History of all our actions throughout the session */
const log = writable([]);

/** Most recent action */
const last = writable(null);

/**
 *
 * @param {Action} type
 * @param {*} details
 */
export function createLog(type, details) {
	if (!actions.includes(type)) throw new Error('Cannot create action log for unknown action');

	let lastAction = get(last);
	let currentLogs = get(log);

	let newLog = {
		index: lastAction && lastAction?.index ? lastAction.index + 1 : 0,
		action: type,
		at: new Date(),
		details: details
	};

	currentLogs.set([...currentLogs, lastAction]);
	lastAction.set(newLog);

	return newLog;
}

export const actions = ['CREATE', 'UPDATE', 'DELETE'];

export { log as actionLog };
export { last as actionLast };

/**
 * @typedef {System.ActionTypeStrings} Action
 */
