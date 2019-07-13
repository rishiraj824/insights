const FireFunctionsFactory = require("./lib");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const firefunctions = new FireFunctionsFactory(admin.database());

exports.addApplicant = firefunctions.getFunction("CREATE", {
	ref: "applicants",
	requestBodyTransformer: object => ({
		name: object.name,
		experience: object.experience,
		age: object.age,
		role: object.role,
		transcript: object.transcript ? object.transcript : 'UNAVAILABLE'
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
	id: "id"
});

exports.getApplicant = firefunctions.getFunction("GET", {
	ref: "applicants",
	id: "id"
});

exports.updateApplicant = firefunctions.getFunction("PATCH", {
	ref: "applicants",
	id: "id",
	requestBodyTransformer: object => ({
		name: object.name,
		experience: object.experience,
		age: object.age,
		role: object.role,
		transcript: object.transcript
	})
});
