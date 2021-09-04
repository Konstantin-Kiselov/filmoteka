import modalTemplate from '../templates/modal-templates.hbs';
console.log(modalTemplate);

///////////////////////////////api запрос

// const BASE_URL = 'https://developers.themoviedb.org/3/movies/get-movie-details';
// const API_KEY = '23052937-32fb9bd6f4b84b12682be3748';

// export default class ApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImg() {
//         const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
//         return fetch(url).then(response => response.json()
//             .then(data => {
//                 console.log(data);
//                 return data.hits;
//             })
//         );
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }

// }

//////////////////////////////////

///////////////////

/////////////////////
const refs = {
    openModalBtn: document.querySelector('.gallery-list'),
    closeModalBtn: document.querySelector('.modal-close-btn'),
    modal: document.querySelector('.modal'),
    modalWindow: document.querySelector('.modal-aaaa'),
    
};

refs.openModalBtn.addEventListener('click', onModalOpen);

refs.closeModalBtn.addEventListener('click', toggleModal);

function onModalOpen(event) {

    const a = event.target;
    console.log(a);
    //если клик не на элемент li, тогда модальное окно не открывается
    const isCardElement = event.target.closest('li');
    console.log(isCardElement.firstElementChild.getAttribute('data-action'));
  if (!isCardElement) {
    return;
    }

    // const a = event.target.value;
    // console.log(a);

    event.preventDefault();

    toggleModal();
    renderModalMarkUP(modalTemplate);
}

// function onModalClose() {
//     refs.modal.classList.remove('is-hidden');
// }

function toggleModal() {
    window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.toggle('is-hidden');
}

// Закрытие модального окна по нажатию клавиши ESC
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  //console.log(event.code);
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    toggleModal();
  };
};

// Закрытие модального окна по клику на backdrop.

refs.modal.addEventListener('click', onModalCloseBackdrop);
function onModalCloseBackdrop(evt) {
    const isBackdrop = evt.target.classList.contains('backdrop');
    console.log(isBackdrop);
    if (isBackdrop) {
    toggleModal();
  };
}

function renderModalMarkUP(template) {
  refs.modalWindow.textContent = '';
    const markUp = modalTemplate(template);
    refs.modalWindow.insertAdjacentHTML('beforeend', markUp);

    console.log('one country');
}

//запрос
// const BASE_URL = 'https://restcountries.eu/rest/v2';

// function fetchCountries(searchQuery) {
//     return fetch(`${BASE_URL}/name/${searchQuery}`).then(response =>
//         response.json(),
//     );
// }














// function renderModalMarkUP(modalTemplate) {
//     const markUp = countre(modalTemplate);
//     refs.modalWindow.insertAdjacentHTML('afterend', markUp);

// }

// function renderModalMarkUP(countries) {
//     const markUp = countre(countries);
//     refs.getCountriesList.innerHTML = markUp;

//     console.log('one country');
// }
