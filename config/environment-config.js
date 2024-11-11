const dotenv = require("dotenv");
const path = require("path");

// Load environment variables based on the NODE_ENV
const loadEnvironmentVariables = () => {
    const envFilePath = path.resolve(__dirname, `../deployment/${process.env.NODE_ENV}/.env`);
    dotenv.config({ path: envFilePath });
};

// Export the function for use in other modules
module.exports = { loadEnvironmentVariables };
