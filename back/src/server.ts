import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as express from "express";
const helmet = require("helmet"); // Security
import * as swaggerUi from "swagger-ui-express";
import * as l10n from "jm-ez-l10n";
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import connectDB from "./helpers/connectDB";
import { Routes } from "./routes";
import { Constants } from "./config/constants";
const cors = require('cors');
dotenv.config();

// Connect to MongoDB
connectDB();

export class App {
  protected app: express.Application;
  // private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    this.app = express();
    this.app.use(express.static('public'));
    // Setup express server port from ENV, default: 3000
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(cors()); //NOSONAR

    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", ["*"]);
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST");
      if (req.method === "OPTIONS") {
        res.writeHead(Constants.RESPONSE_CODE.success);
        res.end();
      } else {
        next();
      }
    });

    // Enable only in development HTTP request logger middleware
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'))
    }

    // Redis cache enabled by env variable
    if (process.env.USE_REDIS === 'true') {
      const getExpeditiousCache = require('express-expeditious')
      const cache = getExpeditiousCache({
        namespace: 'expresscache',
        defaultTtl: '1 minute',
        engine: require('expeditious-engine-redis')({
          redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
          }
        })
      })
      this.app.use(cache)
    }

    // i18n
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(
      l10n.enableL10NExpress
    );

    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: false }));

    // for parsing json
    this.app.use(bodyParser.json({ limit: '50mb' })
    )
    // for parsing application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(Constants.RESPONSE_CODE.error.badRequest).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

    // Init all other stuff
    this.app.use(compression())

    this.app.use(helmet())
    this.app.use(methodOverride());
    // Routes
    const routes = new Routes(NODE_ENV);
    this.app.use("/api", routes.path());

    this.app.listen(this.app.get('port'), () => {
      console.log(`The server is running in port localhost: ${this.app.get('port')}`);
    });
  }
}

