import Express from "express";

import transaction from "./transactionRoutes";

const routes = (app: Express.Application) => {
  app.use(Express.json(), transaction);
};

export default routes;
