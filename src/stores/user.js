import { writable, get } from 'svelte/store';
import { supabase } from '$root/supabaseClient';

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

/** Contains the personal user data such as email, id, role.. etc */
export const currentUser = writable(null);

/** Contains all the sessiion data, authentication tokens and such */
export const currentSession = writable(null);

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

// async function refreshSession() {
// 	let dataCopy = get(currentSession);
// 	const { data, error } = await supabase.auth.setSession(dataCopy.refresh_token);

// 	if (error) console.error('Error attempting a session refresh', error);

// 	currentSession.set(data.session);

// 	return;
// }

export function getCurrentUser() {
	let dataCopy = get(currentUser);
	return dataCopy;
}

export async function getUserProfile() {
	const { data, error } = await supabase.auth.getSession();
	console.log('user data', data);
	if (error) console.log('user error', error);

	const validated = handleError(error);
	if (!validated) return null;

	const { session } = data;
	currentSession.set(session);
	currentUser.set(session.user);

	return session;
}

/**
 * Determines if the passed arg is an error or not and returns true if it's okay to proceed
 *
 * @param {Error|String|null} err resolves to what could be an error
 * @returns
 */
export function handleError(err) {
	if (!err) return true;
	console.error('Authentication Error', err);
	return false;
}

/**
 * Set the user stores data
 *
 * @param {User} data
 */
export function setUser(data) {
	if (!data) throw new Error('Cannot set user to unknown value');
	console.log('setting user data to', data);

	let obj = {
		email: data.email,
		password: data.password
	};

	currentUser.set(obj);
}

/**
 * Attempt to authenticate a user via their personal email address and
 * a password protecting the account
 *
 * @param {String} email users email address
 * @param {String} password users password
 */
export async function loginUser(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	});

	const validated = handleError(error);
	if (!validated) return;

	const { session, user } = data;

	currentUser.set(user);
	currentSession.set(session);

	return data;
}

/**
 * Attempts to register a new account with the provided email and password
 *
 * @param {String} email users email address
 * @param {String} password users password
 * @returns
 */
export async function registerUser(email, password) {
	const { user, error } = await supabase.auth.signUp({
		email: email,
		password: password
	});

	console.log('USER', user);

	if (error) console.log('REGISTER ERROR', error);

	return user;
}

/**
 * Clears local storage of any tokens and sessions while calling the
 * back end to clear the sessions from the database
 */
export async function signOutUser() {
	console.log('sign us out');
	const { error } = await supabase.auth.signOut();

	if (error) console.error('error signing out', error);
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

/** Types */

/**
 * @typedef {System.User} User
 */
