import config from "../config";
import { ClientType } from '../types';

const { clientId, clientSecret, clientIdApp, clientSecretApp } = config.github;

export function getGitHubSecretKey(client: ClientType = 'web') {
  const keys = {
    web: { clientId, clientSecret },
    app: { clientId: clientIdApp, clientSecret: clientSecretApp },
  };
  return keys[client];
}
