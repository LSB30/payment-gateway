import express from "express";
import { initializeDatabase } from "./database/data-source";
import routes from "./routes";

const startServer = async () => {
  try {
    await initializeDatabase();

    const app = express();
    app.use(express.json());

    routes(app);

    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
      console.log(`HTTP server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
