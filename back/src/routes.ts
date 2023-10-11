import express = require("express");
import * as l10n from "jm-ez-l10n";
import { AuthRoute } from "./modules/auth/authRoute";
import { Constants } from "./config/constants";
export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(_req: express.Request, res: express.Response) {
    res.json({
      message: "Hello !",
    });
  }

  public path() {
    const router = express.Router();

    router.use("/auth", AuthRoute);
    router.all("/*", (_req, res) => {
      return res.status(Constants.RESPONSE_CODE.error.notFound).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
