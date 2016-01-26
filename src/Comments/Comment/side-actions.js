import Firebase from 'firebase';
import firebase from '../../utils/firebase';

export function likeComment(id, idCommented, userId) {
  const userlikesRef = firebase.child(`userLikes/${userId}/${idCommented}/${id}/`);
  const commentsRef = firebase.child(`comments/${idCommented}/${id}/likes`);
  userlikesRef.once('value', snap => {
    if (!snap.exists()){
      userlikesRef.update({
        timestamp: Firebase.ServerValue.TIMESTAMP
      }, error => {
        if (error){
          console.log(error);
        } else {
          commentsRef.transaction((val) => val + 1);
        }
      });
    }
  });
}

export function unlikeComment(id, idCommented, userId) {
  const userlikesRef = firebase.child(`userLikes/${userId}/${idCommented}/${id}/`);
  const commentsRef = firebase.child(`comments/${idCommented}/${id}/likes`);
  userlikesRef.remove(error => {
    if (error){
      console.log(error);
    } else {
      commentsRef.transaction((val) => val - 1);
    }
  });
}

export function unlikeAndDislikeComment(id, idCommented, userId) {
  unlikeComment(id, idCommented, userId);
  dislikeComment(id, idCommented, userId);
}

export function dislikeComment(id, idCommented, userId) {
  const userdislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}/${id}/`);
  const commentsRef = firebase.child(`comments/${idCommented}/${id}/dislikes`);
  userdislikesRef.once('value', snap => {
    if (!snap.exists()){
      userdislikesRef.update({
        timestamp: Firebase.ServerValue.TIMESTAMP
      }, error => {
        if (error){
          console.log(error);
        } else {
          commentsRef.transaction((val) => val + 1);
        }
      });
    }
  });
}

export function undislikeComment(id, idCommented, userId) {
  const userdislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}/${id}/`);
  const commentsRef = firebase.child(`comments/${idCommented}/${id}/dislikes`);
  userdislikesRef.remove(error =>{
    if (error){
      console.log(error);
    }else {
      commentsRef.transaction((val) => val - 1);
    }
  });
}

export function undislikeAndLikeComment(id, idCommented, userId) {
  undislikeComment(id, idCommented, userId);
  likeComment(id, idCommented, userId);
}


export function editComment(id, idCommented, text){
  const commentsRef = firebase.child('comments');
  commentsRef.child(idCommented).child(id).update({
      text,
      modified: Firebase.ServerValue.TIMESTAMP,
    },
      error => {console.log(error);}
  );
}

export function removeComment(id, idCommented) {
  const commentsRef = firebase.child('comments');
  commentsRef.child(idCommented).child(id).remove(error => console.log(error));
}
