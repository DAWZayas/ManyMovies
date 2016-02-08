import { formatMovieWithImages } from '../movies';

export const makeRequest = (type, handler) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api-v2launch.trakt.tv/${type}extended=full,images,&limit=25`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('trakt-api-version', '2');
    xhr.setRequestHeader('trakt-api-key', 'dd37a4f55da46ea23c0ec3a82acfafb6862ba8fe56e667483c91fe43ebc3a4a7');

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        const body = JSON.parse(xhr.response);
        if (body instanceof Array) {
          resolve(JSON.parse(xhr.response).map(data => handler(data)));
        } else {
          resolve(handler(body));
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
};

export const makeTrendingRequest = () => makeRequest('movies/trending?', data => formatMovieWithImages(data.movie));
export const makePopularRequest = () => makeRequest('movies/popular?', movie => formatMovieWithImages(movie));
export const makeBoxOfficeRequest = () => makeRequest('movies/boxoffice?', data => formatMovieWithImages(data.movie));
export const makeQueryRequest = query => makeRequest(`search?query=${query}&type=movie&`, data => data.movie.ids.slug);
export const makeMovieRequest = slug => makeRequest(`movies/${slug}?`, movie => formatMovieWithImages(movie));
