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

export function relativeScore(pos, n) {
  if (n === 0){
    return 0;
  }
  const z = 1.96;
  const phat = 1 * pos / n;
  return (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat ) + z * z / (4 * n)) / n)) / (1 + z * z / n);
}

export function getDocHeight() {
    const D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
  }
export function getDayHashtag() {
  const weekHastags = ['SinDay', 'MeowMonday', 'TuesdayTreat', 'WoofWednesday', 'ThursdayFunDay', 'FridayFunday', 'Caturday'];
  const date = new Date();
  const day = date.getDay();
  return weekHastags[day];
}
