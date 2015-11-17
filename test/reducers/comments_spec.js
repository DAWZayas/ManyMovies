'use strict';

import chai, { expect } from 'chai';
import { setDefaultComments, createComment, removeComment, setDefaultLists, createList, deleteList }  from '../../src/actions';
import { defaultComments } from '../../src/utils/examples';
import reducer from '../../src/reducers';
chai.should();
chai.use(require('chai-things'));

describe('comments reducer tests', () => {

  describe('set default comments test', () => {

    it('will set the default comments', () => {
      const finalState = reducer(undefined, setDefaultComments());

      expect(finalState.comments).to.eql(defaultComments);
    });
  });

  describe('create a comment test', () => {
    it('will create a comment asociated to a list', () => {
      const initialState = reducer(undefined, setDefaultComments());
      const middleState = reducer(initialState, setDefaultLists());
      const lists = middleState.lists;
      let listId;
      for (let key in lists) {
        if (lists.hasOwnProperty(key)) {
          listId = key;
        }
      }
      const finalState = reducer(middleState, createComment(listId, 'Awesome list'));

      expect(finalState.comments[listId]).to.have.any.with.property('text', 'Awesome list');
    });
  });

  describe('remove a comment test', () => {
    it('will remove a comment asociated to a list', () => {
      const initialState = reducer(undefined, setDefaultComments());
      const middleState = reducer(initialState, setDefaultLists());
      const allComments = middleState.comments;
      let listId;
      for (let key in allComments) {
        if (allComments.hasOwnProperty(key)) {
          listId = key;
        }
      }
      let commentId = allComments[listId][0].id;
      const finalState = reducer(middleState, removeComment(commentId, listId));
      (finalState.comments[listId]).should.not.contain.a.thing.with.property('id', commentId);
    });
  });

  describe('remove all comments test', () => {
    it('will remove all comments when deleting a list', function() {
      const stateWithComments = reducer(undefined, setDefaultComments());
      const stateWithLists = reducer(stateWithComments, setDefaultLists());
      const title = 'Marvel movies';
      const stateWithCustomList = reducer(stateWithLists, createList(title, 'An awesome movies list'));
      const lists = stateWithCustomList.lists;
      let listId;
      for (let key in lists) {
        if (lists.hasOwnProperty(key)) {
          if (lists[key].title === title){
            listId = key;
          }
        }
      }
      const stateWithCommentInCustomList = reducer(stateWithCustomList, createComment(listId, 'DC is better'));
      const stateWithoutCustomList = reducer(stateWithCommentInCustomList, deleteList(listId));
      expect(stateWithoutCustomList.comments).to.not.have.any.keys(listId);
    });
  });
});
