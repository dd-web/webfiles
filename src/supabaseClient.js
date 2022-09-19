import { createClient } from '@supabase/supabase-js';
import { setSystemFiles, resyncData } from './stores/system';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const all = async () => {
	const res = await supabase
		.from('system_file')
		.select('*')
		.then(({ data }) => {
			return data;
		})
		.catch((err) => {
			console.error('Supabase error!', err);
		});

	return res;
};

export const create = async (obj) => {
	const res = await supabase
		.from('system_file')
		.insert([
			{
				title: obj.title,
				child_namespace: obj.child_namespace,
				parent_namespace: obj.parent_namespace,
				file_type: obj.file_type,
				parent_id: obj.parent_id
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
	const res = await supabase
		.from('system_file')
		.update({
			title: obj.title,
			parent_id: obj.parent_id,
			child_namespace: obj.child_namespace,
			parent_namespace: obj.parent_namespace
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
