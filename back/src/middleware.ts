import * as _ from "lodash";
import { Encrypt } from "./helpers/encrypt";
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { Log } from "./helpers/logger";
import { Constants } from "./config/constants";
import Users from "./models/user";
const isIDGood = require('./helpers/isIDGood');

export class Middleware {
  private encryptUtil: Encrypt = new Encrypt();
  private logger = Log.getLogger();

  public authenticateUser = async (req, res, next: () => void) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && !_.isEmpty(authorizationHeader)) {
      try {
        const [bearer, accessToken] = authorizationHeader.split(' ')
        if (bearer !== 'Bearer') {
          this.logger.error("error :: ", Constants.ERROR_TOKEN_NOT_FOUND);
          return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.notAuthorized(req.t("ERR_UNAUTH")));
        }

        const decoded: any = await Jwt.decodeAuthToken(accessToken);
        if (!decoded) {
          this.logger.error("error :: ", Constants.ERROR_TOKEN_INVALID);
          return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.notAuthorized(req.t("ERR_UNAUTH")));
        }

        const ID = await isIDGood(decoded.data.id);

        let role = await Users.findOne({ _id: ID }).exec();
        if (!role) {
          return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.notAuthorized(req.t("ERR_UNAUTH")));
        }

        Object.assign(req.body, {
          _user: role,
          accessToken
        });
        next()
      } catch (error) {
        this.logger.error(`${Constants.ERROR_TOKEN}`, error);
        return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.notAuthorized(req.t("ERR_UNAUTH")));
      }
    } else {
      return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.notAuthorized(req.t("ERR_UNAUTH")));
    }
  }
}
