import config from "../../config/index";

const host = config.host;

export const getApplicants = () => dispatch => {
	fetch(`${host}/getAllApplicants`)
		.then(resp => {
			return resp.text();
		})
		.then(response => {
			if (typeof response === "string") {
				try {
					response = JSON.parse(response);
				} catch (err) {
					console.log("No response while fetching user data...");
				}
			}
			dispatch({
				type: "APPLICANTS_FETCHED",
				payload: response
			});
		});
};

export const searchApplicants = value => dispatch => {};

export const getApplicant = id => dispatch => {
	fetch(`${host}/getApplicant?id=${id}`)
		.then(resp => {
			return resp.text();
		})
		.then(response => {
			if (typeof response === "string") {
				try {
					response = JSON.parse(response);
				} catch (err) {
					console.log("No response while fetching user data...");
				}
			}
			dispatch({
				type: "APPLICANT_FETCHED",
				payload: response
			});
		});
};

export const updateTranscript = data => dispatch => {
	const { id } = data;
	console.log(data);
	fetch(`${host}/updateApplicant?id=${id}`, {
		method: "PATCH",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
		.then(resp => {
			return resp.text();
		})
		.then(response => {
			if (typeof response === "string") {
				try {
					response = JSON.parse(response);
				} catch (err) {
					console.log("No response while fetching user data...");
				}
			}
			dispatch({
				type: "APPLICANT_UPDATED",
				payload: response
			});
		});
};
