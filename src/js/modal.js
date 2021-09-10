import modalTemplate from '../templates/modal-templates.hbs';
// console.log(modalTemplate);

// ============ Проверяем локал сторадж на наличие данных ============
if (localStorage.getItem('watched') === null) {
  localStorage.setItem('watched', JSON.stringify([]));
}

if (localStorage.getItem('queue') === null) {
  localStorage.setItem('queue', JSON.stringify([]));
}

const watchedParse = JSON.parse(localStorage.getItem('watched'));
const queueParse = JSON.parse(localStorage.getItem('queue'));

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
};

let movieId;

refs.openModalBtn.addEventListener('click', onModalOpen);
refs.closeModalBtn.addEventListener('click', onModalClose);

function onModalOpen(event) {
  const a = event.target;
  // console.log(a);
  //если клик не на элемент li, тогда модальное окно не открывается
  const isCardElement = event.target.closest('li');
  if (!isCardElement) {
    return;
  }
  movieId = isCardElement.firstElementChild.getAttribute('data-movie-id');
  // console.log(movieId);
  // const a = event.target.value;
  // console.log(a);

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
    console.log('ura');
    refs.addWatchedBtn.classList.add('add-collection');
    refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (queueParse.includes(movieId)) {
    refs.addQueueBtn.classList.add('add-collection');
    refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';
    console.log('u!!ra');
  }

  return movieId;
}

//////////////// КНОПКА add ToQueue
function onClickQueue(e) {
  // если есть класс-- Удаляем класс  и удаляем с локал стор
  if (!queueParse.includes(movieId)) {
    addClassFromQueueBtn();

    addToQueueStorage(movieId, queueParse);

    return;
  }

  if (queueParse.includes(movieId)) {
    removeClassFromQueueBtn();

    // const indexWatchedLocalStorage = watchedParse.indexOf(movieId);
    // console.log(indexWatchedLocalStorage);
    // watchedParse.splice(indexWatchedLocalStorage, 1);
    // addToWatchedStorage(movieId, watchedParse);

    const indexWatchedLocalStorage = queueParse.indexOf(movieId);
    console.log(indexWatchedLocalStorage);
    queueParse.splice(indexWatchedLocalStorage, 1);
    console.log(queueParse);
    localStorage.setItem('queue', JSON.stringify(queueParse));

    return;
  }

  // refs.addQueueBtn.classList.add('add-collection');

  // console.log(queueParse);
  // console.log('А теперь добавляй');
}

//////////////// КНОПКА add To Watched
function onClickWatch(e) {
  // если есть класс-- Удаляем класс  и удаляем с локал стор
  if (!watchedParse.includes(movieId)) {
    addClassFromWatchedBtn();

    addToWatchedStorage(movieId, watchedParse);

    return;
  }

  if (watchedParse.includes(movieId)) {
    removeClassFromWatchedBtn();

    const indexWatchedLocalStorage = watchedParse.indexOf(movieId);
    console.log(indexWatchedLocalStorage);
    watchedParse.splice(indexWatchedLocalStorage, 1);
    console.log(watchedParse);
    localStorage.setItem('watched', JSON.stringify(watchedParse));
    // addToWatchedStorage(movieId, watchedParse);

    return;
  }

  //   refs.addWatchedBtn.classList.remove('add-collection');
  //   refs.addWatchedBtn.textContent = 'ADD TO WATCHED';

  //   console.log('Прописать функцию удаления из локалстор WATCHED');

  //   return;
  // }

  // if (!refs.addWatchedBtn.classList.contains('add-collection')) {

  //   if (refs.addQueueBtn.classList.contains('add-collection')) {
  //     console.log('Удалить из локал стор QUEUE');
  //   }
}
// else if () {
//     refs.addWatchedBtn.classList.remove ('is-active');
//     refs.addWatchedBtn.textContent = '';
//   }

// console.log(watchedParse);
// console.log('А теперь добавляй');

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
  //console.log(event.code);
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
  // console.log(isBackdrop);
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
}

function removeClassFromWatchedBtn() {
  refs.addWatchedBtn.classList.remove('add-collection');
  refs.addWatchedBtn.textContent = 'ADD TO WATCHED';

  console.log('hhhhhhhhhhhhhhhh');
}

function addClassFromQueueBtn() {
  refs.addQueueBtn.classList.add('add-collection');
  refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';
}

function removeClassFromQueueBtn() {
  refs.addQueueBtn.classList.remove('add-collection');
  refs.addQueueBtn.textContent = 'ADD TO QUEUE';

  console.log('hhhhhhhhhhhhhhhh');
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

  fetch(BASE_URL).then(response => response.json().then(movieDetails));
}

function movieDetails(movie) {
  // console.log(movie);
  // refs.modalWindow.textContent = '';
  renderModalMarkUP(movie);
}

//чтобы не скролился body под модалкой
function stopScroll() {
  const isBackdropIsHidden = refs.modalBackdrop.classList.contains('is-hidden');
  // console.log(isBackdropIsHidden);
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
  console.log(movieId);
  // refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  if (watchedParse.includes(movieId)) {
    return;
  }
  watchedParse.push(movieId);
  localStorage.setItem('watched', JSON.stringify(watchedParse));
}

function addToQueueStorage(movieId, queueParse) {
  console.log(movieId);
  // refs.addQueueBtn.textContent = 'REMOVE FROM QUEUE';
  if (queueParse.includes(movieId)) {
    return;
  }
  queueParse.push(movieId);
  localStorage.setItem('queue', JSON.stringify(queueParse));
}

// function renderCardLibrary() {
//   console.log('Я отрендерил локал сторадж');
// }
