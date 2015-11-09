import { expect } from 'chai';
import { getSlug, getId, allTrim } from '../../src/utils';
import defaultLists from '../../src/utils/examples';

describe('getSlug', () => {

  describe.skip('getSlug tests', () => {

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

      const title7 = 'àáâä';
      const slug7 = getSlug(defaultLists, title7, id);

      expect(slug).to.equal('foo');
      expect(slug2).to.equal('n');
      expect(slug3).to.equal('foo-foo');
      expect(slug4).to.equal('bar');
      expect(slug5).to.equal('baz-baz');
      expect(slug6).to.equal('caz');
      expect(slug7).to.equal('aaaa');
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

describe.skip('all trim', () => {
  describe('all trim tests', () => {
    it('will trim white spaces at the beggining', () => {
      const text = ' foo';
      const trimmed = allTrim(text);
      expect(trimmed).to.equal('foo');
    });


    it('will trim white spaces at the end', () => {
      const text = 'foo ';
      const trimmed = allTrim(text);
      expect(trimmed).to.equal('foo');
    });


    it('will replace repeated white spaces with a single white space', () => {
      const text = 'foo     bar';
      const trimmed = allTrim(text);
      expect(trimmed).to.equal('foo bar');
    });
  });
});
