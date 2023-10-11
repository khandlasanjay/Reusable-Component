import { CookieOptions } from "express";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Jwt } from "../../helpers/jwt";
import { AuthUtils } from "./authUtils";
import * as dotenv from "dotenv"
dotenv.config()

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + parseInt(process.env.EXPIRE)
    ),
    maxAge: parseInt(process.env.MAXAGE),
    httpOnly: false,
    sameSite: 'lax',
};

export class AuthController {
    private authUtils: AuthUtils = new AuthUtils();

    public googleOauthHandler = async (req: any, res: any) => {
        try {
            const code = req.query.code as string;
            const pathUrl = '/';
            if (!code) {
                return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.errorMessage(req.t("GOOGLE_AUTH_ERROR")))
            }
            const { access_token, id_token }: any = await this.authUtils.getGoogleOauthToken({ code });
            const result: any = await this.authUtils.getGoogleUser({ access_token, id_token });
            if (!result.verified_email) {
                return res.status(Constants.RESPONSE_CODE.error.unauthorized).json(ResponseBuilder.errorMessage(req.t("GOOGLE_VERIFY_ERROR")))
            }
            const user: any = await this.authUtils.findAndUpdateUserData(
                { email: result.email },
                {
                    firstName: result.given_name,
                    lastName: result.family_name,
                    email: result.email,
                    profileImage: result.picture,
                    socialId: result.id,
                    isAdmin:false,
                    signupType: 'G',
                    status: 'active',
                    accessToken: access_token
                },
                { upsert: true, runValidators: false, new: true, lean: true }
            );
            if (user && user.code == Constants.RESPONSE_CODE.success) {
                const userId = user.result.userData._id;
                const accessToken = await Jwt.getAuthToken({ id: userId });
                res.cookie('access_token', accessToken, accessTokenCookieOptions);
                res.cookie('logged_in', true, accessTokenCookieOptions
                );
                res.redirect(`${process.env.FRONT_ROOT_URL}${pathUrl}`);
            } else {
                return res.status(Constants.RESPONSE_CODE.error.internalServerError).json(ResponseBuilder.errorMessage(req.t("ERROR")));
            }
        } catch (error) {
            return res.status(Constants.RESPONSE_CODE.error.internalServerError).json(ResponseBuilder.errorMessage(req.t("ERROR")));
        }
    }
}