import { getYearFromMovieRealizeDate } from '../../utils/date';
import defaultPoster from '../../../public/images/page1/bohemianRhapsody.png';

const movieCardTemplate = document.querySelector('#movieCardTemplate');

if (!movieCardTemplate) throw new Error('movieCardTemplate not Found');

export const createMovieCard = (movieData) => {
	const movieCard = movieCardTemplate.content.cloneNode(true);

	const movieCardImage = movieCard.querySelector('.card-image');
	const movieCardTitle = movieCard.querySelector('.card-title');
	const movieCardIYear = movieCard.querySelector('.card-year');
	const movieCardGenre = movieCard.querySelector('.gender');

	movieCardImage.src = movieData.poster_path;
	movieCardImage.alt = movieData.title;

	movieCardImage.addEventListener(
		'error',
		() => {
			movieCardImage.src = defaultPoster;
		},
		{
			once: true,
		},
	);

	movieCardTitle.textContent = movieData.title;
	movieCardIYear.textContent = getYearFromMovieRealizeDate(
		movieData.release_date,
	);
	movieCardGenre.textContent = movieData.genres.join(', ');

	return movieCard;
};
