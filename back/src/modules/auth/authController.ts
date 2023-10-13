import { CookieOptions } from "express";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import * as dotenv from "dotenv"
import HelperClass from "../../helpers/HelperClass";

dotenv.config()

export class AuthController {
    private helperclass: HelperClass = new HelperClass();

    public register = async (req: any, res: any) => {
        try {
            const result = await this.helperclass.register(req, res)
            if (result) {
                return res.status(Constants.RESPONSE_CODE.success).json(ResponseBuilder.data({
                    ...result.result.Data.toObject(),
                }, req.t("SIGNUP_SUCCESS")));
            } else {
                return res.status(Constants.RESPONSE_CODE.error.internalServerError).json(ResponseBuilder.errorMessage(req.t("ERROR")));
            }
        } catch (error) {
            return res.status(Constants.RESPONSE_CODE.error.internalServerError).json(ResponseBuilder.errorMessage(req.t("ERROR")));
        }
    }
}