import express from "express";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    const app = express();
    routes(app);

    console.log("HTTP server running:", process.env.PORT);

    return app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
