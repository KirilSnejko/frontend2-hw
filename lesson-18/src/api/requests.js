import { baseApiUrl, defaultSearchParams } from './constants';
import { handleRequestsReject, handleRequestsResolve } from './utils';
import { objToSearchParams, startLoading } from '../utils';

export const getMovies = (params) => {
	startLoading();
	const searchParams = objToSearchParams({ ...defaultSearchParams, ...params });

	return fetch(`${baseApiUrl}${searchParams}`)
		.then(handleRequestsResolve)
		.catch(handleRequestsReject);
};
