import templateGalleryFilms from '../templates/films-gallery.hbs';
console.log(templateGalleryFilms);
const galleryEl = document.querySelector('.gallery-list');

class NewApiService {
  constructor() {
    this.page = 1;
  }

  fetchArticles() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=32f8714cf637d439a8b71841fb721940&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        console.log(data.results);
        return data.results;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// Функция для отрисовки фильмов через template  в HTML

document.addEventListener('DOMContentLoaded', renderCardGallery);

const newApiService = new NewApiService();

function renderCardGallery(results) {
  newApiService.fetchArticles().then(img => {
    const markup = templateGalleryFilms(img);
    galleryEl.insertAdjacentHTML('beforeend', markup);
  });
}

export { galleryEl };
