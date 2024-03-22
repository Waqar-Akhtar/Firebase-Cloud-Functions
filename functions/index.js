/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("hello from firebase function");
});

exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log(`${user.email} is Created`);
  Promise.resolve();
});
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log(`${user.email} is Deleted`);
  Promise.resolve();
});
exports.fruitAdded = functions.firestore
  .document("/fruits/{documentId}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data());
    Promise.resolve();
  });
exports.fruitDeleted = functions.firestore
  .document("/fruits/{documentId}")
  .onDelete((snapshot, context) => {
    console.log(snapshot.data(), "deleted");
    Promise.resolve();
  });
exports.fruitUpdated = functions.firestore
  .document("/fruits/{documentId}")
  .onUpdate((snapshot, context) => {
    console.log("before", snapshot.before.data());
    console.log("after", snapshot.after.data());
    Promise.resolve();
  });
