const FireFunctions = require("firebase-swiss");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
	origin: true
});

admin.initializeApp(functions.config().firebase);

const firefunctions = new FireFunctions(admin.database());

exports.addApplicant = firefunctions.getFunction("CREATE", {
	ref: "applicants",
	requestBodyTransformer: object => ({
		name: object.name,
		experience: object.experience,
		age: object.age,
		role: object.role,
		transcript: object.transcript ? object.transcript : "UNAVAILABLE",
		report: object.report ? object.report : []
	})
});

exports.addWorkspace = firefunctions.getFunction("CREATE", {
	ref: "workspaces",
	requestBodyTransformer: object => ({
		name: object.name
	})
});

exports.getAllApplicants = firefunctions.getFunction("GET", {
	ref: "applicants"
});


exports.getAllWorkspaces = firefunctions.getFunction("GET", {
	ref: "workspaces"
});

exports.getWorkspace = firefunctions.getFunction("GET", {
	ref: "workspaces",
	idKey: "id"
});

exports.getApplicant = firefunctions.getFunction("GET", {
	ref: "applicants",
	idKey: "id"
});

exports.updateApplicant = firefunctions.getFunction("PATCH", {
	ref: "applicants",
	idKey: "id",
	requestBodyTransformer: object => ({
		name: object.name,
		experience: object.experience,
		age: object.age,
		role: object.role,
		transcript: object.transcript,
		report: object.report ? object.report : []
	})
});

exports.getDummyReport = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		if (request.method !== "POST") {
			response.status(400).send("Please send a POST request");
			return;
		}

		response.status(200).send(
			JSON.stringify({
				radarCharts: [
					{
						title: "Trends",
						data: [
							{ word: "Blockchain", A: 150, fullMark: 150 },
							{ word: "Cyrpto", A: 150, fullMark: 150 },
							{ word: "IOT", A: 86, fullMark: 150 },
							{ word: "Security", A: 99, fullMark: 150 },
							{ word: "Automation", A: 85, fullMark: 150 }
						]
					}
				],

				ratioBarCharts: [
					{
						title: "I vs We",
						data: [{ label: "I/Me", percent: 10, val: 5 }, { label: "We/Us", percent: 90, val: 45 }]
					},
					{
						title: "Postive vs Negative",
						data: [{ label: "Positive", percent: 40, val: 100 }, { label: "Negative", percent: 60, val: 400 }]
					}
				],
				textCharts: [
					{
						title: "Words similar to Team",
						data: "7232 Mentions"
					},
					{
						title: "Questions Asked",
						data: "7 Questions"
					},
					{
						title: "Words similar to Innovation",
						data: "23 Mentions"
					}
				]
			})
		);
	});
});
