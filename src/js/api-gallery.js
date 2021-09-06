import templateGalleryFilms from '../templates/films-gallery.hbs';
import genresJson from './genres.json';
import genreCard from '../templates/genre-card.hbs';

// function forGenres() {
const { genres } = genresJson;
// return genres;
// }

const galleryEl = document.querySelector('.gallery-list');

class NewApiService {
  constructor() {
    this.page = 1;
  }

  fetchArticles() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=b32f977d148061c9ab22a471ff2c7792&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        //fetchGenres().then(({ genres }) => {
        //  updateMovieMarkup(results, genres);
        // });
        this.incrementPage();
        console.log(results);
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

  //fetchGenres() {
  //return fetch(
  //  `https://api.themoviedb.org/3/genre/movie/list?api_key=b32f977d148061c9ab22a471ff2c7792&page=${this.page}`,
  // ).then(response => response.json());
  //}

  // updateMovieMarkup(films, genres) {
  //  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
  //  const filterGenres = genres.filter(genre => genre_ids.includes(genre.id));
  //  const mapGenres = filterGenres.map(({ name }) => name);
  //  if (mapGenres.length > 3) {
  //    mapGenres.splice(3, 0, 'Other');
  //  }
  // const movieGenres = mapGenres.slice(0, 4).join(', ');
  //  const releaseDate = release_date.split('-'[0]);

  //  let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

  // const movie = [{ id, img, title, movieGenres, releaseDate }];
  // updateMarkup(movie);
  // console.log(movie);
  // });
  //}
}

//function updateMarkup(movie) {
//newApiService.fetchArticles().then(() => {
//  let markup = '';
//  if (movie.status !== '404') {
//    markup = genreCard(movie);
//   }
//  galleryEl.insertAdjacentHTML('beforeend', markup);
// });
// }

// Функция для отрисовки фильмов через template  в HTML

document.addEventListener('DOMContentLoaded', renderCardGallery);

//document.addEventListener('DOMContentLoaded', updateMarkup);
//document.addEventListener('DOMContentLoaded', bossPage);

const newApiService = new NewApiService();

function renderCardGallery(results) {
  newApiService.fetchArticles().then(results => {
    const markup = templateGalleryFilms(results);
    galleryEl.insertAdjacentHTML('beforeend', markup);
    updateMovieMarkup(results, genres);
  });
}

//function renderCardGallery(results) {
// const markup = templateGalleryFilms(results);
// galleryEl.insertAdjacentHTML('beforeend', markup);

//}

//async function bossPage() {
// const data = await newApiService.fetchArticles();
// console.log(data);

//const movies = data.results;
//console.log(movies);

//const genresStart = forGenres();
//const bigTrend = trendFilms(movies, genresStart);
//renderCardGallery(bigTrend);
//console.log(results);
//}

//function createGenresFromTrend(array) {
// return array.genres
//  .map(genres => genres.name)
//  .slice(0, 3)
//   .flat();
//}

// Слияние полной информации о фильме для трендов

//function trendFilms(films, genresJson) {
// return films.map(film => ({
//   ...film,
//   genres: createGenresFromTrend(film.genre_ids, genresJson),
// }));
//}

function updateMovieMarkup(films, genres) {
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filterGenres = genres.filter(genre => genre_ids.includes(genre.id));
    const mapGenres = filterGenres.map(({ name }) => name);
    if (mapGenres.length > 3) {
      mapGenres.splice(3, 0, 'Other');
    }
    const movieGenres = mapGenres.slice(0, 4).join(', ');
    const releaseDate = release_date.slice(0, 4);

    let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

    const movie = [{ id, img, title, movieGenres, releaseDate }];

    console.log(movie);
    return movie;
  });
}

export { galleryEl, newApiService, renderCardGallery };
