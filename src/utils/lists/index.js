import { allTrim } from '../';

export function createCustomList(title, slug, desc, id) {
  return {
    id,
    title: allTrim(title),
    slug,
    desc: allTrim(desc),
    custom: true
  };
}
