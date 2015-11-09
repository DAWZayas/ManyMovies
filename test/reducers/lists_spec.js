'use strict';

import chai from 'chai';
import { getSlug } from '../../src/utils';
import { createCustomList } from '../../src/utils/lists';
import { setDefaultLists, createList, deleteList, editList }  from '../../src/actions';
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

  describe('modify lists test', () => {
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

    it('will edit a list', () => {
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
      //Edit the listItem
      const finalState = reducer(middleState, editList(listId, { title: 'DC movies', desc: 'Much better than Marvel movies' }));
      const slug = getSlug(middleState, 'DC movies');

      expect(finalState.lists[listId].title).to.equal('DC movies', 'Title should change');
      expect(finalState.lists[listId].slug).to.equal(slug, 'Slug should change');
      expect(finalState.lists[listId].desc).to.equal('Much better than Marvel movies', 'Desc should change');
    });
  });

});
