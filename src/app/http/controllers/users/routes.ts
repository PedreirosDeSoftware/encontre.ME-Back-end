import { Router } from "express";
import { registerController } from "./register-controller";
import { authenticateController } from "./authenticate-controller";
import { getUserController } from "./get-user-controller";

export function usersRoutes(route: Router) {
    route.post("/register", registerController);
    route.post("/login", authenticateController);
    route.get("/user/:id", getUserController);
}