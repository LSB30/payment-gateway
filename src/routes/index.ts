import Express from "express";

const routes = (app: Express.Application) => {
  app.use(Express.json());
};

export default routes;
