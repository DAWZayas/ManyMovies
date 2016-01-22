import firebase from '../../../utils/firebase';

export function rateMovie(userName, idMovie, rating) {
  const movieRatingRef = firebase.child(`movies/${idMovie}/totalRating`);
  const movieVotesRef = firebase.child(`movies/${idMovie}/votes`);
  const userRatingRef = firebase.child(`userRatings/${userName}/${idMovie}`);
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

export function changeMovieRating(userName, idMovie, oldRating, newRating) {
  const movieRatingRef = firebase.child(`movies/${idMovie}/totalRating`);
  const userRatingRef = firebase.child(`userRatings/${userName}/${idMovie}`);
  movieRatingRef.transaction(
    totalRating => totalRating + newRating - oldRating,
    error => {
      if (error) {
        console.log(error);
      } else {
        userRatingRef.set(newRating);
      }
    });
}
