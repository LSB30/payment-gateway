import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { TransactionEntity } from "../entities/transactionEntity";
import { SeederOptions } from "typeorm-extension";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Disabled for safety in production
  logging: process.env.NODE_ENV !== "production",
  entities: [TransactionEntity],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  // Connection pool configuration
  extra: {
    // Maximum number of clients the pool should contain
    max: 20,
    // Maximum time (ms) that a client can be idle before being closed
    idleTimeoutMillis: 30000,
    // Maximum time (ms) to wait for a client from the pool
    connectionTimeoutMillis: 2000,
    // Number of connection retries
    max_retries: 3,
    // Delay between retries in milliseconds
    retry_delay: 3000
  },
  // SSL configuration for production
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

export const AppDataSource = new DataSource(options);

// Connection function with retry logic
export const initializeDatabase = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
      return true;
    } catch (error) {
      retries -= 1;
      console.log(`Failed to connect to database. Retries left: ${retries}`);
      console.error(error);
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw new Error("Unable to connect to the database after multiple retries");
};
