export const applicant = (state = [], action) => {
	switch (action.type) {
		case "APPLICANT_FETCHED":
			return action.payload;
		default:
			return state;
	}
};

export const applicant2 = (state = [], action) => {
	switch (action.type) {
		case "APPLICANT_FETCHED2":
			return action.payload;
		default:
			return state;
	}
};
