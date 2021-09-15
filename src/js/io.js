import { newApiService, renderCardGallery } from './api-gallery';
import { searchApiService, renderSearchGallery2 } from './api-key-word';

export const ioContainer = document.querySelector('#intersection-observer');

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query === '' && newApiService.page > 1) {
      //перед квери нужно влепить название класса получения fetch и точку)

      renderCardGallery();
      // функция рендера картинок должна быть тут)
    }

    if (entry.isIntersecting && searchApiService.query !== '' && searchApiService.page > 1) {
      renderSearchGallery2();
    }
  });
};

const options = {
  rootMargin: '600px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(ioContainer);
