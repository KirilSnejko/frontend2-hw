import { createMovieCardList } from '../mainContent';
import { getMovies } from './requests';
import '../mainContent/filters';
import { updateMoviesCounter } from '../mainContent/moviesCounter';
import { endLoading } from '../utils';

export const initApp = (param) => {
	getMovies(param).then((data) => {
		updateMoviesCounter(data.totalAmount);
		createMovieCardList(data.data);
		endLoading();
	});
};
