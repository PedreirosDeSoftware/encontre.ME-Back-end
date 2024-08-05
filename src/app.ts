import { Application } from "express";
import express from "express";
import cors from "cors";
import { usersRoutes } from "./app/http/controllers/users/routes";
import { postsRoutes } from "./app/http/controllers/posts/routes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

export const app: Application = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const router = express.Router();

app.use('/api', router);

postsRoutes(router);
usersRoutes(router);

