// import { counterStore } from '$stores/counter';
// import { writable, get } from 'svelte/store';
import { customAlphabet } from 'nanoid';
import { icons } from './iconlib';
import { allWhitespaceInbetween } from './regexlib';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const nanoGenId = customAlphabet(alphabet, 8);

const IFile = {
	id: 0,
	title: 'picture',
	ext: 'png'
};

const IFolder = {
	id: 0,
	title: 'new folder',
	files: []
};

/**
 * @param {Folder} folder
 * @returns {Folder}
 */
export function folderTemplate(folder = { ...IFolder }) {
	return {
		id: folder['id'] ? folder.id : 0,
		title: folder['title'] ? folder.title : 'New Folder',
		files: folder['files'] instanceof Array ? folder.files : []
	};
}

const idStore = () => {
	let currentId = 0;

	function getId() {
		let id = currentId;
		currentId++;
		return id;
	}

	return {
		get: () => getId()
	};
};

const ids = idStore();

const userName = '_%user%_';

export const sidebarItems = () => {
	return [
		{
			id: ids.get(),
			title: 'Quick access',
			icon: icons.icon_solidStar,
			iconLg: null,
			show_on_sidebar: true,
			contains: [
				{
					id: ids.get(),
					title: 'Desktop',
					icon: icons.icon_desktop,
					show_on_sidebar: true,
					contains: []
				},
				{
					id: ids.get(),
					title: 'Downloads',
					icon: icons.icon_downloadArrow,
					show_on_sidebar: true,
					contains: []
				},
				{
					id: ids.get(),
					title: 'Documents',
					icon: icons.icon_duoFolder,
					show_on_sidebar: true,
					contains: []
				},
				{
					id: ids.get(),
					title: 'Pictures',
					icon: icons.icon_imageFolder,
					show_on_sidebar: true,
					contains: []
				}
			]
		},
		{
			id: ids.get(),
			title: 'Cloud',
			icon: icons.icon_duoClouds,
			show_on_sidebar: true,
			contains: []
		},
		{
			id: ids.get(),
			title: 'This PC',
			icon: icons.icon_colorMonitor,
			show_on_sidebar: true,
			contains: []
		}
	];
};

/** Delimiters */
export const internalDelimiter = '%%';
export const visualDelimiter = '/';

/** Mapping locations */
export const internalRoot = '$ROOT$';
export const visualRoot = 'C:';

export const internalRootDir = internalRoot + internalDelimiter;

/**
 *
 * @param {String} str
 * @returns
 */
export function checkDirectoryStrEnds(str) {
	if (typeof str !== 'string') throw new Error('Cannot resolve directory string');
	let resultStr = str;
	let endChar = str.slice(-1);
	let startChar = str[0];

	if (endChar === '-') {
		resultStr = resultStr.substring(0, str.length - 1);
	}

	if (startChar === '-') {
		resultStr = resultStr.slice(1, resultStr.length);
	}

	return resultStr;
}

/**
 * formats the string for our own internal directory needs and display purposes
 * @param {String} str string to format
 */
export function formatDirectoryStr(str) {
	if (typeof str !== 'string') throw new Error('Cannot resolve directory string');
	let noWhiteSpace = str.replaceAll(allWhitespaceInbetween, '-');
	let lowerCased = noWhiteSpace.toLocaleLowerCase();
	let polished = checkDirectoryStrEnds(lowerCased);

	return polished;
}

/**
 * Walk the items parent tree to find it's full directory
 *
 * @param {Object} item
 * @returns {String} location on the filesystem
 */
export function getLocation(item) {
	let location = '';
	let pNamespace = item.parent_namespace;
	let cNamespace = item.child_namespace;

	if (!pNamespace || !cNamespace) throw new Error('File Corrupt');

	if (pNamespace === internalRoot) {
		location = `${visualRoot}${visualDelimiter}${item.child_namespace}${visualDelimiter}`;
	}

	return location;
}

export const FILE_TYPES = {
	['FOLDER']: {
		icons: {
			large: icons.folder,
			can_contain: true,
			can_sidebar: true
		}
	},
	['SHORTCUT']: {},
	['MEDIA']: {},
	['BINARY']: {},
	['SYSTEM']: {}
};

