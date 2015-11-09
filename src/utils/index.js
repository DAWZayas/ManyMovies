import uuid from 'node-uuid';

export const getId = () => uuid.v1();

//TODO
//     (collection, id) => string
export const getSlug = (collection, title, id) => id ? title : title;

export const allTrim = string => string;
