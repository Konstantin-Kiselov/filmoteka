export default class StorageApi {
  constructor() {
    // const WATCHED_FILMS = 'watched';
    // this.watchArray = [];
  }

  addToQueue(movie) {
    const queueFilms = JSON.parse(localStorage.getItem('QueueFilm'));

    if (queueFilms !== null) {
      queueFilms[movie.id] = movie;
      localStorage.setItem('QueueFilm', JSON.stringify(queueFilms));
    } else {
      localStorage.setItem('QueueFilm', JSON.stringify({ [movie.id]: movie }));
    }
    console.log('storage. addTo que');
  }

  addToWatched(movie) {
    const watchedFilms = JSON.parse(localStorage.getItem('WatchedFilm'));

    if (watchedFilms !== null) {
      watchedFilms[movie.id] = movie;
      localStorage.setItem('WatchedFilm', JSON.stringify(watchedFilms));
    } else {
      localStorage.setItem('WatchedFilm', JSON.stringify({ [movie.id]: movie }));
    }
  }
}
