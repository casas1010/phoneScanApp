const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const barcodeLookUp = require('./barcodeLookUp');



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quickstart-1585764879031.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);

exports.barcodeLookUp = functions.https.onRequest(barcodeLookUp);

