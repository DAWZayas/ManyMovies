import uuid from 'node-uuid';

export const getId = () => uuid.v1();

export const slugText = string => string.toLowerCase()
                                        .replace(/[·\/_,:;. ]/gi, '-')
                                        .replace(/[àáäâ]/gi, 'a')
                                        .replace(/[èéëê]/gi, 'e')
                                        .replace(/[ìíïî]/gi, 'i')
                                        .replace(/[òóöô]/gi, 'o')
                                        .replace(/[ùúüû]/gi, 'u')
                                        .replace(/ñ/gi, 'n')
                                        .replace(/ç/gi, 'c')
                                        .replace(/[^\w-]/gi, '')
                                        .replace(/(-)+/g, '-')
                                        .replace(/^-/, '')
                                        .replace(/-$/, '');

export const allTrim = string => string.trim().replace(/\s+/g, ' ');

export function getSlug (collection, title, id){
  let slug = slugText(title);
  if (slug === ''){
    return id;
  }
  for (let key in collection){
    if (collection.hasOwnProperty(key)){
      slug = (collection[key].slug === slug) ? `${slug}-${id}` : slug;
    }
  }
  return slug;
}
