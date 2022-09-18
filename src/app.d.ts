// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Locals {}
}

declare namespace System {
	type CurrentLocation = {
		subscribe: import('svelte/store').Writable<SystemFile[]>['subscribe'];
		set: import('svelte/store').Writable<SystemFile[]>['set'];
		update: import('svelte/store').Writable<SystemFile[]>['update'];
	};

	enum FileTypes {
		'FOLDER',
		'SHORTCUT',
		'MEDIA',
		'BINARY',
		'SYSTEM'
	}

	enum ActionTypes {
		'CREATE',
		'UPDATE',
		'DELETE'
	}

	enum NavigateDirections {
		'FORWARD',
		'BACK',
		'ROOT',
		'SHORTCUT'
	}

	type Visibility = {
		explorer: boolean;
		sidebar: boolean;
	};

	type FileTypeStrings = keyof typeof FileTypes;
	type NavDirectionStrings = keyof typeof NavigateDirections;
	type ActionTypeStrings = keyof typeof ActionTypes;

	declare interface SystemFile {
		id: string | '$ROOT$';
		title: string;
		child_namespace: string;
		parent_namespace: string;
		file_type: FileTypeStrings;
		visibility: Visibility;
		contains: SystemFile[] | [];
	}

	function filterField<Type>(data: Type[], field: string = 'parent_id', id: string = '$ROOT$'): Type[] {
		return data.filter((item) => item[field] === id);
	}

	declare interface ActionTypeFields {
		create: {
			file_type: FileTypeStrings;
			data: object;
		};
		edit: {
			id: string;
		};
	}

	type ActionLog = {
		index: number;
		direction: NavDirectionStrings;
		to: string;
		from: string;
		at: Date | string;
	};
}
