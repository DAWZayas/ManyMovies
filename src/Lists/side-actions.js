import firebase from '../utils/firebase';
import { getSlug } from '../utils';

export function addEntry(idCollection, idEntry, idUser) {
  const entryRef = firebase.child(`entries/${idUser}/${idCollection}/${idEntry}`);
  entryRef.set(idEntry);
}

export function removeEntry(idCollection, idEntry, idUser) {
  const entryRef = firebase.child(`entries/${idUser}/${idCollection}/${idEntry}`);
  entryRef.set(null);
}


export function createList(title, desc, userId) {
  const listsRef = firebase.child(`lists/${userId}`);
  const idList = listsRef.push().key();
  listsRef.once('value', (snapshot) => {
    const slug = getSlug(snapshot.val(), title, idList);
    listsRef.child(idList).set({
        custom: true,
        id: idList,
        title,
        desc,
        slug
      },
      error => {
        if (error){
          console.log(error);
        }
      }
    );
  });
}
