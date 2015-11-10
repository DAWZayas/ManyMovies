import uuid from 'node-uuid';

export const getId = () => uuid.v1();

//TODO
//                            (collection, id) => string
export const slugText = string => string;

export const allTrim = string => string.trim().replace(/\s+/g, ' ');

export function getSlug (collection, title, id){
    let slug = slugText(title);
    let newTitle;
    for (id in collection){
       id.title === slug ? newTitle = slug + '-' + id : newTitle = slug;
    }
  return newTitle;
}
