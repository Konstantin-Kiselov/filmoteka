import libraryEmpty from './templates/empty-library.hbs';
import { galleryEl } from 'api-gallery';

//  Функция для пустой страницы в библиотеке
function emptyLib() {
  const markup = libraryEmpty();
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
