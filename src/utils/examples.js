import { getId } from './index';

export const lists = [ 
  {
    id: getId(),
    title: 'History',
    custom: false
  },
  {
    id: getId(),
    title: 'Watched'
    custom: false
  },
  {
    id: getId(),
    title: 'Collections',
    custom: false
  }
];

export const initialState = {
  lists
};