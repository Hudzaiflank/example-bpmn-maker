const crypto = require("crypto");
const config = require("../../config/environment-config");
config.loadEnvironmentVariables();

const key = crypto.createHash("sha512").update(process.env.ENCRYPTION_KEY).digest("hex").substring(0, 32);

const encryptionIV = crypto.createHash("sha512").update(process.env.ENCRYPTION_IV).digest("hex").substring(0, 16);

const encrypt = async (data) => {
    const cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGORITHM, key, encryptionIV);
    return Buffer.from(cipher.update(data, "utf8", "hex") + cipher.final("hex")).toString("base64");
};

const decrypt = async (encryptedData) => {
    const buff = Buffer.from(encryptedData, "base64");
    const decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGORITHM, key, encryptionIV);
    return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
};

module.exports = { encrypt, decrypt };
