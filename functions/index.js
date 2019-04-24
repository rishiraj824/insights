const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp(functions.config().firebase);
const cors = require("cors")({
	origin: true
});

const getDress = object => {
	return {
		type: object.type,
		name: object.name,
		brand: object.brand,
		itemCode: object.itemCode,
		subType: object.subType,
		userId: object.userId,
		imagesURL: object.imagesURL,
		likeability: object.likeability,
		meta: object.meta
	};
};

const getUser = object => {
	return {
		name: object.name,
		age: object.age,
		height: object.height,
		braSize: object.braSize,
		weight: object.weight,
		bodyShape: object.bodyShape,
		bellyShape: object.bellyShape,
		buttShape: object.buttShape
	};
};

exports.getAllDresses = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		return admin
			.database()
			.ref("/dress")
			.once("value")
			.then(snapshot => {
				console.log(snapshot);
				response.send(snapshot.val());
			});
	});
});

exports.addDress = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
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
});

exports.addUser = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		if (request.method !== "POST") {
			response.status(400).send("Please send a POST request");
			return;
		}
		const data = request.body;
		console.log(JSON.stringify(data));

		return admin
			.database()
			.ref(`user/${data.id}`)
			.set(getUser(data))
			.then(snapshot => {
				console.log(snapshot);
				response.status(200).send("Added");
			});
	});
});

exports.getUser = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		const reqUserId = request.query.userId;
		console.log(JSON.stringify(request.params));

		return admin
			.database()
			.ref(`user/${reqUserId}`)
			.once("value")
			.then(snapshot => {
				console.log(snapshot);
				response.send(snapshot.val());
			});
	});
});
