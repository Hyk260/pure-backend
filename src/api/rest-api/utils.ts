import config from "../../config";
import { generateUserSig } from "../../utils/generateSig";

const { imAppId, administrator } = config

let cachedSig: string = "";
let cacheExpiration: number | null = null;

interface Params {
  sdkappid: string;
  identifier: string;
  usersig: string;
  random: number | string;
  contenttype: string;
}

export function generateRandomInt32() {
  return Math.floor(Math.random() * 4294967296);
}

export function getUserSig() {
  if (cachedSig && cacheExpiration && cacheExpiration > Date.now()) {
    return cachedSig;
  }
  cachedSig = generateUserSig({ identifier: administrator });
  cacheExpiration = Date.now() + 60 * 60 * 1000;
  return cachedSig;
}

export function buildURL(baseURL: string) {
  const params: Params = {
    sdkappid: imAppId,
    identifier: administrator,
    usersig: getUserSig(),
    random: generateRandomInt32(),
    contenttype: "json",
  };
  const enCode = (t: string | number) => encodeURIComponent(t);
  const query = Object.keys(params)
    .map((key) => {
      return `${enCode(key)}=${enCode(params[key as keyof Params])}`;
    })
    .join("&");
  return `${baseURL}?${query}`;
}
