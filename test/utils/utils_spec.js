import { expect } from 'chai';
import { getSlug, getId } from '../../src/utils';
import defaultLists from '../../src/utils/examples';

describe('getSlug', () => {

  describe('getSlug tests', () => {

    it('will be the title formated', () => {
      const title = 'foo';
      const id = getId();
      const slug = getSlug(defaultLists, title, id);

      const title2 = 'ñ';
      const slug2 = getSlug(defaultLists, title2, id);

      const title3 = 'foo foo';
      const slug3 = getSlug(defaultLists, title3, id);

      const title4 = 'Bar';
      const slug4 = getSlug(defaultLists, title4, id);

      const title5 = 'Baz*/+?¿)(&%$·"!|@#¬[ ]{}´;:,.-_><\'\\Baz';
      const slug5 = getSlug(defaultLists, title5, id);

      const title6 = 'çaz';
      const slug6 = getSlug(defaultLists, title6, id);

      expect(slug).to.equal('foo');
      expect(slug2).to.equal('n');
      expect(slug3).to.equal('foo-foo');
      expect(slug4).to.equal('bar');
      expect(slug5).to.equal('baz-baz');
      expect(slug6).to.equal('caz');
    });

    it('will be the id if the title can\'t be formated', () => {
      const id = getId();
      const title = '*/+?¿)(&%$·"!|@#¬[ ]{}´;:,.-_><\'\\';
      const slug = getSlug(defaultLists, title, id);

      expect(slug).to.equal(id);
    });

    it('will be unique in the collection', () => {
      const title = 'collection';
      const id = getId();
      const slug = getSlug(defaultLists, title, id);

      expect(slug).to.equal(`${title}-${id}`);
    });

  });

});
