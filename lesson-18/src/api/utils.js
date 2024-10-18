export const handleRequestsReject = (err) => {
	console.error(err);
};

export const handleRequestsResolve = (res) => {
	if (res.ok) return res.json();
	else throw new Error(res);
};
