//// ссылка на арi фетч фильма по id //////
import NewApiService from './api-gallery';
////////           /////////
import StorageApi from './api-storage';
import modalTpl from '../templates/modal.hbs';

let idFilm;
const storageApi = new StorageApi();
const filmApi = new NewApiService();

function a(e) {
  e.preventDefault();
  idFilm = e.currentTarget.getAttribute('data-action');
  //// Здесь должен быть фетч фильма по id ///////
  filmApi.fetchFilm(idFilm).then(function (movie) {
    ///////                      ////////////
    const modalContainer = document.querySelector('.modal-container');
    const card = modalTpl(movie);
    modalContainer.innerHTML = card;

    let addWatchBtn = document.querySelector('.add-to-watched-js');
    let addQueueBtn = document.querySelector('.add-to-queue-js');
    let closeModalBtn = document.querySelector('.modal-close-btn');

    addWatchBtn.addEventListener('click', e => {
      addToWatchedList(e, movie);
      addWatchBtn.classList.toggle('button-modal-is-active');
    });
    addQueueBtn.addEventListener('click', e => {
      addToQueueList(e, movie);
      addQueueBtn.classList.toggle('button-modal-is-active');
    });
    closeModalBtn.addEventListener('click', toggleModal);
    toggleModal(movie);
  });
}

function addToWatchedList(e, movie) {
  e.preventDefault();
  storageApi.addToWatched(movie);
  console.log('adToWachedList');
}

function addToQueueList(e, movie) {
  console.log(movie);
  e.preventDefault();
  storageApi.addToQueue(movie);

  console.log('addToQueueList');
}

// /////////////////
// const refs = {
//   addWatchBtn: document.querySelector('.add-to-watched-js'),
//   addQueueBtn: document.querySelector('.add-to-queue-js'),
// };

// refs.addWatchBtn.addEventListener('click', onWatchedBtnClick);
// refs.addQueueBtn.addEventListener('click', onQueueBtnClick);

// function onWatchedBtnClick(e) {
//   e.preventDefault();
// }

// function onQueueBtnClick(e) {
//   e.preventDefault();
// }
