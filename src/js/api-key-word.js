import debounce from 'lodash.debounce';
import templateGalleryFilms from '../templates/films-gallery.hbs';
import { newApiService, markupMovieFilm, updateMarkup } from './api-gallery';
import genresJson from './genres.json';
import genreCard from '../templates/genre-card.hbs';

const refs = {
  gallery: document.querySelector('.gallery-list'),
  input: document.querySelector('.navigation__search'),
};

refs.input.addEventListener('input', debounce(onSearchMovie, 1000));

const API_KEY = 'b32f977d148061c9ab22a471ff2c7792';
const BASE_URL = 'https://api.themoviedb.org/3/';

// ============ CLASS API 2 ============
class ApiKeyWord {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchMovieByKeyWord() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;
    return (
      fetch(url)
        .then(response => response.json())
        // .then(data => {
        //     this.incrementPage();
        //     // console.log(data.results);
        //     return data.results;

        .then(({ results }) => {
          this.incrementPage();
          console.log(results);
          return results;
        })
    );
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const searchApiService = new ApiKeyWord();

const STORAGE_KEY = 'genres';
let localGenres;
function renderSearchGallery2() {
  searchApiService.fetchMovieByKeyWord().then(results => {
    // fetchGenres().then(genres => {
    if (localGenres === undefined) {
      const getLocalGenres = localStorage.getItem(STORAGE_KEY);
      localGenres = JSON.parse(getLocalGenres);
      // console.log(localGenres);
    }
    console.log(results);
    markupMovieFilm(results, localGenres);
    return localGenres;
  });
}

// function renderSearchGallery(data) {
//   const markup = templateGalleryFilms(data);
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

function onSearchMovie(e) {
  refs.gallery.innerHTML = '';
  const searchQuery = e.target.value.trim();
  if (searchQuery.length <= 1) {
    console.log('nooooo');
  }

  newApiService.query = searchQuery;
  searchApiService.query = searchQuery;

  renderSearchGallery2();

  // searchApiService
  //   .fetchMovieByKeyWord()
  //   .then(({ results }) => {
  //     // console.log(data);
  //     renderSearchGallery2(data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
}

export { renderSearchGallery2, searchApiService };
