import config from "../../config";
import { generateUserSig } from "../../utils/signature";

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
  return Math.floor(Math.random() * 0x100000000);
}

export function getUserSig() {
  const now = Date.now();
  if (cachedSig && cacheExpiration && cacheExpiration > now) {
    return cachedSig;
  }
  cachedSig = generateUserSig({ identifier: administrator });
  cacheExpiration = now + 60 * 60 * 1000;
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
