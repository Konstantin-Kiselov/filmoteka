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
  ioContainer: document.getElementById('intersection-observer'),
};

// refs.library.classList.add('hidden_library');
refs.libraryBtn.addEventListener('click', changeHeader);

function changeHeader(event) {
  event.preventDefault();
  refs.header.innerHTML = '';
  refs.ioContainer.classList.add('hidden_library');
  refs.header.classList.remove('header');
  refs.header.classList.add('library');
  refs.header.insertAdjacentHTML('afterbegin', headerLibrary());
  console.log(watchedParse);
  console.log(queueParse);
  if (watchedParse.length === 0 && queueParse.length === 0) {
    refs.galleryList.insertAdjacentHTML('beforebegin', emptyLibrary());

    // refs.galleryList.insertAdjacentHTML('afterbegin', emptyLibrary());
  } else {
    console.log('Рендерим карточки массива из локалстор');
    const libraryFromLocalStorage = watchedParse.concat(queueParse);

    localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
    const genresName = [];
    refs.galleryList.innerHTML = '';
    libraryFromLocalStorage.map(Id => {
      // console.log(Id);
      fetchMovieListById(Id).then(data => {
        console.log(data);
        console.log(data.genres);

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

        // if (data.release_date === data.release_date) {
        //   data.release_date.slice(0, 4);
        //   console.log(data.release_date);
        // }

        const markupLibrary = libraryCard(data);
        console.log(markupLibrary);
        refs.galleryList.insertAdjacentHTML('afterbegin', markupLibrary);
        console.log(filmGenres);
        return filmGenres;
        // console.log('Рендерим карточки по запросу');
      });
    });
  }
}

//function filterCard() {}

function fetchMovieListById(movieId) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US`;

  return fetch(BASE_URL).then(response => response.json());
}

// refs.homeLink.classList.add('current');

function changeClass(event) {
  event.preventDefault();
  refs.library.classList.remove('hidden_library');
  refs.header.classList.add('hidden_library');
  console.log('click');
  // currentLink();
  // refs.homeLink.classList.remove('current');
  // refs.libraryBtn.classList.add('current');
}

// function currentLink() {
//   refs.homeLink.classList.remove('current');
//   refs.libraryBtn.classList.add('current');
// }
// // console.log(refs.libraryBtn);
// // console.log(refs.homeLink);
// refs.libraryBtn.addEventListener('click', renderLibraryTest);
console.log(refs.libraryBtn);

// function markupMovieFilm(results, genres) {
//   results.map(({ id, poster_path, title, release_date, genre_ids, vote_average }) => {
//     // console.log(genres);

//     const filterGenres = genres.filter(genre => genre_ids.includes(genre.id));

//     const mapGenres = filterGenres.map(({ name }) => name);
//     if (mapGenres.length > 3) {
//       mapGenres.splice(3, 0, 'Other');
//     }
//     const filmGenres = mapGenres.slice(0, 4).join(', ');

//     const releaseYear = release_date.slice(0, 4);

//     let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

//     const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
//     updateMarkup(movie);
//     return movie;
//   });
// }

// function renderLibraryTest() {
//   // if (localStorage.getItem('watched') === [] && localStorage.getItem('queue') === []) {
//   // const empty = '';
//   // const watched = localStorage.getItem('watched');
//   // console.log('watched');
//   // refs.galleryList.innerHTML = '';
//   refs.galleryList.insertAdjacentHTML('beforeend', emptyLibrary);
// }
// function libraryHandleClick(event) {
//   event.preventDefault();
//   refs.homeLink.classList.remove('current');
//   refs.libraryBtn.classList.add('current');
//   // const watchedFilms = ();
//   // const queuedFilms = ();
//   updateHeaderMarkup(headerTemplates.myLibraryHeader);

//   if (document.querySelector('.modal')) {
//     document.querySelector('.modal').remove();
//   }

//   const watchedBtn = document.querySelector('.header-button-watched');
//   const queueBtn = document.querySelector('.header-button-queue');

//   function onLibraryButtonsClick(activeBtn, inactiveBtn, films) {
//     activeBtn.addEventListener('click', event => {
//       event.preventDefault();
//       updateFilmsLibraryMarkup(films);
//       inactiveBtn.classList.remove('is-active-btn');
//       activeBtn.classList.add('is-active-btn');
//     });
//   }

//   onLibraryButtonsClick(queueBtn, watchedBtn, queuedFilms);
//   onLibraryButtonsClick(watchedBtn, queueBtn, watchedFilms);

//   function updateFilmsLibraryMarkup(localStorageFilms) {
//     if (!localStorageFilms) {
//       refs.filmsGallery.innerHTML = '';
//       const message =
//         '<div class="films-gallery-warning"><p>No movies here yet. Visit Home to add some =)</p><div>';
//       refs.filmsGallery.insertAdjacentHTML('beforeend', message);
//       return;
//     }

//     refs.filmsGallery.innerHTML = '';
//     localStorageFilms.map(({ id, poster_path, title, release_date, genres, vote_average }) => {
//       const markup = `
// <li class="films-gallery-item" data-id="${id}">
//   <img
//     class="films-gallery-item-image"
//     src="https://image.tmdb.org/t/p/w342${poster_path}"
//     alt="«${title}» film poster"
//   >
//   <p class="films-gallery-item-title">${title.toUpperCase()}</p>
//   <p class="films-gallery-item-info">${genres.join(
//     ', ',
//   )} | ${release_date}<span class="modal-info-vote-average library">${vote_average}</span></p>
// </li>
// `;
//       refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
//     });
//   }
// }
