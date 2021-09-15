import debounce from 'lodash.debounce';
import { newApiService, markupMovieFilm, renderCardGallery } from './api-gallery';

const refs = {
  gallery: document.querySelector('.gallery-list'),
  input: document.querySelector('.navigation__search'),
  searchForm: document.querySelector('.search'),
  errorMessage: document.querySelector('.error__message'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

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
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();

        return results;
      });
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
    if (localGenres === undefined) {
      const getLocalGenres = localStorage.getItem(STORAGE_KEY);
      localGenres = JSON.parse(getLocalGenres);
    }
    if (results.length === 0) {
      refs.errorMessage.classList.remove('hide_message');
      refs.errorMessage.textContent = 'По такому запросу ничего не найдено. Попробуйте еще раз';
      newApiService.resetPage();
      refs.input.value = '';
      newApiService.query = '';
      searchApiService.query = '';

      setTimeout(() => {
        refs.errorMessage.classList.add('hide_message');
      }, 3000);

      renderCardGallery();
    }
    // else if (results.length >= 1) {
    //   refs.errorMessage.classList.add('hide_message');
    // }

    markupMovieFilm(results, localGenres);
    return localGenres;
  });
}

function onSearchMovie(e) {
  refs.gallery.innerHTML = '';

  const searchQuery = e.target.value.trim();
  if (searchQuery.length === 0) {
    newApiService.query = searchQuery;
    searchApiService.query = searchQuery;

    newApiService.resetPage();
    renderCardGallery();
    return;
  }

  newApiService.query = searchQuery;
  searchApiService.query = searchQuery;
  searchApiService.resetPage();

  renderSearchGallery2();
}

export { renderSearchGallery2, searchApiService };
