import { newApiService, renderCardGallery } from './api-gallery';
import { newApi2, renderSearchGallery } from './search-movies';

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query !== '' && newApiService.page > 1) {
      //перед квери нужно влепить название класса получения fetch и точку)
      // console.log(entry);
      renderCardGallery();
      // функция рендера картинок должна быть тут)
    }
    // else if (entry.isIntersecting && newApiService.query === '' && newApiService.page > 1) {
    //   renderSearchGallery();
    // }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(document.querySelector('#intersection-observer'));
