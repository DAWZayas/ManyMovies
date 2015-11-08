import { getId, getSlug } from './index';

let historyId = getId();
let watchedId = getId();
let collectionId = getId();

export const lists = {
  [historyId]: {
    slug: getSlug('History', historyId),
    title: 'History',
    custom: false
  },
  [watchedId]: {
    slug: getSlug('Watched', watchedId),
    title: 'Watched',
    custom: false
  },
  [collectionId]: {
    slug: getSlug('Collection', collectionId),
    title: 'Collection',
    custom: false
  }
};
