import { createHash, publicEncrypt } from "crypto";
import { Buffer } from "buffer";
import { RSA_PKCS1_PADDING } from "constants";

const unixtime10 = (t?: number) =>
  Math.floor((t ?? Date.now()) / 1000).toString().padStart(10, "0").slice(-10);

const sha256HexLower = (s: string) =>
  createHash("sha256").update(s, "utf8").digest("hex");

export function rsaAuth(
  publicKeyPem: string,
  secret = "SecretPassword-Placeholder",
  t1?: number,
  t2?: number
): string {
  const a = unixtime10(t1);
  const b = unixtime10(t2 ?? t1);
  const payload = `${sha256HexLower(secret + a)}|${b}`;
  const ct = publicEncrypt(
    { key: publicKeyPem, padding: RSA_PKCS1_PADDING },
    Uint8Array.from(Buffer.from(payload, "utf8"))
  );
  return ct.toString("hex").toUpperCase();
}