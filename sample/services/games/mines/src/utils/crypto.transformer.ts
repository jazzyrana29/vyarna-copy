import { ValueTransformer } from "typeorm";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const DEFAULT_KEY = Buffer.alloc(32);

function resolveKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY || "";
  try {
    const key = Buffer.from(hex, "hex");
    if (key.length === 32) return key;
  } catch {
    // ignore invalid hex string
  }
  console.warn("Invalid ENCRYPTION_KEY. Falling back to insecure default key.");
  return DEFAULT_KEY;
}

const KEY = resolveKey();

export class CryptoTransformer implements ValueTransformer {
  to(value: string | null): string | null {
    if (value === null || value === undefined) return value;
    const iv = randomBytes(16);
    const cipher = createCipheriv("aes-256-ctr", KEY, iv);
    const encrypted = Buffer.concat([
      cipher.update(value, "utf8"),
      cipher.final(),
    ]);
    return iv.toString("hex") + encrypted.toString("hex");
  }

  from(value: string | null): string | null {
    if (value === null || value === undefined) return value;
    const iv = Buffer.from(value.slice(0, 32), "hex");
    const encryptedText = Buffer.from(value.slice(32), "hex");
    const decipher = createDecipheriv("aes-256-ctr", KEY, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  }
}
