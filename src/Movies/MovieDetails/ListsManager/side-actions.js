import firebase from '../../../utils/firebase';

export function addEntry(idCollection, idEntry, idUser) {
  const entryRef = firebase.child(`entries/${idUser}/${idCollection}/${idEntry}`);
  entryRef.set(idEntry);
}

export function removeEntry(idCollection, idEntry, idUser) {
  const entryRef = firebase.child(`entries/${idUser}/${idCollection}/${idEntry}`);
  entryRef.set(null);
}
