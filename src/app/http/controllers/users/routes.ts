import { Router } from "express";
import { registerController } from "./register-controller";
import { authenticateController } from "./authenticate-controller";
import { getUserController } from "./get-user-controller";
import { upload } from "@/app/lib/multer";
import { authTokenController } from "./auth-token-controller";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { activationAccountController } from "./activation-account-controller";


export function usersRoutes(route: Router) {
    //* Routes Publics */
    route.post("/register", registerController);
    route.post("/login", authenticateController);
    route.get("/user/:id/activation", activationAccountController);

    //* Routes Privates */
    route.get("/user/authorization", authorizationMiddleware, authTokenController);
    route.get("/user/:id", authorizationMiddleware, getUserController);
}