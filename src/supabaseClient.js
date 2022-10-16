import { createClient } from '@supabase/supabase-js';
import { catchError } from './lib/helpers/utils';
import { setSystemFiles, resyncData } from './stores/system';
import { getCurrentUser } from './stores/user';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const allUserFiles = async () => {
	const res = await supabase
		.from('user_file')
		.select('*')
		.then(({ data }) => {
			return data;
		})
		.catch((err) => {
			console.error('Supabase error!', err);
		});

	return res;
};

/**
 * Retreive all system files (files that define the structure of the file system)
 * in order to build the rest of the system around them with the users own files
 *
 * @returns {Promise<System.SystemFile[]>} list of all system files
 */
export const allSystemFiles = async () => {
	const files = await supabase
		.from('system_file')
		.select('*')
		.then(({ data }) => {
			return data;
		})
		.catch(catchError);

	return files;
};

export const create = async (obj) => {
	let userData = getCurrentUser();

	const res = await supabase
		.from('user_file')
		.insert([
			{
				title: obj.title,
				child_namespace: obj.child_namespace,
				parent_namespace: obj.parent_namespace,
				file_type: obj.file_type,
				parent_id: obj.parent_id,
				user_id: userData.id
			}
		])
		.then((res) => {
			console.log('first return from create', res);
			console.log('res.data', res.data);
			return res.data;
		})
		.catch((err) => {
			console.error('Supabase error! (attempting to insert new system file)', err);
		});

	return res;
};

export const update = async (obj) => {
	let userData = getCurrentUser();

	const res = await supabase
		.from('user_file')
		.update({
			title: obj.title,
			parent_id: obj.parent_id,
			child_namespace: obj.child_namespace,
			parent_namespace: obj.parent_namespace,
			user_id: userData.id
		})
		.eq('id', obj.id)
		.then(({ data }) => {
			return data;
		})
		.catch((err) => {
			console.error('Supabase error! (attempting to update an existing file)', err);
		});

	return res;
};
