import modalTemplate from '../templates/modal-templates.hbs';
console.log(modalTemplate);

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

function onModalOpen(event) {
  const a = event.target;
  console.log(a);
  //если клик не на элемент li, тогда модальное окно не открывается
  const isCardElement = event.target.closest('li');
  movieId = isCardElement.firstElementChild.getAttribute('data-action');
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
  // if (!isBackdropIsHidden) {
  //   refs.body.classList.remove('no-scroll');
  // }
}

function onScroll() {
  refs.body.classList.remove('no-scroll');
  refs.modalWindow.textContent = '';
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
