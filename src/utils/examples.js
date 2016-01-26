import defaultAvatar from '../../images/avatar.png';
import gotrecilloAvatar from '../../images/gotrecilloAvatar.png';
import gotreAvatar from '../../images/gotreAvatar.png';

const FIRST_USERNAME = 'Pepe';

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

export const genres = [
  "all",
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "drama",
  "family",
  "fantasy",
  "horror",
  "music",
  "mystery",
  "romance",
  "science-fiction",
  "thriller",
  "war",
  "western"
];
