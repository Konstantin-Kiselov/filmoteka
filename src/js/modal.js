import modalTemplate from '../templates/modal-templates.hbs';
import emptyLibrary from '../templates/empty-library.hbs';
import headerLibrary from '../templates/header-library.hbs';
import libraryCard from '../templates/library-card.hbs';
import {
  fetchMovieListById,
  renderWatchedList,
  renderQueueList,
  renderLibCard,
} from './my-library';

// ============ Проверяем локал сторадж на наличие данных ============
if (localStorage.getItem('watched') === null) {
  localStorage.setItem('watched', JSON.stringify([]));
}

if (localStorage.getItem('queue') === null) {
  localStorage.setItem('queue', JSON.stringify([]));
}

const watchedParse = JSON.parse(localStorage.getItem('watched'));
const queueParse = JSON.parse(localStorage.getItem('queue'));
// const libraryParse = JSON.parse(localStorage.getItem('libraryId'));

const refs = {
  body: document.querySelector('body'),
  openModalBtn: document.querySelector('.gallery-list'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  modal: document.querySelector('.modal'),
  modalWindow: document.querySelector('.modal-movie-card'),
  modalBackdrop: document.querySelector('.backdrop '),
  modalImg: document.querySelector('.modal-img'),
  addWatchedBtn: document.querySelector('.add-watched-btn'),
  addQueueBtn: document.querySelector('.add-queue-btn'),
  galleryList: document.querySelector('.gallery-list'),
  header: document.querySelector('.header'),
};

let movieId;

refs.openModalBtn.addEventListener('click', onModalOpen);
refs.closeModalBtn.addEventListener('click', onModalClose);

function onModalOpen(event) {
  const a = event.target;

  //если клик не на элемент li, тогда модальное окно не открывается
  const isCardElement = event.target.closest('li');
  if (!isCardElement) {
    return;
  }
  movieId = isCardElement.firstElementChild.getAttribute('data-movie-id');
  // console.log(movieId);
  // const a = event.target.value;

  event.preventDefault();
  toggleModal();
  // renderModalMarkUP(modalTemplate);
  fetchMovieInform();
  // refs.closeModalBtn.removeEventListener();
  stopScroll();

  // ============ Вешаем слушателя на кнопку Watched ============
  refs.addWatchedBtn.addEventListener('click', onClickWatch);

  //============ Вешаем слушателя на кнопку Queue ============
  refs.addQueueBtn.addEventListener('click', onClickQueue);

  // ===========================================================

  if (watchedParse.includes(movieId)) {
    refs.addWatchedBtn.classList.add('add-collection');
    refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (queueParse.includes(movieId)) {
    refs.addQueueBtn.classList.add('add-collection');
    refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';
  }

  return movieId;
}

//////////////// КНОПКА add ToQueue
function onClickQueue(e) {
  if (watchedParse.includes(movieId)) {
    addClassFromQueueBtn();
    removeClassFromWatchedBtn();

    addToQueueStorage(movieId, queueParse);

    const indexWatchedLocalStorage = watchedParse.indexOf(movieId);

    watchedParse.splice(indexWatchedLocalStorage, 1);

    localStorage.setItem('watched', JSON.stringify(watchedParse));

    if (refs.header.classList.contains('library') && refs.header.classList.contains('watched')) {
      // console.log('jjjjjjjjjjjjjjjj');
      renderWatchedList();
      return;
    }

    if (refs.header.classList.contains('library') && refs.header.classList.contains('queue')) {
      // console.log('jjjjjjjjjjjjjjjj');
      renderQueueList();
      return;
    }

    return;
  }
  // если есть класс-- Удаляем класс  и удаляем с локал стор
  if (!queueParse.includes(movieId)) {
    addClassFromQueueBtn();

    addToQueueStorage(movieId, queueParse);
    // const libraryFromLocalStorage = watchedParse.concat(queueParse);
    // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));

    if (refs.header.classList.contains('library') && refs.header.classList.contains('queue')) {
      renderQueueList();
      return;
    }

    return;
  }

  if (queueParse.includes(movieId)) {
    removeClassFromQueueBtn();

    const indexWatchedLocalStorage = queueParse.indexOf(movieId);

    queueParse.splice(indexWatchedLocalStorage, 1);

    localStorage.setItem('queue', JSON.stringify(queueParse));

    if (refs.header.classList.contains('header')) {
      // watchedParse = JSON.parse(localStorage.getItem('watched'));
      return;
    }

    /////////////////////////////////////////// 14.09 Люда
    // if (refs.header.classList.contains('library')) {
    //   renderWatchedList();
    //   return;
    // }

    if (refs.header.classList.contains('library') && refs.header.classList.contains('queue')) {
      renderQueueList();
      return;
    }

    if (refs.header.classList.contains('library') && refs.header.classList.contains('watched')) {
      renderWatchedList();
      return;
    }

    /////////////////////////////////////////// 14.09 Люда

    // else {
    //   renderLibCard();
    // }
  }
}

//////////////// КНОПКА add To Watched
function onClickWatch(e) {
  if (queueParse.includes(movieId)) {
    addClassFromWatchedBtn();
    removeClassFromQueueBtn();

    addToWatchedStorage(movieId, watchedParse);
    const indexWatchedLocalStorage = queueParse.indexOf(movieId);

    queueParse.splice(indexWatchedLocalStorage, 1);

    localStorage.setItem('queue', JSON.stringify(queueParse));

    if (refs.header.classList.contains('library') && refs.header.classList.contains('watched')) {
      renderWatchedList();
      return;
    }

    if (refs.header.classList.contains('library') && refs.header.classList.contains('queue')) {
      renderQueueList();
      return;
    }

    return;
  }
  // if(refs.addWatchedBtn.classList.contains('add-collection'));

  // если есть класс-- Удаляем класс  и удаляем с локал стор
  if (!watchedParse.includes(movieId)) {
    addClassFromWatchedBtn();

    addToWatchedStorage(movieId, watchedParse);

    if (refs.header.classList.contains('library') && refs.header.classList.contains('watched')) {
      renderWatchedList();
      return;
    }

    // const libraryFromLocalStorage = watchedParse.concat(queueParse);
    // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));

    return;
  }

  if (watchedParse.includes(movieId)) {
    removeClassFromWatchedBtn();

    const indexWatchedLocalStorage = watchedParse.indexOf(movieId);

    watchedParse.splice(indexWatchedLocalStorage, 1);

    localStorage.setItem('watched', JSON.stringify(watchedParse));

    // localStorage.setItem('queue', JSON.stringify(queueParse));

    if (refs.header.classList.contains('header')) {
      // watchedParse = JSON.parse(localStorage.getItem('watched'));
      return;
    }

    /////////////////////////////////////////// 14.09 Люда    && refs.header.classList.contains('queue')
    if (refs.header.classList.contains('library') && refs.header.classList.contains('watched')) {
      renderWatchedList();
      return;
    }

    if (refs.header.classList.contains('library') && refs.header.classList.contains('queue')) {
      renderQueueList();
      return;
    }

    // else {
    //   renderLibCard();
    // }
  }
}

function toggleModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.toggle('is-hidden');
}

// Закрытие модального окна по нажатию на кнопку закрыть
function onModalClose() {
  // refs.modal.classList.remove('is-hidden');
  // refs.addWatchedBtn.classList.remove('add-collection');
  // refs.addWatchedBtn.textContent = 'ADD TO WATCHED';

  toggleModal();
  onScroll();
  /////////////////////========================10.09 Люда====================================
  removeClassFromWatchedBtn();
  removeClassFromQueueBtn();

  /////////////////

  //снимаем слушатели
  window.removeEventListener('keydown', onEscKeyPress);
  // refs.modal.removeEventListener('click', onModalCloseBackdrop);
  refs.addWatchedBtn.addEventListener('click', onClickWatch);
  refs.addWatchedBtn.removeEventListener('click', onClickWatch);
  refs.addQueueBtn.removeEventListener('click', onClickQueue);

  // refs.addWatchedBtn.removeEventListener('click', addWatch);
  // refs.addQueueBtn.removeEventListener('click', addQueue);

  // refs.addWatchedBtn.classList.remove('add-collection');
  // refs.addWatchedBtn.removeEventListener('click', addWatch);
  // refs.addQueueBtn.classList.remove('add-collection');
  // refs.addQueueBtn.removeEventListener('click', addQueue);
  //   refs.modalWindow.removeEventListener();
  //   // refs.modalWindow.textContent = '';
  //   refs.modalImg.setAttribute('src', '');
}

// Закрытие модального окна по нажатию клавиши ESC
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';

  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    toggleModal();
    onScroll();
    /////////////////////========================10.09 Люда====================================
    removeClassFromWatchedBtn();
    removeClassFromQueueBtn();
    /////////////////
  }
}

