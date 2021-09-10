import headerTemplates from '../templates/header-tpl.hbs';
<<<<<<< Updated upstream
// import newApiService from './api-gallery';
import genre2 from '../templates/genre2-card.hbs';

const refs = {
  header: document.querySelector('.header'),
  filmsGallery: document.querySelector('#films-gallery'),
  // paginationContainer: document.querySelector('#pagination'),
  libraryBtn: document.querySelector('.navigation-link-my-library'),
  homeLink: document.querySelector('.navigation__link'),
};

// console.log(refs.libraryBtn);
// console.log(refs.homeLink);
// refs.libraryBtn.addEventListener('click', libraryHandleClick);

function updateHeaderMarkup() {
  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('afterbegin', headerTemplates());
  refs.libraryBtn.addEventListener('click', libraryHandleClick);
}
=======

const refs = {
  header: document.querySelector('header'),
  filmsGallery: document.querySelector('#films-gallery'),
  homeLink: document.querySelector('.navigation__link__home'),
  libraryBtn: document.querySelector('.navigation__link__library'),
};

refs.libraryBtn.addEventListener('click', libraryHandleClick);
>>>>>>> Stashed changes

function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
<<<<<<< Updated upstream
  // refs.header.classList.remove('header');
  // refs.header.classList.add('library');
=======
>>>>>>> Stashed changes
  updateHeaderMarkup(headerTemplates);

  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }

  //const watchedBtn = document.querySelector('.header-button-watched');
  //const queueBtn = document.querySelector('.header-button-queue');

<<<<<<< Updated upstream
  // refs.filmsGallery.innerHTML = '';
  // refs.paginationContainer.style.display = 'none';
  // updateFilmsLibraryMarkup(watchedFilms);

  function onLibraryButtonsClick(watchedBtn, queueBtn) {
    watchedBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup();
      queueBtn.classList.remove('is-active-btn');
      watchedBtn.classList.add('is-active-btn');
=======
  refs.filmsGallery.innerHTML = '';
  updateFilmsLibraryMarkup(watchedFilms);

  function onLibraryButtonsClick(activeBtn, inactiveBtn) {
    activeBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup();
      inactiveBtn.classList.remove('is-active-btn');
      activeBtn.classList.add('is-active-btn');
>>>>>>> Stashed changes
    });
  }

  const watchedBtn = document.querySelector('.header-button-watched');
  const queueBtn = document.querySelector('.header-button-queue');

  onLibraryButtonsClick(watchedBtn, queueBtn);
  onLibraryButtonsClick(queueBtn, watchedBtn);
  //onLibraryButtonsClick(queueBtn, watchedBtn, queuedFilms);
  //onLibraryButtonsClick(watchedBtn, queueBtn, watchedFilms);

  function updateHeaderMarkup(localStorageFilms) {
    if (!localStorageFilms) {
      refs.filmsGallery.innerHTML = '';
      const message = '<div class="films-gallery-warning"><p>No movie</p><div>';
      refs.filmsGallery.insertAdjacentHTML('beforeend', message);
      return;
    }

<<<<<<< Updated upstream
    //  refs.filmsGallery.innerHTML = '';
    //  localStorageFilms.map(({ id, poster_path, title, release_date, genres, vote_average }) => {
    //    const markup = genre2;
    //    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
    //  });
=======
    refs.filmsGallery.innerHTML = '';
    localStorageFilms.map(({ id, poster_path, title, release_date, genres, vote_average }) => {
      const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${genres.join(
    ', ',
  )} | ${release_date}<span class="modal-info-vote-average library">${vote_average}</span></p>
</li>
`;
      refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
    });
>>>>>>> Stashed changes
  }
}
