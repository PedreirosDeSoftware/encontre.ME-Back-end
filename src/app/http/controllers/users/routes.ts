import { Router } from "express";
import { registerController } from "./register-controller";
import { authenticateController } from "./authenticate-controller";

export function usersRoutes(route: Router) {
    route.post("/register", registerController);
    route.post("/login", authenticateController);
}