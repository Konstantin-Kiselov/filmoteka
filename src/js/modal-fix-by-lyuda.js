import modalTemplate from '../templates/modal-templates.hbs';
console.log(modalTemplate);
// serg
import { galleryEl, newApiService, renderCardGallery } from '../js/api-gallery';
// serg
const refs = {
  body: document.querySelector('body'),
  openModalBtn: document.querySelector('.gallery-list'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  modal: document.querySelector('.modal'),
  modalWindow: document.querySelector('.modal-movie-card'),
  modalBackdrop: document.querySelector('.backdrop '),
  modalImg: document.querySelector('.modal-img'),
};

refs.openModalBtn.addEventListener('click', onModalOpen);

refs.closeModalBtn.addEventListener('click', onModalClose);
let movieId;
let fffff;

function onModalOpen(event) {
  const a = event.target;
  console.log(a);
  //если клик не на элемент li, тогда модальное окно не открывается
  const isCardElement = event.target.closest('li');
  movieId = isCardElement.firstElementChild.getAttribute('data-action');
  fffff = movieId.toString();
  console.log(fffff);
  console.log(movieId);
  if (!isCardElement) {
    return;
  }

  // const a = event.target.value;
  // console.log(a);

  event.preventDefault();

  toggleModal();
  // renderModalMarkUP(modalTemplate);
  fetchMovieInform();
  // refs.closeModalBtn.removeEventListener();

  stopScroll();
  ffffff();
}

//////////////////////////////////======================================///////////////////////////////////////////////////
function ffffff() {
  queueBtn.addEventListener('click', addToQueueStorage);

  function addToQueueStorage() {
    queueBtn.classList.toggle('add-collection');
    const ddd = queueBtn.classList.contains('add-collection');
    console.log(ddd);
    if (ddd) {
      hhhhhhhhhhhh();
    }
  }
}

function hhhhhhhhhhhh() {
  localStorage.setItem('cat', movieId);
  console.log(movieId);
  let cat = localStorage.getItem('cat');
}
////////////////////////////////////////////////////////////////==========================///////////////////
// console.log(fffff);

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
  console.log(isBackdrop);
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

  console.log('render');
  stopScroll();
}

//запрос
function fetchMovieInform() {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US`;

  fetch(BASE_URL).then(response => response.json().then(movieDetails));
}

function movieDetails(movie) {
  console.log(movie);

  // refs.modalWindow.textContent = '';
  renderModalMarkUP(movie);
}

//чтобы не скролился body под модалкой
function stopScroll() {
  const isBackdropIsHidden = refs.modalBackdrop.classList.contains('is-hidden');
  console.log(isBackdropIsHidden);
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

// serg:
const queueBtn = document.querySelector('.modal-add-btn');
console.log(queueBtn);
// queueBtn.addEventListener('click', addToQueueStorage);

// const myLibrarylink = document.querySelector('.navigation__link');
// myLibrarylink.addEventListener('.myLibrarylink');

// function aaaa() {
//   queueBtn.addEventListener('click', addToQueueStorage);
//   addToQueueStorage(movieId);
//   console.log(movieId);
// }
// //////////////////////////////////======================================///////////////////////////////////////////////////
// function ffffff() {
//   queueBtn.addEventListener('click', addToQueueStorage);

//   function addToQueueStorage() {
//     queueBtn.classList.toggle('add-collection');
//     const ddd = queueBtn.classList.contains('add-collection');
//     console.log(ddd);
//     if (ddd) {
//       hhhhhhhhhhhh();
//     }
//   }
// }

// function hhhhhhhhhhhh() {
//   localStorage.setItem('cat', movieId);
//   console.log(movieId);
//   let cat = localStorage.getItem('cat');
// }
// function renderCardLibrary() {}