/**
 * This is relatable to C: drive - these are the default starting
 * items, since this immitates a filesystem
 * @type {import('$stores/filesystem').SystemFile[]}
 */
export const rootDefault = [
	{
		id: nanoGenId(),
		title: 'User',
		child_namespace: 'user',
		parent_namespace: internalRoot,
		file_type: 'FOLDER',
		show_on_sidebar: false,
		show_in_explorer: true,
		icon_lg: icons.folder,
		contains: [
			{
				id: nanoGenId(),
				title: 'Desktop',
				child_namespace: 'desktop',
				parent_namespace: 'user',
				file_type: 'SYSTEM',
				show_on_sidebar: false,
				show_in_explorer: true,
				icon_lg: icons.icon_colorMonitor,
				contains: [
					{
						id: nanoGenId(),
						title: 'some random folder',
						child_namespace: 'some folder',
						parent_namespace: 'desktop',
						file_type: 'FOLDER',
						show_on_sidebar: false,
						show_in_explorer: true,
						icon_lg: icons.folder,
						contains: []
					},
					{
						id: nanoGenId(),
						title: 'another trash folder',
						child_namespace: 'another-trash-folder',
						parent_namespace: 'desktop',
						file_type: 'FOLDER',
						show_on_sidebar: false,
						show_in_explorer: true,
						icon_lg: icons.folder,
						contains: []
					}
				]
			}
		]
	},
	{
		id: nanoGenId(),
		title: 'Program Files',
		child_namespace: 'program-files',
		parent_namespace: internalRoot,
		file_type: 'FOLDER',
		show_on_sidebar: false,
		show_in_explorer: true,
		icon_lg: icons.folder,
		contains: [
			{
				id: nanoGenId(),
				title: 'lol cool programs',
				child_namespace: 'lol-cool-programs',
				parent_namespace: 'program-files',
				file_type: 'FOLDER',
				show_on_sidebar: false,
				show_in_explorer: true,
				icon_lg: icons.icon_colorMonitor,
				contains: [
					{
						id: nanoGenId(),
						title: 'some random folder',
						child_namespace: 'some-folder',
						parent_namespace: 'lol-cool-programs',
						file_type: 'FOLDER',
						show_on_sidebar: false,
						show_in_explorer: true,
						icon_lg: icons.folder,
						contains: [
							{
								id: nanoGenId(),
								title: 'not just ANY folder',
								child_namespace: 'not-just-any-folder',
								parent_namespace: 'some-folder',
								file_type: 'FOLDER',
								show_on_sidebar: false,
								show_in_explorer: true,
								icon_lg: icons.icon_colorMonitor,
								contains: [
									{
										id: nanoGenId(),
										title: 'some random folder',
										child_namespace: 'some folder',
										parent_namespace: 'not-just-any-folder',
										file_type: 'FOLDER',
										show_on_sidebar: false,
										show_in_explorer: true,
										icon_lg: icons.folder,
										contains: []
									},
									{
										id: nanoGenId(),
										title: 'another trash folder',
										child_namespace: 'bahh',
										parent_namespace: 'desktop',
										file_type: 'FOLDER',
										show_on_sidebar: false,
										show_in_explorer: true,
										icon_lg: icons.folder,
										contains: []
									}
								]
							}
						]
					},
					{
						id: nanoGenId(),
						title: 'really cool folder',
						child_namespace: 'yep-its-cool',
						parent_namespace: 'desktop',
						file_type: 'FOLDER',
						show_on_sidebar: false,
						show_in_explorer: true,
						icon_lg: icons.folder,
						contains: []
					}
				]
			}
		]
	},
	{
		id: nanoGenId(),
		title: 'cool folder',
		child_namespace: 'cool-folder',
		parent_namespace: internalRoot,
		file_type: 'FOLDER',
		show_on_sidebar: false,
		show_in_explorer: true,
		icon_lg: icons.folder,
		contains: []
	}
];

export const root = {};
