'use strict';

import chai from 'chai';
import { getSlug /*,getId*/ } from '../../src/utils';
import { createCustomList } from '../../src/utils/lists';
import { setDefaultLists, createList, deleteList, editList/*, addElement, removeElement */}  from '../../src/actions';
import { defaultLists } from '../../src/utils/examples';
import reducer from '../../src/reducers';

/**
* chai fuzzy set up
*/
chai.use(require('chai-fuzzy'));
let expect = chai.expect;

describe('lists reducer tests', () => {

  describe('set default lists test', () => {

    it('will set the default lists', () => {
      const nextState = reducer(undefined, setDefaultLists());
      expect(nextState.lists).to.eql(defaultLists);
    });
  });

  describe('create list test', () => {
    it('will add a list to the state', () => {
      const initialState = reducer(undefined, setDefaultLists());
      const title = 'Marvel movies';
      const desc = 'This list is awesome';
      const slug = getSlug(initialState, 'Marvel movies');
      const newList = createCustomList('Marvel movies', slug, 'This list is awesome');
      const nextState = reducer(initialState, createList(title, desc));
      expect(nextState.lists).to.containOneLike(newList);
    });

    it('will trim and remove duplicated white spaces', () => {
      const initialState = reducer(undefined, setDefaultLists());
      const title = '  Marvel   movies  ';
      const desc = ' This   list is   awesome ';
      const slug = getSlug(initialState, 'Marvel movies');
      const newList = createCustomList('Marvel movies', slug, 'This list is awesome');
      const nextState = reducer(initialState, createList(title, desc));
      expect(nextState.lists).to.containOneLike(newList);
    });

    it('will delete a list from the state', () => {
      const initialState = reducer(undefined, setDefaultLists());
      //Add a list
      const title = 'Marvel movies';
      const desc = '';
      const middleState = reducer(initialState, createList(title, desc));
      //Get the id of the added list
      const lists = middleState.lists;
      let listId;
      for (let key in lists) {
        if (lists.hasOwnProperty(key)) {
          if (lists[key].title === title){
            listId = key;
          }
        }
      }
      //Remove the list
      const finalState = reducer(middleState, deleteList(listId));
      expect(finalState).to.eql(initialState);
    });

    it('will edit the name of a list', () => {
      const initialState = reducer(undefined, setDefaultLists());
      //Add a list
      const title = 'Marvel movies';
      const desc = '';
      const middleState = reducer(initialState, createList(title, desc));
      //Get the id of the added list
      const lists = middleState.lists;
      let listId;
      for (let key in lists) {
        if (lists.hasOwnProperty(key)) {
          if (lists[key].title === title){
            listId = key;
          }
        }
      }
      console.log(listId);
      //
    });

  });
/*
    it('will add a list to the state', () => {
      const initialState = reducer(undefined, setDefaultLists());
      const nextState = reducer(initialState, createList('Marvel movies'));
    });
/*
    it('will be the id if the title can\'t be formated', () => {
      const id = getId();
      const title = '/+*?¿)(&%$·"!|@#¬[ ]{}´;:,.-_><\'\\';
      const slug = getSlug(defaultLists, title, id);

      expect(slug).to.equal(id);
    });

    it('will be unique in the collection', () => {
      const title = 'collection';
      const id = getId();
      const slug = getSlug(defaultLists, title, id);

      expect(slug).to.equal(`${title}-${id}`);
    });
*/
});
