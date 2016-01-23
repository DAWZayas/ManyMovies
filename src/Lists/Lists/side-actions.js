import firebase from '../../utils/firebase';
import { getSlug } from '../../utils';

export function createList(title, desc) {
  const listsRef = firebase.child('lists/Gotre1');
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
      error => console.log(error)
    );
  });
}
