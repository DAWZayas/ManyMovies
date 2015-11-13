import { getId } from './index';
import movies from './moviesData';

export const defaultMovies = movies;

const HISTORY_ID = getId();
const WATCHLIST_ID = getId();
const COLLECTION_ID = getId();
const HARRY_POTTER_LIST_ID = getId();

export const defaultLists = {
  [HISTORY_ID]: {
    id: HISTORY_ID,
    title: 'History',
    slug: 'history',
    desc: 'A list of watched movies',
    custom: false
  },
  [WATCHLIST_ID]: {
    id: WATCHLIST_ID,
    title: 'WatchList',
    slug: 'watchlist',
    desc: 'A list of pending movies',
    custom: false
  },
  [COLLECTION_ID]: {
    id: COLLECTION_ID,
    title: 'Collection',
    slug: 'collection',
    desc: 'A list of collected movies',
    custom: false,
  },
  [HARRY_POTTER_LIST_ID]: {
    id: HARRY_POTTER_LIST_ID,
    title: 'Harry potter movies',
    slug:'harry-potter-movies',
    desc: 'All the magic in Howarts',
    custom: true,
  }

};

export const defaultEntries = {
  [HISTORY_ID] : ['7', '70', '43'],
  [WATCHLIST_ID] : ['234', '432'],
  [COLLECTION_ID] : ['481', '505'],
  [HARRY_POTTER_LIST_ID] : ['546', '234']
};
