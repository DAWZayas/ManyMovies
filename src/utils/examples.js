import { getId } from './index';

export const defaultLists = {
  [getId()]: {
    title: 'History',
    slug: 'history',
    desc: 'A list of watched movies',
    custom: false
  },
  [getId()]: {
    title: 'WatchList',
    slug: 'watchlist',
    desc: 'A list of pending movies',
    custom: false
  },
  [getId()]: {
    title: 'Collection',
    slug: 'collection',
    desc: 'A list of collected movies',
    custom: false,
  }
};
