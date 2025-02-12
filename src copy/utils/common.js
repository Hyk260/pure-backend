const { github } = require("../config");

function getGitHubSecretKey(client = "web") {
  if (client === "web") {
    return {
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    };
  } else {
    return {
      clientId: github.clientIdApp,
      clientSecret: github.clientSecretApp,
    };
  }
}

module.exports = {
  getGitHubSecretKey,
};
