import { Express } from "express";
import express from "express";
import cors from "cors";
import { usersRoutes } from "./app/http/controllers/users/routes";

export const app: Express = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoutes);