// Закрытие модального окна по клику на backdrop.
refs.modal.addEventListener('click', onModalCloseBackdrop);
function onModalCloseBackdrop(evt) {
  const isBackdrop = evt.target.classList.contains('backdrop');

  if (isBackdrop) {
    toggleModal();
    onScroll();
    /////////////////////========================10.09 Люда====================================
    removeClassFromWatchedBtn();
    removeClassFromQueueBtn();
    /////////////////
  }
}

//======================================== 10.09 Люда ======================
function addClassFromWatchedBtn() {
  refs.addWatchedBtn.classList.add('add-collection');
  refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';

  // const libraryFromLocalStorage = watchedParse.concat(queueParse);
  // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
}

function removeClassFromWatchedBtn() {
  refs.addWatchedBtn.classList.remove('add-collection');
  refs.addWatchedBtn.textContent = 'ADD TO WATCHED';

  // const libraryFromLocalStorage = watchedParse.concat(queueParse);
  // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));

  // renderLibCard();
}

function addClassFromQueueBtn() {
  refs.addQueueBtn.classList.add('add-collection');
  refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';

  // const libraryFromLocalStorage = watchedParse.concat(queueParse);
  // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
}

function removeClassFromQueueBtn() {
  refs.addQueueBtn.classList.remove('add-collection');
  refs.addQueueBtn.textContent = 'ADD TO QUEUE';
  // const libraryFromLocalStorage = watchedParse.concat(queueParse);
  // localStorage.setItem('libraryId', JSON.stringify(libraryFromLocalStorage));
}

