import { createClient } from '@supabase/supabase-js';

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
