const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && query !== '') {
      //перед квери нужно влепить название класса получения fetch и точку)
      // console.log(entry);
      // функция рендера картинок должна быть тут)
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(document.querySelector('#intersection-observer'));
