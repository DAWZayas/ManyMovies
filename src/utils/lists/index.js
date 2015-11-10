import { allTrim } from '../';

export function createCustomList(title, slug, desc) {
  return {
    title: allTrim(title),
    slug,
    desc: allTrim(desc),
    custom: true
  };
}
