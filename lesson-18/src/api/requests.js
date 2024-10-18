import { baseApiUrl } from './constants';
import { handleRequestsReject, handleRequestsResolve } from './utils';

export const getMovies = () =>
	fetch(`${baseApiUrl}/movies`)
		.then(handleRequestsResolve)
		.catch(handleRequestsReject);
