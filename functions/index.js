const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp(functions.config().firebase);

exports.getAllDresses = functions.https.onRequest((request, response) => {
	return admin
		.database()
		.ref("/dress")
		.once("value")
		.then(snapshot => {
			console.log(snapshot);
			response.send(snapshot.val());
		});
});

const getDress = object => {
	return {
		type: object.type,
		name: object.name,
		brand: object.brand,
		subType: object.subType,
		userId: object.userId,
		imagesURL: object.imagesURL,
		likeability: object.likeability,
		meta: object.meta
	};
};

exports.addDress = functions.https.onRequest((request, response) => {
	if (request.method !== "POST") {
		response.status(400).send("Please send a POST request");
		return;
	}
	const data = request.body;
	console.log(data);

	return admin
		.database()
		.ref("dress")
		.push(getDress(data))
		.then(snapshot => {
			console.log(snapshot);
			response.status(200).send("Added");
		});
});
