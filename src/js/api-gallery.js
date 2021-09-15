import templateGalleryFilms from '../templates/films-gallery.hbs';
import genresJson from './genres.json';
import genreCard from '../templates/genre-card.hbs';
const STORAGE_KEY = 'genres';

const galleryEl = document.querySelector('.gallery-list');

///////////////////////////////////////////// 13.09 Люда
const container = document.querySelector('.container');
///////////////////////////////////////////// 13.09 Люда

class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=b32f977d148061c9ab22a471ff2c7792&page=${this.page}`;

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

// // Функция для отрисовки фильмов через template  в HTML

fetchGenres();

document.addEventListener('DOMContentLoaded', renderCardGallery);

const newApiService = new NewApiService();

// console.log(localGenres);

// const getGenres = fetchGenres().then(({ genres }) => {
//   // console.log(genres);
//   const storageGenres = JSON.stringify(genres);
//   localStorage.setItem(STORAGE_KEY, storageGenres);
//   // const getLocalGenres = localStorage.getItem(STORAGE_KEY);
//   // const localGenres = JSON.parse(getLocalGenres);
//   // console.log(localGenres);
//   return genres;
// });
// console.log(JSON.parse(getGenres));
let localGenres;

function renderCardGallery() {
  newApiService.fetchArticles().then(results => {
    // fetchGenres().then(genres => {
    if (localGenres === undefined) {
      const getLocalGenres = localStorage.getItem(STORAGE_KEY);
      localGenres = JSON.parse(getLocalGenres);
    }
    markupMovieFilm(results, localGenres);

    return localGenres;
  });
}

function fetchGenres() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=b32f977d148061c9ab22a471ff2c7792`,
  )
    .then(response => response.json())
    .then(({ genres }) => {
      const storageGenres = JSON.stringify(genres);
      localStorage.setItem(STORAGE_KEY, storageGenres);

      // -----------------------------------------------------------
      // const getLocalGenres = localStorage.getItem(STORAGE_KEY);
      // const localGenres = JSON.parse(getLocalGenres);
      // console.log(localGenres);
      // -----------------------------------------------------------
      // return localGenres;
    });
}

function markupMovieFilm(results, genres) {
  results.map(({ id, poster_path, title, release_date, genre_ids, vote_average }) => {
    const filterGenres = genres.filter(genre => genre_ids.includes(genre.id));

    const mapGenres = filterGenres.map(({ name }) => name);
    if (mapGenres.length > 3) {
      mapGenres.splice(3, 0, 'Other');
    }
    const filmGenres = mapGenres.slice(0, 4).join(', ');

    const releaseYear = release_date.slice(0, 4);

    let img = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

    const movie = [{ id, img, title, filmGenres, releaseYear, vote_average }];
    updateMarkup(movie);

    return movie;
  });
}

function updateMarkup(movie) {
  let markup = '';

  if (movie.status !== '404') {
    markup = genreCard(movie);
  }
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

/////////////    "Это будет второй вариант"

// function addGenres() {
//   localStorage.setItem(STORAGE_KEY, filmGenres);
//   const saveGenres = localStorage.getItem(STORAGE_KEY);

//   console.log(saveGenres);

//   // if (localStorage.getItem(STORAGE_KEY) === null) {
//   //   localStorage.setItem(STORAGE_KEY, JSON.stringify(arrWatchedFilms));
//   // }
// }
// addGenres();

//let arrGenresFilms = [];

// Функцтя для жанров проба

// function markupGenres(genres) {
//   genres.map(({ genres }) => {
//     arrGenresFilms.push(genres);
//   });
//   console.log(markupGenres);
// }
// const storageGenres = JSON.stringify(genres); // genres это массив объектов, который приходит после фетча
// localStorage.setItem('genres', storageGenres);

// function getArrWatchedFilms() {
//   // получает масив фильмов добавленных в  из локал сторедж
//   if (localStorage.getItem(STORAGE_KEY)) {
//     const arrString = localStorage.getItem(STORAGE_KEY);
//     const arrPars = JSON.parse(arrString);
//     return (arrWatchedFilms = [...arrPars]);
//   }
//   return [];
// }

export { galleryEl, newApiService, renderCardGallery, markupMovieFilm, updateMarkup };
