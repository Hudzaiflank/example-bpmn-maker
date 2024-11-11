const axios = require('axios');
const config = require('../../../config/environment-config');
config.loadEnvironmentVariables();

const createDeepLink = async (customData) => {
  try {
    const url = process.env.BRANCH_API;
    const data = {
      branch_key: process.env.BRANCH_KEY,
      data: {
        $deeplink_path: '/verify',
        jwtToken: customData.token,
        type: customData.type,
      },
    };
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = createDeepLink;
