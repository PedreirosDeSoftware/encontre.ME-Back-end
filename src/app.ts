import { Express } from "express";
import express from "express";
import cors from "cors";
import { usersRoutes } from "./app/http/controllers/users/routes";
import { postsRoutes } from "./app/http/controllers/posts/routes";

export const app: Express = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

app.use('/api', router);

postsRoutes(router);
usersRoutes(router);

