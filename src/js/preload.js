//myLibraryLink = document.querySelector('.navigation__link');
//myLibraryLink.addEventListener('click', onLoadPreloader);

inputListener = document.querySelector('.navigation__search');
inputListener.addEventListener('input', removePreloader);

// window.onload = function () {
//   document.querySelector('.preloader').classList.add('preloader-remove');
// };

window.onload = removePreloader();

function removePreloader() {
  document.querySelector('.preloader').classList.add('preloader-remove');
}
