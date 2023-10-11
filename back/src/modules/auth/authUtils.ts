import User from "../../models/user";
import { Log } from "../../helpers/logger";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import axios from 'axios';
import * as querystring from 'querystring';

interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export class AuthUtils {
  private logger: any = Log.getLogger();

  public async getGoogleOauthToken({ code }): Promise<GoogleOauthToken> {
    const rootURl = process.env.ROOT_URL as string;
    const options = {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: process.env.REDIRECT_URL as string,
      grant_type: 'authorization_code',
    };
    try {
      const { data }: any = await axios.post<GoogleOauthToken>(
        rootURl,
        querystring.stringify(options),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return data;
    } catch (err: any) {
      this.logger.info(`Failed to fetch Google Oauth Tokens`, err);
      throw new Error(err);
    }
  }

  public async getGoogleUser({ access_token, id_token }): Promise<GoogleUserResult> {
    try {
      const { data } = await axios.get<GoogleUserResult>(
        `${process.env.GET_GOOGLE_API}${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return data;
    } catch (err: any) {
      this.logger.info(err);
      throw Error(err);
    }
  }

  public async findAndUpdateUserData(query, update, options): Promise<ResponseBuilder> {
    try {
      let reponseData: any;
      reponseData = await (User.findOneAndUpdate(query, update, options) as Promise<any>);
      if (reponseData) {
        return ResponseBuilder.data({ riversId: reponseData._id, userData: reponseData });
      } else {
        return ResponseBuilder.error(update.message);
      }
    } catch (error) {
      this.logger.error(error)
    }
  }
}
