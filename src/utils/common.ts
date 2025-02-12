import config from "../config";

const { clientId, clientSecret, clientIdApp, clientSecretApp } = config.github;

export function getGitHubSecretKey(client: 'web' | 'app' = 'web') {
  const keys = {
    web: { clientId, clientSecret },
    app: { clientId: clientIdApp, clientSecret: clientSecretApp },
  };
  return keys[client];
}
