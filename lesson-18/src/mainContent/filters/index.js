import { moviesEvent, objToSearchParams } from '../../utils';

const filtersForm = document.querySelector('#filtersForm');
const resetFiltersButton = document.querySelector('#resetFilters');
const activeFilterClass = 'activeFilter';

resetFiltersButton?.addEventListener('click', (e) => {
	const filterElements = filtersForm.querySelectorAll('[name=filter]:checked');

	filterElements.forEach((el) => (el.checked = false));
	e.currentTarget.classList.add(activeFilterClass);
	filtersForm?.dispatchEvent(new Event('change'));
});

const sortParams = [
	{
		searchBy: 'title',
		sortOrder: 'asc',
	},
	{
		searchBy: 'title',
		sortOrder: 'desc',
	},
	{
		searchBy: 'year',
		sortOrder: 'asc',
	},
	{
		searchBy: 'year',
		sortOrder: 'desc',
	},
];

filtersForm?.addEventListener('change', (e) => {
	const formData = new FormData(e.currentTarget);
	const filter = formData.getAll('filter');
	const sort = formData.get('sort');

	if (filter.length) resetFiltersButton?.classList.remove(activeFilterClass);

	const searchOptions = {
		filter: filter.toString(),
		...sortParams[sort],
	};

	const searchParams = objToSearchParams(searchOptions);
	window.history.pushState(
		undefined,
		'',
		window.location.origin + searchParams,
	);

	moviesEvent();
});
