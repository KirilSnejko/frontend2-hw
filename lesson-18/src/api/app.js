import { createMovieCardList } from '../mainContent';
import { getMovies } from './requests';

export const initApp = () => {
	getMovies().then((data) => {
		createMovieCardList(data.data);
	});
};
