import { writable } from 'svelte/store';

export const explorer = writable({
	id: '$ROOT$',
	title: 'Explorer Home',
	child_namespace: '$ROOT$',
	parent_namespace: null,
	file_type: 'SYSTEM',
	visibility: {
		explorer: false,
		sidebar: false
	}
});

export const sidebar = writable({
	id: '$SIDEBAR$',
	title: 'Sidebar',
	child_namespace: '$SIDEBAR$',
	parent_namespace: null,
	file_type: 'SYSTEM',
	visibility: {
		explorer: false,
		sidebar: false
	}
});
