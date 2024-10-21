const loadingClass = 'is-loading';
const rootElement = document.body;

export const startLoading = () => {
	rootElement.classList.add(loadingClass);
};

export const endLoading = () => {
	setTimeout(() => rootElement.classList.remove(loadingClass), 1000);
};
