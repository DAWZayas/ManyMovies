import uuid from 'node-uuid';

export const getId = () => uuid.v1();

//     (collection, id) => string
export const getSlug = (collection, title, id) => title + id;
