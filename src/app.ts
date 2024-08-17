import { Application } from "express";
import express from "express";
import cors from "cors";
const path = require('path');
const fs = require('fs');
import { usersRoutes } from "./app/http/controllers/users/routes";
import { postsRoutes } from "./app/http/controllers/posts/routes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { erroHandler } from "./error-handler";

export const app: Application = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uploadDir = path.resolve(__dirname, '..', 'temp', 'uploads');

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(uploadDir));

app.use(morgan("dev"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const router = express.Router();

app.use('/api', router);


postsRoutes(router);
usersRoutes(router);

app.use(erroHandler);
