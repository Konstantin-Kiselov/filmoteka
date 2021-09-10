import headerTemplates from '../templates/header-tpl.hbs';

const refs = {
  header: document.querySelector('header'),
  filmsGallery: document.querySelector('#films-gallery'),
  homeLink: document.querySelector('.navigation__link__home'),
  libraryBtn: document.querySelector('.navigation__link__library'),
};

refs.libraryBtn.addEventListener('click', libraryHandleClick);
function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
  updateHeaderMarkup(headerTemplates);

  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }

  //const watchedBtn = document.querySelector('.header-button-watched');
  //const queueBtn = document.querySelector('.header-button-queue');

  refs.filmsGallery.innerHTML = '';
  updateFilmsLibraryMarkup(watchedFilms);

  function onLibraryButtonsClick(activeBtn, inactiveBtn) {
    activeBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup();
      inactiveBtn.classList.remove('is-active-btn');
      activeBtn.classList.add('is-active-btn');
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
  }
}
