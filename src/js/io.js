import { newApiService, renderCardGallery } from './api-gallery';
import { searchApiService, renderSearchGallery } from './search-movies';

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query === '' && newApiService.page > 1) {
      //перед квери нужно влепить название класса получения fetch и точку)
      // console.log(entry);
      renderCardGallery();
      // функция рендера картинок должна быть тут)
    } else if (entry.isIntersecting && newApiService.query !== '' && searchApiService.page > 1) {
      searchApiService
        .fetchMovieByKeyWord()
        .then(data => {
          console.log(data);
          renderSearchGallery(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(document.querySelector('#intersection-observer'));
