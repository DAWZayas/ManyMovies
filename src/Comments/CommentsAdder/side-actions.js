import Firebase from 'firebase';
import firebase from '../../utils/firebase';

export function createComment(idCommented, text, userName) {
  const commentsRef = firebase.child('comments');
  const idComment = commentsRef.push().key();
  commentsRef.child(idCommented).child(idComment).set({
      dislikes: 0,
      likes: 0,
      id: idComment,
      text,
      time: Firebase.ServerValue.TIMESTAMP,
      userName
    },
      error => {console.log(error);}
  );
}
