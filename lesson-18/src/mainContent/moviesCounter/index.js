const moviesCounterElement = document.querySelector('#movies-number');

export const updateMoviesCounter = (count) => {
	moviesCounterElement.textContent = count;
};
