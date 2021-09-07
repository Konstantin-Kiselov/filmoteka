// const API_KEY = 'b32f977d148061c9ab22a471ff2c7792';
// const BASE_URL = 'https://api.themoviedb.org/3/';
// let pageNumber = 1;

// function fetchMovieByKeyWord(searchQuery) {
//   return fetch(
//     `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${searchQuery}`,
//   )
//     .then(response => response.json())
//     .then(({ results }) => {
//       pageNumber += 1;
//       console.log(results);
//       return results;
//     });
// }

// export { fetchMovieByKeyWord };
