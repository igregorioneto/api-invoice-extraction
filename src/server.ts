import express, { json, urlencoded } from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";

const createServer = () => {
  const app = express();
  const port = 3000;

  app.use(cors());

  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Routes

  setupSwagger(app);

  return { app, port };
}

export { createServer };