export const objToSearchParams = (params) => {
	let searchString = '';
	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			const separator = searchString.length ? '&' : '?';
			searchString += `${separator}${key}=${value}`;
		}
	});
	return searchString;
};

export const searchParamsToObj = (searchParams) => {
	return Object.fromEntries(new URLSearchParams(searchParams));
};
