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
  /////////////////////////////////////////// 13.09 Люда
  container: document.querySelector('.container'),
  /////////////////////////////////////////// 13.09 Люда
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
  console.log(watchedBtnListener);

  watchedBtnListener.addEventListener('click', renderWatchedList);
  /////////////////////////////////////////// 13.09 Люда
  watchedBtnListener.addEventListener('click', () => {
    console.log('активная кнопка watched');
    queueBtnListener.classList.remove('is-active-header-btn');
    watchedBtnListener.classList.add('is-active-header-btn');

    if (watchedBtnListener.classList.contains('is-active-header-btn')) {
      // refs.galleryList.innerHTML = '';
      // refs.container.textContent = '';
      renderWatchedList();
      // return;
    }
  });
  /////////////////////////////////////////// 13.09 Люда

  queueBtnListener.addEventListener('click', renderQueueList);
  /////////////////////////////////////////// 13.09 Люда
  queueBtnListener.addEventListener('click', () => {
    console.log('активная кнопка queue');
    queueBtnListener.classList.add('is-active-header-btn');
    watchedBtnListener.classList.remove('is-active-header-btn');
  });

  /////////////////////////////////////////// 13.09 Люда
  watchedBtnListener.classList.add('is-active-header-btn');
  /////////////////////////////////////////// 13.09 Люда
}

// function a() {
//   console.log('llllllllllllllll');
//   queueBtnListener.classList.add('is-active-header-btn');
// }
// console.log(watchedBtnListener);

// refs.library.classList.add('hidden_library');
refs.libraryBtn.addEventListener('click', changeHeader);

/////////////////////////////////////////// 13.09 Люда
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
      // renderLibCard();

      //////////////////// при переходе в библиотеку по умолчанию выбрана кнопка просмотреных
      renderWatchedList();
    }
  }
}
/////////////////////////////////////////// 13.09 Люда

// function changeHeader(event) {
//   event.preventDefault();
//   if (refs.header.classList.contains('header')) {
//     refs.header.classList.remove('header');
//     refs.header.classList.add('library');

//     refs.header.innerHTML = '';
//     // refs.ioContainer.classList.add('hidden_library');

//     refs.header.insertAdjacentHTML('afterbegin', headerLibrary());
//     console.log(watchedParse);
//     console.log(queueParse);
//     addWatchedListener();
//     if (watchedParse.length === 0 && queueParse.length === 0) {
//       refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
//     } else {
//       console.log('Рендерим карточки массива из локалстор');
//       renderLibCard();
//     }
//   }
// }

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
