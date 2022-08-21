// import { counterStore } from '$stores/counter';
// import { writable, get } from 'svelte/store';

import icon_duoClouds from './shared/svg/DuoClouds.svelte'
import icon_solidStar from './shared/svg/SolidStar.svelte';
import icon_folder from './shared/svg/FolderIcon.svelte';
import icon_duoFolder from './shared/svg/DuoFolder.svelte';
import icon_colorMonitor from './shared/svg/ColorMonitor.svelte';
import icon_downloadArrow from './shared/svg/DownloadArrow.svelte';
import icon_desktop from './shared/svg/Desktop.svelte';
import icon_imageFolder from './shared/svg/ImageFolder.svelte';




const IFile = {
  id: 0,
  title: 'picture',
  ext: 'png',
}


const IFolder = {
  id: 0,
  title: 'new folder',
  files: []
}

/**
 * @param {Folder} folder 
 * @returns {Folder}
 */
export function folderTemplate(folder = { ...IFolder}) {
  return {
    id: folder["id"] ? folder.id : 0,
    title: folder["title"] ? folder.title : "New Folder",
    files: folder["files"] instanceof Array ? folder.files : []
  }
};

const idStore = () => {
  let currentId = 0
  
  function getId() {
    let id = currentId;
    currentId++
    return id;
  }

  return {
    get: () => getId()
  }
}

const ids = idStore();

const userName = "_%user%_"

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
  }

}

export const sidebarItems = () => {
  return [
    {
      id: ids.get(),
      title: 'Quick access',
      icon: icons.icon_solidStar,
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
  ]
}


export const defaultFolders = () => {
  return [
    {
      id: 1,
      title: 'Cool Folder',
      files: []
    },
    {
      id: 2,
      title: 'Neato',
      files: []
    },
    {
      id: 3,
      title: 'Whattt',
      files: []
    },
    {
      id: 4,
      title: 'Cool Folder',
      files: []
    },
    {
      id: 5,
      title: 'Neato',
      files: []
    },
    {
      id: 6,
      title: 'Whattt',
      files: []
    },
    {
      id: 7,
      title: 'Cool Folder',
      files: []
    },
    {
      id: 8,
      title: 'Neato',
      files: []
    },
    {
      id: 9,
      title: 'Whattt',
      files: []
    }
  ]
}



/**
 * @typedef {Object} Folder
 * @property {number|string} id 
 * @property {string|null} title
 * @property {Array<Folder|File>} files
 */

