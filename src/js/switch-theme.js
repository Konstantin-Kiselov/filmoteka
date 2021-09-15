const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const body = document.querySelector('body');
body.classList.add(Theme.LIGHT);

const footer = document.querySelector('.footer');
footer.classList.add(Theme.LIGHT);

const themeSwitchEl = document.querySelector('.theme-switch__toggle');
themeSwitchEl.addEventListener('change', onSwitch);

function onSwitch(event) {
  if (event.target.checked) {
    localStorage.setItem('theme', Theme.DARK);
    localStorage.setItem('theme-footer', Theme.DARK);
    body.classList.toggle(Theme.DARK);
    footer.classList.toggle(Theme.DARK);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
    localStorage.setItem('theme-footer', Theme.LIGHT);
    body.classList.toggle(Theme.DARK);
    footer.classList.toggle(Theme.DARK);
  }
}

const localStg = localStorage.getItem('theme');
if (localStg === 'dark-theme') {
  themeSwitchEl.checked = true;
  body.classList.add('dark-theme');
}

const footerStg = localStorage.getItem('theme-footer');
if (footerStg === 'dark-theme') {
  themeSwitchEl.checked = true;
  footer.classList.add('dark-theme');
}
