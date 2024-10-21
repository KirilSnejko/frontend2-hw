import { initApp } from './api/app';
import './style.scss';
import { movieEventName, searchParamsToObj } from './utils';

initApp(searchParamsToObj(window.location.search));

document.addEventListener(movieEventName, (e) => {
	const params = searchParamsToObj(window.location.search);
	initApp(params);
});
