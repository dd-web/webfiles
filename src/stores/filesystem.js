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
 * @property {number|string} id unique id we can use to refer to this item
 * @property {string} title user friendly name for this item
 * @property {string} location location on the system this exists in
 * @property {string} icon the icon for this item
 * @property {boolean} show_on_sidebar
 */


