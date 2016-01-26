import firebase from '../../utils/firebase';
import { pushState } from 'redux-router';
import { getSlug } from '../../utils';

export function deleteListAndNavigate(user, id, dispatch){
  firebase.child(`lists/${user}/${id}`).remove(function (error){
    if (error) {
      console.log(error);
    }else {
      dispatch(pushState(null, '/lists'));
    }
  });
}

export function editListAndNavigate(user, id, title, desc, dispatch) {
  const listRef = firebase.child(`lists/${user}/${id}`);
  const listsRef = firebase.child(`lists/${user}`);
  listsRef.once('value', snap => {
    const slug = getSlug(snap.val(), title, id);
    listRef.update({
      title, desc, slug
    },
      error => {
        if (error){
          console.log(error);
        } else {
          dispatch(pushState(null, `lists/${user}/${slug}`));
        }
    });
  });
}
