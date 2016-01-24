import firebase from '../../../utils/firebase';

export function rateMovie(userName, idMovie, rating) {
  const movieRatingRef = firebase.child(`movies/${idMovie}/totalRating`);
  const movieVotesRef = firebase.child(`movies/${idMovie}/votes`);
  const userRatingRef = firebase.child(`userRatings/${userName}/${idMovie}`);
  userRatingRef.once('value', snap => {
    if (!snap.exists()){
      movieRatingRef.transaction(
      totalRating => totalRating + rating,
      error => {
        if (error) {
          console.log(error);
        } else {
          movieVotesRef.transaction(
            votes => votes + 1,
            error => {
              if (error) {
                console.log(error);
              } else {
                userRatingRef.set(rating);
              }
            }
          );
        }
      });
    }
  });
}

export function changeMovieRating(userName, idMovie, newRating) {
  const movieRatingRef = firebase.child(`movies/${idMovie}/totalRating`);
  const userRatingRef = firebase.child(`userRatings/${userName}/${idMovie}`);
  userRatingRef.once('value', snap => {
    movieRatingRef.transaction(
      totalRating => totalRating + newRating - snap.val(),
      error => {
        if (error) {
          console.log(error);
        } else {
          userRatingRef.set(newRating);
        }
      });
  });
}
