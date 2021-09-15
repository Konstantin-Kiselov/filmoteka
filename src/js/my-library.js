import emptyLibrary from '../templates/empty-library.hbs';
import headerLibrary from '../templates/header-library.hbs';
import libraryCard from '../templates/library-card.hbs';
import genreCard from '../templates/genre-card.hbs';
import { updateMarkup } from './api-gallery.js';
import { watchedParse, queueParse } from './modal.js';
import { ioContainer } from './io.js';

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
  emptyLib: document.querySelector('.js-empty-lib'),
};

function renderWatchedList() {
  refs.galleryList.innerHTML = '';
  refs.emptyLib.innerHTML = '';

  if (watchedParse.length === 0) {
    refs.emptyLib.insertAdjacentHTML('afterbegin', emptyLibrary());
    ///////////////////////////////////////// 15.09
    const emptyPar = document.querySelector('.emptyLibrary__title-par');
    emptyPar.textContent = 'WATCHED';

    const empty = document.querySelector('.emptyLibrary__text');
    empty.textContent = "There's nothing in the WATCHED yet.";
  } else {
    watchedParse.map(Id => {
      fetchMovieListById(Id).then(data => {
        let { poster_path, title, id, vote_average, genres, release_date } = data;

        const mapGenres = genres.map(({ name }) => name);

        if (mapGenres.length > 3) {
          mapGenres.splice(3, 0, 'Other');
        }
        const filmGenres = mapGenres.slice(0, 4).join(', ');

        let img = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

        const releaseYear = release_date.slice(0, 4);

        const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
        updateMarkup(movie);
      });
    });
  }
}

function renderQueueList() {
  refs.galleryList.innerHTML = '';
  refs.emptyLib.innerHTML = '';

  if (queueParse.length === 0) {
    refs.emptyLib.insertAdjacentHTML('afterbegin', emptyLibrary());
    ///////////////////////////////////////// 15.09
    const emptyPar = document.querySelector('.emptyLibrary__title-par');
    emptyPar.textContent = 'QUEUE';

    const empty = document.querySelector('.emptyLibrary__text');
    empty.textContent = "There's nothing in the QUEUE yet.";
  } else {
    queueParse.map(Id => {
      fetchMovieListById(Id).then(data => {
        let { poster_path, title, id, vote_average, genres, release_date } = data;

        const mapGenres = genres.map(({ name }) => name);

        if (mapGenres.length > 3) {
          mapGenres.splice(3, 0, 'Other');
        }
        const filmGenres = mapGenres.slice(0, 4).join(', ');

        let img = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

        const releaseYear = release_date.slice(0, 4);

        const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
        updateMarkup(movie);
      });
    });
  }
}

function addWatchedListener() {
  const watchedBtnListener = document.querySelector('#libraryWatchedBtn');
  const queueBtnListener = document.querySelector('#libraryQueueBtn');

  /////////////////////////////////////////// 13.09 Люда
  watchedBtnListener.classList.add('is-active-header-btn');
  /////////////////////////////////////////// 14.09 Люда
  refs.header.classList.add('watched');
  /////////////////////////////////////////// 14.09 Люда

  // if (watchedBtnListener.classList.contains('is-active-header-btn')) {
  // refs.galleryList.innerHTML = '';
  // refs.container.textContent = '';
  renderWatchedList();
  // return;
  // }

  queueBtnListener.addEventListener('click', () => {
    if (queueBtnListener.classList.contains('is-active-header-btn')) {
      return;
    }

    watchedBtnListener.classList.remove('is-active-header-btn');
    queueBtnListener.classList.add('is-active-header-btn');
    /////////////////////////////////////////// 14.09 Люда
    refs.header.classList.remove('watched');
    refs.header.classList.add('queue');
    /////////////////////////////////////////// 14.09 Люда

    renderQueueList();
  });
  /////////////////////////////////////////// 13.09 Люда

  // watchedBtnListener.addEventListener('click', renderWatchedList);
  /////////////////////////////////////////// 13.09 Люда
  watchedBtnListener.addEventListener('click', () => {
    // console.log('активная кнопка watched');
    if (watchedBtnListener.classList.contains('is-active-header-btn')) {
      return;
    }

    /////////////////////////////////////////// 14.09 Люда
    refs.header.classList.remove('queue');
    refs.header.classList.add('watched');
    /////////////////////////////////////////// 14.09 Люда
    queueBtnListener.classList.remove('is-active-header-btn');
    watchedBtnListener.classList.add('is-active-header-btn');

    renderWatchedList();
  });
  /////////////////////////////////////////// 13.09 Люда

  /////////////////////////////////////////// 13.09 Люда
  // queueBtnListener.addEventListener('click', () => {
  // console.log('активная кнопка queue');
  // queueBtnListener.classList.add('is-active-header-btn');
  // watchedBtnListener.classList.remove('is-active-header-btn');
  // });
  return;
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

    if (refs.header.classList.contains('library')) {
      ioContainer.classList.add('io-hidden');
    }
    //////////olyaaa проба дозагрузки скроллом популярных
    // if (
    //   refs.header.classList.contains('library') &&
    //   watchedParse.length === 0 &&
    //   queueParse.length === 0
    // ) {
    //   ioContainer.classList.remove('io-hidden');
    // }
    //////////////////////////////////////////////////////
    refs.header.innerHTML = '';
    // refs.ioContainer.classList.add('hidden_library');

    refs.header.insertAdjacentHTML('afterbegin', headerLibrary());

    addWatchedListener();
    // if (watchedParse.length === 0 && queueParse.length === 0) {
    //   refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
    // } else {
    //   console.log('Рендерим карточки массива из локалстор');
    // renderLibCard();

    //////////////////// при переходе в библиотеку по умолчанию выбрана кнопка просмотреных
    // renderWatchedList();
    // }
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
    fetchMovieListById(Id).then(data => {
      let { poster_path, title, id, vote_average, genres, release_date } = data;

      const mapGenres = genres.map(({ name }) => name);

      if (mapGenres.length > 3) {
        mapGenres.splice(3, 0, 'Other');
      }
      const filmGenres = mapGenres.slice(0, 4).join(', ');

      let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

      const releaseYear = release_date.slice(0, 4);

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
