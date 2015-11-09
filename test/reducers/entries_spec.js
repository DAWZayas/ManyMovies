'use strict';

import { expect } from 'chai';
import { setDefaultEntries, addEntry, removeEntry, setDefaultLists, createList, deleteList }  from '../../src/actions';
import { defaultEntries } from '../../src/utils/examples';
import reducer from '../../src/reducers';

describe('entries reducer tests', () => {

  describe('set default entries test', () => {

    it('will set the default entries', () => {
      const finalState = reducer(undefined, setDefaultEntries());

      expect(finalState.entries).to.eql(defaultEntries);
    });
  });

  describe('add an entry test', () => {
    it('will add a entry to a list', () => {
      const initialState = reducer(undefined, setDefaultEntries());
      const entries = initialState.entries;
      let listId;
      for (let key in entries) {
        if (entries.hasOwnProperty(key)) {
          listId = key;
        }
      }
      const finalState = reducer(initialState, addEntry(listId, '20'));

      expect(finalState.entries[listId]).to.containOneLike('20');
    });

    it('will not add repeated entries to a list', () => {
      const initialState = reducer(undefined, setDefaultEntries());
      const entries = initialState.entries;
      let listId;
      for (let key in entries) {
        if (entries.hasOwnProperty(key)) {
          listId = key;
        }
      }
      const middleState = reducer(initialState, addEntry(listId, '20'));
      const finalState = reducer(middleState, addEntry(listId, '20'));
      const initialLength = middleState.entries[listId].length;
      const finalLength = finalState.entries[listId].length;

      expect(initialLength).to.equal(finalLength);
    });
  });

  describe('remove an entry test', () => {
    it('will remove a entry from a list', () => {
      const initialState = reducer(undefined, setDefaultEntries());
      const entries = initialState.entries;
      let listId;
      for (let key in entries) {
        if (entries.hasOwnProperty(key)) {
          listId = key;
        }
      }
      const middleState = reducer(initialState, addEntry(listId, '20'));
      const finalState = reducer(middleState, removeEntry(listId, '20'));
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
