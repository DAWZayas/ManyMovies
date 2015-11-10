import { expect } from 'chai';
import { getSlug, getId, allTrim, slugText } from '../../src/utils';
import { defaultLists } from '../../src/utils/examples';

describe('utils tests', () => {

  describe('slugText tests', () => {
    it('will change to lower case the letters', () => {
      const text = 'FoO';
      const slug = slugText(text);

      expect(slug).to.equal('foo');
    });

    it('will convert ·/_,:;. characters and spaces to hypens ( - )', () => {
      const expected = 'foo-foo';
      const text = 'foo·foo';
      const text2 = 'foo/foo';
      const text3 = 'foo_foo';
      const text4 = 'foo,foo';
      const text5 = 'foo:foo';
      const text6 = 'foo;foo';
      const text7 = 'foo.foo';
      const text8 = 'foo-foo';
      const text9 = 'foo foo';

      const slug = slugText(text);
      const slug2 = slugText(text2);
      const slug3 = slugText(text3);
      const slug4 = slugText(text4);
      const slug5 = slugText(text5);
      const slug6 = slugText(text6);
      const slug7 = slugText(text7);
      const slug8 = slugText(text8);
      const slug9 = slugText(text9);

      expect(slug).to.equal(expected);
      expect(slug2).to.equal(expected);
      expect(slug3).to.equal(expected);
      expect(slug4).to.equal(expected);
      expect(slug5).to.equal(expected);
      expect(slug6).to.equal(expected);
      expect(slug7).to.equal(expected);
      expect(slug8).to.equal(expected);
      expect(slug9).to.equal(expected);
    });

    it('will remove accents', () => {
      const text = 'àáäâ';
      const text2 = 'èéëê';
      const text3 = 'ìíïî';
      const text4 = 'òóöô';
      const text5 = 'ùúüû';

      const slug = slugText(text);
      const slug2 = slugText(text2);
      const slug3 = slugText(text3);
      const slug4 = slugText(text4);
      const slug5 = slugText(text5);

      expect(slug).to.equal('aaaa');
      expect(slug2).to.equal('eeee');
      expect(slug3).to.equal('iiii');
      expect(slug4).to.equal('oooo');
      expect(slug5).to.equal('uuuu');
    });

    it('will change ç and ñ characters', () => {
      const text = 'ç';
      const text2 = 'ñ';

      const slug = slugText(text);
      const slug2 = slugText(text2);

      expect(slug).to.equal('c');
      expect(slug2).to.equal('n');
    });

    it('will delete another symbols', () => {
      const text = '*+?¿)(&%$"!|@#¬[]{}´><\'\\';
      const slug = slugText(text);
      expect(slug).to.equal('');
    });

    it('will combine multiple hypens', () => {
      const text = 'foo·/_, :;.foo';
      const slug = slugText(text);
      expect(slug).to.equal('foo-foo');
    });

    it('will remove starting and ending hypens', () => {
      const text = '-foo-foo-';
      const text2 = '·/_, :;.';

      const slug = slugText(text);
      const slug2 = slugText(text2);
      expect(slug).to.equal('foo-foo');
      expect(slug2).to.equal('');
    });
  });

  describe('getSlug tests', () => {

    it('will be the title formated', () => {
      const title = 'foo';
      const id = getId();
      const expected = slugText(title);
      const slug = getSlug(defaultLists, title, id);
      expect(slug).to.equal(expected);
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

describe('all trim', () => {
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
