import debounce from 'lodash.debounce';
import templateGalleryFilms from '../templates/films-gallery.hbs';
import fetchMovieByKeyWord from './api-key-word.js';

const refs = {
  gallery: document.querySelector('.gallery-list'),
  input: document.querySelector('.navigation__search'),
};

refs.input.addEventListener('input', debounce(onSearchMovie, 1000));

function renderSearchGallery(data) {
  const markup = templateGalleryFilms(data);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}

function onSearchMovie(e) {
  refs.gallery.innerHTML = '';
  const searchQuery = e.target.value.trim();
  console.log(searchQuery);

  fetchMovieByKeyWord(searchQuery)
    .then(data => {
      renderSearchGallery(data);
    })
    .catch(e => {
      console.log(e);
    });
}

// class Api2 {
//   constructor() {
//     this.page = 1;
//     // this.searchQuery = '';
//   }

//   fetchMovieByKeyWord() {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=b32f977d148061c9ab22a471ff2c7792&language=en-US&page=${this.page}&include_adult=false&query=cat`;

//     return fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         this.incrementPage();
//         console.log(data.results);
//         return data.results;
//       });
//   }

//   incrementPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

// document.addEventListener('DOMContentLoaded', renderSearchGallery);

// const newApi2 = new Api2();

// function renderSearchGallery(results) {
//   newApi2.fetchMovieByKeyWord().then(img => {
//     const markup = templateGalleryFilms(img);
//     refs.gallery.insertAdjacentHTML('beforeend', markup);
//   });
// }

export { onSearchMovie, renderSearchGallery };
