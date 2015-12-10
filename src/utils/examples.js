import { getId } from './index';
import movies from './moviesData';
import defaultAvatar from '../../images/avatar.png';
import gotrecilloAvatar from '../../images/gotrecilloAvatar.png';
import gotreAvatar from '../../images/gotreAvatar.png';

export const defaultMovies = movies;

const HISTORY_ID = getId();
const WATCHLIST_ID = getId();
const COLLECTION_ID = getId();
const HARRY_POTTER_LIST_ID = getId();
const FIRST_COMMENT_ID = getId();
const SECOND_COMMENT_ID = getId();
const THIRD_COMMENT_ID = getId();
const FOURTH_COMMENT_ID = getId();
const FIRST_USERNAME = 'Pepe';

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
  [HARRY_POTTER_LIST_ID] : ['546', '234', '62544', '234', '432', '481', '505', '7', '70', '43', '198', '228', '230', '309', '358']
};

export const defaultComments = {
  [HARRY_POTTER_LIST_ID] : [
      {
        id: FIRST_COMMENT_ID,
        text: 'Hiiiiii',
        time: new Date(),
        userName: 'Gotre1',
        likes: 0,
        dislikes: 0
      },
      {
        id: SECOND_COMMENT_ID,
        text: 'Byeee',
        time: new Date(),
        userName: 'Gotre',
        likes: 0,
        dislikes: 0
      },
      {
        id: FOURTH_COMMENT_ID,
        text: 'I\'m shy',
        time: new Date(),
        userName: 'ShyBoy',
        likes: 0,
        dislikes: 1337
      }
    ],
  ['7'] : [
      {
        id: THIRD_COMMENT_ID,
        text: 'This movie is awesome',
        time: new Date(),
        userName: 'Gotre',
        likes: 0,
        dislikes: 0
      }
    ]
};

export const defaultUsers = {
  [FIRST_USERNAME] : {
    userName: FIRST_USERNAME,
    displayName: 'Pepito',
    avatarUrl: defaultAvatar
  },
  'Gotre': {
    userName: 'Gotre',
    displayName: 'Gotre',
    avatarUrl: gotreAvatar
  },
  'Gotre1': {
    userName: 'Gotre1',
    displayName: 'Gotrecillo',
    avatarUrl: gotrecilloAvatar
  },
  'ShyBoy': {
    userName: 'ShyBoy',
    displayName: 'ShyBoy',
    avatarUrl: defaultAvatar
  }
};

export const defaultUserRatings = {
  'Gotre': {
    '7': 7,
    '40': 1,
    '505': 10
  },
  'ShyBoy': {
    '7': 10
  },
  'Gotre1': {
    '7': 9,
    '40': 2,
  },
};


export const defaultMovieRatings = {
  '7':{
    totalVotes: 3,
    totalNote: 28
  },
  '40': {
    totalVotes: 2,
    totalNote: 3
  },
  '505': {
    totalVotes: 1,
    totalNote: 10
  }
};
