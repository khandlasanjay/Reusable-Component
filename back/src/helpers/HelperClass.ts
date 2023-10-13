import Users from "../models/user";
import { Constants } from "../config/constants";
import { ResponseBuilder } from "./responseBuilder";
import { Log } from "./logger";
import * as dotenv from "dotenv";
dotenv.config();
export default class HelperClass {
    private logger = Log.getLogger();
    public async register(req, res) {
        try {
            let result: any
            if (!req.file) {
                return res.status(Constants.RESPONSE_CODE.error.badRequest).json(ResponseBuilder.badRequest(req.t("ERR_NO_FILE_UPLOAD")));
            } else {
                const imgsrc = req.file.filename
                const payload = req.body
                const data = { profileImage: imgsrc, ...payload }
                result = await Users.create(data);
            }
            if (result && result._id) {
                return ResponseBuilder.data({ Id: result._id, Data: result });
            } else {
                return ResponseBuilder.error(result.message);
            }
        } catch(error) {
        return res.status(Constants.RESPONSE_CODE.error.badRequest).json(ResponseBuilder.badRequest(error.message));
    }
}
}