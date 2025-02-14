import CryptoJS from "crypto-js";

export function encrypt(data: string, secretKey: string): string {
  if (!secretKey) throw new Error("Encryption key is required");
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decrypt(cipherText: string, secretKey: string): string {
  if (!secretKey) throw new Error("Encryption key is required");
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}