import emptyLibrary from '../templates/empty-library.hbs';
import headerLibrary from '../templates/header-library.hbs';
import libraryCard from '../templates/library-card.hbs';
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
  if (watchedParse.length === 0) {
    refs.galleryList.innerHTML = '';
    refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
  } else {
    // const libraryFromLocalStorage = watchedParse.concat(queueParse);

    // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
    //  localStorage.getItem('watched')
    const genresName = [];
    refs.galleryList.innerHTML = '';
    watchedParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        console.log(data);
        console.log(data.genres);
        //[data].map(({ release_date, genres }) => {
        // console.log(genresName);
        const dataGenres = data.genres.map(({ name }) => {
          genresName.push(name);
          console.log(genresName.length);

          return genresName;
        });
        if (genresName.length > 3) {
          genresName.splice(3, 0, 'Other');
          console.log(genresName);
        }
        const filmGenres = genresName.slice(0, 4).join(', ');
        console.log(filmGenres);

        const releaseYear = data.release_date.slice(0, 4);
        console.log(data.release_date);

        const movie = { filmGenres, releaseYear };
        console.log(movie);
        console.log(filmGenres);

        const markupLibrary = libraryCard(data, movie);

        refs.galleryList.insertAdjacentHTML('afterbegin', markupLibrary);

        return movie;
      });
      // console.log('Рендерим карточки по запросу');
      // });
    });
  }
}

function renderQueueList() {
  if (queueParse.length === 0) {
    refs.galleryList.innerHTML = '';
    refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());
  } else {
    // const libraryFromLocalStorage = watchedParse.concat(queueParse);

    // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
    //  localStorage.getItem('watched')
    const genresName = [];
    refs.galleryList.innerHTML = '';
    queueParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        console.log(data);
        console.log(data.genres);
        //[data].map(({ release_date, genres }) => {
        // console.log(genresName);
        const dataGenres = data.genres.map(({ name }) => {
          genresName.push(name);
          console.log(genresName.length);

          return genresName;
        });
        if (genresName.length > 3) {
          genresName.splice(3, 0, 'Other');
          console.log(genresName);
        }
        const filmGenres = genresName.slice(0, 4).join(', ');
        console.log(filmGenres);

        const releaseYear = data.release_date.slice(0, 4);
        console.log(data.release_date);

        const movie = { filmGenres, releaseYear };
        console.log(movie);
        console.log(filmGenres);

        const markupLibrary = libraryCard(data, movie);

        refs.galleryList.insertAdjacentHTML('afterbegin', markupLibrary);

        return movie;
      });
      // console.log('Рендерим карточки по запросу');
      // });
    });
  }
}

function addWatchedListener() {
  const watchedBtnListener = document.querySelector('#libraryWatchedBtn');
  const queueBtnListener = document.querySelector('#libraryQueueBtn');
  console.log(watchedBtnListener);
  console.log(queueBtnListener);
  console.log(watchedParse);
  watchedBtnListener.addEventListener('click', renderWatchedList);
  queueBtnListener.addEventListener('click', renderQueueList);
}

// refs.library.classList.add('hidden_library');
refs.libraryBtn.addEventListener('click', changeHeader);

function changeHeader(event) {
  event.preventDefault();
  refs.header.innerHTML = '';
  // refs.ioContainer.classList.add('hidden_library');
  refs.header.classList.remove('header');
  refs.header.classList.add('library');
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

  function renderLibCard() {
    // const libraryFromLocalStorage = watchedParse.concat(queueParse);

    // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
    localStorage.setItem('watched', JSON.stringify(watchedParse));
    localStorage.setItem('queue', JSON.stringify(queueParse));

    const genresName = [];
    refs.galleryList.innerHTML = '';
    watchedParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        console.log(data);
        console.log(data.genres);
        //[data].map(({ release_date, genres }) => {
        // console.log(genresName);
        const dataGenres = data.genres.map(({ name }) => {
          genresName.push(name);
          console.log(genresName.length);

          return genresName;
        });
        if (genresName.length > 3) {
          genresName.splice(3, 0, 'Other');
          console.log(genresName);
        }
        const filmGenres = genresName.slice(0, 4).join(', ');
        console.log(filmGenres);

        const releaseYear = data.release_date.slice(0, 4);
        console.log(data.release_date);

        const movie = { filmGenres, releaseYear };
        console.log(movie);
        console.log(filmGenres);

        const markupLibrary = libraryCard(data, movie);

        refs.galleryList.insertAdjacentHTML('afterbegin', markupLibrary);

        return movie;
      });
      // console.log('Рендерим карточки по запросу');
      // });
    });
    queueParse.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        console.log(data);
        console.log(data.genres);
        //[data].map(({ release_date, genres }) => {
        // console.log(genresName);
        const dataGenres = data.genres.map(({ name }) => {
          genresName.push(name);
          console.log(genresName.length);

          return genresName;
        });
        if (genresName.length > 3) {
          genresName.splice(3, 0, 'Other');
          console.log(genresName);
        }
        const filmGenres = genresName.slice(0, 4).join(', ');
        console.log(filmGenres);

        const releaseYear = data.release_date.slice(0, 4);
        console.log(data.release_date);

        const movie = { filmGenres, releaseYear };
        console.log(movie);
        console.log(filmGenres);

        const markupLibrary = libraryCard(data, movie);

        refs.galleryList.insertAdjacentHTML('afterbegin', markupLibrary);

        return movie;
      });
      // console.log('Рендерим карточки по запросу');
      // });
    });
  }
}

//function filterCard() {}

function fetchMovieListById(movieId) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US`;

  return fetch(BASE_URL).then(response => response.json());
}

export { fetchMovieListById };