//========================================

//рендер информации о фильме
function renderModalMarkUP(movie) {
  refs.modalWindow.textContent = '';
  // refs.modalImg.setAttribute('src', '');
  const markUp = modalTemplate(movie);
  refs.modalWindow.insertAdjacentHTML('beforeend', markUp);
  // console.log('render');
  stopScroll();
}

//запрос id фильма
function fetchMovieInform() {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US`;

  fetch(BASE_URL).then(response => response.json().then(renderModalMarkUP));
}

// function movieDetails(movie) {
//   // console.log(movie);
//   // refs.modalWindow.textContent = '';
//   renderModalMarkUP(movie);
// }

//чтобы не скролился body под модалкой
function stopScroll() {
  const isBackdropIsHidden = refs.modalBackdrop.classList.contains('is-hidden');

  if (!isBackdropIsHidden) {
    // refs.body.style.overflow = 'hidden';
    refs.body.classList.add('no-scroll');
  }
}

//чтобы скролилась страница после закрытия модального окна
function onScroll() {
  refs.body.classList.remove('no-scroll');
  //очистить контент, чтобы при новой загрузке информации в модальное окно предыдущий контент был очищен
  refs.modalWindow.textContent = '';
  // refs.modalImg.setAttribute('src', '');
}

// function renderModalMarkUP(modalTemplate) {
//     const markUp = countre(modalTemplate);
//     refs.modalWindow.insertAdjacentHTML('afterend', markUp);
// }

// function renderModalMarkUP(countries) {
//     const markUp = countre(countries);
//     refs.getCountriesList.innerHTML = markUp;
//     console.log('one country');
// }

// ================ Добавляет фильмы в LocalStorage ================

// const myLibrarylink = document.querySelector('.navigation__link');
// myLibrarylink.addEventListener('click', renderCardLibrary);

function addToWatchedStorage(movieId, watchedParse) {
  // refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  if (watchedParse.includes(movieId)) {
    return;
  }
  watchedParse.push(movieId);
  localStorage.setItem('watched', JSON.stringify(watchedParse));
}

function addToQueueStorage(movieId, queueParse) {
  // refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';
  if (queueParse.includes(movieId)) {
    return;
  }
  queueParse.push(movieId);
  localStorage.setItem('queue', JSON.stringify(queueParse));
}

export { watchedParse, queueParse };
