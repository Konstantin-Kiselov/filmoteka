import headerTemplates from './header-tpl';

const refs = {
  header: document.querySelector('.header-container-js'),
  filmsGallery: document.querySelector('#films-gallery'),
  paginationContainer: document.querySelector('#pagination'),
  libraryBtn: document.querySelector('.navigation-list-item-link-my-library'),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
};

// console.log(refs.libraryBtn);
// console.log(refs.homeLink);
refs.libraryBtn.addEventListener('click', libraryHandleClick);

function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
  const watchedFilms = getUserWatchedFromDatabase(currentUserId);
  const queuedFilms = getUserQueueFromDatabase(currentUserId);
  updateHeaderMarkup(headerTemplates.myLibraryHeader);

  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }

  const watchedBtn = document.querySelector('.header-button-watched');
  const queueBtn = document.querySelector('.header-button-queue');

  refs.filmsGallery.innerHTML = '';
  refs.paginationContainer.style.display = 'none';
  updateFilmsLibraryMarkup(watchedFilms);

  function onLibraryButtonsClick(activeBtn, inactiveBtn, films) {
    activeBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup(films);
      inactiveBtn.classList.remove('is-active-btn');
      activeBtn.classList.add('is-active-btn');
    });
  }

  onLibraryButtonsClick(queueBtn, watchedBtn, queuedFilms);
  onLibraryButtonsClick(watchedBtn, queueBtn, watchedFilms);

  function updateFilmsLibraryMarkup(localStorageFilms) {
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