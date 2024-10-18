import { createMovieCard } from './moviCard';

const cardContainer = document.querySelector('#cards');

export const createMovieCardList = (moviesList) => {
	cardContainer.innerHTML = '';
	const moviesCards = moviesList.map((movie) => createMovieCard(movie));
	cardContainer.append(...moviesCards);
};
