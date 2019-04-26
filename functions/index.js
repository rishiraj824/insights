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
		review: object.review,
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
		buttShape: object.buttShape,
		id: object.id
	};
};

const onlyUnique = (value, index, self) => {
	return self.indexOf(value) === index;
};

const isSimilar = (user1, user2) => {
	console.log("Comparing users");
	console.log(user1);
	console.log(user2);

	if (Math.abs(Number(user2.height.feet) - Number(user1.height.feet) > 2)) {
		return false;
	}

	if (Math.abs(Number(user2.weight) - Number(user1.weight > 5))) {
		return false;
	}

	if (Number(user2.braSize) !== Number(user1.braSize)) {
		return false;
	}

	if (Math.abs(Number(user2.bodyShape.shoulder) - Number(user1.bodyShape.shoulder > 1))) {
		return false;
	}

	if (Math.abs(Number(user2.bodyShape.belly) - Number(user1.bodyShape.belly > 1))) {
		return false;
	}

	if (Math.abs(Number(user2.bodyShape.waist) - Number(user1.waist > 1))) {
		return false;
	}

	if (Math.abs(Number(user2.bellyShape) - Number(user1.bellyShape > 1))) {
		return false;
	}

	if (Math.abs(Number(user2.buttShape) - Number(user1.buttShape > 1))) {
		return false;
	}

	return true;
};

exports.getAllDresses = functions.https.onRequest((request, response) => {
	const reqUserId = request.query.userId;
	cors(request, response, () => {
		return admin
			.database()
			.ref(`user/${reqUserId}`)
			.once("value")
			.then(snapshot => {
				const user = snapshot.val();
				console.log("target user");
				console.log(user);
				admin
					.database()
					.ref("dress")
					.once("value")
					.then(snapshot => {
						const allDresses = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
						const promises = allDresses
							.map(dress => dress.userId)
							// .filter(onlyUnique)
							.map(userId => {
								console.log(userId);
								return admin
									.database()
									.ref(`user/${userId}`)
									.once("value");
							});

						Promise.all(promises).then(allUsers => {
							if (allUsers === null || allUsers === undefined) {
								response.send([]);
							} else {
								const similarUsers = allUsers.filter(user2 => isSimilar(user, user2.val())).map(user => user.val());
								console.log(similarUsers);
								const similarUserIds = similarUsers.map(user => user.id);
								console.log(similarUserIds);
								const matchDresses = allDresses.filter(dress => similarUserIds.includes(dress.userId));
								response.send(matchDresses);
							}
						});
					});
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
