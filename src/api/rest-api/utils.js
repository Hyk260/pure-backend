const { imAppId, administrator } = require("../../config");
const generateSig = require("../../utils/generateSig");

let cachedSig = null;
let cacheExpiration = null;

function randomInt32() {
  return Math.floor(Math.random() * 4294967296);
}

function getUserSig() {
  if (cachedSig && cacheExpiration && cacheExpiration > Date.now()) {
    return cachedSig;
  }
  cachedSig = generateSig({ identifier: administrator });
  cacheExpiration = Date.now() + 60 * 60 * 1000;
  return cachedSig;
}

function buildURL(baseURL) {
  const params = {
    sdkappid: imAppId,
    identifier: administrator,
    usersig: getUserSig(),
    random: randomInt32(),
    contenttype: "json",
  };
  const enCode = (t) => encodeURIComponent(t);
  const query = Object.keys(params)
    .map((key) => {
      return `${enCode(key)}=${enCode(params[key])}`;
    })
    .join("&");
  return `${baseURL}?${query}`;
}
module.exports = {
  randomInt32,
  buildURL,
};
