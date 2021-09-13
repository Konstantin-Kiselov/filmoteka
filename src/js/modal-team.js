
const refs = {
    body: document.querySelector('body'),
    modalTeamBackdrop: document.querySelector('.backdrop-team'),
    openTeamLink: document.querySelector('.team'),
    closeTeamBtn: document.querySelector('.modal-team-close-btn'),
    modalTeam: document.querySelector('.modal-team'),
};

refs.openTeamLink.addEventListener('click', onModalTeamOpen);
refs.closeTeamBtn.addEventListener('click', onModalTeamClose);

function toggleModalTeam() {
    window.addEventListener('keydown', onEscKeyPress);
    refs.modalTeam.classList.toggle('is-hidden-team');
}

/////////////////////////////////
function onModalTeamOpen() {
    toggleModalTeam();
    stopScroll();
}

function onModalTeamClose() {
    toggleModalTeam();
    onScroll();
}

// Закрытие модального окна по нажатию клавиши ESC
function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    //console.log(event.code);
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
        toggleModalTeam();
      onScroll();
    }
  }
  
  // Закрытие модального окна по клику на backdrop.
  refs.modalTeam.addEventListener('click', onModalCloseBackdrop);
  function onModalCloseBackdrop(evt) {
    const isBackdrop = evt.target.classList.contains('backdrop-team');
    // console.log(isBackdrop);
    if (isBackdrop) {
        toggleModalTeam();
      onScroll();
    }
  }
//чтобы не скролился body под модалкой
function stopScroll() {
    const isBackdropIsHidden = refs.modalTeamBackdrop.classList.contains('is-hidden-team');
    // console.log(isBackdropIsHidden);
    if (!isBackdropIsHidden) {
      refs.body.classList.add('no-scroll');
    }
}
  
//чтобы скролилась страница после закрытия модального окна
function onScroll() {
    refs.body.classList.remove('no-scroll');   
}
  
    