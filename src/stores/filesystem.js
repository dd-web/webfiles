import { writable, get } from 'svelte/store';
import { counterStore } from './counter';

export const filesystem = (initial = []) => {
  const { subscribe, set, update } = writable(initial);
  const idStore = counterStore(0);



  return {
    subscribe,
    set,
    update
  }

}


/**
 * @typedef {object} SystemStruct
 * @property {number} id unique id we can use to refer to this item
 * @property {string} title user friendly name for this item
 * @property {string} icon the icon for this item
 * @property {boolean} show_on_sidebar
 * @property {Array<SystemStruct>|null} contains files/folder inside this item (null if none)
 */


