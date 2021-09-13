import emptyLibrary from '../templates/empty-library.hbs';
import headerLibrary from '../templates/header-library.hbs';
import libraryCard from '../templates/library-card.hbs';
import genreCard from '../templates/genre-card.hbs';
import { updateMarkup } from './api-gallery.js';
import { watchedParse, queueParse } from './modal.js';

// import headerTemplates from './header-tpl';
// import filmsGallery from '../templates/films-gallery.hbs';

const refs = {
  header: document.querySelector('.header'),
  //   filmsGallery: document.querySelector('#films-gallery'),
  libraryBtn: document.querySelector('.navigation-link-my-library'),

  homeLink: document.querySelector('.navigation-link-home'),
  //   homeLink: document.querySelector('.navigation-link-home'),

  galleryList: document.querySelector('.gallery-list'),
  library: document.querySelector('.library'),
  //////////////////////////// io
  // ioContainer: document.getElementById('intersection-observer'),
  libraryWatchedBtn: document.querySelector('#libraryWatchedBtn'),
  libraryQueueBtn: document.querySelector('#libraryQueueBtn'),
};

function renderWatchedList() {
  refs.galleryList.innerHTML = '';

  if (watchedParse.length === 0) {
    refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
  } else {
    watchedParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        // console.log(data);

        let { poster_path, title, id, vote_average, genres, release_date } = data;

        const mapGenres = genres.map(({ name }) => name);

        if (mapGenres.length > 3) {
          mapGenres.splice(3, 0, 'Other');
        }
        const filmGenres = mapGenres.slice(0, 4).join(', ');
        // console.log(filmGenres);

        let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

        const releaseYear = release_date.slice(0, 4);
        // console.log(releaseYear);

        const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
        updateMarkup(movie);
      });
    });
  }
}

function renderQueueList() {
  refs.galleryList.innerHTML = '';

  if (queueParse.length === 0) {
    refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
  } else {
    queueParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        // console.log(data);

        let { poster_path, title, id, vote_average, genres, release_date } = data;

        const mapGenres = genres.map(({ name }) => name);

        if (mapGenres.length > 3) {
          mapGenres.splice(3, 0, 'Other');
        }
        const filmGenres = mapGenres.slice(0, 4).join(', ');
        // console.log(filmGenres);

        let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

        const releaseYear = release_date.slice(0, 4);
        // console.log(releaseYear);

        const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
        updateMarkup(movie);
      });
    });
  }
}

function addWatchedListener() {
  const watchedBtnListener = document.querySelector('#libraryWatchedBtn');
  const queueBtnListener = document.querySelector('#libraryQueueBtn');

  watchedBtnListener.addEventListener('click', renderWatchedList);
  queueBtnListener.addEventListener('click', renderQueueList);
}

// refs.library.classList.add('hidden_library');
refs.libraryBtn.addEventListener('click', changeHeader);

function changeHeader(event) {
  event.preventDefault();
  if (refs.header.classList.contains('header')) {
    refs.header.classList.remove('header');
    refs.header.classList.add('library');

    refs.header.innerHTML = '';
    // refs.ioContainer.classList.add('hidden_library');

    refs.header.insertAdjacentHTML('afterbegin', headerLibrary());
    console.log(watchedParse);
    console.log(queueParse);
    addWatchedListener();
    if (watchedParse.length === 0 && queueParse.length === 0) {
      refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
    } else {
      console.log('Рендерим карточки массива из локалстор');
      renderLibCard();
    }
  }
}

function renderLibCard() {
  const libraryFromLocalStorage = queueParse.concat(watchedParse);

  refs.galleryList.innerHTML = '';

  libraryFromLocalStorage.map(Id => {
    // console.log(Id);
    fetchMovieListById(Id).then(data => {
      // console.log(data);

      let { poster_path, title, id, vote_average, genres, release_date } = data;

      const mapGenres = genres.map(({ name }) => name);

      if (mapGenres.length > 3) {
        mapGenres.splice(3, 0, 'Other');
      }
      const filmGenres = mapGenres.slice(0, 4).join(', ');
      // console.log(filmGenres);

      let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

      const releaseYear = release_date.slice(0, 4);
      // console.log(releaseYear);

      const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
      updateMarkup(movie);
    });
  });
}

function fetchMovieListById(movieId) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US`;

  return fetch(BASE_URL).then(response => response.json());
}

export { fetchMovieListById, renderWatchedList, renderQueueList, renderLibCard };
