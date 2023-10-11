import * as jwt from "jsonwebtoken";
const { encrypt, decrypt } = require('./encryptJWT')

export class Jwt {
  /*
  * getAuthToken
  */
  public static getAuthToken(data) {
    return encrypt( 
      jwt.sign(
        {
          data: {
            id: data.id
          }
        },
        process.env.JWT_SECRET
      )
    );
  }

  /*
  * decodeAuthToken
  */
  public static async decodeAuthToken(token) {
    if (token) {
      try {
        const decryptToken = await decrypt(token);
        return jwt.verify(decryptToken, process.env.JWT_SECRET);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
