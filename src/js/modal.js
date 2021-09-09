import modalTemplate from '../templates/modal-templates.hbs';
// console.log(modalTemplate);

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

  // ============ Проверяем локал сторадж на наличие данных ============
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', JSON.stringify([]));
  }
  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', JSON.stringify([]));
  }
  // ============ Вешаем слушателя на кнопку Watched ============
  refs.addWatchedBtn.addEventListener('click', addWatch);

  function addWatch() {
    const watchedParse = JSON.parse(localStorage.getItem('watched'));

    if (watchedParse.includes(movieId)) {
      refs.addWatchedBtn.classList.toggle('add-collection');
      refs.addWatchedBtn.textContent = 'ADD TO WATCHED';
      console.log('Удалить');
      return;
    } else if (!watchedParse.includes(movieId)) {
      refs.addWatchedBtn.classList.toggle('add-collection');
      refs.addWatchedBtn.textContent = 'REMOVE FROM WATCHED';
      addToWatchedStorage(movieId, watchedParse);
      console.log('Удалить 2');
      return;
    }

    console.log(watchedParse);
    console.log('А теперь добавляй');
  }
  //============ Вешаем слушателя на кнопку Queue ============
  refs.addQueueBtn.addEventListener('click', addQueue);

  function addQueue() {
    const queueParse = JSON.parse(localStorage.getItem('queue'));
    // console.log(queueParse);
    // console.log('А теперь добавляй');
    addToQueueStorage(movieId, queueParse);
  }
  // ===========================================================
  return;
}

function toggleModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.toggle('is-hidden');
}

// Закрытие модального окна по нажатию на кнопку закрыть
function onModalClose() {
  // refs.modal.classList.remove('is-hidden');
  toggleModal();
  onScroll();
  /////////////////
  refs.addWatchedBtn.removeEventListener('click', addWatch);
  refs.addQueueBtn.removeEventListener('click', addQueue);
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
  }
}

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
