const admin = require('firebase-admin');
const serviceAccount = require(`../deployment/gcp/${process.env.NODE_ENV}/service-account.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
