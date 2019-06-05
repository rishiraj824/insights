const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const cors = require("cors")({
	origin: true
});

const getApplicant = object => {
	return {
		name: object.name,
		experience: object.experience,
		age: object.age,
		role: object.role
	};
};

exports.addApplicant = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		if (request.method !== "POST") {
			response.status(400).send("Please send a POST request");
			return;
		}
		const applicantData = getApplicant(request.body);
		return admin
			.database()
			.ref("applicants")
			.push(getApplicant(applicantData))
			.then(snapshot => {
				response.status(200).send(applicantData);
			});
	});
});

exports.getAllApplicants = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		admin
			.database()
			.ref("applicants")
			.once("value")
			.then(snapshot => {
				response.status(200).send(snapshot);
			});
	});
});

exports.getApplicant = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		const id = request.query.id;
		console.log(JSON.stringify(request.params));

		return admin
			.database()
			.ref(`applicants/${id}`)
			.once("value")
			.then(snapshot => {
				console.log(snapshot);
				response.send(snapshot.val());
			});
	});
});
