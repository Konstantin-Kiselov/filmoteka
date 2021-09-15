function fetchFilms() {
  return fetch('http://localhost:3000/genres').then(res => res.json());
}

fetchFilms();
