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
	let report = [];
	// get the report
	// fetch(`https://asia-east2-dialoggen.cloudfunctions.net/metrics`, {
	fetch(`https://us-central1-hr-insights-c28c5.cloudfunctions.net/getDummyReport`, {
		method: "POST",
		// mode: "no-cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ profile: "DESIGN_MIDDLE", text: data.transcript })
	})
		.then(resp => {
			return resp.json();
			return;
		})
		.then(response => {
			console.log(response);
			if (typeof response === "string") {
				try {
					response = JSON.parse(response);
				} catch (err) {
					console.log("No response while fetching user data...");
				}
			}

			console.log(response);
			report = response;
			fetch(`${host}/updateApplicant?id=${id}`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ...data, report })
			})
				.then(resp => {
					return resp.text();
				})
				.then(response2 => {
					if (typeof response2 === "string") {
						try {
							response2 = JSON.parse(response2);
						} catch (err) {
							console.log("No response while fetching user data...");
						}
					}
					dispatch({
						type: "APPLICANT_UPDATED",
						payload: response2
					});
				});
		});
};
