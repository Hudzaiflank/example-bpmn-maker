const midtransClient = require('midtrans-client');
const config = require('./environment-config');
config.loadEnvironmentVariables();

// Create Core API instance
const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
  clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
});

module.exports = core;
