import headerTemplates from '../templates/header-tpl.hbs';
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

function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
  // refs.header.classList.remove('header');
  // refs.header.classList.add('library');
  updateHeaderMarkup(headerTemplates);

  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }

  //const watchedBtn = document.querySelector('.header-button-watched');
  //const queueBtn = document.querySelector('.header-button-queue');

  // refs.filmsGallery.innerHTML = '';
  // refs.paginationContainer.style.display = 'none';
  // updateFilmsLibraryMarkup(watchedFilms);

  function onLibraryButtonsClick(watchedBtn, queueBtn) {
    watchedBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup();
      queueBtn.classList.remove('is-active-btn');
      watchedBtn.classList.add('is-active-btn');
    });
  }

  const watchedBtn = document.querySelector('.header-button-watched');
  const queueBtn = document.querySelector('.header-button-queue');

  onLibraryButtonsClick(watchedBtn, queueBtn);
  onLibraryButtonsClick(queueBtn, watchedBtn);
  //onLibraryButtonsClick(queueBtn, watchedBtn, queuedFilms);
  //onLibraryButtonsClick(watchedBtn, queueBtn, watchedFilms);

  function updateFilmsLibraryMarkup(localStorageFilms) {
    if (!localStorageFilms) {
      refs.filmsGallery.innerHTML = '';
      const message = '<div class="films-gallery-warning"><p>No movie</p><div>';
      refs.filmsGallery.insertAdjacentHTML('beforeend', message);
      return;
    }

    //  refs.filmsGallery.innerHTML = '';
    //  localStorageFilms.map(({ id, poster_path, title, release_date, genres, vote_average }) => {
    //    const markup = genre2;
    //    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
    //  });
  }
}
