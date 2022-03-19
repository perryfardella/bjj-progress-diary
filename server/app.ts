import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { EntryController } from "./controller/entry.controller";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");

class App {
  public express: express.Application;
  public logger: APILogger;
  public entryController: EntryController;

  /* Swagger files start */
  private swaggerFile: any = process.cwd() + "/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/swagger/swagger.css",
    "utf8"
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.entryController = new EntryController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/api/entries", (req, res) => {
      this.entryController.getEntries().then((data) => res.json(data));
    });

    this.express.post("/api/entry", (req, res) => {
      console.log(req.body);
      this.entryController
        .createEntry(req.body.entry)
        .then((data) => res.json(data));
    });

    this.express.put("/api/entry", (req, res) => {
      this.entryController
        .updateEntry(req.body.entry)
        .then((data) => res.json(data));
    });

    this.express.delete("/api/entry/:id", (req, res) => {
      this.entryController
        .deleteEntry(req.params.id)
        .then((data) => res.json(data));
    });

    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    // swagger docs
    this.express.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null, this.customCss)
    );

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
