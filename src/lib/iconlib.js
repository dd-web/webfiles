import icon_duoClouds from './shared/svg/DuoClouds.svelte';
import icon_solidStar from './shared/svg/SolidStar.svelte';
import icon_folder from './shared/svg/FolderIcon.svelte';
import icon_duoFolder from './shared/svg/DuoFolder.svelte';
import icon_colorMonitor from './shared/svg/ColorMonitor.svelte';
import icon_downloadArrow from './shared/svg/DownloadArrow.svelte';
import icon_desktop from './shared/svg/Desktop.svelte';
import icon_imageFolder from './shared/svg/ImageFolder.svelte';
import FolderIcon from './shared/svg/FolderIcon.svelte';

export const icons = {
	icon_solidStar: {
		src: icon_solidStar,
		props: {
			class: 'fill-yellow-600 stroke-amber-200 stroke-[1rem]'
		}
	},
	icon_duoClouds: {
		src: icon_duoClouds,
		props: {
			cloudOne: 'fill-sky-500',
			cloudTwo: 'fill-blue-500'
		}
	},
	icon_folder: {
		src: icon_folder,
		props: {}
	},
	icon_duoFolder: {
		src: icon_duoFolder,
		props: {
			folderOne: 'fill-yellow-400',
			folderTwo: 'fill-yellow-500 opacity-75'
		}
	},
	icon_colorMonitor: {
		src: icon_colorMonitor,
		props: {
			class: 'pt-[0.175rem]'
		}
	},
	icon_downloadArrow: {
		src: icon_downloadArrow,
		props: {
			class: 'fill-teal-500'
		}
	},
	icon_desktop: {
		src: icon_desktop,
		props: {
			layerOne: 'fill-sky-400',
			layerTwo: 'fill-sky-600'
		}
	},
	icon_imageFolder: {
		src: icon_imageFolder,
		props: {
			layerOne: 'fill-white',
			layerTwo: 'fill-sky-600'
		}
	},
	folder: {
		src: FolderIcon,
		props: {}
	}
};
