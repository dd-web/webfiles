
/** @type {File} */
const IFile = {
  id: 0,
  title: 'picture',
  ext: 'png',
}

/** @type {Folder} */
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
 * @typedef {Object} File
 * @property {number|string} id 
 * @property {string|null} title
 * @property {string|null} ext
 */


/**
 * @typedef {Object} Folder
 * @property {number|string} id 
 * @property {string|null} title
 * @property {Array<Folder|File>} files
 */