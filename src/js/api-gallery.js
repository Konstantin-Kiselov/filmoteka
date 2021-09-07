import templateGalleryFilms from '../templates/films-gallery.hbs';
import genresJson from './genres.json';
import genreCard from '../templates/genre-card.hbs';

//function forGenres() {
const { genres } = genresJson;
// return genres;
//}

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
        fetchGenres().then(({ genres }) => {
          markupMovieFilm(results, genres);
        });
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
}

function fetchGenres() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=b32f977d148061c9ab22a471ff2c7792`,
  ).then(response => response.json());
  // .then(gen => {
  //   genres = gen.genres;
  //   console.log(gen);
  //   fetchArticles();
  // });
}

//fetchGenres();

// Функция для отрисовки фильмов через template  в HTML

document.addEventListener('DOMContentLoaded', renderCardGallery);

//document.addEventListener('DOMContentLoaded', updateMarkup);
//document.addEventListener('DOMContentLoaded', bossPage);

const newApiService = new NewApiService();

function renderCardGallery(results, genres) {
  newApiService
    .fetchArticles()
    .markupMovieFilm()
    .then(results => {
      const markup = genreCard(results);
      galleryEl.insertAdjacentHTML('beforeend', markup);
    });
}

// function renderCollection(results) {
//   const markup = templateGalleryFilms(results);
//   galleryEl.insertAdjacentHTML('beforeend', markup);
// }

// async function bossPage() {
//   const data = await newApiService.fetchArticles();
//   console.log(data);

//   const movies = data.results;
//   console.log(movies);

//   const genresStart = forGenres();
//   const bigTrend = trendFilms(movies, genresStart);
//   renderCollection(bigTrend);
//   console.log(results);
// }

// function createGenresFromTrend(array, genres) {
//   return array
//     .map(id => genres.filter(element => element.id === id))
//     .slice(0, 3)
//     .flat();
// }

// // Слияние полной информации о фильме для трендов

// function trendFilms(films, genresJson) {
//   return films.map(film => ({
//     ...film,
//     genres: createGenresFromTrend(film.genre_ids, genresJson),
//   }));
// }

function markupMovieFilm(results, genres) {
  results.map(({ id, poster_path, title, release_date, genre_ids, vote_average }) => {
    const filterGenres = genres.filter(genre => genre_ids.includes(genre.id));
    const mapGenres = filterGenres.map(({ name }) => name);
    if (mapGenres.length > 3) {
      mapGenres.splice(3, 0, 'Other');
    }
    const filmGenres = mapGenres.slice(0, 4).join(', ');
    const releaseYear = release_date.slice(0, 4);

    let img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : emptyJpg;

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
  //});
}

export { galleryEl, newApiService, renderCardGallery };
