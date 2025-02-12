declare module 'tls-sig-api-v2' {
  export class Api {
    constructor(appId: string, appKey: string);
    genSig(identifier: string, expireTime: number): string;
  }
}
