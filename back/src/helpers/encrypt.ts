import * as crypto from "crypto";
import * as JSEncrypt from "node-jsencrypt";

export class Encrypt {
  private algorithm = "aes-256-ctr";
  // NOTE :: Set password from .env for encrypt and decrypt
  private password = process.env.ENCRYPT_AES_256_CTR_PASSWORD;
  private IV_LENGTH = 16;

  public encrypt(text: string) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.algorithm,this.password,iv)
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  /**
   * decrypt
   */
   public decrypt(text: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.password,iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  /**
   * convertToSha
   */
  public convertToSha(pwd: string, salt: string) {
    const hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
    hash.update(pwd);
    const value = hash.digest("hex");
    return { salt, passwordHash: value };
  }

  public encryptwithJS(key: string) {
    const text = typeof key === "string" ? key : `${key}`;
    const jsEncrypt: JSEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(process.env.jsEncPubKey);
    return jsEncrypt.encrypt(text);
  }
}
