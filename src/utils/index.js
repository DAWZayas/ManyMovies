import uuid from 'node-uuid';

export const getId = () => uuid.v1();

export const slugText = string => string.toLowerCase()
                                        .replace(/ñ/gi, 'ñ')
                                        .replace(/ç/gi, 'c')
                                        .trim().replace(/\s+/g, '');

export const allTrim = string => string.trim().replace(/\s+/g, ' ');

export function getSlug (collection, title, id){
  let slug = slugText(title);
  for (let item in collection){
    if (collection.hasOwnProperty(item)){
      slug = (item.slug === slug) ? `${slug}-${id}` : slug;
    }
  }
  return slug;
}
