'use strict';

import { expect } from 'chai';
import { setDefaultComments, createComment, deleteComment, setDefaultLists }  from '../../src/actions';
import { defaultComments } from '../../src/utils/examples';
import reducer from '../../src/reducers';

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
      const listComments = allComments[listId];
      let commentId;
      for (let key in listComments) {
        if (allComments.hasOwnProperty(key)) {
          commentId = key;
        }
      }
      const finalState = reducer(middleState, deleteComment(listId, commentId));
      expect(finalState.entries[listId]).not.to.containOneLike('20');
    });
  });

  describe('remove all entries test', () => {
    it('will remove all entries when deleting a list', function() {
      const stateWithEntries = reducer(undefined, setDefaultEntries());
      const stateWithLists = reducer(stateWithEntries, setDefaultLists());
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
      const stateWithEntryInCustomList = reducer(stateWithCustomList, addEntry(listId, '73582'));
      const stateWithoutCustomList = reducer(stateWithEntryInCustomList, deleteList(listId));
      expect(stateWithoutCustomList.entries).to.not.have.any.keys(listId);
    });
  });
});
