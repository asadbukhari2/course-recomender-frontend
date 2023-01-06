export const authHeader = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		const jwtToken = user.token;
		return { headers: { authorization: jwtToken } };
	} else {
		return {};
	}
};
